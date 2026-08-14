const mongoose = require("mongoose");
const Issue = require("../models/issue");
const Project = require("../models/project");
const TeamMember = require("../models/teamMember");
const Team = require("../models/team");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const AssignmentEvent = require("../models/assignmentEvent");
const Goals = require("../models/goals");
const { broadcastToTeam } = require("../Socket/Services/teamBroadcast");
const { handleRouteError } = require("../utils/handleRouteError");
const { mapIssueStatusToGoalStatus, mapIssuePriorityToGoalPriority } = require("../utils/statusMapping");

async function createLinkedGoal(issue, userId, session) {
  const name = issue.title.trim().length < 3 ? issue.title.padEnd(3, ' ') : issue.title.trim();
  const description = (issue.description && issue.description.trim().length >= 3)
    ? issue.description.trim()
    : (name.length >= 3 ? name : "TeamOS Issue Goal");

  const [goal] = await Goals.create([{
    name,
    description,
    owner: userId,
    status: mapIssueStatusToGoalStatus(issue.status),
    priority: mapIssuePriorityToGoalPriority(issue.priority),
    category: "TeamOS Issue",
    tags: ["TeamOS", "Issue"],
    sourceIssueId: issue._id,
    sourceTeamId: issue.teamId,
    lastUpdated: Date.now()
  }], { session });

  await Issue.updateOne({ _id: issue._id }, { linkedGoalId: goal._id }, { session });
  issue.linkedGoalId = goal._id;
  return goal;
}

async function createIssue(req, res) {
  try {
    const { teamId, projectId } = req.params;
    const { type, title, description, priority } = req.body;

    const project = await Project.findOne({ _id: projectId, teamId, archivedAt: null });
    if (!project) return res.status(404).json({ error: 'Project not found or archived' });

    const issue = await Issue.create({
      teamId,
      projectId,
      type,
      title,
      description,
      priority: priority || 'medium',
      createdBy: req.user._id
    });

    const team = await Team.findById(teamId);
    const leaderId = team ? team.ownerId : req.user._id;

    const members = await TeamMember.find({ teamId, status: "active" });
    const memberIds = members.map(m => m.userId);

    const convo = await Conversation.create({
      type: "team_issue",
      teamId,
      projectId,
      issueId: issue._id,
      name: issue.title,
      createdBy: req.user._id,
      members: memberIds,
      admins: [leaderId],
      unreadCounts: memberIds.map(id => ({ user: id, count: 0 }))
    });

    issue.conversationId = convo._id;
    await issue.save();

    // Broadcast WebSocket event
    await broadcastToTeam(teamId, {
      type: "team:issue:created",
      teamId,
      projectId,
      issue
    });

    res.status(201).json({ issue });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function listIssues(req, res) {
  try {
    const { projectId, teamId } = req.params;
    const { type, status, priority } = req.query;

    const filter = { teamId, archivedAt: null };
    if (projectId) filter.projectId = projectId;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const issues = await Issue.find(filter)
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'firstName lastName photoUrl email');
    res.json({ issues });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getIssueDetails(req, res) {
  try {
    const { issueId, teamId } = req.params;
    const issue = await Issue.findOne({ _id: issueId, teamId, archivedAt: null })
      .populate('assignedTo', 'firstName lastName photoUrl email');
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json({ issue });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function updateIssue(req, res) {
  try {
    const { issueId, teamId } = req.params;
    const allowedFields = ['title', 'description', 'status', 'priority', 'links'];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, teamId, archivedAt: null },
      updates,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'firstName lastName photoUrl email');
    if (!issue) return res.status(404).json({ error: 'Issue not found' });

    if (updates.status && issue.linkedGoalId) {
      const goalUpdates = {
        status: mapIssueStatusToGoalStatus(updates.status),
        lastUpdated: Date.now()
      };
      if (updates.status === 'done') {
        goalUpdates.progress = 100;
      }
      await Goals.updateOne({ _id: issue.linkedGoalId }, goalUpdates);
    }

    res.json({ issue });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function archiveIssue(req, res) {
  try {
    const { issueId, teamId } = req.params;
    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, teamId, archivedAt: null },
      { archivedAt: new Date() },
      { new: true }
    );
    if (!issue) return res.status(404).json({ error: 'Issue not found' });

    if (issue.linkedGoalId) {
      await Goals.updateOne(
        { _id: issue.linkedGoalId },
        { status: 'Removed', isArchived: true, lastUpdated: Date.now() }
      );
    }

    res.json({ success: true });

    // Broadcast WebSocket event
    await broadcastToTeam(teamId, {
      type: "team:issue:archived",
      teamId,
      issueId
    });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function claimIssue(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { teamId, issueId } = req.params;

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, teamId, archivedAt: null, assignedTo: null },
      {
        assignedTo: req.user._id,
        assignmentSource: 'self_claimed',
        assignedAt: new Date()
      },
      { new: true, session }
    );

    if (!issue) {
      // Either the issue doesn't exist, or it's already assigned — check which, for a clear error
      const exists = await Issue.exists({ _id: issueId, teamId, archivedAt: null });
      await session.abortTransaction();
      if (!exists) return res.status(404).json({ error: 'Issue not found' });
      return res.status(409).json({ error: 'Issue is already assigned' });
    }

    await createLinkedGoal(issue, req.user._id, session);

    // Log the assignment event
    await AssignmentEvent.create([{
      teamId,
      issueId,
      userId: req.user._id,
      action: 'claimed',
      actorId: req.user._id
    }], { session });

    await session.commitTransaction();
    res.json({ issue });
  } catch (err) {
    await session.abortTransaction();
    return handleRouteError(err, res);
  } finally {
    session.endSession();
  }
}

async function assignIssue(req, res) {
  const { teamId, issueId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Target user ID is required' });
  }

  const targetMembership = await TeamMember.findOne({
    teamId, userId, status: 'active'
  });
  
  if (!targetMembership) {
    return res.status(400).json({ error: 'Target user is not an active member of this team' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const existingIssue = await Issue.findOne({ _id: issueId, teamId, archivedAt: null }).session(session);
    if (!existingIssue) {
      await session.abortTransaction();
      return res.status(404).json({ error: 'Issue not found' });
    }

    if (existingIssue.linkedGoalId && existingIssue.assignedTo) {
      await Goals.updateOne(
        { _id: existingIssue.linkedGoalId },
        { status: 'Reassigned', isArchived: true, lastUpdated: Date.now() },
        { session }
      );
    }

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, teamId, archivedAt: null },
      {
        assignedTo: userId,
        assignmentSource: 'leader_assigned',
        assignedAt: new Date()
      },
      { new: true, session }
    );

    await createLinkedGoal(issue, userId, session);

    // Log the assignment event
    await AssignmentEvent.create([{
      teamId,
      issueId,
      userId,
      action: 'assigned',
      actorId: req.user._id
    }], { session });

    await session.commitTransaction();
    res.json({ issue });
  } catch (err) {
    await session.abortTransaction();
    return handleRouteError(err, res);
  } finally {
    session.endSession();
  }
}

async function unclaimIssue(req, res) {
  try {
    const { teamId, issueId } = req.params;

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, teamId, archivedAt: null, assignedTo: req.user._id },
      {
        assignedTo: null,
        assignmentSource: 'unassigned',
        assignedAt: null
      },
      { new: true }
    );

    if (!issue) {
      return res.status(403).json({ error: 'You can only unclaim issues currently assigned to you' });
    }

    if (issue.linkedGoalId) {
      await Goals.updateOne({ _id: issue.linkedGoalId }, { status: 'Removed', isArchived: true, lastUpdated: Date.now() });
      await Issue.updateOne({ _id: issue._id }, { linkedGoalId: null });
      issue.linkedGoalId = null;
    }

    // Log the assignment event (for unclaim, userId is the user who was assigned)
    await AssignmentEvent.create({
      teamId,
      issueId,
      userId: req.user._id,
      action: 'unclaimed',
      actorId: req.user._id
    });

    res.json({ issue });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function deleteIssue(req, res) {
  try {
    const { issueId, teamId } = req.params;
    const issue = await Issue.findOneAndDelete({ _id: issueId, teamId });
    if (!issue) return res.status(404).json({ error: 'Issue not found' });

    if (issue.linkedGoalId) {
      await Goals.updateOne(
        { _id: issue.linkedGoalId },
        { status: 'Removed', isArchived: true, lastUpdated: Date.now() }
      );
    }

    // Clean up conversation and messages
    const convo = await Conversation.findOne({ issueId });
    if (convo) {
      await Message.deleteMany({ conversation_id: convo._id });
      await Conversation.deleteOne({ _id: convo._id });
    }

    // Broadcast WebSocket event
    await broadcastToTeam(teamId, {
      type: "team:issue:deleted",
      teamId,
      issueId
    });

    res.json({ success: true });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

module.exports = {
  createIssue,
  listIssues,
  getIssueDetails,
  updateIssue,
  archiveIssue,
  deleteIssue,
  claimIssue,
  assignIssue,
  unclaimIssue
};
