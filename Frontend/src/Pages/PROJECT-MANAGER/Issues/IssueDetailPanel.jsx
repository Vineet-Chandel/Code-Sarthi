import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { useSelector } from 'react-redux';
import AssignmentBadge from './AssignmentBadge';
import AssignIssueDropdown from './AssignIssueDropdown';
import TimerWidget from '../TimerWidget';

const IssueDetailPanel = ({ teamId, issueId, onBack, myRole }) => {
    const user = useSelector(store => store.user);
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Inline edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ title: '', description: '', status: '', priority: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchIssue();
    }, [issueId]);

    const fetchIssue = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/issues/${issueId}`, { withCredentials: true });
            setIssue(res.data.issue);
            setEditData({
                title: res.data.issue.title,
                description: res.data.issue.description,
                status: res.data.issue.status,
                priority: res.data.issue.priority
            });
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load issue");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await axios.patch(`${BASE_URL}/teams/${teamId}/issues/${issueId}`, editData, { withCredentials: true });
            
            // Note: The patch might not return populated assignedTo if the backend doesn't populate it on patch,
            // so we might just fetch the issue again to ensure we have the populated object.
            fetchIssue();
            setIsEditing(false);
        } catch (err) {
            alert(err.response?.data?.error || "Failed to update issue");
        } finally {
            setSaving(false);
        }
    };

    const handleClaim = async () => {
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/issues/${issueId}/claim`, {}, { withCredentials: true });
            fetchIssue();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to claim issue");
        }
    };

    const handleUnclaim = async () => {
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/issues/${issueId}/unclaim`, {}, { withCredentials: true });
            fetchIssue();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to unclaim issue");
        }
    };

    const handleArchive = async () => {
        if (!confirm("Are you sure you want to archive this issue?")) return;
        try {
            await axios.delete(`${BASE_URL}/teams/${teamId}/issues/${issueId}`, { withCredentials: true });
            onBack();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to archive issue");
        }
    };

    if (loading) return <div className="text-zinc-500 animate-pulse">Loading issue details...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    const getTypeIcon = (type) => {
        switch (type) {
            case 'feature': return <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Feature</span>;
            case 'problem': return <span className="flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider bg-rose-400/10 px-2 py-1 rounded border border-rose-400/20"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> Problem</span>;
            default: return <span className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider bg-blue-400/10 px-2 py-1 rounded border border-blue-400/20"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> Issue</span>;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_progress': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'done': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'medium': return 'bg-[#534AB7]/20 text-[#A7A0F8] border-[#534AB7]/30';
            case 'low': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    const canArchive = myRole === 'leader' || String(issue.createdBy) === String(user._id);

    return (
        <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button onClick={onBack} className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm mb-6 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18l-6-6l6-6" /></svg>
                Back to Issues
            </button>

            {canArchive && (
                <button
                    onClick={handleArchive}
                    className="absolute top-6 right-6 text-xs text-red-400 hover:text-red-300 hover:underline"
                >
                    Archive Issue
                </button>
            )}

            {isEditing ? (
                <div className="space-y-4 max-w-2xl">
                    <input
                        type="text"
                        value={editData.title}
                        onChange={e => setEditData({ ...editData, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-bold text-xl"
                    />
                    <textarea
                        value={editData.description}
                        onChange={e => setEditData({ ...editData, description: e.target.value })}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none"
                    />
                    <div className="flex gap-4">
                        <select
                            value={editData.status}
                            onChange={e => setEditData({ ...editData, status: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <select
                            value={editData.priority}
                            onChange={e => setEditData({ ...editData, priority: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleSave} disabled={saving} className="bg-[#534AB7] hover:bg-[#6F64E6] text-white px-4 py-2 rounded-lg text-sm">
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button onClick={() => setIsEditing(false)} className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mb-4">
                        {getTypeIcon(issue.type)}
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-white">{issue.title}</h2>
                        <button onClick={() => setIsEditing(true)} className="text-zinc-500 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" /></svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getStatusColor(issue.status)}`}>
                            {issue.status.replace('_', ' ')}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                        </span>
                    </div>

                    <div className="mb-8">
                        <TimerWidget teamId={teamId} issueId={issueId} issueTitle={issue.title} inline={true} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Description</h3>
                            <p className="text-sm text-zinc-300 whitespace-pre-wrap">
                                {issue.description || "No description provided."}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Assignment</h3>
                            
                            {issue.assignedTo ? (
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                                            {issue.assignedTo.avatar ? (
                                                <img src={issue.assignedTo.avatar} alt={issue.assignedTo.firstName} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs font-bold text-white">{issue.assignedTo.firstName.charAt(0)}{issue.assignedTo.lastName.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{issue.assignedTo.firstName} {issue.assignedTo.lastName}</div>
                                            <AssignmentBadge source={issue.assignmentSource} />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {String(issue.assignedTo._id) === String(user._id) && (
                                            <button 
                                                onClick={handleUnclaim}
                                                className="text-xs font-medium text-zinc-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded hover:bg-white/5 w-full text-center border border-transparent hover:border-red-400/20"
                                            >
                                                Unclaim Issue
                                            </button>
                                        )}
                                        {myRole === 'leader' && (
                                            <div className="flex-1">
                                                <AssignIssueDropdown 
                                                    teamId={teamId} 
                                                    issueId={issue._id} 
                                                    currentAssigneeId={issue.assignedTo._id}
                                                    onAssign={() => fetchIssue()}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                                    <div className="w-10 h-10 mx-auto rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center mb-3">
                                        <span className="text-zinc-500">?</span>
                                    </div>
                                    <div className="text-sm font-medium text-zinc-300 mb-4">Unassigned</div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <button 
                                            onClick={handleClaim}
                                            className="w-full text-sm font-medium text-[#A7A0F8] hover:text-white border border-[#534AB7] hover:bg-[#534AB7] transition-colors px-4 py-2 rounded-lg"
                                        >
                                            Claim this Issue
                                        </button>
                                        
                                        {myRole === 'leader' && (
                                            <div className="mt-2">
                                                <AssignIssueDropdown 
                                                    teamId={teamId} 
                                                    issueId={issue._id} 
                                                    currentAssigneeId={null}
                                                    onAssign={() => fetchIssue()}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssueDetailPanel;
