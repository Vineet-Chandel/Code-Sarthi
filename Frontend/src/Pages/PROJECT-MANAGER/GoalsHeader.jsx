import React from 'react'
import { Search, X } from 'lucide-react'

const GoalsHeader = ({ searchQuery, setSearchQuery, primaryFilter, setPrimaryFilter }) => {
    const data1 = [
        { id: 1, title: "All Goals" },
        { id: 2, title: "My Goals" },
        { id: 3, title: "Archived" }
    ]

    return (
        <div className='w-full'>
            <nav className='flex flex-wrap items-center justify-between gap-4'>
                <div className='flex flex-wrap items-center gap-6'>
                    <h1 className='text-3xl font-poppins font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight'>
                        Goals Studio
                    </h1>
                    <ul className='flex items-center gap-1 bg-[#0a0a0a] border border-[#212121] p-1 rounded-xl'>
                        {data1.map((item, idx) => (
                            <li 
                                onClick={() => setPrimaryFilter(item.title)} 
                                key={idx} 
                                className={`cursor-pointer font-poppins text-xs font-medium px-4 py-1.5 rounded-lg transition-all duration-200 ${
                                    primaryFilter === item.title 
                                        ? "bg-white text-black font-bold shadow-sm" 
                                        : "text-zinc-400 hover:text-white hover:bg-[#212121]"
                                }`}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Modern search box */}
                <div className='flex items-center gap-3 bg-[#0a0a0a] border border-[#212121] hover:border-zinc-700 focus-within:border-white focus-within:bg-[#121212] rounded-xl px-4 py-2.5 transition-all duration-200 min-w-[280px] w-full sm:w-auto'>
                    <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='bg-transparent text-white text-sm border-none focus:outline-none w-full placeholder-zinc-500 font-poppins' 
                        type="text" 
                        placeholder='Search goals by title or details...' 
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="text-zinc-400 hover:text-white bg-[#212121] hover:bg-zinc-700 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default GoalsHeader