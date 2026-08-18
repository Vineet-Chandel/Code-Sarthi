const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PullRequestSchema = new Schema({
  repositoryId: { type: Schema.Types.ObjectId, ref: 'Repository', required: true },
  githubPrNumber: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  sourceBranch: { type: String, required: true },
  targetBranch: { type: String, required: true },
  headSha: { type: String, required: true },
  mergeSha: { type: String, default: null },
  state: {
    type: String,
    enum: ['open', 'closed', 'merged'],
    default: 'open'
  },
  conflicting: { type: Boolean, default: false },
  conflictFiles: { type: [String], default: [] }
}, { timestamps: true });

PullRequestSchema.index({ repositoryId: 1, githubPrNumber: 1 }, { unique: true });

module.exports = mongoose.model("PullRequest", PullRequestSchema);
