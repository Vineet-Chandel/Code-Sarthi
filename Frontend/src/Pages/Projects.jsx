import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import BASE_URL from './auth/baseURL';
import { setTeams } from '../utils/projectSlice';
import CreateProjectModal from './PROJECT-MANAGER/Projects/CreateProjectModal';
import ProjectDetailPanel from './PROJECT-MANAGER/Projects/ProjectDetailPanel';

const Projects = () => {
    const dispatch = useDispatch();
    const { teams, isTeamsFetched } = useSelector((store) => store.projects || { teams: [], isTeamsFetched: false });

    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeamFilter, setSelectedTeamFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch user's teams first to gather roles and IDs
            let currentTeams = teams;
            if (!isTeamsFetched || currentTeams.length === 0) {
                const teamsRes = await axios.get(`${BASE_URL}/teams/mine`, { withCredentials: true });
                currentTeams = teamsRes.data.teams || [];
                dispatch(setTeams(currentTeams));
            }

            // 2. Fetch projects for each team in parallel
            const projectPromises = currentTeams.map(async (team) => {
                try {
                    const res = await axios.get(`${BASE_URL}/teams/${team._id}/projects`, { withCredentials: true });
                    return (res.data.projects || []).map(p => ({
                        ...p,
                        teamId: team._id,
                        teamName: team.name,
                        myRole: team.myRole || 'member'
                    }));
                } catch (err) {
                    console.error(`Failed to fetch projects for team ${team._id}`, err);
                    return [];
                }
            });

            const projectsArrays = await Promise.all(projectPromises);
            const combinedProjects = projectsArrays.flat().sort((a, b) => {
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            });

            setAllProjects(combinedProjects);
        } catch (err) {
            console.error("Error fetching projects dashboard data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSuccess = (newProject, targetTeamId) => {
        const targetTeam = teams.find(t => t._id === targetTeamId);
        const enrichedProject = {
            ...newProject,
            teamId: targetTeamId,
            teamName: targetTeam ? targetTeam.name : 'Team',
            myRole: targetTeam ? targetTeam.myRole : 'member'
        };
        setAllProjects(prev => [enrichedProject, ...prev]);
        setSelectedProject(enrichedProject);
    };

    const getStatusColor = (status = '') => {
        switch (status.toLowerCase()) {
            case 'planning': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'on_hold': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'completed': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    const getPriorityColor = (priority = '') => {
        switch (priority.toLowerCase()) {
            case 'urgent': return 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
            case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'medium': return 'bg-[#534AB7]/20 text-[#A7A0F8] border-[#534AB7]/30';
            case 'low': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    const getRoleBadge = (role = '') => {
        switch (role.toLowerCase()) {
            case 'leader':
                return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
            case 'admin':
                return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
            default:
                return 'bg-white/5 text-zinc-400 border border-white/10';
        }
    };

    // Filtered project stream
    const filteredProjects = allProjects.filter(project => {
        const matchesSearch = !searchQuery.trim() || 
            (project.title && project.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesTeam = !selectedTeamFilter || project.teamId === selectedTeamFilter;
        const matchesStatus = !statusFilter || project.status === statusFilter;
        const matchesPriority = !priorityFilter || project.priority === priorityFilter;
        return matchesSearch && matchesTeam && matchesStatus && matchesPriority;
    });

    const isFiltered = Boolean(searchQuery || selectedTeamFilter || statusFilter || priorityFilter);

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedTeamFilter('');
        setStatusFilter('');
        setPriorityFilter('');
    };

    // Render detail panel if a project is selected (No Team front-end displayed!)
    if (selectedProject) {
        return (
            <div className="w-full min-h-screen bg-[#000000] text-white p-6 md:p-12 overflow-y-auto font-sans">
                <div className="mx-auto max-w-6xl">
                    <ProjectDetailPanel
                        teamId={selectedProject.teamId}
                        projectId={selectedProject._id}
                        myRole={selectedProject.myRole}
                        onBack={() => {
                            setSelectedProject(null);
                            fetchData();
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#000000] text-white p-6 md:p-12 overflow-y-auto font-sans selection:bg-[#534AB7]/30">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                Projects
                            </h1>
                            {!loading && (
                                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#534AB7]/20 border border-[#534AB7]/40 text-[#A7A0F8] shadow-inner">
                                    {allProjects.length} {allProjects.length === 1 ? 'Initiative' : 'Initiatives'}
                                </span>
                            )}
                        </div>
                        <p className="text-zinc-400 text-sm md:text-base max-w-2xl">
                            Collaborate, oversee tasks, and drive your initiatives forward across all your teams in a single command dashboard.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={() => setCreateModalOpen(true)}
                            disabled={teams.length === 0}
                            title={teams.length === 0 ? "You must join or create a team before creating a project" : "Create a new project"}
                            className="w-full sm:w-auto bg-gradient-to-r from-[#534AB7] to-[#8075FF] hover:from-[#443C9C] hover:to-[#6A5FE5] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_25px_rgba(83,74,183,0.3)] hover:shadow-[0_0_35px_rgba(83,74,183,0.5)] active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                            New Project
                        </button>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-[#09090B] border border-white/10 rounded-2xl p-4 md:p-5 shadow-xl">
                    <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search project titles or descriptions..."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#534AB7] focus:bg-white/[0.05] transition-all"
                            />
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 items-center">
                            <select
                                value={selectedTeamFilter}
                                onChange={(e) => setSelectedTeamFilter(e.target.value)}
                                aria-label="Filter by Team"
                                className="bg-[#121215] border border-white/10 text-xs font-semibold text-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#534AB7] transition-colors cursor-pointer min-w-[130px]"
                            >
                                <option value="">All Teams</option>
                                {teams.map(t => (
                                    <option key={t._id} value={t._id}>{t.name}</option>
                                ))}
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                aria-label="Filter by Status"
                                className="bg-[#121215] border border-white/10 text-xs font-semibold text-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#534AB7] transition-colors cursor-pointer min-w-[130px]"
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
                                aria-label="Filter by Priority"
                                className="bg-[#121215] border border-white/10 text-xs font-semibold text-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#534AB7] transition-colors cursor-pointer min-w-[130px]"
                            >
                                <option value="">All Priorities</option>
                                <option value="urgent">Urgent</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>

                            {isFiltered && (
                                <button
                                    onClick={resetFilters}
                                    className="text-xs text-red-400 hover:text-red-300 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 font-bold transition-all shrink-0 flex items-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Projects Grid Display */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-[#09090B] border border-white/10 h-64 rounded-2xl animate-pulse p-6 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="w-1/3 h-4 bg-white/5 rounded"></div>
                                    <div className="w-3/4 h-6 bg-white/10 rounded"></div>
                                    <div className="w-full h-12 bg-white/5 rounded"></div>
                                </div>
                                <div className="w-full h-8 bg-white/5 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="bg-[#09090B] border border-dashed border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#534AB7]/20 to-purple-500/10 border border-[#534AB7]/30 rounded-full flex items-center justify-center mb-6 shadow-xl">
                            <svg className="w-10 h-10 text-[#A7A0F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            {isFiltered ? "No projects found matching filters" : "No projects across your teams"}
                        </h3>
                        <p className="text-sm text-zinc-400 max-w-md mb-8">
                            {isFiltered 
                                ? "try adjusting or clearing your search queries and dropdown filters above." 
                                : "Get started by launching your team's first project initiative to structure issues, links, and milestones."}
                        </p>
                        {isFiltered ? (
                            <button
                                onClick={resetFilters}
                                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                            >
                                Clear All Filters
                            </button>
                        ) : (
                            <button
                                onClick={() => setCreateModalOpen(true)}
                                disabled={teams.length === 0}
                                className="bg-[#534AB7] hover:bg-[#6A5FE5] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                + Create Your First Project
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => {
                            const creatorPhoto = project.createdBy?.photoUrl?.url;
                            const hasPhoto = creatorPhoto && creatorPhoto !== "https://geographyandyou.com/images/user-profile.png";
                            const creatorInitials = `${project.createdBy?.firstName ? project.createdBy.firstName[0].toUpperCase() : 'U'}${project.createdBy?.lastName ? project.createdBy.lastName[0].toUpperCase() : ''}`;
                            const creatorName = `${project.createdBy?.firstName || 'Unknown'} ${project.createdBy?.lastName || ''}`.trim();

                            return (
                                <div
                                    key={project._id}
                                    onClick={() => setSelectedProject(project)}
                                    className="group relative bg-[#0C0C0F] hover:bg-[#121216] border border-white/10 hover:border-[#534AB7]/60 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-[0_10px_35px_rgba(83,74,183,0.15)] flex flex-col justify-between overflow-hidden min-h-[260px]"
                                >
                                    {/* Subtle hover gradient background */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#534AB7]/5 via-transparent to-[#8075FF]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    <div>
                                        {/* Top Meta: Team Name & User Role */}
                                        <div className="flex items-center justify-between gap-2 mb-4 text-[11px]">
                                            <span className="bg-white/5 hover:bg-white/10 text-zinc-300 font-bold px-2.5 py-1 rounded-lg border border-white/10 truncate max-w-[65%] flex items-center gap-1.5" title={`Belongs to team: ${project.teamName}`}>
                                                <span className="w-2 h-2 rounded-full bg-[#A7A0F8] shrink-0" />
                                                {project.teamName}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${getRoleBadge(project.myRole)}`}>
                                                {project.myRole}
                                            </span>
                                        </div>

                                        {/* Project Title */}
                                        <h3 className="text-xl font-extrabold text-white group-hover:text-[#A7A0F8] transition-colors line-clamp-1 mb-2">
                                            {project.title}
                                        </h3>

                                        {/* Project Description */}
                                        <p className="text-sm text-zinc-400 line-clamp-2 mb-6 min-h-[40px]">
                                            {project.description || <span className="italic text-zinc-600">No detailed description provided.</span>}
                                        </p>
                                    </div>

                                    <div>
                                        {/* Status and Priority Badges */}
                                        <div className="flex items-center flex-wrap gap-2 mb-5">
                                            <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-lg border ${getStatusColor(project.status)}`}>
                                                {project.status ? project.status.replace('_', ' ') : 'PLANNING'}
                                            </span>
                                            <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-lg border ${getPriorityColor(project.priority)}`}>
                                                {project.priority || 'MEDIUM'}
                                            </span>
                                            {(project.links && project.links.length > 0) && (
                                                <span className="text-[10px] bg-white/5 text-zinc-300 border border-white/10 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5 text-[#A7A0F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                                    {project.links.length}
                                                </span>
                                            )}
                                        </div>

                                        {/* Footer: Created By & Arrow */}
                                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                            <div className="flex items-center gap-2 min-w-0" title={`Created by ${creatorName}`}>
                                                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-zinc-800 flex items-center justify-center shrink-0">
                                                    {hasPhoto ? (
                                                        <img src={creatorPhoto} alt={creatorName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-[9px] font-extrabold text-zinc-300">{creatorInitials}</span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-zinc-400 truncate max-w-[130px]">
                                                    {creatorName}
                                                </span>
                                            </div>

                                            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#534AB7] text-zinc-400 group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-sm group-hover:scale-105">
                                                <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Create Project Modal */}
            <CreateProjectModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                availableTeams={teams}
                onSuccess={handleCreateSuccess}
            />
        </div>
    );
};

export default Projects;