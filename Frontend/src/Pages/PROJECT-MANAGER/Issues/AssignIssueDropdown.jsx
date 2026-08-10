import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import AlertModal from '../AlertModal';

const AssignIssueDropdown = ({ teamId, issueId, currentAssigneeId, onAssign }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchMembers = async () => {
        if (members.length > 0) return; // Already fetched
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/members`, { withCredentials: true });
            // Only active members can be assigned
            setMembers(res.data.members.filter(m => m.status === 'active'));
        } catch (err) {
            console.error("Failed to fetch members", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchMembers();
        }
    };

    const handleAssign = async (userId) => {
        setIsOpen(false);
        try {
            const res = await axios.post(`${BASE_URL}/teams/${teamId}/issues/${issueId}/assign`, { userId }, { withCredentials: true });
            onAssign(res.data.issue);
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to assign issue" });
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={(e) => { e.stopPropagation(); toggleDropdown(); }}
                className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
            >
                Assign
                <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-56 bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl z-20 py-2" onClick={e => e.stopPropagation()}>
                    <div className="px-3 pb-2 mb-1 border-b border-white/[0.06] text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        Assign to member
                    </div>

                    {loading ? (
                        <div className="px-4 py-2 text-sm text-zinc-500 animate-pulse">Loading members...</div>
                    ) : members.length === 0 ? (
                        <div className="px-4 py-2 text-sm text-zinc-500">No active members found.</div>
                    ) : (
                        <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-0.5 px-1">
                            {members.map(member => {
                                const user = member.userId;
                                if (!user) return null;
                                const isAssigned = currentAssigneeId === user._id;

                                return (
                                    <button
                                        key={user._id}
                                        onClick={() => !isAssigned && handleAssign(user._id)}
                                        disabled={isAssigned}
                                        className={`w-full text-left px-3 py-2 text-sm flex items-center gap-3 transition-colors rounded-lg ${isAssigned
                                            ? 'opacity-50 cursor-not-allowed bg-white/[0.03]'
                                            : 'hover:bg-white/[0.06] text-zinc-300 hover:text-white'
                                            }`}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
                                            {user.photoUrl?.url && user.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                                                <img src={user.photoUrl.url} alt={user.firstName} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[10px] font-bold text-white">{user.firstName?.charAt(0).toUpperCase()}{user.lastName?.charAt(0).toUpperCase()}</span>
                                            )}
                                        </div>
                                        <span className="truncate font-medium">{user.firstName} {user.lastName}</span>
                                        {isAssigned && <svg className="w-4 h-4 ml-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
            <AlertModal
                isOpen={!!alertData}
                onClose={() => setAlertData(null)}
                {...alertData}
            />
        </div>
    );
};

export default AssignIssueDropdown;
