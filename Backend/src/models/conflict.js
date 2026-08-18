const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConflictSchema = new Schema({
  pullRequestId: { type: Schema.Types.ObjectId, ref: 'PullRequest', required: true },
  issueId: { type: Schema.Types.ObjectId, ref: 'Issue', default: null },
  type: {
    type: String,
    enum: ['git_merge_conflict', 'textual', 'dependency', 'requirement', 'behavioral_regression', 'checkpoint_impact'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active'
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'high'
  },
  description: { type: String, required: true },
  affectedFiles: { type: [String], default: [] },
  details: { type: Schema.Types.Mixed, default: {} },
  resolvedAt: { type: Date, default: null }
}, { timestamps: true });

ConflictSchema.index({ pullRequestId: 1 });
ConflictSchema.index({ issueId: 1 });
ConflictSchema.index({ type: 1 });

module.exports = mongoose.model("Conflict", ConflictSchema);
