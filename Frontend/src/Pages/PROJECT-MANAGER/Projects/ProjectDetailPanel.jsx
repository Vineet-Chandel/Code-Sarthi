import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
            setEditData({
                title: cachedDetail.project.title,
                description: cachedDetail.project.description,
                status: cachedDetail.project.status,
                priority: cachedDetail.project.priority
            });
            setLoading(false);
        }
    }, [projectId, cachedDetail?.isFetched]);

    const fetchProject = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, { withCredentials: true });
            setProject(res.data.project);
            setEditData({
                title: res.data.project.title,
                description: res.data.project.description,
                status: res.data.project.status,
                priority: res.data.project.priority
            });
            dispatch(setProjectDetail({ projectId, project: res.data.project }));
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load project");
        } finally {
            setLoading(false);
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
                            {myRole === 'leader' && (
                                <>
                                    <div className="border-t border-white/[0.06] my-1" />
                                    <button
                                        onClick={() => { setIsMenuOpen(false); setIsArchiveModalOpen(true); }}
                                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/10 flex items-center gap-2.5 transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                        Archive Project
                                    </button>
                                    <button
                                        onClick={() => { setIsMenuOpen(false); setIsDeleteModalOpen(true); }}
                                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-2.5 transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        Delete Project
                                    </button>
                                </>
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

            <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Issues</h3>
                <IssueListView teamId={teamId} projectId={projectId} myRole={myRole} />
            </div>

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
