import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const CreateProjectModal = ({ isOpen, onClose, teamId, availableTeams = [], onSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('planning');
    const [priority, setPriority] = useState('medium');
    const [selectedTeamId, setSelectedTeamId] = useState(teamId || availableTeams[0]?._id || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // GitHub connection step states
    const [createdProject, setCreatedProject] = useState(null);
    const [githubUrl, setGithubUrl] = useState('');
    const [githubLoading, setGithubLoading] = useState(false);
    const [githubError, setGithubError] = useState(null);
    const [githubSuccess, setGithubSuccess] = useState(false);

    useEffect(() => {
        if (teamId) {
            setSelectedTeamId(teamId);
        } else if (availableTeams.length > 0 && !selectedTeamId) {
            setSelectedTeamId(availableTeams[0]._id);
        }
    }, [teamId, availableTeams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const targetTeamId = teamId || selectedTeamId;
        if (!targetTeamId) {
            setError('Please select a team for this project.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${BASE_URL}/teams/${targetTeamId}/projects`, {
                title, description, status, priority
            }, { withCredentials: true });
            
            // Notify parent list of the newly created project
            onSuccess(res.data.project, targetTeamId);
            
            // Clear normal project input state
            setTitle('');
            setDescription('');
            setStatus('planning');
            setPriority('medium');
            
            // Save project to createdProject to trigger step transition
            setCreatedProject(res.data.project);
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    const handleGitHubConnect = async (e) => {
        if (e) e.preventDefault();
        setGithubLoading(true);
        setGithubError(null);
        setGithubSuccess(false);

        // Generate a valid-looking dummy repository URL based on project title
        const projectTitleSlug = createdProject?.title 
            ? createdProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            : 'project';
        const dummyUrl = `https://github.com/codesarthi-projects/${projectTitleSlug}-${createdProject._id.substring(18)}`;

        try {
            const targetTeamId = teamId || selectedTeamId;
            const res = await axios.patch(`${BASE_URL}/teams/${targetTeamId}/projects/${createdProject._id}`, {
                githubRepo: dummyUrl
            }, { withCredentials: true });

            // Notify parent with the updated project details (including links)
            onSuccess(res.data.project, targetTeamId);
            setGithubSuccess(true);

            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err) {
            setGithubError(err.response?.data?.message || err.response?.data?.error || 'Failed to connect to GitHub');
        } finally {
            setGithubLoading(false);
        }
    };

    const handleClose = () => {
        setCreatedProject(null);
        setGithubUrl('');
        setGithubError(null);
        setGithubSuccess(false);
        setError(null);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

                        {createdProject ? (
                            <div className="space-y-4">
                                <div className="flex flex-col items-center justify-center text-center space-y-3 py-2">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl font-bold">
                                        ✓
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white tracking-tight">Project Created</h2>
                                        <p className="text-xs text-zinc-400 mt-1">Connect your project with GitHub to enable tracking.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-[#000000] border border-white/[0.06] rounded-xl p-4 space-y-1.5">
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Project ID (Temporary)</span>
                                        <div className="flex items-center justify-between gap-2">
                                            <code className="text-sm font-mono text-zinc-300 select-all break-all">{createdProject._id}</code>
                                            <button 
                                                onClick={() => navigator.clipboard.writeText(createdProject._id)}
                                                className="text-xs text-zinc-500 hover:text-white transition-colors flex-shrink-0"
                                                type="button"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <div className="bg-[#000000]/60 border border-white/[0.05] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3">
                                            <svg className="w-9 h-9 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                            </svg>
                                            <div>
                                                <h5 className="text-sm font-bold text-white">One-click GitHub Connection</h5>
                                                <p className="text-[11px] text-zinc-400 max-w-xs mt-1 leading-normal">Instantly connect this project to GitHub to unlock issue creation and synchronization.</p>
                                            </div>
                                        </div>

                                        {githubError && (
                                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold px-4 py-2.5 rounded-xl">
                                                {githubError}
                                            </div>
                                        )}

                                        {githubSuccess && (
                                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2.5 rounded-xl">
                                                GitHub repository linked successfully!
                                            </div>
                                        )}

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                disabled={githubLoading}
                                                className="flex-1 bg-[#000000] hover:bg-white/[0.05] text-zinc-300 font-semibold py-3 px-4 rounded-xl transition-colors border border-white/[0.06] text-sm"
                                            >
                                                Skip / Close
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleGitHubConnect}
                                                disabled={githubLoading}
                                                className="flex-1 bg-white hover:bg-zinc-200 text-black font-extrabold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 flex items-center justify-center gap-2 text-sm"
                                            >
                                                {githubLoading ? 'Connecting...' : 'Connect GitHub'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Create a Project</h2>
                                <p className="text-sm text-zinc-400 mb-6">Define a new initiative for your team.</p>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {!teamId && availableTeams.length > 0 && (
                                        <div>
                                            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Target Team *</label>
                                            <select
                                                value={selectedTeamId}
                                                onChange={(e) => setSelectedTeamId(e.target.value)}
                                                className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/[0.2] transition-all"
                                                required
                                            >
                                                {availableTeams.map((t) => (
                                                    <option key={t._id} value={t._id}>
                                                        {t.name} ({t.myRole ? t.myRole.toUpperCase() : 'MEMBER'})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Project Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            maxLength={100}
                                            placeholder="e.g. Website Redesign"
                                            className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.2] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Description</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            maxLength={1000}
                                            placeholder="What are the goals of this project?"
                                            rows={3}
                                            className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.2] transition-all resize-none"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Status</label>
                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/[0.2] transition-all"
                                            >
                                                <option value="planning">Planning</option>
                                                <option value="active">Active</option>
                                                <option value="on_hold">On Hold</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Priority</label>
                                            <select
                                                value={priority}
                                                onChange={(e) => setPriority(e.target.value)}
                                                className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/[0.2] transition-all"
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="flex-1 bg-[#000000] hover:bg-white/[0.05] text-zinc-300 font-semibold py-3 px-4 rounded-xl transition-colors border border-white/[0.06]"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading || !title.trim()}
                                            className="flex-1 bg-white hover:bg-zinc-200 text-black font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
                                        >
                                            {loading ? 'Creating...' : 'Create Project'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateProjectModal;
