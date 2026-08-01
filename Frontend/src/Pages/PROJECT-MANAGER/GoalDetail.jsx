import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BASE_URL from '../../Pages/auth/baseURL';

const formatCommentDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday = date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    if (isToday) {
        return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
        return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined, hour: '2-digit', minute: '2-digit' });
};

const GoalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const currentUser = useSelector((store) => store?.user?.user?.DATA);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');

    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        targetDate: '',
        priority: 'Low',
        category: '',
        status: 'Not Started',
        tags: '',
        progress: 0,
        following: false
    });

    const priorities = ["Low", "Medium", "High", "Critical"];
    const statuses = ["Not Started", "In Progress", "On Track", "At Risk", "On Hold", "Completed"];
    const popularTags = ["Frontend", "Backend", "Design", "DevOps", "Marketing", "Bug", "Feature"];

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/goals/${id}`, { withCredentials: true });
                setGoal(res.data);
                setComments(res.data.comments || []);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch goal detail", err);
                setError("Goal not found or unauthorized");
                setLoading(false);
            }
        };
        fetchGoal();
    }, [id]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const res = await axios.post(`${BASE_URL}/goals/${id}/comments`, { text: newComment }, { withCredentials: true });
            setGoal(res.data);
            setComments(res.data.comments || []);
            setNewComment('');
        } catch (error) {
            console.error("Failed to add comment", error);
            alert("Failed to add comment. Please try again.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;
        try {
            const res = await axios.delete(`${BASE_URL}/goals/${id}/comments/${commentId}`, { withCredentials: true });
            setGoal(res.data);
            setComments(res.data.comments || []);
        } catch (error) {
            console.error("Failed to delete comment", error);
            alert("Failed to delete comment.");
        }
    };

    const handleEditCommentSubmit = async (commentId) => {
        if (!editCommentText.trim()) return;
        try {
            const res = await axios.put(`${BASE_URL}/goals/${id}/comments/${commentId}`, { text: editCommentText }, { withCredentials: true });
            setGoal(res.data);
            setComments(res.data.comments || []);
            setEditingCommentId(null);
            setEditCommentText('');
        } catch (error) {
            console.error("Failed to edit comment", error);
            alert("Failed to edit comment.");
        }
    };

    const handleReactionToggle = async (commentId, emoji) => {
        try {
            const res = await axios.post(`${BASE_URL}/goals/${id}/comments/${commentId}/reactions`, { emoji }, { withCredentials: true });
            setGoal(res.data);
            setComments(res.data.comments || []);
        } catch (error) {
            console.error("Failed to toggle reaction", error);
        }
    };

    const handleDeleteGoal = async () => {
        if (!window.confirm("Are you sure you want to delete this goal? This action cannot be undone.")) return;
        try {
            await axios.delete(`${BASE_URL}/goals/${id}`, { withCredentials: true });
            navigate('/app/goals');
        } catch (error) {
            console.error("Failed to delete goal", error);
            alert("Failed to delete goal. Please try again.");
        }
    };

    const handleArchiveGoal = async () => {
        try {
            const res = await axios.patch(`${BASE_URL}/goals/${id}/archive`, {}, { withCredentials: true });
            setGoal(res.data);
        } catch (error) {
            console.error("Failed to archive goal", error);
            alert("Failed to archive goal. Please try again.");
        }
    };

    const openEditModal = () => {
        setEditFormData({
            name: goal.name || '',
            description: goal.description || '',
            targetDate: goal.targetDate ? new Date(goal.targetDate).toISOString().split('T')[0] : '',
            priority: goal.priority || 'Low',
            category: goal.category || '',
            status: goal.status || 'Not Started',
            tags: goal.tags ? goal.tags.join(', ') : '',
            progress: goal.progress || 0,
            following: goal.following || false
        });
        setShowEditModal(true);
    };

    const handleEditGoal = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = editFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            const dataToSubmit = { ...editFormData, tags: tagsArray };

            const res = await axios.put(`${BASE_URL}/goals/${id}`, dataToSubmit, { withCredentials: true });
            setGoal(res.data);
            setShowEditModal(false);
        } catch (error) {
            console.error("Failed to edit goal", error);
            alert("Error updating goal. Please check the form data.");
        }
    };

    const toggleEditTag = (tag) => {
        let currentTags = editFormData.tags.split(',').map(t => t.trim()).filter(Boolean);
        if (currentTags.includes(tag)) {
            currentTags = currentTags.filter(t => t !== tag);
        } else {
            currentTags.push(tag);
        }
        setEditFormData({ ...editFormData, tags: currentTags.join(', ') });
    };

    const setQuickEditDate = (daysToAdd) => {
        const d = new Date();
        d.setDate(d.getDate() + daysToAdd);
        setEditFormData({ ...editFormData, targetDate: d.toISOString().split('T')[0] });
    };

    if (loading) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen p-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !goal) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen p-8 text-white flex justify-center mt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">{error || "Goal not found"}</h2>
                    <button onClick={() => navigate('/app/goals')} className="text-blue-500 hover:underline">
                        Return to Goals
                    </button>
                </div>
            </div>
        );
    }

    const statusColors = {
        "Completed": "bg-green-500/20 text-green-400 border-green-500/30",
        "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
        "On Track": "bg-teal-500/20 text-teal-400 border-teal-500/30",
        "At Risk": "bg-red-500/20 text-red-400 border-red-500/30",
        "Not Started": "bg-gray-500/20 text-gray-400 border-gray-500/30",
        "On Hold": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen p-8 text-white flex justify-center">
            <div className="max-w-5xl w-full">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/app/goals')}
                    className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Goals
                </button>

                {/* Header Card */}
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 mb-8 relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="absolute top-6 right-6 flex gap-3 z-20">
                        <button
                            onClick={openEditModal}
                            className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 hover:border-blue-500/40 rounded-xl text-sm font-medium transition-all duration-300 text-blue-400 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            Edit
                        </button>
                        <button
                            onClick={handleArchiveGoal}
                            className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] hover:border-[#555] rounded-xl text-sm font-medium transition-all duration-300 text-gray-300 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                            {goal.isArchived ? "Unarchive" : "Archive"}
                        </button>
                        <button
                            onClick={handleDeleteGoal}
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-xl text-sm font-medium transition-all duration-300 text-red-400 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            Delete
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10  pt-12 md:pt-0 mt-5">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[goal.status] || statusColors["Not Started"]}`}>
                                    {goal.status}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2a2a2a] text-gray-300">
                                    Priority: {goal.priority}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight mb-2">{goal.name}</h1>
                            <p className="text-gray-400 text-lg">{goal.description}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-gray-400 text-sm mb-1">Target Date</div>
                            <div className="text-xl font-medium">{goal.targetDate ? new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'None'}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Progress */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Progress Card */}
                        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Goal Progress</h2>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Milestones Progress</span>
                                <span className="font-bold text-blue-400">{goal.progress || 0}%</span>
                            </div>
                            <div className="w-full bg-[#2a2a2a] rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${goal.progress || 0}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-6 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                Discussion
                            </h2>

                            <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {comments.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No comments yet. Be the first to start the discussion!</p>
                                ) : (
                                    comments.map((comment, index) => {
                                        const isAuthor = currentUser && comment.byUser && comment.byUser._id === currentUser._id;
                                        const isGoalOwner = currentUser && goal.owner === currentUser._id;
                                        const canDelete = isAuthor || isGoalOwner;
                                        const isEditing = editingCommentId === comment._id;
                                        const displayUser = isAuthor ? currentUser : comment.byUser;

                                        // Aggregate reactions for display
                                        const reactionCounts = {};
                                        const userReactions = new Set();
                                        if (comment.reactions) {
                                            comment.reactions.forEach(r => {
                                                reactionCounts[r.emoji] = (reactionCounts[r.emoji] || 0) + 1;
                                                if (currentUser && r.byUser === currentUser._id) {
                                                    userReactions.add(r.emoji);
                                                }
                                            });
                                        }

                                        return (
                                            <div key={comment._id || index} className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center font-bold flex-shrink-0 overflow-hidden ring-2 ring-[#333]">
                                                    {displayUser?.photoUrl?.url && displayUser.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                                                        <img src={displayUser.photoUrl.url} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                                            {displayUser?.firstName ? displayUser.firstName.charAt(0).toUpperCase() : "U"}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 bg-[#1a1a1a] rounded-2xl rounded-tl-none p-4 border border-[#2a2a2a]">
                                                    <div className="flex justify-between items-baseline mb-2">
                                                        <span className="font-semibold text-sm">{displayUser ? `${displayUser.firstName} ${displayUser.lastName || ''}`.trim() : "User"}</span>
                                                        <span className="text-xs text-gray-500 flex items-center gap-2">
                                                            {formatCommentDate(comment.timestamp)}

                                                            {/* Actions Menu */}
                                                            <div className="flex gap-2 ml-2">
                                                                {isAuthor && !isEditing && (
                                                                    <button onClick={() => {
                                                                        setEditingCommentId(comment._id);
                                                                        setEditCommentText(comment.text);
                                                                    }} className="text-blue-400 hover:text-blue-300">Edit</button>
                                                                )}
                                                                {canDelete && (
                                                                    <button onClick={() => handleDeleteComment(comment._id)} className="text-red-400 hover:text-red-300">Delete</button>
                                                                )}
                                                            </div>
                                                        </span>
                                                    </div>

                                                    {isEditing ? (
                                                        <div className="mt-2">
                                                            <textarea
                                                                value={editCommentText}
                                                                onChange={(e) => setEditCommentText(e.target.value)}
                                                                className="w-full bg-[#121212] border border-[#333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm resize-none mb-2"
                                                                rows="2"
                                                            ></textarea>
                                                            <div className="flex gap-2">
                                                                <button onClick={() => handleEditCommentSubmit(comment._id)} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Save</button>
                                                                <button onClick={() => {
                                                                    setEditingCommentId(null);
                                                                    setEditCommentText('');
                                                                }} className="bg-[#2a2a2a] hover:bg-[#333] text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Cancel</button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <p className="text-gray-300 text-sm leading-relaxed mb-3">{comment.text}</p>

                                                            {/* Reactions */}
                                                            <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-[#2a2a2a]">
                                                                {["👍", "❤️", "🚀", "👀"].map(emoji => {
                                                                    const count = reactionCounts[emoji] || 0;
                                                                    const hasReacted = userReactions.has(emoji);
                                                                    return (
                                                                        <button
                                                                            key={emoji}
                                                                            onClick={() => handleReactionToggle(comment._id, emoji)}
                                                                            className={`px-2 py-1 rounded-full flex items-center gap-1 text-xs transition-colors ${hasReacted ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-[#2a2a2a] hover:bg-[#333] border border-transparent'}`}
                                                                        >
                                                                            <span>{emoji}</span>
                                                                            {count > 0 && <span className="text-gray-300">{count}</span>}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Add Comment */}
                            <form onSubmit={handleAddComment} className="mt-4 flex gap-3">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Metadata */}
                    <div className="space-y-6">
                        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4 border-b border-[#2a2a2a] pb-3">Info</h3>
                            <ul className="space-y-4">
                                <li>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Owner</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center text-xs overflow-hidden ring-1 ring-[#333]">
                                            {currentUser?.photoUrl?.url && currentUser.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                                                <img src={currentUser.photoUrl.url} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                                                    {currentUser?.firstName ? currentUser.firstName.charAt(0).toUpperCase() : "U"}
                                                </div>
                                            )}
                                        </div>
                                        <span className="font-medium text-sm text-gray-300">
                                            {currentUser ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim() : "User"}
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Category</span>
                                    <span className="font-medium text-sm">{goal.category}</span>
                                </li>
                                <li>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Following</span>
                                    <span className="font-medium text-sm">{goal.following ? 'Yes' : 'No'}</span>
                                </li>
                                <li>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Last Updated</span>
                                    <span className="font-medium text-sm">{goal.lastUpdated ? new Date(goal.lastUpdated).toLocaleDateString() : 'Never'}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4 border-b border-[#2a2a2a] pb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {goal.tags && goal.tags.length > 0 ? goal.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-[#1a1a1a] border border-[#333] px-3 py-1.5 rounded-lg text-xs text-gray-300">
                                        {tag}
                                    </span>
                                )) : (
                                    <span className="text-gray-500 text-sm">No tags added</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Goal Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-6 border-b border-[#2a2a2a] flex justify-between items-center bg-[#1a1a1a]">
                            <h3 className="text-xl font-bold text-white flex gap-1.5 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M4 11a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11zm8-9a1 1 0 0 1 .993.883L13 3v1a1 1 0 0 1-1.993.117L11 4V3a1 1 0 0 1 1-1m9 9a1 1 0 0 1 .117 1.993L21 13h-1a1 1 0 0 1-.117-1.993L20 11zM4.893 4.893a1 1 0 0 1 1.32-.083l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 0-1.414m12.8 0a1 1 0 0 1 1.497 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094zM14 18a1 1 0 0 1 1 1a3 3 0 0 1-6 0a1 1 0 0 1 .883-.993L10 18zM12 6a6 6 0 0 1 3.6 10.8a1 1 0 0 1-.471.192L15 17H9a1 1 0 0 1-.6-.2A6 6 0 0 1 12 6"></path>
                                </svg>
                                Edit Goal
                            </h3>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <form onSubmit={handleEditGoal} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">

                            {/* Name & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Goal Name *</label>
                                    <input required type="text" value={editFormData.name} onChange={e => setEditFormData({ ...editFormData, name: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Launch Beta Version" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Category *</label>
                                    <input required type="text" value={editFormData.category} onChange={e => setEditFormData({ ...editFormData, category: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Product" />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description *</label>
                                <textarea required rows="2" value={editFormData.description} onChange={e => setEditFormData({ ...editFormData, description: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="What does achieving this goal look like?"></textarea>
                            </div>

                            <hr className="border-[#2a2a2a]" />

                            {/* Interactive Date Chooser */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Target Date *</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input required type="date" value={editFormData.targetDate} onChange={e => setEditFormData({ ...editFormData, targetDate: e.target.value })} className="bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert w-full sm:w-auto" />
                                    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                                        <button type="button" onClick={() => setQuickEditDate(0)} className="whitespace-nowrap px-3 py-2 rounded-lg text-sm bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white transition-colors border border-[#333]">Today</button>
                                        <button type="button" onClick={() => setQuickEditDate(1)} className="whitespace-nowrap px-3 py-2 rounded-lg text-sm bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white transition-colors border border-[#333]">Tomorrow</button>
                                        <button type="button" onClick={() => setQuickEditDate(7)} className="whitespace-nowrap px-3 py-2 rounded-lg text-sm bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white transition-colors border border-[#333]">Next Week</button>
                                        <button type="button" onClick={() => setQuickEditDate(30)} className="whitespace-nowrap px-3 py-2 rounded-lg text-sm bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white transition-colors border border-[#333]">Next Month</button>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Priority Chooser */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Priority</label>
                                <div className="flex flex-wrap gap-2">
                                    {priorities.map(p => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setEditFormData({ ...editFormData, priority: p })}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${editFormData.priority === p
                                                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                                                : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:bg-[#222] hover:border-[#444]'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Interactive Status Chooser */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                                <div className="flex flex-wrap gap-2">
                                    {statuses.map(s => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setEditFormData({ ...editFormData, status: s })}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${editFormData.status === s
                                                ? `${statusColors[s]} shadow-lg`
                                                : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:bg-[#222] hover:border-[#444]'
                                                }`}
                                        >
                                            <span className={`w-2 h-2 rounded-full ${statusColors[s]?.split(' ')[0]}`}></span>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Progress Slider */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Progress: {editFormData.progress}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={editFormData.progress}
                                    onChange={e => setEditFormData({ ...editFormData, progress: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>

                            {/* Interactive Tags Chooser */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {popularTags.map(t => {
                                        const currentTagsArray = editFormData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
                                        const isSelected = currentTagsArray.includes(t);
                                        return (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => toggleEditTag(t)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${isSelected
                                                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                                                    : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:bg-[#222] hover:border-[#555]'
                                                    }`}
                                            >
                                                {isSelected ? '✓ ' : '+ '}{t}
                                            </button>
                                        );
                                    })}
                                </div>
                                <input
                                    type="text"
                                    value={editFormData.tags}
                                    onChange={e => setEditFormData({ ...editFormData, tags: e.target.value })}
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Or type custom tags (comma separated)..."
                                />
                            </div>

                            {/* Following Checkbox */}
                            <div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editFormData.following}
                                        onChange={e => setEditFormData({ ...editFormData, following: e.target.checked })}
                                        className="w-5 h-5 bg-[#1a1a1a] border-[#333] rounded focus:ring-blue-500 accent-blue-600 cursor-pointer"
                                    />
                                    <span className="text-sm font-medium text-gray-400 select-none">Follow this goal (Receive notifications/updates)</span>
                                </label>
                            </div>

                            <div className="pt-4 border-t border-[#2a2a2a] flex justify-end gap-3">
                                <button type="button" onClick={() => setShowEditModal(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
        </div>
    );
};

export default GoalDetail;
