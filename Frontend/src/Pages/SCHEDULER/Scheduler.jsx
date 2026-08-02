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
    const user = useSelector(store => store.user);
    const reduxGoals = useSelector(store => store.goals.goals || []);
    const goals = externalGoals !== null ? externalGoals : reduxGoals;
    const isFetched = useSelector(store => store.goals.isFetched);
    const [activeTab, setActiveTab] = useState('Calendar');
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState([]);

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
            setAnalytics(results[1].data);
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

    const handleScheduleAdded = (newSchedule) => {
        setSchedules(prev => [...prev, newSchedule].sort((a, b) => new Date(a.startTime) - new Date(b.startTime)));
        fetchData();
    };

    const handleScheduleUpdated = (updatedSchedule) => {
        setSchedules(prev => prev.map(s => s._id === updatedSchedule._id ? updatedSchedule : s));
        fetchData();
    };

    const handleScheduleDeleted = (deletedId) => {
        setSchedules(prev => prev.filter(s => s._id !== deletedId));
        fetchData();
    };

    const handleGoalAdded = (newGoal) => {
        if (externalGoals === null) {
            dispatch(setGoals([...goals, newGoal]));
        }
        if (onGoalCreated) {
            onGoalCreated(newGoal);
        }
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
                        embedded={true}
                    />
                )}
            </div>
        );
    }

    return (
        <div className='bg-[#000] min-h-screen px-5 py-10 flex flex-col w-full text-white overflow-y-auto scrollbar-none relative pb-20'>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 w-full sticky top-0 bg-[#000] z-40 py-2 border-b border-[#222]">
                <div>
                    <h1 className="text-4xl font-bold font-poppins mb-2">Goal Scheduler</h1>
                    <p className="text-gray-400 font-poppins text-sm">Schedule dedicated time slots for your goals and track your consistency.</p>
                </div>
                
                <div className="flex bg-[#1a1a1a] border border-[#333] rounded-xl p-1 shrink-0">
                    <button 
                        onClick={() => setActiveTab('Calendar')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'Calendar' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-[#222]'}`}
                    >
                        Calendar
                    </button>
                    <button 
                        onClick={() => setActiveTab('Analytics')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'Analytics' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-[#222]'}`}
                    >
                        Analytics
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center flex-1">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="w-full flex-1">
                    {activeTab === 'Calendar' ? (
                        <SchedulerCalendar 
                            schedules={schedules} 
                            goals={goals} 
                            onScheduleAdded={handleScheduleAdded}
                            onScheduleUpdated={handleScheduleUpdated}
                            onScheduleDeleted={handleScheduleDeleted}
                            onGoalCreated={handleGoalAdded}
                            embedded={false}
                            initialDate={initialDate}
                            initialOpenModal={initialOpenModal}
                        />
                    ) : (
                        <GoalAnalytics userId={user?._id} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Scheduler;
