import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    Copy, 
    Check, 
    ThumbsUp, 
    ThumbsDown, 
    Share2, 
    Sparkles 
} from "lucide-react";

/**
 * MessageBubble
 *
 * Designed after modern LLM UI architectures (ChatGPT & Gemini):
 * - Bot messages: Left-aligned, no surrounding box/border, rich header with sparkling avatar badge & action bar.
 * - User messages: Right-aligned, sleek dark chip/bubble with smooth typography.
 */
export default function MessageBubble({ message, isStreaming }) {
    const isUser = message.role === "user";
    const [copied, setCopied] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleCopy = () => {
        if (!message.text) return;
        navigator.clipboard.writeText(message.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isUser) {
        return (
            <motion.div
                className="flex justify-end w-full pl-10"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                <div
                    className="max-w-[85%] sm:max-w-[75%] rounded-[24px] px-5 py-3 text-[15px] sm:text-[16px] leading-relaxed text-zinc-100 bg-[#212126] border border-white/[0.08] shadow-md selection:bg-purple-500/30"
                >
                    {message.text ? (
                        message.text.split("\n").map((line, i, arr) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < arr.length - 1 && <br />}
                            </React.Fragment>
                        ))
                    ) : null}
                </div>
            </motion.div>
        );
    }

    // Bot message (Gemini / ChatGPT style: No enclosing box around text, full width alignment)
    const isThinking = isStreaming && !message.text;

    return (
        <motion.div
            className="flex flex-col items-start w-full pr-4 sm:pr-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Header / Avatar Row */}
            <div className="flex items-center gap-2.5 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-black/40 flex-shrink-0">
                    <img src="https://res.cloudinary.com/dj0ivep44/image/upload/v1785554092/ChatGPT_Image_Aug_1_2026_08_44_21_AM_d8tjso.webp" alt="Shastra AI" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-[15px] text-zinc-100 tracking-wide">
                    Shastra AI
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 text-purple-300">
                    Pro
                </span>
            </div>

            {/* Message Content (Unboxed, clean reading canvas) */}
            <div className="w-full pl-1 sm:pl-11 text-[15px] sm:text-[16px] leading-7 text-zinc-200 selection:bg-purple-500/30 font-normal">
                {isThinking ? (
                    <div className="flex items-center gap-2 py-2 text-zinc-400 font-medium">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
                        <span className="bg-gradient-to-r from-zinc-300 via-purple-300 to-zinc-500 bg-clip-text text-transparent animate-pulse">
                            Shastra is generating thoughts...
                        </span>
                    </div>
                ) : (
                    <div className="space-y-3 whitespace-pre-wrap word-break flex flex-col gap-1">
                        {message.text.split("\n\n").map((para, idx) => (
                            <p key={idx} className="leading-relaxed">
                                {para.split("\n").map((line, lIdx, arr) => (
                                    <React.Fragment key={lIdx}>
                                        {line}
                                        {lIdx < arr.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        ))}
                        {isStreaming && (
                            <span className="inline-block w-2.5 h-5 ml-1 bg-purple-400 align-middle animate-pulse rounded-full shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                        )}
                    </div>
                )}
            </div>

            {/* Interactive Action Toolbar (Like ChatGPT & Gemini) */}
            {!isThinking && !isStreaming && (
                <div className="flex items-center gap-1.5 mt-4 pl-1 sm:pl-11 text-zinc-400">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-xs font-medium transition-colors duration-200 hover:text-zinc-200"
                        title="Copy response"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>

                    <div className="w-px h-3.5 bg-white/10 mx-1" />

                    <button
                        onClick={() => { setLiked(!liked); if (disliked) setDisliked(false); }}
                        className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200 ${liked ? "text-purple-400 bg-purple-500/10" : "hover:text-zinc-200"}`}
                        title="Good response"
                    >
                        <ThumbsUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                        onClick={() => { setDisliked(!disliked); if (liked) setLiked(false); }}
                        className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200 ${disliked ? "text-rose-400 bg-rose-500/10" : "hover:text-zinc-200"}`}
                        title="Bad response"
                    >
                        <ThumbsDown className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-px h-3.5 bg-white/10 mx-1" />

                    <button
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200 hover:text-zinc-200"
                        title="Share discussion"
                    >
                        <Share2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </motion.div>
    );
}

