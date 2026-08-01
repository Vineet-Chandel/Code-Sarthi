import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const STATUS_COLORS = {
    planning: '#71717A', // zinc-500
    active: '#534AB7',    // primary accent
    on_hold: '#F59E0B',   // amber
    completed: '#10B981', // emerald
    default: '#A7A0F8'
};

const PRIORITY_COLORS = {
    low: '#71717A',       // zinc-500
    medium: '#534AB7',    // primary accent
    high: '#A7A0F8',      // secondary accent
    urgent: '#F43F5E',    // rose/red
    default: '#6358D4'
};

const ProjectBreakdownCharts = ({ teamId }) => {
    const [byStatus, setByStatus] = useState([]);
    const [byPriority, setByPriority] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!teamId) return;
        fetchBreakdown();
    }, [teamId]);

    const fetchBreakdown = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/analytics/project-breakdown`, { withCredentials: true });
            
            const statusData = (res.data.byStatus || []).map(item => ({
                name: (item._id || 'unknown').replace('_', ' ').toUpperCase(),
                rawName: item._id,
                value: item.count,
                color: STATUS_COLORS[item._id] || STATUS_COLORS.default
            }));

            const priorityData = (res.data.byPriority || []).map(item => ({
                name: (item._id || 'unknown').toUpperCase(),
                rawName: item._id,
                value: item.count,
                color: PRIORITY_COLORS[item._id] || PRIORITY_COLORS.default
            }));

            setByStatus(statusData);
            setByPriority(priorityData);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load project breakdown");
        } finally {
            setLoading(false);
        }
    };

    const hasData = byStatus.length > 0 || byPriority.length > 0;

    return (
        <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 flex flex-col h-[380px] transition-all hover:border-white/20">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#534AB7]"></span>
                    Project Portfolio Health
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Distribution of active projects by current status and priority level</p>
            </div>

            <div className="flex-1 w-full min-h-0">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-[#534AB7] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="w-full h-full flex items-center justify-center text-xs text-red-400">
                        {error}
                    </div>
                ) : !hasData ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <p className="text-sm font-semibold text-zinc-300">No projects to analyze</p>
                        <p className="text-xs text-zinc-500 mt-1">Create projects within this team to observe portfolio distributions.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                        {/* Status Breakdown */}
                        <div className="flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-xl p-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">By Status</span>
                            <div className="w-full h-36">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18181E',
                                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '10px',
                                                fontSize: '11px',
                                                color: '#fff'
                                            }}
                                        />
                                        <Pie
                                            data={byStatus}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={35}
                                            outerRadius={55}
                                            paddingAngle={4}
                                        >
                                            {byStatus.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="#121215" strokeWidth={2} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-1">
                                {byStatus.map((item) => (
                                    <div key={item.name} className="flex items-center gap-1 text-[10px] text-zinc-300 font-semibold">
                                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                        <span>{item.name}: {item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Priority Breakdown */}
                        <div className="flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-xl p-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">By Priority</span>
                            <div className="w-full h-36">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18181E',
                                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '10px',
                                                fontSize: '11px',
                                                color: '#fff'
                                            }}
                                        />
                                        <Pie
                                            data={byPriority}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={35}
                                            outerRadius={55}
                                            paddingAngle={4}
                                        >
                                            {byPriority.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="#121215" strokeWidth={2} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-1">
                                {byPriority.map((item) => (
                                    <div key={item.name} className="flex items-center gap-1 text-[10px] text-zinc-300 font-semibold">
                                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                        <span>{item.name}: {item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectBreakdownCharts;
