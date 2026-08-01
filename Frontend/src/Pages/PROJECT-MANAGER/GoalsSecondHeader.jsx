import React from 'react'

const GoalsSecondHeader = ({ selectedStatus, setSelectedStatus, selectedPriority, setSelectedPriority }) => {
    const statuses = ["All", "Completed", "In Progress", "On Track", "At Risk", "Not Started", "On Hold"];
    const priorities = ["All", "Critical", "High", "Medium", "Low"];

    const statusColors = {
        "Completed": "bg-green-500/20 text-green-400",
        "In Progress": "bg-blue-500/20 text-blue-400",
        "On Track": "bg-teal-500/20 text-teal-400",
        "At Risk": "bg-red-500/20 text-red-400",
        "Not Started": "bg-gray-500/20 text-gray-300",
        "On Hold": "bg-yellow-500/20 text-yellow-400"
    };

    const dotColors = {
        "Completed": "bg-green-400",
        "In Progress": "bg-blue-400",
        "On Track": "bg-teal-400",
        "At Risk": "bg-red-500 animate-pulse",
        "Not Started": "bg-gray-400",
        "On Hold": "bg-yellow-400"
    };

    return (
        <div className='hidden lg:flex flex-col gap-3 py-1 w-full font-poppins'>
            {/* Status filters */}
            <div className='flex items-center gap-4 overflow-x-auto custom-scrollbar pb-1 w-full'>
                <span className='text-gray-400 text-xs shrink-0 font-bold uppercase tracking-widest min-w-[70px]'>Status:</span>
                <div className="flex items-center gap-2">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${selectedStatus === status
                                ? (status === 'All' ? 'bg-white text-black font-bold' : `${statusColors[status]} font-bold`)
                                : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-gray-200'
                                }`}
                        >
                            {status !== 'All' && (
                                <span className={`w-2 h-2 rounded-full ${dotColors[status] || 'bg-blue-500'}`}></span>
                            )}
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Priority filters */}
            <div className='flex items-center gap-4 overflow-x-auto custom-scrollbar pb-1 w-full'>
                <span className='text-gray-400 text-xs shrink-0 font-bold uppercase tracking-widest min-w-[70px]'>Priority:</span>
                <div className="flex items-center gap-2">
                    {priorities.map(priority => (
                        <button
                            key={priority}
                            onClick={() => setSelectedPriority(priority)}
                            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${selectedPriority === priority
                                ? (priority === 'All' ? 'bg-white text-black font-bold' : 'bg-blue-600 text-white font-bold')
                                : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-gray-200'
                                }`}
                        >
                            {priority === 'Critical' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping mr-1"></span>}
                            {priority}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GoalsSecondHeader