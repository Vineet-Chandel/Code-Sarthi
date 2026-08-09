import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import BASE_URL from './auth/baseURL';
import ProjectKanbanBoard from './PROJECT-MANAGER/Projects/ProjectKanbanBoard';


// Reusable Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder = "Select...", minWidth = "min-w-[160px]" }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);
    const selectedOption = options.find(o => String(o.value) === String(value));

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${minWidth}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#111111] hover:bg-[#1a1a1a] text-white font-bold px-4 py-2 rounded-xl border border-white/[0.08] focus:outline-none shadow-sm flex items-center justify-between gap-3 transition-colors"
            >
                <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-full bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                    <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-2.5 cursor-pointer text-sm font-semibold transition-colors ${String(value) === String(opt.value) ? 'bg-white/[0.08] text-white' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'}`}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// Semantic Color Palette as mandated by build brief
const COLORS = {
    primary: '#534AB7',    // Primary series & core metrics
    secondary: '#A7A0F8',  // Secondary series & highlights
    amber: '#D9A441',      // Warning, urgent, & idle indicators
    green: '#10B981',      // Completed, done, & success states
};

// Array helper for pie/donut charts
const CHART_PALETTE = [COLORS.primary, COLORS.secondary, COLORS.green, COLORS.amber];

// Time conversion utilities — never display raw seconds to users
const formatTimeFromSeconds = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds <= 0) return "0h 0m";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
};

const secondsToHoursDecimal = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds <= 0) return 0;
    return Number((seconds / 3600).toFixed(2));
};

// Custom Recharts Tooltips with dark glassmorphic UI
const CustomTimeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0a0a0a] rounded-xl p-3.5 shadow-2xl text-xs font-mono">
                <p className="text-zinc-400 mb-2 pb-1 font-sans font-bold">{label}</p>
                {payload.map((entry, idx) => {
                    const formatted = entry.payload?.formattedTime || formatTimeFromSeconds((entry.value || 0) * 3600);
                    return (
                        <div key={idx} className="flex items-center justify-between gap-4 py-0.5">
                            <span className="flex items-center gap-1.5 text-white font-sans">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                                {entry.name}:
                            </span>
                            <span className="font-extrabold text-white">{formatted}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
    return null;
};

const CustomCountTooltip = ({ active, payload, label, valueSuffix = '' }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0a0a0a] rounded-xl p-3.5 shadow-2xl text-xs font-mono">
                {label && <p className="text-zinc-400 mb-2 pb-1 font-sans font-bold">{label}</p>}
                {payload.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-0.5">
                        <span className="flex items-center gap-1.5 text-white font-sans">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill || entry.payload.fill }} />
                            {entry.name || entry.payload.name}:
                        </span>
                        <span className="font-extrabold text-white">
                            {entry.value}{valueSuffix}
                            {entry.payload.completed !== undefined && ` (${entry.payload.completed}/${entry.payload.totalAssigned})`}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// Reusable empty state wrapper
const ChartEmptyState = ({ message = "No analytics data available for this period" }) => (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[220px] bg-black/60 rounded-xl p-6 text-center">
        <svg className="w-8 h-8 text-zinc-600 mb-2 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="text-xs text-zinc-400 font-medium">{message}</span>
    </div>
);

// Reusable Chart Card wrapper with Framer Motion and consistent header style
const ChartCard = ({ title, category, snapshot = false, children, extraHeader, index = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="bg-[#0a0a0a] rounded-2xl p-6 shadow-2xl flex flex-col h-full relative overflow-hidden hover:bg-[#0d0d0d] transition-colors"
    >
        <div className="flex items-start justify-between gap-2 mb-5 pb-2">
            <div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-zinc-400 font-mono">{category}</span>
                    {snapshot && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-black text-zinc-300 font-sans uppercase tracking-wider shadow-inner" title="Based on current workspace state; ignores historical date filters">
                            Current Snapshot
                        </span>
                    )}
                </div>
                <h3 className="text-base font-bold text-white mt-1 tracking-tight">{title}</h3>
            </div>
            {extraHeader && <div>{extraHeader}</div>}
        </div>
        <div className="flex-1 w-full min-h-[250px] flex items-center justify-center">
            {children}
        </div>
    </motion.div>
);

const ProjectManager = ({ teamId: propTeamId, projectId = null }) => {
    const [activeTeamId, setActiveTeamId] = useState(propTeamId || null);
    const [userTeams, setUserTeams] = useState([]);
    const [teamProjects, setTeamProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(projectId || 'all');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState('30'); // '7', '30', 'all'
    const [selectedTrendUser, setSelectedTrendUser] = useState('all');

    // API Data state
    const [teamInfo, setTeamInfo] = useState(null);
    const [projectInfo, setProjectInfo] = useState(null);
    const [members, setMembers] = useState([]);
    const [memberActivity, setMemberActivity] = useState([]);
    const [trendRaw, setTrendRaw] = useState([]);
    const [idleMembers, setIdleMembers] = useState([]);
    const [completionRate, setCompletionRate] = useState([]);
    const [assignmentSplit, setAssignmentSplit] = useState([]);
    const [projectBreakdown, setProjectBreakdown] = useState({ byStatus: [], byPriority: [] });
    const [allIssues, setAllIssues] = useState([]);

    useEffect(() => {
        if (propTeamId) {
            setActiveTeamId(propTeamId);
        } else if (!activeTeamId) {
            // Standalone mode (/manager route) — fetch user's teams first
            axios.get(`${BASE_URL}/teams/mine`, { withCredentials: true })
                .then(res => {
                    const teams = res.data.teams || [];
                    setUserTeams(teams);
                    if (teams.length > 0) {
                        setActiveTeamId(teams[0]._id);
                    } else {
                        setLoading(false);
                    }
                })
                .catch(() => setLoading(false));
        }
    }, [propTeamId]);

    useEffect(() => {
        if (activeTeamId) {
            fetchAllData();
        }
    }, [activeTeamId, selectedProjectId, timeRange]);

    const fetchAllData = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else if (!memberActivity.length) setLoading(true);
        setError(null);

        try {
            const days = timeRange === 'all' ? 3650 : Number(timeRange);
            const since = timeRange === 'all' ? '' : new Date(Date.now() - days * 24 * 3600 * 1000).toISOString();

            // Fetch all required data concurrently using Promise.all
            const [
                teamRes,
                membersRes,
                activityRes,
                trendRes,
                idleRes,
                completionRes,
                splitRes,
                breakdownRes,
                projectsRes
            ] = await Promise.all([
                axios.get(`${BASE_URL}/teams/${activeTeamId}`, { withCredentials: true }).catch(() => null),
                axios.get(`${BASE_URL}/teams/${activeTeamId}/members`, { withCredentials: true }).catch(() => ({ data: { members: [] } })),
                axios.get(`${BASE_URL}/teams/${activeTeamId}/analytics/member-activity?since=${since}`, { withCredentials: true }).catch(() => ({ data: { results: [] } })),
                axios.get(`${BASE_URL}/teams/${activeTeamId}/analytics/contribution-trend?days=${days}`, { withCredentials: true }).catch(() => ({ data: { results: [] } })),
                axios.get(`${BASE_URL}/teams/${activeTeamId}/analytics/idle-members?days=${days === 3650 ? 30 : days}`, { withCredentials: true }).catch(() => ({ data: { idleMembers: [] } })),
                axios.get(`${BASE_URL}/teams/${activeTeamId}/analytics/completion-rate`, { withCredentials: true }).catch(() => ({ data: { results: [] } })),
                axios.get(`${BASE_URL}/teams/${activeTeamId}/analytics/assignment-split`, { withCredentials: true }).catch(() => ({ data: { results: [] } })),
                axios.get(`${BASE_URL}/teams/${activeTeamId}/analytics/project-breakdown`, { withCredentials: true }).catch(() => ({ data: { byStatus: [], byPriority: [] } })),
                axios.get(`${BASE_URL}/teams/${activeTeamId}/projects`, { withCredentials: true }).catch(() => ({ data: { projects: [] } }))
            ]);

            if (teamRes?.data?.team) setTeamInfo(teamRes.data.team);
            setMembers(membersRes.data.members || []);
            setMemberActivity(activityRes.data.results || []);
            setTrendRaw(trendRes.data.results || []);
            setIdleMembers(idleRes.data.idleMembers || []);
            setCompletionRate(completionRes.data.results || []);
            setAssignmentSplit(splitRes.data.results || []);
            setProjectBreakdown({
                byStatus: breakdownRes.data.byStatus || [],
                byPriority: breakdownRes.data.byPriority || []
            });

            // NOTE: Currently aggregating issue metrics client-side by fetching issue lists across team projects.
            let issuesList = [];
            const projectList = projectsRes.data.projects || [];
            setTeamProjects(projectList);

            if (selectedProjectId && selectedProjectId !== 'all') {
                const pRes = await axios.get(`${BASE_URL}/teams/${activeTeamId}/projects/${selectedProjectId}/issues`, { withCredentials: true }).catch(() => null);
                if (pRes?.data?.issues) issuesList = pRes.data.issues;
                const currentP = projectList.find(p => String(p._id) === String(selectedProjectId));
                if (currentP) setProjectInfo(currentP);
            } else if (projectList.length > 0) {
                const issuePromises = projectList.map(p =>
                    axios.get(`${BASE_URL}/teams/${activeTeamId}/projects/${p._id}/issues`, { withCredentials: true })
                        .catch(() => ({ data: { issues: [] } }))
                );
                const issueResults = await Promise.all(issuePromises);
                issuesList = issueResults.flatMap(r => r.data.issues || []);
                setProjectInfo(null);
            }
            setAllIssues(issuesList);

        } catch (err) {
            console.error("Failed to load Project Manager analytics:", err);
            setError("Unable to synthesize analytics data. Please check connection and try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // --- DATA TRANSFORMATION FOR SECTION A ---
    const memberActivityData = useMemo(() => {
        return (memberActivity || []).map(item => ({
            name: item.name || 'Anonymous',
            userId: item.userId,
            hours: secondsToHoursDecimal(item.totalSeconds),
            formattedTime: formatTimeFromSeconds(item.totalSeconds),
            sessions: item.sessionCount || 0
        })).sort((a, b) => b.hours - a.hours);
    }, [memberActivity]);

    const contributionTrendData = useMemo(() => {
        if (!trendRaw || trendRaw.length === 0) return [];
        const dayMap = {};

        trendRaw.forEach(item => {
            const day = item._id?.day || 'Unknown';
            const itemUserId = item._id?.userId;
            const sec = item.totalSeconds || 0;

            if (selectedTrendUser === 'all' || String(itemUserId) === String(selectedTrendUser)) {
                if (!dayMap[day]) dayMap[day] = { date: day, seconds: 0 };
                dayMap[day].seconds += sec;
            }
        });

        return Object.values(dayMap)
            .sort((a, b) => a.date.localeCompare(b.date))
            .map(row => ({
                date: row.date.slice(5), // MM-DD display
                fullDate: row.date,
                hours: secondsToHoursDecimal(row.seconds),
                formattedTime: formatTimeFromSeconds(row.seconds)
            }));
    }, [trendRaw, selectedTrendUser]);

    // --- DATA TRANSFORMATION FOR SECTION B ---
    const issuesOverTimeData = useMemo(() => {
        if (!allIssues || allIssues.length === 0) return [];
        const dateMap = {};

        const filterDate = timeRange === 'all' ? null : new Date(Date.now() - Number(timeRange) * 24 * 3600 * 1000);

        allIssues.forEach(issue => {
            if (!issue.createdAt) return;
            const created = new Date(issue.createdAt);
            if (filterDate && created < filterDate) return;

            const day = issue.createdAt.slice(0, 10);
            if (!dateMap[day]) {
                dateMap[day] = { date: day.slice(5), fullDate: day, Feature: 0, Problem: 0, Task: 0, Total: 0 };
            }
            const type = (issue.type || 'issue').toLowerCase();
            if (type === 'feature') dateMap[day].Feature += 1;
            else if (type === 'problem') dateMap[day].Problem += 1;
            else dateMap[day].Task += 1;
            dateMap[day].Total += 1;
        });

        return Object.values(dateMap).sort((a, b) => a.fullDate.localeCompare(b.fullDate));
    }, [allIssues, timeRange]);

    const issueStatusData = useMemo(() => {
        const counts = { Open: 0, 'In Progress': 0, Done: 0 };
        allIssues.forEach(issue => {
            const status = (issue.status || 'open').toLowerCase();
            if (status === 'done' || status === 'completed') counts.Done += 1;
            else if (status === 'in_progress' || status === 'active') counts['In Progress'] += 1;
            else counts.Open += 1;
        });
        return [
            { name: 'Open', value: counts.Open, color: COLORS.primary },
            { name: 'In Progress', value: counts['In Progress'], color: COLORS.secondary },
            { name: 'Done', value: counts.Done, color: COLORS.green }
        ].filter(d => d.value > 0);
    }, [allIssues]);

    const issueTypeData = useMemo(() => {
        const counts = { Feature: 0, Problem: 0, Task: 0 };
        allIssues.forEach(issue => {
            const type = (issue.type || 'issue').toLowerCase();
            if (type === 'feature') counts.Feature += 1;
            else if (type === 'problem') counts.Problem += 1;
            else counts.Task += 1;
        });
        return [
            { name: 'Feature', value: counts.Feature, color: COLORS.primary },
            { name: 'Problem', value: counts.Problem, color: COLORS.amber },
            { name: 'Task / Other', value: counts.Task, color: COLORS.secondary }
        ].filter(d => d.value > 0);
    }, [allIssues]);

    const issuePriorityData = useMemo(() => {
        const counts = { Low: 0, Medium: 0, High: 0, Urgent: 0 };
        allIssues.forEach(issue => {
            const p = (issue.priority || 'medium').toLowerCase();
            if (p === 'low') counts.Low += 1;
            else if (p === 'high') counts.High += 1;
            else if (p === 'urgent') counts.Urgent += 1;
            else counts.Medium += 1;
        });
        return [
            { name: 'Low', value: counts.Low, color: COLORS.secondary },
            { name: 'Medium', value: counts.Medium, color: COLORS.primary },
            { name: 'High', value: counts.High, color: COLORS.green },
            { name: 'Urgent', value: counts.Urgent, color: COLORS.amber }
        ].filter(d => d.value > 0);
    }, [allIssues]);

    const completionRateData = useMemo(() => {
        return (completionRate || []).map(item => ({
            name: item.name || 'Member',
            rate: Number((Number(item.completionRate || 0) * 100).toFixed(1)),
            completed: item.completed || 0,
            totalAssigned: item.totalAssigned || 0
        }));
    }, [completionRate]);

    const assignmentSplitData = useMemo(() => {
        return (assignmentSplit || []).map(item => ({
            name: item.name || 'Member',
            SelfClaimed: item.self_claimed || 0,
            LeaderAssigned: item.leader_assigned || 0
        }));
    }, [assignmentSplit]);

    // --- DATA TRANSFORMATION FOR SECTION C ---
    const projectStatusData = useMemo(() => {
        const mapping = { planning: 'Planning', active: 'Active', on_hold: 'On Hold', completed: 'Completed' };
        const colorMap = { planning: COLORS.secondary, active: COLORS.primary, on_hold: COLORS.amber, completed: COLORS.green };
        return (projectBreakdown.byStatus || []).map(item => ({
            name: mapping[item._id] || item._id || 'Unknown',
            value: item.count || 0,
            color: colorMap[item._id] || COLORS.primary
        })).filter(d => d.value > 0);
    }, [projectBreakdown.byStatus]);

    const projectPriorityData = useMemo(() => {
        const mapping = { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' };
        const colorMap = { low: COLORS.secondary, medium: COLORS.primary, high: COLORS.green, urgent: COLORS.amber };
        return (projectBreakdown.byPriority || []).map(item => ({
            name: mapping[item._id] || item._id || 'Unknown',
            value: item.count || 0,
            color: colorMap[item._id] || COLORS.primary
        })).filter(d => d.value > 0);
    }, [projectBreakdown.byPriority]);

    // --- SUMMARY STAT CARDS CALCULATION ---
    const stats = useMemo(() => {
        const totalSecs = memberActivity.reduce((acc, curr) => acc + (curr.totalSeconds || 0), 0);
        const totalIssues = allIssues.length;
        const completedIssues = allIssues.filter(i => (i.status || '').toLowerCase() === 'done' || (i.status || '').toLowerCase() === 'completed').length;
        const activeCount = memberActivity.filter(m => m.totalSeconds > 0).length;

        return [
            {
                label: "Total Hours Logged",
                value: formatTimeFromSeconds(totalSecs),
                subText: `${secondsToHoursDecimal(totalSecs)}h decimal equv.`,
                icon: <svg className="w-5 h-5 text-[#A7A0F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                color: "from-[#534AB7]/20 to-transparent border-[#534AB7]/40"
            },
            {
                label: "Total Issues Raised",
                value: totalIssues,
                subText: `${projectId ? "Project scoped" : "Across team projects"}`,
                icon: <svg className="w-5 h-5 text-[#534AB7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
                color: "from-white/5 to-transparent border-white/10"
            },
            {
                label: "Issues Completed",
                value: completedIssues,
                subText: `${totalIssues > 0 ? ((completedIssues / totalIssues) * 100).toFixed(1) : 0}% success rate`,
                icon: <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                color: "from-emerald-500/10 to-transparent border-emerald-500/30"
            },
            {
                label: "Active Contributors",
                value: activeCount,
                subText: `In selected ${timeRange === 'all' ? 'all-time' : `${timeRange}d`} range`,
                icon: <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                color: "from-amber-500/10 to-transparent border-amber-500/30"
            }
        ];
    }, [memberActivity, allIssues, projectId, timeRange]);

    // --- INITIAL LOADING SKELETON ---
    if (loading) {
        return (
            <div className="w-full min-h-[600px] p-6 bg-black text-white space-y-6 animate-pulse">
                <div className="h-16 bg-[#0a0a0a] rounded-2xl w-full flex items-center justify-between px-6">
                    <div className="w-48 h-6 bg-white/10 rounded-lg" />
                    <div className="w-64 h-8 bg-white/10 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-[#0a0a0a] rounded-2xl" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-80 bg-[#0a0a0a] rounded-2xl" />)}
                </div>
            </div>
        );
    }

    if (!activeTeamId) {
        return (
            <div className="w-full min-h-[600px] flex flex-col items-center justify-center p-6 bg-black text-white">
                <div className="bg-[#0a0a0a] p-8 rounded-2xl max-w-md text-center shadow-2xl">
                    <svg className="w-12 h-12 text-white mx-auto mb-4 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="text-xl font-black mb-2">No Active Teams</h2>
                    <p className="text-sm text-zinc-400">Join or create a workspace team in CodeSarthi to start monitoring contribution tracking and issue execution analytics.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-black text-white space-y-8 py-10 px-2 sm:px-6 selection:bg-white/20 relative">
            {/* SUBTLE OVERLAY WHEN REFETCHING ON FILTER CHANGE */}
            {refreshing && (
                <div className="fixed top-6 right-6 z-50 bg-[#0a0a0a] text-white text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 font-mono animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    Synthesizing Analytics...
                </div>
            )}

            {/* 1. HEADER BAR */}
            <header className="bg-[#0a0a0a] rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] font-mono font-black tracking-[0.25em] text-zinc-400 uppercase">
                            Deep-Analysis Dashboard
                        </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1 flex flex-wrap items-center gap-3">
                        {!propTeamId && userTeams.length > 0 ? (
                            <CustomDropdown
                                value={activeTeamId || ''}
                                onChange={(val) => {
                                    setActiveTeamId(val);
                                    setSelectedProjectId('all');
                                }}
                                options={userTeams.map(t => ({ value: t._id, label: t.name }))}
                                minWidth="min-w-[200px]"
                            />
                        ) : (
                            <span>{teamInfo?.name || "Workspace Team"}</span>
                        )}

                        {teamProjects.length > 0 && (
                            <>
                                <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                <CustomDropdown
                                    value={selectedProjectId}
                                    onChange={(val) => setSelectedProjectId(val)}
                                    options={[
                                        { value: 'all', label: 'All Projects' },
                                        ...teamProjects.map(p => ({ value: p._id, label: p.title }))
                                    ]}
                                    minWidth="min-w-[180px]"
                                />
                            </>
                        )}
                    </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-black rounded-xl p-1.5 flex items-center shadow-inner gap-1">
                        {[
                            { label: 'Last 7 Days', value: '7' },
                            { label: 'Last 30 Days', value: '30' },
                            { label: 'All Time', value: 'all' }
                        ].map(tab => (
                            <button
                                key={tab.value}
                                onClick={() => setTimeRange(tab.value)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === tab.value
                                    ? 'bg-white text-black font-black shadow-md'
                                    : 'text-zinc-400 hover:text-white hover:bg-[#111111]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => fetchAllData(true)}
                        disabled={refreshing}
                        title="Refresh Intelligence Data"
                        className="bg-[#121212] hover:bg-white hover:text-black text-zinc-300 p-3 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center shrink-0 disabled:opacity-50 shadow-sm"
                    >
                        <svg className={`w-4 h-4 stroke-current ${refreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                </div>
            </header>

            {error && (
                <div className="bg-red-500/10 text-red-400 p-4 rounded-xl text-xs font-medium">
                    {error}
                </div>
            )}

            {/* 2. SUMMARY STAT CARDS ROW */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="bg-[#0a0a0a] rounded-2xl p-6 shadow-2xl relative overflow-hidden hover:bg-[#101010] transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
                            <div className="p-2.5 rounded-xl bg-black shadow-inner transition-transform">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">{stat.value}</div>
                        <div className="text-[11px] text-zinc-500 mt-1 font-sans font-medium">{stat.subText}</div>
                    </motion.div>
                ))}
            </section>

            {selectedProjectId !== 'all' ? (
                <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] bg-black border-t border-white/[0.05] mt-6 pt-8 pb-12">
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#A7A0F8] font-mono pl-1 border-l-2 border-[#534AB7]">
                            Project Kanban Tracking
                        </div>
                        <div className="w-full">
                            <ProjectKanbanBoard issues={allIssues} teamId={activeTeamId} onRefresh={() => fetchAllData(true)} />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* 3. CHARTS GRID — SECTION A: CONTRIBUTION ANALYSIS */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#A7A0F8] font-mono pl-1 border-l-2 border-[#534AB7]">
                            Section A — Contribution Analysis
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* A1. MEMBER ACTIVITY RANKING */}
                            <ChartCard
                                title="Member Activity Ranking"
                                category="Time Contribution"
                                index={0}
                                extraHeader={
                                    <span className="text-[10px] text-zinc-500 font-mono italic">Click bar to filter Trend →</span>
                                }
                            >
                                {memberActivityData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <BarChart
                                            data={memberActivityData}
                                            layout="vertical"
                                            margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" horizontal={false} />
                                            <XAxis type="number" stroke="#71717A" fontSize={11} unit="h" />
                                            <YAxis dataKey="name" type="category" stroke="#E4E4E7" fontSize={11} width={80} tick={{ fill: '#E4E4E7' }} />
                                            <Tooltip content={<CustomTimeTooltip />} />
                                            <Bar
                                                dataKey="hours"
                                                name="Working Duration"
                                                radius={[0, 6, 6, 0]}
                                                cursor="pointer"
                                                onClick={(data) => {
                                                    if (data?.payload?.userId) setSelectedTrendUser(String(data.payload.userId));
                                                }}
                                            >
                                                {memberActivityData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={String(entry.userId) === String(selectedTrendUser) ? COLORS.secondary : index === 0 ? COLORS.primary : '#3F3F4E'}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No recorded contribution hours in this time window" />
                                )}
                            </ChartCard>

                            {/* A2. CONTRIBUTION TREND OVER TIME */}
                            <ChartCard
                                title="Contribution Trend Over Time"
                                category="Timeline Analytics"
                                index={1}
                                extraHeader={
                                    <select
                                        value={selectedTrendUser}
                                        onChange={(e) => setSelectedTrendUser(e.target.value)}
                                        className="bg-black text-xs text-white font-bold px-3 py-1.5 rounded-lg focus:outline-none shadow-sm cursor-pointer"
                                    >
                                        <option value="all">Team Total</option>
                                        {memberActivityData.map(m => (
                                            <option key={m.userId || m.name} value={m.userId}>{m.name}</option>
                                        ))}
                                    </select>
                                }
                            >
                                {contributionTrendData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <LineChart data={contributionTrendData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" />
                                            <XAxis dataKey="date" stroke="#71717A" fontSize={11} />
                                            <YAxis stroke="#71717A" fontSize={11} unit="h" />
                                            <Tooltip content={<CustomTimeTooltip />} />
                                            <Line
                                                type="monotone"
                                                dataKey="hours"
                                                name="Time Logged"
                                                stroke={selectedTrendUser === 'all' ? COLORS.primary : COLORS.secondary}
                                                strokeWidth={3}
                                                dot={{ r: 4, fill: '#0a0a0a', strokeWidth: 2 }}
                                                activeDot={{ r: 6, fill: COLORS.secondary, stroke: '#fff' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No trend data points found for selected filter" />
                                )}
                            </ChartCard>
                        </div>

                        {/* A3. IDLE MEMBER WATCHLIST (DISTINCT FLAGGED TABLE COMPONENT) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-[#0a0a0a] rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-5 pb-2">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#D9A441] font-mono">Risk & Engagement</span>
                                    <h3 className="text-base font-bold text-white mt-1">Idle Member Watchlist</h3>
                                </div>
                                <span className="px-3 py-1.5 rounded-lg bg-black text-[#D9A441] text-xs font-mono font-bold shadow-inner">
                                    Threshold: {timeRange === 'all' ? '30+ Days Inactive' : `${timeRange} Days Inactive`}
                                </span>
                            </div>
                            {idleMembers.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {idleMembers.map((member, idx) => {
                                        const daysIdle = member.lastActive
                                            ? Math.floor((Date.now() - new Date(member.lastActive).getTime()) / (1000 * 3600 * 24))
                                            : null;
                                        return (
                                            <div
                                                key={member.userId || idx}
                                                className="bg-black hover:bg-[#121212] p-5 rounded-xl flex items-center justify-between gap-3 transition-colors shadow-sm"
                                            >
                                                <div className="min-w-0">
                                                    <div className="text-sm font-bold text-white truncate">{member.name || 'Member'}</div>
                                                    <div className="text-xs text-zinc-500 capitalize font-medium mt-0.5">{member.role || 'Contributor'} • {member.email}</div>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <div className="text-xs font-black font-mono text-[#D9A441]">
                                                        {daysIdle !== null ? `Idle ${daysIdle}d` : 'No history'}
                                                    </div>
                                                    <div className="text-[10px] text-zinc-600 mt-0.5">
                                                        {member.lastActive ? new Date(member.lastActive).toLocaleDateString() : 'Never logged'}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="w-full py-8 text-center bg-black rounded-xl text-emerald-400 font-medium text-xs shadow-inner">
                                    ✓ All active team members have recorded contributions within this operational window. Zero idle anomalies detected.
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* 4. CHARTS GRID — SECTION B: ISSUE ANALYSIS */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#A7A0F8] font-mono pl-1 border-l-2 border-[#A7A0F8]">
                            Section B — Issue Flow & Execution Analysis
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* B1. ISSUES RAISED OVER TIME */}
                            <ChartCard title="Issues Raised Over Time" category="Creation Velocity" index={2}>
                                {issuesOverTimeData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <AreaChart data={issuesOverTimeData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                                            <defs>
                                                <linearGradient id="colorFeature" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.7} />
                                                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1} />
                                                </linearGradient>
                                                <linearGradient id="colorProblem" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={COLORS.amber} stopOpacity={0.7} />
                                                    <stop offset="95%" stopColor={COLORS.amber} stopOpacity={0.1} />
                                                </linearGradient>
                                                <linearGradient id="colorTask" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.7} />
                                                    <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                                            <XAxis dataKey="date" stroke="#71717A" fontSize={11} />
                                            <YAxis stroke="#71717A" fontSize={11} allowDecimals={false} />
                                            <Tooltip content={<CustomCountTooltip valueSuffix=" items" />} />
                                            <Legend wrapperStyle={{ fontSize: '11px', color: '#A1A1AA' }} />
                                            <Area type="monotone" dataKey="Feature" stackId="1" stroke={COLORS.primary} fill="url(#colorFeature)" />
                                            <Area type="monotone" dataKey="Problem" stackId="1" stroke={COLORS.amber} fill="url(#colorProblem)" />
                                            <Area type="monotone" dataKey="Task" stackId="1" stroke={COLORS.secondary} fill="url(#colorTask)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No issues created during this operational window" />
                                )}
                            </ChartCard>

                            {/* B2. ISSUE STATUS BREAKDOWN */}
                            <ChartCard title="Issue Status Breakdown" category="Workflow State" snapshot={true} index={3}>
                                {issueStatusData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <PieChart>
                                            <Pie
                                                data={issueStatusData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={85}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {issueStatusData.map((entry, idx) => (
                                                    <Cell key={`cell-${idx}`} fill={entry.color || CHART_PALETTE[idx % CHART_PALETTE.length]} stroke="#0a0a0a" strokeWidth={2} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomCountTooltip valueSuffix=" issues" />} />
                                            <Legend wrapperStyle={{ fontSize: '11px', color: '#A1A1AA' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No issues currently active in workspace" />
                                )}
                            </ChartCard>

                            {/* B3. ISSUE TYPE DISTRIBUTION */}
                            <ChartCard title="Issue Type Distribution" category="Composition" snapshot={true} index={4}>
                                {issueTypeData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <PieChart>
                                            <Pie
                                                data={issueTypeData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                dataKey="value"
                                            >
                                                {issueTypeData.map((entry, idx) => (
                                                    <Cell key={`cell-${idx}`} fill={entry.color || CHART_PALETTE[idx % CHART_PALETTE.length]} stroke="#0a0a0a" strokeWidth={2} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomCountTooltip valueSuffix=" items" />} />
                                            <Legend wrapperStyle={{ fontSize: '11px', color: '#A1A1AA' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No issue types classified yet" />
                                )}
                            </ChartCard>

                            {/* B4. ISSUE PRIORITY DISTRIBUTION */}
                            <ChartCard title="Issue Priority Distribution" category="Triage Matrix" snapshot={true} index={5}>
                                {issuePriorityData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <BarChart data={issuePriorityData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" horizontal={false} />
                                            <XAxis type="number" stroke="#71717A" fontSize={11} allowDecimals={false} />
                                            <YAxis dataKey="name" type="category" stroke="#E4E4E7" fontSize={11} width={60} />
                                            <Tooltip content={<CustomCountTooltip valueSuffix=" tasks" />} />
                                            <Bar dataKey="value" name="Task Count" radius={[0, 6, 6, 0]}>
                                                {issuePriorityData.map((entry, idx) => (
                                                    <Cell key={`cell-${idx}`} fill={entry.color || CHART_PALETTE[idx % CHART_PALETTE.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No prioritized tasks in database" />
                                )}
                            </ChartCard>

                            {/* B5. COMPLETION RATE PER MEMBER */}
                            <ChartCard title="Completion Rate Per Member" category="Execution Efficacy" index={6}>
                                {completionRateData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <BarChart data={completionRateData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" horizontal={false} />
                                            <XAxis type="number" domain={[0, 100]} unit="%" stroke="#71717A" fontSize={11} />
                                            <YAxis dataKey="name" type="category" stroke="#E4E4E7" fontSize={11} width={80} />
                                            <Tooltip content={<CustomCountTooltip valueSuffix="%" />} />
                                            <Bar dataKey="rate" name="Completion Rate" fill={COLORS.green} radius={[0, 6, 6, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No task assignment data to calculate completion rate" />
                                )}
                            </ChartCard>

                            {/* B6. SELF-CLAIMED VS LEADER-ASSIGNED SPLIT */}
                            <ChartCard title="Self-Claimed vs Leader-Assigned" category="Initiative Split" index={7}>
                                {assignmentSplitData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <BarChart data={assignmentSplitData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                                            <XAxis dataKey="name" stroke="#71717A" fontSize={11} />
                                            <YAxis stroke="#71717A" fontSize={11} allowDecimals={false} />
                                            <Tooltip content={<CustomCountTooltip valueSuffix=" tasks" />} />
                                            <Legend wrapperStyle={{ fontSize: '11px', color: '#A1A1AA' }} />
                                            <Bar dataKey="SelfClaimed" name="Self Claimed" stackId="a" fill={COLORS.primary} radius={[0, 0, 0, 0]} />
                                            <Bar dataKey="LeaderAssigned" name="Leader Assigned" stackId="a" fill={COLORS.secondary} radius={[6, 6, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No assignment splits recorded for active members" />
                                )}
                            </ChartCard>
                        </div>
                    </div>

                    {/* 5. CHARTS GRID — SECTION C: PROJECT HEALTH */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-emerald-400 font-mono pl-1 border-l-2 border-emerald-500">
                            Section C — Portfolio & Project Health
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* C1. PROJECT STATUS BREAKDOWN */}
                            <ChartCard title="Project Status Breakdown" category="Portfolio States" snapshot={true} index={8}>
                                {projectStatusData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <PieChart>
                                            <Pie
                                                data={projectStatusData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={88}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {projectStatusData.map((entry, idx) => (
                                                    <Cell key={`cell-${idx}`} fill={entry.color || CHART_PALETTE[idx % CHART_PALETTE.length]} stroke="#0a0a0a" strokeWidth={2} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomCountTooltip valueSuffix=" projects" />} />
                                            <Legend wrapperStyle={{ fontSize: '11px', color: '#A1A1AA' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No project status entries in current team" />
                                )}
                            </ChartCard>

                            {/* C2. PROJECT PRIORITY BREAKDOWN */}
                            <ChartCard title="Project Priority Breakdown" category="Strategic Weight" snapshot={true} index={9}>
                                {projectPriorityData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <PieChart>
                                            <Pie
                                                data={projectPriorityData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={88}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {projectPriorityData.map((entry, idx) => (
                                                    <Cell key={`cell-${idx}`} fill={entry.color || CHART_PALETTE[idx % CHART_PALETTE.length]} stroke="#0a0a0a" strokeWidth={2} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomCountTooltip valueSuffix=" projects" />} />
                                            <Legend wrapperStyle={{ fontSize: '11px', color: '#A1A1AA' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <ChartEmptyState message="No prioritized projects established yet" />
                                )}
                            </ChartCard>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProjectManager;
