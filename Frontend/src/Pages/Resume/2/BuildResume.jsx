import React, { useEffect, useRef, useState } from 'react'
import { Layout, Sparkles, Download, CheckCircle2, ArrowRight, Clock, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const steps = [
    {
        number: "01",
        label: "STEP ONE",
        title: "Pick a Template",
        subtitle: "Your first impression starts here",
        description: "Browse our curated library of recruiter-approved layouts. Every template is battle-tested against modern ATS systems, ensuring your resume actually gets seen — not filtered out.",
        icon: Layout,
        iconBg: "from-amber-400 to-orange-500",
        accentColor: "#f59e0b",
        accentLight: "#fef3c7",
        timeLabel: "~1 minute",
        timeIcon: Clock,
        checks: [
            "ATS-friendly & recruiter-approved",
            "Flexible, modern layouts",
            "Job and industry matched",
        ],
        visual: (
            <div className="relative w-full h-40 flex items-center justify-center">
                <div className="absolute inset-0 flex items-end justify-center gap-2 pb-2">
                    {[
                        { h: "h-16", bg: "bg-amber-200", border: "border-amber-400" },
                        { h: "h-28", bg: "bg-amber-400", border: "border-amber-600" },
                        { h: "h-20", bg: "bg-amber-300", border: "border-amber-500" },
                    ].map((bar, i) => (
                        <div key={i} className={`w-10 ${bar.h} ${bar.bg} border-2 ${bar.border} rounded-t-lg flex items-center justify-center`}>
                            <div className="w-6 h-1 bg-white/60 rounded mt-auto mb-2" />
                        </div>
                    ))}
                </div>
                <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">Best Match ✓</div>
            </div>
        )
    },
    {
        number: "02",
        label: "STEP TWO",
        title: "Add Context with AI",
        subtitle: "Let intelligence fill the gaps",
        description: "No more staring at a blank page. Our AI understands your experience and transforms rough notes into polished, impactful bullet points that hiring managers actually read.",
        icon: Sparkles,
        iconBg: "from-blue-400 to-indigo-600",
        accentColor: "#3b82f6",
        accentLight: "#eff6ff",
        timeLabel: "~3 minutes",
        timeIcon: Zap,
        checks: [
            "Beats writer's block instantly",
            "AI bullet point enhancer",
            "Tailored to your industry",
        ],
        visual: (
            <div className="relative w-full h-40 flex flex-col items-start justify-center px-4 gap-2">
                {["Improved team workflow by...", "Led cross-functional team...", "Reduced costs by 30%..."].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 w-full">
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 text-xs text-blue-700 font-medium truncate">{text}</div>
                        <Sparkles className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    </div>
                ))}
                <div className="absolute top-2 right-2 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
            </div>
        )
    },
    {
        number: "03",
        label: "STEP THREE",
        title: "Download & Send",
        subtitle: "Ready before your coffee cools",
        description: "Export your polished resume in PDF or Word format in seconds. Multiple versions for different roles? No problem. You're interview-ready in under 5 minutes, guaranteed.",
        icon: Download,
        iconBg: "from-emerald-400 to-teal-600",
        accentColor: "#10b981",
        accentLight: "#ecfdf5",
        timeLabel: "~1 minute",
        timeIcon: Star,
        checks: [
            "PDF and Word formats",
            "Unlimited versions & exports",
            "Ready in under 5 minutes",
        ],
        visual: (
            <div className="relative w-full h-40 flex items-center justify-center">
                <div className="relative">
                    <div className="w-24 h-32 bg-white border-2 border-emerald-300 rounded-lg shadow-lg flex flex-col items-center justify-center gap-1.5">
                        <div className="w-14 h-1.5 bg-emerald-200 rounded-full" />
                        <div className="w-10 h-1.5 bg-emerald-100 rounded-full" />
                        <div className="w-14 h-1.5 bg-emerald-200 rounded-full" />
                        <div className="w-12 h-1.5 bg-emerald-100 rounded-full" />
                        <div className="mt-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Download className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">PDF</div>
                    <div className="absolute -bottom-2 -left-2 bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">DOCX</div>
                </div>
            </div>
        )
    }
];

const StepCard = ({ step, index, isVisible }) => {
    const Icon = step.icon;
    return (
        <div
            className="relative flex flex-col"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s ease ${index * 0.18}s, transform 0.6s ease ${index * 0.18}s`
            }}
        >


            {/* Card */}
            <div
                className="group flex-1 rounded-3xl border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-default"
                style={{ borderColor: `${step.accentColor}30`, background: 'white' }}
            >
                {/* Top accent bar */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(to right, ${step.accentColor}, ${step.accentColor}66)` }} />

                {/* Visual area */}
                <div
                    className="w-full border-b"
                    style={{ background: step.accentLight, borderColor: `${step.accentColor}20` }}
                >
                    {step.visual}
                </div>

                <div className="p-7">
                    {/* Icon + Title */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 leading-tight">{step.title}</h3>
                            <p className="text-sm font-medium" style={{ color: step.accentColor }}>{step.subtitle}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{step.description}</p>

                    {/* Checklist */}
                    <ul className="space-y-2.5 mb-5">
                        {step.checks.map((check, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: step.accentColor }} />
                                {check}
                            </li>
                        ))}
                    </ul>

                    {/* Time badge */}
                    <div
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ background: step.accentLight, color: step.accentColor }}
                    >
                        <step.timeIcon className="w-3 h-3" />
                        {step.timeLabel}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BuildResume = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    // Trigger on mount too
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className='w-screen min-h-screen bg-base-200 font-sans flex justify-center items-start py-8 px-4'>
            <div className='w-[90%] h-[90%] bg-base-100 p-10  rounded-2xl shadow-2xl'>

                {/* Header */}
                <div
                    className="text-center mb-14"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(-20px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease'
                    }}
                >

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                        Here's how we{' '}
                        <span className="relative inline-block">
                            <span className="text-blue-600">Get You Hired.</span>
                            <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6">
                                <path d="M0 5 Q100 0 200 5" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
                        Three simple steps. One powerful resume. Your dream job — closer than ever.
                    </p>
                </div>

                {/* Timeline connector (desktop) */}
                <div className="hidden lg:flex items-center justify-center mb-10 px-16 gap-0">
                    {steps.map((step, i) => (
                        <React.Fragment key={i}>
                            <div
                                className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black"
                                style={{ borderColor: step.accentColor, color: step.accentColor, background: step.accentLight }}
                            >{i + 1}</div>
                            {i < steps.length - 1 && (
                                <div className="flex-1 flex items-center gap-1 px-2">
                                    <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-300 via-blue-300 to-emerald-300 rounded-full" />
                                    <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Steps Grid */}
                <div ref={ref} className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-14'>
                    {steps.map((step, i) => (
                        <StepCard key={i} step={step} index={i} isVisible={visible} />
                    ))}
                </div>

                {/* Total time banner */}
                <div
                    className="flex items-center justify-center gap-3 mb-10 text-sm text-slate-500"
                    style={{
                        opacity: visible ? 1 : 0,
                        transition: 'opacity 0.7s ease 0.7s'
                    }}
                >
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-700">Total time:</span>
                        <span className="font-black text-blue-600">Under 5 minutes</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-slate-700">Trusted by</span>
                        <span className="font-black text-slate-900">50,000+ job seekers</span>
                    </div>
                </div>

                {/* CTA */}
                <div
                    className='flex flex-col items-center gap-4 mb-12'
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s'
                    }}
                >
                    <button
                        className='group relative px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-full transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-blue-300 flex items-center gap-3 overflow-hidden'
                        onClick={() => navigate("/app/build-resume/resume-templates")}
                    >
                        <span className="relative z-10">Start Building My Resume</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <p className="text-slate-400 text-sm">No credit card required · Free to start</p>
                </div>

            </div>
        </div>
    );
}

export default BuildResume;