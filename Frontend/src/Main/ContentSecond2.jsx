import React, { useState } from 'react';

const faqs1 = [
    {
        question: "What is CodeSarthi?",
        answer: "CodeSarthi is an AI-powered career and collaboration platform that helps you build resumes, prepare for interviews, collaborate with teams, and boost productivity from a single workspace."
    },
    {
        question: "What can I do with CodeSarthi?",
        answer: "Create ATS-friendly resumes, analyze resumes, build your career profile, practice interviews, collaborate with teammates, communicate in real time, and automate everyday workflows using AI."
    },
    {
        question: "What is Shastra AI?",
        answer: "Shastra is your built-in AI assistant that provides career guidance, resume improvements, interview coaching, content generation, and intelligent recommendations tailored to your goals."
    },
    {
        question: "How does the AI Resume Builder work?",
        answer: "Enter your education, experience, skills, and projects, and CodeSarthi instantly generates a professional, ATS-optimized resume customized for your target role."
    }
];

const faqs2 = [
    {
        question: "What does the ATS Resume Analyzer do?",
        answer: "It evaluates your resume for ATS compatibility, highlights missing keywords, identifies formatting issues, and suggests improvements to maximize interview opportunities."
    },
    {
        question: "Can CodeSarthi help me prepare for interviews?",
        answer: "Yes. Practice technical and HR interviews with AI, receive instant feedback, improve your responses, and prepare confidently for real-world hiring processes."
    },
    {
        question: "What is Career Profile Creation?",
        answer: "Create a professional digital profile that showcases your education, projects, certifications, skills, achievements, and work experience in one shareable portfolio."
    },
    {
        question: "Does CodeSarthi support team collaboration?",
        answer: "Yes. Collaborate through real-time chat, voice and video meetings, shared workspaces, file sharing, and AI-powered productivity tools designed for modern teams."
    }
];

const faqs3 = [
    {
        question: "How does CodeSarthi improve team productivity?",
        answer: "AI Dental automates repetitive tasks like planning, documentation, meeting summaries, and task management, allowing teams to spend more time building and less time coordinating."
    },
    {
        question: "Who is CodeSarthi designed for?",
        answer: "CodeSarthi is built for students, job seekers, professionals, freelancers, startups, recruiters, educators, and organizations looking to work smarter with AI."
    },
    {
        question: "Is my data safe on CodeSarthi?",
        answer: "Absolutely. Your resumes, files, conversations, and personal information are protected using modern security standards with privacy as a core priority."
    },
    {
        question: "Can I use CodeSarthi on any device?",
        answer: "Yes. Access CodeSarthi from any modern browser and continue working, collaborating, or preparing for your career anytime, anywhere."
    }
];

const cards = [
    {
        unit: "UNIT-01",
        title: "ASTRA",
        role: "Verification Guardian",
        quote: "Trust is verified in silence",
        img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989004/CS_Verification_Manager_uohza5.webp",
        color: "#00e5ff",
        glow: "rgba(0,229,255,0.22)",
        dimGlow: "rgba(0,229,255,0.07)",
        status: "ACTIVE",
        tag: "VERIFICATION",
    },
    {
        unit: "UNIT-02",
        title: "NOVA",
        role: "Identity Guardian",
        quote: "Your digital identity, reconstructed",
        img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989004/CS_Identity_Manager_amyjyi.webp",
        color: "#ffb830",
        glow: "rgba(255,184,48,0.22)",
        dimGlow: "rgba(255,184,48,0.07)",
        status: "ACTIVE",
        tag: "IDENTITY",
    },
    {
        unit: "UNIT-03",
        title: "ORION",
        role: "Community & AI Guardian",
        quote: "Every developer is a signal",
        img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989003/CS_Community_AI_Manager_z664dg.webp",
        color: "#bf7fff",
        glow: "rgba(191,127,255,0.22)",
        dimGlow: "rgba(191,127,255,0.07)",
        status: "ACTIVE",
        tag: "COMMUNITY",
    },
    {
        unit: "UNIT-04",
        title: "ZENITH",
        role: "Help & Support Guardian",
        quote: "No noise. Only solutions",
        img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989005/CS_Help_Support_onbjoi.webp",
        color: "#00ff87",
        glow: "rgba(0,255,135,0.22)",
        dimGlow: "rgba(0,255,135,0.07)",
        status: "ACTIVE",
        tag: "SUPPORT",
    },
];

const ContentSecond2 = () => {
    // Unique composite open keys (e.g., 'col1-0')
    const [openId, setOpenId] = useState(null);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const renderFaqColumn = (faqArray, columnId) => {
        return faqArray.map((faq, index) => {
            const currentId = `${columnId}-${index}`;
            const isOpen = openId === currentId;

            return (
                <div
                    key={currentId}
                    onClick={() => toggleFaq(currentId)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 h-fit cursor-pointer select-none"
                >
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="text-lg lg:text-xl text-white font-semibold group-hover:text-blue-400 transition-colors duration-200">
                            {faq.question}
                        </h3>
                        <button
                            className="text-white/80 border rounded-xl border-white/10 bg-white/5 p-1.5 h-9 w-9 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-white/30"
                            aria-label="Toggle Answer"
                        >
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* CSS Smooth Transition Container */}
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                        <div className="overflow-hidden">
                            <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="w-full bg-black flex flex-col items-center py-20 px-4 md:px-8 font-poppins">

            {/* FAQ Header */}
            <div className="w-full max-w-[1500px] mb-14 text-center md:text-start">
                <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-4">
                    Frequently asked questions
                </h2>
                <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
                    We are here to help you with any questions you may have. If you don't find what you need, please contact us at{' '}
                    <a href="mailto:codesarthi.help@gmail.com" className="underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors">
                        codesarthi.help@gmail.com
                    </a>
                </p>
            </div>

            {/* FAQs Column Layout */}
            <div className="w-full max-w-[1500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start mb-24">
                <div className="flex flex-col gap-4 w-full">{renderFaqColumn(faqs1, 'col1')}</div>
                <div className="flex flex-col gap-4 w-full">{renderFaqColumn(faqs2, 'col2')}</div>
                <div className="flex flex-col gap-4 w-full">{renderFaqColumn(faqs3, 'col3')}</div>
            </div>

            {/* --- GUARDIANS DISPLAY SECTION --- */}
            <div className="w-full max-w-[1500px] border-t border-white/10 pt-20">
                <div className="text-center md:text-start mb-12">
                    <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
                        Platform Guardians
                    </h2>
                    <p className="text-gray-400 text-base">Meet the CodeSarthi Guardians driving the core integrity of CodeSarthi.</p>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            style={{ '--glow-color': card.glow, '--dim-glow': card.dimGlow }}
                            className="group relative rounded-2xl bg-white/[0.02] border border-white/10 p-5 overflow-hidden flex flex-col justify-between  transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_var(--dim-glow)]"
                        >
                            {/* Decorative Colored Top Glow Accent */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ backgroundColor: card.color }}
                            />

                            <div>
                                <div className="flex justify-between items-center text-xs tracking-widest text-gray-500 font-mono mb-4">
                                    <span>{card.unit}</span>
                                    <span
                                        className="px-2 py-0.5 rounded border text-[10px] font-semibold"
                                        style={{ color: card.color, borderColor: `${card.color}33` }}
                                    >
                                        {card.tag}
                                    </span>
                                </div>

                                <div className="w-full  rounded-xl  mb-4 bg-white/5 relative">
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100  transition-all duration-500 rounded-2xl"
                                    />
                                </div>

                                <h3 className="text-xl font-bold text-white leading-tight">{card.title}</h3>
                                <p className="text-xs font-medium text-gray-400 mt-0.5">{card.role}</p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/5">
                                <p className="text-sm italic text-gray-400 font-light group-hover:text-white transition-colors duration-200">
                                    "{card.quote}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ContentSecond2;