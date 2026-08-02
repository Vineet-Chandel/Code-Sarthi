import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import BASE_URL from '../../Pages/auth/baseURL';
import { setGoals } from '../../utils/goalSlice';
import SchedulerCalendar from './SchedulerCalendar';
import GoalAnalytics from './GoalAnalytics';

const Scheduler = ({ embedded = false, goals: externalGoals = null, onGoalCreated }) => {
    const location = useLocation();
    const initialDate = location?.state?.targetDate ? new Date(location.state.targetDate) : null;
    const initialOpenModal = Boolean(location?.state?.openModal);
    const dispatch = useDispatch();
    const user = useSelector(store => store.user?.user?.DATA || store.user);
    const reduxGoals = useSelector(store => store.goals.goals || []);
    const goals = externalGoals !== null ? externalGoals : reduxGoals;
    const isFetched = useSelector(store => store.goals.isFetched);
    const [activeTab, setActiveTab] = useState('Calendar');
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lifted Stage State for resilience and state preservation across tab switching
    const [currentDate, setCurrentDate] = useState(initialDate || new Date());
    const [viewDensity, setViewDensity] = useState('month'); // 'month' | 'week'
    const [analyticsDateRange, setAnalyticsDateRange] = useState('30');
    const [highlightedGoalId, setHighlightedGoalId] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const requests = [
                axios.get(`${BASE_URL}/schedules`, { withCredentials: true }),
                axios.get(`${BASE_URL}/schedules/analytics`, { withCredentials: true })
            ];
            if (!isFetched && externalGoals === null) {
                requests.push(axios.get(`${BASE_URL}/goals`, { withCredentials: true }));
            }
            const results = await Promise.all(requests);
            setSchedules(results[0].data);
            if (!isFetched && externalGoals === null && results[2]) {
                dispatch(setGoals(results[2].data));
            }
        } catch (error) {
            console.error("Failed to fetch scheduler data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isFetched, externalGoals]);

    // Update currentDate if navigation state changes
    useEffect(() => {
        if (initialDate) {
            setCurrentDate(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
        }
    }, [initialDate]);

    const handleScheduleAdded = (newSchedule) => {
        setSchedules(prev => [...prev, newSchedule].sort((a, b) => new Date(a.startTime) - new Date(b.startTime)));
    };

    const handleScheduleUpdated = (updatedSchedule) => {
        setSchedules(prev => prev.map(s => s._id === updatedSchedule._id ? updatedSchedule : s));
    };

    const handleScheduleDeleted = (deletedId) => {
        setSchedules(prev => prev.filter(s => s._id !== deletedId));
    };

    const handleGoalAdded = (newGoal) => {
        if (Array.isArray(newGoal)) {
            if (externalGoals === null) {
                dispatch(setGoals([...goals, ...newGoal]));
            }
            if (onGoalCreated) {
                newGoal.forEach(g => onGoalCreated(g));
            }
        } else {
            if (externalGoals === null) {
                dispatch(setGoals([...goals, newGoal]));
            }
            if (onGoalCreated) {
                onGoalCreated(newGoal);
            }
        }
    };

    const handleGoalUpdated = (updatedGoal) => {
        if (externalGoals === null) {
            dispatch(setGoals(goals.map(g => g._id === updatedGoal._id ? updatedGoal : g)));
        }
    };

    const handleGoalDeleted = (deletedId) => {
        if (externalGoals === null) {
            dispatch(setGoals(goals.filter(g => g._id !== deletedId)));
        }
    };

    // Optimistic state sync & rollback capability
    const handleSyncState = (newGoals, newSchedules) => {
        if (newSchedules !== undefined) setSchedules(newSchedules);
        if (newGoals !== undefined && externalGoals === null) {
            dispatch(setGoals(newGoals));
        }
    };

    // Cross-stage link: jump from overdue analysis row directly to calendar date
    const handleJumpToCalendarDate = (targetDateObj, targetGoalId) => {
        if (!targetDateObj || isNaN(targetDateObj.getTime())) return;
        setCurrentDate(new Date(targetDateObj.getFullYear(), targetDateObj.getMonth(), 1));
        if (targetGoalId) setHighlightedGoalId(targetGoalId);
        setActiveTab('Calendar');
    };

    if (embedded) {
        return (
            <div className="w-full h-full flex flex-col font-sans text-white">
                {loading ? (
                    <div className="flex justify-center items-center flex-1 py-10">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <SchedulerCalendar
                        schedules={schedules}
                        goals={goals}
                        onScheduleAdded={handleScheduleAdded}
                        onScheduleUpdated={handleScheduleUpdated}
                        onScheduleDeleted={handleScheduleDeleted}
                        onGoalCreated={handleGoalAdded}
                        onGoalUpdated={handleGoalUpdated}
                        onGoalDeleted={handleGoalDeleted}
                        onSyncState={handleSyncState}
                        embedded={true}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="bg-[#000] min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col w-full text-white font-sans overflow-y-auto scrollbar-none relative pb-20">
            {/* Header / Stage Control Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 w-full bg-[#000000] border border-white/[0.06] rounded-2xl p-5 shrink-0 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold font-sans text-white tracking-tight">Goal Scheduler & Analytics</h1>
                    <p className="text-xs text-zinc-400 font-medium mt-1">Schedule dedicated focus blocks, manage goal lifecycles, and monitor performance.</p>
                </div>

                <div className="flex items-center gap-1.5 bg-[#121215] border border-white/10 rounded-xl p-1 shrink-0">
                    <button
                        onClick={() => setActiveTab('Calendar')}
                        className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === 'Calendar' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'}`}
                    >
                        Calendar View
                    </button>
                    <button
                        onClick={() => setActiveTab('Analytics')}
                        className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === 'Analytics' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'}`}
                    >
                        Deep Analysis
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center flex-1 min-h-[400px]">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="w-full flex-1 flex flex-col min-h-0">
                    {/* Both stages kept mounted in DOM to preserve state when switching */}
                    <div className={activeTab === 'Calendar' ? 'w-full flex-1 flex flex-col min-h-0' : 'hidden'}>
                        <SchedulerCalendar
                            schedules={schedules}
                            goals={goals}
                            onScheduleAdded={handleScheduleAdded}
                            onScheduleUpdated={handleScheduleUpdated}
                            onScheduleDeleted={handleScheduleDeleted}
                            onGoalCreated={handleGoalAdded}
                            onGoalUpdated={handleGoalUpdated}
                            onGoalDeleted={handleGoalDeleted}
                            onSyncState={handleSyncState}
                            embedded={false}
                            initialDate={initialDate}
                            initialOpenModal={initialOpenModal}
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            viewDensity={viewDensity}
                            setViewDensity={setViewDensity}
                            highlightedGoalId={highlightedGoalId}
                        />
                    </div>

                    <div className={activeTab === 'Analytics' ? 'w-full flex-1 flex flex-col min-h-0' : 'hidden'}>
                        <GoalAnalytics
                            userId={user?._id}
                            externalGoals={goals}
                            dateRange={analyticsDateRange}
                            setDateRange={setAnalyticsDateRange}
                            onJumpToCalendarDate={handleJumpToCalendarDate}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scheduler;
