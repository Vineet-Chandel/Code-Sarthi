import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    X,
    Send,
    ExternalLink,
    Square,
    Trash2,
    MessageCircle,
} from "lucide-react";

import { useBotStream } from "../../hooks/useBotStream";
import MessageList from "./MessageList";

/**
 * AskShastraButton
 *
 * A floating action button (FAB) and interactive slide-over drawer that provides instant,
 * ambient access to Shastra AI from any page in the application.
 * Automatically hides when the user is already inside the full Shastra AI studio.
 */
export default function AskShastraButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [promptText, setPromptText] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const {
        messages,
        isStreaming,
        sendMessage,
        stopStreaming,
        clearMessages,
        toggleReaction,
        regenerateResponse,
        editUserMessage,
    } = useBotStream();

    // Hide FAB on the full Shastra page or authentication pages
    const isHiddenPath =
        location.pathname.toLowerCase().includes("/shastra") ||
        location.pathname.toLowerCase().includes("/login") ||
        location.pathname.toLowerCase().includes("/signup") ||
        location.pathname.toLowerCase().includes("/auth");

    const handleSend = () => {
        if (!promptText.trim() || isStreaming) return;
        sendMessage(promptText.trim());
        setPromptText("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const navigateToFullShastra = () => {
        setIsOpen(false);
        navigate("/shastra");
    };

    if (isHiddenPath) return null;

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-sm shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-white/30 hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition-all duration-300 group cursor-pointer"
            >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/40 shadow-inner bg-black/40">
                    <img
                        src="https://res.cloudinary.com/dj0ivep44/image/upload/v1785554092/ChatGPT_Image_Aug_1_2026_08_44_21_AM_d8tjso.webp"
                        alt="Shastra AI"
                        className="w-full h-full object-cover group-hover:rotate-12 transition-transform duration-300"
                    />
                </div>
                <span className="tracking-wide">Ask Shastra</span>
                <Sparkles className="w-4 h-4 text-pink-300 animate-pulse" />
            </motion.button>

            {/* Slide-over Drawer Backdrop & Content */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Dimmer backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Slide-over Container */}
                        <motion.div
                            initial={{ x: "100%", opacity: 0.9 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0.9 }}
                            transition={{ type: "spring", stiffness: 350, damping: 35 }}
                            className="fixed top-0 right-0 z-50 h-screen w-full max-w-[460px] bg-[#0d0d12]/95 backdrop-blur-3xl border-l border-white/15 shadow-[0_0_70px_rgba(0,0,0,0.95)] flex flex-col text-zinc-100 font-sans"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl overflow-hidden border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-black/50">
                                        <img
                                            src="https://res.cloudinary.com/dj0ivep44/image/upload/v1785554092/ChatGPT_Image_Aug_1_2026_08_44_21_AM_d8tjso.webp"
                                            alt="Shastra AI"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-bold text-sm tracking-wide text-zinc-100">Quick Shastra</span>
                                            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
                                                AI Pro
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-zinc-400">Ambient AI assistance at your command</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={clearMessages}
                                        className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-rose-400 transition-colors"
                                        title="Clear discussion"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={navigateToFullShastra}
                                        className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-purple-300 transition-colors flex items-center gap-1 text-xs"
                                        title="Open full Shastra studio"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors"
                                        title="Close drawer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Conversational Body */}
                            <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-4">
                                {messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12 text-zinc-500">
                                        <div className="p-4 rounded-2xl bg-gradient-to-tr from-purple-500/15 to-pink-500/15 border border-purple-500/20 mb-4 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                                            <Sparkles className="w-8 h-8 text-purple-400 animate-bounce" />
                                        </div>
                                        <h3 className="font-bold text-base text-zinc-200">Hello! I am Shastra AI.</h3>
                                        <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                                            Need quick debugging help, resume advice, or interview insights? Ask me right here without leaving your active work!
                                        </p>

                                        <div className="mt-6 w-full space-y-2 text-left">
                                            <button
                                                onClick={() => sendMessage("Give me 3 quick tips to improve my resume formatting.")}
                                                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs text-zinc-300 transition-all text-left font-medium hover:border-purple-500/40"
                                            >
                                                💡 Give me 3 quick tips to improve my resume formatting
                                            </button>
                                            <button
                                                onClick={() => sendMessage("How do I fix common React useEffect rendering loops?")}
                                                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs text-zinc-300 transition-all text-left font-medium hover:border-purple-500/40"
                                            >
                                                ⚡ How do I fix common React useEffect rendering loops?
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <MessageList
                                        messages={messages}
                                        isStreaming={isStreaming}
                                        onToggleReaction={toggleReaction}
                                        onRegenerate={regenerateResponse}
                                        onEditUserMessage={editUserMessage}
                                    />
                                )}
                            </div>

                            {/* Stop Generation Banner inside Drawer */}
                            <AnimatePresence>
                                {isStreaming && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="px-4 py-1 flex justify-center"
                                    >
                                        <button
                                            onClick={stopStreaming}
                                            className="px-4 py-1.5 rounded-full bg-[#1e1e26] border border-purple-500/40 text-xs font-bold text-zinc-200 hover:bg-white/10 flex items-center gap-2 shadow-lg transition-all"
                                        >
                                            <Square className="w-3 h-3 fill-current text-purple-400" />
                                            <span>Stop Generating</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Docked Input Capsule */}
                            <div className="p-4 border-t border-white/[0.08] bg-[#0c0c10]/90">
                                <div className="relative flex items-center gap-2 rounded-2xl border border-white/15 bg-[#18181e] px-4 py-2 shadow-inner focus-within:border-purple-500/50 transition-all">
                                    <input
                                        type="text"
                                        value={promptText}
                                        onChange={(e) => setPromptText(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={isStreaming}
                                        placeholder="Ask Quick Shastra..."
                                        className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none py-1 font-medium"
                                        autoFocus={isOpen}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!promptText.trim() || isStreaming}
                                        className={`p-2 rounded-xl transition-all ${
                                            promptText.trim() && !isStreaming
                                                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-md cursor-pointer"
                                                : "bg-white/[0.05] text-zinc-600 cursor-not-allowed"
                                        }`}
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-2 text-[10px] text-center text-zinc-500 flex items-center justify-center gap-1">
                                    <span>Want deep project workflows?</span>
                                    <button
                                        onClick={navigateToFullShastra}
                                        className="text-purple-400 hover:underline font-bold inline-flex items-center gap-0.5"
                                    >
                                        Open Studio &rarr;
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
