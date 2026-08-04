const express = require("express");
const botRouter = express.Router();
const rateLimit = require("express-rate-limit");
const { userAuth } = require("../middlewares/userAuth");
const {
    botChat,
    listConversations,
    createConversation,
    getConversation,
    updateConversation,
    deleteConversation,
    postMessage,
    updateMessageReaction,
    regenerateMessage,
    editMessage,
} = require("../controllers/bot.controller");

// Per-IP rate limit: 30 requests per 10 minutes
const botRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests. Please wait a moment before asking again.",
    },
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests. Please wait a moment before asking again.",
        });
    },
});

// Standalone Shastra AI stream (legacy compatibility)
botRouter.post("/bot/chat", botRateLimiter, botChat);

// Persistent Shastra AI Conversation thread management
botRouter.get("/conversations", userAuth, listConversations);
botRouter.post("/conversations", userAuth, createConversation);
botRouter.get("/conversations/:id", userAuth, getConversation);
botRouter.patch("/conversations/:id", userAuth, updateConversation);
botRouter.delete("/conversations/:id", userAuth, deleteConversation);

// Conversational turn streaming & feedback reactions
botRouter.post("/conversations/:id/messages", userAuth, botRateLimiter, postMessage);
botRouter.patch("/messages/:id/reaction", userAuth, updateMessageReaction);
botRouter.post("/messages/:id/regenerate", userAuth, botRateLimiter, regenerateMessage);
botRouter.patch("/messages/:id", userAuth, botRateLimiter, editMessage);

module.exports = botRouter;
