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
    location: "Kanpur,India",
    pincode: "208024",
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
            description: "is an interactive, high-stakes Pig Dice game designed for a professional portfolio.",
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
            role: "Frontend Developer",
            company: "XYZ Tech",
            location: "Remote",
            startDate: "2025",
            endDate: "2027",
            currentlyWorking: false,
            employmentType: "Internship",
            bullets: ["Built responsive UI using React", "Improved performance by 30%"],
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
            bullets: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks"],
        },
        {
            degree: "Class XII (Senior Secondary)",
            field: "PCM",
            institution: "ABC Senior Secondary School",
            location: "Lucknow, India",
            startDate: "2021",
            endDate: "2023",
            percentage: "92%",
        },
    ],


    certifications: [{ about: "AWS Certified Cloud Practitioner", link: "" }, { about: "Meta Frontend Developer Certification", link: "" }],
    achievements: ["Ranked Top 5% in LeetCode contests", "Winner of Hackathon XYZ", "Solved 500+ DSA problems"],
    languages: [{ langCategory: "English ", status: "Fluent" }, { langCategory: "Hindi ", status: "Native" },],
    Social_Links: ["www.insta.com", "www.protfolio.com"]
};

// ============================================================
// THEME TOKENS (caramellatte)
// ============================================================
const T = {
    base100: "oklab(97.962% 0.00443 0.01503)",   // near-white warm
    base200: "oklch(95% 0.038 75.164)",            // cream
    base300: "oklch(90% 0.076 70.697)",            // warm sand
    content: "oklch(40% 0.123 38.172)",            // dark caramel text
    accent: "oklab(46.44% 0.08796 0.06831)",       // caramel brown
    accentContent: "oklch(90% 0.076 70.697)",
    neutral: "oklch(55% 0.195 38.402)",
    neutralContent: "oklch(98% 0.016 73.684)",
    secondary: "oklab(22.574% 0.05917 0.04547)",   // deep espresso
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
    { id: 1, Component: Temp1, name: "Modern Professional", tag: "Modern", color: "#9B6A3A" },
    { id: 2, Component: Temp2, name: "Creative Minimal", tag: "Minimal", color: "#C4874B" },
    { id: 3, Component: Temp3, name: "Technical Executive", tag: "Bold", color: "#6B3E26" },
    { id: 4, Component: Temp4, name: "Focused Layout", tag: "Minimal", color: "#B8924A" },
    { id: 5, Component: Temp5, name: "Clean Slate", tag: "Classic", color: "#A05C2C" },
    { id: 6, Component: Temp6, name: "Clean Modern", tag: "Modern", color: "#7A8C4E" },
    { id: 7, Component: Temp7, name: "Creative Contrast", tag: "Creative", color: "#8B5E3C" },
    { id: 8, Component: Temp8, name: "Cool Overlay", tag: "Bold", color: "#4A6741" },
    { id: 9, Component: Temp9, name: "Modern Functional", tag: "Modern", color: "#3D6B72" },
    { id: 10, Component: Temp10, name: "Classic Module", tag: "Classic", color: "#7B5C8A" },
    { id: 11, Component: Temp11, name: "Simple Linear", tag: "Minimal", color: "#C49A3C" },
];

// ============================================================
// GRAIN TEXTURE OVERLAY
// ============================================================
const GrainOverlay = () => (
    <svg
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.045 }}
        xmlns="http://www.w3.org/2000/svg"
    >
        <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
);

// ============================================================
// ANIMATED CARD
// ============================================================
function TemplateCard({ item, index, onSelect, isFavorite, onToggleFavorite }) {
    const [cardRef, isVisible] = useIntersectionObserver();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            ref={cardRef}
            className="group relative flex flex-col cursor-pointer"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
                transition: `opacity 0.6s cubic-bezier(.4,0,.2,1) ${index * 60}ms, transform 0.6s cubic-bezier(.4,0,.2,1) ${index * 60}ms`,
                borderRadius: "var(--radius-box, 1rem)",
                overflow: "hidden",
                border: `var(--border, 2px) solid ${hovered ? item.color : "oklch(87% 0.06 70)"}`,
                background: "oklab(97.962% 0.00443 0.01503)",
                boxShadow: hovered
                    ? `0 8px 32px -4px ${item.color}44, 0 2px 8px -2px ${item.color}22`
                    : "0 2px 12px -2px oklch(40% 0.08 60 / 0.10)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Tag badge */}
            <div
                style={{
                    position: "absolute", top: 10, left: 10, zIndex: 10,
                    padding: "3px 10px",
                    borderRadius: "99px",
                    fontSize: 9, fontWeight: 900, letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    background: item.color,
                    color: "#fff",
                    fontFamily: "'DM Mono', monospace",
                }}
            >
                {item.tag}
            </div>

            {/* Favorite */}
            <button
                style={{
                    position: "absolute", top: 10, right: 10, zIndex: 10,
                    width: 32, height: 32, borderRadius: "50%",
                    background: "oklab(97.962% 0.00443 0.01503)",
                    border: "1.5px solid oklch(87% 0.06 70)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "transform 0.2s",
                    transform: isFavorite ? "scale(1.15)" : "scale(1)",
                }}
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
                title="Save"
            >
                <svg viewBox="0 0 24 24" style={{ width: 14, height: 14 }}
                    fill={isFavorite ? item.color : "none"}
                    stroke={isFavorite ? item.color : "oklch(65% 0.08 60)"}
                    strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </button>

            <div style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                clipPath: "inset(0 0 0 0)",          // bulletproof clip
                background: "oklch(95% 0.038 75.164)",
                aspectRatio: "1/1.41",
            }}>
                {/* ✅ No hardcoded width, no transform scale — A4Wrapper handles everything */}
                <div
                    style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                        transformOrigin: "top center",
                        transform: hovered ? "scale(1.06)" : "scale(1)",   // subtle zoom on hover
                        transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
                    }}
                >
                    <item.Component data={resumeData1} />
                </div>

                {/* Hover overlay CTA — unchanged */}
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
                    background: `linear-gradient(160deg, ${item.color}18 0%, ${item.color}50 100%)`,
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}>
                    <button
                        style={{
                            padding: "10px 28px",
                            borderRadius: "var(--radius-field, 0.5rem)",
                            fontWeight: 800, fontSize: 13, color: "#fff",
                            background: item.color,
                            border: "none", cursor: "pointer",
                            transform: hovered ? "translateY(0)" : "translateY(14px)",
                            transition: "transform 0.35s cubic-bezier(.4,0,.2,1) 0.05s",
                            letterSpacing: "0.02em",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onClick={() => onSelect(item)}
                    >
                        Use This Template
                    </button>
                </div>
            </div>

            {/* Card footer */}
            <div style={{
                padding: "12px 16px",
                background: "oklab(97.962% 0.00443 0.01503)",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
            }}>
                <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "oklch(40% 0.123 38.172)", fontFamily: "'DM Sans', sans-serif" }}>
                        {item.name}
                    </div>
                    <div style={{ fontSize: 10, color: "oklch(60% 0.08 60)", marginTop: 2, fontFamily: "'DM Mono', monospace" }}>
                        Template #{item.id}
                    </div>
                </div>
                <span style={{
                    fontSize: 9, fontWeight: 900, letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: "oklch(93% 0.06 75)",
                    color: "oklch(45% 0.12 75)",
                    border: "1.5px solid oklch(82% 0.07 75)",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-field, 0.5rem)",
                    fontFamily: "'DM Mono', monospace",
                }}>
                    ATS
                </span>
            </div>

            {/* Bottom accent bar */}
            <div style={{
                height: 3, width: "100%",
                background: `linear-gradient(90deg, ${item.color}, transparent)`,
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s",
            }} />
        </div>
    );
}

// ============================================================
// PREVIEW MODAL
// ============================================================
function PreviewModal({ item, onClose, onNext, onPrev }) {
    const Navigate = useNavigate();

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

    return (
        <div
            style={{
                position: "fixed", inset: 0, zIndex: 50,
                display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
                background: "oklch(18% 0.06 55 / 0.92)",

            }}
            onClick={onClose}
        >
            <div
                style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 860, width: "100%" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "0 4px" }}>
                    <div>
                        <h2 style={{ color: "oklch(93% 0.04 75)", fontWeight: 900, fontSize: 20, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                            {item.name}
                        </h2>
                        <p style={{ color: "oklch(70% 0.06 70)", fontSize: 11, marginTop: 3, fontFamily: "'DM Mono', monospace" }}>
                            Template #{item.id} · {item.tag}
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        {[["←", onPrev], ["→", onNext]].map(([label, fn]) => (
                            <button key={label} onClick={fn}
                                style={{
                                    width: 36, height: 36, borderRadius: "var(--radius-field, 0.5rem)",
                                    background: "oklch(30% 0.08 60 / 0.6)",
                                    border: "1.5px solid oklch(50% 0.08 60 / 0.4)",
                                    color: "oklch(85% 0.05 70)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer", fontSize: 16,
                                }}>
                                {label}
                            </button>
                        ))}
                        <button onClick={onClose}
                            style={{
                                width: 36, height: 36, borderRadius: "var(--radius-field, 0.5rem)",
                                background: "oklch(30% 0.12 30 / 0.5)",
                                border: "1.5px solid oklch(55% 0.15 30 / 0.4)",
                                color: "oklch(75% 0.12 30)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", fontSize: 20, lineHeight: 1,
                            }}>
                            ×
                        </button>
                    </div>
                </div>

                {/* Resume preview */}
                <div style={{
                    width: "100%",
                    borderRadius: "var(--radius-box, 1rem)",
                    overflow: "auto",
                    maxHeight: "75vh",
                    border: `2px solid ${item.color}66`,
                    boxShadow: `0 24px 64px -12px ${item.color}55`,
                }}>
                    <item.Component data={resumeData1} />
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                    <button
                        style={{
                            padding: "12px 32px",
                            borderRadius: "var(--radius-field, 0.5rem)",
                            fontWeight: 800, fontSize: 13, color: "#fff",
                            background: item.color,
                            border: "none", cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onClick={() => Navigate("/app/build-resume/header-content")}
                    >
                        Use This Template →
                    </button>
                    <button
                        style={{
                            padding: "12px 24px",
                            borderRadius: "var(--radius-field, 0.5rem)",
                            fontWeight: 600, fontSize: 13,
                            color: "oklch(75% 0.06 70)",
                            background: "oklch(28% 0.08 60 / 0.5)",
                            border: "1.5px solid oklch(50% 0.06 60 / 0.4)",
                            cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <p style={{ color: "oklch(55% 0.05 70)", fontSize: 11, marginTop: 12, fontFamily: "'DM Mono', monospace" }}>
                    Press ← → to navigate · Esc to close
                </p>
            </div>
        </div>
    );
}

// ============================================================
// STATS BAR
// ============================================================
function StatsBar({ total, filtered, favorites }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, fontSize: 13 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(55% 0.12 70)", display: "inline-block" }} />
                <span style={{ color: "oklch(55% 0.09 60)" }}>{filtered} of {total} templates</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(60% 0.15 30)", display: "inline-block" }} />
                <span style={{ color: "oklch(55% 0.09 60)" }}>{favorites} saved</span>
            </div>
        </div>
    );
}

// ============================================================
// DECORATIVE COFFEE RING
// ============================================================
const CoffeeRing = ({ style }) => (
    <svg viewBox="0 0 120 120" style={{ opacity: 0.08, ...style }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="none" stroke="oklch(45% 0.14 55)" strokeWidth="6" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="oklch(50% 0.12 60)" strokeWidth="2" strokeDasharray="4 6" />
    </svg>
);

// ============================================================
// MAIN COMPONENT
// ============================================================
const Templates = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [previewItem, setPreviewItem] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [viewMode, setViewMode] = useState("grid");
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => { setTimeout(() => setHeaderVisible(true), 80); }, []);

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
        <div style={{
            width: "100%", minHeight: "100vh",
            background: "oklch(95% 0.038 75.164)",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            position: "relative",
            color: "oklch(40% 0.123 38.172)",
        }}>
            <GrainOverlay />

            {/* ── HERO HEADER ── */}
            <div style={{ position: "relative", overflow: "hidden", padding: "72px 24px 56px", textAlign: "center" }}>

                {/* Decorative rings */}
                <CoffeeRing style={{ position: "absolute", top: -30, left: "8%", width: 180, height: 180, transform: "rotate(15deg)" }} />
                <CoffeeRing style={{ position: "absolute", bottom: -20, right: "6%", width: 140, height: 140, transform: "rotate(-10deg)" }} />

                {/* Warm gradient blob */}
                <div style={{
                    position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
                    width: 600, height: 300,
                    background: "radial-gradient(ellipse at center, oklch(85% 0.08 65 / 0.5) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div style={{
                    position: "relative", zIndex: 1,
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? "translateY(0)" : "translateY(24px)",
                    transition: "all 0.75s cubic-bezier(.4,0,.2,1)",
                }}>
                    {/* Eyebrow */}
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "6px 16px", borderRadius: "var(--radius-selector, 2rem)",
                        background: "oklch(88% 0.07 70 / 0.7)",
                        border: "var(--border, 2px) solid oklch(80% 0.09 68)",
                        fontSize: 10, fontWeight: 900, letterSpacing: "0.13em",
                        textTransform: "uppercase", marginBottom: 24,
                        color: "oklch(42% 0.13 50)",
                        fontFamily: "'DM Mono', monospace",
                    }}>
                        <span style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: "oklch(55% 0.14 55)",
                            animation: "pulse 2s infinite",
                            display: "inline-block",
                        }} />
                        {templateMeta.length}+ Premium Templates · ATS-Friendly
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.0,
                        color: "oklch(28% 0.1 45)",
                        margin: "0 0 20px",
                        fontFamily: "'DM Sans', sans-serif",
                    }}>
                        Your Resume,{" "}
                        <span style={{
                            position: "relative", display: "inline-block",
                            color: "oklch(45% 0.14 55)",
                        }}>
                            Elevated
                            {/* Underline squiggle */}
                            <svg viewBox="0 0 200 12" style={{
                                position: "absolute", bottom: -6, left: 0, width: "100%", height: 10,
                                overflow: "visible",
                            }}>
                                <path d="M2,8 Q25,2 50,8 Q75,14 100,8 Q125,2 150,8 Q175,14 198,8"
                                    fill="none" stroke="oklch(55% 0.16 58)" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </span>
                        .
                    </h1>

                    <p style={{
                        fontSize: 16, lineHeight: 1.65,
                        color: "oklch(52% 0.09 55)",
                        maxWidth: 480, margin: "0 auto 40px",
                    }}>
                        Pick a template. Stand out. Land the role.
                        Crafted with attention to every pixel.
                    </p>

                    {/* Stats row */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 0 }}>
                        {[["11", "Templates"], ["100%", "ATS-Ready"], ["∞", "Customizable"]].map(([val, label], i) => (
                            <React.Fragment key={label}>
                                <div style={{ textAlign: "center", padding: "0 28px" }}>
                                    <div style={{
                                        fontSize: "2rem", fontWeight: 900,
                                        color: "oklch(38% 0.13 50)",
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}>{val}</div>
                                    <div style={{
                                        fontSize: 10, color: "oklch(58% 0.08 60)", marginTop: 2, fontWeight: 600,
                                        fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em",
                                    }}>{label}</div>
                                </div>
                                {i < 2 && (
                                    <div style={{
                                        width: 1, height: 36,
                                        background: "oklch(80% 0.07 65)",
                                    }} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── STICKY CONTROLS ── */}
            <div style={{
                position: "sticky", top: 12, zIndex: 30,
                width: "90%", margin: "0 auto",
                padding: "12px 20px",
                display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12,
                background: "oklab(97.4% 0.003 0.012)",
                borderRadius: "var(--radius-box, 1rem)",
                border: "var(--border, 2px) solid oklch(87% 0.065 70)",
                boxShadow: "0 8px 32px -8px oklch(40% 0.1 55 / 0.18), 0 2px 8px -2px oklch(40% 0.1 55 / 0.08)",
            }}>
                {/* Search */}
                <div style={{ position: "relative", flex: 1, minWidth: 160, maxWidth: 280 }}>
                    <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "oklch(65% 0.07 60)" }}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search templates…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: "100%", paddingLeft: 32, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
                            borderRadius: "var(--radius-field, 0.5rem)",
                            border: "var(--border, 2px) solid oklch(86% 0.065 70)",
                            background: "oklch(95% 0.038 75.164)",
                            fontSize: 13, color: "oklch(40% 0.123 38.172)",
                            outline: "none",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    />
                </div>

                {/* Filter tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {FILTER_TAGS.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            style={{
                                padding: "6px 14px",
                                borderRadius: "var(--radius-selector, 2rem)",
                                fontSize: 11, fontWeight: 800,
                                letterSpacing: "0.04em",
                                border: `var(--border, 2px) solid ${activeFilter === tag ? "oklch(52% 0.14 55)" : "oklch(84% 0.07 70)"}`,
                                background: activeFilter === tag ? "oklch(52% 0.14 55)" : "oklch(93% 0.05 73)",
                                color: activeFilter === tag ? "#fff" : "oklch(52% 0.09 60)",
                                cursor: "pointer",
                                transform: activeFilter === tag ? "scale(1.05)" : "scale(1)",
                                transition: "all 0.2s",
                                fontFamily: "'DM Mono', monospace",
                                textTransform: "uppercase",
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <div style={{ flex: 1 }} />

                {/* Favorites toggle */}
                <button
                    onClick={() => setShowFavoritesOnly((v) => !v)}
                    style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "7px 14px",
                        borderRadius: "var(--radius-selector, 2rem)",
                        fontSize: 11, fontWeight: 800,
                        border: `var(--border, 2px) solid ${showFavoritesOnly ? "oklch(65% 0.15 35)" : "oklch(84% 0.07 70)"}`,
                        background: showFavoritesOnly ? "oklch(94% 0.06 35)" : "oklch(93% 0.05 73)",
                        color: showFavoritesOnly ? "oklch(45% 0.15 30)" : "oklch(62% 0.08 60)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        fontFamily: "'DM Mono', monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                    }}
                >
                    <svg viewBox="0 0 24 24" style={{ width: 13, height: 13 }}
                        fill={showFavoritesOnly ? "oklch(55% 0.15 30)" : "none"}
                        stroke="currentColor" strokeWidth="2.2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    Saved {favorites.size > 0 && `(${favorites.size})`}
                </button>

                {/* Grid toggle */}
                <div style={{
                    display: "flex", gap: 4, padding: 4,
                    background: "oklch(91% 0.05 72)",
                    borderRadius: "var(--radius-field, 0.5rem)",
                    border: "var(--border, 2px) solid oklch(85% 0.07 70)",
                }}>
                    {[{ mode: "grid", icon: "▦" }, { mode: "wide", icon: "▤" }].map(({ mode, icon }) => (
                        <button key={mode} onClick={() => setViewMode(mode)}
                            style={{
                                width: 28, height: 28,
                                borderRadius: "6px",
                                fontSize: 13, cursor: "pointer",
                                border: "none",
                                background: viewMode === mode ? "oklab(97.962% 0.00443 0.01503)" : "transparent",
                                color: viewMode === mode ? "oklch(48% 0.13 55)" : "oklch(65% 0.07 60)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.2s",
                                boxShadow: viewMode === mode ? "0 1px 4px oklch(40% 0.08 55 / 0.12)" : "none",
                            }}>
                            {icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── MAIN GRID ── */}
            <div style={{ width: "100%", padding: "32px 24px 64px", maxWidth: 1600, margin: "0 auto" }}>

                {/* Results info */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                    <StatsBar total={templateMeta.length} filtered={filtered.length} favorites={favorites.size} />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            style={{
                                fontSize: 12, fontWeight: 700, color: "oklch(52% 0.14 55)",
                                background: "none", border: "none", cursor: "pointer",
                                fontFamily: "'DM Mono', monospace",
                            }}
                        >
                            ✕ Clear search
                        </button>
                    )}
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div style={{ textAlign: "center", padding: "96px 0", color: "oklch(62% 0.07 60)" }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>☕</div>
                        <p style={{ fontWeight: 800, fontSize: 18, color: "oklch(45% 0.1 55)", marginBottom: 6 }}>No templates found</p>
                        <p style={{ fontSize: 13, color: "oklch(60% 0.07 60)" }}>Try a different filter or search term</p>
                        <button
                            onClick={() => { setActiveFilter("All"); setSearchQuery(""); setShowFavoritesOnly(false); }}
                            style={{
                                marginTop: 24, padding: "10px 24px",
                                borderRadius: "var(--radius-field, 0.5rem)",
                                background: "oklch(52% 0.14 55)", color: "#fff",
                                fontWeight: 800, fontSize: 13, border: "none", cursor: "pointer",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Cards Grid */}
                <div style={{
                    display: "grid",
                    gap: 24,
                    gridTemplateColumns: viewMode === "grid"
                        ? "repeat(auto-fill, minmax(260px, 1fr))"
                        : "repeat(auto-fill, minmax(380px, 1fr))",
                }}>
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
                <div style={{
                    marginTop: 80,
                    borderRadius: "var(--radius-box, 1rem)",
                    padding: "56px 32px",
                    textAlign: "center",
                    background: "oklch(28% 0.09 45)",
                    border: "var(--border, 2px) solid oklch(38% 0.1 48)",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    {/* Decorative rings inside CTA */}
                    <CoffeeRing style={{ position: "absolute", top: -20, left: "3%", width: 120, height: 120 }} />
                    <CoffeeRing style={{ position: "absolute", bottom: -20, right: "3%", width: 100, height: 100 }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                        <h2 style={{
                            fontSize: "2rem", fontWeight: 900,
                            color: "oklch(93% 0.04 72)", margin: "0 0 8px",
                            fontFamily: "'DM Sans', sans-serif",
                        }}>Can't decide?</h2>
                        <p style={{ color: "oklch(68% 0.07 65)", fontSize: 14, maxWidth: 360, margin: "0 auto 24px" }}>
                            Fill your details once and instantly preview all templates live.
                        </p>
                        <button style={{
                            padding: "12px 32px",
                            borderRadius: "var(--radius-field, 0.5rem)",
                            fontWeight: 800, fontSize: 14, color: "oklch(28% 0.09 45)",
                            background: "oklch(82% 0.12 68)",
                            border: "none", cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            letterSpacing: "0.02em",
                        }}>
                            Preview All with My Data →
                        </button>
                    </div>
                </div>
            </div>

            {/* ── PREVIEW MODAL ── */}
            {previewItem && (
                <PreviewModal
                    item={previewItem}
                    onClose={() => setPreviewItem(null)}
                    onNext={goNext}
                    onPrev={goPrev}
                />
            )}
        </div>
    );
};

export default Templates;