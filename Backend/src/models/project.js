const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, maxlength: 1000, default: '' },
  status: {
    type: String,
    enum: ['planning', 'active', 'on_hold', 'completed'],
    default: 'planning'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  archivedAt: { type: Date, default: null } // soft delete
}, { timestamps: true });

ProjectSchema.index({ teamId: 1, status: 1 });
ProjectSchema.index({ teamId: 1, createdAt: -1 }); // default list ordering

module.exports = mongoose.model("Project", ProjectSchema);
