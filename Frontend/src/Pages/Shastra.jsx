import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Menu,
    Sparkles,
    Mic,
    Plus,
    Zap,
    MessageCircle,
    Youtube,
    BookOpen,
    Ellipsis,
} from "lucide-react";
import Sidebar from "./Sidebar";

/* ---------------------------------------------------------
   Constants
--------------------------------------------------------- */

const SUGGESTIONS = [
    { id: 1, label: "Any advice for me?", icon: MessageCircle },
    { id: 2, label: "Some youtube video idea", icon: Youtube },
    { id: 3, label: "Life lessons from kratos", icon: BookOpen },
    { id: 4, label: "Something else entirely", icon: Ellipsis },
];

/* ---------------------------------------------------------
   Background layers — near-black base with soft radial glows
   and faint vertical guide lines behind the logo
--------------------------------------------------------- */

const Background = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#090909]">
        {/* top glow */}
        <div
            className="absolute left-1/2 top-[-10%] h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
                background:
                    "radial-gradient(closest-side, rgba(90,110,255,0.10), transparent 70%)",
            }}
        />
        {/* center glow */}
        <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
                background:
                    "radial-gradient(closest-side, rgba(255,255,255,0.05), transparent 70%)",
            }}
        />
        {/* bottom fade */}
        <div
            className="absolute bottom-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 translate-y-1/3 rounded-full blur-3xl"
            style={{
                background:
                    "radial-gradient(closest-side, rgba(0,0,0,0.6), transparent 70%)",
            }}
        />

        {/* faint vertical guide lines behind the logo */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-10">
            {[...Array(7)].map((_, i) => (
                <div
                    key={i}
                    className="h-[420px] w-px"
                    style={{
                        background:
                            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0.06) 65%, transparent 100%)",
                        filter: "blur(0.5px)",
                        opacity: i % 2 === 0 ? 0.5 : 0.9,
                    }}
                />
            ))}
        </div>
    </div>
);

/* ---------------------------------------------------------
   Header — floating menu button + upgrade button
--------------------------------------------------------- */

const Header = () => (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-5 sm:px-6 sm:pt-6">
        {/* Menu button */}
        <motion.button
            whileHover={{ rotate: -6, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            aria-label="Open menu"
        >
            <Menu className="h-4 w-4" />
        </motion.button>

        {/* Upgrade button */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-200 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(80,120,255,0.25)]"
        >
            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            <span>Upgrade</span>
        </motion.button>
    </div>
);

/* ---------------------------------------------------------
   Hero — logo, heading, subtitle
--------------------------------------------------------- */

const Hero = () => (
    <div className="relative flex flex-col items-center">
        {/* ambient spotlight behind logo */}
        <div
            className="pointer-events-none absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-2xl"
            style={{
                background:
                    "radial-gradient(closest-side, rgba(255,255,255,0.12), transparent 70%)",
            }}
        />

        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            className="relative flex h-[72px] w-[72px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-white"
            >
                <path
                    d="M12 2L14.4 9.2L22 12L14.4 14.8L12 22L9.6 14.8L2 12L9.6 9.2L12 2Z"
                    fill="currentColor"
                    fillOpacity="0.92"
                />
            </svg>
        </motion.div>

        <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
            Good to See You!
            <br className="hidden sm:block" /> How Can I be an Assistance?
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-center text-sm text-zinc-500 sm:text-base"
        >
            I'm available 24/7 for you, ask me anything.
        </motion.p>
    </div>
);

/* ---------------------------------------------------------
   Prompt Card — top row (pro plan / extensions), bottom row (input)
--------------------------------------------------------- */

const PromptCard = () => {
    const [value, setValue] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            className="relative mx-auto mt-10 w-full max-w-[700px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_10px_50px_rgba(80,120,255,0.12)]"
        >
            {/* animated floating glow */}
            <motion.div
                className="pointer-events-none absolute top-0 h-full w-1/3"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
                }}
                animate={{ left: ["-30%", "110%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* top row */}
            <div className="relative flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-400 sm:text-sm">
                    <Zap className="h-4 w-4 text-blue-300" />
                    <span>Shastra Ai</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 sm:text-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span>Active </span>
                </div>
            </div>

            {/* divider */}
            <div className="h-px w-full bg-white/[0.06]" />

            {/* bottom row */}
            <div className="relative flex items-center gap-3 px-4 py-4 sm:px-5">
                <button
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-transform duration-200 hover:scale-105 hover:bg-white/10"
                    aria-label="Add attachment"
                >
                    <Plus className="h-4 w-4" />
                </button>

                <div className="h-6 w-px flex-shrink-0 bg-white/10" />

                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Ask anything..."
                    className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none sm:text-base"
                />

                <button
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-transform duration-200 hover:scale-105 hover:bg-white/10"
                    aria-label="Voice input"
                >
                    <Mic className="h-4 w-4" />
                </button>
            </div>
        </motion.div>
    );
};

/* ---------------------------------------------------------
   Suggestion chip
--------------------------------------------------------- */

const SuggestionChip = ({ label, icon: Icon }) => (
    <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-zinc-300 transition-colors duration-300 hover:bg-white/5 sm:text-sm"
    >
        <Icon className="h-3.5 w-3.5 text-zinc-400" />
        <span className="whitespace-nowrap">{label}</span>
    </motion.button>
);

const SuggestionRow = () => (
    <motion.div
        initial="hidden"
        animate="show"
        variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
        }}
        className="mx-auto mt-6 flex w-full max-w-[700px] gap-2.5 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
    >
        {SUGGESTIONS.map((s) => (
            <motion.div
                key={s.id}
                variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <SuggestionChip label={s.label} icon={s.icon} />
            </motion.div>
        ))}
    </motion.div>
);

/* ---------------------------------------------------------
   Footer
--------------------------------------------------------- */

const Footer = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute inset-x-0 bottom-6 flex justify-center px-4 text-center text-xs text-zinc-500 sm:text-sm"
    >
        <p>
            Unlock new era with AetherAI.{" "}
            <a
                href="#"
                className="relative text-zinc-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-zinc-300 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
            >
                share us
            </a>
        </p>
    </motion.div>
);

/* ---------------------------------------------------------
   Root component
--------------------------------------------------------- */

export default function AetherAI() {
    return (
        <div className="relative flex flex-row min-h-screen overflow-y-auto scrollbar-none w-full items-center justify-center  bg-[#090909] font-sans">
            <Background />
            <Sidebar />
            {/* <Header /> */}

            <main className="relative z-10 flex w-full flex-col items-center px-4 sm:px-6">
                <Hero />
                <PromptCard />
                <SuggestionRow />
            </main>

            <Footer />
        </div>
    );
}