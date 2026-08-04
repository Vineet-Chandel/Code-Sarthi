const mongoose = require("mongoose");
const { Schema } = mongoose;

const BotConversationSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
            index: true,
        },
        title: {
            type: String,
            default: "New Chat",
            trim: true,
        },
        topic: {
            type: String,
            enum: [
                "Resume",
                "Interview",
                "DevConnect",
                "ProjectManager",
                "DevToolkit",
                "General",
            ],
            default: "General",
        },
        lastMessagePreview: {
            type: String,
            default: "",
            maxlength: 200,
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        // Stubbed for Tier 2/3 features (zero migrations later)
        contextRefs: [
            {
                type: { type: String }, // e.g. "resume", "issue"
                refId: { type: mongoose.Schema.Types.ObjectId },
            },
        ],
        isPublic: {
            type: Boolean,
            default: false,
        },
        shareSlug: {
            type: String,
            sparse: true,
            unique: true,
        },
    },
    { timestamps: true }
);

// High-performance composite index for sidebar sorting by recency per user
BotConversationSchema.index({ userId: 1, isArchived: 1, updatedAt: -1 });

module.exports = mongoose.model("BotConversation", BotConversationSchema, "bot_conversations");
