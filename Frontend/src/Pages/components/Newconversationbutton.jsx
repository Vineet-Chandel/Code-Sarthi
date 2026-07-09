import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function NewConversationButton({ collapsed, onClick }) {
    if (collapsed) {
        return (
            <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={onClick}
                aria-label="New conversation"
                className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_8px_20px_-6px_rgba(59,130,246,0.6)] transition-shadow duration-300 hover:shadow-[0_10px_28px_-6px_rgba(59,130,246,0.75)]"
            >
                <Plus className="h-5 w-5 text-white" strokeWidth={2.5} />
            </motion.button>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={onClick}
            className="group flex w-full items-center justify-between rounded-full bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2.5 shadow-[0_8px_20px_-6px_rgba(59,130,246,0.55)] transition-shadow duration-300 hover:shadow-[0_10px_30px_-6px_rgba(59,130,246,0.7)]"
        >
            <span className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-white transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.5} />
                <span className="text-[13px] font-medium text-white">New conversation</span>
            </span>
            <span className="flex items-center gap-0.5 rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-medium text-white/80">
                <span>⌘</span>
                <span>K</span>
            </span>
        </motion.button>
    );
}