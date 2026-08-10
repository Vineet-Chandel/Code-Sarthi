import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../auth/baseURL';
import AlertModal from './AlertModal';

const TimerWidget = ({ teamId, issueId, issueTitle, inline = false }) => {
    const [activeTimer, setActiveTimer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [conflictData, setConflictData] = useState(null);
    const [error, setError] = useState(null);
    const [alertData, setAlertData] = useState(null);

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
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to stop timer" });
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
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to switch timer" });
        } finally {
            setActionLoading(false);
        }
    };

    const modalComponent = (
        <AlertModal
            isOpen={!!alertData}
            onClose={() => setAlertData(null)}
            {...alertData}
        />
    );

    if (loading && !inline) return null;

    // --- INLINE MODE (Rendered directly in IssueDetailPanel) ---
    if (inline) {
        if (loading) {
            return (
                <div className="animate-pulse flex items-center justify-center">
                    <span className="text-xs text-zinc-500 font-medium">Checking session...</span>
                </div>
            );
        }

        const isThisIssueActive = activeTimer && String(activeTimer.issueId?._id || activeTimer.issueId) === String(issueId);

        if (conflictData) {
            return (
                <div className="flex items-center gap-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-wider hidden sm:flex">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Conflict
                    </div>
                    <button
                        onClick={handleSwitchTimer}
                        disabled={actionLoading}
                        className="bg-white hover:bg-zinc-200 text-black text-xs font-extrabold px-3 py-1.5 rounded-lg transition-all shadow-md disabled:opacity-50"
                    >
                        {actionLoading ? 'Switching...' : 'Switch Timer'}
                    </button>
                    <button
                        onClick={() => setConflictData(null)}
                        disabled={actionLoading}
                        className="bg-[#111] hover:bg-[#222] text-zinc-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors border border-white/[0.04]"
                    >
                        Cancel
                    </button>
                </div>
            );
        }

        if (isThisIssueActive) {
            return (
                <div className="flex items-center gap-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2.5 bg-black px-3 py-1.5 rounded-lg border border-white/[0.06] shadow-inner">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                        <div className="font-mono text-[13px] font-black tracking-wider text-white">
                            {formatTime(elapsedSeconds)}
                        </div>
                    </div>
                    <button
                        onClick={() => handleStop()}
                        disabled={actionLoading}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5"
                    >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16"><rect width="10" height="10" x="3" y="3" rx="1.5" /></svg>
                        {actionLoading ? 'Stopping...' : 'Stop'}
                    </button>
                    {modalComponent}
                </div>
            );
        }

        return (
            <div className="flex items-center gap-3">
                {error && <div className="text-[10px] text-red-400">{error}</div>}
                <button
                    onClick={handleStart}
                    disabled={actionLoading}
                    className="bg-white hover:bg-zinc-200 text-black px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" /></svg>
                    {actionLoading ? 'Starting...' : 'Start Timer'}
                </button>
                {modalComponent}
            </div>
        );
    }

    // --- FLOATING MODE (Persistent corner widget when timer is running) ---
    if (!activeTimer) return alertData ? modalComponent : null;

    const currentTitle = activeTimer.issueId?.title || issueTitle || "Active Task";
    const currentStatus = activeTimer.issueId?.status;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="bg-[#0a0a0a] shadow-2xl px-6 py-4 rounded-2xl flex items-center gap-5 max-w-sm sm:max-w-md">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-md shadow-emerald-400/60 shrink-0" />
                    <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-[#A7A0F8] flex items-center gap-1.5">
                            Working on
                            {currentStatus && (
                                <span className="px-2 py-0.5 text-[9px] rounded-md bg-black text-zinc-300 shadow-inner">
                                    {currentStatus.replace('_', ' ')}
                                </span>
                            )}
                        </div>
                        <div className="text-sm font-bold text-white truncate max-w-[160px] sm:max-w-[220px]">
                            {currentTitle}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3.5 pl-4">
                    <div className="font-mono text-xl font-black tracking-widest text-white">
                        {formatTime(elapsedSeconds)}
                    </div>
                    <button
                        onClick={() => handleStop()}
                        disabled={actionLoading}
                        title="Stop Session"
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2.5 rounded-xl transition-colors hover:scale-105 active:scale-95 flex items-center justify-center shrink-0"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><rect width="10" height="10" x="3" y="3" rx="1.5" /></svg>
                    </button>
                </div>
            </div>
            {modalComponent}
        </div>
    );
};

export default TimerWidget;
