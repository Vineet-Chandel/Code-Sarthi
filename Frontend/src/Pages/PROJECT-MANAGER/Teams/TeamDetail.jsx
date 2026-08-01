import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { setTeamDetail, removeTeam } from '../../../utils/projectSlice';
import TeamMembersPanel from './TeamMembersPanel';
import TeamSettingsPanel from './TeamSettingsPanel';
import ProjectListView from '../Projects/ProjectListView';
import ProjectDetailPanel from '../Projects/ProjectDetailPanel';
import ProjectManager from '../../Project-Manager';
import TimerWidget from '../TimerWidget';

const TeamDetail = ({ teamId, onBack }) => {
    const dispatch = useDispatch();
    const cachedDetail = useSelector(store => store.projects?.teamDetails?.[teamId]);
    const [team, setTeam] = useState(cachedDetail?.team || null);
    const [membership, setMembership] = useState(cachedDetail?.membership || null);
    const [loading, setLoading] = useState(!cachedDetail?.isFetched);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('projects');
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    useEffect(() => {
        if (!cachedDetail?.isFetched) {
            fetchTeam();
        } else {
            setTeam(cachedDetail.team);
            setMembership(cachedDetail.membership);
            setLoading(false);
        }
    }, [teamId, cachedDetail?.isFetched]);

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}`, { withCredentials: true });
            setTeam(res.data.team);
            setMembership(res.data.membership);
            dispatch(setTeamDetail({ teamId, team: res.data.team, membership: res.data.membership }));
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load team");
        } finally {
            setLoading(false);
        }
    };

    const handleLeave = async () => {
        if (!confirm("Are you sure you want to leave this team?")) return;
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/leave`, {}, { withCredentials: true });
            dispatch(removeTeam(teamId));
            onBack();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to leave team");
        }
    };

    const handleArchive = async () => {
        if (!confirm("Are you sure you want to archive this team? This is a soft delete.")) return;
        try {
            await axios.delete(`${BASE_URL}/teams/${teamId}`, { withCredentials: true });
            dispatch(removeTeam(teamId));
            onBack();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to archive team");
        }
    };

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#534AB7] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full p-8 text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button onClick={onBack} className="text-[#A7A0F8] hover:underline">Go Back</button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen mx-auto p-10 font-sans animate-in fade-in zoom-in-95 duration-300 bg-black">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <button onClick={onBack} className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm mb-4 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18l-6-6l6-6" /></svg>
                        Back to Teams
                    </button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-white tracking-tight">{team.name}</h1>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${team.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
                            {team.status.toUpperCase()}
                        </span>
                    </div>
                    {team.description && <p className="text-zinc-400 mt-2 max-w-2xl">{team.description}</p>}
                </div>

                <div className="flex gap-2">
                    {membership.role === 'leader' ? (
                        <button onClick={handleArchive} className="bg-white/5 hover:bg-white/10 text-zinc-300 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-white/5">
                            Archive Team
                        </button>
                    ) : (
                        <button onClick={handleLeave} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-red-500/20">
                            Leave Team
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            {!selectedProjectId && (
                <div className="flex gap-6 border-b border-white/10 mb-8">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'projects' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Projects
                        {activeTab === 'projects' && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#534AB7] rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'members' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Members
                        {activeTab === 'members' && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#534AB7] rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'analytics' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Analytics
                        {activeTab === 'analytics' && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#534AB7] rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'settings' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Settings
                        {activeTab === 'settings' && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#534AB7] rounded-t-full" />}
                    </button>
                </div>
            )}

            {/* Content */}
            {selectedProjectId ? (
                <ProjectDetailPanel 
                    teamId={teamId} 
                    projectId={selectedProjectId} 
                    myRole={membership.role}
                    onBack={() => setSelectedProjectId(null)} 
                />
            ) : (
                <div className="min-h-[400px]">
                    {activeTab === 'projects' && (
                        <ProjectListView 
                            teamId={teamId} 
                            onProjectSelect={setSelectedProjectId} 
                        />
                    )}
                    {activeTab === 'members' && (
                        <TeamMembersPanel 
                            teamId={teamId} 
                            myRole={membership.role} 
                            ownerId={team.ownerId._id} 
                        />
                    )}
                    {activeTab === 'settings' && (
                        <TeamSettingsPanel 
                            team={team} 
                            myRole={membership.role} 
                            onUpdate={fetchTeam} 
                        />
                    )}
                    {activeTab === 'analytics' && (
                        <ProjectManager teamId={teamId} />
                    )}
                </div>
            )}
            <TimerWidget teamId={teamId} inline={false} />
        </div>
    );
};

export default TeamDetail;
