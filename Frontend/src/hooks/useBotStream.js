import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import BASE_URL from "../Pages/auth/baseURL";

/**
 * useBotStream
 *
 * Full-stack state controller for Shastra AI:
 * - Manages conversation history threads (list, create, select, rename, pin, archive, delete).
 * - Handles real-time SSE streaming for conversational turns.
 * - Listens for dynamic title and topic `meta` events to update sidebar in real time.
 * - Supports Tier 1 capabilities: Stop generation, Like/Dislike feedback notes, response regeneration, user turn editing, and search.
 */
export function useBotStream() {
    const [conversations, setConversations] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showArchived, setShowArchived] = useState(false);

    const abortRef = useRef(null);

    // Extract user from Redux state matching Dashboard selector pattern
    const authUser = useSelector((state) => state?.user?.user?.DATA || state?.user);
    const userName = authUser?.firstName
        ? `${authUser.firstName} ${authUser.lastName || ""}`.trim()
        : (authUser?.username || "");

    // ── Fetch user's persistent conversation list ──────────────────────────
    const fetchConversations = useCallback(async (search = "", archived = false) => {
        try {
            const res = await fetch(`${BASE_URL}/conversations?search=${encodeURIComponent(search)}&archived=${archived}`, {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setConversations(data.conversations || []);
            }
        } catch (err) {
            console.error("Failed to fetch conversations:", err);
        }
    }, []);

    // Handle initial load, instant sidebar search debouncing, and archived mode switching
    useEffect(() => {
        if (!authUser) return;
        const timer = setTimeout(() => {
            fetchConversations(searchQuery, showArchived);
        }, 150);
        return () => clearTimeout(timer);
    }, [authUser, searchQuery, showArchived, fetchConversations]);

    // ── Select and load a historical thread ───────────────────────────────
    const selectConversation = useCallback(async (id) => {
        if (id === activeId && messages.length > 0) return;
        if (abortRef.current) abortRef.current.abort();
        setIsStreaming(false);
        setActiveId(id);
        setIsLoadingHistory(true);

        try {
            const res = await fetch(`${BASE_URL}/conversations/${id}`, {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                const mappedMessages = (data.messages || []).map((m) => ({
                    id: m._id || Date.now() + Math.random(),
                    _id: m._id,
                    role: m.role === "assistant" ? "bot" : m.role,
                    text: m.content || "",
                    reaction: m.reaction || null,
                    feedbackNote: m.feedbackNote || null,
                }));
                setMessages(mappedMessages);
            } else {
                setMessages([]);
            }
        } catch (err) {
            console.error("Failed to load conversation history:", err);
            setMessages([]);
        } finally {
            setIsLoadingHistory(false);
        }
    }, [activeId, messages.length]);

    // ── Start a fresh new chat ─────────────────────────────────────────────
    const newChat = useCallback(() => {
        if (abortRef.current) abortRef.current.abort();
        setActiveId(null);
        setMessages([]);
        setIsStreaming(false);
    }, []);

    const clearMessages = newChat; // Alias for compatibility with existing UI

    // ── Stop in-flight generation ──────────────────────────────────────────
    const stopStreaming = useCallback(() => {
        if (abortRef.current) {
            abortRef.current.abort();
        }
        setIsStreaming(false);
    }, []);

    // ── Send message & stream LLaMA response over SSE ──────────────────────
    const sendMessage = useCallback(async (text) => {
        if (!text.trim() || isStreaming) return;

        let currentConvoId = activeId;

        // Auto-create persistent thread if none active
        if (!currentConvoId) {
            try {
                const createRes = await fetch(`${BASE_URL}/conversations`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ title: "New Chat", topic: "General" }),
                });
                if (createRes.ok) {
                    const data = await createRes.json();
                    currentConvoId = data.conversation._id;
                    setActiveId(currentConvoId);
                    setConversations((prev) => [data.conversation, ...prev]);
                }
            } catch (err) {
                console.error("Failed to create thread, falling back to standalone stream:", err);
            }
        }

        const tempUserId = Date.now();
        const tempBotId = tempUserId + 1;
        const userMsg = { id: tempUserId, role: "user", text: text.trim() };
        const botMsg = { id: tempBotId, role: "bot", text: "" };

        setMessages((prev) => [...prev, userMsg, botMsg]);
        setIsStreaming(true);

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const targetUrl = currentConvoId
            ? `${BASE_URL}/conversations/${currentConvoId}/messages`
            : `${BASE_URL}/bot/chat`;

        try {
            const response = await fetch(targetUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ message: text.trim(), userName }),
                signal: controller.signal,
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || `HTTP ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";

                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;
                    const payload = line.slice(6).trim();
                    if (payload === "[DONE]") break;

                    try {
                        const parsed = JSON.parse(payload);

                        if (parsed.error) {
                            setMessages((prev) =>
                                prev.map((m) =>
                                    m.id === tempBotId ? { ...m, text: "Sorry, something went wrong. Please try again." } : m
                                )
                            );
                            break;
                        }

                        if (parsed.userMessageId) {
                            setMessages((prev) =>
                                prev.map((m) => (m.id === tempUserId ? { ...m, _id: parsed.userMessageId, id: parsed.userMessageId } : m))
                            );
                        }

                        if (parsed.messageId) {
                            setMessages((prev) =>
                                prev.map((m) => (m.id === tempBotId ? { ...m, _id: parsed.messageId, id: parsed.messageId } : m))
                            );
                        }

                        if (parsed.token) {
                            setMessages((prev) =>
                                prev.map((m) => (m.id === tempBotId || m._id === parsed.messageId ? { ...m, text: m.text + parsed.token } : m))
                            );
                        }

                        // Real-time title and topic updates from non-blocking generator
                        if (parsed.meta) {
                            const { title, topic } = parsed.meta;
                            setConversations((prev) =>
                                prev.map((c) => (c._id === currentConvoId ? { ...c, title, topic, updatedAt: new Date().toISOString() } : c))
                            );
                        }
                    } catch {
                        // Ignore partial or malformed chunks
                    }
                }
            }

            // Update local conversation list recency and preview
            if (currentConvoId) {
                const preview = text.trim().slice(0, 80) + (text.trim().length > 80 ? "..." : "");
                setConversations((prev) => {
                    const updated = prev.map((c) =>
                        c._id === currentConvoId ? { ...c, lastMessagePreview: preview, updatedAt: new Date().toISOString() } : c
                    );
                    return [...updated].sort((a, b) => {
                        if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
                        return new Date(b.updatedAt) - new Date(a.updatedAt);
                    });
                });
            }
        } catch (err) {
            if (err.name === "AbortError") return;
            setMessages((prev) =>
                prev.map((m) => (m.id === tempBotId ? { ...m, text: "Connection error. Please check your network and try again." } : m))
            );
        } finally {
            setIsStreaming(false);
        }
    }, [activeId, isStreaming, userName]);

    // ── Message Reactions & Dislike feedback notes ─────────────────────────
    const toggleReaction = useCallback(async (msgId, reaction, feedbackNote) => {
        setMessages((prev) =>
            prev.map((m) => ((m._id === msgId || m.id === msgId) ? { ...m, reaction, feedbackNote: feedbackNote ?? m.feedbackNote } : m))
        );
        try {
            await fetch(`${BASE_URL}/messages/${msgId}/reaction`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ reaction, feedbackNote }),
            });
        } catch (err) {
            console.error("Failed to save feedback reaction:", err);
        }
    }, []);

    // ── Regenerate assistant response ──────────────────────────────────────
    const regenerateResponse = useCallback(async (msgId) => {
        if (isStreaming) return;
        setIsStreaming(true);

        // Clear existing response content in UI while streaming fresh tokens
        setMessages((prev) => prev.map((m) => ((m._id === msgId || m.id === msgId) ? { ...m, text: "" } : m)));

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const res = await fetch(`${BASE_URL}/messages/${msgId}/regenerate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                signal: controller.signal,
            });

            if (!res.ok) throw new Error("Regeneration failed");
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";
                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;
                    const payload = line.slice(6).trim();
                    if (payload === "[DONE]") break;
                    try {
                        const parsed = JSON.parse(payload);
                        if (parsed.token) {
                            setMessages((prev) =>
                                prev.map((m) => ((m._id === msgId || m.id === msgId) ? { ...m, text: m.text + parsed.token } : m))
                            );
                        }
                    } catch {
                        // ignore
                    }
                }
            }
        } catch (err) {
            if (err.name !== "AbortError") console.error("Regeneration error:", err);
        } finally {
            setIsStreaming(false);
        }
    }, [isStreaming]);

    // ── Edit User Message & regenerate sequence ────────────────────────────
    const editUserMessage = useCallback(async (msgId, newText) => {
        if (!newText.trim() || isStreaming) return;
        setIsStreaming(true);

        const tempBotId = Date.now();
        setMessages((prev) => {
            const idx = prev.findIndex((m) => m._id === msgId || m.id === msgId);
            if (idx === -1) return prev;
            const updatedUser = { ...prev[idx], text: newText.trim() };
            const pruned = prev.slice(0, idx);
            return [...pruned, updatedUser, { id: tempBotId, role: "bot", text: "" }];
        });

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const res = await fetch(`${BASE_URL}/messages/${msgId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ content: newText.trim(), stream: true }),
                signal: controller.signal,
            });

            if (!res.ok) throw new Error("Edit failed");
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";
                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;
                    const payload = line.slice(6).trim();
                    if (payload === "[DONE]") break;
                    try {
                        const parsed = JSON.parse(payload);
                        if (parsed.messageId) {
                            setMessages((prev) => prev.map((m) => (m.id === tempBotId ? { ...m, _id: parsed.messageId, id: parsed.messageId } : m)));
                        }
                        if (parsed.token) {
                            setMessages((prev) => prev.map((m) => (m.id === tempBotId || m._id === parsed.messageId ? { ...m, text: m.text + parsed.token } : m)));
                        }
                    } catch {
                        // ignore
                    }
                }
            }
        } catch (err) {
            if (err.name !== "AbortError") console.error("Edit message error:", err);
        } finally {
            setIsStreaming(false);
        }
    }, [isStreaming]);

    // ── Sidebar Thread Management (Rename, Pin, Archive, Delete) ───────────
    const renameConversation = useCallback(async (id, newTitle) => {
        setConversations((prev) => prev.map((c) => (c._id === id ? { ...c, title: newTitle.trim() } : c)));
        try {
            await fetch(`${BASE_URL}/conversations/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ title: newTitle.trim() }),
            });
        } catch (err) {
            console.error("Failed to rename conversation:", err);
        }
    }, []);

    const togglePinConversation = useCallback(async (id, currentPinState) => {
        setConversations((prev) => {
            const updated = prev.map((c) => (c._id === id ? { ...c, isPinned: !currentPinState } : c));
            return [...updated].sort((a, b) => {
                if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });
        });
        try {
            await fetch(`${BASE_URL}/conversations/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ isPinned: !currentPinState }),
            });
        } catch (err) {
            console.error("Failed to toggle pin state:", err);
        }
    }, []);

    const archiveConversation = useCallback(async (id, archiveState = true) => {
        setConversations((prev) => prev.filter((c) => c._id !== id));
        if (id === activeId && archiveState) newChat();
        try {
            await fetch(`${BASE_URL}/conversations/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ isArchived: archiveState }),
            });
        } catch (err) {
            console.error("Failed to archive/unarchive conversation:", err);
        }
    }, [activeId, newChat]);

    const deleteConversation = useCallback(async (id) => {
        setConversations((prev) => prev.filter((c) => c._id !== id));
        if (id === activeId) newChat();
        try {
            await fetch(`${BASE_URL}/conversations/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
        } catch (err) {
            console.error("Failed to delete conversation:", err);
        }
    }, [activeId, newChat]);

    return {
        conversations,
        activeId,
        messages,
        isStreaming,
        isLoadingHistory,
        searchQuery,
        setSearchQuery,
        selectConversation,
        newChat,
        clearMessages,
        sendMessage,
        stopStreaming,
        toggleReaction,
        regenerateResponse,
        editUserMessage,
        renameConversation,
        togglePinConversation,
        archiveConversation,
        deleteConversation,
        showArchived,
        setShowArchived,
    };
}
