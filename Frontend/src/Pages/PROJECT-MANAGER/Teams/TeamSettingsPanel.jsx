import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const TeamSettingsPanel = ({ team, myRole, onUpdate }) => {
    const [name, setName] = useState(team.name);
    const [description, setDescription] = useState(team.description || '');
    const [loading, setLoading] = useState(false);
    const [inviteCode, setInviteCode] = useState(team.inviteCode);
    const [generatingCode, setGeneratingCode] = useState(false);

    const isLeader = myRole === 'leader';

    const handleSave = async (e) => {
        e.preventDefault();
        if (!isLeader) return;

        setLoading(true);
        try {
            const res = await axios.patch(`${BASE_URL}/teams/${team._id}`, { name, description }, { withCredentials: true });
            onUpdate(res.data.team);
            alert("Settings saved successfully");
        } catch (err) {
            alert(err.response?.data?.error || "Failed to save settings");
        } finally {
            setLoading(false);
        }
    };

    const handleRegenerateCode = async () => {
        if (!isLeader || !confirm("Generating a new code will invalidate the old one. Continue?")) return;
        setGeneratingCode(true);
        try {
            const res = await axios.post(`${BASE_URL}/teams/${team._id}/invite`, {}, { withCredentials: true });
            setInviteCode(res.data.inviteCode);
        } catch (err) {
            alert(err.response?.data?.error || "Failed to regenerate invite code");
        } finally {
            setGeneratingCode(false);
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(inviteCode);
        alert("Invite code copied to clipboard!");
    };

    return (
        <div className="space-y-6">
            <div className="bg-[#09090B] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-6">General Settings</h3>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Team Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isLeader}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#534AB7] transition-colors disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={!isLeader}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#534AB7] transition-colors resize-none disabled:opacity-50"
                        />
                    </div>
                    {isLeader && (
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#534AB7] hover:bg-[#6F64E6] text-white font-medium py-2.5 px-6 rounded-xl transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </form>
            </div>

            {isLeader && (
                <div className="bg-[#09090B] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Invite Code</h3>
                    <p className="text-sm text-zinc-400 mb-6">Share this code with others so they can join your team.</p>

                    <div className="flex items-center gap-3">
                        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-1 flex items-center justify-between">
                            <span className="font-mono text-lg text-white tracking-widest">{inviteCode}</span>
                            <button onClick={copyCode} className="text-[#A7A0F8] hover:text-white transition-colors" title="Copy to clipboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8m0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
                            </button>
                        </div>
                        <button
                            onClick={handleRegenerateCode}
                            disabled={generatingCode}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                            Regenerate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamSettingsPanel;
