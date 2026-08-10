import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import BASE_URL from '../../auth/baseURL';
import { useSocket } from '../../../socket/SocketProvider';

const formatRelativeTime = (dateStr) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diffDays = Math.round((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
    const diffHours = Math.round((new Date(dateStr) - new Date()) / (1000 * 60 * 60));
    const diffMins = Math.round((new Date(dateStr) - new Date()) / (1000 * 60));

    if (Math.abs(diffDays) > 0) return rtf.format(diffDays, 'day');
    if (Math.abs(diffHours) > 0) return rtf.format(diffHours, 'hour');
    if (Math.abs(diffMins) > 0) return rtf.format(diffMins, 'minute');
    return 'just now';
};

const renderMarkdown = (text) => {
    if (!text) return null;
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-200">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-zinc-300">$1</em>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const CommentItem = ({ comment, isAuthor, isEditing, setEditingCommentId, handleUpdate, handleDelete }) => {
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

    const needsReadMore = comment.body.length > 250 || (comment.body.match(/\n/g) || []).length > 4;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 group w-full max-w-full ${isAuthor ? 'flex-row-reverse' : 'flex-row'}`}
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
            <div className={`flex-1 min-w-0 flex flex-col max-w-full ${isAuthor ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 mb-1.5 flex-wrap sm:flex-nowrap ${isAuthor ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex items-baseline gap-2.5 min-w-0 flex-wrap ${isAuthor ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="text-[13px] font-bold text-zinc-200 tracking-tight truncate">{comment.authorId?.firstName} {comment.authorId?.lastName}</span>
                        <span className="text-[10px] text-zinc-500 font-medium shrink-0" title={new Date(comment.createdAt).toLocaleString()}>
                            {formatRelativeTime(comment.createdAt)}
                        </span>
                        {comment.updatedAt !== comment.createdAt && (
                            <span className="text-[10px] text-zinc-600 italic font-medium shrink-0">(edited)</span>
                        )}
                    </div>
                </div>
                
                <div className={`relative flex items-start gap-2 max-w-[85%] ${isAuthor ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* The Bubble */}
                    <div className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed whitespace-pre-wrap break-words break-all sm:break-normal max-w-full overflow-hidden shadow-sm ${
                        isAuthor 
                        ? 'bg-blue-600/20 border border-blue-500/20 text-zinc-100 rounded-tr-sm' 
                        : 'bg-[#111111] text-zinc-300 rounded-tl-sm'
                    }`}>
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
                                className={`text-zinc-500 hover:text-white transition-all duration-200 p-1.5 rounded-full ${isMenuOpen ? 'bg-white/10 text-white opacity-100' : 'hover:bg-white/5 opacity-0 group-hover:opacity-100'}`}
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
                                        className={`absolute top-0 mt-6 w-32 bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-20 ${isAuthor ? 'right-0 origin-top-right' : 'left-full ml-1 origin-top-left'}`}
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
};

const IssueComments = ({ issueId, teamId, currentUserId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [body, setBody] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    
    // For editing
    const [editingCommentId, setEditingCommentId] = useState(null);
    
    const socketRef = useSocket();
    const commentsEndRef = useRef(null);

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/teams/${teamId}/issues/${issueId}/comments`, { withCredentials: true });
            setComments(res.data.comments || []);
            setLoading(false);
            setTimeout(scrollToBottom, 100);
        } catch (error) {
            console.error("Failed to fetch comments", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (issueId && teamId) {
            fetchComments();
        }
    }, [issueId, teamId]);

    useEffect(() => {
        const socket = socketRef?.current;
        if (!socket) return;

        const handleSocketMessage = (event) => {
            try {
                const payload = JSON.parse(event.data);
                
                // Only process events meant for this issue
                if (payload.does === 'comment:new' && payload.comment?.issueId === issueId) {
                    setComments(prev => [...prev, payload.comment]);
                    setTimeout(scrollToBottom, 100);
                } else if (payload.does === 'comment:updated' && payload.comment?.issueId === issueId) {
                    setComments(prev => prev.map(c => c._id === payload.comment._id ? payload.comment : c));
                } else if (payload.does === 'comment:deleted' && payload.issueId === issueId) {
                    setComments(prev => prev.map(c => c._id === payload.commentId ? { ...c, deletedAt: new Date() } : c));
                }
            } catch (err) {
                // Ignore parse errors from non-JSON messages
            }
        };

        socket.addEventListener('message', handleSocketMessage);
        return () => {
            socket.removeEventListener('message', handleSocketMessage);
        };
    }, [socketRef, issueId]);

    const handlePost = async (e) => {
        e.preventDefault();
        if (!body.trim() || isPosting) return;

        setIsPosting(true);
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/issues/${issueId}/comments`, { body }, { withCredentials: true });
            setBody('');
            // the new comment comes via socket, but we could also optimistically append
        } catch (error) {
            console.error("Failed to post comment", error);
        } finally {
            setIsPosting(false);
        }
    };

    const handleUpdate = async (commentId, editBody) => {
        if (!editBody.trim()) return;
        try {
            await axios.patch(`${BASE_URL}/teams/${teamId}/issues/${issueId}/comments/${commentId}`, { body: editBody }, { withCredentials: true });
        } catch (error) {
            console.error("Failed to update comment", error);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`${BASE_URL}/teams/${teamId}/issues/${issueId}/comments/${commentId}`, { withCredentials: true });
        } catch (error) {
            console.error("Failed to delete comment", error);
        }
    };

    return (
        <div className="flex flex-col mt-8 border-t border-white/[0.04] pt-6 max-w-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-1.5 rounded-lg border border-white/10">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Discussion Thread</h3>
                <div className="flex-1 border-t border-white/[0.04] ml-4"></div>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none max-h-[300px] space-y-4 mb-4 pr-2 max-w-full">
                {loading ? (
                    <div className="animate-pulse space-y-4">
                        {[1, 2].map(i => (
                            <div key={i} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/[0.03] shrink-0"></div>
                                <div className="space-y-2 flex-1 min-w-0">
                                    <div className="h-3 w-24 bg-white/[0.03] rounded"></div>
                                    <div className="h-10 w-full bg-white/[0.03] rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-6 text-zinc-600 text-xs">No comments yet. Start the discussion!</div>
                ) : (
                    <AnimatePresence initial={false}>
                        {comments.map(comment => (
                            <CommentItem 
                                key={comment._id}
                                comment={comment}
                                isAuthor={currentUserId && String(comment.authorId?._id) === String(currentUserId)}
                                isEditing={editingCommentId === comment._id}
                                setEditingCommentId={setEditingCommentId}
                                handleUpdate={handleUpdate}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </AnimatePresence>
                )}
                <div ref={commentsEndRef} />
            </div>

            {/* Pinned Input Area */}
            <form onSubmit={handlePost} className="relative mt-auto pt-2 w-full max-w-full">
                <div className="bg-[#111111] border border-white/[0.06] focus-within:border-white/[0.15] focus-within:shadow-[0_0_20px_rgba(255,255,255,0.02)] rounded-2xl overflow-hidden transition-all duration-300 relative group max-w-full">
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Leave a comment..."
                        className="w-full bg-transparent text-[13px] text-zinc-200 p-4 pb-12 focus:outline-none resize-none scrollbar-none min-h-[90px] leading-relaxed placeholder:text-zinc-600 block"
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
            </form>
        </div>
    );
};

export default IssueComments;
