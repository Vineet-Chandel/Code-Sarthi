import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const IdleMembersList = ({ teamId }) => {
    const [idleMembers, setIdleMembers] = useState([]);
    const [days, setDays] = useState(7);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!teamId) return;
        fetchIdle();
    }, [teamId, days]);

    const fetchIdle = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/analytics/idle-members?days=${days}`, { withCredentials: true });
            setIdleMembers(res.data.idleMembers || []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load idle member data");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Never contributed';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 flex flex-col h-[380px] transition-all hover:border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        Idle Member Detection
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Active team members with zero recorded contributions recently</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 shrink-0">
                    <span>Threshold:</span>
                    <input
                        type="number"
                        min="1"
                        max="365"
                        value={days}
                        onChange={e => setDays(Math.max(1, Number(e.target.value) || 1))}
                        className="w-10 bg-transparent text-center text-[#A7A0F8] font-bold focus:outline-none border-b border-white/20 focus:border-[#534AB7]"
                    />
                    <span>days</span>
                </div>
            </div>

            <div className="flex-1 w-full overflow-y-auto pr-1 space-y-3">
                {loading ? (
                    <div className="w-full h-40 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="w-full h-40 flex items-center justify-center text-xs text-red-400">
                        {error}
                    </div>
                ) : idleMembers.length === 0 ? (
                    <div className="w-full h-48 flex flex-col items-center justify-center text-center p-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2 shadow-sm shadow-emerald-500/20">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-sm font-semibold text-emerald-300">No idle members detected</p>
                        <p className="text-xs text-zinc-500 mt-1">All active team members have logged contribution time in the last {days} days!</p>
                    </div>
                ) : (
                    idleMembers.map((member) => (
                        <div
                            key={member.userId}
                            className="bg-amber-500/[0.03] hover:bg-amber-500/[0.06] border border-white/5 border-l-4 border-l-amber-500/80 rounded-r-xl p-3.5 flex items-center justify-between gap-4 transition-all"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 text-xs font-bold shrink-0">
                                    {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-bold text-white truncate flex items-center gap-2">
                                        {member.name || 'Anonymous Member'}
                                        <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">
                                            {member.role}
                                        </span>
                                    </div>
                                    <div className="text-xs text-zinc-400 truncate">{member.email || "No email available"}</div>
                                </div>
                            </div>

                            <div className="text-right shrink-0">
                                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400/90">
                                    Last Active
                                </div>
                                <div className="text-xs font-medium text-zinc-300 mt-0.5">
                                    {formatDate(member.lastActive)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default IdleMembersList;
