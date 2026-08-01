import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import BASE_URL from '../../Pages/auth/baseURL'
import { setGoals, addGoal } from '../../utils/goalSlice'
import GoalsHeader from './GoalsHeader'
import GoalsSecondHeader from './GoalsSecondHeader'
import GoalsThirdHeader from './GoalsThirdHeader'
import ShowingGoals from './ShowingGoals'

const Goal = () => {
    const dispatch = useDispatch();
    const goals = useSelector(store => store.goals.goals || []);
    const isFetched = useSelector(store => store.goals.isFetched);
    const [loading, setLoading] = useState(!isFetched);
    const [searchQuery, setSearchQuery] = useState('');
    const [primaryFilter, setPrimaryFilter] = useState('All Goals');
    const [viewMode, setViewMode] = useState('grid');

    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedPriority, setSelectedPriority] = useState('All');

    const fetchGoals = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/goals`, { withCredentials: true });
            dispatch(setGoals(res.data));
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch goals", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isFetched) {
            fetchGoals();
        } else {
            setLoading(false);
        }
    }, [isFetched]);

    const filteredGoals = goals.filter(goal => {
        if (searchQuery && !goal.name.toLowerCase().includes(searchQuery.toLowerCase()) && !goal.description.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        if (selectedStatus !== 'All' && goal.status !== selectedStatus) return false;
        if (selectedPriority !== 'All' && goal.priority !== selectedPriority) return false;

        const isArchived = goal.isArchived === true;
        if (primaryFilter === 'Archived' && !isArchived) return false;
        if (primaryFilter !== 'Archived' && isArchived) return false;

        return true;
    });

    const handleGoalAdded = (newGoal) => {
        dispatch(addGoal(newGoal));
    };

    return (
        <div className='min-h-full bg-[#070709] relative overflow-x-hidden px-5 sm:px-8 py-10 flex flex-col text-white font-poppins selection:bg-blue-500/30'>
            {/* Ambient background glows */}
            <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="pointer-events-none absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]"></div>

            <div className="relative z-10 max-w-[1600px] w-full mx-auto flex flex-col h-full">
                <GoalsHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    primaryFilter={primaryFilter}
                    setPrimaryFilter={setPrimaryFilter}
                />
                <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-[#2a2a35] to-transparent my-4'></div>
                <GoalsSecondHeader
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedPriority={selectedPriority}
                    setSelectedPriority={setSelectedPriority}
                />
                <GoalsThirdHeader 
                    count={filteredGoals.length} 
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
                <ShowingGoals
                    goals={filteredGoals}
                    loading={loading}
                    onGoalAdded={handleGoalAdded}
                    viewMode={viewMode}
                />
            </div>
        </div>
    )
}

export default Goal