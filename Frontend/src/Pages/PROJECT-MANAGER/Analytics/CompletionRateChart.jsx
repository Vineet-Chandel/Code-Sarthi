import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const CompletionRateChart = ({ teamId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!teamId) return;
        fetchRates();
    }, [teamId]);

    const fetchRates = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/analytics/completion-rate`, { withCredentials: true });
            setData(res.data.results || []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load completion rates");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 flex flex-col h-[380px] transition-all hover:border-white/20">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#534AB7]"></span>
                    Issue Completion Rate
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Follow-through ratio on assigned tasks per member</p>
            </div>

            <div className="flex-1 w-full overflow-y-auto pr-1 space-y-4">
                {loading ? (
                    <div className="w-full h-40 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-[#534AB7] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="w-full h-40 flex items-center justify-center text-xs text-red-400">
                        {error}
                    </div>
                ) : data.length === 0 ? (
                    <div className="w-full h-48 flex flex-col items-center justify-center text-center p-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-sm font-semibold text-zinc-300">No assigned issues found</p>
                        <p className="text-xs text-zinc-500 mt-1">Assign or claim project issues to measure completion output.</p>
                    </div>
                ) : (
                    data.map((item, index) => {
                        const pct = Math.round((item.completionRate || 0) * 100);
                        return (
                            <div key={item.userId || index} className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 hover:bg-white/[0.04] transition-all">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white ${index === 0 ? 'bg-[#A7A0F8] text-black' : 'bg-[#534AB7]'}`}>
                                            {index + 1}
                                        </div>
                                        <span className="text-sm font-bold text-white truncate max-w-[150px] sm:max-w-[200px]">
                                            {item.name || `Member ${String(item.userId).substring(0, 6)}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">
                                            {item.completed} / {item.totalAssigned} done
                                        </span>
                                        <span className="font-mono text-sm font-black text-[#A7A0F8] w-12 text-right">
                                            {pct}%
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#534AB7] to-[#A7A0F8] rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CompletionRateChart;
