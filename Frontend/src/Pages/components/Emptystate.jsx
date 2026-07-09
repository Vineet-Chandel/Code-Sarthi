import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function EmptyState({ onStart }) {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/10 ring-1 ring-blue-500/20"
            >
                <Sparkles className="h-7 w-7 text-blue-400" strokeWidth={1.75} />
            </motion.div>

            <div className="space-y-1.5">
                <h2 className="text-[19px] font-medium text-zinc-100">What will you build today?</h2>
                <p className="text-[13px] text-zinc-500">
                    Idea to deployment — Shastra AI is here to help.
                </p>
            </div>

            <button
                onClick={onStart}
                className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_8px_20px_-6px_rgba(59,130,246,0.55)] transition-shadow duration-300 hover:shadow-[0_10px_30px_-6px_rgba(59,130,246,0.7)]"
            >
                Start brainstorming
            </button>
        </div>
    );
}