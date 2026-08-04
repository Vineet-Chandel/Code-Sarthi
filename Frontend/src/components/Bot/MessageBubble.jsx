import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Copy,
    Check,
    ThumbsUp,
    ThumbsDown,
    Share2,
    RotateCcw,
    Edit3,
    Send,
    X,
    Code,
    Navigation2,
    ExternalLink,
    Compass,
    ArrowRight,
    Sparkles,
} from "lucide-react";

/**
 * Helper function: Parse inline markdown links, route navigation commands, bold text, and code chips
 * into vibrant, interactive UI elements with direct React Router navigation.
 */
const parseInlineHighlights = (text, navigate) => {
    if (!text) return null;

    // Master Regex matching:
    // 1) Markdown link: \[([^\]]+)\]\(([^)]+)\)
    // 3) Raw route or URL wrapped in optional asterisks/backticks
    // 4) Bold emphasis: \*\*([^*]+)\*\*
    // 6) Inline backtick code: `([^`]+)`
    const regex = /(\[[^\]]+\]\(([^)]+)\))|((?:[*_`]+)?(?:https?:\/\/|\/(?:app|blogs|engineering|new-updates|how-to-use|smart-scheduler---lakshya|support|help-center|feedback|submit-a-request|review|safety|privacy-center|book-session|fuel-my-next-commit|editProfile|connections|requestedUser|requestreceived|settings))[A-Za-z0-9\-_%#.:/?&=]*(?:[*_`]+)?)|(\*\*([^*]+)\*\*)|(`([^`]+)`)/g;

    const result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            result.push(text.slice(lastIndex, match.index));
        }

        // Case 1: Markdown Link [Label](Dest)
        if (match[1]) {
            const labelMatch = match[1].match(/\[([^\]]+)\]/);
            const label = labelMatch ? labelMatch[1] : match[1];
            const dest = match[2] ? match[2].trim() : "";
            const isExternal = dest.startsWith("http");

            result.push(
                <span
                    key={`${match.index}-mdlink`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isExternal) {
                            window.open(dest, "_blank", "noopener,noreferrer");
                        } else {
                            navigate(dest.replace(/[.,;!"']+$/, ""));
                        }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 my-0.5 mx-1 rounded-xl bg-gradient-to-r from-purple-500/25 via-pink-500/25 to-indigo-500/25 hover:from-purple-500/45 hover:via-pink-500/45 hover:to-indigo-500/45 border border-purple-400/50 hover:border-pink-400/90 text-purple-200 hover:text-white font-mono text-xs sm:text-[13px] tracking-wide shadow-[0_0_12px_rgba(168,85,247,0.25)] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer group/nav align-middle font-semibold select-none"
                    title={`Click to open ${dest}`}
                >
                    <Navigation2 className="w-3.5 h-3.5 text-pink-400 group-hover/nav:text-pink-300 group-hover/nav:rotate-45 transition-transform duration-200 flex-shrink-0 animate-pulse" />
                    <span className="font-sans font-bold border-b border-purple-400/40 group-hover/nav:border-white transition-colors">
                        {label}
                    </span>
                    <ExternalLink className="w-3 h-3 text-purple-300/70 group-hover/nav:text-white group-hover/nav:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                </span>
            );
        }
        // Case 2: Raw Route or URL (possibly surrounded by **, `, etc.)
        else if (match[3]) {
            let cleanPath = match[3].replace(/^[*_`]+|[*_`]+$/g, "").replace(/[.,;!"')\]]+$/, "").trim();
            const isExternal = cleanPath.startsWith("http");

            result.push(
                <span
                    key={`${match.index}-route`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isExternal) {
                            window.open(cleanPath, "_blank", "noopener,noreferrer");
                        } else {
                            navigate(cleanPath);
                        }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 my-0.5 mx-1 rounded-xl bg-gradient-to-r from-purple-600/25 via-fuchsia-600/25 to-pink-600/25 hover:from-purple-600/45 hover:via-fuchsia-600/45 hover:to-pink-600/45 border border-purple-400/50 hover:border-pink-400/90 text-purple-200 hover:text-white font-mono text-xs sm:text-[13px] tracking-wide shadow-[0_0_12px_rgba(192,132,252,0.3)] hover:shadow-[0_0_22px_rgba(236,72,153,0.6)] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer group/nav align-middle font-semibold select-none"
                    title={`Click to navigate directly to ${cleanPath}`}
                >
                    <Compass className="w-3.5 h-3.5 text-pink-400 group-hover/nav:text-pink-200 group-hover/nav:rotate-45 transition-transform duration-200 flex-shrink-0 animate-pulse" />
                    <span className="font-sans font-bold border-b border-purple-400/40 group-hover/nav:border-white transition-colors">
                        {cleanPath}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-300/80 group-hover/nav:text-white group-hover/nav:translate-x-1 transition-all duration-200 flex-shrink-0" />
                </span>
            );
        }
        // Case 3: Bold text (**Text**) -> render as premium highlighted badge
        else if (match[4]) {
            const boldContent = match[5] || match[4].replace(/\*\*/g, "");
            result.push(
                <strong
                    key={`${match.index}-bold`}
                    className="font-semibold text-purple-200 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-lg shadow-sm mx-0.5 inline-block text-[14.5px] sm:text-[15.5px] tracking-wide align-baseline"
                >
                    {boldContent}
                </strong>
            );
        }
        // Case 4: Inline Code (`Code`)
        else if (match[6]) {
            const codeContent = match[7] || match[6].replace(/`/g, "");
            result.push(
                <code
                    key={`${match.index}-code`}
                    className="px-2 py-0.5 rounded-lg bg-[#121216] text-pink-300 border border-pink-500/35 font-mono text-xs sm:text-sm selection:bg-pink-500/30 mx-0.5 shadow-inner align-baseline"
                >
                    {codeContent}
                </code>
            );
        }

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return result.length ? result : text;
};

/**
 * Helper component: Styled Markdown Code Block with Copy button
 */
const CodeBlock = ({ rawCode }) => {
    const [copied, setCopied] = useState(false);
    const lines = rawCode.trim().split("\n");
    let lang = "code";
    let codeContent = rawCode.trim();

    // Detect language identifier on first line if present without spaces
    if (lines[0] && !lines[0].includes(" ") && lines.length > 1) {
        lang = lines[0];
        codeContent = lines.slice(1).join("\n");
    }

    const handleCopyCode = () => {
        navigator.clipboard.writeText(codeContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-3 rounded-2xl overflow-hidden bg-[#121216] border border-white/15 shadow-xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a20] border-b border-white/10 text-zinc-400 text-xs">
                <div className="flex items-center gap-2 font-semibold text-purple-300 uppercase tracking-wider">
                    <Code className="w-3.5 h-3.5" />
                    <span>{lang}</span>
                </div>
                <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.05] hover:bg-white/10 text-zinc-300 transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy code</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-zinc-200 leading-relaxed selection:bg-purple-500/30">
                <code>{codeContent}</code>
            </pre>
        </div>
    );
};

/**
 * MessageBubble
 *
 * Responsive conversational turn bubble supporting:
 * - Bot responses with markdown code block formatting, copy, regenerate, like, dislike, and feedback reason collection.
 * - User responses with inline editable textarea to regenerate downstream replies.
 */
const MessageBubble = React.memo(function MessageBubble({
    message,
    isStreaming,
    onToggleReaction,
    onRegenerate,
    onEditUserMessage,
}) {
    const navigate = useNavigate();
    const isUser = message.role === "user";
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(message.text || "");
    const [feedbackNoteText, setFeedbackNoteText] = useState(message.feedbackNote || "");
    const [showFeedbackInput, setShowFeedbackInput] = useState(message.reaction === "dislike");
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const handleCopy = () => {
        if (!message.text) return;
        navigator.clipboard.writeText(message.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEditSubmit = () => {
        if (editText.trim() && editText !== message.text) {
            onEditUserMessage?.(message._id || message.id, editText.trim());
        }
        setIsEditing(false);
    };

    const handleReactionClick = (newReaction) => {
        const msgId = message._id || message.id;
        const currentReaction = message.reaction;
        const targetReaction = currentReaction === newReaction ? null : newReaction;

        if (targetReaction === "dislike") {
            setShowFeedbackInput(true);
        } else {
            setShowFeedbackInput(false);
        }

        onToggleReaction?.(msgId, targetReaction, message.feedbackNote);
    };

    const handleFeedbackNoteSubmit = (e) => {
        e.preventDefault();
        const msgId = message._id || message.id;
        onToggleReaction?.(msgId, "dislike", feedbackNoteText.trim());
        setFeedbackSubmitted(true);
        setTimeout(() => setFeedbackSubmitted(false), 3000);
    };

    // ── User Message Rendering ──────────────────────────────────────────────
    if (isUser) {
        if (isEditing) {
            return (
                <motion.div
                    className="flex justify-end w-full pl-6 sm:pl-12 my-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="w-full max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 bg-[#1f1f25] border border-purple-500/40 shadow-2xl space-y-3">
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                    handleEditSubmit();
                                }
                                if (e.key === "Escape") setIsEditing(false);
                            }}
                            className="w-full bg-transparent text-zinc-100 text-sm sm:text-base leading-relaxed focus:outline-none resize-y min-h-[70px] font-sans"
                            placeholder="Edit your prompt..."
                            autoFocus
                        />
                        <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/10">
                            <span className="text-[11px] text-zinc-500 mr-auto hidden sm:inline">
                                Press Esc to cancel, Ctrl+Enter to save & regenerate
                            </span>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-semibold text-zinc-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                disabled={!editText.trim() || editText.trim() === message.text || isStreaming}
                                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md"
                            >
                                Save & Submit
                            </button>
                        </div>
                    </div>
                </motion.div>
            );
        }

        return (
            <motion.div
                className="group flex justify-end w-full pl-6 sm:pl-12"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                <div className="relative max-w-[85%] sm:max-w-[75%] rounded-[26px] px-5 py-3.5 text-[15px] sm:text-[16px] leading-relaxed text-zinc-100 bg-[#212126] border border-white/[0.08] shadow-lg selection:bg-purple-500/30">
                    {message.text ? (
                        message.text.split("\n").map((line, i, arr) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < arr.length - 1 && <br />}
                            </React.Fragment>
                        ))
                    ) : null}

                    {/* Edit Hover Trigger */}
                    {!isStreaming && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute -left-9 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-[#1e1e24] text-zinc-400 hover:text-white border border-white/10 shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 hover:scale-105"
                            title="Edit message & regenerate"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </motion.div>
        );
    }

    // ── Assistant Bot Message Rendering ─────────────────────────────────────
    const isThinking = isStreaming && !message.text;

    // Memoized Parse Markdown code blocks and interactive navigation highlights for rapid rendering
    const formattedBotReply = React.useMemo(() => {
        if (!message.text) return null;
        const parts = message.text.split(/(```[\s\S]*?```)/g);

        return parts.map((part, index) => {
            if (part.startsWith("```") && part.endsWith("```")) {
                const inner = part.slice(3, -3);
                return <CodeBlock key={index} rawCode={inner} />;
            }

            // Standard prose: neat paragraphs with clean topic line breaking
            return (
                <div key={index} className="space-y-4 whitespace-pre-wrap word-break flex flex-col gap-1.5">
                    {part
                        .trim()
                        .split("\n\n")
                        .filter(Boolean)
                        .map((para, pIdx) => (
                            <p key={pIdx} className="leading-relaxed">
                                {para.split("\n").map((line, lIdx, arr) => (
                                    <React.Fragment key={lIdx}>
                                        {parseInlineHighlights(line, navigate)}
                                        {lIdx < arr.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        ))}
                </div>
            );
        });
    }, [message.text, navigate]);

    return (
        <motion.div
            className="flex flex-col items-start w-full pr-2 sm:pr-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Header / Avatar Row */}
            <div className="flex items-center gap-2.5 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-black/40 flex-shrink-0">
                    <img
                        src="https://res.cloudinary.com/dj0ivep44/image/upload/v1785554092/ChatGPT_Image_Aug_1_2026_08_44_21_AM_d8tjso.webp"
                        alt="Shastra AI"
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="font-semibold text-[15px] text-zinc-100 tracking-wide">Shastra AI</span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 text-purple-300 shadow-sm">
                    Pro
                </span>
            </div>

            {/* Message Canvas */}
            <div className="w-full pl-1 sm:pl-11 text-[15px] sm:text-[16px] leading-7 text-zinc-200 selection:bg-purple-500/30 font-normal">
                {isThinking ? (
                    <div className="flex items-center gap-2.5 py-2 text-zinc-400 font-medium">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
                        <span className="bg-gradient-to-r from-zinc-300 via-purple-300 to-zinc-500 bg-clip-text text-transparent animate-pulse">
                            Shastra is reasoning...
                        </span>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {formattedBotReply}
                        {isStreaming && (
                            <span className="inline-block w-2.5 h-5 ml-1 bg-purple-400 align-middle animate-pulse rounded-full shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                        )}
                    </div>
                )}
            </div>

            {/* Action Toolbar */}
            {!isThinking && !isStreaming && (
                <div className="flex flex-wrap items-center gap-1.5 mt-4 pl-1 sm:pl-11 text-zinc-400">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-xs font-medium transition-colors duration-200 hover:text-zinc-200"
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

                    {/* Regenerate Action */}
                    <button
                        onClick={() => onRegenerate?.(message._id || message.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-xs font-medium transition-colors duration-200 hover:text-zinc-200"
                        title="Regenerate response"
                    >
                        <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Regenerate</span>
                    </button>

                    <div className="w-px h-3.5 bg-white/10 mx-1" />

                    {/* Like Reaction */}
                    <button
                        onClick={() => handleReactionClick("like")}
                        className={`p-1.5 rounded-xl hover:bg-white/10 transition-colors duration-200 ${
                            message.reaction === "like" ? "text-purple-400 bg-purple-500/15 border border-purple-500/30" : "hover:text-zinc-200"
                        }`}
                        title="Good response"
                    >
                        <ThumbsUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Dislike Reaction */}
                    <button
                        onClick={() => handleReactionClick("dislike")}
                        className={`p-1.5 rounded-xl hover:bg-white/10 transition-colors duration-200 ${
                            message.reaction === "dislike" ? "text-rose-400 bg-rose-500/15 border border-rose-500/30" : "hover:text-zinc-200"
                        }`}
                        title="Needs improvement"
                    >
                        <ThumbsDown className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-px h-3.5 bg-white/10 mx-1" />

                    <button
                        className="p-1.5 rounded-xl hover:bg-white/10 transition-colors duration-200 hover:text-zinc-200"
                        title="Share discussion"
                    >
                        <Share2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {/* Dislike Optional Feedback Note Input */}
            <AnimatePresence>
                {showFeedbackInput && !isStreaming && (
                    <motion.form
                        onSubmit={handleFeedbackNoteSubmit}
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        className="mt-3 pl-1 sm:pl-11 w-full max-w-lg overflow-hidden"
                    >
                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-rose-500/25 shadow-lg space-y-2">
                            <div className="flex items-center justify-between text-xs font-semibold text-rose-300">
                                <span>What was unsatisfying about this answer? (Optional)</span>
                                {feedbackSubmitted && <span className="text-emerald-400 text-[11px] font-medium animate-pulse">Thank you for your feedback!</span>}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={feedbackNoteText}
                                    onChange={(e) => setFeedbackNoteText(e.target.value)}
                                    placeholder="E.g., Inaccurate information, too repetitive..."
                                    className="flex-1 bg-[#151519] text-xs text-zinc-200 placeholder:text-zinc-600 rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-rose-500/50"
                                />
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl font-bold text-xs transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.message.text === nextProps.message.text &&
        prevProps.message.reaction === nextProps.message.reaction &&
        prevProps.message._id === nextProps.message._id &&
        prevProps.message.id === nextProps.message.id &&
        prevProps.isStreaming === nextProps.isStreaming
    );
});

export default MessageBubble;
