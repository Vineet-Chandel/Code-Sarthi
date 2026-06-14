const mongoose = require('mongoose');



const ConvoSchema = new mongoose.Schema({
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
    enum: ["private", "group"],
    default: "private"
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

module.exports = mongoose.model("conversation", ConvoSchema, "conversation");