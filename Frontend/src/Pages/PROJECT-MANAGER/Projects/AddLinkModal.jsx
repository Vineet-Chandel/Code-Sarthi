import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
    {
        id: 'vcs',
        name: 'Version Control System',
        description: 'GitHub, GitLab, Bitbucket, etc.',
        icon: (
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        borderColor: 'border-purple-500/30',
        bgColor: 'bg-purple-500/10',
        activeColor: 'ring-2 ring-purple-500 bg-purple-500/20'
    },
    {
        id: 'website',
        name: 'Website Link',
        description: 'Live demo, documentation, or staging server.',
        icon: (
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
        borderColor: 'border-emerald-500/30',
        bgColor: 'bg-emerald-500/10',
        activeColor: 'ring-2 ring-emerald-500 bg-emerald-500/20'
    },
    {
        id: 'social',
        name: 'Social Media Link',
        description: 'Twitter/X, LinkedIn, Discord, or community discussions.',
        icon: (
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
        ),
        borderColor: 'border-blue-500/30',
        bgColor: 'bg-blue-500/10',
        activeColor: 'ring-2 ring-blue-500 bg-blue-500/20'
    }
];

const AddLinkModal = ({ isOpen, onClose, onAddLink, loading }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('vcs');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !url.trim()) {
            setError("Both title and URL are required.");
            return;
        }

        let formattedUrl = url.trim();
        if (!/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = `https://${formattedUrl}`;
        }

        onAddLink({ title: title.trim(), url: formattedUrl, category }, (success) => {
            if (success) {
                setTitle('');
                setUrl('');
                setCategory('vcs');
                onClose();
            }
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={loading ? null : onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden p-6 z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center pb-4 border-b border-white/[0.06] mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#000000] border border-white/[0.08] flex items-center justify-center text-white shadow-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white tracking-tight">Add Project Link</h3>
                                    <p className="text-xs text-zinc-400">Attach repositories, live demos, or community pages.</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="text-zinc-500 hover:text-white transition-colors p-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-400 font-medium flex items-center gap-2">
                                    <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/></svg>
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                                    Link Category
                                </label>
                                <div className="grid grid-cols-1 gap-2.5">
                                    {categories.map((cat) => {
                                        const isSelected = category === cat.id;
                                        return (
                                            <div
                                                key={cat.id}
                                                onClick={() => setCategory(cat.id)}
                                                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                                                    isSelected ? 'border-white/[0.3] bg-white/[0.05] shadow-md' : 'border-white/[0.06] bg-[#000000] hover:bg-white/[0.02]'
                                                }`}
                                            >
                                                <div className={`w-9 h-9 rounded-lg border ${cat.borderColor} ${cat.bgColor} flex items-center justify-center shrink-0`}>
                                                    {cat.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-white">{cat.name}</div>
                                                    <div className="text-xs text-zinc-400 truncate">{cat.description}</div>
                                                </div>
                                                {isSelected && (
                                                    <svg className="w-5 h-5 text-white ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                                    Link Title / Label
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., GitHub Frontend Repo or Live Production Web"
                                    className="w-full bg-[#000000] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/[0.2] transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                                    URL Address
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3.5 text-zinc-500 text-sm font-mono select-none">https://</span>
                                    <input
                                        type="text"
                                        value={url.replace(/^https?:\/\//i, '')}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="github.com/vineet/project"
                                        className="w-full bg-[#000000] border border-white/[0.06] rounded-xl pl-20 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/[0.2] transition-colors font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.06]">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={loading}
                                    className="px-5 py-2.5 bg-[#000000] hover:bg-white/[0.05] border border-white/[0.06] text-zinc-300 rounded-xl text-sm font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-black rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] disabled:opacity-40 flex items-center gap-2 active:scale-95"
                                >
                                    {loading && <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                    {loading ? 'Adding Link...' : 'Save Link'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddLinkModal;
