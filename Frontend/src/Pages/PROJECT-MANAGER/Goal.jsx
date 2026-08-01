import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BASE_URL from '../../Pages/auth/baseURL'
import GoalsHeader from './GoalsHeader'
import GoalsSecondHeader from './GoalsSecondHeader'
import GoalsThirdHeader from './GoalsThirdHeader'
import ShowingGoals from './ShowingGoals'

const Goal = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [primaryFilter, setPrimaryFilter] = useState('All Goals');

    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedPriority, setSelectedPriority] = useState('All');

    const fetchGoals = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/goals`, { withCredentials: true });
            setGoals(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch goals", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

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
        setGoals(prev => [newGoal, ...prev]);
    };

    return (
        <div className='bg-[#000] h-full px-5 py-10 flex flex-col'>
            <GoalsHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                primaryFilter={primaryFilter}
                setPrimaryFilter={setPrimaryFilter}
            />
            <div className='w-full h-[1px] bg-[#3a3a3a] my-3'></div>
            <GoalsSecondHeader
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority}
            />
            <div className='w-full h-[1px] bg-[#3a3a3a] my-3'></div>
            <GoalsThirdHeader count={filteredGoals.length} />
            <ShowingGoals
                goals={filteredGoals}
                loading={loading}
                onGoalAdded={handleGoalAdded}
            />
        </div>
    )
}

export default Goal