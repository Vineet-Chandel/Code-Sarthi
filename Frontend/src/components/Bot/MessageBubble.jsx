import { motion } from "framer-motion";

/**
 * MessageBubble
 *
 * Bot messages: glass surface with #A7A0F8 left border accent, left-aligned.
 * User messages: brand gradient fill, right-aligned.
 * Both enter with a spring scale+fade animation.
 */
export default function MessageBubble({ message }) {
    const isUser = message.role === "user";

    return (
        <motion.div
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
            <div
                className={`
                    max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed
                    ${isUser
                        ? "text-white rounded-br-sm"
                        : "text-white/90 rounded-bl-sm border-l-2 border-[#A7A0F8] bg-white/[0.06] backdrop-blur-sm border border-white/[0.09]"
                    }
                `}
                style={isUser ? {
                    background: "linear-gradient(135deg, #534AB7, #A7A0F8)",
                } : {}}
            >
                {/* Render text — preserve line breaks */}
                {message.text
                    ? message.text.split("\n").map((line, i) => (
                        <span key={i}>
                            {line}
                            {i < message.text.split("\n").length - 1 && <br />}
                        </span>
                    ))
                    : null
                }
            </div>
        </motion.div>
    );
}
