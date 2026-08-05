import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShortPreview from './MediumPreview';
import { motion, AnimatePresence } from 'framer-motion';
import ClickedInterviews from "./ClickedInterviews";
import ClickedResume from "./ClickedResume";
import ContentSecond2 from './ContentSecond2';
import HowCareerProfile from './HowCareerProfile';
import { Lock, Sparkles, TrendingUp, ShieldCheck, Cpu, Layers, Target, Award, ArrowRight, Check, X, Zap, LockIcon } from 'lucide-react';

const Card = ({ item, index }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => item.path && navigate(item.path)}
            className="group relative bg-[#0a0a0a] border border-[#212121] hover:border-zinc-700 hover:bg-[#121212] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl cursor-pointer h-full min-h-[240px]"
        >
            <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-black border border-[#212121] p-3 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-md">
                        {item.icon}
                    </div>
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-[#212121] text-zinc-300 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        STEP 0{index + 1}
                    </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 tracking-tight group-hover:text-zinc-100 transition-colors">
                    {item.Heading}
                </h3>
                <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                    {item.subHeading}
                </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#212121] flex items-center justify-between text-xs font-bold text-zinc-500 group-hover:text-white transition-colors uppercase tracking-wider">
                <span>Configure Feature</span>
                <span className="w-8 h-8 rounded-full bg-black border border-[#212121] flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                    &rarr;
                </span>
            </div>
        </div>
    );
};

const Landing = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store?.user?.user?.DATA || {});
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);

    const cardsData = [
        {
            Heading: "Create Career Profile",
            subHeading: "Build a comprehensive career profile with granular breakdowns of your technical proficiencies, open-source commits, and verified experiences.",
            path: "/app/build-resume",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                        <path d="M12 9c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z" />
                        <path d="M12 5.5c3.59 0 6.5 2.91 6.5 6.5c0 3.59 -2.91 6.5 -6.5 6.5c-3.59 0 -6.5 -2.91 -6.5 -6.5c0 -3.59 2.91 -6.5 6.5 -6.5Z" />
                    </g>
                </svg>
            )
        },
        {
            Heading: "Analyse Your Profile",
            subHeading: "Subject your resume to our deep AI ATS parsing engine to detect missing technical keywords, structural gaps, and readability metrics.",
            path: "/app/build-resume",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                        <path d="M17 9v9c0 1.66 -1.34 3 -3 3h-6c-1.66 0 -3 -1.34 -3 -3v-9Z" />
                        <path d="M17 9h3c0.55 0 1 0.45 1 1v3c0 0.55 -0.45 1 -1 1h-3" />
                    </g>
                </svg>
            )
        },
        {
            Heading: "ATS Certified Templates",
            subHeading: "Select from over 30 engineered layouts vetted by senior engineering recruiters and technical hiring committees at tier-1 firms.",
            path: "/app/resume-templates",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm11-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z"></path>
                </svg>
            )
        },
        {
            Heading: "Export & Showcasing",
            subHeading: "Download pixel-perfect vector PDFs or share dynamic verified links with prospective teams and technical recruiters instantly.",
            path: "/app/build-resume/preview-content",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 1.25a.75.75 0 0 0-.75.75v10.973l-1.68-1.961a.75.75 0 1 0-1.14.976l3 3.5a.75.75 0 0 0 1.14 0l3-3.5a.75.75 0 1 0-1.14-.976l-1.68 1.96V2a.75.75 0 0 0-.75-.75" clipRule="evenodd"></path>
                    <path fill="currentColor" d="M22 16v-1c0-2.828 0-4.242-.879-5.12C20.242 9 18.828 9 16 9H8c-2.829 0-4.243 0-5.122.88C2 10.757 2 12.17 2 14.997V16c0 2.829 0 4.243.879 5.122C3.757 22 5.172 22 8 22h8c2.828 0 4.243 0 5.121-.878C22 20.242 22 18.829 22 16" opacity={0.3}></path>
                </svg>
            )
        }
    ];

    const defenseQuestions = [
        "You mentioned increasing application performance by 30%. What specific metrics did you monitor, and how did you isolate the bottleneck?",
        "Walk me through the system architecture of your DevConnect project. What trade-offs occurred during state synchronization?",
        "Why did you opt for relational schema design in PostgreSQL over document structures in MongoDB for this specific workflow?",
        "Explain how data flows from your React frontend through your authentication middleware down to your database query execution.",
        "If your application experienced a sudden 100x concurrency surge in API traffic, which tier would buckle first and how would you redesign it?",
        "Describe the most intricate race condition or memory leak you encountered. What debugging instrumentations did you deploy to resolve it?",
        "You specified utilizing JWTs for session authorization. How are you handling token invalidation and XSS/CSRF threat vectors?",
        "If I review your most complex GitHub repository right now, which custom hook or utility algorithm best demonstrates your mastery?",
        "Tell me about a technical decision where your initial architecture proved unviable. How did you execute the refactor under deadline?"
    ];

    const [activeQ, setActiveQ] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setActiveQ(q => (q + 1) % defenseQuestions.length), 3800);
        return () => clearInterval(timer);
    }, [defenseQuestions.length]);

    const CTAcreateResume = ({ type }) => {
        return (
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full max-w-2xl mx-auto'>
                {/* Important primary action button -> Pure White with Black text */}
                <button
                    disabled={true}
                    onClick={() => {
                        if (type === "career") {
                            setClicked(prev => !prev);
                        } else {
                            setClicked2(prev => !prev);
                        }
                    }}
                    className='h-[54px] text-base font-bold transition-all duration-200 bg-white hover:bg-zinc-200 text-black rounded-3xl px-8 flex justify-center items-center gap-2 shadow-lg w-full sm:flex-1'
                >
                    <Sparkles className='w-5 h-5 fill-black/10' />
                    <span>{type === "career" ? "Analyse Resume" : "Apply for Mock Interviews"}</span>
                </button>

                {/* Secondary buttons -> #0a0a0a dark card styling with #212121 borders */}
                <button
                    onClick={() => navigate(type === 'career' ? '/app/build-resume' : '/app/interview-arena')}
                    className='h-[54px] text-base font-bold transition-all duration-200 bg-[#0a0a0a] hover:bg-zinc-900 border border-[#212121] hover:border-zinc-700 text-zinc-300 hover:text-white rounded-3xl px-8 flex justify-center items-center gap-2 shadow-md w-full sm:flex-1'
                >
                    <span>{type === 'career' ? "Edit Career Profile" : "Past Analyses & Records"}</span>
                </button>

                {type === 'career' && (
                    <button
                        onClick={() => navigate("/app/resume-templates")}
                        className='h-[54px] text-base font-bold transition-all duration-200 bg-white hover:bg-zinc-200 text-black rounded-3xl px-8 flex justify-center items-center gap-2 shadow-lg w-full sm:flex-1'
                    >
                        <span>Create Resume</span>
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="w-full bg-black min-h-screen text-white font-poppins px-4 py-8 md:px-8 lg:px-12 selection:bg-white selection:text-black">
            {/* Main Arena Content */}
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                {/* Hero Header Section */}
                <div className="text-center flex flex-col items-center pt-8 pb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a] border border-[#212121] text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        SHASTRA AI Intelligence
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none mb-6">
                        Interview Arena
                    </h1>

                    <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-3xl font-normal leading-relaxed">
                        A definitive career evaluation ecosystem. Synthesize ATS-optimized resumes, defend your project architecture against Shastra AI, and simulate technical hiring pipelines.
                    </p>

                    {/* NEW BLOCK 1: Real-Time Intelligence & Stats Bar */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full mt-12 text-left">
                        <div className="bg-[#0a0a0a] border border-[#212121] rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-colors">
                            <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
                                <span>ATS Parse Accuracy</span>
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-3xl sm:text-4xl font-extrabold text-white">98.4%</div>
                            <p className="text-xs text-zinc-500 mt-1">Verified on Greenhouse & Lever</p>
                        </div>

                        <div className="bg-[#0a0a0a] border border-[#212121] rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-colors">
                            <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
                                <span>Engineered Layouts</span>
                                <Layers className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-3xl sm:text-4xl font-extrabold text-white">30+</div>
                            <p className="text-xs text-zinc-500 mt-1">Tailored for SDE & DevOps</p>
                        </div>

                        <div className="bg-[#0a0a0a] border border-[#212121] rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-colors">
                            <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
                                <span>Shastra AI Grilling</span>
                                <Cpu className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-3xl sm:text-4xl font-extrabold text-white">Live Roast</div>
                            <p className="text-xs text-zinc-500 mt-1">Deep GitHub & project defense</p>
                        </div>

                        <div className="bg-[#0a0a0a] border border-[#212121] rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-colors">
                            <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
                                <span>Mock Rooms</span>
                                <Award className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-3xl sm:text-4xl font-extrabold text-white">24 / 7</div>
                            <p className="text-xs text-zinc-500 mt-1">On-demand technical scenarios</p>
                        </div>
                    </div>
                </div>

                {/* Section: Build Resume with SHASTRA */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#212121] pb-6">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block mb-1">Phase 01 &bull; Preparation</span>
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white ">
                                Build Resume with <p className=" inline-block text-white bg-[#212121] px:2 sm:px-4 py-1 mx-auto rounded-2xl border border-zinc-700 font-mono text-2xl sm:text-4xl lg:text-5xl">SHASTRA</p>
                            </h2>
                        </div>
                        <p className="text-zinc-400 text-sm sm:text-base max-w-md">
                            Harness algorithmic precision to transform scattered experiences into powerful, metric-driven engineering portfolios.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {cardsData.map((item, idx) => (
                            <Card key={idx} item={item} index={idx} />
                        ))}
                    </div>

                    <HowCareerProfile />

                    <div className="mt-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">Interactive Preview</span>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">Your Live Career Profile</h3>
                            </div>
                            <button
                                onClick={() => navigate('/app/build-resume/preview-content')}
                                className="bg-[#0a0a0a] hover:bg-zinc-900 border border-[#212121] hover:border-zinc-700 text-white text-sm font-bold px-5 py-2.5 rounded-2xl transition-all shadow-md flex items-center gap-2"
                            >
                                <span>Fullscreen Mode</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="rounded-3xl overflow-hidden bg-[#0a0a0a] border border-[#212121] p-2 shadow-2xl">
                            <ShortPreview />
                        </div>
                    </div>

                    <CTAcreateResume type={"career"} />
                </div>

                {/* NEW BLOCK 2: The 4-Stage Interview Success Architecture */}
                <div className="my-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block mb-2">Complete Pipeline</span>
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                            The 4-Stage Success Architecture
                        </h2>
                        <p className="text-zinc-400 text-base">
                            We bridge the gap between building a resume and mastering real-world technical interview defense through systematic AI rehearsal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Profile Synthesis", desc: "AI organizes your technical proficiencies, GitHub projects, and work achievements into clean data structures.", icon: <Target className="w-6 h-6 " /> },
                            { step: "02", title: "ATS Calibration", desc: "We cross-verify semantic density and keyword alignment against target company job descriptions.", icon: <ShieldCheck className="w-6 h-6 " /> },
                            { step: "03", title: "Project Defense Roast", desc: "Shastra AI scrutinizes your actual code, architecture choices, and database trade-offs in real time.", icon: <Cpu className="w-6 h-6 " /> },
                            { step: "04", title: "HR & Behavioral Sim", desc: "Pressure-test your soft skills and situational judgment using standardized STAR response evaluation.", icon: <Award className="w-6 h-6 " /> }
                        ].map((s, i) => (
                            <div key={i} className="bg-[#0a0a0a] border border-[#212121] rounded-3xl p-7 hover:border-zinc-700 transition-all flex flex-col justify-between group relative">
                                <div className="text-xs font-mono text-zinc-500 font-bold mb-4 flex items-center justify-between">
                                    <span>STAGE // {s.step}</span>
                                    <div className="p-2 rounded-xl bg-black border border-[#212121] text-white group-hover:bg-white  group-hover:text-black transition-colors">
                                        {s.icon}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors">{s.title}</h4>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-[#212121] flex items-center gap-2 text-xs font-bold text-zinc-500">
                                    <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-white transition-colors"></span>
                                    <span>Algorithmic Validation</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section: AI Mock Interview Studio Showcase */}
                <div className="bg-[#0a0a0a] border border-[#212121] rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-8 border-b border-[#212121]">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black border border-[#212121] text-white text-xs font-bold tracking-wider uppercase mb-3">
                                <Lock className="w-3.5 h-3.5 text-amber-400" />
                                <span>Studio Preview &bull; Early Beta Rolling Out</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                                AI Mock Interview Studio <span className='text-orange-500 text-sm border border-orange-500 px-3 py-1 rounded-full font-medium flex items-center justify-center gap-2 mt-2 w-fit inline-block '><LockIcon width={16} /> COMING SOON</span>
                            </h2>
                        </div>
                        <p className="text-zinc-400 text-sm sm:text-base max-w-md lg:text-right">
                            Step into a high-fidelity mock room where virtual interviewers test your technical competence, vocal confidence, and architectural rationale.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left Column: Simulated Studio Monitor */}
                        <div className="lg:col-span-5 bg-black border border-[#212121] rounded-3xl p-5 shadow-inner flex flex-col gap-4">
                            <div className="flex items-center justify-between px-2 text-xs font-mono text-zinc-400">
                                <span className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                                    REC // ROOM-782
                                </span>
                                <span>AUDIO: CRYPTIC_HD</span>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-[#212121] bg-zinc-950 aspect-video flex items-center justify-center">
                                <img
                                    src="https://res.cloudinary.com/dj0ivep44/image/upload/v1784994346/resume-examples-anatomy-image_n9yxhz.avif"
                                    alt="AI Virtual Interviewer screen displaying real-time eye contact, facial demeanor, and tone speech analytics"
                                    className="w-full h-full object-cover opacity-60 filter grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-4">
                                    <div className="w-full flex justify-between items-center bg-black/80 backdrop-blur-md border border-[#212121] rounded-xl px-4 py-2.5">
                                        <div className="flex flex-col">
                                            <span className="text-white text-xs font-bold">Shastra-V2 (Lead Engineer)</span>
                                            <span className="text-zinc-400 text-[10px] uppercase">Interviewer AI</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="w-1 h-3 bg-white rounded-full animate-bounce"></span>
                                            <span className="w-1 h-5 bg-white rounded-full animate-bounce delay-100"></span>
                                            <span className="w-1 h-2 bg-white rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                                <div className="bg-[#0a0a0a] border border-[#212121] rounded-xl p-2">
                                    <div className="text-[11px] text-zinc-500 uppercase font-bold">Confidence</div>
                                    <div className="text-white font-mono font-bold text-sm">94.2%</div>
                                </div>
                                <div className="bg-[#0a0a0a] border border-[#212121] rounded-xl p-2">
                                    <div className="text-[11px] text-zinc-500 uppercase font-bold">Clarity</div>
                                    <div className="text-white font-mono font-bold text-sm">Optimal</div>
                                </div>
                                <div className="bg-[#0a0a0a] border border-[#212121] rounded-xl p-2">
                                    <div className="text-[11px] text-zinc-500 uppercase font-bold">Latency</div>
                                    <div className="text-white font-mono font-bold text-sm">18ms</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Live AI Challenge Terminal */}
                        <div className="lg:col-span-7 bg-black border border-[#212121] rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-white fill-white/20" />
                                        Live Technical Interrogation Stream
                                    </span>
                                    <span className="text-xs bg-[#212121] text-zinc-300 px-3 py-1 rounded-full font-bold">
                                        QUESTION {activeQ + 1} OF {defenseQuestions.length}
                                    </span>
                                </div>

                                <div className="bg-[#0a0a0a] border border-[#212121] rounded-2xl p-6 sm:p-8 min-h-[160px] flex flex-col justify-center relative shadow-inner">
                                    <p className="text-xs text-zinc-500 font-mono mb-2">// SHASTRA AI INQUIRY</p>
                                    <AnimatePresence mode='wait'>
                                        <motion.p
                                            key={activeQ}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-white sm:text-lg font-medium leading-relaxed font-mono"
                                        >
                                            "{defenseQuestions[activeQ]}"
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-[#212121] flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex gap-1.5 flex-wrap">
                                    {defenseQuestions.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveQ(idx)}
                                            aria-label={`Select Question ${idx + 1}`}
                                            className="h-2 rounded-full transition-all duration-300 focus:outline-none"
                                            style={{
                                                width: idx === activeQ ? 28 : 8,
                                                background: idx === activeQ ? "#ffffff" : "#212121"
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-2">
                                    <span>STAR Methodology Evaluated</span>
                                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-[#212121]">
                        <CTAcreateResume type={"interviews"} />
                    </div>
                </div>

                {/* NEW BLOCK 3: AI Career Coach vs. Traditional Prep */}
                <div className="my-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block mb-2">Competitive Edge</span>
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                            Why Interview Arena Wins
                        </h2>
                        <p className="text-zinc-400 text-base">
                            See how CodeSarthi's autonomous Shastra AI completely redefines technical interview readiness compared to legacy practices.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {/* Traditional Prep Card */}
                        <div className="bg-black border border-[#212121] rounded-3xl p-8 opacity-80 flex flex-col justify-between">
                            <div>
                                <div className="text-xs font-mono font-bold text-zinc-500 uppercase mb-3 flex items-center justify-between">
                                    <span>Traditional Preparation</span>
                                    <X className="w-5 h-5 text-zinc-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-400 mb-6">Standard Mock Practices</h3>
                                <ul className="space-y-4 text-sm text-zinc-500">
                                    <li className="flex items-start gap-3">
                                        <span className="text-zinc-600 font-bold">&bull;</span>
                                        <span>Generic question banks unrelated to your exact code or tech stack.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-zinc-600 font-bold">&bull;</span>
                                        <span>Weeks of waiting for expensive peer mock interviews or mentorship chats.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-zinc-600 font-bold">&bull;</span>
                                        <span>Static resumes that repeatedly get rejected by automated corporate ATS bots.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-zinc-600 font-bold">&bull;</span>
                                        <span>No objective feedback on verbal tone, communication speed, or confidence metrics.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8 pt-4 border-t border-zinc-900 text-xs text-zinc-600 font-mono font-bold uppercase">
                                Outdated & Time-Consuming
                            </div>
                        </div>

                        {/* CodeSarthi Interview Arena Card */}
                        <div className="bg-[#0a0a0a] border border-white/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                            <div>
                                <div className="text-xs font-mono font-bold text-white uppercase mb-3 flex items-center justify-between">
                                    <span>CodeSarthi Ecosystem</span>
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-white mb-6">Shastra AI Powered</h3>
                                <ul className="space-y-4 text-sm text-zinc-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-white font-bold">&bull;</span>
                                        <span><strong className="text-white">Live GitHub Defense:</strong> AI parses your commits and drills into your specific architecture decisions.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-white font-bold">&bull;</span>
                                        <span><strong className="text-white">Instant On-Demand Practice:</strong> Launch 24/7 technical, system design, or HR simulated interviews instantly.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-white font-bold">&bull;</span>
                                        <span><strong className="text-white">98% ATS Compliance Guarantee:</strong> Automatically restructured templates tailored to targeted job requirements.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-white font-bold">&bull;</span>
                                        <span><strong className="text-white">Granular Diagnostics:</strong> Actionable scoring on technical keyword density and STAR method structuring.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8 pt-4 border-t border-[#212121] flex items-center justify-between text-xs text-white font-mono font-bold uppercase">
                                <span>Algorithmic Superiority</span>
                                <span className="bg-white text-black px-3 py-1 rounded-full text-[10px] font-extrabold">RECOMMENDED</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Component */}
                <ContentSecond2 />
            </div>

            {/* Modals & Popups */}
            {clicked && <ClickedResume clicked={clicked} setClicked={setClicked} />}
            {clicked2 && <ClickedInterviews clicked2={clicked2} setClicked2={setClicked2} />}
        </div>
    );
};

export default Landing;