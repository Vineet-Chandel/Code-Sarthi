import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { setProjectDetail, updateProjectInTeam, removeProjectFromTeam } from '../../../utils/projectSlice';
import IssueListView from '../Issues/IssueListView';
import DeleteConfirmModal from '../DeleteConfirmModal';
import AlertModal from '../AlertModal';
import ProjectLinksModal from './ProjectLinksModal';

const ProjectDetailPanel = ({ teamId, projectId, onBack, myRole }) => {
    const dispatch = useDispatch();
    const cachedDetail = useSelector(store => store.projects?.projectDetails?.[projectId]);
    const [project, setProject] = useState(cachedDetail?.project || null);
    const [loading, setLoading] = useState(!cachedDetail?.isFetched);
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

    // Settings tab states
    const [activeTab, setActiveTab] = useState('issues');
    const [githubUrl, setGithubUrl] = useState('');
    const [connecting, setConnecting] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [notifying, setNotifying] = useState(false);

    // Repository selection states
    const [repositories, setRepositories] = useState([]);
    const [fetchingRepos, setFetchingRepos] = useState(false);
    const [selectedRepoId, setSelectedRepoId] = useState('');
    const [connectingRepo, setConnectingRepo] = useState(false);
    const [repository, setRepository] = useState(cachedDetail?.repository || null);
    const [syncing, setSyncing] = useState(false);
    const [manualRepoUrl, setManualRepoUrl] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Inline edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: cachedDetail?.project?.title || '',
        description: cachedDetail?.project?.description || '',
        status: cachedDetail?.project?.status || '',
        priority: cachedDetail?.project?.priority || ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!cachedDetail?.isFetched) {
            fetchProject();
        } else {
            setProject(cachedDetail.project);
            setRepository(cachedDetail.repository || null);
            setEditData({
                title: cachedDetail.project.title,
                description: cachedDetail.project.description,
                status: cachedDetail.project.status,
                priority: cachedDetail.project.priority
            });
            setLoading(false);
        }
    }, [projectId, cachedDetail?.isFetched]);

    // Polling sync status
    useEffect(() => {
        let timer;
        if (repository && (repository.syncStatus === 'SYNCING' || repository.syncStatus === 'QUEUED')) {
            timer = setInterval(async () => {
                try {
                    const res = await axios.get(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, { withCredentials: true });
                    if (res.data.repository) {
                        setRepository(res.data.repository);
                        dispatch(setProjectDetail({ projectId, project: res.data.project, repository: res.data.repository }));
                    }
                } catch (err) {
                    console.error("Polling repository sync status failed:", err);
                }
            }, 3000);
        }
        return () => clearInterval(timer);
    }, [repository?.syncStatus, projectId, teamId]);

    const fetchProject = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, { withCredentials: true });
            setProject(res.data.project);
            setRepository(res.data.repository || null);
            setEditData({
                title: res.data.project.title,
                description: res.data.project.description,
                status: res.data.project.status,
                priority: res.data.project.priority
            });
            dispatch(setProjectDetail({ projectId, project: res.data.project, repository: res.data.repository }));
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load project");
        } finally {
            setLoading(false);
        }
    };

    const handleSyncGitHub = async () => {
        setSyncing(true);
        try {
            const res = await axios.post(`${BASE_URL}/projects/${projectId}/github/sync`, {}, { withCredentials: true });
            setAlertData({
                type: 'success',
                title: 'Sync Enqueued',
                message: 'Initial repository synchronization has been enqueued.'
            });
            setRepository(prev => ({ ...prev, syncStatus: 'QUEUED' }));
        } catch (err) {
            setAlertData({
                type: 'error',
                title: 'Sync Failed',
                message: err.response?.data?.message || 'Failed to start synchronization.'
            });
        } finally {
            setSyncing(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await axios.patch(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, editData, { withCredentials: true });
            setProject(res.data.project);
            setIsEditing(false);
            dispatch(setProjectDetail({ projectId, project: res.data.project }));
            dispatch(updateProjectInTeam({ teamId, project: res.data.project }));
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to update project" });
        } finally {
            setSaving(false);
        }
    };

    const handleArchive = async () => {
        setArchiving(true);
        try {
            await axios.patch(`${BASE_URL}/teams/${teamId}/projects/${projectId}/archive`, {}, { withCredentials: true });
            dispatch(removeProjectFromTeam({ teamId, projectId }));
            setIsArchiveModalOpen(false);
            onBack();
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to archive project" });
            setArchiving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, { withCredentials: true });
            dispatch(removeProjectFromTeam({ teamId, projectId }));
            setIsDeleteModalOpen(false);
            onBack();
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to delete project" });
            setDeleting(false);
        }
    };

    const handleAddLink = async (linkData, callback) => {
        setAddingLink(true);
        try {
            const updatedLinks = [...(project.links || []), linkData];
            const res = await axios.patch(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, { links: updatedLinks }, { withCredentials: true });
            setProject(res.data.project);
            dispatch(setProjectDetail({ projectId, project: res.data.project }));
            dispatch(updateProjectInTeam({ teamId, project: res.data.project }));
            setAlertData({ type: 'success', message: 'Project link saved successfully!' });
            if (callback) callback(true);
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to add project link" });
            if (callback) callback(false);
        } finally {
            setAddingLink(false);
        }
    };

    const handleRemoveLink = async (indexToRemove) => {
        try {
            const updatedLinks = project.links.filter((_, i) => i !== indexToRemove);
            const res = await axios.patch(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, { links: updatedLinks }, { withCredentials: true });
            setProject(res.data.project);
            dispatch(setProjectDetail({ projectId, project: res.data.project }));
            dispatch(updateProjectInTeam({ teamId, project: res.data.project }));
            setAlertData({ type: 'info', message: 'Link removed.' });
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to remove project link" });
        }
    };

    const handleEditLink = async (indexToEdit, updatedLinkData, callback) => {
        setAddingLink(true);
        try {
            const updatedLinks = [...(project.links || [])];
            updatedLinks[indexToEdit] = updatedLinkData;
            const res = await axios.patch(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, { links: updatedLinks }, { withCredentials: true });
            setProject(res.data.project);
            dispatch(setProjectDetail({ projectId, project: res.data.project }));
            dispatch(updateProjectInTeam({ teamId, project: res.data.project }));
            setAlertData({ type: 'success', message: 'Project link updated successfully!' });
            if (callback) callback(true);
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to update project link" });
            if (callback) callback(false);
        } finally {
            setAddingLink(false);
        }
    };

    const handleConnectGitHub = async (e) => {
        if (e) e.preventDefault();
        setConnecting(true);

        try {
            const res = await axios.get(
                `${BASE_URL}/teams/${teamId}/projects/github/install?projectId=${projectId}`,
                { withCredentials: true }
            );

            if (res.data.url) {
                setAlertData({ type: 'success', message: 'Redirecting to GitHub installation...' });
                window.location.href = res.data.url;
            } else {
                setAlertData({ type: 'error', message: 'Failed to retrieve GitHub installation link' });
            }
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || 'Failed to connect GitHub' });
        } finally {
            setConnecting(false);
        }
    };

    useEffect(() => {
        if (project && project.githubInstallationId && !project.githubRepo) {
            fetchRepositories();
        }
    }, [project?.githubInstallationId, project?.githubRepo]);

    const fetchRepositories = async () => {
        setFetchingRepos(true);
        try {
            const res = await axios.get(`${BASE_URL}/github/repositories?projectId=${projectId}`, { withCredentials: true });
            setRepositories(res.data.repositories || []);
            if (res.data.repositories?.length > 0) {
                setSelectedRepoId(res.data.repositories[0].id.toString());
            }
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.message || 'Failed to load GitHub repositories' });
        } finally {
            setFetchingRepos(false);
        }
    };

    const handleConnectRepository = async (e) => {
        if (e) e.preventDefault();
        if (!selectedRepoId) return;
        setConnectingRepo(true);
        try {
            const res = await axios.post(
                `${BASE_URL}/projects/${projectId}/github/repository`,
                { repositoryId: selectedRepoId },
                { withCredentials: true }
            );
            setProject(res.data.project);
            setRepository(res.data.repository || null);
            dispatch(setProjectDetail({ projectId, project: res.data.project, repository: res.data.repository }));
            dispatch(updateProjectInTeam({ teamId, project: res.data.project }));
            setAlertData({ type: 'success', message: 'GitHub repository linked successfully!' });
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.message || 'Failed to link repository' });
        } finally {
            setConnectingRepo(false);
        }
    };

    const handleConnectManualRepository = async (e) => {
        if (e) e.preventDefault();
        if (!manualRepoUrl) return;
        setConnectingRepo(true);
        try {
            const res = await axios.post(
                `${BASE_URL}/projects/${projectId}/github/repository`,
                { repositoryUrl: manualRepoUrl },
                { withCredentials: true }
            );
            setProject(res.data.project);
            setRepository(res.data.repository || null);
            dispatch(setProjectDetail({ projectId, project: res.data.project, repository: res.data.repository }));
            dispatch(updateProjectInTeam({ teamId, project: res.data.project }));
            setAlertData({ type: 'success', message: 'GitHub repository linked successfully!' });
            setManualRepoUrl('');
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.message || 'Failed to link repository' });
        } finally {
            setConnectingRepo(false);
        }
    };

    const handleDisconnectGitHub = async () => {
        setDisconnecting(true);
        try {
            const res = await axios.patch(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, {
                githubRepo: null
            }, { withCredentials: true });

            setProject(res.data.project);
            setRepository(null);
            dispatch(setProjectDetail({ projectId, project: res.data.project, repository: null }));
            dispatch(updateProjectInTeam({ teamId, project: res.data.project }));
            setAlertData({ type: 'info', message: 'GitHub repository disconnected.' });
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || 'Failed to disconnect GitHub' });
        } finally {
            setDisconnecting(false);
        }
    };

    const handleNotifyLeader = async () => {
        setNotifying(true);
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/projects/${projectId}/notify-leader`, {}, { withCredentials: true });
            setAlertData({ type: 'success', message: 'Team leader has been notified in general chat!' });
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || 'Failed to notify leader.' });
        } finally {
            setNotifying(false);
        }
    };

    if (loading) return <div className="text-zinc-500 animate-pulse">Loading project details...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'planning': return 'bg-[#000000] text-zinc-300 border-white/[0.08]';
            case 'active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'on_hold': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'completed': return 'bg-white/[0.08] text-white border-white/[0.12]';
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

    return (
        <div className="space-y-6">
            <button onClick={onBack} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18l-6-6l6-6" /></svg>
                Back to Projects
            </button>

            <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 relative shadow-lg">
                <div className="absolute top-6 right-6 z-20" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        title="Project Options"
                        className="p-2 text-zinc-400 hover:text-white bg-[#000000] hover:bg-white/[0.05] rounded-xl transition-colors border border-white/[0.06] flex items-center justify-center"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                            <button
                                onClick={() => { setIsMenuOpen(false); setIsLinkModalOpen(true); }}
                                className="w-full text-left px-4 py-2.5 text-xs font-bold text-white hover:bg-white/[0.05] flex items-center justify-between transition-colors"
                            >
                                <span className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    Project Links
                                </span>
                                <span className="text-[10px] bg-[#000000] border border-white/[0.06] px-2 py-0.5 rounded-full font-semibold text-zinc-300">
                                    {project.links?.length || 0}
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-4 max-w-2xl">
                        <input
                            type="text"
                            value={editData.title}
                            onChange={e => setEditData({ ...editData, title: e.target.value })}
                            className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white font-bold text-xl focus:outline-none focus:border-white/[0.2]"
                        />
                        <textarea
                            value={editData.description}
                            onChange={e => setEditData({ ...editData, description: e.target.value })}
                            rows={3}
                            className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/[0.2] resize-none"
                        />
                        <div className="flex gap-4">
                            <select
                                value={editData.status}
                                onChange={e => setEditData({ ...editData, status: e.target.value })}
                                className="bg-[#000000] border border-white/[0.06] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-white/[0.2]"
                            >
                                <option value="planning">Planning</option>
                                <option value="active">Active</option>
                                <option value="on_hold">On Hold</option>
                                <option value="completed">Completed</option>
                            </select>
                            <select
                                value={editData.priority}
                                onChange={e => setEditData({ ...editData, priority: e.target.value })}
                                className="bg-[#000000] border border-white/[0.06] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-white/[0.2]"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button onClick={handleSave} disabled={saving} className="bg-white hover:bg-zinc-200 text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95">
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-[#000000] hover:bg-white/[0.05] border border-white/[0.06] text-zinc-300 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-black text-white tracking-tight">{project.title}</h2>
                            <button onClick={() => setIsEditing(true)} className="text-zinc-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.05]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" /></svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-lg border ${getStatusColor(project.status)}`}>
                                {project.status.replace('_', ' ')}
                            </span>
                            <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-lg border ${getPriorityColor(project.priority)}`}>
                                {project.priority}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-400 max-w-3xl whitespace-pre-wrap font-normal">
                            {project.description || "No description provided."}
                        </p>
                    </div>
                )}
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/[0.06] gap-6 mt-8 mb-6 relative">
                <button
                    onClick={() => setActiveTab('issues')}
                    className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'issues' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Issues
                    {activeTab === 'issues' && (
                        <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'settings' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Settings
                    {activeTab === 'settings' && (
                        <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                    )}
                </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'issues' ? (
                <div className="space-y-4">
                    <IssueListView teamId={teamId} projectId={projectId} myRole={myRole} />
                </div>
            ) : (
                <div className="space-y-6 max-w-3xl">
                    {/* GitHub Connection Settings */}
                    <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 space-y-4 shadow-lg relative">
                        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
                        <div>
                            <h4 className="text-lg font-bold text-white mb-1 tracking-tight">GitHub Connection</h4>
                            <p className="text-xs text-zinc-400">Manage linking this project to a repository. A repository connection is required to log tasks and issues.</p>
                        </div>

                        {project.githubRepo ? (
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mt-1">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                            </svg>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-400 block">Linked GitHub Repository</span>
                                            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                                                <span className="text-zinc-400">
                                                    {repository?.owner || (project.githubRepo.replace('https://github.com/', '').split('/')[0] || '')}
                                                </span>
                                                <span className="text-zinc-600">/</span>
                                                <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                                                    {repository?.name || (project.githubRepo.replace('https://github.com/', '').split('/')[1] || '')}
                                                </a>
                                            </div>
                                            {(repository?.description) && (
                                                <p className="text-xs text-zinc-400 leading-relaxed font-normal mt-1 max-w-xl italic">
                                                    "{repository.description}"
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {myRole === 'leader' && (
                                        <button
                                            onClick={handleDisconnectGitHub}
                                            disabled={disconnecting}
                                            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
                                        >
                                            {disconnecting ? 'Disconnecting...' : 'Disconnect'}
                                        </button>
                                    )}
                                </div>

                                <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold text-zinc-400 block">Repository Synchronization</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-zinc-200">Status:</span>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                                repository?.syncStatus === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                repository?.syncStatus === 'SYNCING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' :
                                                repository?.syncStatus === 'QUEUED' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse' :
                                                repository?.syncStatus === 'FAILED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                                            }`}>
                                                {repository?.syncStatus || 'NOT_STARTED'}
                                            </span>
                                        </div>
                                        {repository?.lastSyncAt && (
                                            <span className="text-[10px] text-zinc-500 block">
                                                Last Synced: {new Date(repository.lastSyncAt).toLocaleString()}
                                            </span>
                                        )}
                                        {repository?.lastSyncError && (
                                            <span className="text-[10px] text-red-400 block">
                                                Error: {repository.lastSyncError}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleSyncGitHub}
                                        disabled={syncing || repository?.syncStatus === 'SYNCING' || repository?.syncStatus === 'QUEUED'}
                                        className="bg-white hover:bg-zinc-200 disabled:opacity-50 text-black font-bold px-4 py-2 rounded-xl text-xs transition-opacity flex items-center gap-2 self-start sm:self-center"
                                    >
                                        {(repository?.syncStatus === 'SYNCING' || repository?.syncStatus === 'QUEUED') ? (
                                            <>
                                                <div className="animate-spin rounded-full h-3 w-3 border-2 border-black/20 border-t-black" />
                                                Syncing...
                                            </>
                                        ) : (
                                            'Sync Repository'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : project.githubInstallationId ? (
                            <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-4 space-y-4">
                                <div>
                                    <span className="text-xs font-bold text-zinc-400 block">GitHub Authorized</span>
                                    <span className="text-sm font-semibold text-zinc-300">Select a repository to link with this project.</span>
                                </div>
                                {fetchingRepos ? (
                                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                                        Fetching authorized repositories...
                                    </div>
                                ) : repositories.length === 0 ? (
                                    <div className="space-y-3">
                                        <p className="text-xs text-amber-400/90 bg-amber-500/5 border border-amber-500/20 p-3 rounded-lg leading-normal">
                                            No repositories found. Ensure the GitHub App has been granted access to at least one repository.
                                        </p>
                                        {myRole === 'leader' && (
                                            <button
                                                onClick={handleConnectGitHub}
                                                className="bg-white hover:bg-zinc-200 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition-all"
                                            >
                                                Configure App Access
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <form onSubmit={handleConnectRepository} className="space-y-3">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Repository</label>
                                            <select
                                                value={selectedRepoId}
                                                onChange={(e) => setSelectedRepoId(e.target.value)}
                                                className="bg-[#0a0a0a] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/[0.2] transition-colors"
                                                disabled={connectingRepo}
                                            >
                                                {repositories.map(repo => (
                                                    <option key={repo.id} value={repo.id}>
                                                        {repo.full_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {myRole === 'leader' && (
                                            <div className="flex gap-2">
                                                <button
                                                    type="submit"
                                                    disabled={connectingRepo}
                                                    className="bg-white hover:bg-zinc-200 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                                                >
                                                    {connectingRepo ? 'Linking...' : 'Link Repository'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleConnectGitHub}
                                                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all"
                                                >
                                                    Configure/Update App
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-500/5 border border-white/[0.06] rounded-xl p-4">
                                    <div>
                                        <span className="text-xs font-bold text-zinc-400 block">Connection Status</span>
                                        <span className="text-sm font-semibold text-zinc-300">Not linked to GitHub</span>
                                    </div>
                                    {myRole !== 'leader' && (
                                        <button
                                            onClick={handleNotifyLeader}
                                            disabled={notifying}
                                            className="bg-white hover:bg-zinc-200 text-black font-bold px-4 py-2.5 rounded-xl text-xs transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center gap-1.5"
                                        >
                                            {notifying ? 'Notifying Leader...' : 'Notify Leader to Link'}
                                        </button>
                                    )}
                                </div>

                                {myRole === 'leader' && (
                                    <button
                                        onClick={handleConnectGitHub}
                                        disabled={connecting}
                                        className="bg-white hover:bg-zinc-200 text-black font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    >
                                        {connecting ? 'Connecting...' : 'Connect GitHub'}
                                    </button>
                                )}
                            </div>
                        )}

                        {!project.githubRepo && myRole === 'leader' && (
                            <div className="mt-4 border-t border-white/[0.06] pt-4">
                                <div className="text-zinc-500 text-[10px] font-extrabold uppercase tracking-wider mb-2">Or Link Repository Directly</div>
                                <form onSubmit={handleConnectManualRepository} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={manualRepoUrl}
                                        onChange={(e) => setManualRepoUrl(e.target.value)}
                                        placeholder="e.g. https://github.com/username/repository"
                                        className="flex-1 bg-[#000000] border border-white/[0.06] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/[0.2] transition-colors"
                                        disabled={connectingRepo}
                                    />
                                    <button
                                        type="submit"
                                        disabled={connectingRepo || !manualRepoUrl}
                                        className="bg-white hover:bg-zinc-200 disabled:opacity-50 text-black font-bold px-4 py-2 rounded-xl text-xs transition-opacity shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                                    >
                                        {connectingRepo ? 'Linking...' : 'Link Directly'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Danger Zone (Leader Only) */}
                    {myRole === 'leader' && (
                        <div className="bg-[#0a0a0a] border border-red-500/10 rounded-2xl p-6 space-y-4 shadow-lg relative">
                            <div className="absolute top-0 left-0 right-0 h-px bg-red-500/20" />
                            <div>
                                <h4 className="text-lg font-bold text-red-400 mb-1 tracking-tight">Danger Zone</h4>
                                <p className="text-xs text-zinc-400">Irreversible administrative actions for this project.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setIsArchiveModalOpen(true)}
                                    className="flex-1 border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                    Archive Project
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="flex-1 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    Delete Project
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemType="Project"
                itemName={project?.title}
                loading={deleting}
            />
            <DeleteConfirmModal
                isOpen={isArchiveModalOpen}
                onClose={() => setIsArchiveModalOpen(false)}
                onConfirm={handleArchive}
                title="Archive Project"
                itemType="Project"
                itemName={project?.title}
                requiredText="ARCHIVE"
                description="You are about to archive this project. It will be soft-deleted and removed from active project listings."
                warning="Archived projects are removed from immediate team views."
                buttonText="Archive Project"
                theme="amber"
                loading={archiving}
            />
            <AlertModal
                isOpen={!!alertData}
                onClose={() => setAlertData(null)}
                {...alertData}
            />
            <ProjectLinksModal
                isOpen={isLinkModalOpen}
                onClose={() => setIsLinkModalOpen(false)}
                project={project}
                myRole={myRole}
                onAddLink={handleAddLink}
                onRemoveLink={handleRemoveLink}
                onEditLink={handleEditLink}
                loading={addingLink}
            />
        </div>
    );
};

export default ProjectDetailPanel;
