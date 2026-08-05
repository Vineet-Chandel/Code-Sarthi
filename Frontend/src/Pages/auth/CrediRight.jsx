import React, { useState } from "react";

const socialLinks = [
    {
        title: "GitHub",
        icon: (
            <svg className='w-6 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#000" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
            </svg>
        ),
        link: "https://github.com/Vineet-Chandel/Code-Sarthi"
    },
    {
        title: "Instagram",
        icon: (
            <svg className='w-5 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#000" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
            </svg>
        ),
        link: "https://www.instagram.com/codesarthi/"
    },
    {
        title: "X",
        icon: (
            <svg className='w-5 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill="#000" d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"></path>
            </svg>
        ),
        link: "https://x.com/codesarthi"
    },
    {
        title: "Youtube",
        icon: (
            <svg className='w-5 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#000" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"></path>
            </svg>
        ),
        link: "https://www.youtube.com/@CodeSarthi-Social"
    },
];
const features = [
    {
        id: "collab",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1" />
                <path d="M15 3H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h4a2 2 0 002-2V5a2 2 0 00-2-2z" />
            </svg>
        ),
        title: "Real-time Collaboration Layer",
        sub: "Messaging, meetings, and code — all in one space",
        badges: ["Live chat", "Voice & video", "Rich media"],
        points: [
            { strong: "Unified messaging", text: " — team channels, DMs, and threaded discussions without switching apps." },
            { strong: "Voice & video calls", text: " — built-in meeting rooms, no third-party conferencing needed." },
            { strong: "Rich media sharing", text: " — share code snippets, screenshots, and files with context-aware previews." },
        ],
    },
    {
        id: "resume",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        title: "AI-Powered Resume Engine",
        sub: "ATS-friendly resumes tailored to every role",
        badges: ["AI analysis", "ATS-optimised", "Multi-template"],
        points: [
            { strong: "Smart onboarding", text: " — captures skills, education, projects, and achievements during signup." },
            { strong: "Role-adaptive tailoring", text: " — AI rewrites and highlights experiences based on the job description." },
            { strong: "ATS compatibility", text: " — structured output passes automated screening filters at top companies." },
            { strong: "Portfolio generation", text: " — builds a shareable developer portfolio alongside the resume." },
        ],
    },
    {
        id: "projects",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        title: "Smart Project Scheduler",
        sub: "AI insights that replace the need for a dedicated PM",
        badges: ["Dashboards", "Workspaces", "Bottleneck alerts"],
        points: [
            { strong: "Team workspaces", text: " — create projects, form teams, and collaborate in shared environments." },
            { strong: "Personal task boards", text: " — every developer gets a private space to manage their goals and backlog." },
            { strong: "Leader dashboard", text: " — track contributions, visualise productivity, and spot blockers instantly." },
            { strong: "AI bottleneck detection", text: " — proactively surfaces blocked tasks before they delay your sprint." },
        ],
    },


];

const CrediRight = () => {
    const [openId, setOpenId] = useState(null);
    const toggle = (id) => setOpenId(openId === id ? null : id);

    return (
        <div>

            <div className="w-full h-full bg-white text-accent rounded-2xl p-2 lg:p-4  relative overflow-hidden group">

                <div className="relative z-10 flex flex-col justify-between h-full">

                    <div className="flex flex-col justify-between items-center h-fit gap-3">
                        <div className="relative overflow-hidden w-full  rounded-3xl bg-black p-4 flex flex-col sm:flex-col gap-4">

                            {/* Background */}

                            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]" />

                            {/* Illustration */}
                            <div className="relative z-10 w-full sm:w-full flex rounded-3xl bg-white/10 flex items-center justify-center p-6">





                                <img className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 text-white" src="https://res.cloudinary.com/dggoaxqxl/image/upload/v1779801993/Untitled_design_3_-Photoroom_hkidic.webp" alt="" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full sm:w-full flex-1">

                                <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins mb-4">
                                    CodeSarthi
                                </h2>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-3">

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Build. Collaborate. Get Hired.
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            An Ecosystem that enpowers the Developers.
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Where Developers Build & Collabrate.
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Build by the Developer for the Developers.
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="space-y-3 w-full">
                            {features.map((feature) => {
                                const isOpen = openId === feature.id;
                                return (
                                    <div
                                        key={feature.id}
                                        className="bg-base-100 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
                                    >
                                        <div
                                            className="flex items-center gap-3 p-4 cursor-pointer"
                                            onClick={() => toggle(feature.id)}
                                        >
                                            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center text-base-100 flex-shrink-0">
                                                {feature.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-secondary-content text-sm md:text-base">{feature.title}</h3>
                                                <p className="text-info text-xs md:text-sm truncate">{feature.sub}</p>
                                            </div>
                                            <svg
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round" width={16} height={16}
                                                className={`flex-shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </div>

                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <div className="px-4 pb-4 border-t border-white/10 pt-3 space-y-3">
                                                <ul className="space-y-2">
                                                    {feature.points.map((point, i) => (
                                                        <li key={i} className="flex items-center gap-4 text-sm">
                                                            <svg className="rotate-45" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                                                <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill='#ffffff' />
                                                            </svg>
                                                            <span className="text-info leading-relaxed">
                                                                <span className="font-semibold text-white">{point.strong}</span>
                                                                {point.text}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    {feature.badges.map((badge) => (
                                                        <span key={badge} className="text-xs px-3 py-1 rounded-full bg-base-300 text-secondary-content border border-secondary">
                                                            {badge}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>



                    <div className='w-full h-[10%]  mt-5 flex flex-row gap-2 justify-between px-2 lg:px-5 items-center'>
                        <div className='flex items-center justify-center font-roboto text-sm font-semibold'>
                            © 2026 – CodeSarthi
                        </div>
                        <div className='flex items-center justify-center gap-2 sm:gap-5 md:gap-2 lg:gap-0'>
                            {socialLinks.map((item, index) => (
                                <div key={index} className='flex items-center gap-2 sm:gap-5 md:gap-2 lg:gap-0'>
                                    <div className='bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform'>
                                        <a target='_blank' rel='noopener noreferrer' href={item.link} className='text-black text-xl'>
                                            {item.icon}
                                        </a>
                                    </div>
                                    {index < socialLinks.length - 1 && (
                                        <span className='w-[1px] h-4 bg-black/50 mx:2 lg:mx-4'></span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>


            {/* Add CSS for animations */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style></div>
    )
}

export default CrediRight