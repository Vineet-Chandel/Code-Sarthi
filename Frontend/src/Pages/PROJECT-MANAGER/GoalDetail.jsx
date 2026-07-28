import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { goalsData } from './data/goalsData';

const GoalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const foundGoal = goalsData.find((g) => g.id === parseInt(id));
        if (foundGoal) {
            setGoal(foundGoal);
            setComments(foundGoal.comments || []);
        }
    }, [id]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        const commentObj = {
            id: comments.length + 1,
            user: "Vineet Chandel", // Logged in user mock
            text: newComment,
            timestamp: new Date().toISOString()
        };
        
        setComments([...comments, commentObj]);
        setNewComment('');
    };

    if (!goal) {
        return <div className="text-white text-center mt-20">Loading...</div>;
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
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
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
                            <div className="text-xl font-medium">{new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
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
                                <span className="text-gray-400">Milestones: {goal.completedMilestones} / {goal.milestones}</span>
                                <span className="font-bold text-blue-400">{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-[#2a2a2a] rounded-full h-3 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                                    style={{ width: `${goal.progress}%` }}
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
                                    comments.map(comment => (
                                        <div key={comment.id} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold flex-shrink-0">
                                                {comment.user.charAt(0)}
                                            </div>
                                            <div className="flex-1 bg-[#1a1a1a] rounded-2xl rounded-tl-none p-4 border border-[#2a2a2a]">
                                                <div className="flex justify-between items-baseline mb-2">
                                                    <span className="font-semibold text-sm">{comment.user}</span>
                                                    <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                                                </div>
                                                <p className="text-gray-300 text-sm leading-relaxed">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))
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
                                        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                                            {goal.owner.charAt(0)}
                                        </div>
                                        <span className="font-medium text-sm">{goal.owner}</span>
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
                                    <span className="font-medium text-sm">{new Date(goal.lastUpdated).toLocaleDateString()}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4 border-b border-[#2a2a2a] pb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {goal.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-[#1a1a1a] border border-[#333] px-3 py-1.5 rounded-lg text-xs text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
