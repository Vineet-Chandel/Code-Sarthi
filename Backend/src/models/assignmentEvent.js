const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentEventSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  issueId: { type: Schema.Types.ObjectId, ref: 'Issue', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, // who got assigned (can be null for unclaim if we wanted, but schema says required so we will set it to the user who unclaimed it, or maybe user is the assignee in all cases)
  action: { type: String, enum: ['claimed', 'assigned', 'unclaimed'], required: true },
  actorId: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, // who performed the action
  timestamp: { type: Date, default: Date.now }
});

AssignmentEventSchema.index({ teamId: 1, userId: 1 });

module.exports = mongoose.model("AssignmentEvent", AssignmentEventSchema);
