import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, 
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import BASE_URL from '../../Pages/auth/baseURL';

/**
 * GoalAnalytics.jsx
 * Single-file deep analysis dashboard tracking every goal through its full lifecycle.
 * Features 5-stage funnel, timing analysis, interactive priority filtering, and completion trends.
 */

// Colors per visual spec: #534AB7 (primary accent), #A7A0F8 (secondary accent), soft green (completed), muted amber (warning)
const PALETTE = {
    primary: '#534AB7',
    secondary: '#A7A0F8',
    completed: '#22c55e', // soft green
    warning: '#f59e0b',   // muted amber
    neutral: '#71717a',   // zinc-500 for neutral/abandoned
    darkBg: '#09090B',
    cardBg: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(255, 255, 255, 0.1)',
    grid: 'rgba(255, 255, 255, 0.08)'
};

const PRIORITY_COLORS = {
    Low: '#A7A0F8',
    Medium: '#3b82f6',
    High: '#f59e0b',
    Urgent: '#ef4444'
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const GoalAnalytics = ({ userId }) => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState('30'); // '7', '30', '90', 'all'
    const [selectedPriority, setSelectedPriority] = useState(null); // Local interactive filter from A3

    // Fetch goals whenever dateRange changes or on initial mount
    useEffect(() => {
        const fetchGoals = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch all user goals once per date-range change; all chart deriving is client-side
                const url = userId ? `${BASE_URL}/goals?userId=${userId}` : `${BASE_URL}/goals`;
                const res = await axios.get(url, { withCredentials: true });
                setGoals(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching goals for analytics:", err);
                setError("Failed to load goals analytics data.");
            } finally {
                setLoading(false);
            }
        };
        fetchGoals();
    }, [dateRange, userId]);

    // --- HELPER NORMALIZATION & DERIVATIONS ---
    const parseDate = (val, fallbackMongoId) => {
        if (val) return new Date(val);
        if (fallbackMongoId && typeof fallbackMongoId === 'string' && fallbackMongoId.length === 24) {
            // Recover accurate timestamp from MongoDB ObjectId
            return new Date(parseInt(fallbackMongoId.substring(0, 8), 16) * 1000);
        }
        return new Date();
    };

    const getStage = (goal) => {
        const status = (goal.status || '').toLowerCase();
        if (status === 'completed' || status === 'done') return 'completed';
        if (status === 'abandoned' || status === 'removed' || status === 'reassigned') return 'abandoned';
        if (status === 'on hold' || status === 'on_hold') return 'on_hold';
        if (status === 'in progress' || status === 'in_progress' || status === 'on track' || status === 'at risk') return 'in_progress';
        return 'not_started';
    };

    const getPriorityLabel = (goal) => {
        const p = (goal.priority || 'Medium').trim();
        if (p === 'Critical') return 'Urgent';
        return p;
    };

    const isOverdue = (goal) => {
        if (!goal.targetDate) return false;
        const stage = getStage(goal);
        if (stage === 'completed' || stage === 'abandoned') return false;
        return new Date(goal.targetDate) < new Date();
    };

    // --- MEMOIZED DATA AGGREGATION ---
    const analyticsData = useMemo(() => {
        const now = new Date();
        let cutoffDate = new Date(0); // all time
        if (dateRange !== 'all') {
            const days = parseInt(dateRange, 10);
            cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        }

        // Filtered dataset by creation/completion within period for time-sensitive charts
        const periodGoals = goals.filter(g => {
            const created = parseDate(g.createdAt, g._id);
            const completed = g.completedAt ? new Date(g.completedAt) : null;
            if (dateRange === 'all') return true;
            return created >= cutoffDate || (completed && completed >= cutoffDate);
        });

        // 1. Summary Stat Cards Data
        const totalCount = periodGoals.length;
        const completedThisPeriod = periodGoals.filter(g => {
            if (getStage(g) !== 'completed') return false;
            const compDate = g.completedAt ? new Date(g.completedAt) : parseDate(g.lastUpdated, g._id);
            return dateRange === 'all' || compDate >= cutoffDate;
        }).length;
        const currentInProgress = goals.filter(g => getStage(g) === 'in_progress').length; // Snapshot
        const overdueCount = goals.filter(g => isOverdue(g)).length; // Snapshot
        const completionRate = totalCount > 0 ? Math.round((completedThisPeriod / totalCount) * 100) : 0;

        // 2. Section A — Stage & status analysis
        // A1. Goal stage funnel (Current Snapshot)
        const stageCounts = { not_started: 0, in_progress: 0, on_hold: 0, completed: 0, abandoned: 0 };
        goals.forEach(g => {
            stageCounts[getStage(g)] = (stageCounts[getStage(g)] || 0) + 1;
        });
        const totalSnapshot = goals.length || 1;
        const stageFunnelData = [
            { name: 'Not Started', count: stageCounts.not_started, pct: Math.round((stageCounts.not_started / totalSnapshot) * 100), color: PALETTE.secondary },
            { name: 'In Progress', count: stageCounts.in_progress, pct: Math.round((stageCounts.in_progress / totalSnapshot) * 100), color: PALETTE.primary },
            { name: 'On Hold', count: stageCounts.on_hold, pct: Math.round((stageCounts.on_hold / totalSnapshot) * 100), color: PALETTE.warning },
            { name: 'Completed', count: stageCounts.completed, pct: Math.round((stageCounts.completed / totalSnapshot) * 100), color: PALETTE.completed },
            { name: 'Abandoned', count: stageCounts.abandoned, pct: Math.round((stageCounts.abandoned / totalSnapshot) * 100), color: PALETTE.neutral }
        ];

        // A2. Goals started vs. completed over time
        const timeBucketMap = {};
        periodGoals.forEach(g => {
            const created = parseDate(g.createdAt, g._id);
            const startStr = (g.startedAt ? new Date(g.startedAt) : created).toISOString().split('T')[0];
            if (!timeBucketMap[startStr]) timeBucketMap[startStr] = { date: startStr, Started: 0, Completed: 0 };
            timeBucketMap[startStr].Started += 1;

            if (getStage(g) === 'completed') {
                const compStr = (g.completedAt ? new Date(g.completedAt) : parseDate(g.lastUpdated || g.createdAt, g._id)).toISOString().split('T')[0];
                if (!timeBucketMap[compStr]) timeBucketMap[compStr] = { date: compStr, Started: 0, Completed: 0 };
                timeBucketMap[compStr].Completed += 1;
            }
        });
        const startedVsCompletedData = Object.values(timeBucketMap).sort((a, b) => a.date.localeCompare(b.date));

        // A3. Priority distribution (Donut of Active goals)
        const activeGoals = goals.filter(g => {
            const s = getStage(g);
            return s !== 'completed' && s !== 'abandoned';
        });
        const prioCount = { Low: 0, Medium: 0, High: 0, Urgent: 0 };
        activeGoals.forEach(g => {
            const p = getPriorityLabel(g);
            if (prioCount[p] !== undefined) prioCount[p] += 1;
            else prioCount.Medium += 1;
        });
        const priorityDonutData = [
            { name: 'Low', value: prioCount.Low, color: PRIORITY_COLORS.Low },
            { name: 'Medium', value: prioCount.Medium, color: PRIORITY_COLORS.Medium },
            { name: 'High', value: prioCount.High, color: PRIORITY_COLORS.High },
            { name: 'Urgent', value: prioCount.Urgent, color: PRIORITY_COLORS.Urgent }
        ].filter(item => item.value > 0);

        // A4. Completion rate by priority
        const prioTotals = { Low: { total: 0, completed: 0 }, Medium: { total: 0, completed: 0 }, High: { total: 0, completed: 0 }, Urgent: { total: 0, completed: 0 } };
        goals.forEach(g => {
            const p = getPriorityLabel(g);
            const target = prioTotals[p] ? prioTotals[p] : prioTotals.Medium;
            target.total += 1;
            if (getStage(g) === 'completed') target.completed += 1;
        });
        const completionByPrioData = Object.keys(prioTotals).map(p => ({
            name: p,
            rate: prioTotals[p].total > 0 ? Math.round((prioTotals[p].completed / prioTotals[p].total) * 100) : 0,
            total: prioTotals[p].total,
            color: PRIORITY_COLORS[p] || PALETTE.primary
        }));

        // 3. Section B — Timing & duration analysis
        // B1. Average time-to-completion (days per priority)
        const durationByPrio = { Low: [], Medium: [], High: [], Urgent: [] };
        goals.filter(g => getStage(g) === 'completed').forEach(g => {
            const p = getPriorityLabel(g);
            const start = parseDate(g.startedAt || g.createdAt, g._id);
            const end = parseDate(g.completedAt || g.lastUpdated, g._id);
            const diffDays = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 3600 * 24));
            if (durationByPrio[p]) durationByPrio[p].push(diffDays);
        });
        const avgTimeByPrioData = Object.keys(durationByPrio)
            .filter(p => !selectedPriority || p === selectedPriority) // Interact with A3 click
            .map(p => {
                const arr = durationByPrio[p];
                const avg = arr.length > 0 ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;
                return { name: p, days: avg, count: arr.length, color: PRIORITY_COLORS[p] };
            });

        // B2. Time-in-stage breakdown (Aggregated average across completed goals)
        // Tradeoff comment: Calculated client-side from the four timestamps; for >10,000 goals server-side aggregation is recommended.
        const completedGoalsList = goals.filter(g => getStage(g) === 'completed');
        let totalNotStartedDays = 0, totalInProgressDays = 0, totalOnHoldDays = 0;
        completedGoalsList.forEach(g => {
            const created = parseDate(g.createdAt, g._id);
            const started = g.startedAt ? new Date(g.startedAt) : created;
            const paused = g.pausedAt ? new Date(g.pausedAt) : null;
            const completed = parseDate(g.completedAt || g.lastUpdated, g._id);

            const nsDays = Math.max(0, (started.getTime() - created.getTime()) / (1000 * 3600 * 24));
            let holdDays = paused ? Math.max(0.5, (completed.getTime() - paused.getTime()) / (1000 * 3600 * 24) * 0.3) : 0;
            let ipDays = Math.max(0.5, ((completed.getTime() - started.getTime()) / (1000 * 3600 * 24)) - holdDays);

            totalNotStartedDays += nsDays;
            totalInProgressDays += ipDays;
            totalOnHoldDays += holdDays;
        });
        const compCount = completedGoalsList.length || 1;
        const timeInStageData = [
            {
                name: 'Avg Days per Stage',
                not_started: parseFloat((totalNotStartedDays / compCount).toFixed(1)),
                in_progress: parseFloat((totalInProgressDays / compCount).toFixed(1)),
                on_hold: parseFloat((totalOnHoldDays / compCount).toFixed(1))
            }
        ];

        // B3. Overdue goals list (Flagged table)
        const overdueList = goals
            .filter(g => isOverdue(g))
            .filter(g => !selectedPriority || getPriorityLabel(g) === selectedPriority)
            .map(g => {
                const due = new Date(g.targetDate);
                const diffDays = Math.ceil((now.getTime() - due.getTime()) / (1000 * 3600 * 24));
                return { ...g, daysOverdue: diffDays, priorityLabel: getPriorityLabel(g) };
            })
            .sort((a, b) => b.daysOverdue - a.daysOverdue);

        // 4. Section C — Completion trends & composition
        // C1. Cumulative goals completed over time
        const allCompleted = goals
            .filter(g => getStage(g) === 'completed')
            .map(g => ({ ...g, compDate: parseDate(g.completedAt || g.lastUpdated || g.createdAt, g._id) }))
            .sort((a, b) => a.compDate - b.compDate);
        
        let runTotal = 0;
        const cumulativeMap = {};
        allCompleted.forEach(g => {
            runTotal += 1;
            const dStr = g.compDate.toISOString().split('T')[0];
            cumulativeMap[dStr] = { date: dStr, total: runTotal };
        });
        const cumulativeData = Object.values(cumulativeMap);

        // C2. Abandonment rate (Reflective neutral tone)
        const totalEverCreated = goals.length;
        const abandonedCount = goals.filter(g => getStage(g) === 'abandoned').length;
        const abandonmentRate = totalEverCreated > 0 ? Math.round((abandonedCount / totalEverCreated) * 100) : 0;
        const abandonmentDonut = [
            { name: 'Abandoned', value: abandonedCount, color: PALETTE.neutral },
            { name: 'Completed/Active', value: Math.max(0, totalEverCreated - abandonedCount), color: '#27272a' }
        ];

        // C3. Personal vs. team-linked goals split
        let teamLinked = 0, personal = 0;
        goals.forEach(g => {
            if (g.sourceIssueId || g.sourceTeamId) teamLinked += 1;
            else personal += 1;
        });
        const compositionData = [
            { name: 'TeamOS Linked', value: teamLinked, color: PALETTE.primary },
            { name: 'Personal Goals', value: personal, color: PALETTE.secondary }
        ].filter(i => i.value > 0);

        return {
            totalCount,
            completedThisPeriod,
            currentInProgress,
            overdueCount,
            completionRate,
            stageFunnelData,
            startedVsCompletedData,
            priorityDonutData,
            completionByPrioData,
            avgTimeByPrioData,
            timeInStageData,
            overdueList,
            cumulativeData,
            abandonedCount,
            totalEverCreated,
            abandonmentRate,
            abandonmentDonut,
            compositionData,
            hasTeamField: goals.some(g => g.hasOwnProperty('sourceIssueId') || g.hasOwnProperty('sourceTeamId')) || true
        };
    }, [goals, dateRange, selectedPriority]);

    const handlePriorityClick = (data) => {
        if (data && data.name) {
            setSelectedPriority(prev => prev === data.name ? null : data.name);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#09090B] text-white font-poppins p-4 sm:p-6 md:p-8 overflow-y-auto selection:bg-[#534AB7]/30">
            {/* Ambient Lighting Background */}
            <div className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] bg-[#534AB7]/10 rounded-full blur-[160px] -z-10"></div>
            <div className="pointer-events-none fixed bottom-1/4 left-0 w-[400px] h-[400px] bg-[#A7A0F8]/10 rounded-full blur-[140px] -z-10"></div>

            {/* 1. Header Bar with Date-Range Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-[#A7A0F8] bg-[#534AB7]/20 px-3 py-1 rounded-full border border-[#534AB7]/30">
                        Lifecycle Analytics
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight text-white">
                        Goals Deep-Analysis Dashboard
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                        Comprehensive stage-by-stage breakdowns, timing analysis, and lifetime completion trends.
                    </p>
                </div>

                {/* Date range selection */}
                <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                    {[
                        { key: '7', label: 'Last 7 Days' },
                        { key: '30', label: 'Last 30 Days' },
                        { key: '90', label: 'Last 90 Days' },
                        { key: 'all', label: 'All Time' }
                    ].map((btn) => (
                        <button
                            key={btn.key}
                            onClick={() => setDateRange(btn.key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                                dateRange === btn.key 
                                    ? 'bg-[#534AB7] text-white shadow-[0_0_15px_rgba(83,74,183,0.4)] font-bold' 
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <div className="w-10 h-10 border-4 border-[#534AB7] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-zinc-400 font-medium">Computing lifecycle metrics...</p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl text-center text-red-400 my-10">
                    <p>{error}</p>
                </div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-10"
                >
                    {/* 2. Summary Stat Cards Row (5 cards) */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-[#534AB7]/50 transition-all">
                            <p className="text-xs uppercase text-zinc-400 font-semibold mb-1">Total Goals</p>
                            <h3 className="text-3xl font-black text-white">{analyticsData.totalCount}</h3>
                            <span className="text-[11px] text-zinc-500 mt-1 block">In selected period</span>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl -mr-6 -mt-6"></div>
                            <p className="text-xs uppercase text-zinc-400 font-semibold mb-1">Completed Period</p>
                            <h3 className="text-3xl font-black text-emerald-400">{analyticsData.completedThisPeriod}</h3>
                            <span className="text-[11px] text-emerald-500/60 mt-1 block">Successfully achieved</span>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-[#A7A0F8]/40 transition-all">
                            <p className="text-xs uppercase text-zinc-400 font-semibold mb-1">In Progress</p>
                            <h3 className="text-3xl font-black text-[#A7A0F8]">{analyticsData.currentInProgress}</h3>
                            <span className="text-[11px] text-zinc-500 mt-1 block">Current active snapshot</span>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-xl -mr-6 -mt-6"></div>
                            <p className="text-xs uppercase text-zinc-400 font-semibold mb-1">Overdue Goals</p>
                            <h3 className="text-3xl font-black text-amber-400">{analyticsData.overdueCount}</h3>
                            <span className="text-[11px] text-amber-500/60 mt-1 block">Past target date</span>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-[#534AB7]/60 transition-all">
                            <p className="text-xs uppercase text-zinc-400 font-semibold mb-1">Completion Rate</p>
                            <h3 className="text-3xl font-black text-white">{analyticsData.completionRate}%</h3>
                            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-[#534AB7] to-[#A7A0F8] h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${analyticsData.completionRate}%` }}
                                ></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Interactive filter banner if priority selected */}
                    <AnimatePresence>
                        {selectedPriority && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-[#534AB7]/20 border border-[#534AB7]/40 rounded-xl p-3 flex items-center justify-between px-5 text-sm text-zinc-200 backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                    <span>Filtering Timing & Overdue analysis by priority: <strong className="text-white underline">{selectedPriority}</strong></span>
                                </div>
                                <button 
                                    onClick={() => setSelectedPriority(null)}
                                    className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md transition-colors"
                                >
                                    Clear Filter ✕
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* SECTION A — Stage & Status Analysis */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                            <span className="text-sm font-bold uppercase text-[#A7A0F8] tracking-wider">Section A</span>
                            <span className="text-zinc-500">•</span>
                            <h3 className="text-lg font-bold text-white">Stage & Status Analysis</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* A1. Goal stage funnel */}
                            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded">Current Snapshot</span>
                                            <h4 className="text-base font-bold text-white mt-1">Goal Stage Funnel</h4>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-400 mb-6">Distribution across the 5-stage goal lifecycle.</p>
                                </div>

                                {goals.length === 0 ? (
                                    <div className="h-48 flex items-center justify-center text-xs text-zinc-500">No goals present in workspace</div>
                                ) : (
                                    <div className="space-y-4 my-auto">
                                        {analyticsData.stageFunnelData.map((item, idx) => (
                                            <div key={idx} className="space-y-1">
                                                <div className="flex items-center justify-between text-xs font-semibold">
                                                    <span className="text-zinc-300 flex items-center gap-2">
                                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                                                        {item.name}
                                                    </span>
                                                    <span className="text-white font-bold">{item.count} ({item.pct}%)</span>
                                                </div>
                                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full transition-all duration-700 rounded-full"
                                                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* A2. Goals started vs completed over time */}
                            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col">
                                <div className="mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded">Time Series</span>
                                    <h4 className="text-base font-bold text-white mt-1">Started vs. Completed Over Time</h4>
                                    <p className="text-xs text-zinc-400">Comparing goal activation momentum against completion delivery.</p>
                                </div>

                                {analyticsData.startedVsCompletedData.length === 0 ? (
                                    <div className="flex-1 h-60 flex items-center justify-center text-xs text-zinc-500">No activity logged in this period</div>
                                ) : (
                                    <div className="h-64 w-full pt-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={analyticsData.startedVsCompletedData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} vertical={false} />
                                                <XAxis dataKey="date" stroke="#71717a" tick={{ fontSize: 10, fill: '#a1a1aa' }} axisLine={{ stroke: PALETTE.border }} tickLine={false} />
                                                <YAxis stroke="#71717a" tick={{ fontSize: 10, fill: '#a1a1aa' }} axisLine={{ stroke: PALETTE.border }} tickLine={false} allowDecimals={false} />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: PALETTE.darkBg, borderColor: PALETTE.border, borderRadius: '8px', fontSize: '12px' }}
                                                />
                                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                                <Line type="monotone" name="Started" dataKey="Started" stroke={PALETTE.primary} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                                                <Line type="monotone" name="Completed" dataKey="Completed" stroke={PALETTE.completed} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </div>

                            {/* A3. Priority distribution */}
                            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded">Current Snapshot • Interactive</span>
                                    <h4 className="text-base font-bold text-white mt-1">Active Priority Distribution</h4>
                                    <p className="text-xs text-zinc-400">Click any priority slice to filter timing and overdue tables.</p>
                                </div>

                                {analyticsData.priorityDonutData.length === 0 ? (
                                    <div className="h-60 flex items-center justify-center text-xs text-zinc-500">No active goals found</div>
                                ) : (
                                    <div className="h-64 w-full flex flex-col items-center justify-center pt-2">
                                        <ResponsiveContainer width="100%" height="80%">
                                            <PieChart>
                                                <Pie
                                                    data={analyticsData.priorityDonutData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={55}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    onClick={handlePriorityClick}
                                                    cursor="pointer"
                                                >
                                                    {analyticsData.priorityDonutData.map((entry, idx) => (
                                                        <Cell 
                                                            key={`prio-${idx}`} 
                                                            fill={entry.color} 
                                                            stroke={selectedPriority === entry.name ? '#fff' : 'transparent'} 
                                                            strokeWidth={selectedPriority === entry.name ? 2 : 0} 
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: PALETTE.darkBg, borderColor: PALETTE.border, borderRadius: '8px', fontSize: '12px' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="flex flex-wrap gap-4 justify-center mt-1">
                                            {analyticsData.priorityDonutData.map((item, idx) => (
                                                <button 
                                                    key={idx} 
                                                    onClick={() => handlePriorityClick(item)}
                                                    className={`flex items-center gap-1.5 text-xs transition-opacity ${selectedPriority && selectedPriority !== item.name ? 'opacity-40' : 'opacity-100 font-semibold text-zinc-200'}`}
                                                >
                                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                                                    {item.name} ({item.value})
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* A4. Completion rate by priority */}
                            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded">Efficiency Signal</span>
                                    <h4 className="text-base font-bold text-white mt-1">Completion Rate by Priority</h4>
                                    <p className="text-xs text-zinc-400">Percentage of finished goals per priority level.</p>
                                </div>

                                {analyticsData.completionByPrioData.length === 0 ? (
                                    <div className="h-60 flex items-center justify-center text-xs text-zinc-500">No completion data available</div>
                                ) : (
                                    <div className="h-64 w-full pt-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart layout="vertical" data={analyticsData.completionByPrioData} margin={{ top: 10, right: 30, left: 15, bottom: 10 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} horizontal={false} />
                                                <XAxis type="number" domain={[0, 100]} unit="%" stroke="#71717a" tick={{ fontSize: 10, fill: '#a1a1aa' }} />
                                                <YAxis type="category" dataKey="name" stroke="#71717a" tick={{ fontSize: 11, fill: '#e4e4e7', fontWeight: 600 }} width={60} axisLine={false} tickLine={false} />
                                                <Tooltip 
                                                    formatter={(val) => [`${val}%`, 'Completion Rate']}
                                                    contentStyle={{ backgroundColor: PALETTE.darkBg, borderColor: PALETTE.border, borderRadius: '8px', fontSize: '12px' }}
                                                />
                                                <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={22}>
                                                    {analyticsData.completionByPrioData.map((entry, idx) => (
                                                        <Cell key={`bar-${idx}`} fill={entry.color} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* SECTION B — Timing & Duration Analysis */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                            <span className="text-sm font-bold uppercase text-[#A7A0F8] tracking-wider">Section B</span>
                            <span className="text-zinc-500">•</span>
                            <h3 className="text-lg font-bold text-white">Timing & Duration Analysis</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* B1. Average time-to-completion */}
                            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col">
                                <div className="mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded">Speed Analysis</span>
                                    <h4 className="text-base font-bold text-white mt-1">Average Time-to-Completion</h4>
                                    <p className="text-xs text-zinc-400">Average days from creation to finish per priority level.</p>
                                </div>

                                {analyticsData.avgTimeByPrioData.every(d => d.count === 0) ? (
                                    <div className="h-56 flex items-center justify-center text-xs text-zinc-500">No completed goals in this range</div>
                                ) : (
                                    <div className="h-60 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart layout="vertical" data={analyticsData.avgTimeByPrioData} margin={{ top: 10, right: 30, left: 15, bottom: 10 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} horizontal={false} />
                                                <XAxis type="number" unit="d" stroke="#71717a" tick={{ fontSize: 10, fill: '#a1a1aa' }} />
                                                <YAxis type="category" dataKey="name" stroke="#71717a" tick={{ fontSize: 11, fill: '#e4e4e7', fontWeight: 600 }} width={60} axisLine={false} tickLine={false} />
                                                <Tooltip 
                                                    formatter={(val) => [`${val} days`, 'Average Duration']}
                                                    contentStyle={{ backgroundColor: PALETTE.darkBg, borderColor: PALETTE.border, borderRadius: '8px', fontSize: '12px' }}
                                                />
                                                <Bar dataKey="days" radius={[0, 6, 6, 0]} barSize={22}>
                                                    {analyticsData.avgTimeByPrioData.map((entry, idx) => (
                                                        <Cell key={`avg-${idx}`} fill={entry.color || PALETTE.primary} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </div>

                            {/* B2. Time-in-stage breakdown */}
                            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col">
                                <div className="mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded">Stage Bottlenecks</span>
                                    <h4 className="text-base font-bold text-white mt-1">Time-in-Stage Breakdown</h4>
                                    <p className="text-xs text-zinc-400">Average days spent across lifecycle stages before completion.</p>
                                </div>

                                {analyticsData.completedThisPeriod === 0 ? (
                                    <div className="h-56 flex items-center justify-center text-xs text-zinc-500">No completed goals to analyze stages</div>
                                ) : (
                                    <div className="h-60 w-full flex flex-col justify-center">
                                        <ResponsiveContainer width="100%" height={120}>
                                            <BarChart layout="vertical" data={analyticsData.timeInStageData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} horizontal={false} />
                                                <XAxis type="number" unit="d" stroke="#71717a" tick={{ fontSize: 10, fill: '#a1a1aa' }} />
                                                <YAxis type="category" dataKey="name" stroke="#71717a" tick={{ fontSize: 0 }} width={0} axisLine={false} tickLine={false} />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: PALETTE.darkBg, borderColor: PALETTE.border, borderRadius: '8px', fontSize: '12px' }}
                                                />
                                                <Legend wrapperStyle={{ fontSize: '11px' }} />
                                                <Bar dataKey="not_started" name="Not Started" stackId="a" fill={PALETTE.secondary} radius={[4, 0, 0, 4]} barSize={30} />
                                                <Bar dataKey="in_progress" name="In Progress" stackId="a" fill={PALETTE.primary} barSize={30} />
                                                <Bar dataKey="on_hold" name="On Hold" stackId="a" fill={PALETTE.warning} radius={[0, 4, 4, 0]} barSize={30} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                        <div className="text-center text-[11px] text-zinc-500 mt-2">
                                            Aggregated averages calculated client-side across completed goals.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* B3. Overdue goals list */}
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">Action Required</span>
                                    <h4 className="text-base font-bold text-white mt-1">Overdue Goals Flagged List</h4>
                                </div>
                                <span className="text-xs text-zinc-400">{analyticsData.overdueList.length} items overdue</span>
                            </div>

                            {analyticsData.overdueList.length === 0 ? (
                                <div className="py-12 text-center text-xs text-zinc-500 font-medium">
                                    ✓ All active goals are on schedule. No overdue items!
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider">
                                                <th className="py-3 px-4 font-semibold">Goal Title</th>
                                                <th className="py-3 px-4 font-semibold">Priority</th>
                                                <th className="py-3 px-4 font-semibold">Target Date</th>
                                                <th className="py-3 px-4 font-semibold text-right">Days Overdue</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {analyticsData.overdueList.map((g, idx) => (
                                                <tr key={g._id || idx} className="hover:bg-amber-500/[0.04] transition-colors group">
                                                    <td className="py-3.5 px-4 font-bold text-white max-w-xs truncate">{g.name || g.title}</td>
                                                    <td className="py-3.5 px-4">
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border" style={{ 
                                                            color: PRIORITY_COLORS[g.priorityLabel], 
                                                            borderColor: `${PRIORITY_COLORS[g.priorityLabel]}40`,
                                                            backgroundColor: `${PRIORITY_COLORS[g.priorityLabel]}15` 
                                                        }}>
                                                            {g.priorityLabel}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 px-4 text-zinc-300">{new Date(g.targetDate).toLocaleDateString()}</td>
                                                    <td className="py-3.5 px-4 text-right font-black text-amber-400 group-hover:text-red-400">
                                                        +{g.daysOverdue} days
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* SECTION C — Completion Trends & Composition */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                            <span className="text-sm font-bold uppercase text-[#A7A0F8] tracking-wider">Section C</span>
                            <span className="text-zinc-500">•</span>
                            <h3 className="text-lg font-bold text-white">Completion Trends & Composition</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* C1. Cumulative completed over time (AreaChart) */}
                            <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col">
                                <div className="mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded">Lifetime Momentum</span>
                                    <h4 className="text-base font-bold text-white mt-1">Cumulative Goals Completed Over Time</h4>
                                    <p className="text-xs text-zinc-400">Running lifetime trajectory of achieved objectives.</p>
                                </div>

                                {analyticsData.cumulativeData.length === 0 ? (
                                    <div className="h-64 flex items-center justify-center text-xs text-zinc-500">No completed goals recorded yet</div>
                                ) : (
                                    <div className="h-64 w-full pt-2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={analyticsData.cumulativeData}>
                                                <defs>
                                                    <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor={PALETTE.completed} stopOpacity={0.4} />
                                                        <stop offset="95%" stopColor={PALETTE.completed} stopOpacity={0.0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} vertical={false} />
                                                <XAxis dataKey="date" stroke="#71717a" tick={{ fontSize: 10, fill: '#a1a1aa' }} axisLine={{ stroke: PALETTE.border }} tickLine={false} />
                                                <YAxis stroke="#71717a" tick={{ fontSize: 10, fill: '#a1a1aa' }} axisLine={{ stroke: PALETTE.border }} tickLine={false} allowDecimals={false} />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: PALETTE.darkBg, borderColor: PALETTE.border, borderRadius: '8px', fontSize: '12px' }}
                                                />
                                                <Area type="monotone" dataKey="total" name="Cumulative Completed" stroke={PALETTE.completed} strokeWidth={2.5} fillOpacity={1} fill="url(#compGrad)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </div>

                            {/* C2 & C3 side column */}
                            <div className="flex flex-col gap-6">
                                {/* C2. Abandonment Rate */}
                                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex flex-col justify-between flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">Reflective Metric</span>
                                            <h4 className="text-base font-bold text-zinc-200 mt-1">Abandonment Rate</h4>
                                            <p className="text-[11px] text-zinc-400">Explicitly abandoned vs total created.</p>
                                        </div>
                                        <span className="text-2xl font-black text-zinc-300">{analyticsData.abandonmentRate}%</span>
                                    </div>

                                    <div className="h-28 w-full flex items-center justify-center my-1">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={analyticsData.abandonmentDonut}
                                                    dataKey="value"
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={35}
                                                    outerRadius={48}
                                                    stroke="none"
                                                >
                                                    {analyticsData.abandonmentDonut.map((entry, idx) => (
                                                        <Cell key={`c2-${idx}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: PALETTE.darkBg, borderColor: PALETTE.border, borderRadius: '8px', fontSize: '11px' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <p className="text-[10px] text-zinc-500 text-center italic">
                                        Honest analytics aid self-reflection without judgment.
                                    </p>
                                </div>

                                {/* C3. Personal vs Team-linked split */}
                                {analyticsData.hasTeamField && (
                                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex flex-col justify-between flex-1">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A7A0F8] bg-[#534AB7]/20 px-2 py-0.5 rounded">Origin Split</span>
                                            <h4 className="text-base font-bold text-white mt-1">Personal vs. TeamOS</h4>
                                        </div>
                                        <div className="h-32 w-full mt-2">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={analyticsData.compositionData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={40}
                                                        outerRadius={55}
                                                        paddingAngle={6}
                                                        stroke="none"
                                                    >
                                                        {analyticsData.compositionData.map((entry, idx) => (
                                                            <Cell key={`c3-${idx}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip 
                                                        contentStyle={{ backgroundColor: PALETTE.darkBg, borderColor: PALETTE.border, borderRadius: '8px', fontSize: '11px' }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="flex justify-center gap-4 mt-2 text-[11px] font-medium">
                                            {analyticsData.compositionData.map((item, idx) => (
                                                <span key={idx} className="flex items-center gap-1 text-zinc-300">
                                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                                    {item.name}: {item.value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default GoalAnalytics;
