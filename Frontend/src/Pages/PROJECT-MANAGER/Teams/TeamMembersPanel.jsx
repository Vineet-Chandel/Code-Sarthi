import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import TransferOwnershipModal from './TransferOwnershipModal';
import DeleteConfirmModal from '../DeleteConfirmModal';
import AlertModal from '../AlertModal';

const TeamMembersPanel = ({ teamId, myRole, ownerId }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transferModalOpen, setTransferModalOpen] = useState(false);
    const [removingUserId, setRemovingUserId] = useState(null);
    const [removing, setRemoving] = useState(false);
    const [alertData, setAlertData] = useState(null);

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

    const handleRemoveMember = async () => {
        if (!removingUserId) return;
        setRemoving(true);
        try {
            await axios.delete(`${BASE_URL}/teams/${teamId}/members/${removingUserId}`, { withCredentials: true });
            setMembers(members.filter(m => m.userId._id !== removingUserId));
            setRemovingUserId(null);
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to remove member" });
        } finally {
            setRemoving(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.patch(`${BASE_URL}/teams/${teamId}/members/${userId}/role`, { role: newRole }, { withCredentials: true });
            setMembers(members.map(m => m.userId._id === userId ? { ...m, role: newRole } : m));
            setAlertData({ type: 'success', title: 'Role Updated', message: `Member role successfully changed to ${newRole}.` });
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || `Failed to change member role to ${newRole}` });
        }
    };

    if (loading) return <div className="text-zinc-500 animate-pulse">Loading members...</div>;

    return (
        <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 flex justify-between items-center bg-black/40">
                <h3 className="text-lg font-bold text-white">Team Members</h3>
                <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-inner">
                    {members.length} Members
                </span>
            </div>

            <div className="flex flex-col gap-1 p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                {members.map(member => {
                    const user = member.userId;
                    if (!user) return null;

                    const isLeader = member.role === 'leader';
                    const isAdmin = member.role === 'admin';

                    return (
                        <div key={member._id} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#121212] rounded-xl transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#534AB7] to-[#A7A0F8] p-[2px]">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                        {user.photoUrl?.url && user.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                                            <img src={user.photoUrl.url} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-white font-medium">{user.firstName?.charAt(0).toUpperCase()}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-white">{user.firstName} {user.lastName}</span>
                                        {isLeader && (
                                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#A7A0F8] bg-black px-2.5 py-0.5 rounded shadow-inner">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L9 8H3l5 5l-2 7l6-4l6 4l-2-7l5-5h-6z" /></svg>
                                                Leader
                                            </span>
                                        )}
                                        {isAdmin && (
                                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-black px-2.5 py-0.5 rounded shadow-inner">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
                                                Admin
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-zinc-500 font-medium">{user.email}</span>
                                </div>
                            </div>

                            {/* Leader Actions */}
                            {myRole === 'leader' && !isLeader && (
                                <div className="flex gap-2">
                                    {isAdmin ? (
                                        <button
                                            onClick={() => handleRoleChange(user._id, 'member')}
                                            className="text-xs font-bold text-zinc-400 hover:text-zinc-200 bg-black hover:bg-[#1a1a1a] px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                                        >
                                            Remove Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleRoleChange(user._id, 'admin')}
                                            className="text-xs font-bold text-emerald-400/80 hover:text-emerald-400 bg-black hover:bg-[#1a1a1a] px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setTransferModalOpen(user._id)}
                                        className="text-xs font-bold text-zinc-400 hover:text-white bg-black hover:bg-[#1a1a1a] px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                                    >
                                        Make Leader
                                    </button>
                                    <button
                                        onClick={() => setRemovingUserId(user._id)}
                                        className="text-xs font-bold text-amber-500/80 hover:text-amber-400 bg-black hover:bg-[#1a1a1a] px-3.5 py-2 rounded-lg transition-colors shadow-sm"
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
            <DeleteConfirmModal
                isOpen={!!removingUserId}
                onClose={() => setRemovingUserId(null)}
                onConfirm={handleRemoveMember}
                title="Remove Member"
                itemType="Member"
                itemName={(() => {
                    const u = members.find(m => m.userId?._id === removingUserId)?.userId;
                    return u ? `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email : '';
                })()}
                requiredText="REMOVE"
                description="You are about to remove this member from the team."
                warning="They will lose access to all team resources immediately."
                buttonText="Remove Member"
                theme="red"
                loading={removing}
            />
            <AlertModal
                isOpen={!!alertData}
                onClose={() => setAlertData(null)}
                {...alertData}
            />
        </div>
    );
};

export default TeamMembersPanel;
