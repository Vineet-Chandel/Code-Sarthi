import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import IssueListView from '../Issues/IssueListView';

const ProjectDetailPanel = ({ teamId, projectId, onBack, myRole }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Inline edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ title: '', description: '', status: '', priority: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    const fetchProject = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, { withCredentials: true });
            setProject(res.data.project);
            setEditData({
                title: res.data.project.title,
                description: res.data.project.description,
                status: res.data.project.status,
                priority: res.data.project.priority
            });
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
        } catch (err) {
            alert(err.response?.data?.error || "Failed to update project");
        } finally {
            setSaving(false);
        }
    };

    const handleArchive = async () => {
        if (!confirm("Are you sure you want to archive this project?")) return;
        try {
            await axios.delete(`${BASE_URL}/teams/${teamId}/projects/${projectId}`, { withCredentials: true });
            onBack();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to archive project");
        }
    };

    if (loading) return <div className="text-zinc-500 animate-pulse">Loading project details...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'planning': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'on_hold': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'completed': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
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

    return (
        <div className="space-y-6">
            <button onClick={onBack} className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18l-6-6l6-6" /></svg>
                Back to Projects
            </button>

            <div className="bg-[#09090B] border border-white/10 rounded-2xl p-6 relative">
                {myRole === 'leader' && (
                    <button
                        onClick={handleArchive}
                        className="absolute top-6 right-6 text-xs text-red-400 hover:text-red-300 hover:underline"
                    >
                        Archive Project
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
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none"
                        />
                        <div className="flex gap-4">
                            <select
                                value={editData.status}
                                onChange={e => setEditData({ ...editData, status: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            >
                                <option value="planning">Planning</option>
                                <option value="active">Active</option>
                                <option value="on_hold">On Hold</option>
                                <option value="completed">Completed</option>
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
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                            <button onClick={() => setIsEditing(true)} className="text-zinc-500 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" /></svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getStatusColor(project.status)}`}>
                                {project.status.replace('_', ' ')}
                            </span>
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getPriorityColor(project.priority)}`}>
                                {project.priority}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-400 max-w-3xl whitespace-pre-wrap">
                            {project.description || "No description provided."}
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Issues</h3>
                <IssueListView teamId={teamId} projectId={projectId} myRole={myRole} />
            </div>
        </div>
    );
};

export default ProjectDetailPanel;
