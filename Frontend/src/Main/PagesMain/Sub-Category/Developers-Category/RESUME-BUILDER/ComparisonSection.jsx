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
            style={{ background: "rgba(0, 0, 0, 1)", }}
        >
            {/* animated gradient border on hover */}

            <div
                className="
absolute
inset-0
bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.30),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]
"
            />

            <div
                className="
absolute
inset-0
bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)]
bg-[size:40px_40px]
"
            />
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(99,102,241,0.08) 100%)",
                }}
            />
            <div className="relative z-10">
                <div
                    className="font-black tracking-tight leading-none mb-3 text-7xl"
                    style={{ color: "white" }}
                >
                    {prefix}{count}{suffix}
                </div>
                <p className="text-sm font-medium text-black/70 leading-snug tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>{label}</p>
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
    { name: "Career Knowledge Graph", traditional: { type: "cross", text: "Not available" }, ours: { type: "check", note: "Skills, projects & experience linked" } },
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
            <div className="flex  gap-2 items-center gap-1 text-black">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-black bg-green-700" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.6em" height="0.6em" viewBox="0 0 48 48">
                        <path fill="#fff" fillRule="evenodd" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clipRule="evenodd"></path>
                    </svg>
                </div>
                {note && <span className="text-md text leading-snug text-black" >{note}</span>}
            </div>
        );

    if (type === "star")
        return (
            <div className="flex  items-center gap-1">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-yellow-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.7em" height="0.7em" viewBox="0 0 24 24">
                        <path fill="#fff" d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937l-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39l3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36z"></path>
                    </svg>
                </div>
                {note && <span className="text-md  leading-snug text-black" >{note}</span>}
            </div>
        );

    if (type === "cross")
        return (
            <div className="w-5 h-5 rounded-full flex items-center justify-center  text-black bg-red-700" >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                    <path fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={1.5} d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07"></path>
                </svg>
            </div>
        );

    return (
        <span className="text-md leading-snug block text-black" >{text}</span>
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
            className="relative mt-16 rounded-3xl overflow-hidden border border-white/[0.08] bg-black"

        >
            {/* Ambient glow behind card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(33, 246, 168, 0.23) 0%, transparent 70%)", }} />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(129,140,248,0.23) 0%, transparent 70%)", }} />
            <div
                className="
absolute
inset-0
bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)]
bg-[size:40px_40px]
"
            />
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

    const [clickedIndex, setClickedIndex] = useState(null);
    return (
        <section
            className="relative overflow-hidden  px-4 font-poppins bg-gray-200"

        >


            <div className="relative z-10 w-full  mt-10 mx-auto">

                {/* Section header */}
                <motion.div
                    className="text-start mb-2 "
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >

                    <h2
                        className="text-black leading-[1.1]  mx-auto font-poppins text-[30px] "

                    >
                        <span className="text-black font-bold text-3xl md:text-4xl lg:text-5xl" >
                            We Build Career Readiness,
                        </span>
                    </h2>



                </motion.div>

                {/* Metric cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
                    <MetricCard value={95} suffix="%" label="Interview Confidence Increase" delay={0} />
                    <MetricCard value={4} suffix="x" label="Faster Resume Customization" delay={0.12} />
                    <MetricCard value={78} suffix="%" label="Higher ATS Match Scores" delay={0.24} />
                </div>

                {/* Comparison Table */}
                <div className="p-3 border   border-gray-400 bg-white rounded-3xl" >
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-3xl overflow-hidden border border-white/[0.07] max-[900px]:hidden"
                        style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                        {/* Table header */}
                        <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/[0.07]">
                            {/* Feature column header */}
                            <div className="p-5 md:p-6 bg-black/5 rounded-t-3xl">
                                <span className="text-xl font-extrabold uppercase tracking-widest text-black" style={{ letterSpacing: "0.1em" }}>Feature</span>
                            </div>

                            {/* Traditional column header */}
                            <div className="p-5 text-black md:p-6   text-center">
                                <span className="text-xl font-extrabold text-black">Traditional Builders</span>
                            </div>

                            {/* Our platform column header — highlighted */}
                            <div
                                className="p-5 md:p-6   text-center relative "

                            >

                                <div>
                                    <span
                                        className="text-xl font-extrabold"

                                    >
                                        CodeSarthi Resume Builder
                                    </span>
                                </div>
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
                                <div className={`p-4 md:p-5 flex items-center bg-black/5 ${i === features.length - 1 ? "rounded-b-3xl" : ""}`}>
                                    <span className="text-lg text-black font-medium leading-snug">{feature.name}</span>
                                </div>

                                {/* Traditional */}
                                <div className="p-4 md:p-5  border-white/[0.04] flex  items-center justify-start text-black">
                                    <Cell data={feature.traditional} highlight={false} />
                                </div>

                                {/* Our platform */}
                                <div
                                    className="p-4 md:p-5   flex items-center justify-start relative border-accent "

                                >
                                    <Cell data={feature.ours} highlight={true} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>



                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-3xl overflow-hidden border border-white/[0.07] min-[900px]:hidden flex flex-col gap-1"
                        style={{ background: "rgba(255,255,255,0.02)" }}

                    >

                        {features.map((items, idx) => (
                            <motion.div key={idx}

                                animate={{
                                    height: clickedIndex === idx ? "auto" : 60
                                }}
                                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}

                                onClick={() => {

                                    if (clickedIndex === idx) {
                                        setClickedIndex(null);
                                        return;
                                    }

                                    setClickedIndex(idx)
                                }

                                }
                                className="overflow-hidden text-black border p-4 bg-base-300 border-gray-300 rounded-3xl flex flex-col justify-between items-start ">
                                <div className="flex justify-between items-start w-full ">
                                    <span className="sm:text-lg text-md font-light">
                                        {items.name}
                                    </span>

                                    <span>

                                        <svg className={`${clickedIndex === idx ? "rotate-[270deg]" : "rotate-90"}`} xmlns="http://www.w3.org/2000/svg" width="0.6em" viewBox="0 0 12 24">
                                            <defs>
                                                <path id="SVG1pzpbdYY" fill="#000" d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"></path>
                                            </defs>
                                            <use fillRule="evenodd" href="#SVG1pzpbdYY" transform="rotate(-180 5.02 9.505)"></use>
                                        </svg>

                                    </span>


                                </div>

                                <span className={` w-full flex flex-col mt-4 `}>

                                    <div className="p-4 md:p-5  border-white/[0.04] flex flex-col bg-white w-full rounded-t-xl items-start gap-2 justify-start text-black">
                                        <div className="text-black font-bold">Traditional Builders</div>
                                        <Cell data={items.traditional} highlight={false} />
                                    </div>

                                    {/* Our platform */}
                                    <div
                                        className="p-4 md:p-5  bg-white w-full rounded-b-xl flex-col flex items-start gap-2 justify-start relative border-accent "

                                    >
                                        <div className="text-black font-bold">CodeSarthi Resume Builder </div>
                                        <Cell data={items.ours} highlight={true} />
                                    </div>
                                </span>

                            </motion.div>
                        ))}


                    </motion.div>


                </div>


                {/* Defense Card */}
                <DefenseCard />

            </div >
        </section >
    );
}