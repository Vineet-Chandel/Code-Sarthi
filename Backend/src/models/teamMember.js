const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  role: { type: String, enum: ['leader', 'member'], default: 'member' },
  status: { type: String, enum: ['active', 'removed', 'left'], default: 'active' },
  joinedAt: { type: Date, default: Date.now },
  invitedBy: { type: Schema.Types.ObjectId, ref: 'Users', default: null }
}, { timestamps: true });

TeamMemberSchema.index({ teamId: 1, userId: 1 }, { unique: true });
TeamMemberSchema.index({ userId: 1 }); // for "my teams" queries

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
