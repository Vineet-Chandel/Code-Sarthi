const Project = require("../models/project");
const Issue = require("../models/issue");
const { handleRouteError } = require("../utils/handleRouteError");
const { broadcastService } = require("../Socket/Services/BroadcastService");
const Message = require("../models/message");
const Conversation = require("../models/conversation");
const Team = require("../models/team");

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
    const populatedProject = await Project.findById(project._id).populate('createdBy', 'firstName lastName photoUrl');

    res.status(201).json({ project: populatedProject });
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

    const projects = await Project.find(filter).sort({ createdAt: -1 }).populate('createdBy', 'firstName lastName photoUrl');
    res.json({ projects });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getProjectDetails(req, res) {
  try {
    const { projectId, teamId } = req.params;
    const project = await Project.findOne({ _id: projectId, teamId, archivedAt: null }).populate('createdBy', 'firstName lastName photoUrl');
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ project });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function updateProject(req, res) {
  try {
    const { projectId, teamId } = req.params;

    const projectExists = await Project.findOne({ _id: projectId, teamId, archivedAt: null });
    if (!projectExists) return res.status(404).json({ error: 'Project not found' });

    if (req.body.githubRepo !== undefined) {
      if (projectExists.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Only the creator of this project has permission to link it with GitHub.' });
      }
    }

    const allowedFields = ['title', 'description', 'status', 'priority', 'links', 'githubRepo'];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const project = await Project.findOneAndUpdate(
      { _id: projectId, teamId, archivedAt: null },
      updates,
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName photoUrl');

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

async function deleteProject(req, res) {
  try {
    const { projectId, teamId } = req.params;
    const project = await Project.findOneAndDelete({ _id: projectId, teamId });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await Issue.deleteMany({ projectId, teamId });
    res.json({ success: true });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function notifyLeaderToLink(req, res) {
  try {
    const { teamId, projectId } = req.params;

    const project = await Project.findOne({ _id: projectId, teamId, archivedAt: null });
    if (!project) return res.status(404).json({ error: 'Project not found or archived' });

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ error: 'Team not found' });

    if (!team.generalConversationId) {
      return res.status(400).json({ error: 'Team general chat is not configured' });
    }

    const conversation = await Conversation.findById(team.generalConversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'General conversation not found' });
    }

    const sender = req.user;

    const content = `[GITHUB_NOTIFICATION]:${JSON.stringify({
      projectId: project._id,
      projectName: project.title,
      senderName: `${sender.firstName} ${sender.lastName}`
    })}`;

    const messageStored = new Message({
      conversation_id: conversation._id,
      sender_id: sender._id,
      content: content,
      messageType: 'text',
      status: "sent"
    });

    await messageStored.save();

    conversation.lastMessage = messageStored._id;
    conversation.updatedAt = new Date();
    conversation.unreadCounts.forEach(item => {
      if (item.user.toString() !== sender._id.toString()) {
        item.count++;
      }
    });
    await conversation.save();

    const populatedMessage = await Message.findById(messageStored._id).populate(
      "sender_id",
      "firstName lastName photoUrl gmail username profession college about middleName skills isVerified"
    );

    const payload = {
      type: "message",
      conversation,
      message: populatedMessage
    };

    broadcastService(conversation.members, payload);

    res.json({ success: true, message: 'Leader notified successfully.' });
  } catch (err) {
    return handleRouteError(err, res);
  }
}


async function installProject(req, res) {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({
        error: 'User not found or archived'
      })
    }

    const { TEAM_ID, PROJECT_ID } = req.params;
    const project = await Project.findOne({ _id: PROJECT_ID, TEAM_ID });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    if (user._id.toString() != project.createdBy.toString()) {
      res.status(404).json({
        error: 'Only Owner can do this action'
      });
    }


  } catch (err) {
    return handleRouteError(err, res);
  }
}




module.exports = {
  createProject,
  listProjects,
  getProjectDetails,
  updateProject,
  archiveProject,
  deleteProject,
  notifyLeaderToLink
};
