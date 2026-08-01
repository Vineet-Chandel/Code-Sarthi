import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "./auth/baseURL";
import CreateTeamModal from "./PROJECT-MANAGER/Teams/CreateTeamModal";
import JoinTeamForm from "./PROJECT-MANAGER/Teams/JoinTeamForm";
import TeamDetail from "./PROJECT-MANAGER/Teams/TeamDetail";

const Projects = () => {
    const user = useSelector((store) => store.user);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);

    useEffect(() => {
        if (!selectedTeamId) {
            fetchMyTeams();
        }
    }, [selectedTeamId]);

    const fetchMyTeams = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/teams/mine`, { withCredentials: true });
            setTeams(res.data.teams);
        } catch (err) {
            console.error("Failed to fetch teams", err);
        } finally {
            setLoading(false);
        }
    };

    if (selectedTeamId) {
        return <TeamDetail teamId={selectedTeamId} onBack={() => setSelectedTeamId(null)} />;
    }

    return (
        <div className="w-full min-h-screen bg-[#000000] font-sans text-white p-6 md:p-12 overflow-y-auto">
            <div className=" mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Teams</h1>
                        <p className="text-zinc-400">Collaborate, manage, and build together.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
                        <JoinTeamForm onSuccess={(newTeam) => setSelectedTeamId(newTeam._id)} />
                        <button
                            onClick={() => setCreateModalOpen(true)}
                            className="bg-[#ffffff] hover:opacity-90 text-black font-semibold py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(83,74,183,0.2)] whitespace-nowrap"
                        >
                            + New Team
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 h-48 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : teams.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white/[0.02] border border-white/5 rounded-3xl">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">No teams yet</h3>
                        <p className="text-zinc-500 max-w-sm mb-6">Create a new team or join an existing one using an invite code to get started.</p>
                        <button onClick={() => setCreateModalOpen(true)} className="text-[#A7A0F8] hover:text-white font-medium hover:underline">Create your first team</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map(team => (
                            <div
                                key={team._id}
                                onClick={() => setSelectedTeamId(team._id)}
                                className="group relative bg-[#121215] hover:bg-blue-500/10 border border-white/10 hover:border-[#534AB7]/50 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-[0_8px_30px_rgba(83,74,183,0.12)] overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#534AB7]/10 rounded-full blur-3xl group-hover:bg-[#534AB7]/20 transition-colors pointer-events-none" />

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white truncate pr-4">{team.name}</h3>
                                    {team.myRole === 'leader' && (
                                        <span className="flex-shrink-0 bg-[#A7A0F8]/10 text-[#A7A0F8] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-[#A7A0F8]/20">
                                            Leader
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-zinc-400 line-clamp-2 mb-6 min-h-[40px]">
                                    {team.description || "No description provided."}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {(team.members && team.members.length > 0 ? team.members.slice(0, 4) : team.ownerId ? [team.ownerId] : []).map((member, idx) => {
                                                const hasPhoto = member?.photoUrl?.url && member.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png";
                                                return (
                                                    <div
                                                        key={member._id || idx}
                                                        title={`${member.firstName || ''} ${member.lastName || ''} (${member.role || 'Leader'})`}
                                                        className={`w-7 h-7 rounded-full border-2 border-[#121215] flex items-center justify-center overflow-hidden shrink-0 ${member.role === 'leader' || idx === 0 ? 'bg-gradient-to-br from-[#534AB7] to-[#A7A0F8] text-white' : 'bg-zinc-800 text-zinc-300'}`}
                                                    >
                                                        {hasPhoto ? (
                                                            <img src={member.photoUrl.url} alt={member.firstName || 'Member'} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-[10px] font-extrabold tracking-tight">
                                                                {member.firstName ? member.firstName.charAt(0).toUpperCase() : 'U'}
                                                                {member.lastName ? member.lastName.charAt(0).toUpperCase() : ''}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            {team.memberCount > 4 && (
                                                <div className="w-7 h-7 rounded-full bg-zinc-900 border-2 border-[#121215] flex items-center justify-center text-[9px] font-bold text-[#A7A0F8] shrink-0">
                                                    +{team.memberCount - 4}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs text-zinc-400 font-semibold">{team.memberCount} {team.memberCount === 1 ? 'Member' : 'Members'}</span>
                                    </div>
                                    <div className="text-zinc-600 group-hover:text-[#A7A0F8] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7" /></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <CreateTeamModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSuccess={(newTeam) => setSelectedTeamId(newTeam._id)}
            />
        </div>
    );
};

export default Projects;