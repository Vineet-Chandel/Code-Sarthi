const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueLinkSchema = new Schema({
  issueId: { type: Schema.Types.ObjectId, ref: 'Issue', required: true },
  entityType: {
    type: String,
    enum: ['branch', 'commit', 'pull_request'],
    required: true
  },
  entityId: { type: Schema.Types.ObjectId, required: true },
  confidence: { type: Number, default: 100 },
  linkedBy: {
    type: String,
    enum: ['developer', 'branch_name', 'commit_message', 'pr_body', 'ai'],
    required: true
  },
  linkedAt: { type: Date, default: Date.now }
}, { timestamps: true });

IssueLinkSchema.index({ issueId: 1 });
IssueLinkSchema.index({ entityType: 1, entityId: 1 });
IssueLinkSchema.index({ issueId: 1, entityType: 1, entityId: 1 }, { unique: true });

module.exports = mongoose.model("IssueLink", IssueLinkSchema);
