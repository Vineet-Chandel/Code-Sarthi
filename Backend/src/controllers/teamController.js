const mongoose = require("mongoose");
const Team = require("../models/team");
const TeamMember = require("../models/teamMember");
const { handleRouteError } = require("../utils/handleRouteError");
const { nanoid } = require("nanoid");

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

    await session.commitTransaction();
    res.status(201).json({ team });
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
    const { name, description } = req.body;
    const team = await Team.findByIdAndUpdate(req.params.teamId, { name, description }, { new: true });
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
      await session.commitTransaction();
      res.json({ success: true, team });
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
      await session.commitTransaction();
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

    if (String(team.ownerId) === String(req.user._id)) {
      return res.status(400).json({
        error: 'Transfer ownership before leaving the team'
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await TeamMember.updateOne(
        { teamId, userId: req.user._id },
        { status: 'left' },
        { session }
      );
      await Team.updateOne({ _id: teamId }, { $inc: { memberCount: -1 } }, { session });
      await session.commitTransaction();
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

module.exports = {
  createTeam,
  listMyTeams,
  getTeamDetails,
  updateTeam,
  archiveTeam,
  generateInviteCode,
  joinTeam,
  listMembers,
  removeMember,
  leaveTeam,
  transferOwnership
};
