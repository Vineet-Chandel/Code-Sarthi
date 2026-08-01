import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../auth/baseURL';

const TimerWidget = ({ teamId, issueId, issueTitle, inline = false }) => {
    const [activeTimer, setActiveTimer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [conflictData, setConflictData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!teamId) return;
        fetchActiveTimer();

        const handleStateChange = () => fetchActiveTimer();
        window.addEventListener('timer-state-change', handleStateChange);
        return () => window.removeEventListener('timer-state-change', handleStateChange);
    }, [teamId]);

    const fetchActiveTimer = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/contributions/active`, { withCredentials: true });
            setActiveTimer(res.data.contributionLog || null);
            setConflictData(null);
            setError(null);
        } catch (err) {
            console.error("Failed to load active contribution timer", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let interval = null;
        if (activeTimer && activeTimer.startedAt) {
            const updateTime = () => {
                const start = new Date(activeTimer.startedAt).getTime();
                const now = Date.now();
                const diff = Math.max(0, Math.floor((now - start) / 1000));
                setElapsedSeconds(diff);
            };
            updateTime();
            interval = setInterval(updateTime, 1000);
        } else {
            setElapsedSeconds(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeTimer]);

    const formatTime = (totalSeconds) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const notifyChange = () => {
        window.dispatchEvent(new Event('timer-state-change'));
    };

    const handleStart = async () => {
        if (!issueId) return;
        setActionLoading(true);
        setError(null);
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/contributions/start`, { issueId }, { withCredentials: true });
            notifyChange();
        } catch (err) {
            if (err.response?.status === 409) {
                setConflictData({
                    activeContributionLogId: err.response.data.activeContributionLogId,
                    activeIssueId: err.response.data.activeIssueId,
                    errorMessage: err.response.data.error || "A timer is already active."
                });
            } else {
                setError(err.response?.data?.error || "Failed to start timer");
            }
        } finally {
            setActionLoading(false);
        }
    };

    const handleStop = async (logIdToStop) => {
        const logId = logIdToStop || (activeTimer ? activeTimer._id : null);
        if (!logId) return;
        setActionLoading(true);
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/contributions/stop`, { contributionLogId: logId }, { withCredentials: true });
            setActiveTimer(null);
            setConflictData(null);
            notifyChange();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to stop timer");
        } finally {
            setActionLoading(false);
        }
    };

    const handleSwitchTimer = async () => {
        if (!conflictData?.activeContributionLogId) return;
        setActionLoading(true);
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/contributions/stop`, { 
                contributionLogId: conflictData.activeContributionLogId 
            }, { withCredentials: true });
            setConflictData(null);
            await axios.post(`${BASE_URL}/teams/${teamId}/contributions/start`, { issueId }, { withCredentials: true });
            notifyChange();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to switch timer");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading && !inline) return null;

    // --- INLINE MODE (Rendered directly in IssueDetailPanel) ---
    if (inline) {
        if (loading) {
            return (
                <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-medium">Checking session status...</span>
                </div>
            );
        }

        const isThisIssueActive = activeTimer && String(activeTimer.issueId?._id || activeTimer.issueId) === String(issueId);

        if (conflictData) {
            return (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Timer Conflict Detected
                    </div>
                    <p className="text-xs text-zinc-300 mb-3">
                        You already have a timer running on another issue in this team. Do you want to stop that timer and switch to this one?
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSwitchTimer}
                            disabled={actionLoading}
                            className="bg-[#534AB7] hover:bg-[#6358D4] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-md shadow-[#534AB7]/20 disabled:opacity-50"
                        >
                            {actionLoading ? 'Switching...' : 'Switch to this Issue'}
                        </button>
                        <button
                            onClick={() => setConflictData(null)}
                            disabled={actionLoading}
                            className="bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            );
        }

        if (isThisIssueActive) {
            return (
                <div className="bg-[#18181E] border border-[#534AB7]/40 rounded-xl p-4 shadow-lg shadow-[#534AB7]/10 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#A7A0F8]">Session Active</span>
                        </div>
                        <div className="font-mono text-xl font-black tracking-wider text-white bg-black/40 px-3 py-1 rounded-lg border border-white/5">
                            {formatTime(elapsedSeconds)}
                        </div>
                    </div>
                    <div className="mt-3.5 flex items-center justify-end">
                        <button
                            onClick={() => handleStop()}
                            disabled={actionLoading}
                            className="w-full sm:w-auto bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold px-4 py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16"><rect width="12" height="12" x="2" y="2" rx="2" /></svg>
                            {actionLoading ? 'Stopping...' : 'Stop Timer'}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <div className="text-sm font-semibold text-white mb-0.5">Time Tracking</div>
                    <div className="text-xs text-zinc-400">Record your actual working time against this task.</div>
                </div>
                {error && <div className="text-xs text-red-400 my-1">{error}</div>}
                <button
                    onClick={handleStart}
                    disabled={actionLoading}
                    className="w-full sm:w-auto bg-[#534AB7] hover:bg-[#6358D4] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-md shadow-[#534AB7]/20 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" /></svg>
                    {actionLoading ? 'Starting...' : 'Start Timer'}
                </button>
            </div>
        );
    }

    // --- FLOATING MODE (Persistent corner widget when timer is running) ---
    if (!activeTimer) return null;

    const currentTitle = activeTimer.issueId?.title || issueTitle || "Active Task";
    const currentStatus = activeTimer.issueId?.status;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="bg-[#121215]/95 border border-[#534AB7]/40 shadow-2xl shadow-[#534AB7]/20 backdrop-blur-md px-5 py-3.5 rounded-2xl flex items-center gap-5 max-w-sm sm:max-w-md border-t border-t-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-md shadow-emerald-400/60 shrink-0" />
                    <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-[#A7A0F8] flex items-center gap-1.5">
                            Working on
                            {currentStatus && (
                                <span className="px-1.5 py-0.2 text-[9px] rounded bg-white/10 text-zinc-300">
                                    {currentStatus.replace('_', ' ')}
                                </span>
                            )}
                        </div>
                        <div className="text-sm font-bold text-white truncate max-w-[160px] sm:max-w-[220px]">
                            {currentTitle}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3.5 border-l border-white/10 pl-4">
                    <div className="font-mono text-xl font-black tracking-widest text-white">
                        {formatTime(elapsedSeconds)}
                    </div>
                    <button
                        onClick={() => handleStop()}
                        disabled={actionLoading}
                        title="Stop Session"
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 p-2.5 rounded-xl transition-colors hover:scale-105 active:scale-95 flex items-center justify-center shrink-0"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><rect width="10" height="10" x="3" y="3" rx="1.5" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimerWidget;
