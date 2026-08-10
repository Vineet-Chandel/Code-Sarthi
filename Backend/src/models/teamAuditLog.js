const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamAuditLogSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  previousOwnerId: { type: Schema.Types.ObjectId, ref: 'Users' }, // can be null if team was just created, though here it's mainly for succession
  newOwnerId: { type: Schema.Types.ObjectId, ref: 'Users' },
  reason: { type: String, required: true }, // e.g., 'AUTO_SUCCESSION'
  triggeredBy: { type: String, enum: ['ACCOUNT_DELETION', 'VOLUNTARY_LEAVE'], required: true },
  timestamp: { type: Date, default: Date.now }
});

TeamAuditLogSchema.index({ teamId: 1, timestamp: -1 });

module.exports = mongoose.model("TeamAuditLog", TeamAuditLogSchema);
