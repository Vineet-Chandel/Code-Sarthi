import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";

/**
 * StreamingDots
 * Three-dot pulsing indicator shown while waiting for first token.
 */
function StreamingDots() {
    return (
        <div className="flex items-center gap-1 px-4 py-3">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#A7A0F8] opacity-70"
                    style={{
                        animation: `botDotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                />
            ))}
        </div>
    );
}

/**
 * MessageList
 * Scrollable container for all messages. Auto-scrolls to bottom on new content.
 * Shows StreamingDots when isStreaming and the last bot message is still empty.
 */
export default function MessageList({ messages, isStreaming }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const lastMsg = messages[messages.length - 1];
    const showDots = isStreaming && lastMsg?.role === "bot" && lastMsg.text === "";

    return (
        <div className="h-full overflow-y-auto scrollbar-none px-3 py-3 flex flex-col gap-2">
            <style>{`
                @keyframes botDotBounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                    40% { transform: translateY(-5px); opacity: 1; }
                }
            `}</style>

            <AnimatePresence initial={false}>
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
            </AnimatePresence>

            {showDots && <StreamingDots />}
            <div ref={bottomRef} />
        </div>
    );
}
