const mongoose = require("mongoose");
const Team = require("../models/team");
const TeamMember = require("../models/teamMember");
const Project = require("../models/project");
const Issue = require("../models/issue");
const ContributionLog = require("../models/contributionLog");
const AssignmentEvent = require("../models/assignmentEvent");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const { broadcastService } = require("../Socket/Services/BroadcastService");
const { handleRouteError } = require("../utils/handleRouteError");
const { nanoid } = require("nanoid");
const { executeSuccession } = require("../services/teamSuccession");
const cloudinary = require("cloudinary").v2;
const getDataUrl = require("../utils/buffer");

// Create team
async function createTeam(req, res) {
  const { name, description } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [team] = await Team.create([{
      name, description,
      ownerId: req.user._id,
      createdBy: req.user._id,
      memberCount: 1,
      inviteCode: nanoid(8)
    }], { session });

    await TeamMember.create([{
      teamId: team._id,
      userId: req.user._id,
      role: 'leader',
      invitedBy: null
    }], { session });

    const [convo] = await Conversation.create([{
      type: "team_general",
      teamId: team._id,
      name: team.name,
      createdBy: req.user._id,
      members: [req.user._id],
      admins: [req.user._id],
      unreadCounts: [{ user: req.user._id, count: 0 }]
    }], { session });

    team.generalConversationId = convo._id;
    await team.save({ session });

    await session.commitTransaction();
    const populatedTeam = await Team.findById(team._id).populate('ownerId', 'firstName lastName photoUrl');
    const teamObj = {
      ...populatedTeam.toObject(),
      myRole: 'leader',
      members: [{
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        photoUrl: req.user.photoUrl,
        email: req.user.email,
        role: 'leader'
      }]
    };
    res.status(201).json({ team: teamObj });
  } catch (err) {
    await session.abortTransaction();
    return handleRouteError(err, res);
  } finally {
    session.endSession();
  }
}

async function listMyTeams(req, res) {
  try {
    const memberships = await TeamMember.find({ userId: req.user._id, status: 'active' });
    const teamIds = memberships.map(m => m.teamId);
    const teams = await Team.find({ _id: { $in: teamIds }, status: 'active' }).populate('ownerId', 'firstName lastName photoUrl');
    
    const allMembers = await TeamMember.find({ teamId: { $in: teamIds }, status: 'active' })
      .populate('userId', 'firstName lastName photoUrl email');

    const teamsWithRole = teams.map(team => {
        const membership = memberships.find(m => m.teamId.toString() === team._id.toString());
        const teamMembers = allMembers
          .filter(m => m.teamId.toString() === team._id.toString() && m.userId)
          .map(m => ({
            _id: m.userId._id,
            firstName: m.userId.firstName,
            lastName: m.userId.lastName,
            photoUrl: m.userId.photoUrl,
            email: m.userId.email,
            role: m.role
          }));

        return {
            ...team.toObject(),
            myRole: membership ? membership.role : 'member',
            members: teamMembers
        };
    });

    res.json({ teams: teamsWithRole });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Get team details
async function getTeamDetails(req, res) {
  try {
    const team = await Team.findById(req.params.teamId).populate('ownerId', 'firstName lastName photoUrl');
    res.json({ team, membership: req.membership });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Update team details
async function updateTeam(req, res) {
  try {
    const { name, description, logo } = req.body;
    const team = await Team.findByIdAndUpdate(req.params.teamId, { name, description, logo }, { new: true });
    res.json({ team });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Archive team (soft delete)
async function archiveTeam(req, res) {
  try {
    await Team.findByIdAndUpdate(req.params.teamId, { status: 'archived' });
    res.json({ success: true });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Generate or rotate invite code
async function generateInviteCode(req, res) {
  try {
    const newCode = nanoid(8);
    const team = await Team.findByIdAndUpdate(req.params.teamId, { inviteCode: newCode }, { new: true });
    res.json({ inviteCode: team.inviteCode });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Get Invite Details
async function getInviteDetails(req, res) {
  const { code } = req.params;
  try {
    const team = await Team.findOne({ inviteCode: code, status: 'active' })
      .select('name description logo ownerId inviteCodeExpiresAt')
      .populate('ownerId', 'firstName lastName photoUrl username');

    if (!team) return res.status(404).json({ error: 'Invalid or expired invite code' });

    if (team.inviteCodeExpiresAt && team.inviteCodeExpiresAt < new Date()) {
      return res.status(410).json({ error: 'Invite code has expired' });
    }

    res.json({ success: true, team });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Join team via invite code
async function joinTeam(req, res) {
  const { code } = req.body;
  try {
    const team = await Team.findOne({ inviteCode: code, status: 'active' });
    if (!team) return res.status(404).json({ error: 'Invalid or expired invite code' });

    if (team.inviteCodeExpiresAt && team.inviteCodeExpiresAt < new Date()) {
      return res.status(410).json({ error: 'Invite code has expired' });
    }

    const existing = await TeamMember.findOne({ teamId: team._id, userId: req.user._id });
    if (existing && existing.status === 'active') {
      return res.json({ success: true, team }); // idempotent
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      if (existing) {
        await TeamMember.updateOne(
          { _id: existing._id },
          { status: 'active', role: 'member', joinedAt: new Date() },
          { session }
        );
      } else {
        await TeamMember.create([{
          teamId: team._id, userId: req.user._id, role: 'member', invitedBy: team.ownerId
        }], { session });
      }
      await Team.updateOne({ _id: team._id }, { $inc: { memberCount: 1 } }, { session });

      // Add user to all conversations of this team
      await Conversation.updateMany(
        { teamId: team._id },
        { 
          $pull: { unreadCounts: { user: req.user._id } }
        },
        { session }
      );
      await Conversation.updateMany(
        { teamId: team._id },
        { 
          $addToSet: { members: req.user._id },
          $push: { unreadCounts: { user: req.user._id, count: 0 } }
        },
        { session }
      );

      await session.commitTransaction();
      const populatedTeam = await Team.findById(team._id).populate('ownerId', 'firstName lastName photoUrl');
      const teamMembers = await TeamMember.find({ teamId: team._id, status: 'active' }).populate('userId', 'firstName lastName photoUrl email');
      const formattedMembers = teamMembers.filter(m => m.userId).map(m => ({
        _id: m.userId._id,
        firstName: m.userId.firstName,
        lastName: m.userId.lastName,
        photoUrl: m.userId.photoUrl,
        email: m.userId.email,
        role: m.role
      }));
      const teamObj = {
        ...populatedTeam.toObject(),
        myRole: 'member',
        members: formattedMembers
      };
      res.json({ success: true, team: teamObj });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// List team members
async function listMembers(req, res) {
  try {
    const members = await TeamMember.find({ teamId: req.params.teamId, status: 'active' })
      .populate('userId', 'firstName lastName photoUrl email');
    res.json({ members });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Remove member (leader only)
async function removeMember(req, res) {
  const { teamId, userId } = req.params;
  try {
    const team = await Team.findById(teamId);
    
    if (String(userId) === String(team.ownerId)) {
      return res.status(403).json({ error: 'Leader cannot remove themselves. Transfer ownership first.' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await TeamMember.updateOne(
        { teamId, userId },
        { status: 'removed' },
        { session }
      );
      await Team.updateOne({ _id: teamId }, { $inc: { memberCount: -1 } }, { session });

      // Pull removed member from all team conversations
      await Conversation.updateMany(
        { teamId },
        {
          $pull: {
            members: userId,
            unreadCounts: { user: userId }
          }
        },
        { session }
      );

      await session.commitTransaction();

      // Broadcast to the removed user so they exit team workspace immediately
      broadcastService([{ _id: userId }], {
        type: "team:member:removed",
        teamId
      });

      res.json({ success: true });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Member leaves voluntarily
async function leaveTeam(req, res) {
  const { teamId } = req.params;
  try {
    const team = await Team.findById(teamId);
    if (!team) {
        return res.status(404).json({ error: 'Team not found' });
    }

    // Call the atomic succession service which handles everything
    await executeSuccession(teamId, req.user._id, 'VOLUNTARY_LEAVE');

    res.json({ success: true });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Transfer ownership
async function transferOwnership(req, res) {
  const { teamId } = req.params;
  const { newLeaderId } = req.body;
  const requesterId = req.user._id;

  try {
    if (String(newLeaderId) === String(requesterId)) {
      return res.status(400).json({ error: 'User is already the leader' });
    }

    const team = await Team.findById(teamId);
    if (String(team.ownerId) !== String(requesterId)) {
      return res.status(403).json({ error: 'Only the current leader can transfer ownership' });
    }

    const targetMembership = await TeamMember.findOne({
      teamId, userId: newLeaderId, status: 'active'
    });
    if (!targetMembership) {
      return res.status(400).json({ error: 'Target user is not an active member of this team' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Team.updateOne({ _id: teamId }, { ownerId: newLeaderId }, { session });
      await TeamMember.updateOne({ teamId, userId: requesterId }, { role: 'member' }, { session });
      await TeamMember.updateOne({ teamId, userId: newLeaderId }, { role: 'leader' }, { session });
      await session.commitTransaction();
      res.json({ success: true, newLeaderId });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Permanently delete team and clean up related entities
async function deleteTeam(req, res) {
  try {
    const teamId = req.params.teamId;
    
    // Clean up conversations and messages
    const convos = await Conversation.find({ teamId });
    const convoIds = convos.map(c => c._id);
    await Message.deleteMany({ conversation_id: { $in: convoIds } });
    await Conversation.deleteMany({ teamId });

    await Team.findByIdAndDelete(teamId);
    await TeamMember.deleteMany({ teamId });
    await Project.deleteMany({ teamId });
    await Issue.deleteMany({ teamId });
    await ContributionLog.deleteMany({ teamId });
    await AssignmentEvent.deleteMany({ teamId });
    res.json({ success: true });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Update member role (leader only)
async function updateMemberRole(req, res) {
  const { teamId, userId } = req.params;
  const { role } = req.body; // 'admin' or 'member'
  try {
    if (!['admin', 'member'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Can only be admin or member.' });
    }
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    if (String(userId) === String(team.ownerId)) {
      return res.status(403).json({ error: 'Cannot change role of team leader.' });
    }
    const member = await TeamMember.findOneAndUpdate(
      { teamId, userId, status: 'active' },
      { role },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ error: 'Active member not found.' });
    }
    res.json({ success: true, member });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Get team workspace
async function getTeamWorkspace(req, res) {
  try {
    const { teamId } = req.params;
    
    // Find the team
    const team = await Team.findById(teamId).populate('ownerId', 'firstName lastName photoUrl');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Find active members
    const memberships = await TeamMember.find({ teamId, status: 'active' })
      .populate('userId', 'firstName lastName photoUrl email');
    
    const members = memberships.filter(m => m.userId).map(m => ({
      _id: m.userId._id,
      firstName: m.userId.firstName,
      lastName: m.userId.lastName,
      photoUrl: m.userId.photoUrl,
      email: m.userId.email,
      role: m.role
    }));

    // Find all projects of the team
    const projects = await Project.find({ teamId, archivedAt: null }).sort({ createdAt: -1 });

    // Find all active issues of the team
    const issues = await Issue.find({ teamId, archivedAt: null }).sort({ createdAt: -1 });

    // Group issues by projectId
    const projectsWithIssues = projects.map(p => {
      const projectIssues = issues.filter(issue => issue.projectId.toString() === p._id.toString());
      return {
        ...p.toObject(),
        issues: projectIssues
      };
    });

    res.json({
      team,
      members,
      generalConversationId: team.generalConversationId,
      projects: projectsWithIssues
    });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

// Upload team logo
async function uploadTeamLogo(req, res) {
  try {
    const { teamId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // convert buffer → dataURL
    const fileBuffer = getDataUrl(file);

    // upload to cloudinary
    const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
      folder: "CodeSarthi-TeamLogos",
      resource_type: "image",
      transformation: [
        { width: 500, height: 500, crop: "thumb", quality: "auto", fetch_format: "auto" }
      ]
    });

    const team = await Team.findByIdAndUpdate(
      teamId,
      { logo: cloud.secure_url },
      { new: true }
    );

    res.json({
      success: true,
      logo: team.logo,
      message: "Team logo uploaded successfully"
    });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

module.exports = {
  createTeam,
  listMyTeams,
  getTeamDetails,
  updateTeam,
  archiveTeam,
  deleteTeam,
  generateInviteCode,
  joinTeam,
  listMembers,
  removeMember,
  updateMemberRole,
  leaveTeam,
  transferOwnership,
  getTeamWorkspace,
  uploadTeamLogo,
  getInviteDetails
};
