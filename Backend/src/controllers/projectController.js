const mongoose = require("mongoose");
const Project = require("../models/project");
const Issue = require("../models/issue");
const { handleRouteError } = require("../utils/handleRouteError");
const { broadcastService } = require("../Socket/Services/BroadcastService");
const Message = require("../models/message");
const Conversation = require("../models/conversation");
const Team = require("../models/team");
const crypto = require("crypto");
const GithubInstallState = require("../models/githubInstallState");

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

const startGithubInstall = async (req, res) => {
  try {

    const { projectId } = req.query;
    const userId = req.user._id.toString();

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "projectId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid projectId format",
      });
    }

    // 1. Verify project belongs to / is accessible by current user (creator)
    const project = await Project.findOne({
      _id: projectId,
      createdBy: userId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // 2. Generate secure state
    const state = crypto.randomBytes(32).toString("hex");

    // 3. Save state ↔ project ↔ user
    await GithubInstallState.create({
      state,
      userId,
      projectId: project._id,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      used: false,
    });

    // 4. Build GitHub installation URL
    const githubUrl = new URL(
      `https://github.com/apps/${process.env.GITHUB_APP_SLUG}/installations/new`
    );

    githubUrl.searchParams.set("state", state);

    // 5. Send user to GitHub (JSON for AJAX/JSON requests, redirect for direct navigation)
    if (req.xhr || (req.headers.accept && req.headers.accept.includes("json"))) {
      return res.status(200).json({
        success: true,
        url: githubUrl.toString()
      });
    }
    return res.redirect(githubUrl.toString());

  } catch (error) {
    console.error("GitHub installation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to start GitHub connection",
    });
  }
};


const gitHubAccSetup = async (req, res) => {
  try {
    const { installation_id, state } = req.query;

    console.log("installation_id:", installation_id);
    console.log("state:", state);

    if (!installation_id || !state) {
      return res.status(400).json({
        success: false,
        message: "installation_id and state are required"
      });
    }

    // Find the state that we created before sending
    // the user to GitHub.
    const installState = await GithubInstallState.findOne({
      state,
      used: false,
      expiresAt: { $gt: new Date() }
    });

    if (!installState) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired GitHub installation state"
      });
    }

    console.log("Matched install state:", installState);



    // Next:
    // 1. Validate GitHub installation
    // 2. Store installation_id against the project
    // 3. Generate installation access token
    // 4. Fetch repositories
    // 5. Redirect to repository selection page

    const frontendUrl = process.env.AT_FRONT || "http://localhost:5173";
    return res.redirect(`${frontendUrl}/app/projects?githubConnected=true`);

  } catch (err) {
    console.error("GitHub installation error:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to complete GitHub connection"
    });
  }
};
module.exports = {
  createProject,
  listProjects,
  getProjectDetails,
  updateProject,
  archiveProject,
  deleteProject,
  notifyLeaderToLink,
  startGithubInstall,
  gitHubAccSetup
};
