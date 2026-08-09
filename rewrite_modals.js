const fs = require('fs');

const issueModalPath = '/Users/vineetchandel/Developer/CodeSarthi/Frontend/src/Pages/PROJECT-MANAGER/Issues/IssueLinksModal.jsx';
const projectModalPath = '/Users/vineetchandel/Developer/CodeSarthi/Frontend/src/Pages/PROJECT-MANAGER/Projects/ProjectLinksModal.jsx';

const getBaseModalCode = (isProject) => {
    const componentName = isProject ? 'ProjectLinksModal' : 'IssueLinksModal';
    const entityName = isProject ? 'project' : 'issue';
    const canManageCondition = isProject 
        ? `myRole === 'leader' || myRole === 'admin'` 
        : `myRole === 'leader' || myRole === 'admin' || (issue && user && (String(issue.createdBy) === String(user._id) || (issue.assignedTo && String(issue.assignedTo._id || issue.assignedTo) === String(user._id))))`;
    
    const extraImports = isProject ? '' : `import { useSelector } from 'react-redux';`;
    const userHook = isProject ? '' : `const user = useSelector(store => store.user);`;

    return `import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
${extraImports}

const categories = [
    {
        id: 'vcs',
        name: 'Version Control System',
        description: 'GitHub, GitLab, Bitbucket, etc.',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
    {
        id: 'website',
        name: 'Website Link',
        description: 'Live demo, documentation, or staging server.',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
    },
    {
        id: 'social',
        name: 'Social Media Link',
        description: 'Twitter/X, LinkedIn, Discord, or community discussions.',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
        ),
    }
];

const ${componentName} = ({ isOpen, onClose, ${entityName}, myRole, onAddLink, onRemoveLink, onEditLink, loading }) => {
    ${userHook}
    const [isAdding, setIsAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('vcs');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const links = ${entityName}?.links || [];
    const canManage = ${canManageCondition};

    const handleCancel = () => {
        setIsAdding(false);
        setEditingIndex(null);
        setTitle('');
        setUrl('');
        setCategory('vcs');
        setError('');
    };

    const handleClose = () => {
        handleCancel();
        onClose();
    };

    const handleEditClick = (idx, link) => {
        setEditingIndex(idx);
        setTitle(link.title);
        setUrl(link.url);
        setCategory(link.category);
        setIsAdding(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !url.trim()) {
            setError("Both title and URL are required.");
            return;
        }

        let formattedUrl = url.trim();
        if (!/^https?:\\/\\//i.test(formattedUrl)) {
            formattedUrl = \`https://\${formattedUrl}\`;
        }

        const payload = { title: title.trim(), url: formattedUrl, category };

        if (editingIndex !== null) {
            if (onEditLink) {
                onEditLink(editingIndex, payload, (success) => {
                    if (success) handleCancel();
                });
            } else {
                handleCancel();
            }
        } else {
            onAddLink(payload, (success) => {
                if (success) handleCancel();
            });
        }
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
                        className="relative w-full max-w-2xl bg-[#0a0a0a] border-none rounded-2xl shadow-2xl overflow-hidden p-6 z-10 flex flex-col max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center pb-4 border-b border-[#1f1f1f] mb-5 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#000000] border-none flex items-center justify-center text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        ${isProject ? 'Project Links' : 'Issue Links'}
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#000000] text-neutral-300">
                                            {links.length}
                                        </span>
                                    </h3>
                                    <p className="text-xs text-neutral-400 truncate max-w-[250px] sm:max-w-md">
                                        {${entityName}?.title ? \`Attached resources for \${${entityName}.title}\` : 'Manage attached URLs'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {!isAdding ? (
                                    <button
                                        onClick={() => setIsAdding(true)}
                                        className="bg-white hover:bg-neutral-200 text-black text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                                        Add Link
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleCancel}
                                        className="bg-[#000000] hover:bg-[#111111] border-none text-neutral-300 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                                    >
                                        ← View Links
                                    </button>
                                )}
                                <button
                                    onClick={handleClose}
                                    disabled={loading}
                                    className="text-neutral-500 hover:text-white transition-colors p-1"
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
                                    <div className="text-sm font-bold text-white mb-2">
                                        {editingIndex !== null ? 'Edit Resource Link' : 'Create a New Resource Link'}
                                    </div>
                                    
                                    {error && (
                                        <div className="bg-[#000000] rounded-xl p-3 text-xs text-white font-medium flex items-center gap-2 border border-red-500/50">
                                            <svg className="w-4 h-4 shrink-0 fill-current text-red-500" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/></svg>
                                            {error}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                                            Link Category
                                        </label>
                                        <div className="grid grid-cols-1 gap-2.5">
                                            {categories.map((cat) => {
                                                const isSelected = category === cat.id;
                                                return (
                                                    <div
                                                        key={cat.id}
                                                        onClick={() => setCategory(cat.id)}
                                                        className={\`p-3 rounded-xl border-none cursor-pointer transition-all flex items-center gap-3.5 \${
                                                            isSelected ? 'bg-white text-black' : 'bg-[#000000] hover:bg-[#111111] text-neutral-400'
                                                        }\`}
                                                    >
                                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                                                            {cat.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className={\`text-sm font-bold \${isSelected ? 'text-black' : 'text-white'}\`}>{cat.name}</div>
                                                            <div className={\`text-xs truncate \${isSelected ? 'text-neutral-700' : 'text-neutral-500'}\`}>{cat.description}</div>
                                                        </div>
                                                        {isSelected && (
                                                            <svg className="w-5 h-5 text-black ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                                            Link Title / Label
                                        </label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g., Pull Request #42, Figma UI Design"
                                            className="w-full bg-[#000000] border-none rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                                            URL Address
                                        </label>
                                        <div className="relative flex items-center">
                                            <span className="absolute left-4 text-neutral-500 text-sm font-mono select-none">https://</span>
                                            <input
                                                type="text"
                                                value={url.replace(/^https?:\\/\\//i, '')}
                                                onChange={(e) => setUrl(e.target.value)}
                                                placeholder="github.com/org/repo/pull/42"
                                                className="w-full bg-[#000000] border-none rounded-xl pl-20 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white transition-colors font-mono"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-3 border-t border-[#1f1f1f]">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            disabled={loading}
                                            className="px-4 py-2.5 bg-[#000000] hover:bg-[#111111] border-none text-neutral-300 rounded-xl text-sm font-semibold transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {loading && <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                            {loading ? 'Saving...' : 'Save Link'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    {links.length === 0 ? (
                                        <div className="bg-[#000000] border-none rounded-2xl p-10 text-center flex flex-col items-center justify-center my-2">
                                            <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border-none flex items-center justify-center text-neutral-500 mb-3">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                            </div>
                                            <div className="text-sm font-bold text-white mb-1">No links added yet</div>
                                            <p className="text-xs text-neutral-500 max-w-sm mb-5">
                                                Attach relevant Pull Requests, design files, screenshot links, or documentation directly here.
                                            </p>
                                            <button
                                                onClick={() => setIsAdding(true)}
                                                className="bg-white hover:bg-neutral-200 text-black text-xs font-bold px-4.5 py-2.5 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
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
                                                        className="group bg-[#000000] hover:bg-[#111111] border-none rounded-xl p-4 transition-all flex flex-col justify-between relative shadow-sm"
                                                    >
                                                        <div>
                                                            <div className="flex items-center justify-between gap-2 mb-2.5">
                                                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-black flex items-center gap-1.5">
                                                                    {cat.icon}
                                                                    {cat.name.replace(' Link', '')}
                                                                </span>
                                                                {canManage && (
                                                                    <div className="flex items-center gap-1">
                                                                        <button
                                                                            onClick={() => handleEditClick(idx, link)}
                                                                            title="Edit link"
                                                                            className="text-neutral-500 hover:text-white transition-colors p-1.5 rounded hover:bg-[#222]"
                                                                        >
                                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" /></svg>
                                                                        </button>
                                                                        <button
                                                                            onClick={() => onRemoveLink(idx)}
                                                                            title="Remove link"
                                                                            className="text-neutral-500 hover:text-white transition-colors p-1.5 rounded hover:bg-[#222]"
                                                                        >
                                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="text-base font-bold text-white group-hover:text-white transition-colors flex items-center gap-1.5 mb-1">
                                                                <span className="truncate">{link.title}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-3 pt-2.5 border-t border-[#1f1f1f] flex items-center justify-between text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                                                        >
                                                            <span className="truncate max-w-[200px]">{link.url.replace(/^https?:\\/\\//i, '')}</span>
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

export default ${componentName};
`;
};

fs.writeFileSync(issueModalPath, getBaseModalCode(false));
fs.writeFileSync(projectModalPath, getBaseModalCode(true));

console.log('Modals rewritten.');
