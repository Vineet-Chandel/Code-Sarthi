const fs = require('fs');
const filePath = '/Users/vineetchandel/Developer/CodeSarthi/Frontend/src/Pages/PROJECT-MANAGER/Issues/IssueComments.jsx';
let code = fs.readFileSync(filePath, 'utf8');

const oldCommentItem = `const CommentItem = ({ comment, isAuthor, isEditing, setEditingCommentId, handleUpdate, handleDelete }) => {
    const [editBody, setEditBody] = useState(comment.body);
    const [isExpanded, setIsExpanded] = useState(false);
    
    // reset edit body if editing starts
    useEffect(() => {
        if (isEditing) {
            setEditBody(comment.body);
        }
    }, [isEditing, comment.body]);

    const isDeleted = !!comment.deletedAt;

    if (isDeleted) {
        return (
            <div className="flex items-center gap-4 py-1.5 opacity-40 select-none">
                <div className="w-9 h-9 rounded-full bg-[#111111] border border-white/[0.02] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </div>
                <span className="text-[12px] font-medium text-zinc-500 italic">This message was deleted.</span>
            </div>
        );
    }

    const needsReadMore = comment.body.length > 250 || (comment.body.match(/\\n/g) || []).length > 4;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 group w-full max-w-full"
        >
            <div className="w-9 h-9 rounded-full bg-[#111111] overflow-hidden shrink-0 mt-0.5 border border-white/[0.04] shadow-sm">
                {comment.authorId?.photoUrl?.url && comment.authorId.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                    <img src={comment.authorId.photoUrl.url} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-400 uppercase">
                        {comment.authorId?.firstName?.charAt(0)}{comment.authorId?.lastName?.charAt(0)}
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0 bg-transparent group-hover:bg-[#111111] p-3 -m-3 rounded-2xl transition-all duration-300 border border-transparent group-hover:border-white/[0.02] max-w-full">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap sm:flex-nowrap">
                    <div className="flex items-baseline gap-2.5 min-w-0 flex-wrap">
                        <span className="text-[13px] font-bold text-zinc-200 tracking-tight truncate">{comment.authorId?.firstName} {comment.authorId?.lastName}</span>
                        <span className="text-[10px] text-zinc-500 font-medium shrink-0" title={new Date(comment.createdAt).toLocaleString()}>
                            {formatRelativeTime(comment.createdAt)}
                        </span>
                        {comment.updatedAt !== comment.createdAt && (
                            <span className="text-[10px] text-zinc-600 italic font-medium shrink-0">(edited)</span>
                        )}
                    </div>
                    
                    {isAuthor && !isEditing && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 shrink-0">
                            <button onClick={() => setEditingCommentId(comment._id)} className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10" title="Edit">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button onClick={() => handleDelete(comment._id)} className="text-zinc-500 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-500/10" title="Delete">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                    )}
                </div>
                
                {isEditing ? (
                    <div className="mt-2 space-y-2 max-w-full">
                        <textarea 
                            value={editBody}
                            onChange={e => setEditBody(e.target.value)}
                            className="w-full bg-[#0a0a0a] text-[13px] text-zinc-300 p-3 rounded-xl border border-white/[0.08] focus:outline-none focus:border-white/[0.2] resize-none min-h-[80px] scrollbar-none shadow-inner"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setEditingCommentId(null)} className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">Cancel</button>
                            <button onClick={() => { handleUpdate(comment._id, editBody); setEditingCommentId(null); }} className="px-4 py-1.5 text-[11px] font-black bg-white text-black rounded-lg hover:bg-zinc-200 transition-all active:scale-95 shadow-sm">Save</button>
                        </div>
                    </div>
                ) : (
                    <div className="text-[13px] text-zinc-400 leading-relaxed whitespace-pre-wrap break-words break-all sm:break-normal max-w-full overflow-hidden">
                        <div className={!isExpanded && needsReadMore ? "line-clamp-4" : ""}>
                            {renderMarkdown(comment.body)}
                        </div>
                        {needsReadMore && (
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)} 
                                className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors mt-1"
                            >
                                {isExpanded ? "Show less" : "Read more"}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};`;

const newCommentItem = `const CommentItem = ({ comment, isAuthor, isEditing, setEditingCommentId, handleUpdate, handleDelete }) => {
    const [editBody, setEditBody] = useState(comment.body);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    
    // reset edit body if editing starts
    useEffect(() => {
        if (isEditing) {
            setEditBody(comment.body);
        }
    }, [isEditing, comment.body]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isDeleted = !!comment.deletedAt;

    if (isDeleted) {
        return (
            <div className="flex items-center gap-4 py-1.5 opacity-40 select-none">
                <div className="w-9 h-9 rounded-full bg-[#111111] border border-white/[0.02] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </div>
                <span className="text-[12px] font-medium text-zinc-500 italic">This message was deleted.</span>
            </div>
        );
    }

    const needsReadMore = comment.body.length > 250 || (comment.body.match(/\\n/g) || []).length > 4;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 group w-full max-w-full"
        >
            <div className="w-9 h-9 rounded-full bg-[#111111] overflow-hidden shrink-0 mt-0.5 border border-white/[0.04] shadow-sm">
                {comment.authorId?.photoUrl?.url && comment.authorId.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                    <img src={comment.authorId.photoUrl.url} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-400 uppercase">
                        {comment.authorId?.firstName?.charAt(0)}{comment.authorId?.lastName?.charAt(0)}
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col max-w-full">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap sm:flex-nowrap">
                    <div className="flex items-baseline gap-2.5 min-w-0 flex-wrap">
                        <span className="text-[13px] font-bold text-zinc-200 tracking-tight truncate">{comment.authorId?.firstName} {comment.authorId?.lastName}</span>
                        <span className="text-[10px] text-zinc-500 font-medium shrink-0" title={new Date(comment.createdAt).toLocaleString()}>
                            {formatRelativeTime(comment.createdAt)}
                        </span>
                        {comment.updatedAt !== comment.createdAt && (
                            <span className="text-[10px] text-zinc-600 italic font-medium shrink-0">(edited)</span>
                        )}
                    </div>
                </div>
                
                <div className="relative flex items-start gap-2">
                    {/* The Bubble */}
                    <div className="bg-[#111111] rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] text-zinc-300 leading-relaxed whitespace-pre-wrap break-words break-all sm:break-normal max-w-full overflow-hidden shadow-sm">
                        {isEditing ? (
                            <div className="space-y-3 min-w-[200px] sm:min-w-[300px]">
                                <textarea 
                                    value={editBody}
                                    onChange={e => setEditBody(e.target.value)}
                                    className="w-full bg-[#0a0a0a] text-[13px] text-zinc-300 p-3 rounded-xl border border-white/[0.04] focus:outline-none focus:border-white/[0.15] resize-none min-h-[80px] scrollbar-none shadow-inner"
                                />
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setEditingCommentId(null)} className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">Cancel</button>
                                    <button onClick={() => { handleUpdate(comment._id, editBody); setEditingCommentId(null); }} className="px-4 py-1.5 text-[11px] font-black bg-white text-black rounded-lg hover:bg-zinc-200 transition-all active:scale-95 shadow-sm">Save</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className={!isExpanded && needsReadMore ? "line-clamp-4" : ""}>
                                    {renderMarkdown(comment.body)}
                                </div>
                                {needsReadMore && (
                                    <button 
                                        onClick={() => setIsExpanded(!isExpanded)} 
                                        className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors mt-1.5 block"
                                    >
                                        {isExpanded ? "Show less" : "Read more"}
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Three Dots Menu for Author */}
                    {isAuthor && !isEditing && (
                        <div className="relative mt-1 shrink-0" ref={menuRef}>
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                                className={\`text-zinc-500 hover:text-white transition-colors p-1.5 rounded-full \${isMenuOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 opacity-0 group-hover:opacity-100'}\`}
                                title="Options"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute left-full top-0 ml-1 w-32 bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-20 origin-top-left"
                                    >
                                        <button 
                                            onClick={() => { setEditingCommentId(comment._id); setIsMenuOpen(false); }} 
                                            className="w-full text-left px-4 py-2.5 text-[12px] font-bold text-white hover:bg-white/[0.05] flex items-center gap-2.5 transition-colors"
                                        >
                                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            Edit
                                        </button>
                                        <div className="h-[1px] bg-white/[0.04] w-full" />
                                        <button 
                                            onClick={() => { handleDelete(comment._id); setIsMenuOpen(false); }} 
                                            className="w-full text-left px-4 py-2.5 text-[12px] font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-2.5 transition-colors"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            Delete
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};`;

code = code.replace(oldCommentItem, newCommentItem);
fs.writeFileSync(filePath, code);
