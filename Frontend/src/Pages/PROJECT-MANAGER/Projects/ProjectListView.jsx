import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { setTeamProjects, addProjectToTeam, updateProjectInTeam } from '../../../utils/projectSlice';
import CreateProjectModal from './CreateProjectModal';

const ProjectListView = ({ teamId, onProjectSelect }) => {
    const dispatch = useDispatch();
    const cachedProjects = useSelector(store => store.projects?.teamProjects?.[teamId]);
    const [projects, setProjects] = useState(cachedProjects?.projects || []);
    const [loading, setLoading] = useState(!cachedProjects?.isFetched);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    // Filters
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    useEffect(() => {
        if (!statusFilter && !priorityFilter && cachedProjects?.isFetched) {
            setProjects(cachedProjects.projects);
            setLoading(false);
        } else if (cachedProjects?.isFetched) {
            let filtered = cachedProjects.projects;
            if (statusFilter) filtered = filtered.filter(p => p.status === statusFilter);
            if (priorityFilter) filtered = filtered.filter(p => p.priority === priorityFilter);
            setProjects(filtered);
            setLoading(false);
        } else {
            fetchProjects();
        }
    }, [teamId, statusFilter, priorityFilter, cachedProjects?.isFetched, cachedProjects?.projects]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (statusFilter) params.append('status', statusFilter);
            if (priorityFilter) params.append('priority', priorityFilter);

            const res = await axios.get(`${BASE_URL}/teams/${teamId}/projects?${params.toString()}`, { withCredentials: true });
            setProjects(res.data.projects);
            if (!statusFilter && !priorityFilter) {
                dispatch(setTeamProjects({ teamId, projects: res.data.projects }));
            }
        } catch (err) {
            console.error("Failed to fetch projects", err);
        } finally {
            setLoading(false);
        }
    };

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#0a0a0a] border border-white/[0.06] text-sm font-semibold text-zinc-300 rounded-xl px-3.5 py-2 focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer"
                    >
                        <option value="">All Statuses</option>
                        <option value="planning">Planning</option>
                        <option value="active">Active</option>
                        <option value="on_hold">On Hold</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="bg-[#0a0a0a] border border-white/[0.06] text-sm font-semibold text-zinc-300 rounded-xl px-3.5 py-2 focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer"
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
                    className="bg-white hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] text-sm active:scale-95 flex items-center gap-1.5"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                    New Project
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-40 bg-[#0a0a0a] border border-white/[0.05] rounded-2xl animate-pulse"></div>)}
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-12 bg-[#0a0a0a] border border-white/[0.05] rounded-2xl">
                    <p className="text-zinc-400 font-medium">No projects found. Create one to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map(project => (
                        <div
                            key={project._id}
                            onClick={() => onProjectSelect(project._id)}
                            className="bg-[#0a0a0a] hover:bg-[#111111] border border-white/[0.05] hover:border-white/[0.12] rounded-2xl p-5 cursor-pointer transition-all duration-300 group flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-zinc-200 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 h-8 font-normal">
                                    {project.description || "No description provided."}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/[0.05]">
                                <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-lg border ${getStatusColor(project.status)}`}>
                                    {project.status.replace('_', ' ')}
                                </span>
                                <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-lg border ${getPriorityColor(project.priority)}`}>
                                    {project.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CreateProjectModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                teamId={teamId}
                onSuccess={(newProject) => {
                    const exists = cachedProjects?.projects?.some(p => p._id === newProject._id);
                    if (exists) {
                        dispatch(updateProjectInTeam({ teamId, project: newProject }));
                    } else {
                        dispatch(addProjectToTeam({ teamId, project: newProject }));
                    }
                }}
            />
        </div>
    );
};

export default ProjectListView;
