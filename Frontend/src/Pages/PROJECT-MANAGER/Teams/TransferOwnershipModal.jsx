import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const TransferOwnershipModal = ({ isOpen, onClose, teamId, targetUserId, members, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [confirmText, setConfirmText] = useState('');

    useEffect(() => {
        if (!isOpen) setConfirmText('');
    }, [isOpen]);

    const isConfirmed = confirmText.trim().toLowerCase() === 'transfer';

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
                        className="relative w-full max-w-sm bg-[#0a0a0a] rounded-2xl p-7 shadow-2xl overflow-hidden"
                    >
                        <h2 className="text-xl font-bold text-white mb-2 tracking-tight flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            Transfer Ownership
                        </h2>

                        <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                            You are about to transfer ownership of this team to <strong className="text-white">{targetUser.firstName} {targetUser.lastName}</strong>.
                        </p>
                        <p className="text-sm text-amber-400 mb-6 bg-amber-500/10 p-3 rounded-xl">
                            This action cannot be undone. You will immediately lose leader privileges and become a standard member.
                        </p>

                        {error && (
                            <div className="text-red-400 text-sm bg-red-400/10 rounded-xl p-3 mb-4">
                                {error}
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-xs text-zinc-400 font-medium mb-2">
                                To confirm transfer, type <strong className="text-white select-all font-mono bg-black px-2 py-0.5 rounded shadow-inner">TRANSFER</strong> below:
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder="Type TRANSFER to confirm"
                                disabled={loading}
                                autoFocus
                                className="w-full bg-black rounded-xl px-4 py-3 text-white font-mono text-sm tracking-widest uppercase placeholder:text-zinc-600 placeholder:tracking-normal placeholder:font-sans transition-all shadow-inner focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-black hover:bg-[#151515] text-zinc-400 hover:text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleTransfer}
                                disabled={!isConfirmed || loading}
                                className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3 px-4 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg text-sm flex items-center justify-center gap-2"
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
