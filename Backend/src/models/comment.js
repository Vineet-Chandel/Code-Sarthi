const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    issueId: {
      type: Schema.Types.ObjectId,
      ref: "Issue",
      required: true,
      index: true
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Compound index for fast ordered cursor-based pagination
commentSchema.index({ issueId: 1, createdAt: 1 });

module.exports = mongoose.model("Comment", commentSchema);
