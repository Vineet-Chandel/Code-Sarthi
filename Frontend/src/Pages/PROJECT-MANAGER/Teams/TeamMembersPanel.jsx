import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import TransferOwnershipModal from './TransferOwnershipModal';

const TeamMembersPanel = ({ teamId, myRole, ownerId }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transferModalOpen, setTransferModalOpen] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, [teamId]);

    const fetchMembers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/members`, { withCredentials: true });
            setMembers(res.data.members);
        } catch (err) {
            console.error("Failed to fetch members", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (userId) => {
        if (!confirm("Are you sure you want to remove this member?")) return;
        try {
            await axios.delete(`${BASE_URL}/teams/${teamId}/members/${userId}`, { withCredentials: true });
            setMembers(members.filter(m => m.userId._id !== userId));
        } catch (err) {
            alert(err.response?.data?.error || "Failed to remove member");
        }
    };

    if (loading) return <div className="text-zinc-500 animate-pulse">Loading members...</div>;

    return (
        <div className="bg-[#09090B] border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-lg font-medium text-white">Team Members</h3>
                <span className="bg-[#534AB7]/20 text-[#A7A0F8] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#534AB7]/30">
                    {members.length} Members
                </span>
            </div>

            <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                {members.map(member => {
                    const user = member.userId;
                    const isLeader = member.role === 'leader';

                    return (
                        <div key={member._id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#534AB7] to-[#A7A0F8] p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#09090B] flex items-center justify-center overflow-hidden">
                                        {user.photoUrl?.url && user.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                                            <img src={user.photoUrl.url} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-white font-medium">{user.firstName?.charAt(0).toUpperCase()}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-white">{user.firstName} {user.lastName}</span>
                                        {isLeader && (
                                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#A7A0F8] bg-[#A7A0F8]/10 px-2 py-0.5 rounded border border-[#A7A0F8]/20">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L9 8H3l5 5l-2 7l6-4l6 4l-2-7l5-5h-6z" /></svg>
                                                Leader
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-zinc-500">{user.email}</span>
                                </div>
                            </div>

                            {/* Leader Actions */}
                            {myRole === 'leader' && !isLeader && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setTransferModalOpen(user._id)}
                                        className="text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded transition-colors border border-white/5"
                                    >
                                        Make Leader
                                    </button>
                                    <button
                                        onClick={() => handleRemoveMember(user._id)}
                                        className="text-xs font-medium text-amber-500/80 hover:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded transition-colors border border-amber-500/20"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <TransferOwnershipModal
                isOpen={!!transferModalOpen}
                onClose={() => setTransferModalOpen(false)}
                teamId={teamId}
                targetUserId={transferModalOpen}
                members={members}
                onSuccess={() => {
                    setTransferModalOpen(false);
                    window.location.reload(); // Quick refresh to update full state
                }}
            />
        </div>
    );
};

export default TeamMembersPanel;
