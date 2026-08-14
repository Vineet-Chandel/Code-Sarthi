import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const CreateIssueModal = ({ isOpen, onClose, teamId, projectId, projects = [], onSuccess }) => {
    const [type, setType] = useState('issue');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [localProjectId, setLocalProjectId] = useState(projectId || '');

    useEffect(() => {
        if (projectId) {
            setLocalProjectId(projectId);
        } else if (projects.length > 0) {
            setLocalProjectId(projects[0]._id);
        }
    }, [projectId, projects, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const targetProjectId = projectId || localProjectId;
        if (!targetProjectId) {
            setError('Please select a project');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/teams/${teamId}/projects/${targetProjectId}/issues`, {
                type, title, description, priority
            }, { withCredentials: true });
            onSuccess(res.data.issue);
            setTitle('');
            setDescription('');
            setType('issue');
            setPriority('medium');
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
                                    disabled={loading || !title.trim()}
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
