import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// MOCK TEMPLATE COMPONENTS (replace with your actual imports)
// ============================================================
import Temp1 from '../3/Temp1';
import Temp2 from '../3/Temp2';
import Temp3 from '../3/Temp3';
import Temp4 from '../3/Temp4';
import Temp5 from '../3/Temp5';
import Temp6 from '../3/Temp6';
import Temp7 from '../3/Temp7';
import Temp8 from '../3/Temp8';
import Temp9 from '../3/Temp9';
import Temp10 from '../3/Temp10';
import Temp11 from '../3/Temp11';
import { useNavigate } from 'react-router-dom';

// ============================================================
// DATA
// ============================================================
const resumeData1 = {
    fname: "Aman",
    lname: "Gupta",
    phone: "+91 98765 43210",
    github: "https://github.com/amangupta-dev",
    linkedin: "https://linkedin.com/in/aman-gupta",
    portfolio: "https://aman-portfolio.dev",
    email: "aman.dev@gmail.com",
    summaryTitle: "Full Stack Developer & UI Specialist",
    summaryBody:
        "passionate about crafting high-performance web applications using the MERN stack. Expert in translating complex business requirements into elegant, scalable code with a focus on user-centric design and efficient backend architecture.",
    degree: "Bachelor of Technology",
    major: "Computer Science and Engineering",
    institution: "Pranveer Singh Institute of Technology",
    location: "Kanpur",
    gradDate: "2027",
    skills: {
        frontend: "React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion",
        backend: "Node.js, Express.js, GraphQL, Socket.io",
        authentication: "NextAuth.js, Firebase Auth, OAuth 2.0",
        database: "PostgreSQL, MongoDB, Redis, Prisma ORM",
        tools: "Docker, Git, Vercel, Postman, Figma",
        deployment: "AWS S3, Netlify, Render, Vercel",
    },
    projects: [
        {
            name: "RollZone!",
            stack: "React | Tailwind CSS",
            github: "https://github.com/amangupta-dev/rollzone",
            live: "https://rollzone-game.vercel.app",
            description:
                "is an interactive, high-stakes Pig Dice game designed for a professional portfolio.",
            bullets: [
                "Engineered a <b>dynamic game engine</b> using React hooks.",
                "Implemented a <b>mobile-first responsive design</b> using Tailwind CSS.",
                "Integrated <b>local storage persistence</b> to save player scores.",
                "Optimized performance resulting in a smooth 60fps animation experience.",
            ],
        },
        {
            name: "DevConnect",
            stack: "Next.js | PostgreSQL",
            github: "https://github.com/amangupta-dev/devconnect",
            live: "https://devconnect-platform.app",
            description: "is a specialized networking portal for software engineers.",
            bullets: [
                "Architected a <b>relational database schema</b> using Prisma ORM.",
                "Developed a <b>server-side rendered (SSR)</b> feed for SEO.",
                "Built an <b>automated markdown parser</b> with syntax highlighting.",
                "Deployed using <b>Docker containers</b> on AWS.",
            ],
        },
    ],
    experience: [
        {
            role: "Frontend Developer Intern",
            company: "XYZ Tech",
            location: "Remote",
            duration: "May 2025 - July 2025",
            points: ["Built responsive UI using React", "Improved performance by 30%"],
        },
    ],
    education: [
        {
            degree: "Bachelor of Technology",
            field: "Computer Science and Engineering",
            institution: "Pranveer Singh Institute of Technology",
            location: "Kanpur, India",
            startDate: "2023",
            endDate: "2027",
            cgpa: "8.7/10",
            coursework: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks"],
            achievements: ["Top 10% of the batch", "Active member of coding club"],
        },
        {
            degree: "Class XII (Senior Secondary)",
            field: "PCM",
            institution: "ABC Senior Secondary School",
            location: "Lucknow, India",
            startDate: "2021",
            endDate: "2023",
            percentage: "92%",
            achievements: ["School topper in Mathematics"],
        },
    ],
    certifications: ["AWS Certified Cloud Practitioner", "Meta Frontend Developer Certification"],
    achievements: ["Ranked Top 5% in LeetCode contests", "Winner of Hackathon XYZ", "Solved 500+ DSA problems"],
    languages: ["English (Fluent)", "Hindi (Native)"],
};

// ============================================================
// UTILITY HOOKS
// ============================================================
function useIntersectionObserver(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
        }, { threshold: 0.08, ...options });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return [ref, isVisible];
}

// ============================================================
// FILTER TAGS
// ============================================================
const FILTER_TAGS = ["All", "Minimal", "Creative", "Modern", "Classic", "Bold"];

const templateMeta = [
    { id: 1, Component: Temp1, name: "Modern Professional", tag: "Modern", color: "#3B82F6" },
    { id: 2, Component: Temp2, name: "Creative Minimal", tag: "Minimal", color: "#10B981" },
    { id: 3, Component: Temp3, name: "Technical Executive", tag: "Bold", color: "#8B5CF6" },
    { id: 4, Component: Temp4, name: "Focused Layout", tag: "Minimal", color: "#F59E0B" },
    { id: 5, Component: Temp5, name: "Clean Slate", tag: "Classic", color: "#EF4444" },
    { id: 6, Component: Temp6, name: "Clean Modern", tag: "Modern", color: "#06B6D4" },
    { id: 7, Component: Temp7, name: "Creative Contrast", tag: "Creative", color: "#EC4899" },
    { id: 8, Component: Temp8, name: "Cool Overlay", tag: "Bold", color: "#F97316" },
    { id: 9, Component: Temp9, name: "Modern Functional", tag: "Modern", color: "#14B8A6" },
    { id: 10, Component: Temp10, name: "Classic Module", tag: "Classic", color: "#6366F1" },
    { id: 11, Component: Temp11, name: "Simple Linear", tag: "Minimal", color: "#84CC16" },
];

// ============================================================
// ANIMATED CARD
// ============================================================
function TemplateCard({ item, index, onSelect, isFavorite, onToggleFavorite }) {
    const [cardRef, isVisible] = useIntersectionObserver();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            ref={cardRef}
            className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
                transition: `opacity 0.55s cubic-bezier(.4,0,.2,1) ${index * 55}ms, transform 0.55s cubic-bezier(.4,0,.2,1) ${index * 55}ms`,

                border: `1.5px solid ${hovered ? item.color : "#e2e8f0"}`,
                background: "#fff",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Badge */}
            <div
                className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
                style={{ background: item.color, letterSpacing: "0.12em" }}
            >
                {item.tag}
            </div>

            {/* Favorite Button */}
            <button
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center  hover:scale-110 transition-transform"
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
                title="Favourite"
            >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill={isFavorite ? "#EF4444" : "none"} stroke={isFavorite ? "#EF4444" : "#94a3b8"} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </button>

            {/* Preview Area */}
            <div className="relative w-full overflow-hidden bg-slate-50" style={{ aspectRatio: "1/1.41" }}>
                <div
                    className="absolute top-0 left-0 w-[900px] origin-top-left pointer-events-none select-none"
                    style={{
                        transform: hovered ? "scale(0.46)" : "scale(0.41)",
                        transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
                    }}
                >
                    <item.Component data={resumeData1} />
                </div>

                {/* Hover CTA overlay */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                    style={{
                        background: `linear-gradient(160deg, ${item.color}22 0%, ${item.color}55 100%)`,

                        opacity: hovered ? 1 : 0,
                        transition: "opacity 0.3s ease",
                    }}
                >
                    <button
                        className="px-7 py-2.5 rounded-xl font-bold text-white  text-sm"
                        style={{
                            background: item.color,
                            transform: hovered ? "translateY(0)" : "translateY(12px)",
                            transition: "transform 0.35s cubic-bezier(.4,0,.2,1) 0.05s",

                        }}
                        onClick={() => { onSelect(item) }}
                    >
                        Use This Template
                    </button>

                </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-white flex justify-between items-center gap-2">
                <div>
                    <h3 className="font-bold text-slate-800 text-sm truncate">{item.name}</h3>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Template #{item.id}</p>
                </div>
                <span className="shrink-0 text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded-lg uppercase font-black tracking-wider">
                    ATS
                </span>
            </div>

            {/* Bottom accent bar */}
            <div
                className="h-0.5 w-full"
                style={{
                    background: `linear-gradient(90deg, ${item.color}, transparent)`,
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.3s",
                }}
            />
        </div>
    );
}

// ============================================================
// PREVIEW MODAL
// ============================================================
function PreviewModal({ item, onClose, onNext, onPrev }) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, onNext, onPrev]);

    if (!item) return null;
    const Navigate = useNavigate();
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(2,6,23,0.85)", }}
            onClick={onClose}
        >
            <div
                className="relative flex flex-col items-center"
                style={{ maxWidth: 860, width: "100%" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="w-full flex items-center justify-between mb-4 px-1">
                    <div>
                        <h2 className="text-white font-black text-xl">{item.name}</h2>
                        <p className="text-white/40 text-xs mt-0.5">
                            <span className="text-white/60">Template #{item.id}</span> · {item.tag}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onPrev}
                            className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
                        >
                            ←
                        </button>
                        <button
                            onClick={onNext}
                            className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
                        >
                            →
                        </button>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-400/20 text-red-300 flex items-center justify-center hover:bg-red-500/30 transition text-lg leading-none"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Resume Preview */}
                <div
                    className="w-full rounded-2xl overflow-hidden "
                    style={{
                        border: `2px solid ${item.color}55`,
                        maxHeight: "80vh",
                        overflowY: "auto",
                    }}
                >
                    <item.Component data={resumeData1} />
                </div>

                {/* Footer actions */}
                <div className="flex gap-3 mt-5">
                    <button
                        className="px-8 py-3 rounded-xl font-bold text-white text-sm "
                        style={{ background: item.color }}
                        onClick={() => Navigate("/app/build-resume/header-content")}
                    >

                        Use This Template →
                    </button>

                    <button
                        className="px-6 py-3 rounded-xl font-semibold text-white/70 text-sm bg-white/10 border border-white/10 hover:bg-white/15 transition"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                <p className="text-white/25 text-xs mt-3">Press ← → to navigate · Esc to close</p>
            </div>
        </div>
    );
}

// ============================================================
// FLOATING STATS BAR
// ============================================================
function StatsBar({ total, filtered, favorites }) {
    return (
        <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                <span className="text-slate-500">{filtered} of {total} templates</span>
            </div>
            <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                <span className="text-slate-500">{favorites} saved</span>
            </div>
        </div>
    );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
const Templates = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [previewItem, setPreviewItem] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // "grid" | "wide"
    const headerRef = useRef(null);
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setHeaderVisible(true), 80);
    }, []);

    const filtered = templateMeta.filter((t) => {
        const matchFilter = activeFilter === "All" || t.tag === activeFilter;
        const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchFav = !showFavoritesOnly || favorites.has(t.id);
        return matchFilter && matchSearch && matchFav;
    });

    const toggleFavorite = (id) => {
        setFavorites((prev) => {
            const n = new Set(prev);
            n.has(id) ? n.delete(id) : n.add(id);
            return n;
        });
    };

    const previewIndex = previewItem ? filtered.findIndex((t) => t.id === previewItem.id) : -1;
    const goNext = () => filtered[(previewIndex + 1) % filtered.length] && setPreviewItem(filtered[(previewIndex + 1) % filtered.length]);
    const goPrev = () => filtered[(previewIndex - 1 + filtered.length) % filtered.length] && setPreviewItem(filtered[(previewIndex - 1 + filtered.length) % filtered.length]);

    return (
        <div className="w-full min-h-screen bg-base-200" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

            {/* ── TOP HERO HEADER ── */}
            <div
                className="w-full pt-16 pb-12 px-6 text-center"
                style={{

                    position: "relative",
                    overflow: "hidden",
                }}
            >


                <div
                    ref={headerRef}
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? "translateY(0)" : "translateY(24px)",
                        transition: "all 0.7s cubic-bezier(.4,0,.2,1)",
                    }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                        style={{ background: "rgba(99,102,241,0.18)", color: "#6780fdff", border: "1px solid rgba(99,102,241,0.3)" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6780fdff] animate-pulse inline-block" />
                        {templateMeta.length}+ Premium Templates · ATS-Friendly
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black mb-5 leading-[1.05]">
                        Your Resume,{" "}
                        <span style={{
                            background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            Elevated.
                        </span>
                    </h1>

                    <p className="text-lg text-black/50 max-w-xl mx-auto leading-relaxed">
                        Pick a template. Stand out. Land the role. Crafted with attention to every pixel.
                    </p>

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-10 ">
                        {[["11", "Templates"], ["100%", "ATS-Ready"], ["∞", "Customizable"]].map(([val, label]) => (
                            <div key={label} className="text-center">
                                <div className="text-3xl font-black text-black">{val}</div>
                                <div className="text-xs text-black/40 font-medium mt-0.5">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── STICKY CONTROLS BAR ── */}
            <div
                className="sticky top-5 z-30 w-[90%] mx-auto px-6 py-3 flex flex-wrap items-center gap-3 bg-base-100 rounded-xl shadow-2xl shadow-gray-900"

            >
                {/* Search */}
                <div className="relative flex-1 min-w-[180px] max-w-xs">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2  rounded-xl text-sm border border-slate-200 bg-base-200 text-slate-700 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                    />
                </div>

                {/* Filter Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {FILTER_TAGS.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                            style={{
                                background: activeFilter === tag ? "#fec063ff" : "#fbeedcff",
                                color: activeFilter === tag ? "#000000" : "#64748b",

                                transform: activeFilter === tag ? "scale(1.04)" : "scale(1)",
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Favorites toggle */}
                <button
                    onClick={() => setShowFavoritesOnly((v) => !v)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border"
                    style={{
                        background: showFavoritesOnly ? "#fef2f2" : "#f8fafc",
                        color: showFavoritesOnly ? "#ef4444" : "#94a3b8",
                        borderColor: showFavoritesOnly ? "#fca5a5" : "#e2e8f0",
                    }}
                >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={showFavoritesOnly ? "#ef4444" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    Saved {favorites.size > 0 && `(${favorites.size})`}
                </button>

                {/* Grid toggle */}
                <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
                    {[{ mode: "grid", icon: "▦" }, { mode: "wide", icon: "▤" }].map(({ mode, icon }) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className="w-7 h-7 rounded-lg text-sm flex items-center justify-center transition"
                            style={{
                                background: viewMode === mode ? "#fff" : "transparent",
                                color: viewMode === mode ? "#3b82f6" : "#94a3b8",

                            }}
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── MAIN GRID ── */}
            <div className="w-full px-6 py-10 max-w-screen-2xl mx-auto">

                {/* Results info */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <StatsBar total={templateMeta.length} filtered={filtered.length} favorites={favorites.size} />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="text-xs text-blue-500 hover:text-blue-700 font-semibold flex items-center gap-1"
                        >
                            ✕ Clear search
                        </button>
                    )}
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="text-center py-24 text-slate-400">
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="font-bold text-lg text-slate-600">No templates found</p>
                        <p className="text-sm mt-1">Try a different filter or search term</p>
                        <button
                            onClick={() => { setActiveFilter("All"); setSearchQuery(""); setShowFavoritesOnly(false); }}
                            className="mt-6 px-6 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Cards */}
                <div
                    className={`grid gap-6 ${viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                        }`}
                >
                    {filtered.map((item, index) => (
                        <TemplateCard
                            key={item.id}
                            item={item}
                            index={index}
                            onSelect={setPreviewItem}
                            isFavorite={favorites.has(item.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div
                    className="mt-20 w-full rounded-3xl p-10 text-center"
                    style={{
                        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
                    }}
                >
                    <h2 className="text-3xl font-black text-white mb-2">Can't decide?</h2>
                    <p className="text-white/50 mb-6 max-w-sm mx-auto text-sm">Fill your details once and instantly preview all templates live.</p>
                    <button className="px-8 py-3.5 rounded-xl font-bold text-white"
                        style={{
                            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)"
                        }}>
                        Preview All with My Data →
                    </button>
                </div>
            </div>

            {/* ── PREVIEW MODAL ── */}
            {
                previewItem && (
                    <PreviewModal
                        item={previewItem}
                        onClose={() => setPreviewItem(null)}
                        onNext={goNext}
                        onPrev={goPrev}
                    />
                )
            }
        </div >
    );
};

export default Templates;