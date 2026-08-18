const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommitSchema = new Schema({
  repositoryId: { type: Schema.Types.ObjectId, ref: 'Repository', required: true },
  sha: { type: String, required: true },
  author: {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    username: { type: String, trim: true }
  },
  userId: { type: Schema.Types.ObjectId, ref: 'Users', default: null },
  message: { type: String, required: true },
  timestamp: { type: Date, required: true }
}, { timestamps: true });

CommitSchema.index({ repositoryId: 1, sha: 1 }, { unique: true });
CommitSchema.index({ sha: 1 });
CommitSchema.index({ userId: 1 });

module.exports = mongoose.model("Commit", CommitSchema);
