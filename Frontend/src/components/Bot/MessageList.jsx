import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";

/**
 * MessageList
 * Responsive container for the conversation flow. Auto-scrolls smoothly to bottom on new updates.
 * Designed with clean spacing between conversation turns (Gemini/ChatGPT UX).
 */
export default function MessageList({ messages, isStreaming }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-full flex flex-col gap-8 py-6 px-2 sm:px-4">
            <AnimatePresence initial={false}>
                {messages.map((msg, index) => {
                    const isLast = index === messages.length - 1;
                    return (
                        <MessageBubble 
                            key={msg.id} 
                            message={msg} 
                            isStreaming={isStreaming && isLast} 
                        />
                    );
                })}
            </AnimatePresence>
            <div ref={bottomRef} className="h-4" />
        </div>
    );
}

