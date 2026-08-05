import { motion, AnimatePresence } from 'framer-motion';

const AlertModal = ({ isOpen, onClose, title, message, type = 'info' }) => {
    if (!isOpen) return null;

    const getThemeConfig = () => {
        switch (type) {
            case 'success':
                return {
                    accent: 'from-emerald-500 to-teal-500',
                    border: 'border-emerald-500/30',
                    bgIcon: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                    buttonBg: 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]',
                    defaultTitle: 'Success',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    )
                };
            case 'error':
                return {
                    accent: 'from-red-500 to-rose-600',
                    border: 'border-red-500/30',
                    bgIcon: 'bg-red-500/10 border-red-500/20 text-red-400',
                    buttonBg: 'bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]',
                    defaultTitle: 'Error',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )
                };
            default: // info
                return {
                    accent: 'from-blue-500 to-indigo-600',
                    border: 'border-blue-500/30',
                    bgIcon: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                    buttonBg: 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]',
                    defaultTitle: 'Information',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                };
        }
    };

    const theme = getThemeConfig();

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={`relative w-full max-w-sm bg-[#0a0a0a] border ${theme.border} rounded-2xl p-6 shadow-2xl overflow-hidden`}
                >
                    {/* Top gradient accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.accent}`} />

                    <div className="flex items-start gap-3.5 mb-4">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${theme.bgIcon}`}>
                            {theme.icon}
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                            <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                                {title || theme.defaultTitle}
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                        {message}
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        autoFocus
                        className={`w-full font-medium py-2.5 px-4 rounded-xl transition-all text-sm flex items-center justify-center ${theme.buttonBg}`}
                    >
                        Got it
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AlertModal;
