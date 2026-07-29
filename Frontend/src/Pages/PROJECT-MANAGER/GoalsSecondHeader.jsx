import React from 'react'

const GoalsSecondHeader = ({ selectedStatus, setSelectedStatus, selectedPriority, setSelectedPriority }) => {
    const statuses = ["All", "Completed", "In Progress", "On Track", "At Risk", "Not Started", "On Hold"];
    const priorities = ["All", "Critical", "High", "Medium", "Low"];

    const statusColors = {
        "Completed": "bg-green-500/10 text-green-400 border-green-500/20",
        "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "On Track": "bg-teal-500/10 text-teal-400 border-teal-500/20",
        "At Risk": "bg-red-500/10 text-red-400 border-red-500/20",
        "Not Started": "bg-gray-500/10 text-gray-400 border-gray-500/20",
        "On Hold": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    };

    return (
        <div className='flex flex-col gap-4 py-2 w-full'>
            <div className='flex items-center gap-4 overflow-x-auto custom-scrollbar pb-2 w-full'>
                <span className='text-gray-400 text-sm font-poppins shrink-0 font-medium uppercase tracking-wider'>Status:</span>
                <div className="flex items-center gap-2">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-sm font-poppins font-medium transition-all duration-300 border flex items-center gap-2 ${selectedStatus === status
                                ? (status === 'All' ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : `${statusColors[status]} shadow-[0_0_10px_rgba(255,255,255,0.05)]`)
                                : 'bg-[#1a1a1a] border-[#3a3a3a] text-gray-400 hover:bg-[#222] hover:border-[#5a5a5a]'
                                }`}
                        >
                            {status !== 'All' && <span className={`w-2 h-2 rounded-full ${status === 'In Progress' ? 'bg-blue-500' : status === 'Completed' ? 'bg-green-500' : status === 'On Track' ? 'bg-teal-500' : status === 'At Risk' ? 'bg-red-500' : status === 'Not Started' ? 'bg-gray-500' : status === 'On Hold' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>}
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex items-center gap-4 overflow-x-auto custom-scrollbar pb-2 w-full'>
                <span className='text-gray-400 text-sm font-poppins shrink-0 font-medium uppercase tracking-wider'>Priority:</span>
                <div className="flex items-center gap-2">
                    {priorities.map(priority => (
                        <button
                            key={priority}
                            onClick={() => setSelectedPriority(priority)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-sm font-poppins font-medium transition-all duration-300 border ${selectedPriority === priority
                                ? (priority === 'All' ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]')
                                : 'bg-[#1a1a1a] border-[#3a3a3a] text-gray-400 hover:bg-[#222] hover:border-[#5a5a5a]'
                                }`}
                        >
                            {priority}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GoalsSecondHeader