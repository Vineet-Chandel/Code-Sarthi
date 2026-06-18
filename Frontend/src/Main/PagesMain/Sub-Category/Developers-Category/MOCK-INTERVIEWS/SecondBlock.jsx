import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'



/* ─────────────────────────────────────────────
   DEFENSE FEATURE CARD
───────────────────────────────────────────── */
const defenseQuestions = [
    "You mentioned increasing application performance by 30%. What metrics did you use, and how did you measure the improvement?",
    "Walk me through your DevConnect project from start to finish. What was your biggest technical challenge?",
    "Why did you choose PostgreSQL instead of MongoDB for this project? What trade-offs did you consider?",
    "You listed React, Node.js, and Express as your core skills. Which part of the stack are you most confident in, and why?",
    "Explain the overall architecture of your application. How does data flow from the frontend to the database?",
    "If your application suddenly had one million users, what would you change to make it scalable?",
    "What was the most difficult bug you encountered, and how did you debug and resolve it?",
    "Describe a feature you built entirely on your own. What was your exact contribution?",
    "You mentioned using JWT authentication. Explain how it works and why you chose it.",
    "How did you secure your APIs against common attacks like SQL Injection or XSS?",
    "Why did you choose this tech stack over other alternatives?",
    "If I open your GitHub repository right now, which file would best demonstrate your coding skills?",
    "What's something in this project you're not completely satisfied with? How would you improve it?",
    "Tell me about a time your first solution failed. What did you learn from that experience?",
    "If I remove one major technology from your project, how would you redesign the solution?"
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
            className="relative  rounded-3xl overflow-hidden border border-white/[0.08] bg-black flex sm:flex-row flex-col "

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
            <div className="absolute top-0 left-0 right-0 " style={{ background: "linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.6) 30%, rgba(129,140,248,0.6) 70%, transparent 100%)" }} />

            <div className="relative w-full sm:w-1/2  z-10 p-8 md:p-12">
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
                            AI Based Mock Interviews
                        </h3>
                        <p className="text-white/70 leading-relaxed max-w-lg" style={{ fontSize: "0.95rem" }}>
                            Most resume builders stop after generating your CV. We don't. Our AI turns your resume into a personalized interview, ensuring you're ready to answer every question behind <em className="text-white/70 not-italic">every claim</em> you made — turning your resume into preparation.
                        </p>
                    </div>
                </div>

                <div className=" gap-8 items-start">
                    {/* Live question demo */}
                    <div>
                        <p className="text-md text-white/90 uppercase tracking-widest mb-4 font-extrabold">Live AI Challenge Preview</p>
                        <div
                            className="rounded-2xl p-5 border border-white/[0.06] overflow-hidden"
                            style={{ background: "rgba(0,0,0,0.3)", minHeight: 120 }}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 overflow-hidden" >
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="#fff" fillRule="evenodd" d="M280.4 68.995c26.79-29.767 76.077-15.992 83.552 23.35l14.88 78.321h-245.67l14.881-78.32c7.475-39.343 56.762-53.118 83.552-23.351c13.041 14.49 35.764 14.49 48.805 0M129.109 191.999l-8.106 42.667h-35.67v42.666h341.334v-42.666h-35.675l-8.106-42.667zm41.558 234.667L128 405.332l-42.667-21.333v85.333h341.334v-85.333L384 405.332l-42.667 21.334L256 469.332zm213.333-128H128v21.333h.062c1.392 29.69 25.904 53.333 55.938 53.333h8c22.679 0 34.959-14.259 39.955-32.235c3.155-11.352 12.263-21.098 24.045-21.098s20.89 9.746 24.045 21.098c4.996 17.976 17.276 32.235 39.955 32.235h8c30.034 0 54.546-23.643 55.938-53.333H384z" clipRule="evenodd"></path> </svg>
                                </div>
                                <div>
                                    <p className="text-md text-white/30 mb-2 font-mono">AI Interviewer</p>
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


                </div>
            </div>

            <div className="w-full flex justify-center items-center sm:w-1/2 py-10">
                {/* Workflow */}
                <div>
                    <p className="text-md text-white/30 uppercase tracking-widest mb-4 font-medium">Complete Workflow</p>
                    <div className="space-y-3">
                        {workflow.map((step, i) => (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ x: 6, scale: 1.015 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.45,
                                    delay: i * 0.08,
                                }}
                                className="flex gap-4 rounded-xl px-3 py-2 transition-all duration-300 hover:bg-white/5"
                            >
                                {/* Timeline */}
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{
                                            delay: i * 0.08,
                                            type: "spring",
                                            stiffness: 250,
                                        }}
                                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold
                        ${i === workflow.length - 1
                                                ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                                                : "border-white/10 bg-white/5 text-white/50"
                                            }`}
                                    >
                                        {i + 1}
                                    </motion.div>

                                    {i < workflow.length - 1 && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: 32 }}
                                            transition={{ delay: 0.15 + i * 0.08 }}
                                            className="mt-1 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent"
                                        />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-1">
                                    <p
                                        className={`text-sm leading-relaxed transition-colors duration-300
                        ${i === workflow.length - 1
                                                ? "font-medium text-emerald-400"
                                                : "text-white/65 group-hover:text-white/90"
                                            }`}
                                    >
                                        {step}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='absolute h-[250px] sm:h-full right-5 bottom-5 opacity-20'>

                <svg className="  h-full relative z-10
  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="#fff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                </svg>
            </div>
        </motion.div>
    );
}

const SecondBlock = () => {


    return (
        <div className='w-full flex items-center justify-center pb-10 px-1'>
            <div className='w-full'>
                <DefenseCard />
            </div>

        </div>

    )
}

export default SecondBlock