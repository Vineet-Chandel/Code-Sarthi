import React from 'react'
import { motion } from "framer-motion";

import {
    CheckCircle,
    XCircle,
    Type,
    Sparkles,
    FileWarning,
    Braces,
} from "lucide-react";
const severityStyles = {
    critical: {
        bg: "bg-red-50",
        badge: "bg-red-600 text-white",
        border: "border-red-300",
    },
    warning: {
        bg: "bg-yellow-50",
        badge: "bg-yellow-500 text-black",
        border: "border-yellow-300",
    },
    HIGH: {
        bg: "bg-orange-50",
        badge: "bg-orange-500 text-white",
        border: "border-orange-300",
    },
    low: {
        bg: "bg-green-50",
        badge: "bg-green-500 text-white",
        border: "border-green-300",
    },
};

function StatusPill({ ok, trueLabel, falseLabel }) {
    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${ok ? "bg-green-500 text-white" : "bg-red-600 text-white"
                }`}
        >
            {ok ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {ok ? trueLabel : falseLabel}
        </span>
    );
}

function ToneBadge({ tone }) {
    const isConsistent = tone === "consistent";
    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${isConsistent ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                }`}
        >
            <Type size={16} />
            Tone: {tone || "unknown"}
        </span>
    );
}

function ScoreGauge({ score = 0 }) {
    const clamped = Math.max(0, Math.min(100, score));
    const verdictColor =
        clamped >= 60 ? "#22c55e" : clamped >= 30 ? "#eab308" : "#ef4444";

    return (
        <div className="flex items-end gap-6">
            <div className="h-[160px] w-[160px] border-l border-b border-black/20 flex items-end justify-around">
                <div className="h-full flex flex-col justify-end items-center w-16">
                    <span className="mb-1 font-bold">{clamped}</span>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${clamped}%` }}
                        transition={{ duration: 1, ease: "easeInOut", type: "spring" }}
                        style={{ backgroundColor: verdictColor }}
                        className="w-full flex items-start justify-center rounded-t-md"
                    >
                        <span className="rotate-[270deg] text-white text-[10px] font-extrabold mt-6 whitespace-nowrap">
                            SCORE
                        </span>
                    </motion.div>
                </div>
                <div className="h-full flex flex-col justify-end items-center w-16">
                    <span className="mb-1 font-bold">100</span>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut", type: "spring" }}
                        className="w-full bg-black rounded-t-md flex items-start justify-center"
                    >
                        <span className="rotate-[270deg] text-white text-[10px] font-extrabold mt-6 whitespace-nowrap">
                            IDEAL
                        </span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function KeywordGroup({ label, keywords, tone = "neutral" }) {
    const empty = !keywords || keywords.length === 0;
    const chipClass =
        tone === "danger"
            ? "bg-red-100 border-red-300 text-red-700"
            : "bg-black/5 border-black/20 text-black";

    return (
        <div className="bg-white rounded-xl p-4 border border-black/10">
            <p className="font-semibold text-sm text-gray-600 mb-2">{label}</p>
            {empty ? (
                <span className="text-sm text-gray-400 italic">None found</span>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {keywords.map((kw, idx) => (
                        <span
                            key={idx}
                            className={`px-3 py-1 rounded-full border text-sm ${chipClass}`}
                        >
                            {kw}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

const Stage3 = ({ profileAssebly }) => {
    return (
        (<div className="mt-7 px-2 grid grid-cols-2 gap-2">

            <div className="w-full bg-white/10 rounded-3xl flex flex-wrap items-center gap-4 p-5 col-span-2 md:col-span-1">
                <div className="text-black bg-white rounded-2xl p-4 flex-1 min-w-[220px]">
                    <p className="flex text-xl mb-3 items-center gap-2 font-extrabold">
                        <Sparkles size={22} /> Coherence Score
                    </p>
                    <ScoreGauge score={profileAssebly?.data?.data?.data?.coherenceScore} />
                </div>
            </div>

            <div className="w-full bg-white rounded-3xl p-5 text-black flex flex-col justify-center gap-3">
                <p className="text-xl font-extrabold mb-1">Status</p>
                <div className="flex flex-wrap gap-2">
                    <StatusPill
                        ok={profileAssebly?.data?.data?.data?.isReadyToSend}
                        trueLabel="Ready to send"
                        falseLabel="Not ready to send"
                    />
                    <StatusPill
                        ok={profileAssebly?.data?.data?.data?.summaryAligned}
                        trueLabel="Summary aligned"
                        falseLabel="Summary misaligned"
                    />
                    <ToneBadge tone={profileAssebly?.data?.data?.data?.toneConsistency} />
                </div>
            </div>

            {/* Overall verdict */}
            <div className="w-full bg-white px-5 py-4 rounded-3xl col-span-2">
                <p className="flex text-xl mb-2 items-center gap-2 font-extrabold text-black">
                    <FileWarning size={22} /> Overall Verdict
                </p>
                <p className="text-black">{profileAssebly?.data?.data?.data?.soverallVerdict}</p>
            </div>

            {/* Issues */}
            <div className="w-full bg-white p-5 rounded-3xl col-span-2">
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-5 text-black">
                    <Braces size={22} /> Coherence Issues
                </h2>

                <div className="space-y-5">
                    {profileAssebly?.data?.data?.data?.issues?.length === 0 && (
                        <p className="text-gray-500 italic">No issues found.</p>
                    )}
                    {profileAssebly?.data?.data?.data?.issues?.map((issue, idx) => {
                        const style = severityStyles[issue.severity] || severityStyles.low;
                        return (
                            <div
                                key={idx}
                                className={`${style.bg} ${style.border} text-black border rounded-2xl p-5`}
                            >
                                <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
                                    <span className="px-3 py-1 bg-white rounded-full border text-sm font-semibold">
                                        {issue.section}
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${style.badge}`}
                                    >
                                        {issue.severity}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <p className="font-semibold text-gray-700 mb-1">Issue</p>
                                    <div className="bg-white rounded-lg p-3 border">
                                        {issue.issue}
                                    </div>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-700 mb-1">
                                        Suggested Fix
                                    </p>
                                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-green-700">
                                        {issue.fix}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Keyword consistency matrix */}
            <div className="w-full bg-white p-5 rounded-3xl col-span-2">
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-5 text-black">
                    <Type size={22} /> Keyword Consistency
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <KeywordGroup
                        label="Appears in Summary"
                        keywords={profileAssebly?.data?.data?.data?.keywordConsistency?.appearsInSummary}
                    />
                    <KeywordGroup
                        label="Appears in Experience"
                        keywords={profileAssebly?.data?.data?.data?.keywordConsistency?.appearsInExperience}
                    />
                    <KeywordGroup
                        label="Appears in Projects"
                        keywords={profileAssebly?.data?.data?.data?.keywordConsistency?.appearsInProjects}
                    />
                    <KeywordGroup
                        label="Appears in Skills"
                        keywords={profileAssebly?.data?.data?.data?.keywordConsistency?.appearsInSkills}
                    />
                    <KeywordGroup
                        label="Missing Everywhere"
                        keywords={profileAssebly?.data?.data?.data?.keywordConsistency?.missingEverywhere}
                        tone="danger"
                    />
                </div>
            </div>
        </div>)
    )
}

export default Stage3