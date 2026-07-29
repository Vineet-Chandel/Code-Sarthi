import React, { useState } from 'react';
import ScheduleModal from './ScheduleModal';
import axios from 'axios';
import BASE_URL from '../../Pages/auth/baseURL';

const SchedulerCalendar = ({ schedules, goals, onScheduleAdded, onScheduleUpdated, onScheduleDeleted }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [selectedDateForNew, setSelectedDateForNew] = useState(null);

    // Get days in current month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Get the day of the week the month starts on (0 = Sunday, 1 = Monday, etc.)
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleDayClick = (day) => {
        const date = new Date(year, month, day);
        setSelectedDateForNew(date);
        setEditingSchedule(null);
        setIsModalOpen(true);
    };

    const handleScheduleClick = (e, schedule) => {
        e.stopPropagation();
        setEditingSchedule(schedule);
        setSelectedDateForNew(null);
        setIsModalOpen(true);
    };

    const toggleScheduleStatus = async (e, schedule) => {
        e.stopPropagation();
        const newStatus = schedule.status === 'Completed' ? 'Scheduled' : 'Completed';
        try {
            const res = await axios.patch(`${BASE_URL}/api/schedules/${schedule._id}`, { status: newStatus }, { withCredentials: true });
            onScheduleUpdated(res.data);
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    // Generate blank cells for days before the 1st of the month
    const blanks = [];
    for (let i = 0; i < firstDay; i++) {
        blanks.push(<div key={`blank-${i}`} className="min-h-[120px] bg-[#0a0a0a] border border-[#222] rounded-xl opacity-50"></div>);
    }

    // Generate cells for the days of the month
    const daysInMonthArray = [];
    for (let d = 1; d <= daysInMonth; d++) {
        const currentIterDate = new Date(year, month, d);
        const isToday = currentIterDate.toDateString() === new Date().toDateString();
        
        // Find schedules for this day
        const daySchedules = schedules.filter(s => {
            const sDate = new Date(s.startTime);
            return sDate.getDate() === d && sDate.getMonth() === month && sDate.getFullYear() === year;
        });

        daysInMonthArray.push(
            <div 
                key={d} 
                onClick={() => handleDayClick(d)}
                className={`min-h-[140px] border border-[#222] rounded-xl p-2 cursor-pointer transition-all duration-300 hover:border-blue-500/50 hover:bg-[#151515] group relative flex flex-col ${isToday ? 'bg-[#1a1a2e] border-blue-900/50 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]' : 'bg-[#121212]'}`}
            >
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'text-gray-400 group-hover:text-white'}`}>
                        {d}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded p-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </button>
                </div>
                
                <div className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar flex-1 pb-1">
                    {daySchedules.map(schedule => {
                        const isCompleted = schedule.status === 'Completed';
                        const isMissed = schedule.status === 'Missed';
                        let bgColor = 'bg-gray-800/50 border-gray-700 hover:border-gray-500 text-gray-300';
                        
                        if (isCompleted) bgColor = 'bg-green-500/10 border-green-500/30 hover:border-green-500/60 text-green-400';
                        else if (isMissed) bgColor = 'bg-red-500/10 border-red-500/30 hover:border-red-500/60 text-red-400';
                        else bgColor = 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500/60 text-blue-400'; // Scheduled
                        
                        const timeString = new Date(schedule.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        return (
                            <div 
                                key={schedule._id} 
                                onClick={(e) => handleScheduleClick(e, schedule)}
                                className={`text-xs px-2 py-1.5 rounded-md border ${bgColor} truncate transition-all duration-200 group/item relative`}
                            >
                                <div className="flex items-center gap-1.5 font-medium mb-0.5">
                                    <button 
                                        onClick={(e) => toggleScheduleStatus(e, schedule)}
                                        className={`w-3 h-3 rounded-full shrink-0 border flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500 border-green-400' : 'border-current hover:bg-current hover:bg-opacity-20'}`}
                                    >
                                        {isCompleted && <svg className="w-2 h-2 text-[#121212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>}
                                    </button>
                                    <span className="truncate">{schedule.title}</span>
                                </div>
                                <div className="text-[10px] opacity-70 ml-4.5">{timeString}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col font-poppins">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleToday}
                        className="px-4 py-1.5 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] hover:border-[#555] rounded-lg text-sm text-gray-300 font-medium transition-colors"
                    >
                        Today
                    </button>
                    <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-[#2a2a2a] text-gray-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <div className="px-4 py-1.5 text-white font-medium border-x border-[#333] min-w-[150px] text-center">
                            {monthNames[month]} {year}
                        </div>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-[#2a2a2a] text-gray-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
                
                <button 
                    onClick={() => { setEditingSchedule(null); setSelectedDateForNew(new Date()); setIsModalOpen(true); }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add Schedule
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-3 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider py-2">
                        {day}
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 gap-3 flex-1">
                {blanks}
                {daysInMonthArray}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <ScheduleModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    scheduleToEdit={editingSchedule}
                    initialDate={selectedDateForNew}
                    goals={goals}
                    onScheduleAdded={onScheduleAdded}
                    onScheduleUpdated={onScheduleUpdated}
                    onScheduleDeleted={onScheduleDeleted}
                />
            )}
        </div>
    );
};

export default SchedulerCalendar;
