const OpenAI = require("openai");
const crypto = require("crypto");
const redis = require("../configs/redis");
const { BOT_SYSTEM_PROMPT } = require("../config/botKnowledge");
const BotConversation = require("../models/botConversation");
const BotMessage = require("../models/botMessage");

// Reuse the same Groq/OpenAI-compat client pattern as aiWork.js
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const MAX_TOKENS = 600;
const MODEL = "llama-3.3-70b-versatile"; // High capacity model for deep reasoning & knowledge
const FAST_MODEL = "llama-3.1-8b-instant"; // Ultra-fast lightweight model for title generation

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
function hashQuestion(normalized, userName = "") {
    const rawKey = `${normalized}:${userName.toLowerCase().trim()}`;
    return "bot:v2:cache:" + crypto.createHash("sha256").update(rawKey).digest("hex").slice(0, 32);
}

/**
 * Stream a plain string back to the client as SSE chunks.
 * Used for cache hits — identical UX to a live Groq call.
 */
async function streamCachedResponse(res, text, metaData = {}) {
    if (metaData.userMessageId) {
        res.write(`data: ${JSON.stringify({ userMessageId: metaData.userMessageId })}\n\n`);
    }
    const chunkSize = 12; // characters per fake chunk
    for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);
        res.write(`data: ${JSON.stringify({ token: chunk })}\n\n`);
        await new Promise((r) => setTimeout(r, 10));
    }
    if (metaData.messageId) {
        res.write(`data: ${JSON.stringify({ messageId: metaData.messageId })}\n\n`);
    }
    if (metaData.title || metaData.topic) {
        res.write(`data: ${JSON.stringify({ meta: { title: metaData.title, topic: metaData.topic } })}\n\n`);
    }
    res.write(`data: [DONE]\n\n`);
    res.end();
}

/**
 * Helper: Generate auto-title and topic using fast 8B model without huge system prompt
 */
async function generateTitleAndTopic(userText) {
    try {
        const prompt = `You are a helpful conversation categorizer. For the user message below, create a short 3-5 word concise title and classify it into exactly one of these topics: ["Resume", "Interview", "DevConnect", "ProjectManager", "DevToolkit", "General"]. Return pure valid JSON only in this exact format: {"title": "...", "topic": "..."}. Do not include markdown formatting or quotes around the JSON object.\n\nUser Message: "${userText.slice(0, 300)}"`;
        const resp = await groq.chat.completions.create({
            model: FAST_MODEL,
            temperature: 0.3,
            max_tokens: 50,
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: prompt }],
        });
        const parsed = JSON.parse(resp.choices[0].message.content);
        const title = parsed.title || userText.slice(0, 30) + "...";
        const validTopics = ["Resume", "Interview", "DevConnect", "ProjectManager", "DevToolkit", "General"];
        const topic = validTopics.includes(parsed.topic) ? parsed.topic : "General";
        return { title, topic };
    } catch (err) {
        console.warn("⚠️ Title generation failed, using fallback:", err.message);
        return {
            title: userText.slice(0, 32) + (userText.length > 32 ? "..." : ""),
            topic: "General",
        };
    }
}

/**
 * Legacy standalone endpoint
 * POST /api/bot/chat
 */
const botChat = async (req, res) => {
    try {
        const { message, userName = "" } = req.body;

        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return res.status(400).json({ error: "Message is required." });
        }

        if (message.trim().length > 1000) {
            return res.status(400).json({ error: "Message too long. Please keep it under 1000 characters." });
        }

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no");
        res.flushHeaders();

        const normalized = normalizeQuestion(message);
        const cacheKey = hashQuestion(normalized, userName);

        const isGreetingOrShort = normalized.length < 25 || /^(hi|hello|hey|yo|namaste|good morning|good evening|good afternoon|thanks|thank you|bye|see you|how are you|what can you do)[\s!.?]*$/i.test(normalized);

        let cached = null;
        if (!isGreetingOrShort) {
            try {
                cached = await redis.get(cacheKey);
            } catch (redisErr) {
                console.warn("⚠️ Redis read error (bot cache):", redisErr.message);
            }
        }

        if (cached) {
            return streamCachedResponse(res, cached);
        }

        const cleanName = userName ? userName.trim() : "";
        let userContext = `\n\n=====================================================\nMANDATORY FORMATTING & STRUCTURING INSTRUCTIONS\n=====================================================\n• NEAT PARAGRAPH BREAKDOWN: You MUST format your reply cleanly with well-defined paragraphs separated by line breaks (double newlines). Avoid dense, single-paragraph responses.\n• BREAK ON TOPIC CLOSURE: Once an opening greeting or a specific topic/feature description is finished, break the line immediately before introducing the next thought or question to keep the output neat, clean, and highly scannable.`;
        if (cleanName) {
            userContext += `\n• USER GREETING: The user speaking to you is named "${cleanName}". Whenever they greet you, warmly greet them back by taking their name in your opening paragraph.`;
        }

        const stream = await groq.chat.completions.create({
            model: MODEL,
            temperature: 0.7,
            max_tokens: MAX_TOKENS,
            stream: true,
            messages: [
                { role: "system", content: BOT_SYSTEM_PROMPT + userContext },
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

        if (!isGreetingOrShort && fullResponse.length > 0) {
            redis
                .setEx(cacheKey, CACHE_TTL_SECONDS, fullResponse)
                .then(() => console.log(`✅ Bot response cached: ${cacheKey}`))
                .catch((err) => console.warn("⚠️ Redis write error (bot cache):", err.message));
        }
    } catch (err) {
        console.error("❌ Bot controller error:", err.message);
        if (!res.headersSent) {
            res.status(500).json({ error: "Something went wrong. Please try again." });
        } else {
            res.write(`data: ${JSON.stringify({ error: "Stream interrupted. Please try again." })}\n\n`);
            res.end();
        }
    }
};

/* =========================================================
   PERSISTENT CONVERSATION CRUD & REAL-TIME STREAMING
========================================================= */

/**
 * GET /api/conversations
 * List user's conversations with optional search across titles & messages
 */
const listConversations = async (req, res) => {
    try {
        const userId = req.user._id;
        const { archived = "false", search = "", limit = "50", cursor } = req.query;

        const query = {
            userId,
            isArchived: archived === "true",
        };

        if (cursor) {
            query.updatedAt = { $lt: new Date(cursor) };
        }

        // If search term provided, query title regex or message content
        if (search && search.trim() !== "") {
            const searchRegex = new RegExp(search.trim(), "i");

            // Find matching messages for this user first
            const matchingMsgs = await BotMessage.find({
                content: { $regex: searchRegex },
            }).select("conversationId");

            const msgConvoIds = matchingMsgs.map((m) => m.conversationId);

            query.$or = [{ title: searchRegex }, { _id: { $in: msgConvoIds } }];
        }

        const conversations = await BotConversation.find(query)
            .sort({ isPinned: -1, updatedAt: -1 })
            .limit(parseInt(limit, 10))
            .lean();

        res.json({ conversations });
    } catch (err) {
        console.error("❌ listConversations error:", err.message);
        res.status(500).json({ error: "Failed to load conversations." });
    }
};

/**
 * POST /api/conversations
 * Create a new empty chat conversation
 */
const createConversation = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title = "New Chat", topic = "General", contextRefs = [] } = req.body;

        const conversation = await BotConversation.create({
            userId,
            title,
            topic,
            contextRefs,
        });

        res.status(201).json({ conversation });
    } catch (err) {
        console.error("❌ createConversation error:", err.message);
        res.status(500).json({ error: "Failed to create conversation." });
    }
};

/**
 * GET /api/conversations/:id
 * Retrieve a full chat thread and its messages
 */
const getConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const conversation = await BotConversation.findOne({ _id: id, userId }).lean();
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found." });
        }

        const messages = await BotMessage.find({ conversationId: id }).sort({ createdAt: 1 }).lean();

        res.json({ conversation, messages });
    } catch (err) {
        console.error("❌ getConversation error:", err.message);
        res.status(500).json({ error: "Failed to retrieve conversation." });
    }
};

/**
 * PATCH /api/conversations/:id
 * Update conversation metadata (title, isPinned, isArchived, topic)
 */
const updateConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { title, isPinned, isArchived, topic } = req.body;

        const updateFields = {};
        if (title !== undefined) updateFields.title = title.trim();
        if (isPinned !== undefined) updateFields.isPinned = isPinned;
        if (isArchived !== undefined) updateFields.isArchived = isArchived;
        if (topic !== undefined) updateFields.topic = topic;

        const conversation = await BotConversation.findOneAndUpdate(
            { _id: id, userId },
            { $set: updateFields },
            { new: true }
        ).lean();

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found." });
        }

        res.json({ conversation });
    } catch (err) {
        console.error("❌ updateConversation error:", err.message);
        res.status(500).json({ error: "Failed to update conversation." });
    }
};

/**
 * DELETE /api/conversations/:id
 * Delete a conversation and all its messages
 */
const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const conversation = await BotConversation.findOneAndDelete({ _id: id, userId });
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found." });
        }

        await BotMessage.deleteMany({ conversationId: id });

        res.json({ success: true, deletedId: id });
    } catch (err) {
        console.error("❌ deleteConversation error:", err.message);
        res.status(500).json({ error: "Failed to delete conversation." });
    }
};

/**
 * POST /api/conversations/:id/messages
 * Send a user message and receive an SSE stream response from Shastra AI
 */
const postMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { message } = req.body;

        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return res.status(400).json({ error: "Message is required." });
        }

        const conversation = await BotConversation.findOne({ _id: id, userId });
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found." });
        }

        // Save user message to database
        const userMsg = await BotMessage.create({
            conversationId: id,
            role: "user",
            content: message.trim(),
        });

        // Set up SSE streaming headers
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no");
        res.flushHeaders();

        // Inform client of user message ID immediately
        res.write(`data: ${JSON.stringify({ userMessageId: userMsg._id })}\n\n`);

        // Load recent history for context (strictly limited to last 6 messages / 3 turns for credit & speed optimization)
        const pastMessages = await BotMessage.find({ conversationId: id, _id: { $ne: userMsg._id } })
            .sort({ createdAt: -1 })
            .limit(6)
            .lean();
        pastMessages.reverse();

        // Build prompt with context
        const userName = req.user.firstName || req.user.userName || req.user.username || "";
        let userContext = `\n\n=====================================================\nMANDATORY FORMATTING & STRUCTURING INSTRUCTIONS\n=====================================================\n• NEAT PARAGRAPH BREAKDOWN: You MUST format your reply cleanly with well-defined paragraphs separated by line breaks (double newlines). Avoid dense, single-paragraph responses.\n• BREAK ON TOPIC CLOSURE: Once an opening greeting or a specific topic/feature description is finished, break the line immediately before introducing the next thought or question to keep the output neat, clean, and highly scannable.`;
        if (userName) {
            userContext += `\n• USER GREETING: The user speaking to you is named "${userName}".`;
        }

        const chatMessages = [{ role: "system", content: BOT_SYSTEM_PROMPT + userContext }];
        pastMessages.forEach((pm) => {
            chatMessages.push({ role: pm.role, content: pm.content });
        });
        chatMessages.push({ role: "user", content: message.trim() });

        // Stream from Groq with optimized temperature for rapid inference
        const stream = await groq.chat.completions.create({
            model: MODEL,
            temperature: 0.6,
            max_tokens: MAX_TOKENS,
            stream: true,
            messages: chatMessages,
        });

        let fullResponse = "";
        for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content;
            if (token) {
                fullResponse += token;
                res.write(`data: ${JSON.stringify({ token })}\n\n`);
            }
        }

        // Persist completed assistant response in database
        const assistantMsg = await BotMessage.create({
            conversationId: id,
            role: "assistant",
            content: fullResponse || "I couldn't generate a response at this moment.",
        });

        res.write(`data: ${JSON.stringify({ messageId: assistantMsg._id })}\n\n`);

        // Update conversation summary and updatedAt
        const previewText = message.trim().slice(0, 80) + (message.trim().length > 80 ? "..." : "");
        let updatedTitle = conversation.title;
        let updatedTopic = conversation.topic;

        // Auto-generate title on first turn
        if (conversation.title === "New Chat") {
            const meta = await generateTitleAndTopic(message.trim());
            updatedTitle = meta.title;
            updatedTopic = meta.topic;
            res.write(`data: ${JSON.stringify({ meta: { title: updatedTitle, topic: updatedTopic } })}\n\n`);
        }

        await BotConversation.findByIdAndUpdate(id, {
            title: updatedTitle,
            topic: updatedTopic,
            lastMessagePreview: previewText,
            updatedAt: new Date(),
        });

        res.write(`data: [DONE]\n\n`);
        res.end();
    } catch (err) {
        console.error("❌ postMessage error:", err.message);
        if (!res.headersSent) {
            res.status(500).json({ error: "Something went wrong. Please try again." });
        } else {
            res.write(`data: ${JSON.stringify({ error: "Stream interrupted. Please try again." })}\n\n`);
            res.end();
        }
    }
};

/**
 * PATCH /api/messages/:id/reaction
 * Update user feedback reaction on an assistant message
 */
const updateMessageReaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { reaction, feedbackNote } = req.body;

        const updateObj = {
            reaction,
            reactedAt: reaction ? new Date() : null,
        };
        if (feedbackNote !== undefined) {
            updateObj.feedbackNote = feedbackNote;
        }

        const message = await BotMessage.findByIdAndUpdate(id, { $set: updateObj }, { new: true }).lean();
        if (!message) {
            return res.status(404).json({ error: "Message not found." });
        }

        res.json({ message });
    } catch (err) {
        console.error("❌ updateMessageReaction error:", err.message);
        res.status(500).json({ error: "Failed to update feedback reaction." });
    }
};

/**
 * POST /api/messages/:id/regenerate
 * Regenerate an assistant response via SSE
 */
const regenerateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const assistantMsg = await BotMessage.findById(id);
        if (!assistantMsg || assistantMsg.role !== "assistant") {
            return res.status(404).json({ error: "Assistant message not found." });
        }

        const conversation = await BotConversation.findOne({ _id: assistantMsg.conversationId, userId });
        if (!conversation) {
            return res.status(403).json({ error: "Access denied." });
        }

        // Save previous version
        assistantMsg.previousContent.push({
            content: assistantMsg.content,
            createdAt: assistantMsg.updatedAt || assistantMsg.createdAt,
        });

        // Get recent past history up to this assistant message (capped at 6 for token credit saving)
        const earlierMsgs = await BotMessage.find({
            conversationId: assistantMsg.conversationId,
            createdAt: { $lt: assistantMsg.createdAt },
        }).sort({ createdAt: -1 }).limit(6).lean();
        earlierMsgs.reverse();

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no");
        res.flushHeaders();

        const chatMessages = [{ role: "system", content: BOT_SYSTEM_PROMPT + `\n\n=====================================================\nMANDATORY FORMATTING & STRUCTURING INSTRUCTIONS\n=====================================================\n• NEAT PARAGRAPH BREAKDOWN: You MUST format your reply cleanly with well-defined paragraphs separated by line breaks (double newlines). Avoid dense, single-paragraph responses.\n• BREAK ON TOPIC CLOSURE: Once an opening greeting or a specific topic/feature description is finished, break the line immediately before introducing the next thought or question.` }];
        earlierMsgs.forEach((pm) => chatMessages.push({ role: pm.role, content: pm.content }));

        const stream = await groq.chat.completions.create({
            model: MODEL,
            temperature: 0.65, // Slightly varied temperature for quick regeneration
            max_tokens: MAX_TOKENS,
            stream: true,
            messages: chatMessages,
        });

        let newContent = "";
        for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content;
            if (token) {
                newContent += token;
                res.write(`data: ${JSON.stringify({ token })}\n\n`);
            }
        }

        assistantMsg.content = newContent || "Unable to regenerate response.";
        await assistantMsg.save();

        res.write(`data: ${JSON.stringify({ messageId: assistantMsg._id, regenerated: true })}\n\n`);
        res.write(`data: [DONE]\n\n`);
        res.end();
    } catch (err) {
        console.error("❌ regenerateMessage error:", err.message);
        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to regenerate message." });
        } else {
            res.write(`data: ${JSON.stringify({ error: "Stream interrupted." })}\n\n`);
            res.end();
        }
    }
};

/**
 * PATCH /api/messages/:id
 * Edit a user message and regenerate subsequent AI response via SSE if requested
 */
const editMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { content, stream: doStream = false } = req.body;

        const userMsg = await BotMessage.findById(id);
        if (!userMsg || userMsg.role !== "user") {
            return res.status(404).json({ error: "User message not found." });
        }

        const conversation = await BotConversation.findOne({ _id: userMsg.conversationId, userId });
        if (!conversation) {
            return res.status(403).json({ error: "Access denied." });
        }

        userMsg.previousContent.push({
            content: userMsg.content,
            createdAt: userMsg.updatedAt || userMsg.createdAt,
        });
        userMsg.content = content.trim();
        await userMsg.save();

        // Remove any messages that happened after this edited user message
        await BotMessage.deleteMany({
            conversationId: userMsg.conversationId,
            createdAt: { $gt: userMsg.createdAt },
        });

        if (!doStream) {
            return res.json({ success: true, message: userMsg });
        }

        // Stream fresh AI response
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no");
        res.flushHeaders();

        const earlierMsgs = await BotMessage.find({
            conversationId: userMsg.conversationId,
            createdAt: { $lte: userMsg.createdAt },
        }).sort({ createdAt: -1 }).limit(6).lean();
        earlierMsgs.reverse();

        const chatMessages = [{ role: "system", content: BOT_SYSTEM_PROMPT + `\n\n=====================================================\nMANDATORY FORMATTING & STRUCTURING INSTRUCTIONS\n=====================================================\n• NEAT PARAGRAPH BREAKDOWN: You MUST format your reply cleanly with well-defined paragraphs separated by line breaks (double newlines). Avoid dense, single-paragraph responses.\n• BREAK ON TOPIC CLOSURE: Once an opening greeting or a specific topic/feature description is finished, break the line immediately before introducing the next thought or question.` }];
        earlierMsgs.forEach((pm) => chatMessages.push({ role: pm.role, content: pm.content }));

        const completionStream = await groq.chat.completions.create({
            model: MODEL,
            temperature: 0.6,
            max_tokens: MAX_TOKENS,
            stream: true,
            messages: chatMessages,
        });

        let fullResponse = "";
        for await (const chunk of completionStream) {
            const token = chunk.choices?.[0]?.delta?.content;
            if (token) {
                fullResponse += token;
                res.write(`data: ${JSON.stringify({ token })}\n\n`);
            }
        }

        const assistantMsg = await BotMessage.create({
            conversationId: userMsg.conversationId,
            role: "assistant",
            content: fullResponse,
        });

        res.write(`data: ${JSON.stringify({ messageId: assistantMsg._id })}\n\n`);
        res.write(`data: [DONE]\n\n`);
        res.end();
    } catch (err) {
        console.error("❌ editMessage error:", err.message);
        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to edit message." });
        } else {
            res.write(`data: ${JSON.stringify({ error: "Stream interrupted." })}\n\n`);
            res.end();
        }
    }
};

module.exports = {
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
};
