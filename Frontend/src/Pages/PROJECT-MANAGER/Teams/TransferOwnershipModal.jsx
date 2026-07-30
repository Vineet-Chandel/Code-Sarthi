import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const TransferOwnershipModal = ({ isOpen, onClose, teamId, targetUserId, members, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetUser = members.find(m => m.userId._id === targetUserId)?.userId;

    const handleTransfer = async () => {
        if (!targetUserId) return;
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/transfer-ownership`, { newLeaderId: targetUserId }, { withCredentials: true });
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Failed to transfer ownership');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && targetUser && (
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
                        className="relative w-full max-w-sm bg-[#09090B] border border-amber-500/20 rounded-2xl p-6 shadow-2xl overflow-hidden"
                    >
                        {/* Amber warning accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-80" />

                        <h2 className="text-xl font-bold text-white mb-2 tracking-tight flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            Transfer Ownership
                        </h2>

                        <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                            You are about to transfer ownership of this team to <strong className="text-white">{targetUser.firstName} {targetUser.lastName}</strong>.
                        </p>
                        <p className="text-sm text-amber-500/90 mb-6 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                            This action cannot be undone. You will immediately lose leader privileges and become a standard member.
                        </p>

                        {error && (
                            <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3 mb-4">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 px-4 rounded-xl transition-colors border border-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleTransfer}
                                disabled={loading}
                                className="flex-1 bg-amber-500/90 hover:bg-amber-500 text-white font-medium py-2.5 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                            >
                                {loading ? 'Transferring...' : 'Yes, Transfer'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TransferOwnershipModal;
