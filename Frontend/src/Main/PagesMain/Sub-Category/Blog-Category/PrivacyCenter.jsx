import React from 'react';
import Nav from '../../../Nav';
import Footer from '../../../Footer';
import { useNavigate } from "react-router-dom";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
    ShieldCheck, Lock, Eye, FileText, ArrowRight, CheckCircle, 
    ExternalLink, Mail, Shield, Key, Database, Layers 
} from 'lucide-react';

const PrivacyCenter = () => {
    const navigate = useNavigate();
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        gsap.from(".HEAD1", {
            duration: 1.4,
            y: 50,
            opacity: 0,
            ease: "power4.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".BOSSCONT",
                start: "top 85%",
            },
        });
        gsap.from(".SUBHEAD1", {
            duration: 1.4,
            y: 40,
            opacity: 0,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: ".BOSSCONT",
                start: "top 85%",
            }
        });
        gsap.from(".HEAD2", {
            duration: 1.4,
            x: -40,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".HEAD2",
                start: "top 90%",
            },
        });
        gsap.from(".SUBHEAD2", {
            duration: 1.4,
            y: 30,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".HEAD2",
                start: "top 90%",
            }
        });
        gsap.from(".HEAD3", {
            duration: 1.4,
            x: -40,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".HEAD3",
                start: "top 90%",
            },
        });
        gsap.from(".SUBHEAD3", {
            duration: 1.4,
            y: 30,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".HEAD3",
                start: "top 90%",
            }
        });
        gsap.from(".HEAD4", {
            duration: 1.4,
            y: 40,
            opacity: 0,
            ease: "power4.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".HEAD4",
                start: "top 85%",
            },
        });
    });

    const policyCards = [
        { title: "Archive and Candidate Privacy Policy", desc: "How we protect developer resumes and applicant profiles.", icon: <FileText className="w-7 h-7 text-neutral-300" /> },
        { title: "Privacy Policy", desc: "Comprehensive breakdown of data collection, storage, and rights.", icon: <ShieldCheck className="w-7 h-7 text-neutral-300" /> },
        { title: "Cookie Policy", desc: "Transparent overview of session tokens and local telemetry.", icon: <Key className="w-7 h-7 text-neutral-300" /> },
        { title: "Regional Privacy Policies", desc: "DPDP Act 2023 compliance and international governance standards.", icon: <Layers className="w-7 h-7 text-neutral-300" /> },
        { title: "Terms of Service", desc: "Our reciprocal commitment to a safe, professional developer ecosystem.", icon: <FileText className="w-7 h-7 text-neutral-300" /> },
        { title: "Retention Policy", desc: "Strict schedules on data expiration and automatic purging.", icon: <Database className="w-7 h-7 text-neutral-300" /> },
        { title: "Data Privacy Controls", desc: "Manage your personal telemetry, visibility, and AI training opt-out.", icon: <Lock className="w-7 h-7 text-neutral-300" /> },
        { title: "CodeSarthi Data Package", desc: "Export an encrypted copy of all your contributions and records at any time.", icon: <Eye className="w-7 h-7 text-neutral-300" /> },
    ];

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black font-sans overflow-x-hidden relative">
            <Nav />

            {/* Ambient Background Depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-neutral-900/30 via-black to-black pointer-events-none -z-10" />

            {/* ── HERO SECTION ── */}
            <div className="BOSSCONT flex flex-col items-center justify-center text-center mt-28 sm:mt-36 md:mt-44 px-4 sm:px-6 max-w-5xl mx-auto">
                
                {/* Status Badge */}
                <div className="HEAD1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a] border border-[#1d1d1d] text-neutral-300 text-xs sm:text-sm font-mono mb-8 shadow-xl backdrop-blur-md">
                    <Shield className="w-4 h-4 text-white" />
                    <span>DPDP Act 2023 Certified &bull; Zero-Sale Data Guarantee</span>
                </div>

                <h1 className="HEAD1 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
                    CodeSarthi <br />
                    <span className="text-neutral-400 font-light">Privacy Center</span>
                </h1>
                
                <p className="SUBHEAD1 text-base sm:text-lg md:text-2xl text-neutral-400 mt-6 max-w-3xl font-normal leading-relaxed">
                    Because protecting your intellectual property and personal identity is essential to building high-performance developer tools with absolute trust.
                </p>

                {/* Primary CTA Action Row */}
                <div className="SUBHEAD1 flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto px-4 sm:px-0">
                    {/* IMPORTANT BUTTON -> PURE WHITE */}
                    <button 
                        onClick={() => navigate("/privacy-&-policy-hub")}
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-neutral-200 text-black font-extrabold text-base transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Explore Policy Hub</span>
                        <ArrowRight className="w-5 h-5 text-black" />
                    </button>

                    {/* SECONDARY BUTTON -> #0a0a0a */}
                    <a 
                        href="mailto:codesarthi.help@gmail.com"
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0a0a0a] hover:bg-[#141414] text-neutral-300 hover:text-white font-bold text-base transition-all duration-300 border border-[#222222] hover:border-neutral-600 flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Mail className="w-5 h-5 text-neutral-400" />
                        <span>Contact DPO Support</span>
                    </a>
                </div>
            </div>

            {/* ── COMMITMENT INTRODUCTION ── */}
            <div className="HEAD1 flex flex-col items-center justify-center px-6 sm:px-12 py-24 sm:py-32 max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                    Our Commitment to Privacy
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 leading-relaxed font-light">
                    Team Axonic created CodeSarthi to be an elite ecosystem that accelerates developer growth while relentlessly safeguarding your privacy. Across every workflow, we engineer privacy into our architecture by design and maintain radical transparency about how your telemetry is processed.
                </p>
            </div>

            {/* ── CORE PRINCIPLES GRID ── */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* PRINCIPLE CARD 1 */}
                    <div className="w-full p-8 sm:p-12 rounded-3xl bg-[#0a0a0a] flex flex-col justify-between gap-8 transition-all duration-500 hover:bg-[#0e0e0e] shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-black border border-[#222222] flex items-center justify-center group-hover:border-white/40 transition-colors shrink-0 shadow-inner">
                                <Lock className="w-8 h-8 text-neutral-200" />
                            </div>
                            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest bg-black px-3 py-1 rounded-full border border-[#1b1b1b]">
                                Security Architecture
                            </span>
                        </div>
                        <div>
                            <h3 className="HEAD2 text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                                We manage your data with engineering rigor
                            </h3>
                            <p className="SUBHEAD2 text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
                                Collecting, compiling, and evaluating career metrics is a tremendous responsibility. Privacy only exists when infrastructure is impregnable, which is why we invest heavily in end-to-end encryption, Zero-Trust network protocols, and robust automated access guards.
                            </p>
                        </div>
                    </div>

                    {/* PRINCIPLE CARD 2 */}
                    <div className="w-full p-8 sm:p-12 rounded-3xl bg-[#0a0a0a] flex flex-col justify-between gap-8 transition-all duration-500 hover:bg-[#0e0e0e] shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-black border border-[#222222] flex items-center justify-center group-hover:border-white/40 transition-colors shrink-0 shadow-inner">
                                <ShieldCheck className="w-8 h-8 text-neutral-200" />
                            </div>
                            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest bg-black px-3 py-1 rounded-full border border-[#1b1b1b]">
                                Zero Ad-Tracking
                            </span>
                        </div>
                        <div>
                            <h3 className="HEAD2 text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                                You will never be sold as the product
                            </h3>
                            <p className="SUBHEAD2 text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
                                We do not monetize, broker, or trade your personal identities or codebase histories to external advertisers or third parties. Our sole business model is building high-impact developer tooling. On CodeSarthi, your intellectual property remains strictly yours.
                            </p>
                        </div>
                    </div>

                    {/* PRINCIPLE CARD 3 */}
                    <div className="w-full p-8 sm:p-12 rounded-3xl bg-[#0a0a0a] flex flex-col justify-between gap-8 transition-all duration-500 hover:bg-[#0e0e0e] shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-black border border-[#222222] flex items-center justify-center group-hover:border-white/40 transition-colors shrink-0 shadow-inner">
                                <Key className="w-8 h-8 text-neutral-200" />
                            </div>
                            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest bg-black px-3 py-1 rounded-full border border-[#1b1b1b]">
                                Granular Control
                            </span>
                        </div>
                        <div>
                            <h3 className="HEAD3 text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                                Privacy autonomy begins with you
                            </h3>
                            <p className="SUBHEAD3 text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
                                Authentic data privacy requires absolute personal sovereignty over your workspace. On CodeSarthi, you exercise precise control over your visibility settings, project sharing permissions, AI model opt-outs, and historical log exports.
                            </p>
                        </div>
                    </div>

                    {/* PRINCIPLE CARD 4 */}
                    <div className="w-full p-8 sm:p-12 rounded-3xl bg-[#0a0a0a] flex flex-col justify-between gap-8 transition-all duration-500 hover:bg-[#0e0e0e] shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-black border border-[#222222] flex items-center justify-center group-hover:border-white/40 transition-colors shrink-0 shadow-inner">
                                <Eye className="w-8 h-8 text-neutral-200" />
                            </div>
                            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest bg-black px-3 py-1 rounded-full border border-[#1b1b1b]">
                                Minimalist Footprint
                            </span>
                        </div>
                        <div>
                            <h3 className="HEAD3 text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                                Minimal data collected, maximum clarity delivered
                            </h3>
                            <p className="SUBHEAD3 text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
                                We ensure you clearly comprehend how personal data is utilized across CodeSarthi—whether via our{' '}
                                <button 
                                    className="inline font-medium text-white underline underline-offset-4 hover:text-neutral-300 transition-colors cursor-pointer" 
                                    onClick={() => navigate("/privacy-&-policy-hub")}
                                >
                                    Privacy Policy
                                </button>
                                , within application settings, or in documentation. We intentionally minimize collection to bare essentials and automatically prune stale records.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── PRIVACY POLICIES ROSTER HEADER ── */}
            <div className="flex flex-col items-center justify-center px-6 md:px-12 pt-16 pb-12 text-center max-w-4xl mx-auto">
                <h2 className="HEAD4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Governance &amp; Policy Library
                </h2>
                <p className="HEAD4 text-base sm:text-xl text-neutral-400 mt-4 max-w-2xl font-light">
                    Explore our comprehensive documentation detailing exactly how we secure, process, store, and shield your developmental workflows.
                </p>
            </div>

            {/* ── POLICY CARDS GRID ── */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-28">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {policyCards.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate("/privacy-&-policy-hub")}
                            className="group relative flex flex-col justify-between min-h-[220px] p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] cursor-pointer transition-all duration-300 hover:bg-[#121212] hover:scale-[1.02] active:scale-95 shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors shadow-inner">
                                    {item.icon}
                                </div>
                                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:underline decoration-white/30 underline-offset-4 tracking-tight mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── BOTTOM CALL TO ACTION BANNER ── */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-28">
                <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#0a0a0a] text-center flex flex-col items-center justify-center gap-6 shadow-[0_30px_90px_rgba(0,0,0,1)] relative overflow-hidden">
                    
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl font-extrabold text-2xl mb-2 animate-pulse">
                        <CheckCircle className="w-8 h-8 text-black stroke-[2.5]" />
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-xl">
                        Your Data, Your Sovereignty
                    </h3>
                    
                    <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-light leading-relaxed">
                        Our entire architecture operates under stringent compliance with the Digital Personal Data Protection Act 2023. We stand committed to transparent, secure, and ethical engineering at every layer.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto justify-center">
                        {/* MOST IMPORTANT BUTTON -> PURE WHITE */}
                        <button
                            onClick={() => navigate('/privacy-&-policy-hub')}
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-neutral-200 text-black font-extrabold text-base transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>Open Privacy Hub</span>
                            <ExternalLink className="w-4 h-4 text-black" />
                        </button>

                        {/* SECONDARY BUTTON -> #000000 / #0a0a0a styling */}
                        <a 
                            href="mailto:codesarthi.help@gmail.com"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#000000] hover:bg-[#141414] text-neutral-300 hover:text-white font-bold text-base transition-all duration-300 border border-[#252525] flex items-center justify-center gap-2"
                        >
                            <span>Contact Legal Support</span>
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PrivacyCenter;