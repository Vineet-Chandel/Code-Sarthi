const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventOutboxSchema = new Schema({
  type: { type: String, required: true }, // e.g., 'EMAIL_NOTIFICATION'
  payload: { type: Schema.Types.Mixed, required: true }, // { to, subject, html }
  status: { type: String, enum: ['pending', 'processed', 'failed'], default: 'pending' },
  error: { type: String },
  createdAt: { type: Date, default: Date.now },
  processedAt: { type: Date }
});

EventOutboxSchema.index({ status: 1, createdAt: 1 });

module.exports = mongoose.model("EventOutbox", EventOutboxSchema);
