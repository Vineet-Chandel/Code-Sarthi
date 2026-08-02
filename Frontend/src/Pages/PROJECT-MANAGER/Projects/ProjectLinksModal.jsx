import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
    {
        id: 'vcs',
        name: 'Version Control System',
        description: 'GitHub, GitLab, Bitbucket, etc.',
        icon: (
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        borderColor: 'border-purple-500/30',
        bgColor: 'bg-purple-500/10',
        activeColor: 'ring-2 ring-purple-500 bg-purple-500/20'
    },
    {
        id: 'website',
        name: 'Website Link',
        description: 'Live demo, documentation, or staging server.',
        icon: (
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        borderColor: 'border-emerald-500/30',
        bgColor: 'bg-emerald-500/10',
        activeColor: 'ring-2 ring-emerald-500 bg-emerald-500/20'
    },
    {
        id: 'social',
        name: 'Social Media Link',
        description: 'Twitter/X, LinkedIn, Discord, or community discussions.',
        icon: (
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
        ),
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        borderColor: 'border-blue-500/30',
        bgColor: 'bg-blue-500/10',
        activeColor: 'ring-2 ring-blue-500 bg-blue-500/20'
    }
];

const ProjectLinksModal = ({ isOpen, onClose, project, myRole, onAddLink, onRemoveLink, loading }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('vcs');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const links = project?.links || [];
    const canManage = myRole === 'leader' || myRole === 'admin';

    const handleClose = () => {
        setIsAdding(false);
        setTitle('');
        setUrl('');
        setError('');
        onClose();
    };

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
                setIsAdding(false);
            }
        });
    };

    const getCategoryInfo = (catId) => {
        return categories.find(c => c.id === catId) || categories[1]; // default website
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
                        onClick={loading ? null : handleClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#121215] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 z-10 flex flex-col max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-5 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#534AB7]/20 border border-[#534AB7]/30 flex items-center justify-center text-[#A7A0F8]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        Project Links
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                                            {links.length}
                                        </span>
                                    </h3>
                                    <p className="text-xs text-zinc-400 truncate max-w-[250px] sm:max-w-md">
                                        {project?.title ? `Attached resources for ${project.title}` : 'Manage attached project URLs'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {!isAdding ? (
                                    <button
                                        onClick={() => setIsAdding(true)}
                                        className="bg-[#534AB7] hover:bg-[#6F64E6] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                                        Add Link
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { setIsAdding(false); setError(''); }}
                                        className="bg-white/10 hover:bg-white/20 text-zinc-300 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                                    >
                                        ← View Links
                                    </button>
                                )}
                                <button
                                    onClick={handleClose}
                                    disabled={loading}
                                    className="text-zinc-500 hover:text-white transition-colors p-1"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
                            {isAdding ? (
                                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                                    <div className="text-sm font-bold text-white mb-2">Create a New Resource Link</div>
                                    
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
                                                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                                                            isSelected ? cat.activeColor : 'border-white/10 bg-white/[0.02] hover:bg-white/5'
                                                        }`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg border ${cat.borderColor} ${cat.bgColor} flex items-center justify-center shrink-0`}>
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
                                            placeholder="e.g., GitHub Frontend Repo, Live Production App"
                                            className="w-full bg-[#09090B] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#534AB7] transition-colors"
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
                                                className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-20 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#534AB7] transition-colors font-mono"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                                        <button
                                            type="button"
                                            onClick={() => setIsAdding(false)}
                                            disabled={loading}
                                            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-xl text-sm font-semibold transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-2.5 bg-[#534AB7] hover:bg-[#6F64E6] text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(83,74,183,0.3)] disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {loading && <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                            {loading ? 'Saving...' : 'Save Link'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    {links.length === 0 ? (
                                        <div className="bg-white/[0.015] border border-dashed border-white/10 rounded-2xl p-10 text-center flex flex-col items-center justify-center my-2">
                                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-3">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                            </div>
                                            <div className="text-sm font-bold text-white mb-1">No links added yet</div>
                                            <p className="text-xs text-zinc-400 max-w-sm mb-5">
                                                Keep your team in sync by attaching code repositories, documentation, live demo servers, and social media channels.
                                            </p>
                                            <button
                                                onClick={() => setIsAdding(true)}
                                                className="bg-[#534AB7] hover:bg-[#6F64E6] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                                Add First Link
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            {links.map((link, idx) => {
                                                const cat = getCategoryInfo(link.category);
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="group bg-[#09090B] hover:bg-white/[0.03] border border-white/10 hover:border-[#534AB7]/50 rounded-xl p-4 transition-all flex flex-col justify-between relative shadow-sm"
                                                    >
                                                        <div>
                                                            <div className="flex items-center justify-between gap-2 mb-2.5">
                                                                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border flex items-center gap-1.5 ${cat.badge}`}>
                                                                    {cat.icon}
                                                                    {cat.name.replace(' Link', '')}
                                                                </span>
                                                                {canManage && (
                                                                    <button
                                                                        onClick={() => onRemoveLink(idx)}
                                                                        title="Remove link"
                                                                        className="text-zinc-500 hover:text-red-400 transition-colors p-1 rounded hover:bg-white/5"
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="text-base font-bold text-white group-hover:text-[#A7A0F8] transition-colors flex items-center gap-1.5 mb-1">
                                                                <span className="truncate">{link.title}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                                                        >
                                                            <span className="truncate max-w-[200px]">{link.url.replace(/^https?:\/\//i, '')}</span>
                                                            <svg className="w-3.5 h-3.5 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                        </a>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectLinksModal;
