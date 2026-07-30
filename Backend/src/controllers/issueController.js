const Issue = require("../models/issue");
const Project = require("../models/project");
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
    const { projectId } = req.params;
    const { type, status, priority } = req.query;

    const filter = { projectId, archivedAt: null };
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const issues = await Issue.find(filter).sort({ createdAt: -1 });
    res.json({ issues });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getIssueDetails(req, res) {
  try {
    const { issueId } = req.params;
    const issue = await Issue.findOne({ _id: issueId, archivedAt: null });
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json({ issue });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function updateIssue(req, res) {
  try {
    const { issueId } = req.params;
    const allowedFields = ['title', 'description', 'status', 'priority'];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, teamId: req.params.teamId, archivedAt: null },
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
    const { issueId } = req.params;
    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, archivedAt: null },
      { archivedAt: new Date() },
      { new: true }
    );
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
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
  archiveIssue
};
