const mongoose = require("mongoose");
const { Schema } = mongoose;

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
    }
  },
  { timestamps: true }
);

// Indexes
folderSchema.index({ owner: 1, name: 1 });

module.exports = mongoose.model("Folder", folderSchema, "Folders");
