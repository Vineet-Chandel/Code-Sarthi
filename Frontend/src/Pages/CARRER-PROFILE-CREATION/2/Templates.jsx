import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';





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
    // { id: 1, Component: Temp1, name: "Modern Professional", tag: "Modern", color: "#9B6A3A" },
    { id: 2, Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784819449/WSO_Investment_Banking_Resume_Free_Google_Docs_Template_ja5uw2.jpg", name: "Creative Minimal", tag: "Minimal", color: "#C4874B" },
    // { id: 3, Component: Temp3, name: "Technical Executive", tag: "Bold", color: "#6B3E26" },
    // { id: 4, Component: Temp4, name: "Focused Layout", tag: "Minimal", color: "#B8924A" },
    { id: 5, Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784822995/Screenshot_2026-07-23_at_9.39.10_PM_wohjmk.png", name: "Clean Slate", tag: "Classic", color: "#A05C2C" },
    { id: 6, Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784831970/Screenshot_2026-07-24_at_12.08.55_AM_z7wj79.png", name: "Clean Modern", tag: "Modern", color: "#7A8C4E" },
    { id: 7, Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784830138/Screenshot_2026-07-23_at_11.38.50_PM_ofo5zt.png", name: "Creative Contrast", tag: "Creative", color: "#8B5E3C" },
    { id: 8, Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784826697/Screenshot_2026-07-23_at_10.41.23_PM_kk0gd5.png", name: "Cool Overlay", tag: "Bold", color: "#4A6741" },
    { id: 9, Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784827771/Screenshot_2026-07-23_at_10.59.10_PM_pdvcrs.png", name: "Modern Functional", tag: "Modern", color: "#3D6B72" },
    { id: 10, Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784828253/Screenshot_2026-07-23_at_11.07.25_PM_plujfe.png", name: "Classic Module", tag: "Classic", color: "#7B5C8A" },
    { id: 11, Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784828456/Screenshot_2026-07-23_at_11.10.49_PM_nyihrk.png", name: "Simple Linear", tag: "Minimal", color: "#C49A3C" },
    { id: 12, Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784823538/Screenshot_2026-07-23_at_9.48.38_PM_gghcae.png", name: "Simple Linear", tag: "Minimal", color: "#C49A3C" },
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

                borderRadius: "var(--radius-box, 1rem)",
                overflow: "hidden",
                border: `var(--border, 2px) solid ${hovered ? "#212121" : "fff"}`,
                background: "#212121",

            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Tag badge */}
            <div
                style={{
                    position: "absolute", top: 10, left: 10, zIndex: 10,
                    padding: "6px 12px",
                    borderRadius: "99px",
                    fontSize: 12, fontWeight: 900, letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    background: "#212121",
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
                    width: 40, height: 40, borderRadius: "50%",
                    background: "#000",
                    border: "1.5px solid #000",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "transform 0.2s",
                    transform: isFavorite ? "scale(1.15)" : "scale(1)",
                }}
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
                title="Save"
            >
                <svg viewBox="0 0 24 24" style={{ width: 14, height: 14 }}
                    fill={isFavorite ? "#fff" : "none"}
                    stroke={isFavorite ? item.color : "#fff"}
                    strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </button>

            <div >

                <div

                >
                    <img src={item.Component} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Hover overlay CTA — unchanged */}
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
                    background: `linear-gradient(160deg, #21212118 0%, #21212150 100%)`,
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}>
                    <button
                        style={{
                            padding: "10px 28px",
                            borderRadius: "var(--radius-field, 0.5rem)",
                            fontWeight: 800, fontSize: 15, color: "#fff",
                            background: "#212121",
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
                background: "#212121",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
            }}>
                <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
                        {item.name}
                    </div>
                    <div style={{ fontSize: 10, color: "#fff", marginTop: 2, fontFamily: "'DM Mono', monospace" }}>
                        Template #{item.id}
                    </div>
                </div>
                <span style={{
                    fontSize: 9, fontWeight: 900, letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: "#fff",
                    color: "#212121",
                    border: "1.5px solid #212121",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-field, 0.5rem)",
                    fontFamily: "'DM Mono', monospace",
                }}>
                    ATS
                </span>
            </div>



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
                background: "#181818",

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
                        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 20, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                            {item.name}
                        </h2>
                        <p style={{ color: "#fff", fontSize: 14, marginTop: 3, fontFamily: "'DM Mono', monospace" }}>
                            Template #{item.id} · {item.tag}
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        {[["←", onPrev], ["→", onNext]].map(([label, fn]) => (
                            <button key={label} onClick={fn}
                                style={{
                                    width: 36, height: 36, borderRadius: "var(--radius-field, 0.5rem)",
                                    background: "#fff",
                                    color: "#212121",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer", fontSize: 16,
                                }}>
                                {label}
                            </button>
                        ))}
                        <button onClick={onClose}
                            style={{
                                width: 36, height: 36, borderRadius: "var(--radius-field, 0.5rem)",
                                background: "#fff",
                                color: "#212121",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", fontSize: 20, lineHeight: 1,
                            }}>
                            ×
                        </button>
                    </div>
                </div>

                {/* Resume preview */}
                <div style={{

                    borderRadius: "var(--radius-box, 1rem)",
                    overflow: "auto",


                }} className='h-full'>
                    <img src={item.Component} alt="" />
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                    <button
                        style={{
                            padding: "12px 32px",
                            borderRadius: "var(--radius-field, 0.5rem)",
                            fontWeight: 800, fontSize: 15, color: "#212121",
                            background: "#fff",
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
                            fontWeight: 600, fontSize: 15,
                            color: "#fff",
                            background: "#212121",
                            border: "none", cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <p style={{ color: "#ffff", fontSize: 14, marginTop: 12, fontFamily: "'DM Mono', monospace" }}>
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
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, fontSize: 15 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3c8affff", display: "inline-block" }} className='animate-pulse' />
                <span style={{ color: "#fff" }}>{filtered} of {total} templates</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff2929ff", display: "inline-block" }} className='animate-pulse' />
                <span style={{ color: "#fff" }}>{favorites} saved</span>
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
    const [viewMode, setViewMode] = useState("grid");


    // useEffect(() => { setTimeout(() => setHeaderVisible(true), 80); }, []);

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
    const Navigate = useNavigate()
    return (
        <div className='bg-black'>
            <GrainOverlay />

            {/* ── HERO HEADER ── */}
            <div style={{ position: "relative", overflow: "hidden", textAlign: "center" }}>



                <div className="text-center mb-3 sm:mb-5 lg:mb-5 w-full flex flex-col items-center px-4 mt-4">

                    {/* Heading */}
                    <h1 className="
        text-4xl 
        sm:text-6xl 
        md:text-7xl 
        lg:text-8xl 
        xl:text-9xl
        font-extrabold 
text-white
    ">
                        Choose a Template
                    </h1>

                    {/* Subtitle */}
                    <p className="
        text-base 
        sm:text-lg 
        md:text-xl 
        lg:text-2xl 
text-blue-500
        mt-6 
        max-w-xl 
        lg:max-w-3xl

        flex items-center gap-2
    ">
                        <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" className="transition-transform duration-500 ease-in-out hover:rotate-180">
                            <path fill="currentColor" d="M10.565 2.075a3.33 3.33 0 0 1 2.87 0c.394.189.755.497 1.26.928l.079.066c.48.41.939.604 1.58.655l.102.008c.662.053 1.135.09 1.547.236a3.33 3.33 0 0 1 2.03 2.029c.145.412.182.885.235 1.547l.008.102c.051.641.246 1.1.655 1.58l.066.078c.431.506.74.867.928 1.261a3.33 3.33 0 0 1 0 2.87c-.189.394-.497.755-.928 1.26l-.066.079c-.418.49-.605.951-.655 1.58l-.008.102c-.053.662-.09 1.135-.236 1.547a3.33 3.33 0 0 1-2.029 2.03c-.412.145-.885.182-1.547.235l-.102.008c-.641.051-1.1.246-1.58.655l-.079.066c-.505.431-.866.74-1.26.928a3.33 3.33 0 0 1-2.87 0c-.394-.189-.755-.497-1.26-.928l-.079-.066a2.56 2.56 0 0 0-1.58-.655l-.102-.008c-.662-.053-1.135-.09-1.547-.236a3.33 3.33 0 0 1-2.03-2.029c-.145-.412-.182-.885-.235-1.547l-.008-.102a2.56 2.56 0 0 0-.655-1.58l-.066-.079c-.431-.505-.74-.866-.928-1.26a3.33 3.33 0 0 1 0-2.87c.189-.394.497-.755.928-1.26l.066-.079a2.56 2.56 0 0 0 .655-1.58l.008-.102c.053-.662.09-1.135.236-1.547a3.33 3.33 0 0 1 2.029-2.03c.412-.145.885-.182 1.547-.235l.102-.008a2.56 2.56 0 0 0 1.58-.655l.078-.066c.506-.431.867-.74 1.261-.928m3.232 6.12a.75.75 0 1 0-1.45-.39l-2.143 8a.75.75 0 0 0 1.449.39zm1.641.974a.75.75 0 1 0-1.06 1.06l.131.132c.527.526.867.869 1.085 1.155c.205.268.23.396.23.484s-.025.216-.23.484c-.218.286-.558.629-1.085 1.155l-.131.131a.75.75 0 1 0 1.06 1.06l.167-.166c.482-.48.895-.894 1.181-1.27c.307-.402.537-.846.537-1.394s-.23-.992-.537-1.394c-.286-.376-.7-.79-1.18-1.27zm-5.816 0a.75.75 0 0 0-1.06 0l-.167.167c-.481.48-.895.894-1.181 1.27c-.307.402-.537.846-.537 1.394s.23.992.537 1.394c.286.376.7.79 1.18 1.27l.168.167a.75.75 0 0 0 1.06-1.06l-.131-.132c-.527-.526-.867-.869-1.085-1.155c-.205-.268-.23-.396-.23-.484s.025-.216.23-.484c.218-.286.558-.629 1.085-1.155l.131-.131a.75.75 0 0 0 0-1.061"></path>
                        </svg>

                        <span className="text-white">Choose any of the template below every template has its own uniqueness</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mt-5 w-full">
                        <div
                            onClick={() => Navigate("/app/interview-arena")}
                            className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Interview Arena
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                        </div>

                        <div
                            onClick={() => Navigate("/app/resume-examples")}
                            className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Examples
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                        </div>

                        <div
                            onClick={() => Navigate("/app/build-resume/preview-content")}
                            className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Your Career Profile
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── STICKY CONTROLS ── */}
            <div style={{
                position: "sticky", top: 12, zIndex: 30,
                width: "90%", margin: "0 auto",
                padding: "12px 20px",
                display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12,
                background: "#a0a0a0ff",
                borderRadius: "1rem",
                border: "2px solid #a0a0a0ff",
                boxShadow: "0 8px 32px -8px oklch(40% 0.1 55 / 0.18), 0 2px 8px -2px oklch(40% 0.1 55 / 0.08)",
            }}>
                {/* Search */}
                <div style={{ position: "relative", flex: 1, minWidth: 160, maxWidth: 280 }}>
                    <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#000" }}
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
                            borderRadius: "1rem",
                            border: "#000 2px solid",
                            background: "#fff",
                            fontSize: 15, color: "#000",
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
                                fontSize: 14, fontWeight: 800,
                                letterSpacing: "0.04em",
                                border: `var(--border, 2px) solid ${activeFilter === tag ? "#000" : "#000"}`,
                                background: activeFilter === tag ? "#000" : "#fff",
                                color: activeFilter === tag ? "#fff" : "#000",
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
                        fontSize: 14, fontWeight: 800,
                        border: `var(--border, 2px) solid ${showFavoritesOnly ? "oklch(65% 0.15 35)" : "#000"}`,
                        background: showFavoritesOnly ? "oklch(94% 0.06 35)" : "#ffffff",
                        color: showFavoritesOnly ? "oklch(45% 0.15 30)" : "#000",
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
                    background: "#fff",
                    borderRadius: "#212121",
                    border: "var(--border, 2px) solid #212121",
                }}>
                    {[{
                        mode: "grid", icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <g fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                                    <rect width={6.5} height={6.5} x={3.75} y={13.75} rx={2}></rect>
                                    <rect width={6.5} height={6.5} x={13.75} y={13.75} rx={2}></rect>
                                    <rect width={6.5} height={6.5} x={3.75} y={3.75} rx={2}></rect>
                                    <rect width={6.5} height={6.5} x={13.75} y={3.75} rx={2}></rect>
                                </g>
                            </svg>
                        )
                    }, {
                        mode: "wide", icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M16 5.5H8V4h8zM16 20H8v-1.5h8zM5 9h14v6H5z"></path>
                            </svg>
                        )
                    }].map(({ mode, icon }) => (
                        <button key={mode} onClick={() => setViewMode(mode)}
                            style={{
                                width: 28, height: 28,
                                borderRadius: "6px",
                                fontSize: 15, cursor: "pointer",
                                border: "none",
                                background: viewMode === mode ? "#212121" : "transparent",
                                color: viewMode === mode ? "#fff" : "#212121",
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
                            className='border px-3 sm:px-5 py-2 sm:py-3 rounded-xl border-[#3a3a3a] text-sm sm:text-md'
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
                        <p style={{ fontSize: 15, color: "oklch(60% 0.07 60)" }}>Try a different filter or search term</p>
                        <button
                            onClick={() => { setActiveFilter("All"); setSearchQuery(""); setShowFavoritesOnly(false); }}
                            style={{
                                marginTop: 24, padding: "10px 24px",
                                borderRadius: "var(--radius-field, 0.5rem)",
                                background: "oklch(52% 0.14 55)", color: "#fff",
                                fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer",
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
                        ? "repeat(auto-fill, minmax(480px, 1fr))"
                        : "repeat(auto-fill, minmax(580px, 1fr))",
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