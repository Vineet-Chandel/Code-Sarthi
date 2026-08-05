import React from 'react'
import { useNavigate } from 'react-router-dom';

const HowCareerProfile = () => {

    const navigate = useNavigate()
    const resumeCompletionChecklist = [
        {
            id: 1,
            title: "Where can recruiters reach you?",
            description: "Add your contact details first.",
            section: "contact",
            action: "Add Contact Details",
            completed: false,
            icon: "contact",
            path: "/app/build-resume/header-content"
        },
        {
            id: 2,
            title: "What's your career elevator pitch?",
            description: "Include it in your professional summary or resume objective.",
            section: "professional-summary",
            action: "Write Professional Summary",
            completed: false,
            icon: "summary",
            path: "/app/build-resume/summary-content"
        },
        {
            id: 3,
            title: "What have you done that makes you a perfect fit for the new role?",
            description: "Showcase the most impressive accomplishments from your work experience.",
            section: "experience",
            action: "Add Work Experience",
            completed: false,
            icon: "experience",
            path: "/app/build-resume/experience-content"
        },
        {
            id: 4,
            title: "What are your relevant skills?",
            description: "Display your top skills in a dedicated section.",
            section: "skills",
            action: "Add Skills",
            completed: false,
            icon: "skills",
            path: "/app/build-resume/skill-content"
        },
        {
            id: 5,
            title: "How did you develop your expertise?",
            description: "Present your education with degrees, certifications, and special training.",
            section: "education",
            action: "Add Education",
            completed: false,
            icon: "education",
            path: "/app/build-resume/education-content"
        }
    ];
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 justify-between max-w-7xl mx-auto py-12 px-4 w-full">
            {/* Left sticky anatomy showcase */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-24 bg-[#0a0a0a] border border-[#212121] rounded-3xl p-5 sm:p-7 shadow-2xl">
                <div className="relative overflow-hidden rounded-2xl border border-[#212121] bg-black">
                    <img
                        className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity duration-300"
                        src="https://res.cloudinary.com/dj0ivep44/image/upload/v1784994346/resume-examples-anatomy-image_n9yxhz.avif"
                        alt="Resume examples anatomy image illustrating proper contact, summary, skills, and experience section placement"
                    />
                </div>
                <div className="mt-6 p-5 rounded-2xl bg-black border border-[#212121] text-zinc-400 text-sm leading-relaxed flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white font-bold text-base">
                        <span className="w-2.5 h-2.5 rounded-full bg-white inline-block"></span>
                        Shastra AI Intelligence
                    </div>
                    <p>
                        Recruiters and hiring managers spend an average of <strong className="text-white font-semibold">6 seconds</strong> scanning a profile. Our system automatically optimizes section hierarchy so your top technical competencies and high-impact achievements appear in the primary scanning pattern.
                    </p>
                </div>
            </div>

            {/* Right checklist column */}
            <div className="w-full lg:w-7/12">
                <div className="w-full mb-10 text-center lg:text-left">
                    <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-4 tracking-tight">
                        How to Customize Your Career Profile
                    </h2>
                    <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                        Your career page is your definitive professional highlight reel. Follow this structured AI checklist to bypass ATS filters and stand out to technical hiring committees.
                    </p>
                </div>

                <div className="space-y-6 sm:pl-4">
                    {resumeCompletionChecklist.map((item) => (
                        <div
                            key={item.id}
                            className="relative rounded-3xl bg-[#0a0a0a] border border-[#212121] hover:border-zinc-700 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl group overflow-visible"
                        >
                            {/* Step badge */}
                            <div className="absolute -top-3.5 -left-3.5 w-11 h-11 rounded-2xl bg-white text-black font-black text-sm flex items-center justify-center shadow-xl border border-black/10 transition-transform duration-300 group-hover:scale-105">
                                0{item.id}
                            </div>

                            <div className="flex flex-col gap-2 pl-2 sm:pl-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                                    {item.description}
                                </p>

                                <div className="mt-4 pt-4 border-t border-[#212121] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
                                    <span>Section &bull; {item.section}</span>
                                    <span onClick={() => navigate(item.path)} className="cursor-pointer text-white bg-white/10 group-hover:bg-white group-hover:text-black px-3 py-1.5 rounded-xl transition-all duration-300 flex items-center gap-1">
                                        {item.action} &rarr;
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowCareerProfile;