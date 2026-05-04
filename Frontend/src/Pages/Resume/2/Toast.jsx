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
        bg: isSuccess ? "bg-base-100" : "bg-red-100",
        accent: isSuccess ? "bg-accent" : "bg-red-500",
        border: isSuccess ? "border-accent" : "border-red-500",
        iconBg: isSuccess ? "bg-white" : "bg-white",
        iconText: isSuccess ? "text-accent" : "text-red-500",
        blob: isSuccess ? "bg-accent/40" : "bg-red-500/40",
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
            <div className={`relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full  bg-base-300 ${theme.iconBg} shadow-inner`}>
                {isSuccess ? (
                    <svg className={`h-6 w-6 ${theme.iconText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24">
                        <path fill="#ee5252" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)">
                            <animateTransform id="SVGBGG9rcpE" attributeName="transform" begin="0;SVGryjChH5y.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"></animateTransform>
                            <animateTransform additive="sum" attributeName="transform" begin="0;SVGryjChH5y.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"></animateTransform>
                            <animate attributeName="opacity" begin="0;SVGryjChH5y.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"></animate>
                        </path>
                        <path fill="#ee5252" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)">
                            <animateTransform id="SVG0KQtjdtU" attributeName="transform" begin="SVGBGG9rcpE.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"></animateTransform>
                            <animateTransform additive="sum" attributeName="transform" begin="SVGBGG9rcpE.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"></animateTransform>
                            <animate attributeName="opacity" begin="SVGBGG9rcpE.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"></animate>
                        </path>
                        <path fill="#ee5252" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)">
                            <animateTransform id="SVGryjChH5y" attributeName="transform" begin="SVGBGG9rcpE.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"></animateTransform>
                            <animateTransform additive="sum" attributeName="transform" begin="SVGBGG9rcpE.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"></animateTransform>
                            <animate attributeName="opacity" begin="SVGBGG9rcpE.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"></animate>
                        </path>
                    </svg>
                )}
            </div>

            {/* Text Content */}
            <div className="relative z-10 flex-1">
                <h3 className="text-sm font-semibold tracking-tight text-gray-900 leading-none">
                    {title}
                </h3>
                <p className="mt-1.5 text-xs font-medium leading-relaxed text-gray-500">
                    {message}
                </p>
            </div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute right-3 top-3 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
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