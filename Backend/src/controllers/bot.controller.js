const OpenAI = require("openai");
const crypto = require("crypto");
const redis = require("../configs/redis");
const { BOT_SYSTEM_PROMPT } = require("../config/botKnowledge");

// Reuse the same Groq/OpenAI-compat client pattern as aiWork.js
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const MAX_TOKENS = 400;
const MODEL = "llama-3.1-8b-instant"; // Fast 8B — sufficient for FAQ/info tasks

/**
 * Normalize a question for cache keying:
 * lowercase, trim whitespace, collapse multiple spaces.
 */
function normalizeQuestion(text) {
    return text.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Hash a normalized question to a short Redis key.
 */
function hashQuestion(normalized) {
    return "bot:cache:" + crypto.createHash("sha256").update(normalized).digest("hex").slice(0, 32);
}

/**
 * Stream a plain string back to the client as SSE chunks.
 * Used for cache hits — identical UX to a live Groq call.
 */
async function streamCachedResponse(res, text) {
    const chunkSize = 8; // characters per fake chunk
    for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);
        res.write(`data: ${JSON.stringify({ token: chunk })}\n\n`);
        // Small delay so the frontend streaming animation still plays
        await new Promise((r) => setTimeout(r, 12));
    }
    res.write(`data: [DONE]\n\n`);
    res.end();
}

/**
 * POST /api/bot/chat
 * Body: { message: string }
 *
 * Flow:
 *  1. Rate limit (applied in route before reaching here)
 *  2. Normalize question → check Redis cache
 *  3. Cache hit  → stream cached text (SSE)
 *  4. Cache miss → Groq stream → pipe SSE → write to Redis
 */
const botChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return res.status(400).json({ error: "Message is required." });
        }

        if (message.trim().length > 500) {
            return res.status(400).json({ error: "Message too long. Please keep it under 500 characters." });
        }

        // Set SSE headers
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no"); // Disable nginx buffering if present
        res.flushHeaders();

        const normalized = normalizeQuestion(message);
        const cacheKey = hashQuestion(normalized);

        // ── Check Redis cache ──────────────────────────────────────────────
        let cached = null;
        try {
            cached = await redis.get(cacheKey);
        } catch (redisErr) {
            // Redis errors should not block the user — fall through to Groq
            console.warn("⚠️  Redis read error (bot cache):", redisErr.message);
        }

        if (cached) {
            // console.log(`🟢 Bot cache HIT for key: ${cacheKey}`);
            return streamCachedResponse(res, cached);
        }

        // console.log(`🔴 Bot cache MISS — calling Groq for: "${normalized.slice(0, 60)}"`);

        // ── Call Groq with streaming ────────────────────────────────────────
        const stream = await groq.chat.completions.create({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            stream: true,
            messages: [
                { role: "system", content: BOT_SYSTEM_PROMPT },
                { role: "user", content: message.trim() },
            ],
        });

        let fullResponse = "";

        for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content;
            if (token) {
                fullResponse += token;
                res.write(`data: ${JSON.stringify({ token })}\n\n`);
            }
        }

        res.write(`data: [DONE]\n\n`);
        res.end();

        // ── Write to Redis cache (async, non-blocking) ────────────────────
        if (fullResponse.length > 0) {
            redis
                .setEx(cacheKey, CACHE_TTL_SECONDS, fullResponse)
                .then(() => console.log(`✅ Bot response cached: ${cacheKey}`))
                .catch((err) => console.warn("⚠️  Redis write error (bot cache):", err.message));
        }
    } catch (err) {
        console.error("❌ Bot controller error:", err.message);

        // If headers not sent yet, send JSON error; otherwise close SSE
        if (!res.headersSent) {
            res.status(500).json({ error: "Something went wrong. Please try again." });
        } else {
            res.write(`data: ${JSON.stringify({ error: "Stream interrupted. Please try again." })}\n\n`);
            res.end();
        }
    }
};

module.exports = { botChat };
