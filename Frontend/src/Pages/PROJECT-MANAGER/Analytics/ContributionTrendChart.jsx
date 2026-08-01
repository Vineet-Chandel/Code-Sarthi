import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ContributionTrendChart = ({ teamId }) => {
    const [trendData, setTrendData] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('all');
    const [days, setDays] = useState('30');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!teamId) return;
        fetchMembers();
    }, [teamId]);

    useEffect(() => {
        if (!teamId) return;
        fetchTrend();
    }, [teamId, selectedUser, days]);

    const fetchMembers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/members`, { withCredentials: true });
            setMembers(res.data.members || []);
        } catch (err) {
            console.error("Failed to load members for trend filter", err);
        }
    };

    const fetchTrend = async () => {
        setLoading(true);
        try {
            let url = `${BASE_URL}/teams/${teamId}/analytics/contribution-trend?days=${days}`;
            if (selectedUser !== 'all') {
                url += `&userId=${selectedUser}`;
            }
            const res = await axios.get(url, { withCredentials: true });
            const raw = res.data.results || [];

            // Group by day to ensure a unique x-axis data point per date
            const dayMap = {};
            raw.forEach(item => {
                const day = item._id.day;
                if (!dayMap[day]) {
                    dayMap[day] = { date: day, totalSeconds: 0 };
                }
                dayMap[day].totalSeconds += item.totalSeconds;
            });

            // Sort dates chronologically and format hours
            const formatted = Object.values(dayMap)
                .sort((a, b) => a.date.localeCompare(b.date))
                .map(item => ({
                    date: item.date,
                    displayDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    hours: parseFloat((item.totalSeconds / 3600).toFixed(2))
                }));

            setTrendData(formatted);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load contribution trend");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 flex flex-col h-[380px] transition-all hover:border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#A7A0F8]"></span>
                        Time Contribution Trend
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Daily hours logged over time</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <select
                        value={selectedUser}
                        onChange={e => setSelectedUser(e.target.value)}
                        className="bg-white/5 border border-white/10 text-zinc-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#534AB7] transition-colors"
                    >
                        <option value="all" className="bg-[#121215]">All Members (Team Aggregate)</option>
                        {members.map(m => m.userId && (
                            <option key={m.userId._id} value={m.userId._id} className="bg-[#121215]">
                                {m.userId.firstName} {m.userId.lastName}
                            </option>
                        ))}
                    </select>

                    <select
                        value={days}
                        onChange={e => setDays(e.target.value)}
                        className="bg-white/5 border border-white/10 text-zinc-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#534AB7] transition-colors shrink-0"
                    >
                        <option value="14" className="bg-[#121215]">14 Days</option>
                        <option value="30" className="bg-[#121215]">30 Days</option>
                        <option value="60" className="bg-[#121215]">60 Days</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-[#A7A0F8] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="w-full h-full flex items-center justify-center text-xs text-red-400">
                        {error}
                    </div>
                ) : trendData.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <p className="text-sm font-semibold text-zinc-300">No trend data available</p>
                        <p className="text-xs text-zinc-500 mt-1">No completed timer sessions recorded in this timeframe.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={trendData}
                            margin={{ top: 10, right: 30, left: -10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                            <XAxis dataKey="displayDate" stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} unit="h" />
                            <Tooltip
                                formatter={(val) => [`${val} hrs`, 'Contributed Time']}
                                labelFormatter={(label) => `Date: ${label}`}
                                contentStyle={{
                                    backgroundColor: '#18181E',
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                                    fontSize: '12px',
                                    color: '#fff'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="hours"
                                stroke="#A7A0F8"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#A7A0F8', strokeWidth: 2, stroke: '#121215' }}
                                activeDot={{ r: 6, fill: '#fff', stroke: '#534AB7', strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default ContributionTrendChart;
