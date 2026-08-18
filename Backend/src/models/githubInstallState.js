const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GithubInstallStateSchema = new Schema({
  state: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false }
}, { timestamps: true });

// Auto-expire documents after expiresAt passes
GithubInstallStateSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("GithubInstallState", GithubInstallStateSchema);
