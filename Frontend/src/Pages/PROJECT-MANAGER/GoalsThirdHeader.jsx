import React from 'react'
import { LayoutGrid, List } from 'lucide-react'

const GoalsThirdHeader = ({ count, viewMode = 'grid', setViewMode }) => {
    return (
        <div className='flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-3 my-4 bg-[#0a0a0a] border border-[#212121] rounded-2xl px-4 sm:px-6 py-3.5 transition-all'>
            <div className='flex items-center justify-between sm:justify-start gap-3'>
                <div className='flex items-center gap-2.5'>
                    <span className='w-2.5 h-2.5 rounded-full bg-white animate-pulse'></span>
                    <span className='text-base sm:text-lg font-poppins font-bold text-white tracking-wide flex items-center gap-2'>
                        Active Goals
                    </span>
                </div>
                <span className='bg-[#212121] text-white border border-zinc-700/60 font-mono text-xs font-bold px-3 py-1 rounded-full'>
                    {count} Total
                </span>
            </div>

            {/* View Mode Toggle Switcher */}
            <div className='flex items-center gap-1 bg-black border border-[#212121] p-1 rounded-xl w-full sm:w-auto'>
                <button
                    onClick={() => setViewMode && setViewMode('grid')}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-poppins font-medium transition-all duration-200 ${
                        viewMode === 'grid'
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'text-zinc-400 hover:text-white hover:bg-[#212121]'
                    }`}
                >
                    <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                    <span>Grid <span className="hidden sm:inline">View</span></span>
                </button>
                <button
                    onClick={() => setViewMode && setViewMode('list')}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-poppins font-medium transition-all duration-200 ${
                        viewMode === 'list'
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'text-zinc-400 hover:text-white hover:bg-[#212121]'
                    }`}
                >
                    <List className="w-3.5 h-3.5 shrink-0" />
                    <span>List <span className="hidden sm:inline">View</span></span>
                </button>
            </div>
        </div>
    )
}

export default GoalsThirdHeader