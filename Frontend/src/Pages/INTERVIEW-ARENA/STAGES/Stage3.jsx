import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    CheckCircle,
    Type,
    Sparkles,
    Braces,
    Send,
    FileCheck2,
    ChevronDown,
    AlertTriangle,
    AlertOctagon,
    AlertCircle,
    Info,
    Tag,
    Hash,
    Ban,
    Layers,
    Search,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Config & constants                                                        */
/*  Kept as module-level constants so they are never recreated on render.     */
/* -------------------------------------------------------------------------- */

const DEBUG = false; // flip to true for verbose payload logging during dev

const SEVERITY_CONFIG = {
    critical: {
        label: "Critical",
        icon: AlertOctagon,
        badge: "bg-red-500/10 text-red-300 border-red-500/30",
        border: "border-l-red-500/70",
        iconColor: "text-red-400",
    },
    warning: {
        label: "Warning",
        icon: AlertTriangle,
        badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
        border: "border-l-amber-500/70",
        iconColor: "text-amber-400",
    },
    high: {
        label: "High",
        icon: AlertCircle,
        badge: "bg-orange-500/10 text-orange-300 border-orange-500/30",
        border: "border-l-orange-500/70",
        iconColor: "text-orange-400",
    },
    low: {
        label: "Low",
        icon: Info,
        badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        border: "border-l-emerald-500/70",
        iconColor: "text-emerald-400",
    },
};

const resolveSeverity = (severity) =>
    SEVERITY_CONFIG[String(severity || "").toLowerCase()] || SEVERITY_CONFIG.low;

const KEYWORD_GROUP_CONFIG = [
    { key: "appearsInSummary", label: "Summary", icon: FileCheck2 },
    { key: "appearsInExperience", label: "Experience", icon: Braces },
    { key: "appearsInProjects", label: "Projects", icon: Layers },
    { key: "appearsInSkills", label: "Skills", icon: Tag },
    { key: "missingEverywhere", label: "Missing everywhere", icon: Ban, danger: true },
];

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
    }),
};

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                      */
/* -------------------------------------------------------------------------- */

function useCountUp(target = 0, active = false, duration = 1200) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!active) return undefined;
        let frame;
        let start = null;
        const to = Math.max(0, Math.min(100, Number(target) || 0));
        const tick = (ts) => {
            if (start === null) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(to * eased));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, active, duration]);
    return value;
}

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                 */
/* -------------------------------------------------------------------------- */

const GlassPanel = memo(function GlassPanel({ className = "", children, as: Component = "div", ...rest }) {
    return (
        <Component
            className={`rounded-3xl border border-black/10 bg-black/[0.035] backdrop-blur-xl shadow-[0_8px_40px_-16px_rgba(83,74,183,0.35)] ${className}`}
            {...rest}
        >
            {children}
        </Component>
    );
});

const EmptyState = memo(function EmptyState({ icon: Icon = Search, title, subtitle }) {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-3 py-10 px-4">
            <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center">
                <Icon size={20} className="text-black/40" aria-hidden="true" />
            </div>
            <div>
                <p className="text-sm font-semibold text-black/70">{title}</p>
                {subtitle && <p className="text-xs text-black/40 mt-1">{subtitle}</p>}
            </div>
        </div>
    );
});

const SectionCard = memo(function SectionCard({ title, icon: Icon, badge, className = "", children }) {
    return (
        <GlassPanel as="section" className={`p-5 sm:p-6 ${className}`}>
            <div className="flex items-center justify-between mb-5">
                <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-black">
                    {Icon && <Icon size={18} className="text-[#A7A0F8]" aria-hidden="true" />}
                    {title}
                </h2>
                {typeof badge === "number" && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#534AB7]/20 text-[#A7A0F8] border border-[#534AB7]/30">
                        {badge}
                    </span>
                )}
            </div>
            {children}
        </GlassPanel>
    );
});

/* -------------------------------------------------------------------------- */
/*  Score gauge — animated radial progress, the signature element             */
/* -------------------------------------------------------------------------- */

const SIZE = 200;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getScoreTier(score) {
    if (score >= 75) return { label: "Strong", color: "#34d399" };
    if (score >= 45) return { label: "Needs work", color: "#fbbf24" };
    return { label: "Weak", color: "#f87171" };
}

const ScoreGauge = memo(function ScoreGauge({ score = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const clamped = Math.max(0, Math.min(100, Number(score) || 0));
    const animated = useCountUp(clamped, inView);
    const tier = useMemo(() => getScoreTier(clamped), [clamped]);
    const offset = CIRCUMFERENCE * (1 - clamped / 100);

    return (
        <div
            ref={ref}
            className="relative flex items-center justify-center w-full"
            role="img"
            aria-label={`Coherence score ${clamped} out of 100, ${tier.label}`}
        >
            <svg width="100%" viewBox={`0 0 ${SIZE} ${SIZE}`} className="max-w-[200px]" aria-hidden="true">
                <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#534AB7" />
                        <stop offset="100%" stopColor={tier.color} />
                    </linearGradient>
                </defs>
                <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={STROKE} />
                <motion.circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                    initial={{ strokeDashoffset: CIRCUMFERENCE }}
                    animate={{ strokeDashoffset: inView ? offset : CIRCUMFERENCE }}
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold tabular-nums text-black">{animated}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider mt-1" style={{ color: tier.color }}>
                    {tier.label}
                </span>
            </div>
        </div>
    );
});

const CoherenceHero = memo(function CoherenceHero({ score }) {
    return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="h-full">
            <GlassPanel className="p-5 sm:p-6 h-full flex flex-col items-center justify-center text-center gap-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black/60">
                    <Sparkles size={16} className="text-[#A7A0F8]" aria-hidden="true" />
                    Coherence score
                </h2>
                <ScoreGauge score={score} />
                <p className="text-xs text-black/40 max-w-[220px]">
                    How well your summary, experience and skills tell one consistent story.
                </p>
            </GlassPanel>
        </motion.div>
    );
});

/* -------------------------------------------------------------------------- */
/*  Status                                                                     */
/* -------------------------------------------------------------------------- */

const StatusCard = memo(function StatusCard({ ok, icon: Icon, title, description, index = 0 }) {
    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={`rounded-2xl border p-4 flex items-start gap-3 ${ok ? "bg-emerald-500/[0.06] border-emerald-500/20" : "bg-red-500/[0.06] border-red-500/20"
                }`}
        >
            <div
                className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${ok ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                    }`}
            >
                <Icon size={18} aria-hidden="true" />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-semibold text-black">{title}</p>
                <p className="text-xs text-black/50 mt-0.5">{description}</p>
            </div>
        </motion.div>
    );
});

const StatusOverview = memo(function StatusOverview({ data }) {
    const toneOk = data?.toneConsistency === "consistent";

    const items = useMemo(
        () => [
            {
                key: "ready",
                ok: Boolean(data?.isReadyToSend),
                icon: Send,
                title: data?.isReadyToSend ? "Ready to send" : "Not ready to send",
                description: data?.isReadyToSend
                    ? "This resume version passes the readiness check."
                    : "Resolve the issues below before sending.",
            },
            {
                key: "summary",
                ok: Boolean(data?.summaryAligned),
                icon: FileCheck2,
                title: data?.summaryAligned ? "Summary aligned" : "Summary misaligned",
                description: data?.summaryAligned
                    ? "Summary reflects the rest of the resume."
                    : "Summary doesn't match the experience below it.",
            },
            {
                key: "tone",
                ok: toneOk,
                icon: Type,
                title: toneOk ? "Tone consistent" : "Tone inconsistent",
                description: `Detected tone: ${data?.toneConsistency || "unknown"}`,
            },
        ],
        [data, toneOk]
    );

    return (
        <GlassPanel className="p-5 sm:p-6 h-full">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-black/60 mb-4">Status</h2>
            <div className="space-y-3">
                {items.map((item, i) => (
                    <StatusCard key={item.key} index={i} {...item} />
                ))}
            </div>
        </GlassPanel>
    );
});

/* -------------------------------------------------------------------------- */
/*  Overall verdict — AI insight panel                                        */
/* -------------------------------------------------------------------------- */

const OverallVerdict = memo(function OverallVerdict({ verdict, className = "" }) {
    if (!verdict) return null;
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className={className}
        >
            <div className="relative overflow-hidden rounded-3xl border border-[#534AB7]/30 bg-gradient-to-br from-[#534AB7]/15 via-black/[0.03] to-transparent p-5 sm:p-6 pl-6 sm:pl-7">
                <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#A7A0F8] to-[#534AB7]"
                    aria-hidden="true"
                />
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A7A0F8] mb-3">
                    <Sparkles size={14} aria-hidden="true" />
                    AI overall verdict
                </p>
                <p className="text-lg sm:text-xl font-medium leading-relaxed text-black/90">{verdict}</p>
            </div>
        </motion.div>
    );
});

/* -------------------------------------------------------------------------- */
/*  Issues — expandable, severity-coded accordion cards                       */
/* -------------------------------------------------------------------------- */

const IssueCard = memo(function IssueCard({ issue, index }) {
    const [open, setOpen] = useState(index === 0);
    const config = resolveSeverity(issue.severity);
    const Icon = config.icon;
    const panelId = `issue-panel-${index}`;

    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            role="listitem"
            className={`rounded-2xl border border-black/10 border-l-4 ${config.border} bg-black/[0.03] hover:bg-black/[0.05] transition-colors overflow-hidden`}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={panelId}
                className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left focus-visible:ring-2 focus-visible:ring-[#A7A0F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B14] outline-none rounded-2xl"
            >
                <div className="flex items-center gap-3 min-w-0">
                    <Icon size={18} className={`shrink-0 ${config.iconColor}`} aria-hidden="true" />
                    <p className="text-sm font-semibold text-black truncate">{issue.section}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${config.badge}`}>
                        {config.label}
                    </span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={16} className="text-black/40" aria-hidden="true" />
                    </motion.span>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-label={`${issue.section} details`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="px-4 sm:px-5 pb-4 sm:pb-5"
                    >
                        <div className="space-y-3">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-black/40 mb-1">Issue</p>
                                <p className="text-sm text-black/80 bg-black/[0.03] border border-black/10 rounded-xl p-3">
                                    {issue.issue}
                                </p>
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-black/40 mb-1">Suggested fix</p>
                                <p className="text-sm text-emerald-300/90 bg-emerald-500/[0.06] border border-emerald-500/20 rounded-xl p-3">
                                    {issue.fix}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

const IssueList = memo(function IssueList({ issues }) {
    if (!issues || issues.length === 0) {
        return (
            <EmptyState
                icon={CheckCircle}
                title="No coherence issues detected"
                subtitle="Your resume tells one consistent story."
            />
        );
    }
    return (
        <div className="space-y-3" role="list" aria-label="Coherence issues">
            {issues.map((issue, idx) => (
                <IssueCard key={issue.id ?? `${issue.section}-${idx}`} issue={issue} index={idx} />
            ))}
        </div>
    );
});

/* -------------------------------------------------------------------------- */
/*  Keyword consistency                                                        */
/* -------------------------------------------------------------------------- */

const KeywordChip = memo(function KeywordChip({ label, danger, index = 0 }) {
    const Icon = danger ? AlertCircle : Hash;
    return (
        <motion.span
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${danger
                ? "bg-red-500/[0.08] border-red-500/25 text-red-300 hover:bg-red-500/[0.14]"
                : "bg-black/[0.04] border-black/10 text-black/80 hover:bg-black/[0.08]"
                }`}
        >
            <Icon size={12} aria-hidden="true" />
            {label}
        </motion.span>
    );
});

const KeywordGroupCard = memo(function KeywordGroupCard({ label, icon: Icon, keywords, danger }) {
    const empty = !keywords || keywords.length === 0;
    return (
        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-black/50 mb-3">
                <Icon size={14} className={danger ? "text-red-400" : "text-[#A7A0F8]"} aria-hidden="true" />
                {label}
            </p>
            {empty ? (
                <p className="text-xs text-black/30 italic">None found</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {keywords.map((kw, idx) => (
                        <KeywordChip key={`${label}-${kw}-${idx}`} label={kw} danger={danger} index={idx} />
                    ))}
                </div>
            )}
        </div>
    );
});

const KeywordConsistencyGrid = memo(function KeywordConsistencyGrid({ keywordConsistency }) {
    const groups = useMemo(
        () =>
            KEYWORD_GROUP_CONFIG.map((cfg) => ({
                ...cfg,
                keywords: keywordConsistency?.[cfg.key] || [],
            })),
        [keywordConsistency]
    );

    const allEmpty = groups.every((g) => g.keywords.length === 0);
    if (allEmpty) {
        return <EmptyState icon={Search} title="No keyword data yet" subtitle="Run the analysis to see keyword coverage." />;
    }

    return (
        <div className="space-y-3">
            {groups.map((group) => (
                <KeywordGroupCard key={group.key} {...group} />
            ))}
        </div>
    );
});

/* -------------------------------------------------------------------------- */
/*  Stage3 — composition root                                                 */
/* -------------------------------------------------------------------------- */

const Stage3 = ({ profileAssebly }) => {
    const data = profileAssebly?.data?.data?.data;


    const issues = data?.issues || [];

    return (
        <section
            className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 text-black bg-white rounded-xl my-3"
            aria-label="Profile coherence analysis"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 sm:gap-5">
                <CoherenceHero score={data?.coherenceScore} />
                <StatusOverview data={data} />
            </div>

            <OverallVerdict verdict={data?.soverallVerdict} className="mt-4 sm:mt-5" />

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] gap-4 sm:gap-5 mt-4 sm:mt-5 items-start">
                <SectionCard title="Coherence issues" icon={Braces} badge={issues.length}>
                    <IssueList issues={issues} />
                </SectionCard>

                <SectionCard title="Keyword consistency" icon={Type}>
                    <KeywordConsistencyGrid keywordConsistency={data?.keywordConsistency} />
                </SectionCard>
            </div>
        </section>
    );
};

export default Stage3;