const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RepositorySchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', default: null },
  githubRepositoryId: { type: Number, required: true, unique: true },
  owner: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: null },
  defaultBranch: { type: String, default: 'main' },
  installationId: { type: Number, required: true },
  syncStatus: {
    type: String,
    enum: ['NOT_STARTED', 'QUEUED', 'SYNCING', 'COMPLETED', 'FAILED'],
    default: 'NOT_STARTED'
  },
  lastSyncAt: { type: Date, default: null },
  lastSyncError: { type: String, default: null }
}, { timestamps: true });

RepositorySchema.index({ teamId: 1 });
RepositorySchema.index({ projectId: 1 });

module.exports = mongoose.model("Repository", RepositorySchema);
