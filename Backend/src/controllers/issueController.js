const Issue = require("../models/issue");
const Project = require("../models/project");
const TeamMember = require("../models/teamMember");
const AssignmentEvent = require("../models/assignmentEvent");
const { handleRouteError } = require("../utils/handleRouteError");

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

    res.status(201).json({ issue });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function listIssues(req, res) {
  try {
    const { projectId, teamId } = req.params;
    const { type, status, priority } = req.query;

    const filter = { teamId, projectId, archivedAt: null };
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
    const allowedFields = ['title', 'description', 'status', 'priority'];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, teamId, archivedAt: null },
      updates,
      { new: true, runValidators: true }
    );
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
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
    res.json({ success: true });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function claimIssue(req, res) {
  try {
    const { teamId, issueId } = req.params;

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, teamId, archivedAt: null, assignedTo: null },
      {
        assignedTo: req.user._id,
        assignmentSource: 'self_claimed',
        assignedAt: new Date()
      },
      { new: true }
    );

    if (!issue) {
      // Either the issue doesn't exist, or it's already assigned — check which, for a clear error
      const exists = await Issue.exists({ _id: issueId, teamId, archivedAt: null });
      if (!exists) return res.status(404).json({ error: 'Issue not found' });
      return res.status(409).json({ error: 'Issue is already assigned' });
    }

    // Log the assignment event
    await AssignmentEvent.create({
      teamId,
      issueId,
      userId: req.user._id,
      action: 'claimed',
      actorId: req.user._id
    });

    res.json({ issue });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function assignIssue(req, res) {
  try {
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

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, teamId, archivedAt: null },
      {
        assignedTo: userId,
        assignmentSource: 'leader_assigned',
        assignedAt: new Date()
      },
      { new: true }
    );

    if (!issue) return res.status(404).json({ error: 'Issue not found' });

    // Log the assignment event
    await AssignmentEvent.create({
      teamId,
      issueId,
      userId,
      action: 'assigned',
      actorId: req.user._id
    });

    res.json({ issue });
  } catch (err) {
    return handleRouteError(err, res);
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

module.exports = {
  createIssue,
  listIssues,
  getIssueDetails,
  updateIssue,
  archiveIssue,
  claimIssue,
  assignIssue,
  unclaimIssue
};
