import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Step from "../Step";
import ProgressMeter from "../ProgressMeter";

// ── SVG ICON SYSTEM ────────────────────────────────────────────────────────
const PATHS = {
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 13a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.29-1.29a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
    linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
    globe: "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
    map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z",
    briefcase: "M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
    book: "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
    code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    award: "M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
    terminal: "M4 17l6-6-6-6M12 19h8",
    external: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3",
    copy: "M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v9.857C20 20.09 19.105 21 18 21h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z",
    check: "M20 6L9 17l-5-5",
    chevDown: "M6 9l6 6 6-6",
    chevUp: "M18 15l-6-6-6 6",
    share: "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
};

function Icon({ name, size = 14, className = "" }) {
    return (
        <motion.svg
            width={size} height={size} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
            className={className}
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <path d={PATHS[name]} />
        </motion.svg>
    );
}

// ── ANIMATED DOT-TRACK TIMELINE ────────────────────────────────────────────
function TimelineEntry({ children, index = 0 }) {
    return (
        <motion.div
            className="flex gap-4 mb-5 last:mb-0 group"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
        >
            <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
                <motion.div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 border-2"
                    style={{ background: "#fff", borderColor: "rgba(99,179,237,0.4)" }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 500 }}
                />
                <div className="flex-1 w-px mt-2" style={{ background: "rgba(255,255,255,0.08)" }} />
            </div>
            <div className="flex-1 pb-4">{children}</div>
        </motion.div>
    );
}

// ── GLASS SECTION CARD ─────────────────────────────────────────────────────
function GlassCard({ id, title, icon, children, copyText, index = 0 }) {
    const [collapsed, setCollapsed] = useState(false);
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        if (!copyText) return;
        navigator.clipboard.writeText(copyText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        });
    }

    return (
        <motion.section
            id={`section-${id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.5, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden mb-4"
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
            }}
            whileHover={{ borderColor: "rgba(99,179,237,0.3)" }}
        >
            {/* Glow top accent */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #c8c6c6, transparent)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.07 + 0.3, duration: 0.7 }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <motion.h2
                    className="flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase"
                    style={{ color: "#fff", fontFamily: "'Space Mono', monospace" }}
                >
                    <Icon name={icon} size={15} />
                    {title}
                </motion.h2>

                <div className="flex items-center gap-1">
                    {copyText && (
                        <motion.button
                            onClick={handleCopy}
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                            style={{ color: copied ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.4)" }}
                            whileHover={{ scale: 1.12, color: "#fff" }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Icon name={copied ? "check" : "copy"} size={13} />
                        </motion.button>
                    )}
                    <motion.button
                        onClick={() => setCollapsed(p => !p)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                        whileHover={{ scale: 1.12, color: "#fff" }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ rotate: collapsed ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <Icon name="chevDown" size={13} />
                    </motion.button>
                </div>
            </div>

            <div className="h-px mx-5" style={{ background: "rgba(255,255,255,0.06)" }} />

            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="px-5 pt-3 pb-4">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}

// ── SKILL TAG ──────────────────────────────────────────────────────────────
function SkillTag({ label, index = 0 }) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04, type: "spring", stiffness: 400 }}
            whileHover={{ scale: 1.08, borderColor: "#c8c6c6", color: "rgba(99,179,237,1)" }}
            className="inline-block px-2.5 py-1 text-xs font-mono rounded-md mr-1.5 mb-1.5 cursor-default"
            style={{
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
            }}
        >
            {label}
        </motion.span>
    );
}

// ── CONTACT ITEM ───────────────────────────────────────────────────────────
function ContactItem({ icon, text, href }) {
    if (!text) return null;
    const El = href ? "a" : "span";
    return (
        <motion.div whileHover={{ scale: 1.02 }}>
            <El
                href={href}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs no-underline"
                style={{
                    color: "rgba(255,255,255,0.55)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                }}
            >
                <span style={{ color: "rgba(99,179,237,0.8)" }}>
                    <Icon name={icon} size={12} />
                </span>
                <span className="truncate max-w-[160px]">{text}</span>
            </El>
        </motion.div>
    );
}

// ── FILTER TABS ────────────────────────────────────────────────────────────
function FilterBar({ active, onChange }) {
    const tabs = ["all", "experience", "education", "projects", "skills"];
    return (
        <div
            className="flex flex-wrap gap-1 p-1 rounded-2xl mb-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
            {tabs.map(t => (
                <motion.button
                    key={t}
                    onClick={() => onChange(t)}
                    className="relative px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors"
                    style={{
                        color: active === t ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.38)",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                    }}
                    whileHover={{ color: "rgba(255,255,255,0.8)" }}
                    whileTap={{ scale: 0.96 }}
                >
                    {active === t && (
                        <motion.div
                            layoutId="filter-pill"
                            className="absolute inset-0 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255, 255, 255, 0.3)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        />
                    )}
                    <span className="relative z-10">{t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}</span>
                </motion.button>
            ))}
        </div>
    );
}

// ── BADGE ──────────────────────────────────────────────────────────────────
function Badge({ children }) {
    if (!children) return null;
    return (
        <span
            className="text-[9px] px-2 py-0.5 rounded-md font-bold tracking-wider uppercase"
            style={{
                background: "rgba(99,179,237,0.12)",
                border: "1px solid rgba(99,179,237,0.25)",
                color: "#fff",
                fontFamily: "'Space Mono', monospace",
            }}
        >
            {children}
        </span>
    );
}

// ── PROJECT CARD ───────────────────────────────────────────────────────────
function ProjectCard({ project: p, index = 0 }) {
    if (!p) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            whileHover={{ borderColor: "rgba(99,179,237,0.3)", y: -2 }}
            className="rounded-2xl p-4 mb-3 last:mb-0 group"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.09)",
            }}
        >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                    <h3 className="text-sm font-semibold text-white">{p.name}</h3>
                    {p.stack && (
                        <p className="text-[10px] mt-0.5 font-mono" style={{ color: "rgba(99,179,237,0.7)", fontFamily: "'Space Mono', monospace" }}>
                            {p.stack}
                        </p>
                    )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                    {p.github && (
                        <motion.a
                            href={p.github} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-lg no-underline"
                            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.04)" }}
                            whileHover={{ borderColor: "rgba(99,179,237,0.4)", color: "#fff", scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Icon name="github" size={11} /> Code
                        </motion.a>
                    )}
                    {p.live && (
                        <motion.a
                            href={p.live} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-lg no-underline"
                            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.04)" }}
                            whileHover={{ borderColor: "rgba(99,179,237,0.4)", color: "#fff", scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Icon name="external" size={11} /> Live
                        </motion.a>
                    )}
                </div>
            </div>

            {p.description && (
                <p className="text-xs italic mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {p.name} {p.description}
                </p>
            )}

            {Array.isArray(p.bullets) && p.bullets.length > 0 && (
                <ul className="space-y-1.5">
                    {p.bullets.map((b, i) => (
                        <motion.li
                            key={i}
                            className="flex gap-2 text-xs leading-relaxed items-start"
                            style={{ color: "rgba(255,255,255,0.65)" }}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + i * 0.04 }}
                        >
                            <span className="text-sm leading-none pt-0.5 shrink-0" style={{ color: "#c8c6c6" }}>›</span>
                            <span dangerouslySetInnerHTML={{ __html: b }} />
                        </motion.li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
}



// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function ResumeViewer({ resumeData }) {
    const location = useLocation();
    let data = location.state?.resumeData || {};

    const [activeFilter, setActiveFilter] = useState("all");

    const show = (key) => activeFilter === "all" || activeFilter === key;

    const fullName = [data.fname, data.lname].filter(Boolean).join(" ");
    const initials = [data.fname?.[0], data.lname?.[0]].filter(Boolean).join("");

    const copySkills = Object.entries(data.skills ?? {})
        .map(([k, v]) => `${k}: ${v}`).join("\n");

    const copyExp = (data.experience ?? [])
        .map(e => `${e.role} @ ${e.company}\n${(e.bullets || []).join("\n")}`).join("\n\n");

    const copyEdu = (data.education ?? [])
        .map(e => `${e.degree} — ${e.institution}`).join("\n");

    const copyProj = (data.projects ?? [])
        .map(p => `${p.name} [${p.stack}]\n${p.description}`).join("\n\n");

    return (
        <div
            className="min-h-screen relative font-poppins bg-base-100"

        >

            <div className="border rounded-3xl mb-4 mx-20 relative top-5">
                <div className=" rounded-3xl flex flex-col min-[480px]:flex-row items-center justify-around min-[480px]:justify-center gap-5 min-[480px]:gap-3 bg-base-200 px-2 py-3.5 border-b border-slate-700 sm:px-5">
                    {/* Step Counter */}
                    <span className="w-full flex justify-center min-[480px]:justify-start min-[480px]:w-1/5">
                        <Step index={7} />
                    </span>

                    {/* Progress Meter Container */}
                    <span className="flex min-[480px]:w-[70%] justify-center  w-full min-[480px]:justify-end sm:w-3/5 ">
                        <ProgressMeter index={7} resumeData={data} />
                    </span>

                    <span className=" min-[480px]:w-[30%] flex gap-1 w-full  items-center justify-center text-white font-poppins text-2xl">

                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10 2h4c3.771 0 5.657 0 6.828 1.172S22 6.229 22 10v1c0 .552 0 1.55-.006 2H2.007C2 12.55 2 11.552 2 11v-1c0-3.771 0-5.657 1.172-6.828S6.229 2 10 2" opacity={0.5}></path>
                            <path fill="currentColor" d="M7.985 17.5c-2.84 0-4.26 0-5.141-.879C2.272 16.052 2.07 15.258 2 14v-1h20v1c-.07 1.258-.272 2.052-.844 2.621c-.882.879-2.301.879-5.14.879h-3.263v4h3.262c.416 0 .753.336.753.75s-.337.75-.753.75h-8.03a.75.75 0 0 1-.753-.75c0-.414.337-.75.753-.75h3.262v-4z"></path>
                        </svg>
                        Preview
                    </span>
                </div>
            </div>



            {/* Ambient glow blobs */}
            <div className="fixed pointer-events-none" style={{ top: "-10%", left: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)", zIndex: 0 }} />
            <div className="fixed pointer-events-none" style={{ bottom: "10%", right: "5%", width: 350, height: 350, background: "radial-gradient(circle, rgba(99,179,237,0.05) 0%, transparent 70%)", zIndex: 0 }} />

            <div className="relative z-10 w-full mx-auto px-4 py-8">

                {/* ── HERO HEADER ── */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="rounded-3xl p-6 mb-5"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        backdropFilter: "blur(30px)",
                    }}
                >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0"
                                style={{
                                    background: "#fff",
                                    border: "1px solid rgba(99,179,237,0.3)",
                                    color: "#000",
                                    fontFamily: "'Space Mono', monospace",
                                }}
                                whileHover={{ scale: 1.05, rotate: 3 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {initials || <Icon name="user" size={22} />}
                            </motion.div>

                            <div>
                                {fullName && (
                                    <motion.h1
                                        className="text-2xl font-bold tracking-tight leading-none"
                                        style={{ color: "rgba(255,255,255,0.95)" }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {data.fname}{" "}
                                        <span style={{ color: "#fff" }}>{data.lname}</span>
                                    </motion.h1>
                                )}
                                {data.summaryTitle && (
                                    <motion.p
                                        className="text-sm font-medium mt-1.5"
                                        style={{ color: "rgba(255,255,255,0.5)" }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {data.summaryTitle}
                                    </motion.p>
                                )}
                                {(data.location || data.pincode) && (
                                    <motion.div
                                        className="flex items-center gap-1.5 mt-2 text-xs"
                                        style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Space Mono', monospace" }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Icon name="map" size={12} />
                                        {[data.location, data.pincode].filter(Boolean).join(" · ")}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px my-4" style={{ background: "rgba(255,255,255,0.06)" }} />

                    {/* Contact row */}
                    <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <ContactItem icon="mail" text={data.email} href={data.email ? `mailto:${data.email}` : undefined} />
                        <ContactItem icon="phone" text={data.phone} />
                        <ContactItem icon="github" text={data.github ? "GitHub" : undefined} href={data.github} />
                        <ContactItem icon="linkedin" text={data.linkedin ? "LinkedIn" : undefined} href={data.linkedin} />
                        <ContactItem icon="globe" text={data.portfolio ? "Portfolio" : undefined} href={data.portfolio} />
                    </motion.div>

                    {/* Summary body */}
                    {data.summaryBody && (
                        <motion.div
                            className="mt-4 rounded-xl px-4 py-3"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                        >
                            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                                <strong className="font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{data.fname}</strong> is {data.summaryBody}
                            </p>
                        </motion.div>
                    )}
                </motion.header>

                {/* ── FILTER BAR ── */}
                <FilterBar active={activeFilter} onChange={setActiveFilter} />

                <div className={`grid gap-4 items-start ${activeFilter === "all" ? "grid-cols-1 lg:grid-cols-[280px_1fr]" : "grid-cols-1"}`}>

                    {/* ── LEFT SIDEBAR ── */}
                    {activeFilter === "all" && (
                        <aside>
                            {/* SKILLS */}
                            {data.skills && Object.keys(data.skills).length > 0 && (
                                <GlassCard id="skills" title="Tech Stack" icon="code" index={1}
                                    copyText={copySkills}
                                >
                                    {Object.entries(data.skills).map(([cat, items], ci) => (
                                        <div key={cat} className="mb-3.5 last:mb-0">
                                            <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#c8c6c6", fontFamily: "'Space Mono', monospace" }}>
                                                {cat}
                                            </p>
                                            <div className="flex flex-wrap">
                                                {String(items).split(", ").map((item, si) => (
                                                    <SkillTag key={item} label={item.trim()} index={ci * 5 + si} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </GlassCard>
                            )}

                            {/* ADDITIONAL INFO */}
                            {(data.certifications?.length || data.achievements?.length || data.languages?.length) ? (
                                <GlassCard id="extra" title="Additional" icon="star" index={2}>

                                    {data.certifications?.length > 0 && (
                                        <>
                                            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "#c8c6c6", fontFamily: "'Space Mono', monospace" }}>
                                                Certifications
                                            </p>
                                            {data.certifications.map((cert, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex gap-2 text-xs mb-2 last:mb-3 items-start leading-relaxed"
                                                    style={{ color: "rgba(255,255,255,0.6)" }}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.07 }}
                                                >
                                                    <span style={{ color: "rgba(234,179,8,0.8)" }} className="shrink-0 pt-0.5">
                                                        <Icon name="award" size={12} />
                                                    </span>
                                                    <span>{cert.about}{cert.link ? ` — ${cert.link}` : ""}</span>
                                                </motion.div>
                                            ))}
                                        </>
                                    )}

                                    {data.achievements?.length > 0 && (
                                        <>
                                            <p className="text-[9px] font-bold uppercase tracking-widest mb-2 mt-2" style={{ color: "#c8c6c6", fontFamily: "'Space Mono', monospace" }}>
                                                Achievements
                                            </p>
                                            {data.achievements.map((ach, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex gap-2 text-xs mb-2 last:mb-3 items-start leading-relaxed"
                                                    style={{ color: "rgba(255,255,255,0.6)" }}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.07 }}
                                                >
                                                    <span style={{ color: "rgba(234,179,8,0.8)" }} className="shrink-0 pt-0.5">
                                                        <Icon name="zap" size={12} />
                                                    </span>
                                                    <span>{ach}</span>
                                                </motion.div>
                                            ))}
                                        </>
                                    )}

                                    {data.languages?.length > 0 && (
                                        <>
                                            <p className="text-[9px] font-bold uppercase tracking-widest mb-2 mt-2" style={{ color: "#c8c6c6", fontFamily: "'Space Mono', monospace" }}>
                                                Languages
                                            </p>
                                            <div className="flex flex-wrap">
                                                {data.languages.map((lang, i) => (
                                                    lang.langCategory ? (
                                                        <SkillTag key={i} label={`${lang.langCategory.trim()} (${lang.status})`} index={i} />
                                                    ) : null
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </GlassCard>
                            ) : null}
                        </aside>
                    )}

                    {/* ── MAIN COLUMN ── */}
                    <main>
                        {/* EXPERIENCE */}
                        {show("experience") && data.experience?.length > 0 && (
                            <GlassCard id="exp" title="Experience" icon="briefcase" index={0} copyText={copyExp}>
                                {data.experience.map((exp, i) => (
                                    <TimelineEntry key={i} index={i}>
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                                            <div>
                                                <h3 className="text-sm font-semibold text-white">{exp.role}</h3>
                                                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                                                    {exp.company}{exp.location ? ` · ${exp.location}` : ""}
                                                </p>
                                            </div>
                                            <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 shrink-0">
                                                {exp.employmentType && <Badge>{exp.employmentType}</Badge>}
                                                <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Space Mono', monospace" }}>
                                                    {exp.startDate}{exp.startDate || exp.endDate ? " — " : ""}{exp.currentlyWorking ? "Present" : exp.endDate}
                                                </p>
                                            </div>
                                        </div>
                                        {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                                            <ul className="space-y-1.5 mt-2">
                                                {exp.bullets.map((b, bi) => (
                                                    <li key={bi} className="flex gap-2 text-xs leading-relaxed items-start" style={{ color: "rgba(255,255,255,0.6)" }}>
                                                        <span className="shrink-0 pt-0.5" style={{ color: "rgba(99,179,237,0.55)" }}>›</span>
                                                        <span dangerouslySetInnerHTML={{ __html: b }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </TimelineEntry>
                                ))}
                            </GlassCard>
                        )}

                        {/* EDUCATION */}
                        {show("education") && data.education?.length > 0 && (
                            <GlassCard id="edu" title="Education" icon="book" index={1} copyText={copyEdu}>
                                {data.education.map((edu, i) => (
                                    <TimelineEntry key={i} index={i}>
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                                            <div>
                                                <h3 className="text-sm font-semibold text-white">{edu.degree}</h3>
                                                {edu.field && (
                                                    <p className="text-xs mt-0.5 font-medium" style={{ color: "rgba(99,179,237,0.75)" }}>{edu.field}</p>
                                                )}
                                                {edu.institution && (
                                                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{edu.institution}</p>
                                                )}
                                            </div>
                                            <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 shrink-0">
                                                {(edu.cgpa || edu.percentage) && (
                                                    <Badge>{edu.cgpa ? `CGPA ${edu.cgpa}` : edu.percentage}</Badge>
                                                )}
                                                {(edu.startDate || edu.endDate) && (
                                                    <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Space Mono', monospace" }}>
                                                        {edu.startDate} — {edu.endDate}
                                                    </p>
                                                )}
                                                {edu.location && (
                                                    <p className="text-[10px] hidden sm:block" style={{ color: "rgba(255,255,255,0.3)" }}>{edu.location}</p>
                                                )}
                                            </div>
                                        </div>
                                        {Array.isArray(edu.bullets) && edu.bullets.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {edu.bullets.map((b, bi) => (
                                                    <SkillTag key={bi} label={b} index={bi} />
                                                ))}
                                            </div>
                                        )}
                                    </TimelineEntry>
                                ))}
                            </GlassCard>
                        )}

                        {/* PROJECTS */}
                        {show("projects") && data.projects?.length > 0 && (
                            <GlassCard id="proj" title="Projects" icon="terminal" index={2} copyText={copyProj}>
                                {data.projects.map((p, i) => (
                                    <ProjectCard key={i} project={p} index={i} />
                                ))}
                            </GlassCard>
                        )}

                        {/* SKILLS — full view when tab active */}
                        {activeFilter === "skills" && data.skills && Object.keys(data.skills).length > 0 && (
                            <GlassCard id="skills-full" title="Tech Stack Matrix" icon="layers" index={0} copyText={copySkills}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {Object.entries(data.skills).map(([cat, items], ci) => (
                                        <div key={cat}>
                                            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "#c8c6c6", fontFamily: "'Space Mono', monospace" }}>
                                                {cat}
                                            </p>
                                            <div className="flex flex-wrap">
                                                {String(items).split(", ").map((item, si) => (
                                                    <SkillTag key={item} label={item.trim()} index={ci * 8 + si} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        )}
                    </main>
                </div>
            </div>
            <div className="w-full flex items-center justify-center text-1xl ">
                <span className=" px-10 py-2.5 bg-accent rounded-full hover:bg-white hover:text-black cursor-pointer">
                    Save Data & Continue
                </span>

            </div>
        </div>
    );
}