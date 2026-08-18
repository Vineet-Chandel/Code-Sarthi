import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const CreateIssueModal = ({ isOpen, onClose, teamId, projectId, projects = [], onSuccess }) => {
    const [type, setType] = useState('issue');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [deadline, setDeadline] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [localProjectId, setLocalProjectId] = useState(projectId || '');

    // State for project details and GitHub link verification
    const [project, setProject] = useState(null);
    const [checkingGitHub, setCheckingGitHub] = useState(false);

    const loggedUser = useSelector(store => store.user?.user?.DATA);

    useEffect(() => {
        if (projectId) {
            setLocalProjectId(projectId);
        } else if (projects.length > 0) {
            setLocalProjectId(projects[0]._id);
        }
    }, [projectId, projects, isOpen]);

    const targetProjectId = projectId || localProjectId;

    useEffect(() => {
        if (!isOpen || !targetProjectId) {
            setProject(null);
            return;
        }

        const fetchProjectDetails = async () => {
            setCheckingGitHub(true);
            try {
                const res = await axios.get(`${BASE_URL}/teams/${teamId}/projects/${targetProjectId}`, { withCredentials: true });
                setProject(res.data.project);
            } catch (err) {
                console.error("Failed to fetch project details:", err);
            } finally {
                setCheckingGitHub(false);
            }
        };

        fetchProjectDetails();
    }, [isOpen, targetProjectId, teamId]);

    const hasGitHubLink = project && !!project.githubRepo;
    const isBlocked = project && !hasGitHubLink;
    const isCreator = project && loggedUser && (
        (typeof project.createdBy === 'object' ? project.createdBy?._id : project.createdBy) === loggedUser._id
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isBlocked) {
            setError('Cannot create issue: project is not linked with GitHub.');
            return;
        }
        setLoading(true);
        setError(null);
        
        if (!targetProjectId) {
            setError('Please select a project');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/teams/${teamId}/projects/${targetProjectId}/issues`, {
                type, title, description, priority, deadline: deadline || undefined
            }, { withCredentials: true });
            onSuccess(res.data.issue);
            setTitle('');
            setDescription('');
            setType('issue');
            setPriority('medium');
            setDeadline('');
            setProject(null);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Failed to create issue');
        } finally {
            setLoading(false);
        }
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
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

                        <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Create Issue</h2>
                        <p className="text-sm text-zinc-400 mb-6">Log a bug, propose a feature, or track a task.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Segmented Control for Type */}
                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Type *</label>
                                <div className="flex bg-[#000000] border border-white/[0.06] rounded-xl p-1 gap-1">
                                    {['issue', 'feature', 'problem'].map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setType(t)}
                                            className={`flex-1 py-2 text-sm rounded-lg transition-all capitalize font-semibold ${type === t
                                                    ? 'bg-white/[0.12] text-white shadow-sm'
                                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {!projectId && projects.length > 0 && (
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">Select Project *</label>
                                    <select
                                        value={localProjectId}
                                        onChange={(e) => setLocalProjectId(e.target.value)}
                                        className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/[0.2] transition-all font-semibold"
                                    >
                                        {projects.map(p => (
                                            <option key={p._id} value={p._id}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {checkingGitHub && (
                                <div className="text-xs text-zinc-500 animate-pulse flex items-center gap-1.5 py-1">
                                    <svg className="animate-spin h-3.5 w-3.5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Verifying GitHub link...</span>
                                </div>
                            )}

                            {isBlocked && !checkingGitHub && (
                                <div className="text-amber-400 text-xs bg-amber-400/10 border border-amber-400/20 rounded-xl p-3.5 space-y-1">
                                    <div className="font-bold flex items-center gap-1">
                                        <span>⚠️ GitHub Link Required</span>
                                    </div>
                                    <p className="text-zinc-400 leading-normal font-medium">
                                        {isCreator 
                                            ? "This project is not linked to GitHub. You must connect the project to a GitHub repository before you can create issues, features, or problems."
                                            : "This project is not linked to GitHub. Only the project creator has rights to link the project to a GitHub repository."
                                        }
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    maxLength={150}
                                    placeholder="Brief summary..."
                                    className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.2] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={2000}
                                    placeholder="Provide more details..."
                                    rows={4}
                                    className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.2] transition-all resize-none"
                                />
                            </div>

                            <div>
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

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Deadline</label>
                                <input
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/[0.2] transition-all"
                                />
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 bg-[#000000] hover:bg-white/[0.05] border border-white/[0.06] text-zinc-300 font-semibold py-3 px-4 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !title.trim() || isBlocked || checkingGitHub}
                                    className="flex-1 bg-white hover:bg-zinc-200 text-black font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-95"
                                >
                                    {loading ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateIssueModal;
