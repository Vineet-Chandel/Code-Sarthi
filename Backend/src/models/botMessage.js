const mongoose = require("mongoose");
const { Schema } = mongoose;

const BotMessageSchema = new Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BotConversation",
            required: true,
            index: true,
        },
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        reaction: {
            type: String,
            enum: ["like", "dislike", null],
            default: null,
        },
        reactedAt: {
            type: Date,
            default: null,
        },
        // Tier 1 & stubbed Tier 2/3 fields
        feedbackNote: {
            type: String,
            default: null, // Used when user provides a reason for dislike
        },
        previousContent: [
            {
                content: { type: String },
                createdAt: { type: Date, default: Date.now },
            },
        ], // Used when assistant responses are regenerated or user messages edited
        followUps: [
            {
                type: String,
            },
        ], // Stubbed for Tier 2 suggested follow-up questions
    },
    { timestamps: true }
);

// Index for ordered chronological conversation history retrieval
BotMessageSchema.index({ conversationId: 1, createdAt: 1 });

// Text index on content for high-speed conversation search across messages
BotMessageSchema.index({ content: "text" });

module.exports = mongoose.model("BotMessage", BotMessageSchema, "bot_messages");
