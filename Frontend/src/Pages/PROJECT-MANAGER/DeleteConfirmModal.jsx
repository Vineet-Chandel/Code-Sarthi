import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    itemType = 'item',
    itemName,
    loading = false,
    error = null,
    requiredText = 'DELETE',
    description,
    warning,
    buttonText,
    theme = 'red' // 'red' or 'amber'
}) => {
    const [confirmText, setConfirmText] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setConfirmText('');
        }
    }, [isOpen]);

    const isConfirmed = confirmText.trim().toLowerCase() === (requiredText || 'DELETE').toLowerCase();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isConfirmed && !loading) {
            onConfirm();
        }
    };

    const isAmber = theme === 'amber';
    const accentLine = isAmber ? 'from-amber-500 to-orange-500' : 'from-red-500 to-rose-600';
    const borderClass = isAmber ? 'border-amber-500/30' : 'border-red-500/30';
    const iconBoxClass = isAmber ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-red-500/10 border-red-500/20 text-red-400';
    const warningBoxClass = isAmber ? 'bg-amber-500/10 border-amber-500/20 text-amber-400/90' : 'bg-red-500/10 border-red-500/20 text-red-400/90';
    const focusClass = isAmber ? 'focus:border-amber-500/60 focus:ring-amber-500/20' : 'focus:border-red-500/60 focus:ring-red-500/20';
    const submitBtnClass = isAmber 
        ? 'bg-amber-600 hover:bg-amber-500 active:bg-amber-700 shadow-[0_0_15px_rgba(245,158,11,0.25)] disabled:hover:bg-amber-600' 
        : 'bg-red-600 hover:bg-red-500 active:bg-red-700 shadow-[0_0_15px_rgba(239,68,68,0.25)] disabled:hover:bg-red-600';

    const defaultTitle = requiredText === 'DELETE' ? `Delete ${itemType}` : `${requiredText.charAt(0) + requiredText.slice(1).toLowerCase()} ${itemType}`;
    const defaultButtonText = buttonText || (requiredText === 'DELETE' ? 'Permanently Delete' : `Confirm ${requiredText.charAt(0) + requiredText.slice(1).toLowerCase()}`);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={loading ? undefined : onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`relative w-full max-w-md bg-[#09090B] border ${borderClass} rounded-2xl p-6 shadow-2xl overflow-hidden`}
                    >
                        {/* Top warning accent */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentLine}`} />

                        <h2 className="text-xl font-bold text-white mb-2 tracking-tight flex items-center gap-2.5">
                            <span className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${iconBoxClass}`}>
                                {requiredText === 'DELETE' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                )}
                            </span>
                            {title || defaultTitle}
                        </h2>

                        <div className="text-sm text-zinc-300 mt-3 mb-3 leading-relaxed">
                            {description || (
                                <>
                                    You are about to perfectly confirm this action for {itemType.toLowerCase()}{itemName ? <span>: <strong className="text-white font-semibold">{itemName}</strong></span> : '.'}
                                </>
                            )}
                        </div>

                        {warning !== false && (
                            <div className={`text-xs mb-5 p-3.5 rounded-xl border leading-relaxed flex items-start gap-2.5 ${warningBoxClass}`}>
                                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>
                                    {warning || (
                                        requiredText === 'DELETE' 
                                            ? <span><strong>Warning:</strong> This action is irreversible. All associated data and sub-items will be permanently eradicated from our servers.</span>
                                            : <span><strong>Warning:</strong> Please make sure you intend to perform this strategic action before confirming.</span>
                                    )}
                                </span>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg p-3 mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-xs text-zinc-400 font-medium mb-2">
                                    To confirm this action, type <strong className="text-white select-all font-mono bg-white/10 px-1.5 py-0.5 rounded">{requiredText}</strong> below:
                                </label>
                                <input
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                    placeholder={`Type ${requiredText} to confirm`}
                                    disabled={loading}
                                    autoFocus
                                    className={`w-full bg-white/5 border border-white/10 ${focusClass} focus:outline-none focus:ring-2 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm tracking-widest uppercase placeholder:text-zinc-600 placeholder:tracking-normal placeholder:font-sans transition-all`}
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={loading}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium py-2.5 px-4 rounded-xl transition-colors border border-white/5 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isConfirmed || loading}
                                    className={`flex-1 text-white font-medium py-2.5 px-4 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 ${submitBtnClass}`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <span>{defaultButtonText}</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DeleteConfirmModal;
