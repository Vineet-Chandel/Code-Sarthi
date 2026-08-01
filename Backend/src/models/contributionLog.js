const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContributionLogSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  issueId: { type: Schema.Types.ObjectId, ref: 'Issue', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date, default: null }, // null while timer is running
  durationSeconds: { type: Number, default: null } // computed on stop
}, { timestamps: true });

ContributionLogSchema.index({ teamId: 1, userId: 1, startedAt: -1 });
ContributionLogSchema.index({ issueId: 1 });
ContributionLogSchema.index({ userId: 1, endedAt: 1 }); // fast "is there a running timer" lookup

module.exports = mongoose.model("ContributionLog", ContributionLogSchema);
