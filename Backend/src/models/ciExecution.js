const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CIExecutionSchema = new Schema({
  repositoryId: { type: Schema.Types.ObjectId, ref: 'Repository', required: true },
  githubWorkflowRunId: { type: Number, required: true, unique: true },
  workflowName: { type: String, trim: true },
  branch: { type: String, required: true },
  sha: { type: String, required: true },
  status: {
    type: String,
    enum: ['queued', 'in_progress', 'completed'],
    default: 'queued'
  },
  conclusion: {
    type: String,
    enum: ['success', 'failure', 'cancelled', 'skipped', null],
    default: null
  },
  startedAt: { type: Date, required: true },
  completedAt: { type: Date, default: null }
}, { timestamps: true });

CIExecutionSchema.index({ repositoryId: 1 });
CIExecutionSchema.index({ sha: 1 });

module.exports = mongoose.model("CIExecution", CIExecutionSchema);
