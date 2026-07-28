import React from 'react'
import { useNavigate } from 'react-router-dom'
import { goalsData } from './data/goalsData'

const ShowingGoals = () => {
    const navigate = useNavigate();

    const statusColors = {
        "Completed": "bg-green-500/10 text-green-400 border-green-500/20",
        "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "On Track": "bg-teal-500/10 text-teal-400 border-teal-500/20",
        "At Risk": "bg-red-500/10 text-red-400 border-red-500/20",
        "Not Started": "bg-gray-500/10 text-gray-400 border-gray-500/20",
        "On Hold": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    };

    return (
        <div className="w-full mt-6">
            {goalsData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <p>No goals found. Time to set some!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                    {goalsData.map((goal) => (
                        <div 
                            key={goal.id} 
                            onClick={() => navigate(`/app/goals/${goal.id}`)}
                            className="group relative bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 cursor-pointer overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] hover:-translate-y-1"
                        >
                            {/* Glassmorphism gradient effect on hover */}
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
                                        <span className="font-medium text-gray-300">{goal.progress}%</span>
                                    </div>
                                    <div className="w-full bg-[#222] rounded-full h-1.5 overflow-hidden mb-4">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full" 
                                            style={{ width: `${goal.progress}%` }}
                                        ></div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center pt-4 border-t border-[#2a2a2a]">
                                        <div className="flex gap-2">
                                            {goal.tags.slice(0, 2).map((tag, idx) => (
                                                <span key={idx} className="text-[10px] uppercase tracking-wider text-gray-400 bg-[#1a1a1a] px-2 py-1 rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                            {goal.tags.length > 2 && (
                                                <span className="text-[10px] text-gray-500 px-1 py-1">+{goal.tags.length - 2}</span>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            {new Date(goal.targetDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ShowingGoals