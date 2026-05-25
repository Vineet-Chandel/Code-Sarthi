import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Toast = ({ type = "success", title, message, onClose }) => {
    const isSuccess = type === "success";
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;

        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [paused, onClose]);

    // Color Mapping for cleaner JSX
    const theme = {
        // Uses your deep dark colors for backgrounds with subtle, sophisticated borders
        bg: isSuccess ? "bg-base-200/90 backdrop-blur-md" : "bg-error/10 backdrop-blur-md",
        border: isSuccess ? "border-success/30" : "border-error/30",

        // Accents and indicators using your explicit semantic colors
        accent: isSuccess ? "bg-success" : "bg-error",

        // Icon styling that stays clean and visible against the dark backgrounds
        iconBg: isSuccess ? "bg-success/20" : "bg-error/20",
        iconText: isSuccess ? "text-success" : "text-error",

        // Background decorative blob or glow effect
        blob: isSuccess ? "bg-success/10 blur-xl" : "bg-error/10 blur-xl",

        // Text color mapping to your absolute white content variables
        text: isSuccess ? "text-success-content" : "text-error-content",
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className={`
        group pointer-events-auto relative flex w-full max-w-sm items-center gap-4 
        overflow-hidden rounded-2xl border ${theme.border} ${theme.bg} 
        p-4 pr-10 
      `}
        >
            {/* Soft Decorative Glow */}
            <div className={`absolute -left-4 -bottom-4 h-24 w-24 rounded-full blur-3xl opacity-40 ${theme.blob}`} />

            {/* Icon Container */}
            <div className={`relative z-10 flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full  bg-base-300 ${theme.iconBg} shadow-inner `}>
                {isSuccess ? (
                    <svg className={`h-6 w-6 ${theme.iconText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (


                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" className="mb-2" viewBox="0 0 24 24">
                        <path fill="#ee5252" d="M4 16v5.25h16V16a8 8 0 1 0-16 0" opacity={0.5}></path>
                        <path fill="#ee5252" d="M12.75 2a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0zm8.78 3.47a.75.75 0 0 1 0 1.06l-1.5 1.5a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 0 1 1.06 0m-18 0a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06-1.06zm11.042 5.335a.75.75 0 0 0-.563 1.39c.814.33 1.466.981 1.795 1.796a.75.75 0 1 0 1.39-.563a4.76 4.76 0 0 0-2.622-2.623M12.75 18.8a1.5 1.5 0 1 0-1.5 0v2.45h1.5zM4 21.25H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5z"></path>
                    </svg>
                )}
            </div>

            {/* Text Content */}
            <div className="relative z-10 flex-1">
                <h3 className="text-lg font-semibold tracking-tight text-secondary-content leading-none">
                    {title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-info">
                    {message}
                </p>
            </div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute right-3 top-3 rounded-lg p-1 text-white transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Refined Progress Bar */}
            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gray-100/50">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: paused ? undefined : "0%" }}
                    transition={{
                        duration: 4,
                        ease: "linear",
                        // This ensures it stays at current width if paused
                    }}
                    className={`h-full ${theme.accent}`}
                />
            </div>
        </motion.div>
    );
};

export default Toast;