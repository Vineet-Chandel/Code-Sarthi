import React, { useState, useRef, useEffect, useCallback } from "react";
import Temp1 from "../3/Temp1";
import { useNavigate } from "react-router-dom";
import IntroEXP from "./IntroEXP";
// ─── tiny hook ────────────────────────────────────────────────────────────────
function useIntersectionObserver(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08, ...options }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return [ref, isVisible];
}

// ─── reusable field ───────────────────────────────────────────────────────────
const InputField = ({ label, id, value, type = "text", placeholder, onChange }) => (
    <div className="flex flex-col gap-1 w-full group">
        <label
            htmlFor={id}
            className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 group-focus-within:text-violet-600 transition-colors ml-0.5"
        >
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(id, e.target.value)}
            className="w-full bg-base-200 border border-slate-900 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none
                 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:bg-white
                 transition-all duration-200 font-medium placeholder:text-slate-400"
        />
    </div>
);

// ─── social link row ──────────────────────────────────────────────────────────
const SocialField = ({ icon, id, value, placeholder, onChange }) => (
    <div className="flex items-center gap-3 bg-base-200 border border-slate-900 rounded-xl px-3.5 py-2.5
                  focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10
                  focus-within:bg-white transition-all duration-200">
        <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
            {icon}
        </div>
        <input
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(id, e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-slate-700
                 placeholder:text-slate-300"
        />
    </div>
);

// ─── check item ───────────────────────────────────────────────────────────────
const CheckItem = ({ done, label }) => (
    <div className={`flex items-center gap-2 text-[11px] transition-colors duration-300 ${done ? "text-emerald-600" : "text-slate-400"}`}>
        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300
                     ${done ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
            {done && (
                <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )}
        </div>
        {label}
    </div>
);

// ─── tip item ─────────────────────────────────────────────────────────────────
const TipItem = ({ emoji, title, body }) => (
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-none">
        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0 text-sm">
            {emoji}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
            <span className="text-slate-800 font-semibold">{title}: </span>
            {body}
        </p>
    </div>
);

// ─── main component ───────────────────────────────────────────────────────────
const StartHeader = () => {
    const [form, setForm] = useState({
        fname: "Aman",
        lname: "Gupta",
        summaryTitle: "Full Stack Developer & UI Specialist",
        email: "aman.dev@gmail.com",
        phone: "+91 98765 43210",
        location: "Kanpur, India",
        pincode: "208001",
        linkedin: "linkedin.com/in/aman-gupta",
        github: "github.com/amangupta-dev",
        portfolio: "aman-portfolio.dev",

    });

    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [hoveringImg, setHoveringImg] = useState(false);
    const [hoveringCard, setHoveringCard] = useState(false);
    const [cardRef, isCardVisible] = useIntersectionObserver();

    const handleChange = useCallback((id, val) => {
        setForm((prev) => ({ ...prev, [id]: val }));
    }, []);

    // completeness score
    const checks = [
        { key: "name", done: !!(form.fname && form.lname), label: "Full name added" },
        { key: "email", done: !!form.email, label: "Email address added" },
        { key: "phone", done: !!form.phone, label: "Phone number added" },
        { key: "location", done: !!form.location, label: "Location added" },
        { key: "linkedin", done: !!form.linkedin, label: "LinkedIn linked" },
        { key: "github", done: !!form.github, label: "GitHub linked" },
    ];
    const score = Math.round((checks.filter((c) => c.done).length / checks.length) * 100);

    const resumeData = {
        //header
        fname: form.fname,
        lname: form.lname,
        phone: form.phone,
        github: `https://${form.github}`,
        linkedin: `https://${form.linkedin}`,
        portfolio: form.portfolio,
        email: form.email,
        summaryTitle: form.summaryTitle,
        location: form.location,
        pincode: form.pincode,

        summaryBody: "",
        degree: "",
        major: "",
        institution: "",

        gradDate: "",
        skills: [],
        projects: [],
        experience: [],
        education: [],
        certifications: [],
        achievements: [],
        languages: [],
    };
    const Navigate = useNavigate();
    const [isVisible] = useIntersectionObserver();
    const [hovered, setHovered] = useState(false);


    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex items-start justify-center p-4 md:p-6 bg-base-100">
            <div className="w-full bg-base-100 rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden border border-slate-600" >

                {/* ── top bar ── */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-base-200 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-violet-100 text-violet-700">
                        Step 1 of 6
                    </span>

                    {/* progress dots */}
                    <div className="flex items-center gap-1.5">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-300 ${i === 0
                                    ? "w-2 h-2 bg-emerald-500"
                                    : i === 1
                                        ? "w-5 h-2 bg-violet-600"
                                        : "w-2 h-2 bg-slate-200"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setSidebarOpen((p) => !p)}
                        className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200
                        ${sidebarOpen
                                ? "bg-violet-600 text-white border-violet-600"
                                : "bg-white text-slate-500 border-slate-200 hover:border-violet-400 hover:text-violet-600"
                            }`}
                    >
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M10 1v14" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        {sidebarOpen ? "Hide" : "Preview"}
                    </button>
                </div>

                {/* ── body ── */}
                <div className={`grid transition-all duration-500 ${sidebarOpen ? "lg:grid-cols-[1fr_500px]" : "grid-cols-1"}`}>

                    {/* ── LEFT: form ── */}
                    <div className="p-6 md:p-10 border-r border-slate-100">
                        <div className="mb-7">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2 leading-tight">
                                Let's start with your{" "}
                                <span className="text-violet-600">header</span>.
                            </h1>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                                The first thing recruiters see. Keep your contact details sharp and up-to-date.
                            </p>
                        </div>

                        {/* avatar + name row */}
                        <div className="flex items-start gap-5 mb-6">
                            {/* avatar */}
                            <div
                                className="relative flex-shrink-0 cursor-pointer"
                                onMouseEnter={() => setHoveringImg(true)}
                                onMouseLeave={() => setHoveringImg(false)}
                            >
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-dashed border-slate-300
                                hover:border-violet-400 overflow-hidden relative transition-colors duration-200">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aman"
                                        className="w-full h-full object-cover"
                                        alt="Profile"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center
                                text-white transition-opacity duration-200 ${hoveringImg ? "opacity-100" : "opacity-0"}`}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        <span className="text-[9px] font-bold uppercase mt-1 tracking-wider">change</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-violet-600 rounded-lg border-2 border-white
                                flex items-center justify-center shadow-sm">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </div>
                            </div>

                            {/* name fields inline */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <InputField className="text-black" label="First Name" id="fname" value={form.fname} placeholder="Aman" onChange={handleChange} />
                                <InputField className="text-black" label="Last Name" id="lname" value={form.lname} placeholder="Gupta" onChange={handleChange} />
                            </div>
                        </div>

                        {/* contact fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <InputField className="text-black" label="Email Address" id="email" type="email" value={form.email} placeholder="you@example.com" onChange={handleChange} />
                            <InputField className="text-black" label="Phone Number" id="phone" value={form.phone} placeholder="+91 ..." onChange={handleChange} />
                        </div>

                        <div className="mb-4">
                            <InputField className="text-black" label="Summary Title" id="summaryTitle" value={form.summaryTitle} placeholder="Software Engineer" onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                            <InputField className="text-black" label="City & Country" id="location" value={form.location} placeholder="Kanpur, India" onChange={handleChange} />
                            <InputField className="text-black" label="Pincode" id="pincode" value={form.pincode} placeholder="208001" onChange={handleChange} />
                        </div>

                        {/* social links */}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                            Online presence
                        </p>
                        <div className="flex flex-col gap-2.5">
                            <SocialField
                                id="linkedin"
                                value={form.linkedin}
                                placeholder="linkedin.com/in/yourname"
                                onChange={handleChange}
                                icon={
                                    <div className="w-6 h-6 rounded-md bg-[#0A66C2] flex items-center justify-center">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                            <circle cx="4" cy="4" r="2" />
                                        </svg>
                                    </div>
                                }
                            />
                            <SocialField
                                id="github"
                                value={form.github}
                                placeholder="github.com/yourname"
                                onChange={handleChange}
                                icon={
                                    <div className="w-6 h-6 rounded-md bg-[#24292E] flex items-center justify-center">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </div>
                                }
                            />
                            <SocialField
                                id="portfolio"
                                value={form.portfolio}
                                placeholder="yourportfolio.dev"
                                onChange={handleChange}
                                icon={
                                    <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                                        </svg>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    {/* ── RIGHT: sidebar ── */}
                    {sidebarOpen && (
                        <div className="flex flex-col bg-base-200 border-t lg:border-t-0 border-slate-900">
                            {/* tabs */}
                            <div className="flex border-b border-slate-900">
                                {["preview", "tips", "score"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3.5 text-xs font-semibold capitalize transition-all duration-200 border-b-2
                                ${activeTab === tab
                                                ? "text-violet-600 border-violet-600 bg-white"
                                                : "text-slate-400 border-transparent hover:text-slate-600"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* ── PREVIEW tab ── */}
                            {activeTab === "preview" && (

                                <div>
                                    <div
                                        ref={cardRef}
                                        className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                                        style={{
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
                                            background: "#fff",
                                        }}

                                    >
                                        {/* Badge */}
                                        <div
                                            className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
                                            style={{ background: "#000000", letterSpacing: "0.12em" }}
                                        >
                                            {/* {item.tag} */} tag of the temp
                                        </div>



                                        {/* Preview Area */}
                                        <div className="relative w-full overflow-hidden bg-slate-50" style={{ aspectRatio: "1/1.41" }}>
                                            <div
                                                className="absolute top-0 left-0 w-[900px] origin-top-left pointer-events-none select-none scale-[1.05] lg:scale-[0.56]"
                                                style={{

                                                    transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
                                                }}
                                            >
                                                <Temp1 data={resumeData} />
                                            </div>

                                            {/* Hover CTA overlay */}
                                            <div
                                                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                                                style={{
                                                    background: `linear-gradient(160deg, ${"#000000"}22 0%, ${"#000000"}55 100%)`,

                                                    opacity: hovered ? 1 : 0,
                                                    transition: "opacity 0.3s ease",
                                                }}
                                            >


                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="px-4 py-3 bg-white flex justify-between items-center gap-2">
                                            <div>
                                                {/* <h3 className="font-bold text-slate-800 text-sm truncate">{item.name}</h3>
                                                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Template #{item.id}</p> */}
                                            </div>
                                            <span className="shrink-0 text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded-lg uppercase font-black tracking-wider">
                                                ATS
                                            </span>
                                        </div>

                                        {/* Bottom accent bar */}
                                        <div
                                            className="h-0.5 w-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${"#000000"}, transparent)`,
                                                opacity: hovered ? 1 : 0,
                                                transition: "opacity 0.3s",
                                            }}
                                        />
                                    </div>




                                </div>
                            )}

                            {/* ── TIPS tab ── */}
                            {activeTab === "tips" && (
                                <div className="p-4 overflow-y-auto">
                                    <TipItem emoji="✉️" title="Professional email" body="Use name.work@gmail.com — avoid nicknames or random numbers." />
                                    <TipItem emoji="☎️" title="Country code" body="Always include +91 (or your code) for international recruiters." />
                                    <TipItem emoji="🏙️" title="City only" body="List city and country — a full street address wastes prime resume space." />
                                    <TipItem emoji="🔗" title="LinkedIn URL" body="Customise your URL (linkedin.com/in/yourname) for a cleaner link." />
                                    <TipItem emoji="📸" title="Photo" body="In India, a professional headshot is generally expected by recruiters." />
                                    <TipItem emoji="💼" title="Portfolio" body="Link your portfolio or GitHub — it adds credibility for tech roles." />
                                </div>
                            )}

                            {/* ── SCORE tab ── */}
                            {activeTab === "score" && (
                                <div className="p-4 overflow-y-auto">
                                    <div className="bg-white rounded-2xl border border-slate-100 p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs font-semibold text-slate-500">Header completeness</p>
                                            <p
                                                className="text-sm font-black"
                                                style={{ color: score >= 80 ? "#10B981" : score >= 50 ? "#F59E0B" : "#EF4444" }}
                                            >
                                                {score}%
                                            </p>
                                        </div>
                                        {/* bar */}
                                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mb-4">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${score}%`,
                                                    background: score >= 80
                                                        ? "linear-gradient(90deg,#7C3AED,#10B981)"
                                                        : score >= 50
                                                            ? "linear-gradient(90deg,#7C3AED,#F59E0B)"
                                                            : "#EF4444",
                                                }}
                                            />
                                        </div>
                                        {/* checklist */}
                                        <div className="flex flex-col gap-2.5">
                                            {checks.map((c) => (
                                                <CheckItem key={c.key} done={c.done} label={c.label} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── footer ── */}
                <div className="flex items-center justify-between px-6 md:px-10 py-4 bg-base-200 border-t border-slate-100">
                    <button className="text-sm font-medium text-slate-400 hover:text-slate-700 px-4 py-2.5 rounded-xl
                             border border-slate-200 hover:border-slate-300 bg-white transition-all duration-200">
                        Save draft
                    </button>
                    <button
                        onClick={() => {
                            Navigate("/app/build-resume/intro-exp-page", {
                                state: { resumeData }
                            });
                        }}
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl bg-violet-600 text-white
                       hover:bg-violet-700 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-200"
                    >
                        Next: Summary
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default StartHeader;