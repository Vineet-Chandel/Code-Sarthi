import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../Pages/auth/baseURL';

const ShowingGoals = ({ goals, loading, onGoalAdded }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // Modal Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        targetDate: '',
        priority: 'Low',
        category: '',
        status: 'Not Started',
        tags: ''
    });

    const statusColors = {
        "Completed": "bg-green-500/10 text-green-400 border-green-500/20",
        "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "On Track": "bg-teal-500/10 text-teal-400 border-teal-500/20",
        "At Risk": "bg-red-500/10 text-red-400 border-red-500/20",
        "Not Started": "bg-gray-500/10 text-gray-400 border-gray-500/20",
        "On Hold": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    };

    const priorities = ["Low", "Medium", "High", "Critical"];
    const statuses = ["Not Started", "In Progress", "On Track", "At Risk", "On Hold", "Completed"];
    const popularTags = ["Frontend", "Backend", "Design", "DevOps", "Marketing", "Bug", "Feature"];

    const handleCreateGoal = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            const dataToSubmit = { ...formData, tags: tagsArray };

            const res = await axios.post(`${BASE_URL}/api/goals`, dataToSubmit, { withCredentials: true });
            onGoalAdded(res.data);
            setShowModal(false);
            setFormData({ name: '', description: '', targetDate: '', priority: 'Low', category: '', status: 'Not Started', tags: '' });
        } catch (error) {
            console.error("Failed to create goal", error);
            alert("Error creating goal. Please check the form data.");
        }
    };

    const toggleTag = (tag) => {
        let currentTags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
        if (currentTags.includes(tag)) {
            currentTags = currentTags.filter(t => t !== tag);
        } else {
            currentTags.push(tag);
        }
        setFormData({ ...formData, tags: currentTags.join(', ') });
    };

    const setQuickDate = (daysToAdd) => {
        const d = new Date();
        d.setDate(d.getDate() + daysToAdd);
        setFormData({ ...formData, targetDate: d.toISOString().split('T')[0] });
    };

    return (
        <div className="w-full mt-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Your Goals</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    New Goal
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : goals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <p>No goals found. Time to set some!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                    {goals.map((goal) => (
                        <div
                            key={goal._id}
                            onClick={() => navigate(`/app/goals/${goal._id}`)}
                            className="group relative bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 cursor-pointer overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[goal.status] || statusColors["Not Started"]}`}>
                                        {goal.status}
                                    </span>
                                    {goal.priority === 'Critical' && (
                                        <span className="flex h-3 w-3 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                                    {goal.name}
                                </h3>

                                <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-1">
                                    {goal.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                                        <span>Progress</span>
                                        <span className="font-medium text-gray-300">{goal.progress || 0}%</span>
                                    </div>
                                    <div className="w-full bg-[#222] rounded-full h-1.5 overflow-hidden mb-4">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
                                            style={{ width: `${goal.progress || 0}%` }}
                                        ></div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-[#2a2a2a]">
                                        <div className="flex gap-2">
                                            {goal.tags && goal.tags.slice(0, 2).map((tag, idx) => (
                                                <span key={idx} className="text-[10px] uppercase tracking-wider text-gray-400 bg-[#1a1a1a] px-2 py-1 rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                            {goal.tags && goal.tags.length > 2 && (
                                                <span className="text-[10px] text-gray-500 px-1 py-1">+{goal.tags.length - 2}</span>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'No date'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Goal Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-6 border-b border-[#2a2a2a] flex justify-between items-center bg-[#1a1a1a]">
                            <h3 className="text-xl font-bold text-white flex gap-1.5 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M4 11a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11zm8-9a1 1 0 0 1 .993.883L13 3v1a1 1 0 0 1-1.993.117L11 4V3a1 1 0 0 1 1-1m9 9a1 1 0 0 1 .117 1.993L21 13h-1a1 1 0 0 1-.117-1.993L20 11zM4.893 4.893a1 1 0 0 1 1.32-.083l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 0-1.414m12.8 0a1 1 0 0 1 1.497 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094zM14 18a1 1 0 0 1 1 1a3 3 0 0 1-6 0a1 1 0 0 1 .883-.993L10 18zM12 6a6 6 0 0 1 3.6 10.8a1 1 0 0 1-.471.192L15 17H9a1 1 0 0 1-.6-.2A6 6 0 0 1 12 6"></path>
                                </svg>

                                Create New Goal</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <form onSubmit={handleCreateGoal} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">

                            {/* Name & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Goal Name *</label>
                                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Launch Beta Version" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Category *</label>
                                    <input required type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Product" />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description *</label>
                                <textarea required rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="What does achieving this goal look like?"></textarea>
                            </div>

                            <hr className="border-[#2a2a2a]" />

                            {/* Interactive Date Chooser */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Target Date *</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input required type="date" value={formData.targetDate} onChange={e => setFormData({ ...formData, targetDate: e.target.value })} className="bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert w-full sm:w-auto" />
                                    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                                        <button type="button" onClick={() => setQuickDate(0)} className="whitespace-nowrap px-3 py-2 rounded-lg text-sm bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white transition-colors border border-[#333]">Today</button>
                                        <button type="button" onClick={() => setQuickDate(1)} className="whitespace-nowrap px-3 py-2 rounded-lg text-sm bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white transition-colors border border-[#333]">Tomorrow</button>
                                        <button type="button" onClick={() => setQuickDate(7)} className="whitespace-nowrap px-3 py-2 rounded-lg text-sm bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white transition-colors border border-[#333]">Next Week</button>
                                        <button type="button" onClick={() => setQuickDate(30)} className="whitespace-nowrap px-3 py-2 rounded-lg text-sm bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white transition-colors border border-[#333]">Next Month</button>
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
                                            onClick={() => setFormData({ ...formData, priority: p })}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${formData.priority === p
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
                                            onClick={() => setFormData({ ...formData, status: s })}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${formData.status === s
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

                            {/* Interactive Tags Chooser */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {popularTags.map(t => {
                                        const currentTagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
                                        const isSelected = currentTagsArray.includes(t);
                                        return (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => toggleTag(t)}
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
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Or type custom tags (comma separated)..."
                                />
                            </div>

                            <div className="pt-4 border-t border-[#2a2a2a] flex justify-end gap-3">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20">
                                    Create Goal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowingGoals