import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const CreateTeamModal = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${BASE_URL}/teams`, { name, description }, { withCredentials: true });
            onSuccess(res.data.team);
            setName('');
            setDescription('');
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Failed to create team');
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
                        {/* Glassmorphism accents */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#534AB7] to-[#A7A0F8] opacity-80" />

                        <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Create a Team</h2>
                        <p className="text-sm text-zinc-400 mb-6">Set up a new space to collaborate with your peers.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Team Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={80}
                                    placeholder="e.g. Frontend Guild"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={500}
                                    placeholder="What is this team working on?"
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7] transition-all resize-none"
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
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-xl transition-colors border border-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !name.trim()}
                                    className="flex-1 bg-gradient-to-r from-[#534AB7] to-[#8075FF] hover:from-[#433B9B] hover:to-[#6F64E6] text-white font-medium py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(83,74,183,0.3)]"
                                >
                                    {loading ? 'Creating...' : 'Create Team'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateTeamModal;
