const express = require("express");
const botRouter = express.Router();
const rateLimit = require("express-rate-limit");
const { botChat } = require("../controllers/bot.controller");

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

botRouter.post("/bot/chat", botRateLimiter, botChat);

module.exports = botRouter;
