const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  repositoryId: { type: Schema.Types.ObjectId, ref: 'Repository', required: true },
  name: { type: String, required: true, trim: true },
  sha: { type: String, required: true },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

BranchSchema.index({ repositoryId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Branch", BranchSchema);
