import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { useSelector } from 'react-redux';
import AssignmentBadge from './AssignmentBadge';
import AssignIssueDropdown from './AssignIssueDropdown';
import TimerWidget from '../TimerWidget';
import DeleteConfirmModal from '../DeleteConfirmModal';
import AlertModal from '../AlertModal';
import IssueLinksModal from './IssueLinksModal';
import IssueComments from './IssueComments';

const IssueDetailPanel = ({ teamId, issueId, onBack, myRole }) => {
    const user = useSelector(store => store.user?.user?.DATA || store.user);
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [archiving, setArchiving] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [addingLink, setAddingLink] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAddLink = async (linkData, callback) => {
        setAddingLink(true);
        try {
            const updatedLinks = [...(issue.links || []), linkData];
            const res = await axios.patch(`${BASE_URL}/teams/${teamId}/issues/${issueId}`, { links: updatedLinks }, { withCredentials: true });
            setIssue(res.data.issue);
            setAlertData({ type: 'success', message: 'Issue link saved successfully!' });
            if (callback) callback(true);
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to add issue link" });
            if (callback) callback(false);
        } finally {
            setAddingLink(false);
        }
    };

    const handleRemoveLink = async (indexToRemove) => {
        try {
            const updatedLinks = (issue.links || []).filter((_, i) => i !== indexToRemove);
            const res = await axios.patch(`${BASE_URL}/teams/${teamId}/issues/${issueId}`, { links: updatedLinks }, { withCredentials: true });
            setIssue(res.data.issue);
            setAlertData({ type: 'info', message: 'Link removed.' });
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to remove issue link" });
        }
    };

    const handleEditLink = async (indexToEdit, updatedLinkData, callback) => {
        setAddingLink(true);
        try {
            const updatedLinks = [...(issue.links || [])];
            updatedLinks[indexToEdit] = updatedLinkData;
            const res = await axios.patch(`${BASE_URL}/teams/${teamId}/issues/${issueId}`, { links: updatedLinks }, { withCredentials: true });
            setIssue(res.data.issue);
            setAlertData({ type: 'success', message: 'Issue link updated successfully!' });
            if (callback) callback(true);
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to update issue link" });
            if (callback) callback(false);
        } finally {
            setAddingLink(false);
        }
    };

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
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to update issue" });
        } finally {
            setSaving(false);
        }
    };

    const handleClaim = async () => {
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/issues/${issueId}/claim`, {}, { withCredentials: true });
            fetchIssue();
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to claim issue" });
        }
    };

    const handleUnclaim = async () => {
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/issues/${issueId}/unclaim`, {}, { withCredentials: true });
            fetchIssue();
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to unclaim issue" });
        }
    };

    const handleArchive = async () => {
        setArchiving(true);
        try {
            await axios.patch(`${BASE_URL}/teams/${teamId}/issues/${issueId}/archive`, {}, { withCredentials: true });
            setIsArchiveModalOpen(false);
            onBack();
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to archive issue" });
            setArchiving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`${BASE_URL}/teams/${teamId}/issues/${issueId}`, { withCredentials: true });
            setIsDeleteModalOpen(false);
            onBack();
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to delete issue" });
            setDeleting(false);
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
            case 'open': return 'bg-[#000000] text-zinc-300 border-white/[0.08]';
            case 'in_progress': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'done': return 'bg-white/[0.08] text-white border-white/[0.12]';
            default: return 'bg-[#000000] text-zinc-400 border-white/[0.06]';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'medium': return 'bg-white/[0.06] text-zinc-300 border-white/[0.08]';
            case 'low': return 'bg-[#000000] text-zinc-400 border-white/[0.06]';
            default: return 'bg-[#000000] text-zinc-400 border-white/[0.06]';
        }
    };

    const canArchive = myRole === 'leader' || myRole === 'admin' || String(issue.createdBy) === String(user._id);
    const canDelete = myRole === 'leader' || myRole === 'admin';

    return (
        <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 sm:p-8 relative animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-xl">
            <button onClick={onBack} className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm mb-6 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18l-6-6l6-6" /></svg>
                Back to Issues
            </button>

            <div className="absolute top-6 right-6 z-20" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    title="Issue Options"
                    className="p-2.5 text-zinc-400 hover:text-white bg-[#000000] hover:bg-white/[0.05] rounded-xl transition-colors border border-white/[0.06] flex items-center justify-center shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-150 z-30">
                        <button
                            onClick={() => { setIsMenuOpen(false); setIsLinkModalOpen(true); }}
                            className="w-full text-left px-4 py-2.5 text-xs font-bold text-white hover:bg-white/[0.05] flex items-center justify-between transition-colors"
                        >
                            <span className="flex items-center gap-2.5">
                                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                Issue Links
                            </span>
                            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-semibold text-zinc-300">
                                {issue?.links?.length || 0}
                            </span>
                        </button>
                        {(canArchive || canDelete) && (
                            <div className="border-t border-white/[0.06] my-1" />
                        )}
                        {canArchive && (
                            <button
                                onClick={() => { setIsMenuOpen(false); setIsArchiveModalOpen(true); }}
                                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/10 flex items-center gap-2.5 transition-colors"
                            >
                                <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                Archive Issue
                            </button>
                        )}
                        {canDelete && (
                            <button
                                onClick={() => { setIsMenuOpen(false); setIsDeleteModalOpen(true); }}
                                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-2.5 transition-colors"
                            >
                                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Delete Issue
                            </button>
                        )}
                    </div>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4 max-w-2xl">
                    <input
                        type="text"
                        value={editData.title}
                        onChange={e => setEditData({ ...editData, title: e.target.value })}
                        className="w-full bg-[#000000] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white font-bold text-xl focus:outline-none focus:border-white/[0.2] transition-colors"
                    />
                    <textarea
                        value={editData.description}
                        onChange={e => setEditData({ ...editData, description: e.target.value })}
                        rows={4}
                        className="w-full bg-[#000000] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-white/[0.2] transition-colors"
                    />
                    <div className="flex gap-3">
                        <select
                            value={editData.status}
                            onChange={e => setEditData({ ...editData, status: e.target.value })}
                            className="bg-[#000000] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white text-sm font-semibold focus:outline-none focus:border-white/[0.2] transition-colors"
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <select
                            value={editData.priority}
                            onChange={e => setEditData({ ...editData, priority: e.target.value })}
                            className="bg-[#000000] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white text-sm font-semibold focus:outline-none focus:border-white/[0.2] transition-colors"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button onClick={handleSave} disabled={saving} className="bg-white hover:bg-zinc-200 text-black font-bold px-5 py-2 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-95">
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button onClick={() => setIsEditing(false)} className="bg-[#000000] hover:bg-white/[0.05] border border-white/[0.06] text-zinc-300 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        {getTypeIcon(issue.type)}
                        <div className="pr-16">
                            <TimerWidget teamId={teamId} issueId={issueId} issueTitle={issue.title} inline={true} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{issue.title}</h2>
                        <button onClick={() => setIsEditing(true)} className="text-zinc-500 hover:text-white transition-colors p-1 rounded hover:bg-white/[0.05]" title="Edit Issue">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" /></svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-2.5 mb-8">
                        <span className={`text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-lg border ${getStatusColor(issue.status)}`}>
                            {issue.status.replace('_', ' ')}
                        </span>
                        <span className={`text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-lg border ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-white/[0.06]">
                        <div className="md:col-span-2">
                            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">Description</h3>
                            <div className="bg-[#000000] border border-white/[0.05] rounded-xl p-5 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed min-h-[120px]">
                                {issue.description || <span className="text-zinc-600 italic">No description provided for this issue.</span>}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">Assignment</h3>

                            {issue.assignedTo ? (
                                <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
                                            {issue.assignedTo.photoUrl?.url && issue.assignedTo.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                                                <img src={issue.assignedTo.photoUrl.url} alt={issue.assignedTo.firstName} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs font-bold text-white">{issue.assignedTo.firstName?.charAt(0).toUpperCase()}{issue.assignedTo.lastName?.charAt(0).toUpperCase()}</span>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-bold text-white truncate">{issue.assignedTo.firstName} {issue.assignedTo.lastName}</div>
                                            <div className="mt-1"><AssignmentBadge source={issue.assignmentSource} /></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                                        {String(issue.assignedTo._id) === String(user._id) && (
                                            <button
                                                onClick={handleUnclaim}
                                                className="text-xs font-semibold text-zinc-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05] w-full text-center border border-transparent hover:border-red-400/20"
                                            >
                                                Unclaim Issue
                                            </button>
                                        )}
                                        {(myRole === 'leader' || myRole === 'admin') && (
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
                                <div className="bg-[#000000] border border-dashed border-white/[0.08] rounded-xl p-6 text-center">
                                    <div className="w-10 h-10 mx-auto rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-2.5">
                                        <span className="text-zinc-400 text-sm font-bold">?</span>
                                    </div>
                                    <div className="text-sm font-bold text-zinc-300 mb-1">Unassigned</div>
                                    <p className="text-xs text-zinc-500 mb-4">No team member is currently taking ownership of this task.</p>

                                    <div className="flex flex-col gap-2.5">
                                        <button
                                            onClick={handleClaim}
                                            className="w-full text-sm font-bold text-white hover:text-black bg-white/10 hover:bg-white border border-white/20 transition-all px-4 py-2.5 rounded-xl shadow-sm active:scale-95"
                                        >
                                            Claim this Issue
                                        </button>

                                        {(myRole === 'leader' || myRole === 'admin') && (
                                            <div className="mt-1">
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

                    <IssueComments issueId={issueId} teamId={teamId} currentUserId={user?._id} />
                </div>
            )}

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemType="Issue"
                itemName={issue?.title}
                loading={deleting}
            />
            <DeleteConfirmModal
                isOpen={isArchiveModalOpen}
                onClose={() => setIsArchiveModalOpen(false)}
                onConfirm={handleArchive}
                title="Archive Issue"
                itemType="Issue"
                itemName={issue?.title}
                requiredText="ARCHIVE"
                description="You are about to archive this issue. It will be removed from active board listings."
                warning="Archived issues are hidden from ongoing sprint tasks."
                buttonText="Archive Issue"
                theme="amber"
                loading={archiving}
            />
            <AlertModal
                isOpen={!!alertData}
                onClose={() => setAlertData(null)}
                {...alertData}
            />
            <IssueLinksModal
                isOpen={isLinkModalOpen}
                onClose={() => setIsLinkModalOpen(false)}
                issue={issue}
                myRole={myRole}
                onAddLink={handleAddLink}
                onRemoveLink={handleRemoveLink}
                onEditLink={handleEditLink}
                loading={addingLink}
            />
        </div >
    );
};

export default IssueDetailPanel;
