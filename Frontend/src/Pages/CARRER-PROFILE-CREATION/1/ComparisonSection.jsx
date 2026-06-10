import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   ANIMATED COUNTER HOOK
───────────────────────────────────────────── */
function useCounter(target, duration = 1.8) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / (duration * 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return { count, ref };
}

/* ─────────────────────────────────────────────
   METRIC CARD
───────────────────────────────────────────── */
function MetricCard({ prefix = "", value, suffix = "", label, delay }) {
    const { count, ref } = useCounter(value);
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative group overflow-hidden rounded-2xl border border-white/[0.07] p-7"
            style={{ background: "rgba(255,255,255,0.03)", }}
        >
            {/* animated gradient border on hover */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(99,102,241,0.08) 100%)",
                }}
            />
            <div className="relative z-10">
                <div
                    className="font-black tracking-tight leading-none mb-3 text-7xl"

                >
                    {prefix}{count}{suffix}
                </div>
                <p className="text-sm font-medium text-white/50 leading-snug tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>{label}</p>
            </div>
            {/* bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)" }} />
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   FEATURE ROWS DATA
───────────────────────────────────────────── */
const features = [
    { name: "Resume Generation", traditional: { type: "check" }, ours: { type: "check" } },
    { name: "ATS Optimization", traditional: { type: "text", text: "Basic keyword matching" }, ours: { type: "text", text: "AI-powered role-specific optimization", accent: true } },
    { name: "Multiple Resume Versions", traditional: { type: "text", text: "Manual editing" }, ours: { type: "text", text: "Auto-generated for every job", accent: true } },
    { name: "Career Knowledge Graph", traditional: { type: "cross" }, ours: { type: "check", note: "Skills, projects & experience linked" } },
    { name: "JD Deep Analysis", traditional: { type: "text", text: "Basic keyword scan" }, ours: { type: "text", text: "Contextual understanding of requirements", accent: true } },
    { name: "Skill Gap Detection", traditional: { type: "cross" }, ours: { type: "check", note: "Missing skills identified instantly" } },
    { name: "Proof-Based Writing", traditional: { type: "cross" }, ours: { type: "check", note: "Projects become evidence" } },
    { name: "Cover Letter Generation", traditional: { type: "text", text: "Limited" }, ours: { type: "check", note: "Tailored to every JD" } },
    { name: "Interview Preparation", traditional: { type: "cross" }, ours: { type: "check", note: "From your actual resume" } },
    { name: "Resume Defense Mode", traditional: { type: "cross" }, ours: { type: "star", note: "AI challenges every claim you made" } },
    { name: "Application Readiness Score", traditional: { type: "cross" }, ours: { type: "check", note: "Hiring probability estimate" } },
    { name: "Career Intelligence Layer", traditional: { type: "cross" }, ours: { type: "check", note: "Learns your full professional profile" } },
    { name: "Master Profile System", traditional: { type: "cross" }, ours: { type: "check", note: "Store once, generate infinitely" } },
];

/* ─────────────────────────────────────────────
   CELL RENDERER
───────────────────────────────────────────── */
function Cell({ data, highlight = false }) {
    if (!data) return null;
    const { type, text, note, accent } = data;

    if (type === "check")
        return (
            <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: highlight ? "rgba(52,211,153,0.18)" : "rgba(255,255,255,0.06)" }}>
                    <svg width="20" height="20" viewBox="0 0 13 13" fill="none">
                        <path d="M2.5 6.5L5 9L10.5 3.5" stroke={highlight ? "rgba(0, 255, 162, 1)" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                {note && <span className="text-md text-center leading-snug" style={{ color: highlight ? "rgba(52,211,153,0.75)" : "rgba(255,255,255,0.35)", maxWidth: 140 }}>{note}</span>}
            </div>
        );

    if (type === "star")
        return (
            <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(250,204,21,0.15)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" fill="#facc15" />
                    </svg>
                </div>
                {note && <span className="text-md text-center leading-snug" style={{ color: "rgba(250,204,21,0.7)", maxWidth: 140 }}>{note}</span>}
            </div>
        );

    if (type === "cross")
        return (
            <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto" style={{ background: "rgba(239,68,68,0.08)" }}>
                <svg width="20" height="20" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2L8 8M8 2L2 8" stroke="rgba(255, 0, 0, 1)" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            </div>
        );

    return (
        <span className="text-md text-center leading-snug block" style={{ color: accent ? "rgba(52,211,153,0.8)" : "rgba(255, 255, 255, 0.78)" }}>{text}</span>
    );
}

/* ─────────────────────────────────────────────
   DEFENSE FEATURE CARD
───────────────────────────────────────────── */
const defenseQuestions = [
    "You mentioned improving performance by 30%. How was that measured?",
    "Tell me about the architectural decisions behind DevConnect.",
    "Why did you choose PostgreSQL over MongoDB?",
    "What tradeoffs did you face while implementing SSR?",
];

function DefenseCard() {
    const [activeQ, setActiveQ] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setActiveQ(q => (q + 1) % defenseQuestions.length), 3000);
        return () => clearInterval(t);
    }, []);

    const workflow = ["Build Resume", "Optimize for JD", "Generate Cover Letter", "Practice Interview", "Application Ready"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-16 rounded-3xl overflow-hidden border border-white/[0.08]"
            style={{ background: "rgba(255,255,255,0.025)" }}
        >
            {/* Ambient glow behind card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)", }} />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)", }} />

            {/* Animated top gradient border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.6) 30%, rgba(129,140,248,0.6) 70%, transparent 100%)" }} />

            <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-wrap items-start gap-4 mb-8">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span
                                className="text-md font-bold px-3 py-1 rounded-full tracking-widest uppercase"
                                style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)", letterSpacing: "0.12em" }}
                            >
                                Industry First
                            </span>

                        </div>
                        <h3
                            className="font-black leading-tight mb-3"
                            style={{
                                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Resume Defense AI™
                        </h3>
                        <p className="text-white/50 leading-relaxed max-w-lg" style={{ fontSize: "0.95rem" }}>
                            After generating a tailored resume, you unlock an interview simulator trained on that exact document.
                            The AI challenges <em className="text-white/70 not-italic">every claim</em> you made — turning your resume into preparation.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Live question demo */}
                    <div>
                        <p className="text-md text-white/30 uppercase tracking-widest mb-4 font-medium">Live AI Challenge Preview</p>
                        <div
                            className="rounded-2xl p-5 border border-white/[0.06] overflow-hidden"
                            style={{ background: "rgba(0,0,0,0.3)", minHeight: 120 }}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)" }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="8" r="3" stroke="#34d399" strokeWidth="1.8" />
                                        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-md text-white/30 mb-2 font-mono">interviewer.ai</p>
                                    <motion.p
                                        key={activeQ}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.4 }}
                                        className="text-white/85 leading-relaxed"
                                        style={{ fontSize: "0.88rem" }}
                                    >
                                        "{defenseQuestions[activeQ]}"
                                    </motion.p>
                                </div>
                            </div>
                            {/* Progress dots */}
                            <div className="flex gap-1.5 mt-5 ml-10">
                                {defenseQuestions.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="rounded-full transition-all duration-500"
                                        style={{
                                            width: i === activeQ ? 20 : 6,
                                            height: 4,
                                            background: i === activeQ ? "#34d399" : "rgba(255,255,255,0.15)",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Workflow */}
                    <div>
                        <p className="text-md text-white/30 uppercase tracking-widest mb-4 font-medium">Complete Workflow</p>
                        <div className="space-y-2">
                            {workflow.map((step, i) => (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center text-md font-bold flex-shrink-0"
                                            style={{
                                                background: i === workflow.length - 1 ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.06)",
                                                border: `1px solid ${i === workflow.length - 1 ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.1)"}`,
                                                color: i === workflow.length - 1 ? "#34d399" : "rgba(255,255,255,0.4)",
                                                fontSize: "10px",
                                            }}
                                        >
                                            {i + 1}
                                        </div>
                                        {i < workflow.length - 1 && <div className="w-px h-4 mt-0.5" style={{ background: "rgba(255,255,255,0.06)" }} />}
                                    </div>
                                    <span
                                        className="text-sm"
                                        style={{ color: i === workflow.length - 1 ? "#34d399" : "rgba(255,255,255,0.55)", fontWeight: i === workflow.length - 1 ? 600 : 400 }}
                                    >
                                        {step}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ComparisonSection() {
    return (
        <section
            className="relative overflow-hidden mb-[100px] px-4 font-poppins bg-base-100"

        >


            <div className="relative z-10 w-[90%] mt-10 mx-auto">

                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-md font-semibold tracking-widest "
                        style={{ borderColor: "rgba(237, 255, 248, 0.25)", background: "rgba(52,211,153,0.06)", color: "#fff", letterSpacing: "0.12em" }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        CodeSarthi Resume Builder
                    </div>
                    <h2
                        className="font-black leading-[1.1] mb-5 mx-auto font-head text-[30px] text-info"

                    >
                        Why Builders Stop at Resumes —<br />
                        <span className="text-white text-5xl md:text-6xl lg:text-7xl" >
                            We Build Career Readiness
                        </span>
                    </h2>


                    <p className="text-lg underline underline-offset-8 text-info mt-4 tracking-wide">Designed for candidates who want offers, not just resumes.</p>
                </motion.div>

                {/* Metric cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
                    <MetricCard value={95} suffix="%" label="Interview Confidence Increase" delay={0} />
                    <MetricCard value={4} suffix="x" label="Faster Resume Customization" delay={0.12} />
                    <MetricCard value={78} suffix="%" label="Higher ATS Match Scores" delay={0.24} />
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl overflow-hidden border border-white/[0.07]"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                >
                    {/* Table header */}
                    <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/[0.07]">
                        {/* Feature column header */}
                        <div className="p-5 md:p-6">
                            <span className="text-md font-semibold uppercase tracking-widest text-white" style={{ letterSpacing: "0.1em" }}>Feature</span>
                        </div>

                        {/* Traditional column header */}
                        <div className="p-5 md:p-6 border-l border-white/[0.07] text-center">
                            <span className="text-md font-semibold text-white">Traditional Builders</span>
                        </div>

                        {/* Our platform column header — highlighted */}
                        <div
                            className="p-5 md:p-6 border-l bg-secondary text-center relative border-accent"

                        >
                            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)" }} />
                            <motion.div
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span
                                    className="text-md font-bold"

                                >
                                    CodeSarthi Resume Builder
                                </span>
                            </motion.div>
                            <div className="absolute inset-0 rounded-none pointer-events-none" style={{ boxShadow: "inset 0 0 40px rgba(52,211,153,0.03)" }} />
                        </div>
                    </div>

                    {/* Feature rows */}
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.name}
                            className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/[0.04] group"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04, duration: 0.4 }}
                            whileHover={{ background: "rgba(255,255,255,0.015)" }}
                        >
                            {/* Feature name */}
                            <div className="p-4 md:p-5 flex items-center">
                                <span className="text-lg text-info font-medium leading-snug">{feature.name}</span>
                            </div>

                            {/* Traditional */}
                            <div className="p-4 md:p-5 border-l border-white/[0.04] flex items-center justify-center">
                                <Cell data={feature.traditional} highlight={false} />
                            </div>

                            {/* Our platform */}
                            <div
                                className="p-4 md:p-5 border-l flex items-center justify-center relative border-accent bg-secondary"

                            >
                                <Cell data={feature.ours} highlight={true} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Defense Card */}
                <DefenseCard />

            </div >
        </section >
    );
}