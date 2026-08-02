import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Target, Layers, Check, Users, Clock, Info, AlertCircle, Calendar } from 'lucide-react';
import BASE_URL from './auth/baseURL';
import Scheduler from './SCHEDULER/Scheduler';

const MONOCHROME_COLORS = {
    completed: '#FFFFFF',
    active: '#71717A',
    onHold: '#3F3F46',
    planning: '#27272A',
    primarySeries: '#FFFFFF',
    secondarySeries: '#52525B',
    tertiarySeries: '#3F3F46'
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#121212] border border-white/10 rounded-lg p-2.5 text-xs text-white shadow-xl z-50">
                {label && <div className="text-zinc-400 mb-1.5 font-semibold border-b border-white/10 pb-1">{label}</div>}
                {payload.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-0.5">
                        <span className="flex items-center gap-1.5 text-zinc-300">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color || '#fff' }} />
                            {entry.name || entry.dataKey}:
                        </span>
                        <span className="font-bold text-white font-mono">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// Helper to generate past 7 days chronologically for consistent dynamic graphing
const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
        days.push({ dateStr, dayLabel, dateObj: d });
    }
    return days;
};

const MainDashboard = () => {
    const user = useSelector(state => state?.user?.user?.DATA || state?.user);

    // Core state
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [allGoals, setAllGoals] = useState([]);
    const [allSchedules, setAllSchedules] = useState([]);
    const [teamIssues, setTeamIssues] = useState([]);
    const [activeTimer, setActiveTimer] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [activityFeed, setActivityFeed] = useState([]);

    // Aggregated real analytics state
    const [dailySecondsMap, setDailySecondsMap] = useState({});
    const [selectedLeaderTeamId, setSelectedLeaderTeamId] = useState('');
    const [leaderAnalytics, setLeaderAnalytics] = useState({ activeMembers: 0, idleMembers: 0, totalMembers: 0, activityTrend: [] });
    const [rawStatusCounts, setRawStatusCounts] = useState({ completed: 0, active: 0, on_hold: 0, planning: 0 });

    // Leader teams filter
    const leaderTeams = useMemo(() => {
        return (teams || []).filter(t =>
            t.myRole === 'leader' ||
            t.owner === user?._id ||
            t.creator === user?._id ||
            t?.members?.some(m => (m.user === user?._id || m._id === user?._id) && m.role === 'leader')
        );
    }, [teams, user]);

    useEffect(() => {
        if (leaderTeams.length > 0 && !selectedLeaderTeamId) {
            setSelectedLeaderTeamId(leaderTeams[0]._id);
        }
    }, [leaderTeams, selectedLeaderTeamId]);

    // Fetch dashboard data on mount in parallel
    useEffect(() => {
        let isMounted = true;

        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [teamsRes, goalsRes, schedulesRes, activityRes] = await Promise.all([
                    axios.get(`${BASE_URL}/teams/mine`, { withCredentials: true }).catch(() => ({ data: { teams: [] } })),
                    axios.get(`${BASE_URL}/goals`, { withCredentials: true }).catch(() => ({ data: [] })),
                    axios.get(`${BASE_URL}/schedules`, { withCredentials: true }).catch(() => ({ data: [] })),
                    axios.get(`${BASE_URL}/users/me/activity-feed`, { withCredentials: true }).catch(() => ({ data: { feed: null } }))
                ]);

                if (!isMounted) return;

                const loadedTeams = teamsRes.data.teams || teamsRes.data || [];
                const loadedGoals = Array.isArray(goalsRes.data) ? goalsRes.data : (goalsRes.data.goals || []);
                const loadedSchedules = Array.isArray(schedulesRes.data) ? schedulesRes.data : (schedulesRes.data.schedules || []);
                setTeams(loadedTeams);
                setAllGoals(loadedGoals);
                setAllSchedules(loadedSchedules);

                // For all teams, fetch issues, active timer, project breakdown, and 7-day contribution trends in parallel
                const teamSubRequests = loadedTeams.map(team =>
                    Promise.all([
                        axios.get(`${BASE_URL}/teams/${team._id}/issues`, { withCredentials: true }).catch(() => ({ data: { issues: [] } })),
                        axios.get(`${BASE_URL}/teams/${team._id}/contributions/active`, { withCredentials: true }).catch(() => ({ data: { contributionLog: null } })),
                        axios.get(`${BASE_URL}/teams/${team._id}/analytics/project-breakdown`, { withCredentials: true }).catch(() => ({ data: { byStatus: [] } })),
                        axios.get(`${BASE_URL}/teams/${team._id}/analytics/contribution-trend?days=7`, { withCredentials: true }).catch(() => ({ data: { results: [] } }))
                    ])
                );

                const teamSubResults = await Promise.all(teamSubRequests);
                if (!isMounted) return;

                let mergedIssues = [];
                let foundActiveTimer = null;
                let statusCounts = { completed: 0, active: 0, on_hold: 0, planning: 0 };
                let dailySecMap = {};

                teamSubResults.forEach(([issuesRes, timerRes, breakdownRes, trendRes], index) => {
                    const tId = loadedTeams[index]?._id;
                    const issues = issuesRes.data.issues || issuesRes.data || [];
                    issues.forEach(i => mergedIssues.push({ ...i, teamId: tId, teamName: loadedTeams[index]?.name }));

                    if (!foundActiveTimer && timerRes.data?.contributionLog) {
                        foundActiveTimer = { ...timerRes.data.contributionLog, teamId: tId, issueTitle: timerRes.data?.contributionLog?.issue?.title || "Active Contribution" };
                    }

                    const breakdown = breakdownRes.data?.byStatus || [];
                    breakdown.forEach(item => {
                        const key = item._id === 'in_progress' ? 'active' : (item._id || 'planning');
                        if (statusCounts[key] !== undefined) statusCounts[key] += (item.count || 0);
                        else statusCounts.planning += (item.count || 0);
                    });

                    const trends = trendRes.data?.results || [];
                    trends.forEach(item => {
                        const dayStr = item._id?.day || item.day;
                        if (dayStr) {
                            dailySecMap[dayStr] = (dailySecMap[dayStr] || 0) + (item.totalSeconds || 0);
                        }
                    });
                });

                setTeamIssues(mergedIssues);
                setActiveTimer(foundActiveTimer);
                setRawStatusCounts(statusCounts);
                setDailySecondsMap(dailySecMap);

                // Prepare Activity & Recommendations Feed
                let compiledFeed = [];
                if (activityRes.data?.feed && Array.isArray(activityRes.data.feed)) {
                    compiledFeed = activityRes.data.feed;
                } else {
                    const overdueGoals = loadedGoals.filter(g => g.targetDate && new Date(g.targetDate) < new Date() && g.status !== 'Completed');
                    if (overdueGoals.length > 0) {
                        compiledFeed.push({
                            id: 'rec-1',
                            type: 'recommendation',
                            icon: 'alert',
                            text: `You have ${overdueGoals.length} overdue goal${overdueGoals.length > 1 ? 's' : ''} requiring attention.`,
                            time: 'Action required'
                        });
                    }
                    const openIssues = mergedIssues.filter(i => i.status === 'open' || i.status === 'todo');
                    if (openIssues.length > 0) {
                        compiledFeed.push({
                            id: 'rec-2',
                            type: 'recommendation',
                            icon: 'info',
                            text: `${openIssues.length} issue${openIssues.length > 1 ? 's are' : ' is'} waiting in active projects.`,
                            time: 'Recommendation'
                        });
                    }
                    if (loadedGoals.length === 0) {
                        compiledFeed.push({
                            id: 'rec-3',
                            type: 'recommendation',
                            icon: 'calendar',
                            text: 'Schedule your first focus goal for today to start tracking consistency.',
                            time: 'Tip'
                        });
                    }

                    const recentEvents = [
                        ...mergedIssues.slice(0, 4).map(i => ({
                            id: `iss-${i._id || Math.random()}`,
                            type: 'event',
                            icon: 'issue',
                            text: `Issue "${i.title || i.name}" active in ${i.teamName || 'Team'}`,
                            time: 'Recently active'
                        })),
                        ...loadedGoals.slice(0, 3).map(g => ({
                            id: `goal-${g._id || Math.random()}`,
                            type: 'event',
                            icon: 'goal',
                            text: `Goal scheduled: "${g.name || g.title}" (${g.priority || 'Medium'})`,
                            time: g.targetDate ? `Due ${new Date(g.targetDate).toLocaleDateString()}` : 'Scheduled'
                        }))
                    ];
                    compiledFeed = [...compiledFeed, ...recentEvents].slice(0, 7);
                }
                setActivityFeed(compiledFeed);

            } catch (err) {
                console.error("Dashboard data fetching error:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchAllData();
        return () => { isMounted = false; };
    }, []);

    // Fetch team leader analytics when selected leader team changes (100% Dynamic)
    useEffect(() => {
        if (!selectedLeaderTeamId) return;

        const fetchLeaderAnalytics = async () => {
            try {
                const currentTeam = teams.find(t => t._id === selectedLeaderTeamId);
                const totalMembers = currentTeam?.members?.length || 0;

                const [idleRes, trendRes] = await Promise.all([
                    axios.get(`${BASE_URL}/teams/${selectedLeaderTeamId}/analytics/idle-members?days=7`, { withCredentials: true }).catch(() => ({ data: { idleMembers: [] } })),
                    axios.get(`${BASE_URL}/teams/${selectedLeaderTeamId}/analytics/contribution-trend?days=7`, { withCredentials: true }).catch(() => ({ data: { results: [] } }))
                ]);

                const idleCount = idleRes.data?.idleMembers?.length || 0;
                const activeCount = Math.max(0, totalMembers - idleCount);

                // Build dynamic daily trend over last 7 days from actual team contribution logs
                const teamResults = trendRes.data?.results || [];
                const dayActivityMap = {};
                teamResults.forEach(item => {
                    const day = item._id?.day || item.day;
                    if (day) {
                        dayActivityMap[day] = parseFloat(((item.totalSeconds || 0) / 3600).toFixed(1));
                    }
                });

                const dynamicTrend = getLast7Days().map(d => ({
                    day: d.dayLabel,
                    activeHours: dayActivityMap[d.dateStr] || 0
                }));

                setLeaderAnalytics({
                    activeMembers: activeCount,
                    idleMembers: idleCount,
                    activityTrend: dynamicTrend,
                    totalMembers
                });
            } catch (err) {
                console.error("Failed to load leader analytics:", err);
            }
        };

        fetchLeaderAnalytics();
    }, [selectedLeaderTeamId, teams]);

    // Active contribution timer interval
    useEffect(() => {
        let interval = null;
        if (activeTimer && activeTimer.startedAt) {
            const updateTimer = () => {
                const start = new Date(activeTimer.startedAt).getTime();
                const diff = Math.max(0, Math.floor((Date.now() - start) / 1000));
                setElapsedSeconds(diff);
            };
            updateTimer();
            interval = setInterval(updateTimer, 1000);
        } else {
            setElapsedSeconds(0);
        }
        return () => { if (interval) clearInterval(interval); };
    }, [activeTimer]);

    const formatTimer = (totalSec) => {
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        return `${h > 0 ? `${h.toString().padStart(2, '0')}:` : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleStopTimer = async (logId) => {
        if (!logId || !activeTimer?.teamId) return;
        try {
            await axios.post(`${BASE_URL}/teams/${activeTimer.teamId}/contributions/stop`, { contributionLogId: logId }, { withCredentials: true });
            setActiveTimer(null);
            setElapsedSeconds(0);
        } catch (err) {
            console.error("Failed to stop contribution timer:", err);
        }
    };

    // Today's focus checklist items
    const todayItems = useMemo(() => {
        const todayStr = new Date().toDateString();
        const goalsForToday = allGoals.filter(g => {
            const isInProgress = g.status === 'In Progress' || g.status === 'in_progress';
            const isDueToday = g.targetDate && new Date(g.targetDate).toDateString() === todayStr;
            const isOverdue = g.targetDate && new Date(g.targetDate) < new Date() && g.status !== 'Completed';
            return isInProgress || isDueToday || isOverdue;
        }).map(g => ({
            id: g._id,
            type: 'goal',
            title: g.name || g.title || "Untitled Goal",
            priority: g.priority || 'Medium',
            completed: g.status === 'Completed' || g.status === 'completed',
            original: g
        }));

        const issuesForToday = teamIssues.filter(i =>
            i.status === 'in_progress' || i.status === 'In Progress' || i.status === 'active'
        ).map(i => ({
            id: i._id,
            type: 'issue',
            title: i.title || i.name || "Team Issue",
            priority: i.priority || 'Normal',
            completed: i.status === 'done' || i.status === 'Completed',
            original: i,
            teamId: i.teamId
        }));

        return [...goalsForToday, ...issuesForToday];
    }, [allGoals, teamIssues]);

    const handleToggleItem = async (item) => {
        const nextCompleted = !item.completed;
        if (item.type === 'goal') {
            const newStatus = nextCompleted ? 'Completed' : 'In Progress';
            setAllGoals(prev => prev.map(g => g._id === item.id ? { ...g, status: newStatus, updatedAt: new Date().toISOString() } : g));
            try {
                await axios.put(`${BASE_URL}/goals/${item.id}`, { ...item.original, status: newStatus }, { withCredentials: true });
            } catch (err) {
                console.error("Failed to update goal status:", err);
            }
        } else if (item.type === 'issue' && item.teamId) {
            const newStatus = nextCompleted ? 'done' : 'in_progress';
            setTeamIssues(prev => prev.map(i => i._id === item.id ? { ...i, status: newStatus, updatedAt: new Date().toISOString() } : i));
            try {
                await axios.patch(`${BASE_URL}/teams/${item.teamId}/issues/${item.id}`, { status: newStatus }, { withCredentials: true });
            } catch (err) {
                console.error("Failed to update issue status:", err);
            }
        }
    };

    // 100% Dynamic Project Coverage Comparison (Monochrome chart 1)
    const projectCoverageData = useMemo(() => {
        const completedCount = allGoals.filter(g => ['Completed', 'completed', 'Done'].includes(g.status)).length +
            teamIssues.filter(i => ['done', 'Completed', 'closed'].includes(i.status)).length +
            (rawStatusCounts.completed || 0);

        const activeCount = allGoals.filter(g => ['In Progress', 'in_progress', 'On Track', 'active'].includes(g.status)).length +
            teamIssues.filter(i => ['in_progress', 'In Progress', 'active'].includes(i.status)).length +
            (rawStatusCounts.active || 0);

        const onHoldCount = allGoals.filter(g => ['Not Started', 'On Hold', 'At Risk', 'Pending', 'not_started'].includes(g.status)).length +
            teamIssues.filter(i => ['open', 'todo', 'on_hold', 'planning'].includes(i.status)).length +
            ((rawStatusCounts.on_hold || 0) + (rawStatusCounts.planning || 0));

        const result = [
            { name: 'Completed', value: completedCount, color: MONOCHROME_COLORS.completed },
            { name: 'Active', value: activeCount, color: MONOCHROME_COLORS.active },
            { name: 'On Hold', value: onHoldCount, color: MONOCHROME_COLORS.onHold }
        ].filter(item => item.value > 0);

        return result;
    }, [allGoals, teamIssues, rawStatusCounts]);

    // 100% Dynamic Weekly Contribution vs Goal Completion Data (Monochrome chart 2)
    const weeklyProgressData = useMemo(() => {
        const pastDays = getLast7Days();
        return pastDays.map(d => {
            const dateStr = d.dateStr; // YYYY-MM-DD
            // Calculate real hours contributed on this specific date
            const seconds = dailySecondsMap[dateStr] || 0;
            const hours = parseFloat((seconds / 3600).toFixed(1));

            // Count real goals, issues, or schedules completed on this day
            const doneGoals = allGoals.filter(g => {
                if (!['Completed', 'completed', 'Done'].includes(g.status)) return false;
                const matchDate = g.updatedAt || g.targetDate || g.dueDate;
                return matchDate && new Date(matchDate).toISOString().split('T')[0] === dateStr;
            }).length;

            const doneSchedules = allSchedules.filter(s => {
                if (s.status !== 'Completed') return false;
                const matchDate = s.endTime || s.startTime;
                return matchDate && new Date(matchDate).toISOString().split('T')[0] === dateStr;
            }).length;

            const doneIssues = teamIssues.filter(i => {
                if (!['done', 'Completed', 'closed'].includes(i.status)) return false;
                const matchDate = i.updatedAt || i.createdAt;
                return matchDate && new Date(matchDate).toISOString().split('T')[0] === dateStr;
            }).length;

            return {
                day: d.dayLabel,
                date: dateStr,
                goals: doneGoals + doneSchedules + doneIssues,
                hours: hours
            };
        });
    }, [dailySecondsMap, allGoals, allSchedules, teamIssues]);

    // 100% Dynamic Issue Resolution Snapshot (Monochrome chart 3)
    const issueResolutionData = useMemo(() => {
        const open = teamIssues.filter(i => ['open', 'todo', 'planning', 'backlog'].includes(i.status) || !i.status).length;
        const inProg = teamIssues.filter(i => ['in_progress', 'In Progress', 'active', 'in progress'].includes(i.status)).length;
        const done = teamIssues.filter(i => ['done', 'Completed', 'resolved', 'closed'].includes(i.status)).length;

        return [
            { status: 'Open', count: open, color: '#3F3F46' },
            { status: 'In Progress', count: inProg, color: '#71717A' },
            { status: 'Resolved', count: done, color: '#FFFFFF' }
        ];
    }, [teamIssues]);

    // Loading Skeleton (Solid gray placeholders, NO shimmer, NO glow)
    if (loading) {
        return (
            <div className="bg-[#212121] min-h-screen lg:h-screen lg:overflow-hidden p-4 lg:p-6 flex flex-col gap-6 text-white font-sans">
                <div className="shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-[#000000] border border-white/[0.04] rounded-2xl h-80 p-5 flex flex-col gap-4">
                        <div className="w-1/3 h-5 bg-zinc-900 rounded" />
                        <div className="w-full h-20 bg-zinc-900/60 rounded-xl" />
                        <div className="w-full flex-1 bg-zinc-900/40 rounded-xl" />
                    </div>
                    <div className="bg-[#000000] border border-white/[0.04] rounded-2xl h-80 p-5 flex flex-col gap-4">
                        <div className="w-1/2 h-5 bg-zinc-900 rounded" />
                        <div className="w-full h-10 bg-zinc-900/60 rounded-xl" />
                        <div className="w-full h-10 bg-zinc-900/60 rounded-xl" />
                        <div className="w-full h-10 bg-zinc-900/60 rounded-xl" />
                    </div>
                    <div className="bg-[#000000] border border-white/[0.04] rounded-2xl h-80 p-5 flex flex-col gap-4">
                        <div className="w-1/2 h-5 bg-zinc-900 rounded" />
                        <div className="w-full flex-1 bg-zinc-900/40 rounded-xl" />
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                    <div className="lg:col-span-7 bg-[#000000] border border-white/[0.04] rounded-2xl p-5 min-h-[400px] lg:min-h-0" />
                    <div className="lg:col-span-5 bg-[#000000] border border-white/[0.04] rounded-2xl p-5 min-h-[400px] lg:min-h-0" />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0.5a0.5a0.5a] min-h-screen lg:h-screen lg:overflow-hidden p-4 lg:p-6 flex flex-col gap-6 text-white font-sans"
        >
            {/* UPPER ZONE: 3 Columns fixed height on desktop, smart responsive ordering on mobile */}
            <div className="shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Box 1: Team Growth Analytics (Mobile Order 3, Desktop Order 1) */}
                <div className="order-3 lg:order-1 bg-[#000000] border border-white/[0.06] rounded-2xl p-5 h-80 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-3 shrink-0">
                        <div>
                            <h2 className="text-sm font-semibold text-white">Team Growth Analytics</h2>
                            <span className="text-[11px] text-zinc-500 font-medium">Leadership & engagement</span>
                        </div>
                        {leaderTeams.length > 1 && (
                            <select
                                value={selectedLeaderTeamId}
                                onChange={(e) => setSelectedLeaderTeamId(e.target.value)}
                                className="bg-[#121215] border border-white/10 text-xs text-zinc-300 rounded-lg px-2 py-1 outline-none focus:border-white/30"
                            >
                                {leaderTeams.map(t => (
                                    <option key={t._id} value={t._id}>{t.name}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    {leaderTeams.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                            <p className="text-xs text-zinc-400 font-medium max-w-[220px] leading-relaxed">
                                You don't lead any teams yet. Analytics for team growth and member engagement will appear here when you lead a team.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col flex-1 min-h-0 justify-between">
                            {/* Key Stat Numbers Row */}
                            <div className="grid grid-cols-3 gap-2 py-1 shrink-0">
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-center">
                                    <span className="text-xl font-bold text-white tracking-tight block">
                                        {leaderAnalytics.totalMembers || 0}
                                    </span>
                                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Members</span>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-center">
                                    <span className="text-xl font-bold text-white tracking-tight block">
                                        {leaderAnalytics.activeMembers}
                                    </span>
                                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Active</span>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-center">
                                    <span className="text-xl font-bold text-white tracking-tight block">
                                        {leaderAnalytics.idleMembers}
                                    </span>
                                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Idle</span>
                                </div>
                            </div>

                            {/* Compact Monochrome Activity Chart */}
                            <div className="flex-1 min-h-0 pt-2 w-full">
                                {leaderAnalytics.activityTrend.every(d => d.activeHours === 0) ? (
                                    <div className="h-full flex items-center justify-center">
                                        <span className="text-[11px] text-zinc-500 italic">No working hours recorded in past 7 days.</span>
                                    </div>
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={leaderAnalytics.activityTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                            <XAxis dataKey="day" stroke="#71717A" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#71717A" fontSize={10} tickLine={false} axisLine={false} />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                                            <Bar dataKey="activeHours" name="Active Hours" fill="#A1A1AA" radius={[4, 4, 0, 0]} maxBarSize={24} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Box 2: Today's Focus (Mobile Order 1, Desktop Order 2 - Highest Priority) */}
                <div className="order-1 lg:order-2 bg-[#000000] border border-white/[0.06] rounded-2xl p-5 h-80 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-3 shrink-0">
                        <h2 className="text-sm font-semibold text-white">Today's Focus</h2>
                        <span className="text-xs text-zinc-400 font-semibold">
                            {todayItems.filter(i => i.completed).length} of {todayItems.length} done today
                        </span>
                    </div>

                    {/* Active Contribution Timer (NO glow, NO pulse animation) */}
                    {activeTimer && (
                        <div className="flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 mb-3 shrink-0">
                            <div className="flex items-center gap-2 truncate">
                                <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                                <span className="text-xs font-bold text-white truncate">Live: {activeTimer.issueTitle || "Contribution"}</span>
                            </div>
                            <div className="flex items-center gap-2.5 shrink-0">
                                <span className="text-xs font-mono text-zinc-300 font-bold">{formatTimer(elapsedSeconds)}</span>
                                <button
                                    onClick={() => handleStopTimer(activeTimer._id)}
                                    className="bg-white text-black font-bold text-xs px-2.5 py-1 rounded-lg hover:bg-zinc-200 transition-colors"
                                >
                                    Stop
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Checklist Items - using scrollbar-none */}
                    <div className="flex-1 overflow-y-auto scrollbar-none space-y-1.5 pr-0.5 min-h-0">
                        {todayItems.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-center">
                                <p className="text-xs text-zinc-500 italic">Nothing scheduled or in progress for today.</p>
                            </div>
                        ) : (
                            todayItems.map(item => (
                                <div
                                    key={`${item.type}-${item.id}`}
                                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition-colors ${item.completed ? 'bg-white/[0.01] border-white/[0.03] text-zinc-500' : 'bg-white/[0.03] border-white/10 text-white hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <button
                                            onClick={() => handleToggleItem(item)}
                                            className={`w-4 h-4 rounded shrink-0 border flex items-center justify-center transition-colors ${item.completed ? 'bg-white text-black border-white' : 'border-zinc-500 hover:border-white'
                                                }`}
                                        >
                                            {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                                        </button>
                                        <span className={`text-xs font-medium truncate ${item.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                                            {item.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-semibold bg-white/[0.04] px-2 py-0.5 rounded">
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                                            {item.priority}
                                        </span>
                                        {item.type === 'goal' ? (
                                            <Target className="w-3.5 h-3.5 text-zinc-500" title="Personal Goal" />
                                        ) : (
                                            <Layers className="w-3.5 h-3.5 text-zinc-500" title="Team Issue" />
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Box 3: Notifications & Recommendations (Mobile Order 2, Desktop Order 3) */}
                <div className="order-2 lg:order-3 bg-[#000000] border border-white/[0.06] rounded-2xl p-5 h-80 flex flex-col justify-between overflow-hidden">
                    <div className="border-b border-white/[0.06] pb-3 mb-3 shrink-0">
                        <h2 className="text-sm font-semibold text-white">Activity & Recommendations</h2>
                        <span className="text-[11px] text-zinc-500 font-medium">System signals & updates</span>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-none space-y-2 pr-0.5 min-h-0">
                        {activityFeed.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-center">
                                <p className="text-xs text-zinc-500 italic">No recent activity or pending recommendations.</p>
                            </div>
                        ) : (
                            activityFeed.map((entry, index) => {
                                let IconComp = Info;
                                if (entry.icon === 'alert') IconComp = AlertCircle;
                                else if (entry.icon === 'calendar') IconComp = Calendar;
                                else if (entry.icon === 'issue') IconComp = Layers;
                                else if (entry.icon === 'goal') IconComp = Target;

                                return (
                                    <div
                                        key={entry.id || index}
                                        className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.04] rounded-xl p-2.5 hover:bg-white/[0.04] transition-colors"
                                    >
                                        <div className="p-1 rounded-lg bg-white/[0.05] text-zinc-400 shrink-0 mt-0.5">
                                            <IconComp className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-medium text-zinc-300 leading-snug break-words">{entry.text}</p>
                                            <span className="text-[10px] text-zinc-500 font-semibold mt-1 block">{entry.time}</span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* LOWER ZONE: Fills remaining viewport height on desktop, standard stacked flow on mobile */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:min-h-0">

                {/* Lower Zone Left: Upgraded Scheduler (7 columns on desktop) */}
                <div className="lg:col-span-7 bg-[#000000] border border-white/[0.06] rounded-2xl p-5 overflow-y-auto scrollbar-none flex flex-col min-h-[500px] lg:min-h-0">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3 shrink-0">
                        <div>
                            <h2 className="text-sm font-semibold text-white">Scheduler & Goal Tracker</h2>
                            <p className="text-[11px] text-zinc-500">Click any day to inspect focus schedules or add inline goals</p>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden">
                        <Scheduler
                            embedded={true}
                            goals={allGoals}
                            onGoalCreated={(newGoal) => setAllGoals(prev => [...prev, newGoal])}
                        />
                    </div>
                </div>

                {/* Lower Zone Right: Key Analysis Graphs (5 columns on desktop) */}
                <div className="lg:col-span-5 bg-[#000000] border border-white/[0.06] rounded-2xl p-5 overflow-y-auto scrollbar-none flex flex-col gap-6 min-h-[500px] lg:min-h-0">
                    <div className="border-b border-white/[0.06] pb-3 shrink-0">
                        <h2 className="text-sm font-semibold text-white">Performance & Coverage</h2>
                        <span className="text-[11px] text-zinc-500">Monochrome cross-team analytics</span>
                    </div>

                    {/* Chart 1: Project Coverage Comparison (Donut Chart - 100% Dynamic) */}
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex flex-col shrink-0">
                        <h3 className="text-xs font-semibold text-zinc-300 mb-2">Project Coverage Comparison</h3>
                        {projectCoverageData.length === 0 ? (
                            <div className="h-40 flex items-center justify-center text-center">
                                <span className="text-xs text-zinc-500 italic">No active projects or goals to chart.</span>
                            </div>
                        ) : (
                            <>
                                <div className="h-40 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Tooltip content={<CustomTooltip />} />
                                            <Pie
                                                data={projectCoverageData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={65}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {projectCoverageData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-4 pt-1 border-t border-white/5 text-xs">
                                    {projectCoverageData.map(item => (
                                        <div key={item.name} className="flex items-center gap-1.5 font-medium text-zinc-400">
                                            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                                            <span>{item.name} ({item.value})</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Chart 2: Weekly Contribution vs Goal Completion (100% Dynamic) */}
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex flex-col shrink-0">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold text-zinc-300">Weekly Progress Overlap</h3>
                            <div className="flex items-center gap-3 text-[10px] text-zinc-400">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-white rounded-full" /> Goals Done</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-zinc-600 rounded-full" /> Hours Contributed</span>
                            </div>
                        </div>
                        <div className="h-36 w-full">
                            {weeklyProgressData.every(d => d.goals === 0 && d.hours === 0) ? (
                                <div className="h-full flex items-center justify-center text-center">
                                    <span className="text-xs text-zinc-500 italic">No completions or contribution hours recorded this week.</span>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={weeklyProgressData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                                        <XAxis dataKey="day" stroke="#71717A" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#71717A" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line type="monotone" dataKey="goals" name="Goals Completed" stroke="#FFFFFF" strokeWidth={2.5} dot={{ fill: '#FFF', r: 3 }} />
                                        <Line type="monotone" dataKey="hours" name="Hours Contributed" stroke="#52525B" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Chart 3: Issue Resolution Snapshot (100% Dynamic) */}
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex flex-col shrink-0">
                        <h3 className="text-xs font-semibold text-zinc-300 mb-3">Issue Resolution Snapshot</h3>
                        {teamIssues.length === 0 ? (
                            <div className="py-6 flex items-center justify-center text-center">
                                <span className="text-xs text-zinc-500 italic">No assigned team issues found to analyze.</span>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {issueResolutionData.map(item => {
                                    const total = issueResolutionData.reduce((a, b) => a + b.count, 0) || 1;
                                    const pct = Math.round((item.count / total) * 100);
                                    return (
                                        <div key={item.status} className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="font-medium text-zinc-300">{item.status}</span>
                                                <span className="font-mono font-bold text-white">{item.count} <span className="text-zinc-500 text-[10px]">({pct}%)</span></span>
                                            </div>
                                            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{ width: `${pct}%`, backgroundColor: item.color }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default MainDashboard;
