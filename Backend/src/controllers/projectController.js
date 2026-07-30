const Project = require("../models/project");
const { handleRouteError } = require("../utils/handleRouteError");

async function createProject(req, res) {
  try {
    const { teamId } = req.params;
    const { title, description, status, priority } = req.body;

    const project = await Project.create({
      teamId,
      title,
      description,
      status: status || 'planning',
      priority: priority || 'medium',
      createdBy: req.user._id
    });

    res.status(201).json({ project });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function listProjects(req, res) {
  try {
    const { teamId } = req.params;
    const { status, priority } = req.query;

    const filter = { teamId, archivedAt: null };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json({ projects });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getProjectDetails(req, res) {
  try {
    const { projectId, teamId } = req.params;
    const project = await Project.findOne({ _id: projectId, teamId, archivedAt: null });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ project });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function updateProject(req, res) {
  try {
    const { projectId, teamId } = req.params;
    const allowedFields = ['title', 'description', 'status', 'priority'];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const project = await Project.findOneAndUpdate(
      { _id: projectId, teamId, archivedAt: null },
      updates,
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ project });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function archiveProject(req, res) {
  try {
    const { projectId, teamId } = req.params;
    const project = await Project.findOneAndUpdate(
      { _id: projectId, teamId, archivedAt: null },
      { archivedAt: new Date() },
      { new: true }
    );
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

module.exports = {
  createProject,
  listProjects,
  getProjectDetails,
  updateProject,
  archiveProject
};
