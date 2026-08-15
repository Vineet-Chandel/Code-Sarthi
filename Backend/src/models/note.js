const mongoose = require("mongoose");
const { Schema } = mongoose;

const blockSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      "paragraph",
      "heading-1",
      "heading-2",
      "heading-3",
      "code",
      "checklist",
      "bullet-list",
      "numbered-list",
      "quote",
      "callout",
      "divider",
      "table",
      "image",
      "bug-fix",
      "learning",
      "decision",
      "command",
      "api-reference",
      "architecture-decision",
      "dsa",
      "interview"
    ]
  },
  content: {
    type: String,
    default: ""
  },
  properties: {
    type: Schema.Types.Mixed,
    default: {}
  }
});

const noteSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    title: {
      type: String,
      default: "",
      trim: true
    },
    content: {
      type: String,
      default: ""
    },
    blocks: [blockSchema],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true
      }
    ],
    pinned: {
      type: Boolean,
      default: false
    },
    favorite: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      default: null
    },
    goalId: {
      type: Schema.Types.ObjectId,
      ref: "Goals",
      default: null
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      default: null
    },
    linkedIssueId: {
      type: Schema.Types.ObjectId,
      ref: "Issue",
      default: null
    },
    noteType: {
      type: String,
      enum: [
        "note",
        "diary",
        "bug-fix",
        "learning",
        "decision",
        "command",
        "api-reference",
        "architecture-decision",
        "dsa",
        "interview"
      ],
      default: "note"
    },
    wordCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Indexes for fast lookup
noteSchema.index({ owner: 1, isDeleted: 1, updatedAt: -1 });
noteSchema.index({ tags: 1 });
noteSchema.index({ projectId: 1 });
noteSchema.index({ goalId: 1 });
noteSchema.index({ folderId: 1 });

module.exports = mongoose.model("Note", noteSchema, "Notes");
