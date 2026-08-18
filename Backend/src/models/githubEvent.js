const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GithubEventSchema = new Schema({
  githubEventId: { type: String, required: true, unique: true },
  eventType: { type: String, required: true },
  payload: { type: Schema.Types.Mixed, required: true },
  processed: { type: Boolean, default: false },
  processedAt: { type: Date, default: null }
}, { timestamps: true });

GithubEventSchema.index({ eventType: 1 });
GithubEventSchema.index({ processed: 1 });

module.exports = mongoose.model("GithubEvent", GithubEventSchema);
