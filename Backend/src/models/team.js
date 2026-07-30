const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, maxlength: 500 },
  ownerId: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, // current leader, mutable
  createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, // original founder, immutable
  memberCount: { type: Number, default: 1 }, // denormalized; updated transactionally on join/remove/leave
  inviteCode: { type: String, unique: true, sparse: true },
  inviteCodeExpiresAt: { type: Date, default: null }, // null = never expires (v1 default)
  status: { type: String, enum: ['active', 'archived'], default: 'active' }
}, { timestamps: true });

TeamSchema.index({ ownerId: 1 });

module.exports = mongoose.model("Team", TeamSchema);
