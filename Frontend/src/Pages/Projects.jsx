import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from './auth/baseURL';
import { setTeams } from '../utils/projectSlice';
import CreateProjectModal from './PROJECT-MANAGER/Projects/CreateProjectModal';
import ProjectDetailPanel from './PROJECT-MANAGER/Projects/ProjectDetailPanel';

const Projects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
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

    useEffect(() => {
        const projectIdParam = searchParams.get('projectId');
        if (projectIdParam && allProjects.length > 0) {
            const projectToSelect = allProjects.find(p => p._id === projectIdParam);
            if (projectToSelect) {
                setSelectedProject(projectToSelect);
                setSearchParams({});
            }
        }
    }, [allProjects, searchParams]);

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
        setAllProjects(prev => {
            const exists = prev.some(p => p._id === enrichedProject._id);
            if (exists) {
                return prev.map(p => p._id === enrichedProject._id ? enrichedProject : p);
            }
            return [enrichedProject, ...prev];
        });
        setSelectedProject(enrichedProject);
    };

    const getStatusColor = (status = '') => {
        switch (status.toLowerCase()) {
            case 'planning': return 'bg-[#000000] text-zinc-300 border-white/[0.08]';
            case 'active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'on_hold': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'completed': return 'bg-white/[0.08] text-white border-white/[0.12]';
            default: return 'bg-[#000000] text-zinc-400 border-white/[0.06]';
        }
    };

    const getPriorityColor = (priority = '') => {
        switch (priority.toLowerCase()) {
            case 'urgent': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'medium': return 'bg-white/[0.06] text-zinc-300 border-white/[0.08]';
            case 'low': return 'bg-[#000000] text-zinc-400 border-white/[0.06]';
            default: return 'bg-[#000000] text-zinc-400 border-white/[0.06]';
        }
    };

    const getRoleBadge = (role = '') => {
        switch (role.toLowerCase()) {
            case 'leader':
                return 'bg-white/[0.1] text-white border border-white/[0.15]';
            case 'admin':
                return 'bg-white/[0.06] text-zinc-200 border border-white/[0.1]';
            default:
                return 'bg-[#000000] text-zinc-400 border border-white/[0.06]';
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
        <div className="w-full min-h-screen bg-[#000000] text-white p-6 md:p-12 overflow-y-auto font-sans selection:bg-white/20">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/[0.06] pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                Projects
                            </h1>
                            {!loading && (
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0a0a0a] border border-white/[0.06] text-zinc-300">
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
                            className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-bold py-2.5 px-5 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                            New Project
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Total Projects Card */}
                    <div
                        onClick={() => { resetFilters(); navigate('/app/projects'); }}
                        className="group relative bg-[#0a0a0a] border border-white/[0.05] hover:border-white/[0.12] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex items-center justify-between"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-9 h-9 rounded-xl bg-[#000000] border border-white/[0.08] flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                    Total Projects
                                </span>
                            </div>
                            <div className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                                {loading ? <span className="text-2xl text-zinc-600 animate-pulse">---</span> : allProjects.length}
                                <span className="text-xs text-zinc-500 font-normal">Across all teams</span>
                            </div>
                        </div>
                        <div className="relative z-10 flex flex-col items-end justify-between h-full">
                            <span className="text-xs font-semibold text-zinc-400 group-hover:text-white flex items-center gap-1 mt-2 transition-colors">
                                View Initiatives
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </span>
                        </div>
                    </div>

                    {/* Total Teams Card */}
                    <div
                        onClick={() => navigate('/app/teams')}
                        className="group relative bg-[#0a0a0a] border border-white/[0.05] hover:border-white/[0.12] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex items-center justify-between"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-9 h-9 rounded-xl bg-[#000000] border border-white/[0.08] flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                    Total Teams
                                </span>
                            </div>
                            <div className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                                {!isTeamsFetched && teams.length === 0 ? <span className="text-2xl text-zinc-600 animate-pulse">---</span> : teams.length}
                                <span className="text-xs text-zinc-500 font-normal">Active workspaces</span>
                            </div>
                        </div>
                        <div className="relative z-10 flex flex-col items-end justify-between h-full">
                            <span className="text-xs font-semibold text-zinc-400 group-hover:text-white flex items-center gap-1 mt-2 transition-colors">
                                Manage Teams
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-4 md:p-5 shadow-lg">
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
                                className="w-full bg-[#000000] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/[0.2] transition-all"
                            />
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 items-center">
                            <select
                                value={selectedTeamFilter}
                                onChange={(e) => setSelectedTeamFilter(e.target.value)}
                                aria-label="Filter by Team"
                                className="bg-[#000000] border border-white/[0.06] text-xs font-medium text-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer min-w-[130px]"
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
                                className="bg-[#000000] border border-white/[0.06] text-xs font-medium text-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer min-w-[130px]"
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
                                className="bg-[#000000] border border-white/[0.06] text-xs font-medium text-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer min-w-[130px]"
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
                                    className="text-xs text-zinc-300 hover:text-white px-3.5 py-2.5 rounded-xl border border-white/[0.06] bg-[#000000] hover:bg-white/[0.05] font-semibold transition-all shrink-0 flex items-center gap-1.5"
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
                            <div key={i} className="bg-[#0a0a0a] border border-white/[0.05] h-64 rounded-2xl animate-pulse p-6 flex flex-col justify-between">
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
                    <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
                        <div className="w-16 h-16 bg-[#000000] border border-white/[0.08] rounded-2xl flex items-center justify-center mb-6 shadow-xl text-white">
                            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
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
                                className="bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                            >
                                Clear All Filters
                            </button>
                        ) : (
                            <button
                                onClick={() => setCreateModalOpen(true)}
                                disabled={teams.length === 0}
                                className="bg-white hover:bg-zinc-200 text-black text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 disabled:opacity-50"
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
                                    className="group relative bg-[#0a0a0a] hover:bg-[#111111] border border-white/[0.05] hover:border-white/[0.12] rounded-2xl p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[260px]"
                                >
                                    <div>
                                        {/* Top Meta: Team Name & User Role */}
                                        <div className="flex items-center justify-between gap-2 mb-4 text-[11px]">
                                            <span className="bg-[#000000] text-zinc-300 font-semibold px-2.5 py-1 rounded-lg border border-white/[0.06] truncate max-w-[65%] flex items-center gap-1.5" title={`Belongs to team: ${project.teamName}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                                                {project.teamName}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${getRoleBadge(project.myRole)}`}>
                                                {project.myRole}
                                            </span>
                                        </div>

                                        {/* Project Title */}
                                        <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors line-clamp-1 mb-2">
                                            {project.title}
                                        </h3>

                                        {/* Project Description */}
                                        <p className="text-sm text-zinc-400 line-clamp-2 mb-6 min-h-[40px] font-normal">
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
                                                <span className="text-[10px] bg-[#000000] text-zinc-300 border border-white/[0.06] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                                                    <svg className="w-3 h-3 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                                    {project.links.length}
                                                </span>
                                            )}
                                        </div>

                                        {/* Footer: Created By & Arrow */}
                                        <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
                                            <div className="flex items-center gap-2 min-w-0" title={`Created by ${creatorName}`}>
                                                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-[#000000] flex items-center justify-center shrink-0">
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

                                            <div className="w-8 h-8 rounded-full bg-[#000000] border border-white/[0.06] group-hover:bg-white text-zinc-400 group-hover:text-black group-hover:border-transparent flex items-center justify-center transition-all duration-200 shrink-0">
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