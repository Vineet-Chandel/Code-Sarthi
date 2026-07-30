import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const CreateIssueModal = ({ isOpen, onClose, teamId, projectId, onSuccess }) => {
    const [type, setType] = useState('issue');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${BASE_URL}/teams/${teamId}/projects/${projectId}/issues`, {
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
                        className="relative w-full max-w-md bg-[#09090B] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#534AB7] to-[#A7A0F8] opacity-80" />

                        <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Create Issue</h2>
                        <p className="text-sm text-zinc-400 mb-6">Log a bug, propose a feature, or track a task.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Segmented Control for Type */}
                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Type *</label>
                                <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
                                    {['issue', 'feature', 'problem'].map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setType(t)}
                                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${type === t
                                                    ? 'bg-[#534AB7] text-white shadow-sm'
                                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    maxLength={150}
                                    placeholder="Brief summary..."
                                    className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7] transition-all"
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
                                    className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7] transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7] transition-all"
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
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-xl transition-colors border border-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !title.trim()}
                                    className="flex-1 bg-gradient-to-r from-[#534AB7] to-[#8075FF] hover:from-[#433B9B] hover:to-[#6F64E6] text-white font-medium py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(83,74,183,0.3)]"
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
