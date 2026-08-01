import { useState, useRef, useCallback } from "react";
import BASE_URL from "../Pages/auth/baseURL";

/**
 * useBotStream
 *
 * Manages the chat state and SSE stream consumption for the CodeSarthi Info Bot.
 *
 * Returns:
 *   messages     — array of { id, role: "user"|"bot", text }
 *   isStreaming   — true while a response is being received
 *   sendMessage   — async fn(text: string) → fires POST, streams response into state
 *   clearMessages — resets chat history
 */
export function useBotStream() {
    const [messages, setMessages] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const abortRef = useRef(null);

    const sendMessage = useCallback(async (text) => {
        if (!text.trim() || isStreaming) return;

        const userMsg = { id: Date.now(), role: "user", text: text.trim() };
        const botMsgId = Date.now() + 1;
        const botMsg = { id: botMsgId, role: "bot", text: "" };

        setMessages((prev) => [...prev, userMsg, botMsg]);
        setIsStreaming(true);

        // Abort any previous in-flight request
        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const response = await fetch(`${BASE_URL}/bot/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ message: text.trim() }),
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

                // Process complete SSE lines from the buffer
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? ""; // keep incomplete last line in buffer

                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;
                    const payload = line.slice(6).trim();
                    if (payload === "[DONE]") break;

                    try {
                        const parsed = JSON.parse(payload);

                        if (parsed.error) {
                            setMessages((prev) =>
                                prev.map((m) =>
                                    m.id === botMsgId
                                        ? { ...m, text: "Sorry, something went wrong. Please try again." }
                                        : m
                                )
                            );
                            break;
                        }

                        if (parsed.token) {
                            setMessages((prev) =>
                                prev.map((m) =>
                                    m.id === botMsgId
                                        ? { ...m, text: m.text + parsed.token }
                                        : m
                                )
                            );
                        }
                    } catch {
                        // Malformed JSON chunk — skip silently
                    }
                }
            }
        } catch (err) {
            if (err.name === "AbortError") return;
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === botMsgId
                        ? { ...m, text: "Connection error. Please check your network and try again." }
                        : m
                )
            );
        } finally {
            setIsStreaming(false);
        }
    }, [isStreaming]);

    const clearMessages = useCallback(() => {
        if (abortRef.current) abortRef.current.abort();
        setMessages([]);
        setIsStreaming(false);
    }, []);

    return { messages, isStreaming, sendMessage, clearMessages };
}
