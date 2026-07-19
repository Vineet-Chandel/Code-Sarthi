import React, { useEffect } from 'react'
import { motion } from "framer-motion";

import {
    Target,
    ShieldCheck,
    TrendingUp,
    ArrowUpRight,
    ListChecks,
    Circle,
    CheckCircle2,
    AlertTriangle,
    AlertCircle,
    Flame,
    ChevronDown,
    BarChart3,
    ScanLine,
    XCircle,
    Sparkles,
    GitCompareArrows,
} from "lucide-react";
const Stage4 = ({ skillGapData }) => {

    useEffect(() => {
        console.log(skillGapData.data.data.data);
    }, [skillGapData])

    return (
        <div className='mt-3'>
            {/* 1. HERO STATISTICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Skill Coverage */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Target className="w-5 h-5" />
                            <span className="text-sm font-medium">Skill Coverage</span>
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-black mb-4">
                        {skillGapData?.data?.data?.data?.skillCoveragePercent ?? 0}%
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skillGapData?.data?.data?.data?.skillCoveragePercent ?? 0}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full bg-black"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                        Percentage of role-required skills currently covered by the candidate
                    </p>
                </motion.div>

                {/* ATS Compatibility */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-gray-500">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-sm font-medium">ATS Compatibility</span>
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-black mb-4">
                        {skillGapData?.data?.data?.data?.atsScanSimulation?.estimatedATSPassRate ?? 0}%
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width: `${skillGapData?.data?.data?.data?.atsScanSimulation?.estimatedATSPassRate ?? 0}%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                            className="h-full rounded-full bg-blue-500"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                        Estimated probability of passing automated resume screening
                    </p>
                </motion.div>

                {/* Improvement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-gray-500">
                            <TrendingUp className="w-5 h-5" />
                            <span className="text-sm font-medium">Improvement</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-8 h-8 text-green-500" />
                        <span className="text-5xl font-bold text-green-500">
                            +{skillGapData?.data?.data?.data?.delta?.improvement ?? 0}%
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                        Projected skill coverage increase after recommended actions
                    </p>
                </motion.div>
            </div>

            {/* 2. REQUIRED SKILLS MATRIX */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-10">
                <div className="flex items-center gap-2 mb-6">
                    <ListChecks className="w-5 h-5 text-gray-700" />
                    <h2 className="text-xl font-semibold text-black">Required Skills Matrix</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillGapData?.data?.data?.data?.roleRequiresSkills?.map((skill, idx) => {
                        const isMatched = skillGapData?.data?.data?.data?.matchedSkills?.includes(skill);
                        const isCriticalMissing = skillGapData?.data?.data?.data?.missingCriticalSkills?.includes(skill);
                        const isPreferredMissing = skillGapData?.data?.data?.data?.missingPreferredSkills?.includes(skill);

                        let badgeClasses = "bg-gray-100 text-gray-500 border-gray-200";
                        let Icon = Circle;
                        let label = "Neutral";

                        if (isMatched) {
                            badgeClasses = "bg-green-50 text-green-600 border-green-200";
                            Icon = CheckCircle2;
                            label = "Matched";
                        } else if (isCriticalMissing) {
                            badgeClasses = "bg-red-50 text-red-600 border-red-200";
                            Icon = AlertTriangle;
                            label = "Critical Missing";
                        } else if (isPreferredMissing) {
                            badgeClasses = "bg-yellow-50 text-yellow-600 border-yellow-200";
                            Icon = AlertCircle;
                            label = "Preferred Missing";
                        }

                        return (
                            <motion.div
                                key={`${skill}-${idx}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.03 }}
                                whileHover={{ y: -2 }}
                                className="rounded-2xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-all duration-300"
                            >
                                <span className="text-sm font-medium text-black truncate pr-3">{skill}</span>
                                <span
                                    className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${badgeClasses}`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 3. FOUR COLUMN LAYOUT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 mt-4">
                    {/* Matched Skills */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <h3 className="text-sm font-semibold text-black">Matched Skills</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {skillGapData?.data?.data?.data?.matchedSkills?.map((skill, idx) => (
                                <motion.div
                                    key={`matched-${idx}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                                    className="rounded-xl border border-green-100 bg-green-50 px-3 py-2 text-xs font-medium text-green-700"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Critical Skills */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <h3 className="text-sm font-semibold text-black">Critical Skills</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {skillGapData?.data?.data?.data?.missingCriticalSkills?.map((skill, idx) => (
                                <motion.div
                                    key={`critical-${idx}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                                    className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
                                >
                                    {skill.skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Preferred Skills */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                            <h3 className="text-sm font-semibold text-black">Preferred Skills</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {skillGapData?.data?.data?.data?.missingPreferredSkills?.map((skill, idx) => (
                                <motion.div
                                    key={`preferred-${idx}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                                    className="rounded-xl border border-yellow-100 bg-yellow-50 px-3 py-2 text-xs font-medium text-yellow-700"
                                >
                                    {skill.skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Irrelevant Skills */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-2 mb-4">
                            <Circle className="w-5 h-5 text-gray-400" />
                            <h3 className="text-sm font-semibold text-black">Irrelevant Skills</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {skillGapData?.data?.data?.data?.irrelevantSkills?.map((skill, idx) => (
                                <motion.div
                                    key={`irrelevant-${idx}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                                    className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600"
                                >
                                    {skill.skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>









            {/* 8. NEWLY MATCHED SKILLS */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-10">
                {/* 6. ATS SCANNER */}
                <div className="rounded-3xl border border-gray-800 bg-black p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-10">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <ScanLine className="w-5 h-5" />
                            <span className="text-sm font-medium">ATS Scanner</span>
                        </div>
                        <div className="text-6xl font-bold text-white">
                            {skillGapData?.data?.data?.data?.atsScanSimulation?.estimatedATSPassRate ?? 0}%
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Estimated ATS Pass Rate</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <h3 className="text-sm font-semibold text-white">Keywords Found</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillGapData?.data?.data?.data?.atsScanSimulation?.keywordsFoundByATS?.map((kw, idx) => (
                                    <span
                                        key={`found-${idx}`}
                                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <XCircle className="w-4 h-4 text-red-400" />
                                <h3 className="text-sm font-semibold text-white">Keywords Missing</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillGapData?.data?.data?.data?.atsScanSimulation?.keywordsNotFound?.map((kw, idx) => (
                                    <span
                                        key={`missing-${idx}`}
                                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-white" />
                            <h3 className="text-sm font-semibold text-white">Recommendation</h3>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {skillGapData?.data?.data?.data?.atsScanSimulation?.recommendation}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    <h2 className="text-xl font-semibold text-black">Newly Matched Skills</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    {skillGapData?.data?.data?.data?.delta?.newlyMatchedSkills?.map((skill, idx) => (
                        <motion.span
                            key={`newly-${idx}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.04 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-200"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            {skill}
                        </motion.span>
                    ))}
                </div>

                {/* 9. STILL MISSING SKILLS */}

                <div className="flex items-center gap-2 mt-6 mb-6">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <h2 className="text-xl font-semibold text-black">Still Missing Skills</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    {skillGapData?.data?.data?.data?.delta?.stillMissing?.map((skill, idx) => (
                        <motion.span
                            key={`stillmissing-${idx}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.04 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-red-50 text-red-700 border border-red-200"
                        >
                            <AlertTriangle className="w-4 h-4" />
                            {skill}
                        </motion.span>
                    ))}
                </div>
                {/* 10. AI RECOMMENDATION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl border border-gray-800 bg-gradient-to-br from-black via-gray-900 to-black p-10 shadow-sm hover:shadow-xl transition-all duration-300 mt-10"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-white" />
                        <span className="text-sm font-medium text-gray-400 tracking-wide uppercase">
                            AI Recommendation
                        </span>
                    </div>
                    <p className="text-2xl md:text-3xl font-semibold text-white leading-snug tracking-tight">
                        {skillGapData?.data?.data?.data?.atsScanSimulation?.recommendation}
                    </p>

                    {/* 4. CRITICAL SKILL DEEP DIVE */}

                    <div className="flex items-center gap-2 mt-6 mb-6">
                        <Flame className="w-5 h-5 text-red-500" />
                        <h2 className="text-xl font-semibold text-white">Skill Acquisation</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        {skillGapData?.data?.data?.data?.missingCriticalSkills?.map((item, idx) => (
                            <motion.details
                                key={`deepdive-${idx}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="group rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all duration-300 open:shadow-md"
                            >
                                <summary className="flex flex-col w-full items-start justify-between cursor-pointer list-none">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-white">
                                            {item.skill}
                                        </span>

                                        <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border bg-red-50 text-red-600 border-red-200">
                                            <AlertTriangle className="w-3.5 h-3.5" />
                                            {item.importance}
                                        </span>
                                    </div>



                                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col w-full gap-3">
                                        <div>
                                            <p className="text-xs font-medium text-white mb-1">
                                                Why it matters
                                            </p>
                                            <p className="text-sm text-white/70">
                                                {item.reason}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-white mb-1">
                                                How to acquire
                                            </p>
                                            <p className="text-sm text-white/70">
                                                {item.howToAcquire}
                                            </p>
                                        </div>
                                    </div>
                                </summary>


                            </motion.details>
                        ))}
                    </div>
                </motion.div>



            </div>




        </div>

    )
}

export default Stage4