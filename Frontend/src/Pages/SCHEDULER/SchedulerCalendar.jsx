import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleModal from './ScheduleModal';
import axios from 'axios';
import BASE_URL from '../../Pages/auth/baseURL';

const SchedulerCalendar = ({ 
    schedules = [], 
    goals = [], 
    onScheduleAdded, 
    onScheduleUpdated, 
    onScheduleDeleted, 
    onGoalCreated, 
    onGoalUpdated,
    onGoalDeleted,
    onSyncState,
    embedded = false, 
    initialDate = null, 
    initialOpenModal = false,
    currentDate: propCurrentDate,
    setCurrentDate: propSetCurrentDate,
    viewDensity: propViewDensity = 'month',
    setViewDensity: propSetViewDensity,
    highlightedGoalId = null
}) => {
    const navigate = useNavigate();
    
    // Fallback to internal state if props not passed (e.g. embedded mode)
    const [localCurrentDate, setLocalCurrentDate] = useState(initialDate || new Date());
    const [localViewDensity, setLocalViewDensity] = useState('month');
    const currentDate = propCurrentDate || localCurrentDate;
    const setCurrentDate = propSetCurrentDate || setLocalCurrentDate;
    const viewDensity = propViewDensity || localViewDensity;
    const setViewDensity = propSetViewDensity || setLocalViewDensity;

    const [isModalOpen, setIsModalOpen] = useState(initialOpenModal);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [selectedDateForNew, setSelectedDateForNew] = useState(initialDate);

    // Day detail popover state (used both in standalone and embedded mode)
    const [activeDayDetail, setActiveDayDetail] = useState(null);

    // Quick add form state inside day detail popover
    const [quickTitle, setQuickTitle] = useState('');
    const [quickPriority, setQuickPriority] = useState('Medium');
    const [quickRecurrence, setQuickRecurrence] = useState('none'); // 'none', 'daily', 'weekly', 'monthly'
    const [isQuickAdding, setIsQuickAdding] = useState(false);
    const [quickAddError, setQuickAddError] = useState(null);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Resilience states: toast feedback & in-flight action guarding
    const [toast, setToast] = useState(null);
    const [inFlightIds, setInFlightIds] = useState(new Set());

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToast({ message, type, id });
        setTimeout(() => {
            setToast(prev => (prev && prev.id === id ? null : prev));
        }, 3500);
    };

    const setInFlight = (id, state) => {
        setInFlightIds(prev => {
            const copy = new Set(prev);
            if (state) copy.add(id);
            else copy.delete(id);
            return copy;
        });
    };

    // Auto-open modal on initial navigation from dashboard redirect
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
        if (initialOpenModal && !embedded) {
            navigate('/app/scheduler', { replace: true, state: {} });
        }
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => {
        if (viewDensity === 'week') {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() - 7);
            setCurrentDate(newDate);
        } else {
            setCurrentDate(new Date(year, month - 1, 1));
        }
    };

    const handleNextMonth = () => {
        if (viewDensity === 'week') {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + 7);
            setCurrentDate(newDate);
        } else {
            setCurrentDate(new Date(year, month + 1, 1));
        }
    };

    const handleToday = () => setCurrentDate(new Date());

    // Timezone-safe local matching helper
    const matchCalendarDay = (dateVal, y, m, d) => {
        if (!dateVal) return false;
        const str = typeof dateVal === 'string' ? dateVal : dateVal.toISOString();
        const yyyy = String(y).padStart(4, '0');
        const mm = String(m + 1).padStart(2, '0');
        const dd = String(d).padStart(2, '0');
        if (str.startsWith(`${yyyy}-${mm}-${dd}`)) return true;
        const dt = new Date(dateVal);
        if (isNaN(dt.getTime())) return false;
        return dt.getFullYear() === y && dt.getMonth() === m && dt.getDate() === d;
    };

    const isDateInPast = (y, m, d) => {
        const check = new Date(y, m, d, 23, 59, 59);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return check < now;
    };

    // Open Day Detail popover
    const openDayDetail = (dayNum, daySchedules, dayGoals) => {
        const date = new Date(year, month, dayNum);
        setQuickTitle('');
        setQuickPriority('Medium');
        setQuickRecurrence('none');
        setQuickAddError(null);
        setActiveDayDetail({
            date,
            dayNumber: dayNum,
            monthName: monthNames[month],
            year,
            schedules: daySchedules,
            goals: dayGoals
        });
    };

    // Update activeDayDetail continuously when parent state mutates
    useEffect(() => {
        if (!activeDayDetail) return;
        const d = activeDayDetail.dayNumber;
        const m = activeDayDetail.date.getMonth();
        const y = activeDayDetail.date.getFullYear();
        const updatedSchedules = schedules.filter(s => matchCalendarDay(s.startTime, y, m, d));
        const updatedGoals = goals.filter(g => matchCalendarDay(g.targetDate || g.dueDate, y, m, d));
        setActiveDayDetail(prev => ({ ...prev, schedules: updatedSchedules, goals: updatedGoals }));
    }, [schedules, goals]);

    // --- OPTIMISTIC MUTATIONS WITH ROLLBACK ---
    const toggleScheduleStatus = async (e, schedule) => {
        if (e) e.stopPropagation();
        if (inFlightIds.has(schedule._id)) return;
        const newStatus = schedule.status === 'Completed' ? 'Scheduled' : 'Completed';
        const prevSchedules = [...schedules];
        const updatedSched = { ...schedule, status: newStatus };
        
        if (onScheduleUpdated) onScheduleUpdated(updatedSched);
        setInFlight(schedule._id, true);

        try {
            await axios.patch(`${BASE_URL}/schedules/${schedule._id}`, { status: newStatus }, { withCredentials: true });
            showToast(`Task marked as ${newStatus}`, 'success');
        } catch (error) {
            if (onSyncState) onSyncState(undefined, prevSchedules);
            showToast("Failed to update status on server. Rolled back.", "error");
        } finally {
            setInFlight(schedule._id, false);
        }
    };

    const toggleGoalStatus = async (goal) => {
        if (inFlightIds.has(goal._id)) return;
        const currentStage = (goal.status || '').toLowerCase();
        const newStatus = ['completed', 'done'].includes(currentStage) ? 'In Progress' : 'Completed';
        const newCompletedAt = newStatus === 'Completed' ? new Date().toISOString() : null;
        
        const prevGoals = [...goals];
        const updatedGoal = { ...goal, status: newStatus, completedAt: newCompletedAt, lastUpdated: new Date().toISOString() };
        
        if (onGoalUpdated) onGoalUpdated(updatedGoal);
        setInFlight(goal._id, true);

        try {
            await axios.put(`${BASE_URL}/goals/${goal._id}`, { status: newStatus, completedAt: newCompletedAt }, { withCredentials: true });
            showToast(`Goal marked as ${newStatus}`, 'success');
        } catch (error) {
            if (onSyncState) onSyncState(prevGoals, undefined);
            showToast("Failed to update goal status on server. Rolled back.", "error");
        } finally {
            setInFlight(goal._id, false);
        }
    };

    const handleInlineQuickAdd = async (e) => {
        e.preventDefault();
        if (!quickTitle.trim() || !activeDayDetail || isQuickAdding) return;
        setIsQuickAdding(true);
        setQuickAddError(null);

        const targetDateStr = new Date(activeDayDetail.year, activeDayDetail.date.getMonth(), activeDayDetail.dayNumber, 12, 0, 0).toISOString();

        try {
            if (quickRecurrence === 'none') {
                const payload = {
                    name: quickTitle.trim(),
                    title: quickTitle.trim(),
                    priority: quickPriority,
                    status: 'Not Started',
                    targetDate: targetDateStr,
                    createdAt: new Date().toISOString()
                };
                const res = await axios.post(`${BASE_URL}/goals`, payload, { withCredentials: true });
                const created = res.data.goal || res.data;
                if (onGoalCreated) onGoalCreated(created);
                showToast(`Created goal "${quickTitle.trim()}"`, "success");
            } else {
                // Generate concrete goal instances up to a horizon per specification 1.3
                const instances = [];
                const baseDate = new Date(targetDateStr);
                let count = quickRecurrence === 'daily' ? 14 : quickRecurrence === 'weekly' ? 8 : 3;
                
                for (let i = 0; i < count; i++) {
                    const nextDate = new Date(baseDate);
                    if (quickRecurrence === 'daily') nextDate.setDate(baseDate.getDate() + i);
                    if (quickRecurrence === 'weekly') nextDate.setDate(baseDate.getDate() + (i * 7));
                    if (quickRecurrence === 'monthly') nextDate.setMonth(baseDate.getMonth() + i);
                    
                    instances.push({
                        name: `${quickTitle.trim()} (${i + 1}/${count})`,
                        title: `${quickTitle.trim()} (${i + 1}/${count})`,
                        priority: quickPriority,
                        status: 'Not Started',
                        targetDate: nextDate.toISOString(),
                        recurrence: { frequency: quickRecurrence },
                        createdAt: new Date().toISOString()
                    });
                }
                
                const results = await Promise.all(instances.map(inst => axios.post(`${BASE_URL}/goals`, inst, { withCredentials: true })));
                const createdArray = results.map(r => r.data.goal || r.data);
                if (onGoalCreated) onGoalCreated(createdArray);
                showToast(`Created ${count} recurring goal instances`, "success");
            }
            setQuickTitle('');
            setQuickRecurrence('none');
        } catch (err) {
            console.error("Quick add failed:", err);
            setQuickAddError("Failed to save goal to server. Please verify your connection.");
        } finally {
            setIsQuickAdding(false);
        }
    };

    // --- DRAG TO RESCHEDULE (1.2) ---
    const handleDragStart = (e, item, type) => {
        e.stopPropagation();
        if (embedded) return;
        e.dataTransfer.setData('text/plain', JSON.stringify({ id: item._id, type, title: item.title || item.name }));
    };

    const handleDropOnDay = async (e, targetYear, targetMonth, targetDay) => {
        e.preventDefault();
        if (embedded) return;
        const dataStr = e.dataTransfer.getData('text/plain');
        if (!dataStr) return;
        try {
            const data = JSON.parse(dataStr);
            if (!data.id || !data.type || inFlightIds.has(data.id)) return;

            const newDateObj = new Date(targetYear, targetMonth, targetDay, 10, 0, 0);
            const isoString = newDateObj.toISOString();

            const prevGoals = [...goals];
            const prevSchedules = [...schedules];
            setInFlight(data.id, true);

            if (data.type === 'goal') {
                const targetGoal = goals.find(g => g._id === data.id);
                if (!targetGoal || matchCalendarDay(targetGoal.targetDate || targetGoal.dueDate, targetYear, targetMonth, targetDay)) {
                    setInFlight(data.id, false);
                    return;
                }
                const updated = { ...targetGoal, targetDate: isoString, lastUpdated: new Date().toISOString() };
                if (onGoalUpdated) onGoalUpdated(updated);
                showToast(`Rescheduled "${data.title}" to ${monthNames[targetMonth]} ${targetDay}`, "success");

                try {
                    await axios.put(`${BASE_URL}/goals/${data.id}`, { targetDate: isoString }, { withCredentials: true });
                } catch (err) {
                    if (onSyncState) onSyncState(prevGoals, undefined);
                    showToast("Server update failed. Reverting reschedule.", "error");
                }
            } else if (data.type === 'schedule') {
                const targetSched = schedules.find(s => s._id === data.id);
                if (!targetSched || matchCalendarDay(targetSched.startTime, targetYear, targetMonth, targetDay)) {
                    setInFlight(data.id, false);
                    return;
                }
                const origDuration = new Date(targetSched.endTime).getTime() - new Date(targetSched.startTime).getTime();
                const newEnd = new Date(newDateObj.getTime() + (origDuration || 3600000)).toISOString();
                const updated = { ...targetSched, startTime: isoString, endTime: newEnd };
                if (onScheduleUpdated) onScheduleUpdated(updated);
                showToast(`Rescheduled "${data.title}" to ${monthNames[targetMonth]} ${targetDay}`, "success");

                try {
                    await axios.patch(`${BASE_URL}/schedules/${data.id}`, { startTime: isoString, endTime: newEnd }, { withCredentials: true });
                } catch (err) {
                    if (onSyncState) onSyncState(undefined, prevSchedules);
                    showToast("Server update failed. Reverting reschedule.", "error");
                }
            }
        } catch (err) {
            console.error("Drop handling failed:", err);
        } finally {
            if (dataStr) {
                const parsed = JSON.parse(dataStr);
                setInFlight(parsed.id, false);
            }
        }
    };

    // Search matches helper
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase();
        const results = [];
        goals.forEach(g => {
            const title = g.name || g.title || '';
            if (title.toLowerCase().includes(q)) {
                results.push({ id: g._id, title, date: g.targetDate || g.dueDate, type: 'goal', status: g.status });
            }
        });
        schedules.forEach(s => {
            if ((s.title || '').toLowerCase().includes(q)) {
                results.push({ id: s._id, title: s.title, date: s.startTime, type: 'task', status: s.status });
            }
        });
        return results.slice(0, 10);
    }, [searchQuery, goals, schedules]);

    const handleJumpToSearchItem = (item) => {
        if (!item.date) return;
        const target = new Date(item.date);
        setCurrentDate(new Date(target.getFullYear(), target.getMonth(), 1));
        setSearchQuery('');
        setIsSearching(false);
        // Open day detail for that target date
        const d = target.getDate();
        const m = target.getMonth();
        const y = target.getFullYear();
        const daySchedules = schedules.filter(s => matchCalendarDay(s.startTime, y, m, d));
        const dayGoals = goals.filter(g => matchCalendarDay(g.targetDate || g.dueDate, y, m, d));
        openDayDetail(d, daySchedules, dayGoals);
    };

    // Calculate Grid Cells (Month vs Week Density)
    const renderCalendarGrid = () => {
        const todayObj = new Date();
        const isThisMonth = todayObj.getMonth() === month && todayObj.getFullYear() === year;
        const cells = [];

        if (viewDensity === 'week') {
            // Week view density: calculate Sun-Sat around currentDate
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

            for (let i = 0; i < 7; i++) {
                const dayObj = new Date(startOfWeek);
                dayObj.setDate(startOfWeek.getDate() + i);
                const d = dayObj.getDate();
                const m = dayObj.getMonth();
                const y = dayObj.getFullYear();
                const isToday = todayObj.getFullYear() === y && todayObj.getMonth() === m && todayObj.getDate() === d;
                const past = isDateInPast(y, m, d);

                const daySchedules = schedules.filter(s => matchCalendarDay(s.startTime, y, m, d));
                const dayGoals = goals.filter(g => matchCalendarDay(g.targetDate || g.dueDate, y, m, d));
                const totalItems = daySchedules.length + dayGoals.length;

                cells.push(
                    <div
                        key={`week-${i}-${d}`}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDayDetail(d, daySchedules, dayGoals); } }}
                        onClick={() => openDayDetail(d, daySchedules, dayGoals)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropOnDay(e, y, m, d)}
                        className={`min-h-[350px] border rounded-xl p-3 cursor-pointer transition-all duration-200 flex flex-col group relative ${
                            isToday 
                                ? 'bg-white/[0.05] border-white/40 shadow-sm' 
                                : m !== month 
                                    ? 'bg-[#080808] border-white/[0.03] opacity-60' 
                                    : 'bg-[#000000] border-white/[0.06] hover:border-white/20'
                        }`}
                    >
                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/[0.06]">
                            <div>
                                <span className={`text-base font-bold ${isToday ? 'text-white underline underline-offset-4' : 'text-zinc-300'}`}>
                                    {d} {m !== month && <span className="text-xs text-zinc-500">{monthNames[m].slice(0, 3)}</span>}
                                </span>
                                <span className="block text-[10px] text-zinc-500 uppercase font-mono mt-0.5">
                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i]}
                                </span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDateForNew(dayObj);
                                    setEditingSchedule(null);
                                    setIsModalOpen(true);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/[0.08] hover:bg-white/20 text-white rounded-lg p-1"
                                title="Open advanced schedule modal"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto scrollbar-none pr-1">
                            {totalItems === 0 ? (
                                <span className="text-[11px] text-zinc-600 italic text-center py-8">No scheduled focus</span>
                            ) : (
                                <>
                                    {dayGoals.map(goal => {
                                        const isDone = ['completed', 'done'].includes((goal.status || '').toLowerCase());
                                        const isOverdue = !isDone && past;
                                        const isHighlighted = goal._id === highlightedGoalId;
                                        return (
                                            <div
                                                key={goal._id}
                                                draggable={!embedded}
                                                onDragStart={(e) => handleDragStart(e, goal, 'goal')}
                                                onClick={(e) => { e.stopPropagation(); openDayDetail(d, daySchedules, dayGoals); }}
                                                className={`text-xs px-2.5 py-2 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                                                    isHighlighted ? 'ring-2 ring-white border-white bg-white/[0.15]' :
                                                    isDone ? 'bg-white/[0.02] border-white/5 text-zinc-400 line-through' :
                                                    isOverdue ? 'bg-zinc-900/80 border-zinc-700/80 text-zinc-200 font-medium' :
                                                    'bg-[#121215] border-white/10 text-white hover:border-white/25 font-medium'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 truncate">
                                                    <span className={`w-2 h-2 rounded-full shrink-0 ${isDone ? 'bg-white' : isOverdue ? 'border border-zinc-400 bg-transparent' : 'bg-white/70'}`} />
                                                    <span className="truncate">{goal.name || goal.title}</span>
                                                </div>
                                                {isOverdue && <span className="text-[9px] font-mono uppercase bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">Overdue</span>}
                                            </div>
                                        );
                                    })}
                                    {daySchedules.map(schedule => {
                                        const isDone = schedule.status === 'Completed';
                                        const timeString = new Date(schedule.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        return (
                                            <div
                                                key={schedule._id}
                                                draggable={!embedded}
                                                onDragStart={(e) => handleDragStart(e, schedule, 'schedule')}
                                                onClick={(e) => { e.stopPropagation(); setEditingSchedule(schedule); setIsModalOpen(true); }}
                                                className={`text-xs px-2.5 py-2 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                                                    isDone ? 'bg-white/[0.02] border-white/5 text-zinc-400 line-through' : 'bg-[#151518] border-white/15 text-zinc-200 hover:border-white/30'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 truncate">
                                                    <span className="w-2 h-2 rounded-full bg-zinc-500 shrink-0" />
                                                    <span className="truncate">{schedule.title}</span>
                                                </div>
                                                <span className="text-[10px] font-mono text-zinc-500 shrink-0">{timeString}</span>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                );
            }
            return cells;
        }

        // Default Month View Density
        const blanks = [];
        for (let i = 0; i < firstDay; i++) {
            blanks.push(
                <div key={`blank-${i}`} className={`min-h-[115px] ${embedded ? 'border border-white/[0.02]' : 'border border-white/[0.03]'} rounded-xl bg-black opacity-20 pointer-events-none`} />
            );
        }

        const monthCells = [];
        for (let d = 1; d <= daysInMonth; d++) {
            const isToday = isThisMonth && todayObj.getDate() === d;
            const past = isDateInPast(year, month, d);
            const daySchedules = schedules.filter(s => matchCalendarDay(s.startTime, year, month, d));
            const dayGoals = goals.filter(g => matchCalendarDay(g.targetDate || g.dueDate, year, month, d));
            const combinedItems = [...dayGoals.map(g => ({ ...g, itemType: 'goal' })), ...daySchedules.map(s => ({ ...s, itemType: 'schedule' }))];
            const showLimit = embedded ? 2 : 3;

            monthCells.push(
                <div
                    key={`month-${d}`}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDayDetail(d, daySchedules, dayGoals); } }}
                    onClick={() => openDayDetail(d, daySchedules, dayGoals)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropOnDay(e, year, month, d)}
                    className={`min-h-[115px] border rounded-xl p-2.5 cursor-pointer transition-all duration-200 flex flex-col group relative ${
                        isToday ? 'bg-white/[0.06] border-white/40' : 'bg-[#000000] border-white/[0.06] hover:border-white/20'
                    }`}
                >
                    <div className="flex justify-between items-start mb-1.5 shrink-0">
                        <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-white text-black font-black' : 'text-zinc-400 group-hover:text-white'}`}>
                            {d}
                        </span>
                        {!embedded && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDateForNew(new Date(year, month, d));
                                    setEditingSchedule(null);
                                    setIsModalOpen(true);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white rounded p-1"
                                title="Add timed schedule"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                            </button>
                        )}
                        {embedded && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate('/app/scheduler', { state: { targetDate: new Date(year, month, d).toISOString(), openModal: true } });
                                }}
                                title="Open scheduler to add task"
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white p-0.5 rounded"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 flex-1 min-h-0 overflow-hidden">
                        {combinedItems.slice(0, showLimit).map((item, index) => {
                            const isDone = item.itemType === 'goal' 
                                ? ['completed', 'done'].includes((item.status || '').toLowerCase()) 
                                : item.status === 'Completed';
                            const isOverdue = !isDone && past;
                            const isHighlighted = item._id === highlightedGoalId;

                            return (
                                <div
                                    key={item._id || index}
                                    draggable={!embedded}
                                    onDragStart={(e) => handleDragStart(e, item, item.itemType)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (item.itemType === 'schedule' && !embedded) {
                                            setEditingSchedule(item);
                                            setIsModalOpen(true);
                                        } else {
                                            openDayDetail(d, daySchedules, dayGoals);
                                        }
                                    }}
                                    className={`text-[11px] px-2 py-1 rounded-lg border transition-all truncate flex items-center gap-1.5 ${
                                        isHighlighted ? 'ring-1 ring-white border-white bg-white/20' :
                                        isDone ? 'bg-white/[0.02] border-white/[0.04] text-zinc-500 line-through' :
                                        isOverdue ? 'bg-zinc-900 border-zinc-700 text-zinc-200 font-medium' :
                                        'bg-[#121215] border-white/10 text-zinc-200 hover:border-white/25'
                                    }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                        isDone ? 'bg-white' : 
                                        isOverdue ? 'border border-zinc-400 bg-transparent' : 
                                        item.itemType === 'goal' ? 'bg-white/80' : 'bg-zinc-500'
                                    }`} />
                                    <span className="truncate">{item.name || item.title}</span>
                                </div>
                            );
                        })}

                        {combinedItems.length > showLimit && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openDayDetail(d, daySchedules, dayGoals);
                                }}
                                className="w-full text-left text-[10px] font-bold text-zinc-400 hover:text-white px-1.5 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-colors truncate"
                            >
                                +{combinedItems.length - showLimit} more
                            </button>
                        )}
                    </div>
                </div>
            );
        }

        return [...blanks, ...monthCells];
    };

    const totalItemsThisMonth = useMemo(() => {
        return goals.filter(g => matchCalendarDay(g.targetDate || g.dueDate, year, month, new Date(g.targetDate || g.dueDate).getDate())).length +
               schedules.filter(s => matchCalendarDay(s.startTime, year, month, new Date(s.startTime).getDate())).length;
    }, [goals, schedules, year, month]);

    return (
        <div className="w-full h-full flex flex-col font-sans text-white relative">
            {/* Floating Toast Feedback */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-xl border font-mono text-xs shadow-2xl animate-in fade-in slide-in-from-bottom duration-200 flex items-center gap-2.5 ${
                    toast.type === 'error' ? 'bg-zinc-950/95 border-zinc-500 text-zinc-200 font-bold' : 'bg-[#000000]/95 border-white/25 text-white'
                }`}>
                    <span className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-zinc-300' : 'bg-white'}`} />
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Toolbar */}
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${embedded ? 'mb-3' : 'mb-6'}`}>
                <div className="flex items-center gap-3 flex-wrap">
                    <span className={`font-bold ${embedded ? 'text-base text-white' : 'text-xl text-white tracking-tight'}`}>
                        {monthNames[month]} {year}
                    </span>
                    <button
                        onClick={handleToday}
                        className="px-3 py-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg text-xs text-zinc-300 font-medium transition-colors"
                    >
                        Today
                    </button>
                    <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-lg overflow-hidden">
                        <button onClick={handlePrevMonth} className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="Previous">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <button onClick={handleNextMonth} className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border-l border-white/10" title="Next">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>

                    {/* View Density Toggle */}
                    {!embedded && (
                        <div className="flex items-center bg-[#121215] border border-white/10 rounded-lg p-0.5 ml-2">
                            <button 
                                onClick={() => setViewDensity('month')} 
                                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${viewDensity === 'month' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                            >
                                Month
                            </button>
                            <button 
                                onClick={() => setViewDensity('week')} 
                                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${viewDensity === 'week' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                            >
                                Week
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {/* Search / Jump Input */}
                    {!embedded && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search & jump to goal..."
                                value={searchQuery}
                                onFocus={() => setIsSearching(true)}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Escape') { setSearchQuery(''); setIsSearching(false); } }}
                                className="bg-[#121215] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 w-48 sm:w-56 transition-all"
                            />
                            <svg className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            
                            {isSearching && searchQuery.trim() !== '' && (
                                <div className="absolute top-full right-0 mt-1.5 w-64 max-h-60 overflow-y-auto scrollbar-none bg-[#09090b] border border-white/15 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                                    {searchResults.length === 0 ? (
                                        <p className="text-xs text-zinc-500 italic py-2 text-center">No matching goals found</p>
                                    ) : (
                                        searchResults.map(res => (
                                            <button
                                                key={res.id}
                                                onClick={() => handleJumpToSearchItem(res)}
                                                className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between text-xs text-zinc-200"
                                            >
                                                <div className="min-w-0 flex-1 pr-2">
                                                    <span className="truncate font-bold block text-white">{res.title}</span>
                                                    <span className="text-[10px] text-zinc-400 capitalize font-mono">{res.type} • {res.status}</span>
                                                </div>
                                                <span className="text-[10px] text-zinc-500 font-mono shrink-0">
                                                    {res.date ? new Date(res.date).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'No date'}
                                                </span>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {embedded ? (
                        <button
                            onClick={() => navigate('/app/scheduler', { state: { targetDate: new Date().toISOString(), openModal: true } })}
                            className="bg-white text-black hover:bg-zinc-200 px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 text-xs shadow-sm"
                        >
                            <span>+ Add Task</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => { setEditingSchedule(null); setSelectedDateForNew(new Date()); setIsModalOpen(true); }}
                            className="bg-white text-black hover:bg-zinc-200 px-4 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-2 text-xs shadow-sm"
                        >
                            + Add Schedule
                        </button>
                    )}
                </div>
            </div>

            {/* Graceful empty state notice if month has zero items */}
            {totalItemsThisMonth === 0 && !embedded && viewDensity === 'month' && (
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl py-2.5 px-4 text-center text-xs text-zinc-400 mb-4 font-mono">
                    No focus blocks or goals scheduled for {monthNames[month]}. Click any date cell below or use quick-add to get started.
                </div>
            )}

            {/* Calendar Grid Header */}
            <div className="grid grid-cols-7 gap-1.5 mb-1.5 shrink-0">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-zinc-500 uppercase tracking-wider py-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar Grid Body */}
            <div className="grid grid-cols-7 gap-1.5 flex-1 min-h-0 overflow-y-auto scrollbar-none pr-0.5">
                {renderCalendarGrid()}
            </div>

            {/* DAY DETAIL POPOVER & INLINE QUICK ADD */}
            {activeDayDetail && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-150"
                    onKeyDown={(e) => { if (e.key === 'Escape') setActiveDayDetail(null); }}
                >
                    <div className="bg-[#000000] border border-white/20 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5 max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4 shrink-0">
                            <div>
                                <h3 className="text-base font-bold text-white tracking-tight">
                                    {activeDayDetail.monthName} {activeDayDetail.dayNumber}, {activeDayDetail.year}
                                </h3>
                                <p className="text-xs text-zinc-400 mt-0.5">Scheduled focus items and due goals</p>
                            </div>
                            <button 
                                onClick={() => setActiveDayDetail(null)}
                                className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Interactive Task & Goal List with Inline Status Checkboxes */}
                        <div className="space-y-2 overflow-y-auto scrollbar-none flex-1 min-h-[120px] max-h-60 pr-1">
                            {(!activeDayDetail.goals?.length && !activeDayDetail.schedules?.length) ? (
                                <div className="py-10 text-center">
                                    <p className="text-xs text-zinc-500 italic">No goals or tasks scheduled on this date.</p>
                                </div>
                            ) : (
                                <>
                                    {activeDayDetail.goals?.map((g) => {
                                        const isDone = ['completed', 'done'].includes((g.status || '').toLowerCase());
                                        const isFlight = inFlightIds.has(g._id);
                                        return (
                                            <div 
                                                key={g._id} 
                                                className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-colors ${
                                                    isDone ? 'bg-white/[0.01] border-white/[0.04] text-zinc-500' : 'bg-white/[0.03] border-white/10 text-white'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <button
                                                        disabled={isFlight}
                                                        onClick={() => toggleGoalStatus(g)}
                                                        title={isDone ? "Mark In Progress" : "Mark Completed"}
                                                        className={`w-4 h-4 rounded shrink-0 border flex items-center justify-center transition-colors ${
                                                            isDone ? 'bg-white text-black border-white' : 'border-zinc-500 hover:border-white'
                                                        } disabled:opacity-50`}
                                                    >
                                                        {isDone && <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>}
                                                    </button>
                                                    <span className={`text-xs font-medium truncate ${isDone ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
                                                        {g.name || g.title}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-zinc-400 uppercase font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 shrink-0">
                                                    {g.priority || 'Medium'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    {activeDayDetail.schedules?.map((s) => {
                                        const isDone = s.status === 'Completed';
                                        const isFlight = inFlightIds.has(s._id);
                                        const timeString = new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        return (
                                            <div 
                                                key={s._id} 
                                                onClick={() => { setActiveDayDetail(null); setEditingSchedule(s); setIsModalOpen(true); }}
                                                className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer hover:border-white/25 transition-colors ${
                                                    isDone ? 'bg-white/[0.01] border-white/[0.04] text-zinc-500' : 'bg-white/[0.03] border-white/10 text-white'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <button
                                                        disabled={isFlight}
                                                        onClick={(e) => toggleScheduleStatus(e, s)}
                                                        className={`w-4 h-4 rounded shrink-0 border flex items-center justify-center transition-colors ${
                                                            isDone ? 'bg-white text-black border-white' : 'border-zinc-500 hover:border-white'
                                                        } disabled:opacity-50`}
                                                    >
                                                        {isDone && <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>}
                                                    </button>
                                                    <span className={`text-xs font-medium truncate ${isDone ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                                                        {s.title}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-zinc-400 font-mono shrink-0">
                                                    {timeString}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {/* Inline Quick-Add Form with Priority & Recurrence Selection */}
                        <form onSubmit={handleInlineQuickAdd} className="pt-4 border-t border-white/10 space-y-3 shrink-0">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white tracking-tight">Quick Add Goal</span>
                                {quickAddError && <span className="text-[10px] text-zinc-300 font-semibold bg-zinc-900 px-2 py-0.5 rounded">{quickAddError}</span>}
                            </div>
                            
                            <input
                                type="text"
                                placeholder="Goal title or focus objective..."
                                value={quickTitle}
                                onChange={(e) => setQuickTitle(e.target.value)}
                                className="w-full bg-[#121215] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-all"
                            />
                            
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Priority</label>
                                    <select
                                        value={quickPriority}
                                        onChange={(e) => setQuickPriority(e.target.value)}
                                        className="w-full bg-[#121215] border border-white/15 text-zinc-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-white/40"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Recurrence</label>
                                    <select
                                        value={quickRecurrence}
                                        onChange={(e) => setQuickRecurrence(e.target.value)}
                                        className="w-full bg-[#121215] border border-white/15 text-zinc-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-white/40"
                                    >
                                        <option value="none">One-off (None)</option>
                                        <option value="daily">Daily (Next 14 Days)</option>
                                        <option value="weekly">Weekly (Next 8 Weeks)</option>
                                        <option value="monthly">Monthly (Next 3 Months)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    type="submit"
                                    disabled={isQuickAdding || !quickTitle.trim()}
                                    className="flex-1 bg-white text-black font-bold py-2.5 rounded-xl text-xs hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    {isQuickAdding ? "Saving..." : "+ Quick Add Goal"}
                                </button>

                                {embedded ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const dateStr = activeDayDetail.date.toISOString();
                                            setActiveDayDetail(null);
                                            navigate('/app/scheduler', { state: { targetDate: dateStr, openModal: true } });
                                        }}
                                        className="px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-bold text-white transition-colors"
                                    >
                                        Full Scheduler
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const target = new Date(activeDayDetail.year, activeDayDetail.date.getMonth(), activeDayDetail.dayNumber);
                                            setActiveDayDetail(null);
                                            setSelectedDateForNew(target);
                                            setEditingSchedule(null);
                                            setIsModalOpen(true);
                                        }}
                                        className="px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-bold text-white transition-colors"
                                        title="Create advanced time-blocked schedule"
                                    >
                                        + Advanced Task
                                    </button>
                                )}
                            </div>
                        </form>
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
