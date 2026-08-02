import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleModal from './ScheduleModal';
import axios from 'axios';
import BASE_URL from '../../Pages/auth/baseURL';

const SchedulerCalendar = ({ 
    schedules, 
    goals, 
    onScheduleAdded, 
    onScheduleUpdated, 
    onScheduleDeleted, 
    onGoalCreated, 
    embedded = false, 
    initialDate = null, 
    initialOpenModal = false 
}) => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(initialDate || new Date());
    const [isModalOpen, setIsModalOpen] = useState(initialOpenModal);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [selectedDateForNew, setSelectedDateForNew] = useState(initialDate);

    // Embedded popover state for inspecting day tasks
    const [dayPopoverData, setDayPopoverData] = useState(null);

    // React when redirected to standalone Scheduler with openModal set to true
    useEffect(() => {
        if (initialOpenModal && initialDate && !embedded) {
            setCurrentDate(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
            setSelectedDateForNew(initialDate);
            setEditingSchedule(null);
            setIsModalOpen(true);
        }
    }, [initialOpenModal, initialDate, embedded]);

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Clear navigation state after closing so a manual page refresh doesn't reopen the modal
        if (initialOpenModal && !embedded) {
            navigate('/app/scheduler', { replace: true, state: {} });
        }
    };

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

    const handleDayClick = (day, daySchedules, dayGoals) => {
        const date = new Date(year, month, day);
        if (embedded) {
            setDayPopoverData({
                date,
                dayNumber: day,
                monthName: monthNames[month],
                year,
                schedules: daySchedules,
                goals: dayGoals
            });
            return;
        }
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
            const res = await axios.patch(`${BASE_URL}/schedules/${schedule._id}`, { status: newStatus }, { withCredentials: true });
            if (onScheduleUpdated) onScheduleUpdated(res.data);
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const daysInMonthArray = [];
    const blanks = [];

    for (let i = 0; i < firstDay; i++) {
        blanks.push(<div key={`blank-${i}`} className={`min-h-[70px] ${embedded ? 'border border-white/[0.02]' : 'border border-[#111]'} rounded-xl bg-black opacity-30 pointer-events-none`}></div>);
    }

    const todayObj = new Date();
    const isThisMonth = todayObj.getMonth() === month && todayObj.getFullYear() === year;

    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = isThisMonth && todayObj.getDate() === d;
        
        // Find schedules for this day
        const daySchedules = (schedules || []).filter(s => {
            if (!s.startTime) return false;
            const sDate = new Date(s.startTime);
            return sDate.getDate() === d && sDate.getMonth() === month && sDate.getFullYear() === year;
        });

        // Find goals for this day
        const dayGoals = (goals || []).filter(g => {
            const tDate = g.targetDate || g.dueDate;
            if (!tDate) return false;
            const gDate = new Date(tDate);
            return gDate.getDate() === d && gDate.getMonth() === month && gDate.getFullYear() === year;
        });

        if (embedded) {
            daysInMonthArray.push(
                <div
                    key={d}
                    onClick={() => handleDayClick(d, daySchedules, dayGoals)}
                    className={`min-h-[85px] border border-white/[0.06] rounded-xl p-2 cursor-pointer transition-all duration-200 hover:border-white/25 flex flex-col group relative ${isToday ? 'bg-white/[0.05] border-white/30' : 'bg-[#000000]'}`}
                >
                    <div className="flex justify-between items-start mb-1">
                        <span className={`text-xs font-semibold ${isToday ? 'text-white font-black underline underline-offset-4' : 'text-zinc-500 group-hover:text-zinc-200'}`}>
                            {d}
                        </span>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate('/app/scheduler', { state: { targetDate: new Date(year, month, d).toISOString(), openModal: true } });
                            }}
                            title="Open scheduler to add task for this day"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white p-0.5 rounded"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </button>
                    </div>

                    <div className="flex flex-col gap-1 overflow-y-auto scrollbar-none flex-1 mt-1">
                        {dayGoals.map(goal => (
                            <div key={goal._id || Math.random()} className="flex items-center gap-1.5 text-[10px] text-zinc-300 truncate">
                                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                                <span className="truncate">{goal.name || goal.title || "Goal"}</span>
                            </div>
                        ))}
                        {daySchedules.map(schedule => (
                            <div key={schedule._id || Math.random()} className="flex items-center gap-1.5 text-[10px] text-zinc-400 truncate">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
                                <span className="truncate">{schedule.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            daysInMonthArray.push(
                <div
                    key={d}
                    onClick={() => handleDayClick(d, daySchedules, dayGoals)}
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

                    <div className="flex flex-col gap-1.5 overflow-y-auto scrollbar-none flex-1 pb-1">
                        {dayGoals.map(goal => (
                            <div key={goal._id} className="text-xs px-2 py-1.5 rounded-md border bg-zinc-800/50 border-zinc-700 text-zinc-300 truncate">
                                <span className="truncate font-semibold">• {goal.name || goal.title}</span>
                            </div>
                        ))}
                        {daySchedules.map(schedule => {
                            const isCompleted = schedule.status === 'Completed';
                            const isMissed = schedule.status === 'Missed';
                            let bgColor = 'bg-gray-800/50 border-gray-700 hover:border-gray-500 text-gray-300';
                            if (isCompleted) bgColor = 'bg-green-500/10 border-green-500/30 text-green-400';
                            else if (isMissed) bgColor = 'bg-red-500/10 border-red-500/30 text-red-400';
                            else bgColor = 'bg-blue-500/10 border-blue-500/30 text-blue-400';
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
    }

    return (
        <div className="w-full h-full flex flex-col font-sans text-white relative">
            {/* Toolbar */}
            <div className={`flex justify-between items-center ${embedded ? 'mb-3' : 'mb-6'}`}>
                <div className="flex items-center gap-2">
                    <span className={`font-bold ${embedded ? 'text-base text-white' : 'text-xl text-white'}`}>
                        {monthNames[month]} {year}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleToday}
                        className="px-3 py-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg text-xs text-zinc-300 font-medium transition-colors"
                    >
                        Today
                    </button>
                    <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-lg overflow-hidden">
                        <button onClick={handlePrevMonth} className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <button onClick={handleNextMonth} className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border-l border-white/10">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                    {embedded ? (
                        <button
                            onClick={() => navigate('/app/scheduler', { state: { targetDate: new Date().toISOString(), openModal: true } })}
                            className="bg-white text-black hover:bg-zinc-200 px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 text-xs ml-1 shadow-sm"
                        >
                            <span>+ Add Task</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => { setEditingSchedule(null); setSelectedDateForNew(new Date()); setIsModalOpen(true); }}
                            className="bg-white text-black hover:bg-zinc-200 px-4 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-2 text-xs ml-2"
                        >
                            + Add Schedule
                        </button>
                    )}
                </div>
            </div>

            {/* Calendar Grid Header */}
            <div className="grid grid-cols-7 gap-1.5 mb-1.5">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-[10px] font-bold text-zinc-500 uppercase tracking-wider py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid Body */}
            <div className="grid grid-cols-7 gap-1.5 flex-1 overflow-y-auto scrollbar-none pr-0.5">
                {blanks}
                {daysInMonthArray}
            </div>

            {/* Inline Day Popover for Embedded Mode */}
            {dayPopoverData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
                    <div className="bg-[#000000] border border-white/15 rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <div>
                                <h3 className="text-sm font-bold text-white">
                                    {dayPopoverData.monthName} {dayPopoverData.dayNumber}, {dayPopoverData.year}
                                </h3>
                                <p className="text-xs text-zinc-500">Scheduled focus & goals</p>
                            </div>
                            <button 
                                onClick={() => setDayPopoverData(null)}
                                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* List of existing due items */}
                        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-none pr-1">
                            {(!dayPopoverData.goals?.length && !dayPopoverData.schedules?.length) ? (
                                <p className="text-xs text-zinc-500 italic py-2 text-center">No goals or tasks due on this day.</p>
                            ) : (
                                <>
                                    {dayPopoverData.goals?.map((g, idx) => (
                                        <div key={g._id || idx} className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2 text-xs">
                                            <div className="flex items-center gap-2 truncate">
                                                <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                                                <span className="text-white font-medium truncate">{g.name || g.title || "Goal"}</span>
                                            </div>
                                            <span className="text-[10px] text-zinc-500 font-semibold">{g.priority || 'Medium'}</span>
                                        </div>
                                    ))}
                                    {dayPopoverData.schedules?.map((s, idx) => (
                                        <div key={s._id || idx} className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2 text-xs">
                                            <div className="flex items-center gap-2 truncate">
                                                <span className="w-2 h-2 rounded-full bg-zinc-500 shrink-0" />
                                                <span className="text-zinc-300 font-medium truncate">{s.title}</span>
                                            </div>
                                            <span className="text-[10px] text-zinc-500">
                                                {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        {/* Button to redirect to Scheduler Page with Day Modal Opened */}
                        <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    setDayPopoverData(null);
                                    navigate('/app/scheduler', { state: { targetDate: dayPopoverData.date.toISOString(), openModal: true } });
                                }}
                                className="w-full bg-white text-black font-bold py-2.5 rounded-xl text-xs hover:bg-zinc-200 transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                <span>Add Task / Goal for this Day</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Standalone Modal */}
            {isModalOpen && !embedded && (
                <ScheduleModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
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
