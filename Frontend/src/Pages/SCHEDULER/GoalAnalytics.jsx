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
 * Rebuilt with monochrome visual language (#000000 panels, #FFFFFF positive accent) and cross-stage jump navigation.
 */

// Monochrome palette: #FFFFFF reserved for completed/positive/primary emphasis, zinc grays for secondary elements
const PALETTE = {
    completed: '#FFFFFF',    // positive focus accent
    in_progress: '#A1A1AA',  // zinc-400
    on_hold: '#71717A',      // zinc-500
    not_started: '#52525B',  // zinc-600
    abandoned: '#3F3F46',    // zinc-700
    darkBg: '#000000',
    cardBg: '#000000',
    border: 'rgba(255, 255, 255, 0.06)',
    grid: 'rgba(255, 255, 255, 0.06)'
};

const PRIORITY_COLORS = {
    Urgent: '#FFFFFF',
    High: '#D4D4D8',
    Medium: '#71717A',
    Low: '#3F3F46'
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const GoalAnalytics = ({ userId, externalGoals = null, dateRange: propDateRange, setDateRange: propSetDateRange, onJumpToCalendarDate }) => {
    const [fetchedGoals, setFetchedGoals] = useState([]);
    const [loading, setLoading] = useState(externalGoals === null);
    const [error, setError] = useState(null);

    // Fallback local state if not provided by parent
    const [localDateRange, setLocalDateRange] = useState('30');
    const dateRange = propDateRange || localDateRange;
    const setDateRange = propSetDateRange || setLocalDateRange;

    // Interactive filter for charts (click A3 pie to filter B section)
    const [selectedPriority, setSelectedPriority] = useState(null);

    const goals = externalGoals !== null ? externalGoals : fetchedGoals;

    useEffect(() => {
        if (externalGoals !== null) {
            setLoading(false);
            return;
        }
        const fetchGoals = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BASE_URL}/goals`, { withCredentials: true });
                setFetchedGoals(res.data || []);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch analytics goals:", err);
                setError("Unable to load goal data. Please check connection.");
            } finally {
                setLoading(false);
            }
        };
        fetchGoals();
    }, [userId, externalGoals]);

    // Parse date safely with ObjectId timestamp fallback
    const parseDate = (dateVal, fallbackId) => {
        if (dateVal) {
            const d = new Date(dateVal);
            if (!isNaN(d.getTime())) return d;
        }
        if (fallbackId && typeof fallbackId === 'string' && fallbackId.length === 24) {
            const timestamp = parseInt(fallbackId.substring(0, 8), 16) * 1000;
            return new Date(timestamp);
        }
        return new Date();
    };

    // Determine lifecycle stage from status
    const getStage = (goal) => {
        const s = (goal.status || '').toLowerCase();
        if (['completed', 'done'].includes(s)) return 'completed';
        if (['abandoned', 'cancelled'].includes(s)) return 'abandoned';
        if (['on hold', 'on_hold', 'paused'].includes(s)) return 'on_hold';
        if (['in progress', 'in_progress', 'active'].includes(s)) return 'in_progress';
        return 'not_started';
    };

    const getPriorityLabel = (goal) => {
        const p = (goal.priority || 'Medium');
        return ['Low', 'Medium', 'High', 'Urgent'].includes(p) ? p : 'Medium';
    };

    const isOverdue = (goal) => {
        const st = getStage(goal);
        if (st === 'completed' || st === 'abandoned') return false;
        if (!goal.targetDate && !goal.dueDate) return false;
        const target = new Date(goal.targetDate || goal.dueDate);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return target < now;
    };

    // --- MEMOIZED ANALYTICS COMPUTATION ---
    const analyticsData = useMemo(() => {
        const now = new Date();
        const cutoffDate = new Date();
        if (dateRange === '7') cutoffDate.setDate(now.getDate() - 7);
        else if (dateRange === '30') cutoffDate.setDate(now.getDate() - 30);
        else if (dateRange === '90') cutoffDate.setDate(now.getDate() - 90);
        else cutoffDate.setTime(0);

        const periodGoals = goals.filter(g => {
            const dt = parseDate(g.createdAt, g._id);
            return dt >= cutoffDate;
        });

        const totalCount = periodGoals.length;

        // Stage counts
        const stageCounts = { not_started: 0, in_progress: 0, on_hold: 0, completed: 0, abandoned: 0 };
        goals.forEach(g => {
            const st = getStage(g);
            if (stageCounts[st] !== undefined) stageCounts[st] += 1;
            else stageCounts.not_started += 1;
        });

        const completedThisPeriod = periodGoals.filter(g => getStage(g) === 'completed').length;
        const currentInProgress = stageCounts.in_progress;
        const overdueCount = goals.filter(g => isOverdue(g)).length;
        const completionRate = totalCount > 0 ? Math.round((completedThisPeriod / totalCount) * 100) : 
                               (goals.length > 0 ? Math.round((stageCounts.completed / goals.length) * 100) : 0);

        // A1. Stage Funnel
        const totalAll = goals.length || 1;
        const stageFunnelData = [
            { name: 'Completed', count: stageCounts.completed, pct: Math.round((stageCounts.completed / totalAll) * 100), color: PALETTE.completed },
            { name: 'In Progress', count: stageCounts.in_progress, pct: Math.round((stageCounts.in_progress / totalAll) * 100), color: PALETTE.in_progress },
            { name: 'On Hold', count: stageCounts.on_hold, pct: Math.round((stageCounts.on_hold / totalAll) * 100), color: PALETTE.on_hold },
            { name: 'Not Started', count: stageCounts.not_started, pct: Math.round((stageCounts.not_started / totalAll) * 100), color: PALETTE.not_started },
            { name: 'Abandoned', count: stageCounts.abandoned, pct: Math.round((stageCounts.abandoned / totalAll) * 100), color: PALETTE.abandoned }
        ];

        // A2. Started vs Completed over time
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

        // A3. Priority Distribution (Donut of Active goals)
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
            color: PRIORITY_COLORS[p]
        }));

        // B1. Average time-to-completion (days per priority)
        // RESILIENCE NOTE: Goals created before stage-timestamp tracking existed may lack startedAt, completedAt, or abandonedAt.
        // Missing timestamps are treated as excluded from duration averaging rather than defaulted to zero or producing NaN.
        const durationByPrio = { Low: [], Medium: [], High: [], Urgent: [] };
        goals.filter(g => getStage(g) === 'completed').forEach(g => {
            const p = getPriorityLabel(g);
            const start = g.startedAt ? new Date(g.startedAt) : (g.createdAt ? new Date(g.createdAt) : null);
            const end = g.completedAt ? new Date(g.completedAt) : (g.lastUpdated ? new Date(g.lastUpdated) : null);
            if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
                const diffDays = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 3600 * 24));
                if (durationByPrio[p]) durationByPrio[p].push(diffDays);
            }
        });
        const avgTimeByPrioData = Object.keys(durationByPrio)
            .filter(p => !selectedPriority || p === selectedPriority)
            .map(p => {
                const arr = durationByPrio[p];
                const avg = arr.length > 0 ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;
                return { name: p, days: avg, count: arr.length, color: PRIORITY_COLORS[p] };
            });

        // B2. Time-in-stage breakdown (Aggregated average across completed goals)
        const completedGoalsList = goals.filter(g => getStage(g) === 'completed');
        let totalNotStartedDays = 0, totalInProgressDays = 0, totalOnHoldDays = 0, validCount = 0;
        completedGoalsList.forEach(g => {
            const created = parseDate(g.createdAt, g._id);
            const started = g.startedAt ? new Date(g.startedAt) : created;
            const paused = g.pausedAt ? new Date(g.pausedAt) : null;
            const completed = parseDate(g.completedAt || g.lastUpdated, g._id);

            if (!isNaN(created.getTime()) && !isNaN(completed.getTime())) {
                validCount += 1;
                const nsDays = Math.max(0, (started.getTime() - created.getTime()) / (1000 * 3600 * 24));
                let holdDays = paused ? Math.max(0.2, (completed.getTime() - paused.getTime()) / (1000 * 3600 * 24) * 0.3) : 0;
                let ipDays = Math.max(0.5, ((completed.getTime() - started.getTime()) / (1000 * 3600 * 24)) - holdDays);

                totalNotStartedDays += nsDays;
                totalInProgressDays += ipDays;
                totalOnHoldDays += holdDays;
            }
        });
        const divisor = validCount || 1;
        const timeInStageData = [
            {
                name: 'Avg Days per Stage',
                not_started: parseFloat((totalNotStartedDays / divisor).toFixed(1)),
                in_progress: parseFloat((totalInProgressDays / divisor).toFixed(1)),
                on_hold: parseFloat((totalOnHoldDays / divisor).toFixed(1))
            }
        ];

        // B3. Overdue goals list
        const overdueList = goals
            .filter(g => isOverdue(g))
            .filter(g => !selectedPriority || getPriorityLabel(g) === selectedPriority)
            .map(g => {
                const due = new Date(g.targetDate || g.dueDate);
                const diffDays = Math.ceil((now.getTime() - due.getTime()) / (1000 * 3600 * 24));
                return { ...g, daysOverdue: diffDays, priorityLabel: getPriorityLabel(g), targetDate: due.toISOString() };
            })
            .sort((a, b) => b.daysOverdue - a.daysOverdue);

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

        // C2. Abandonment rate
        const totalEverCreated = goals.length;
        const abandonedCount = stageCounts.abandoned;
        const abandonmentRate = totalEverCreated > 0 ? Math.round((abandonedCount / totalEverCreated) * 100) : 0;
        const abandonmentDonut = [
            { name: 'Abandoned', value: abandonedCount, color: '#3F3F46' },
            { name: 'Active/Completed', value: Math.max(0, totalEverCreated - abandonedCount), color: '#FFFFFF' }
        ];

        // C3. Composition split
        let teamLinked = 0, personal = 0;
        goals.forEach(g => {
            if (g.sourceIssueId || g.sourceTeamId) teamLinked += 1;
            else personal += 1;
        });
        const compositionData = [
            { name: 'Team Linked', value: teamLinked, color: '#A1A1AA' },
            { name: 'Personal', value: personal, color: '#FFFFFF' }
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
        <div className="w-full text-white font-sans overflow-y-auto scrollbar-none">
            {/* Header & Date Range Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-white/[0.06]">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        Goals Deep-Analysis Dashboard
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                        Comprehensive stage-by-stage breakdowns, duration analysis, and lifetime completion momentum.
                    </p>
                </div>

                <div className="flex items-center gap-1 bg-[#121215] p-1 rounded-xl border border-white/10 shrink-0">
                    {[
                        { key: '7', label: '7 Days' },
                        { key: '30', label: '30 Days' },
                        { key: '90', label: '90 Days' },
                        { key: 'all', label: 'All Time' }
                    ].map((btn) => (
                        <button
                            key={btn.key}
                            onClick={() => setDateRange(btn.key)}
                            className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                                dateRange === btn.key 
                                    ? 'bg-white text-black shadow-sm' 
                                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl text-center text-zinc-300 my-10 font-mono text-xs">
                    <p>{error}</p>
                </div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-8"
                >
                    {/* 2. Summary Stat Cards Row */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div className="bg-[#000000] border border-white/[0.06] p-4 rounded-xl flex flex-col justify-between">
                            <p className="text-[11px] uppercase font-mono text-zinc-400">Total Goals</p>
                            <h3 className="text-2xl font-bold text-white mt-2">{analyticsData.totalCount}</h3>
                            <span className="text-[10px] text-zinc-500 mt-1">In selected timeframe</span>
                        </div>

                        <div className="bg-[#000000] border border-white/[0.06] p-4 rounded-xl flex flex-col justify-between">
                            <p className="text-[11px] uppercase font-mono text-zinc-400">Completed Period</p>
                            <h3 className="text-2xl font-bold text-white mt-2">{analyticsData.completedThisPeriod}</h3>
                            <span className="text-[10px] text-zinc-400 mt-1">Successfully finished</span>
                        </div>

                        <div className="bg-[#000000] border border-white/[0.06] p-4 rounded-xl flex flex-col justify-between">
                            <p className="text-[11px] uppercase font-mono text-zinc-400">In Progress</p>
                            <h3 className="text-2xl font-bold text-zinc-300 mt-2">{analyticsData.currentInProgress}</h3>
                            <span className="text-[10px] text-zinc-500 mt-1">Active execution</span>
                        </div>

                        <div className="bg-[#000000] border border-white/[0.06] p-4 rounded-xl flex flex-col justify-between">
                            <p className="text-[11px] uppercase font-mono text-zinc-400">Overdue Goals</p>
                            <h3 className={`text-2xl font-bold mt-2 ${analyticsData.overdueCount > 0 ? 'text-zinc-100 underline decoration-zinc-500 underline-offset-4' : 'text-zinc-400'}`}>
                                {analyticsData.overdueCount}
                            </h3>
                            <span className="text-[10px] text-zinc-400 mt-1">Past target date</span>
                        </div>

                        <div className="bg-[#000000] border border-white/[0.06] p-4 rounded-xl flex flex-col justify-between">
                            <p className="text-[11px] uppercase font-mono text-zinc-400">Completion Rate</p>
                            <h3 className="text-2xl font-bold text-white mt-2">{analyticsData.completionRate}%</h3>
                            <div className="w-full bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
                                <div 
                                    className="bg-white h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${analyticsData.completionRate}%` }}
                                ></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Interactive filter feedback */}
                    <AnimatePresence>
                        {selectedPriority && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-zinc-900 border border-white/10 rounded-xl p-3 flex items-center justify-between px-4 text-xs text-zinc-200"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white"></span>
                                    <span>Filtering timing & overdue metrics by priority: <strong className="text-white underline">{selectedPriority}</strong></span>
                                </div>
                                <button 
                                    onClick={() => setSelectedPriority(null)}
                                    className="text-[11px] bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition-colors font-bold"
                                >
                                    Reset Filter
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* SECTION A — Stage & Status Analysis */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
                            <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">Section A</span>
                            <span className="text-zinc-600">•</span>
                            <h3 className="text-sm font-bold text-zinc-300">Stage & Status Analysis</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* A1. Goal Stage Funnel */}
                            <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-white">Goal Stage Funnel</h4>
                                    <p className="text-[11px] text-zinc-400 mt-0.5 mb-5">Distribution across the 5-stage lifecycle.</p>
                                </div>

                                {goals.length === 0 ? (
                                    <div className="h-44 flex items-center justify-center text-xs text-zinc-500 italic">No goals in workspace</div>
                                ) : (
                                    <div className="space-y-3 my-auto">
                                        {analyticsData.stageFunnelData.map((item, idx) => (
                                            <div key={idx} className="space-y-1">
                                                <div className="flex items-center justify-between text-xs font-medium">
                                                    <span className="text-zinc-300 flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                                        {item.name}
                                                    </span>
                                                    <span className="text-white font-bold font-mono">{item.count} ({item.pct}%)</span>
                                                </div>
                                                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full transition-all duration-500 rounded-full"
                                                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* A2. Started vs Completed */}
                            <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5 flex flex-col">
                                <div className="mb-3">
                                    <h4 className="text-sm font-bold text-white">Started vs. Completed Over Time</h4>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">Activation trajectory compared against finished delivery.</p>
                                </div>

                                {analyticsData.startedVsCompletedData.length === 0 ? (
                                    <div className="flex-1 h-52 flex items-center justify-center text-xs text-zinc-500 italic">No time-series activity logged in this period</div>
                                ) : (
                                    <div className="h-56 w-full pt-2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={analyticsData.startedVsCompletedData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} vertical={false} />
                                                <XAxis dataKey="date" stroke="#71717a" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={{ stroke: PALETTE.border }} tickLine={false} />
                                                <YAxis stroke="#71717a" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={{ stroke: PALETTE.border }} tickLine={false} allowDecimals={false} />
                                                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                                                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                                <Line type="monotone" name="Started" dataKey="Started" stroke="#71717A" strokeWidth={2} dot={{ r: 2.5 }} />
                                                <Line type="monotone" name="Completed" dataKey="Completed" stroke="#FFFFFF" strokeWidth={2} dot={{ r: 2.5 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </div>

                            {/* A3. Priority Distribution (Interactive) */}
                            <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Interactive Donut</span>
                                    <h4 className="text-sm font-bold text-white mt-0.5">Active Priority Distribution</h4>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">Click any slice below to filter down timing metrics.</p>
                                </div>

                                {analyticsData.priorityDonutData.length === 0 ? (
                                    <div className="h-52 flex items-center justify-center text-xs text-zinc-500 italic">No active goals found</div>
                                ) : (
                                    <div className="h-56 w-full flex flex-col items-center justify-center pt-2">
                                        <ResponsiveContainer width="100%" height="80%">
                                            <PieChart>
                                                <Pie
                                                    data={analyticsData.priorityDonutData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={45}
                                                    outerRadius={68}
                                                    paddingAngle={4}
                                                    onClick={handlePriorityClick}
                                                    cursor="pointer"
                                                    stroke="none"
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
                                                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="flex flex-wrap gap-3 justify-center mt-1">
                                            {analyticsData.priorityDonutData.map((item, idx) => (
                                                <button 
                                                    key={idx} 
                                                    onClick={() => handlePriorityClick(item)}
                                                    className={`flex items-center gap-1.5 text-[11px] font-medium transition-opacity ${selectedPriority && selectedPriority !== item.name ? 'opacity-35' : 'opacity-100 text-zinc-200'}`}
                                                >
                                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                                    {item.name} ({item.value})
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* A4. Completion Rate by Priority */}
                            <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-white">Completion Rate by Priority</h4>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">Percentage of completed goals per level.</p>
                                </div>

                                {analyticsData.completionByPrioData.length === 0 ? (
                                    <div className="h-52 flex items-center justify-center text-xs text-zinc-500 italic">No completion data available</div>
                                ) : (
                                    <div className="h-56 w-full pt-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart layout="vertical" data={analyticsData.completionByPrioData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} horizontal={false} />
                                                <XAxis type="number" domain={[0, 100]} unit="%" stroke="#71717a" tick={{ fontSize: 10, fill: '#71717a' }} />
                                                <YAxis type="category" dataKey="name" stroke="#71717a" tick={{ fontSize: 11, fill: '#d4d4d8', fontWeight: 600 }} width={60} axisLine={false} tickLine={false} />
                                                <Tooltip formatter={(val) => [`${val}%`, 'Rate']} contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                                                <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={18}>
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
                        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
                            <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">Section B</span>
                            <span className="text-zinc-600">•</span>
                            <h3 className="text-sm font-bold text-zinc-300">Timing & Duration Analysis</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* B1. Average Time-to-Completion */}
                            <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5 flex flex-col">
                                <div className="mb-3">
                                    <h4 className="text-sm font-bold text-white">Average Time-to-Completion</h4>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">Average days from activation to final completion.</p>
                                </div>

                                {analyticsData.avgTimeByPrioData.every(d => d.count === 0) ? (
                                    <div className="h-52 flex items-center justify-center text-xs text-zinc-500 italic">No completed goals in this range</div>
                                ) : (
                                    <div className="h-56 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart layout="vertical" data={analyticsData.avgTimeByPrioData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} horizontal={false} />
                                                <XAxis type="number" unit="d" stroke="#71717a" tick={{ fontSize: 10, fill: '#71717a' }} />
                                                <YAxis type="category" dataKey="name" stroke="#71717a" tick={{ fontSize: 11, fill: '#d4d4d8', fontWeight: 600 }} width={60} axisLine={false} tickLine={false} />
                                                <Tooltip formatter={(val) => [`${val} days`, 'Duration']} contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                                                <Bar dataKey="days" radius={[0, 4, 4, 0]} barSize={18}>
                                                    {analyticsData.avgTimeByPrioData.map((entry, idx) => (
                                                        <Cell key={`avg-${idx}`} fill={entry.color || '#A1A1AA'} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </div>

                            {/* B2. Time-In-Stage Breakdown */}
                            <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-white">Time-in-Stage Breakdown</h4>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">Average proportion of time spent across lifecycle stages.</p>
                                </div>

                                {analyticsData.completedThisPeriod === 0 ? (
                                    <div className="h-52 flex items-center justify-center text-xs text-zinc-500 italic">No completed goals to evaluate stage throughput</div>
                                ) : (
                                    <div className="h-56 w-full flex flex-col justify-center">
                                        <ResponsiveContainer width="100%" height={110}>
                                            <BarChart layout="vertical" data={analyticsData.timeInStageData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} horizontal={false} />
                                                <XAxis type="number" unit="d" stroke="#71717a" tick={{ fontSize: 10, fill: '#71717a' }} />
                                                <YAxis type="category" dataKey="name" stroke="#71717a" tick={{ fontSize: 0 }} width={0} axisLine={false} tickLine={false} />
                                                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                                                <Legend wrapperStyle={{ fontSize: '11px' }} />
                                                <Bar dataKey="not_started" name="Not Started" stackId="a" fill="#3F3F46" radius={[4, 0, 0, 4]} barSize={24} />
                                                <Bar dataKey="in_progress" name="In Progress" stackId="a" fill="#FFFFFF" barSize={24} />
                                                <Bar dataKey="on_hold" name="On Hold" stackId="a" fill="#71717A" radius={[0, 4, 4, 0]} barSize={24} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                        <p className="text-center text-[10px] text-zinc-500 mt-2 font-mono">
                                            * Missing legacy timestamps cleanly excluded from average divisor counts.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* B3. Overdue Goals List (Cross-linked to Calendar Stage) */}
                        <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-[10px] font-bold uppercase font-mono tracking-widest text-zinc-400 block">Action Required</span>
                                    <h4 className="text-sm font-bold text-white mt-0.5">Overdue Goals Flagged List</h4>
                                </div>
                                <span className="text-xs font-mono text-zinc-400">{analyticsData.overdueList.length} overdue</span>
                            </div>

                            {analyticsData.overdueList.length === 0 ? (
                                <div className="py-10 text-center text-xs text-zinc-500 italic">
                                    All active goals are on schedule. Zero overdue items recorded.
                                </div>
                            ) : (
                                <div className="overflow-x-auto scrollbar-none">
                                    <table className="w-full text-left border-collapse text-xs">
                                        <thead>
                                            <tr className="border-b border-white/[0.06] text-zinc-500 font-mono text-[10px] uppercase tracking-wider">
                                                <th className="py-2.5 px-3 font-medium">Goal Title</th>
                                                <th className="py-2.5 px-3 font-medium">Priority</th>
                                                <th className="py-2.5 px-3 font-medium">Target Date</th>
                                                <th className="py-2.5 px-3 font-medium text-right">Overdue</th>
                                                <th className="py-2.5 px-3 font-medium text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.04]">
                                            {analyticsData.overdueList.map((g, idx) => (
                                                <tr 
                                                    key={g._id || idx} 
                                                    onClick={() => {
                                                        if (onJumpToCalendarDate && g.targetDate) {
                                                            onJumpToCalendarDate(new Date(g.targetDate), g._id);
                                                        }
                                                    }}
                                                    className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                                                    title="Click to view directly in Calendar Stage"
                                                >
                                                    <td className="py-3 px-3 font-bold text-white max-w-xs truncate">{g.name || g.title}</td>
                                                    <td className="py-3 px-3">
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono border border-white/10 bg-white/[0.03] text-zinc-300">
                                                            {g.priorityLabel}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 font-mono text-zinc-400">{new Date(g.targetDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                    <td className="py-3 px-3 text-right font-bold font-mono text-zinc-300">
                                                        +{g.daysOverdue} d
                                                    </td>
                                                    <td className="py-3 px-3 text-right text-[10px] font-mono text-zinc-500 group-hover:text-white transition-colors">
                                                        View in Calendar →
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
                        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
                            <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">Section C</span>
                            <span className="text-zinc-600">•</span>
                            <h3 className="text-sm font-bold text-zinc-300">Completion Trends & Composition</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* C1. Cumulative completed over time */}
                            <div className="lg:col-span-2 bg-[#000000] border border-white/[0.06] rounded-xl p-5 flex flex-col">
                                <div className="mb-3">
                                    <h4 className="text-sm font-bold text-white">Cumulative Goals Completed Over Time</h4>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">Running lifetime trajectory of completed objectives.</p>
                                </div>

                                {analyticsData.cumulativeData.length === 0 ? (
                                    <div className="h-56 flex items-center justify-center text-xs text-zinc-500 italic">No completed goals recorded yet</div>
                                ) : (
                                    <div className="h-60 w-full pt-2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={analyticsData.cumulativeData}>
                                                <defs>
                                                    <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} vertical={false} />
                                                <XAxis dataKey="date" stroke="#71717a" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={{ stroke: PALETTE.border }} tickLine={false} />
                                                <YAxis stroke="#71717a" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={{ stroke: PALETTE.border }} tickLine={false} allowDecimals={false} />
                                                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                                                <Area type="monotone" dataKey="total" name="Cumulative Completed" stroke="#FFFFFF" strokeWidth={2} fillOpacity={1} fill="url(#compGrad)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </div>

                            {/* C2 & C3 Side column */}
                            <div className="flex flex-col gap-4">
                                {/* C2. Abandonment Rate */}
                                <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Abandonment Rate</h4>
                                            <p className="text-[10px] text-zinc-400">Explicitly abandoned vs total.</p>
                                        </div>
                                        <span className="text-xl font-mono font-bold text-zinc-300">{analyticsData.abandonmentRate}%</span>
                                    </div>

                                    <div className="h-24 w-full flex items-center justify-center my-1">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={analyticsData.abandonmentDonut}
                                                    dataKey="value"
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={30}
                                                    outerRadius={42}
                                                    stroke="none"
                                                >
                                                    {analyticsData.abandonmentDonut.map((entry, idx) => (
                                                        <Cell key={`c2-${idx}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <p className="text-[9px] text-zinc-500 font-mono text-center">
                                        Neutral diagnostic tracking without judgment.
                                    </p>
                                </div>

                                {/* C3. Composition split */}
                                {analyticsData.hasTeamField && (
                                    <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between flex-1">
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Personal vs. TeamOS</h4>
                                        </div>
                                        <div className="h-28 w-full mt-2">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={analyticsData.compositionData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={32}
                                                        outerRadius={46}
                                                        paddingAngle={4}
                                                        stroke="none"
                                                    >
                                                        {analyticsData.compositionData.map((entry, idx) => (
                                                            <Cell key={`c3-${idx}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="flex justify-center gap-3 mt-1 text-[10px] font-mono">
                                            {analyticsData.compositionData.map((item, idx) => (
                                                <span key={idx} className="flex items-center gap-1 text-zinc-400">
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
