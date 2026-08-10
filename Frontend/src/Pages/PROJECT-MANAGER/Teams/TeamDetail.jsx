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
import DeleteConfirmModal from '../DeleteConfirmModal';
import AlertModal from '../AlertModal';

const TeamDetail = ({ teamId, onBack }) => {
    const dispatch = useDispatch();
    const cachedDetail = useSelector(store => store.projects?.teamDetails?.[teamId]);
    const [team, setTeam] = useState(cachedDetail?.team || null);
    const [membership, setMembership] = useState(cachedDetail?.membership || null);
    const [loading, setLoading] = useState(!cachedDetail?.isFetched);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('projects');
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [archiving, setArchiving] = useState(false);
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [alertData, setAlertData] = useState(null);

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
        setLeaving(true);
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/leave`, {}, { withCredentials: true });
            dispatch(removeTeam(teamId));
            setIsLeaveModalOpen(false);
            onBack();
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to leave team" });
            setLeaving(false);
        }
    };

    const handleArchive = async () => {
        setArchiving(true);
        try {
            await axios.patch(`${BASE_URL}/teams/${teamId}/archive`, {}, { withCredentials: true });
            dispatch(removeTeam(teamId));
            setIsArchiveModalOpen(false);
            onBack();
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to archive team" });
            setArchiving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`${BASE_URL}/teams/${teamId}`, { withCredentials: true });
            dispatch(removeTeam(teamId));
            setIsDeleteModalOpen(false);
            onBack();
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to delete team" });
            setDeleting(false);
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
                    {membership.role !== 'leader' && (
                        <button onClick={() => setIsLeaveModalOpen(true)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-red-500/20">
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
                            ownerId={team.ownerId?._id || team.ownerId} 
                        />
                    )}
                    {activeTab === 'settings' && (
                        <TeamSettingsPanel 
                            team={team} 
                            myRole={membership.role} 
                            onUpdate={fetchTeam} 
                            onArchive={() => setIsArchiveModalOpen(true)}
                            onDelete={() => setIsDeleteModalOpen(true)}
                        />
                    )}
                    {activeTab === 'analytics' && (
                        <ProjectManager teamId={teamId} />
                    )}
                </div>
            )}
            <TimerWidget teamId={teamId} inline={false} />
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemType="Team"
                itemName={team?.name}
                loading={deleting}
            />
            <DeleteConfirmModal
                isOpen={isArchiveModalOpen}
                onClose={() => setIsArchiveModalOpen(false)}
                onConfirm={handleArchive}
                title="Archive Team"
                itemType="Team"
                itemName={team?.name}
                requiredText="ARCHIVE"
                description="You are about to archive this team. This will perform a soft-delete and hide it from active lists."
                warning="Archived teams are moved out of active workflow."
                buttonText="Archive Team"
                theme="amber"
                loading={archiving}
            />
            <DeleteConfirmModal
                isOpen={isLeaveModalOpen}
                onClose={() => setIsLeaveModalOpen(false)}
                onConfirm={handleLeave}
                title="Leave Team"
                itemType="Team"
                itemName={team?.name}
                requiredText="LEAVE"
                description="You are about to leave this team and renounce your access."
                warning="You will need a new invitation code to rejoin this team."
                buttonText="Leave Team"
                theme="red"
                loading={leaving}
            />
            <AlertModal
                isOpen={!!alertData}
                onClose={() => setAlertData(null)}
                {...alertData}
            />
        </div>
    );
};

export default TeamDetail;
