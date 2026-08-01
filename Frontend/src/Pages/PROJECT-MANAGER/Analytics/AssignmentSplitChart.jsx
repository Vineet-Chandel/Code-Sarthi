import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AssignmentSplitChart = ({ teamId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!teamId) return;
        fetchSplit();
    }, [teamId]);

    const fetchSplit = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/analytics/assignment-split`, { withCredentials: true });
            const formatted = (res.data.results || []).map(item => ({
                name: item.name || `User ${String(item.userId).substring(0, 6)}`,
                self_claimed: item.self_claimed || 0,
                leader_assigned: item.leader_assigned || 0
            }));
            setData(formatted);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load assignment split");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 flex flex-col h-[380px] transition-all hover:border-white/20">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#534AB7]"></span>
                    Initiative vs. Delegation Split
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Comparison of self-claimed tasks versus leader-assigned tasks</p>
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
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                        </div>
                        <p className="text-sm font-semibold text-zinc-300">No assignment breakdown available</p>
                        <p className="text-xs text-zinc-500 mt-1">Claim or assign issues to observe member initiative distributions.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                        >
                            <XAxis dataKey="name" stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#18181E',
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                                    fontSize: '12px',
                                    color: '#fff'
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                            <Bar dataKey="self_claimed" name="Self-Claimed" stackId="a" fill="#534AB7" radius={[0, 0, 0, 0]} maxBarSize={36} />
                            <Bar dataKey="leader_assigned" name="Leader Assigned" stackId="a" fill="#A7A0F8" radius={[6, 6, 0, 0]} maxBarSize={36} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default AssignmentSplitChart;
