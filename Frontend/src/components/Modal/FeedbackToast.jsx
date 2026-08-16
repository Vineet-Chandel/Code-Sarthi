import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export const FeedbackToast = ({
  message,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 px-4 py-2.5 bg-black border border-white/10 rounded-md shadow-2xl text-xs text-white"
        >
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-zinc-800 text-zinc-300">
            <Check size={10} className="stroke-[3]" />
          </div>
          <span className="font-medium tracking-tight">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackToast;
