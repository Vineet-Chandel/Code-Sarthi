const fs = require('fs');
const filePath = '/Users/vineetchandel/Developer/CodeSarthi/Frontend/src/Pages/PROJECT-MANAGER/Issues/IssueComments.jsx';

let code = fs.readFileSync(filePath, 'utf8');

// Replace the form area
const oldForm = `            {/* Pinned Input Area */}
            <form onSubmit={handlePost} className="relative mt-auto">
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write a comment... (Markdown supported)"
                    className="w-full bg-[#0a0a0a] text-sm text-white p-3 pr-12 rounded-xl border border-white/[0.04] focus:outline-none focus:border-white/[0.1] resize-none custom-scrollbar transition-colors shadow-inner"
                    rows="2"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handlePost(e);
                        }
                    }}
                />
                <button 
                    type="submit" 
                    disabled={!body.trim() || isPosting}
                    className="absolute right-2 bottom-2 p-1.5 bg-white text-black rounded-lg disabled:opacity-20 transition-opacity hover:bg-zinc-200"
                >
                    {isPosting ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    )}
                </button>
            </form>`;

const newForm = `            {/* Pinned Input Area */}
            <form onSubmit={handlePost} className="relative mt-auto pt-2">
                <div className="bg-[#111111] border border-white/[0.06] focus-within:border-white/[0.15] focus-within:shadow-[0_0_20px_rgba(255,255,255,0.02)] rounded-2xl overflow-hidden transition-all duration-300 relative group">
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Leave a comment..."
                        className="w-full bg-transparent text-[13px] text-zinc-200 p-4 pb-12 focus:outline-none resize-none custom-scrollbar min-h-[90px] leading-relaxed placeholder:text-zinc-600"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handlePost(e);
                            }
                        }}
                    />
                    <div className="absolute bottom-2.5 left-4 right-2.5 flex justify-between items-center">
                        <div className="text-[10px] font-mono text-zinc-600 hidden sm:flex items-center gap-3 select-none">
                            <span className="hover:text-zinc-400 transition-colors cursor-help" title="Bold">**bold**</span>
                            <span className="hover:text-zinc-400 transition-colors cursor-help" title="Italic">*italic*</span>
                            <span className="hover:text-zinc-400 transition-colors cursor-help" title="Code">\`code\`</span>
                        </div>
                        <button 
                            type="submit" 
                            disabled={!body.trim() || isPosting}
                            className="flex items-center gap-2 px-4 py-1.5 bg-white text-black text-xs font-black rounded-xl disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-sm"
                        >
                            {isPosting ? (
                                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : (
                                <>
                                    <span>Send</span>
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>`;

code = code.replace(oldForm, newForm);

const oldHeader = `<h3 className="text-sm font-bold text-white mb-4">Discussion</h3>`;
const newHeader = `<div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-1.5 rounded-lg border border-white/10">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Discussion Thread</h3>
                <div className="flex-1 border-t border-white/[0.04] ml-4"></div>
            </div>`;

code = code.replace(oldHeader, newHeader);

const oldCommentBody = `                                <motion.div 
                                    key={comment._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3 group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#111111] overflow-hidden shrink-0 mt-1 border border-white/[0.02]">
                                        {comment.authorId?.photoUrl?.url && comment.authorId.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                                            <img src={comment.authorId.photoUrl.url} alt="avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-zinc-400">
                                                {comment.authorId?.firstName?.charAt(0)}{comment.authorId?.lastName?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xs font-bold text-zinc-300">{comment.authorId?.firstName} {comment.authorId?.lastName}</span>
                                                <span className="text-[10px] text-zinc-600" title={new Date(comment.createdAt).toLocaleString()}>
                                                    {formatRelativeTime(comment.createdAt)}
                                                </span>
                                                {comment.updatedAt !== comment.createdAt && (
                                                    <span className="text-[10px] text-zinc-600 italic">(edited)</span>
                                                )}
                                            </div>
                                            
                                            {isAuthor && !isEditing && (
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                    <button onClick={() => {
                                                        setEditingCommentId(comment._id);
                                                        setEditBody(comment.body);
                                                    }} className="text-zinc-500 hover:text-white transition-colors">
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </button>
                                                    <button onClick={() => handleDelete(comment._id)} className="text-zinc-500 hover:text-red-400 transition-colors">
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {isEditing ? (
                                            <div className="mt-2 space-y-2">
                                                <textarea 
                                                    value={editBody}
                                                    onChange={e => setEditBody(e.target.value)}
                                                    className="w-full bg-[#111111] text-sm text-zinc-300 p-3 rounded-xl border border-white/[0.04] focus:outline-none focus:border-white/[0.1] resize-none min-h-[80px]"
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => setEditingCommentId(null)} className="px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors">Cancel</button>
                                                    <button onClick={() => handleUpdate(comment._id)} className="px-3 py-1.5 text-xs font-bold bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors">Save</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap break-words">
                                                {renderMarkdown(comment.body)}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>`;

const newCommentBody = `                                <motion.div 
                                    key={comment._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-4 group"
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
                                    <div className="flex-1 min-w-0 bg-transparent group-hover:bg-[#111111] p-3 -m-3 rounded-2xl transition-all duration-300 border border-transparent group-hover:border-white/[0.02]">
                                        <div className="flex items-center justify-between gap-2 mb-1.5">
                                            <div className="flex items-baseline gap-2.5">
                                                <span className="text-[13px] font-bold text-zinc-200 tracking-tight">{comment.authorId?.firstName} {comment.authorId?.lastName}</span>
                                                <span className="text-[10px] text-zinc-500 font-medium" title={new Date(comment.createdAt).toLocaleString()}>
                                                    {formatRelativeTime(comment.createdAt)}
                                                </span>
                                                {comment.updatedAt !== comment.createdAt && (
                                                    <span className="text-[10px] text-zinc-600 italic font-medium">(edited)</span>
                                                )}
                                            </div>
                                            
                                            {isAuthor && !isEditing && (
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                    <button onClick={() => {
                                                        setEditingCommentId(comment._id);
                                                        setEditBody(comment.body);
                                                    }} className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10" title="Edit">
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </button>
                                                    <button onClick={() => handleDelete(comment._id)} className="text-zinc-500 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-500/10" title="Delete">
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {isEditing ? (
                                            <div className="mt-2 space-y-2">
                                                <textarea 
                                                    value={editBody}
                                                    onChange={e => setEditBody(e.target.value)}
                                                    className="w-full bg-[#0a0a0a] text-[13px] text-zinc-300 p-3 rounded-xl border border-white/[0.08] focus:outline-none focus:border-white/[0.2] resize-none min-h-[80px] custom-scrollbar shadow-inner"
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => setEditingCommentId(null)} className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">Cancel</button>
                                                    <button onClick={() => handleUpdate(comment._id)} className="px-4 py-1.5 text-[11px] font-black bg-white text-black rounded-lg hover:bg-zinc-200 transition-all active:scale-95 shadow-sm">Save</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-[13px] text-zinc-400 leading-relaxed whitespace-pre-wrap break-words">
                                                {renderMarkdown(comment.body)}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>`;

code = code.replace(oldCommentBody, newCommentBody);

// Minor change for the deleted state to match
const oldDeleted = `                                    <div key={comment._id} className="flex items-center gap-3 py-2 opacity-50">
                                        <div className="w-8 h-8 rounded-full bg-[#111111] border border-white/[0.02] flex items-center justify-center">
                                            <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </div>
                                        <span className="text-xs text-zinc-500 italic">Comment deleted</span>
                                    </div>`;
const newDeleted = `                                    <div key={comment._id} className="flex items-center gap-4 py-1.5 opacity-40 select-none">
                                        <div className="w-9 h-9 rounded-full bg-[#111111] border border-white/[0.02] flex items-center justify-center">
                                            <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </div>
                                        <span className="text-[12px] font-medium text-zinc-500 italic">This message was deleted.</span>
                                    </div>`;

code = code.replace(oldDeleted, newDeleted);

fs.writeFileSync(filePath, code);
