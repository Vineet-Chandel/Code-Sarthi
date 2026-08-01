const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true }, // denormalized for direct scoping/index use
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  type: { type: String, enum: ['feature', 'problem', 'issue'], required: true },
  title: { type: String, required: true, trim: true, maxlength: 150 },
  description: { type: String, maxlength: 2000, default: '' },
  status: { type: String, enum: ['open', 'in_progress', 'done'], default: 'open' },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'Users', default: null }, // stays null this phase
  linkedGoalId: { type: Schema.Types.ObjectId, ref: 'Goals', default: null },
  assignmentSource: {
    type: String,
    enum: ['unassigned', 'self_claimed', 'leader_assigned'],
    default: 'unassigned'
  }, // field exists now so Phase 3 doesn't need a migration; logic stays untouched here
  assignedAt: { type: Date, default: null },
  archivedAt: { type: Date, default: null }
}, { timestamps: true });

IssueSchema.index({ projectId: 1, status: 1 });
IssueSchema.index({ teamId: 1, assignedTo: 1 }); // ready for Phase 3 "my issues" queries

module.exports = mongoose.model("Issue", IssueSchema);
