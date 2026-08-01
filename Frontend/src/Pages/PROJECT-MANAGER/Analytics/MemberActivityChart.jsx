import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const MemberActivityChart = ({ teamId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('all');

    useEffect(() => {
        if (!teamId) return;
        fetchActivity();
    }, [teamId, timeframe]);

    const fetchActivity = async () => {
        setLoading(true);
        try {
            let url = `${BASE_URL}/teams/${teamId}/analytics/member-activity`;
            if (timeframe !== 'all') {
                const days = Number(timeframe);
                const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
                url += `?since=${encodeURIComponent(since)}`;
            }
            const res = await axios.get(url, { withCredentials: true });
            const formatted = res.data.results.map(item => ({
                name: item.name || `User ${item.userId.substring(0, 6)}`,
                hours: parseFloat((item.totalSeconds / 3600).toFixed(2)),
                sessions: item.sessionCount,
                totalSeconds: item.totalSeconds
            }));
            setData(formatted);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load member activity");
        } finally {
            setLoading(false);
        }
    };

    const formatTooltip = (value, name, props) => {
        if (name === 'hours') {
            const totalSec = props.payload.totalSeconds;
            const h = Math.floor(totalSec / 3600);
            const m = Math.floor((totalSec % 3600) / 60);
            return [`${h}h ${m}m (${value} hrs)`, 'Contribution Time'];
        }
        return [value, 'Completed Sessions'];
    };

    return (
        <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 flex flex-col h-[380px] transition-all hover:border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#534AB7]"></span>
                        Member Activity Ranking
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Total elapsed working hours per team member</p>
                </div>
                <select
                    value={timeframe}
                    onChange={e => setTimeframe(e.target.value)}
                    className="bg-white/5 border border-white/10 text-zinc-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#534AB7] transition-colors"
                >
                    <option value="all" className="bg-[#121215]">All Time</option>
                    <option value="30" className="bg-[#121215]">Last 30 Days</option>
                    <option value="7" className="bg-[#121215]">Last 7 Days</option>
                </select>
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
                ) : data.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-sm font-semibold text-zinc-300">No contribution time recorded yet</p>
                        <p className="text-xs text-zinc-500 mt-1">Start a timer on any project issue to populate activity data.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                        >
                            <XAxis type="number" stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis
                                type="category"
                                dataKey="name"
                                stroke="#A1A1AA"
                                fontSize={12}
                                width={100}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                formatter={formatTooltip}
                                contentStyle={{
                                    backgroundColor: '#18181E',
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                                    fontSize: '12px',
                                    color: '#fff'
                                }}
                            />
                            <Bar dataKey="hours" radius={[0, 6, 6, 0]} maxBarSize={28}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#A7A0F8' : '#534AB7'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default MemberActivityChart;
