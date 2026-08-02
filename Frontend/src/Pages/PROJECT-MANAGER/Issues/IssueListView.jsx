import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import CreateIssueModal from './CreateIssueModal';
import IssueDetailPanel from './IssueDetailPanel';
import AssignmentBadge from './AssignmentBadge';
import AssignIssueDropdown from './AssignIssueDropdown';
import { useSelector } from 'react-redux';
import AlertModal from '../AlertModal';

const IssueListView = ({ teamId, projectId, myRole }) => {
    const user = useSelector(store => store.user);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedIssueId, setSelectedIssueId] = useState(null);
    const [alertData, setAlertData] = useState(null);

    // Filters
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    useEffect(() => {
        if (!selectedIssueId) {
            fetchIssues();
        }
    }, [teamId, projectId, typeFilter, statusFilter, priorityFilter, selectedIssueId]);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (typeFilter) params.append('type', typeFilter);
            if (statusFilter) params.append('status', statusFilter);
            if (priorityFilter) params.append('priority', priorityFilter);

            const res = await axios.get(`${BASE_URL}/teams/${teamId}/projects/${projectId}/issues?${params.toString()}`, { withCredentials: true });
            setIssues(res.data.issues);
        } catch (err) {
            console.error("Failed to fetch issues", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async (e, issueId) => {
        e.stopPropagation();
        try {
            const res = await axios.post(`${BASE_URL}/teams/${teamId}/issues/${issueId}/claim`, {}, { withCredentials: true });
            setIssues(issues.map(i => i._id === issueId ? res.data.issue : i));
            fetchIssues(); // Refresh to get populated assignedTo
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to claim issue" });
        }
    };

    const handleUnclaim = async (e, issueId) => {
        e.stopPropagation();
        try {
            const res = await axios.post(`${BASE_URL}/teams/${teamId}/issues/${issueId}/unclaim`, {}, { withCredentials: true });
            setIssues(issues.map(i => i._id === issueId ? res.data.issue : i));
            fetchIssues(); // Refresh
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to unclaim issue" });
        }
    };

    const handleAssign = (updatedIssue) => {
        setIssues(issues.map(i => i._id === updatedIssue._id ? updatedIssue : i));
        fetchIssues(); // Refresh to get populated assignedTo
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'feature': return <svg className="text-emerald-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
            case 'problem': return <svg className="text-rose-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
            default: return <svg className="text-blue-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
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

    if (selectedIssueId) {
        return (
            <IssueDetailPanel
                teamId={teamId}
                issueId={selectedIssueId}
                myRole={myRole}
                onBack={() => setSelectedIssueId(null)}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap gap-2">
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="bg-[#09090B] border border-white/10 text-sm text-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#534AB7]"
                    >
                        <option value="">All Types</option>
                        <option value="issue">Issue</option>
                        <option value="feature">Feature</option>
                        <option value="problem">Problem</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#09090B] border border-white/10 text-sm text-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#534AB7]"
                    >
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="bg-[#09090B] border border-white/10 text-sm text-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#534AB7]"
                    >
                        <option value="">All Priorities</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="bg-[#534AB7] hover:bg-[#6F64E6] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                    + New Issue
                </button>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/[0.02] border border-white/5 rounded-xl animate-pulse"></div>)}
                </div>
            ) : issues.length === 0 ? (
                <div className="text-center py-12 bg-[#09090B] border border-white/10 rounded-2xl">
                    <p className="text-zinc-500">No issues found. Create one to get started.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {issues.map(issue => (
                        <div
                            key={issue._id}
                            onClick={() => setSelectedIssueId(issue._id)}
                            className="bg-[#09090B] hover:bg-white/[0.03] border border-white/10 hover:border-[#534AB7]/50 rounded-xl p-4 cursor-pointer transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group"
                        >
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                                <div className="mt-1" title={issue.type}>{getTypeIcon(issue.type)}</div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-white font-medium truncate group-hover:text-[#A7A0F8] transition-colors">{issue.title}</h4>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                                        {issue.assignedTo ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                                                    {issue.assignedTo.photoUrl?.url && issue.assignedTo.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                                                        <img src={issue.assignedTo.photoUrl.url} alt={issue.assignedTo.firstName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-[9px] font-bold text-white">{issue.assignedTo.firstName?.charAt(0).toUpperCase()}{issue.assignedTo.lastName?.charAt(0).toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <span className="text-zinc-300">{issue.assignedTo.firstName} {issue.assignedTo.lastName}</span>
                                                <AssignmentBadge source={issue.assignmentSource} />
                                                
                                                {String(issue.assignedTo._id) === String(user._id) && (
                                                    <button 
                                                        onClick={(e) => handleUnclaim(e, issue._id)}
                                                        className="ml-2 text-xs font-medium text-zinc-400 hover:text-red-400 transition-colors px-2 py-0.5 rounded hover:bg-white/5"
                                                    >
                                                        Unclaim
                                                    </button>
                                                )}
                                                {(myRole === 'leader' || myRole === 'admin') && (
                                                    <div className="ml-2">
                                                        <AssignIssueDropdown 
                                                            teamId={teamId} 
                                                            issueId={issue._id} 
                                                            currentAssigneeId={issue.assignedTo._id}
                                                            onAssign={handleAssign}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full border border-dashed border-zinc-600 flex items-center justify-center">
                                                    <span className="text-[9px] text-zinc-500">?</span>
                                                </div>
                                                <span>Unassigned</span>
                                                <button 
                                                    onClick={(e) => handleClaim(e, issue._id)}
                                                    className="ml-2 text-xs font-medium text-[#A7A0F8] hover:text-white border border-[#534AB7] hover:bg-[#534AB7] transition-colors px-2 py-0.5 rounded"
                                                >
                                                    Claim
                                                </button>
                                                {(myRole === 'leader' || myRole === 'admin') && (
                                                    <div className="ml-2">
                                                        <AssignIssueDropdown 
                                                            teamId={teamId} 
                                                            issueId={issue._id} 
                                                            currentAssigneeId={null}
                                                            onAssign={handleAssign}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getStatusColor(issue.status)}`}>
                                    {issue.status.replace('_', ' ')}
                                </span>
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getPriorityColor(issue.priority)}`}>
                                    {issue.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CreateIssueModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                teamId={teamId}
                projectId={projectId}
                onSuccess={() => {
                    setCreateModalOpen(false);
                    fetchIssues();
                }}
            />
            <AlertModal
                isOpen={!!alertData}
                onClose={() => setAlertData(null)}
                {...alertData}
            />
        </div>
    );
};

export default IssueListView;
