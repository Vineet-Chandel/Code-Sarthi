import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import DeleteConfirmModal from '../DeleteConfirmModal';
import AlertModal from '../AlertModal';

const TeamSettingsPanel = ({ team, myRole, onUpdate, onArchive, onDelete }) => {
    const [name, setName] = useState(team.name);
    const [description, setDescription] = useState(team.description || '');
    const [loading, setLoading] = useState(false);
    const [inviteCode, setInviteCode] = useState(team.inviteCode);
    const [generatingCode, setGeneratingCode] = useState(false);
    const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [logoPreview, setLogoPreview] = useState(team.logo || '');
    const [uploadingLogo, setUploadingLogo] = useState(false);

    const soccerRef = null;
    const isLeader = myRole === 'leader';

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingLogo(true);
        const uploadForm = new FormData();
        uploadForm.append("logo", file);

        try {
            const res = await axios.post(`${BASE_URL}/teams/${team._id}/logo/upload`, uploadForm, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            setLogoPreview(res.data.logo);
            onUpdate({ ...team, logo: res.data.logo });
            setAlertData({ type: 'success', title: 'Logo Uploaded', message: 'Team logo updated successfully!' });
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.message || 'Failed to upload logo' });
        } finally {
            setUploadingLogo(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!isLeader) return;

        setLoading(true);
        try {
            const res = await axios.patch(`${BASE_URL}/teams/${team._id}`, { name, description }, { withCredentials: true });
            onUpdate(res.data.team);
            setAlertData({ type: 'success', title: 'Settings Saved', message: "Settings saved successfully" });
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to save settings" });
        } finally {
            setLoading(false);
        }
    };

    const handleRegenerateCode = async () => {
        if (!isLeader) return;
        setGeneratingCode(true);
        try {
            const res = await axios.post(`${BASE_URL}/teams/${team._id}/invite`, {}, { withCredentials: true });
            setInviteCode(res.data.inviteCode);
            setIsRegenerateModalOpen(false);
            setAlertData({ type: 'success', title: 'Code Regenerated', message: "New team invite code is ready to share." });
        } catch (err) {
            setAlertData({ type: 'error', message: err.response?.data?.error || "Failed to regenerate invite code" });
        } finally {
            setGeneratingCode(false);
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(inviteCode);
        setAlertData({ type: 'success', title: 'Copied!', message: "Invite code copied to clipboard!" });
    };

    return (
        <div className="space-y-6">
            <div className="bg-[#0a0a0a] rounded-2xl p-7 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-6">General Settings</h3>
                
                {/* Logo picker */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-[80px] h-[80px] rounded-2xl bg-black border border-white/10 flex items-center justify-center text-white text-2xl font-black shrink-0 overflow-hidden relative group">
                        {logoPreview ? (
                            <img src={logoPreview} className="w-full h-full object-cover" alt="" />
                        ) : (
                            name?.[0]?.toUpperCase() || 'T'
                        )}
                        {uploadingLogo && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            </div>
                        )}
                    </div>
                    {isLeader && (
                        <div>
                            <label className="cursor-pointer bg-[#121212] hover:bg-white hover:text-black text-white text-xs font-bold py-2 px-4 rounded-xl border border-white/10 transition-all select-none">
                                {uploadingLogo ? 'Uploading...' : 'Change Logo'}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleLogoChange} 
                                    disabled={uploadingLogo} 
                                />
                            </label>
                            <span className="block text-[10px] text-zinc-500 mt-1.5 font-medium">Recommended: Square image, max 2MB.</span>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Team Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isLeader}
                            className="w-full bg-black rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white transition-all shadow-inner disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={!isLeader}
                            rows={3}
                            className="w-full bg-black rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white transition-all resize-none shadow-inner disabled:opacity-50"
                        />
                    </div>
                    {isLeader && (
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-white hover:bg-zinc-200 text-black font-extrabold py-3 px-6 rounded-xl transition-all shadow-lg disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </form>
            </div>

            {isLeader && (
                <div className="bg-[#0a0a0a] rounded-2xl p-7 shadow-2xl">
                    <h3 className="text-lg font-bold text-white mb-2">Invite Code</h3>
                    <p className="text-sm text-zinc-400 mb-6">Share this code with others so they can join your team.</p>

                    <div className="flex items-center gap-4">
                        <div className="bg-black rounded-xl px-4 py-3.5 flex-1 flex items-center justify-between shadow-inner">
                            <span className="font-mono text-lg font-bold text-white tracking-widest">{inviteCode}</span>
                            <button onClick={copyCode} className="text-zinc-400 hover:text-white transition-colors" title="Copy to clipboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8m0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
                            </button>
                        </div>
                        <button
                            onClick={() => setIsRegenerateModalOpen(true)}
                            disabled={generatingCode}
                            className="bg-[#121212] hover:bg-white hover:text-black text-white font-bold py-3.5 px-5 rounded-xl transition-all disabled:opacity-50 whitespace-nowrap shadow-sm"
                        >
                            Regenerate
                        </button>
                    </div>
                </div>
            )}

            {isLeader && (
                <div className="bg-red-500/[0.02] border border-red-500/20 rounded-2xl p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-red-400 mb-1">Danger Zone</h3>
                        <p className="text-sm text-zinc-400">Irreversible and destructive team governance actions.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-t border-red-500/10">
                        <div>
                            <div className="text-sm font-medium text-white mb-0.5">Archive Team</div>
                            <div className="text-xs text-zinc-400">Temporarily deactivate this team and hide it from active workspaces.</div>
                        </div>
                        <button
                            onClick={onArchive}
                            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 shrink-0"
                        >
                            Archive Team
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-red-500/10">
                        <div>
                            <div className="text-sm font-medium text-white mb-0.5">Delete Team</div>
                            <div className="text-xs text-zinc-400">Permanently eradicate this team along with all associated projects, issues, and contributions.</div>
                        </div>
                        <button
                            onClick={onDelete}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 shrink-0"
                        >
                            Delete Team
                        </button>
                    </div>
                </div>
            )}

            <DeleteConfirmModal
                isOpen={isRegenerateModalOpen}
                onClose={() => setIsRegenerateModalOpen(false)}
                onConfirm={handleRegenerateCode}
                title="Regenerate Invite Code"
                itemType="Code"
                itemName={team?.name}
                requiredText="REGENERATE"
                description="You are about to generate a new invitation code for this team."
                warning="Generating a new code will immediately invalidate the existing invite code."
                buttonText="Regenerate Code"
                theme="amber"
                loading={generatingCode}
            />
            <AlertModal
                isOpen={!!alertData}
                onClose={() => setAlertData(null)}
                {...alertData}
            />
        </div>
    );
};

export default TeamSettingsPanel;
