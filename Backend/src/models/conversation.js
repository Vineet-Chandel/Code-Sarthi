const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConvoSchema = new Schema({
  //Name of the group if it is the group
  name: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  groupImage: {
    type: String,
  },
  type: {
    type: String,
    enum: ["private", "group", "team_general", "team_issue"],
    default: "private"
  },

  // ─── Team-scoped references (required when type starts with "team_") ──────
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: null   // required only for type = "team_issue"
  },
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue",
    default: null   // required only for type = "team_issue"
  },

  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }],
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'message'
  },
  lastActivity: {
    type: String,
    enum: ["call", "videoCall"]
  },
  unreadCounts: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      },
      count: {
        type: Number,
        default: 0
      }
    }
  ],

  updatedAt: {
    type: Date
  }
}, { timestamps: true })

ConvoSchema.index({ teamId: 1, type: 1 });

module.exports = mongoose.model("conversation", ConvoSchema, "conversation");