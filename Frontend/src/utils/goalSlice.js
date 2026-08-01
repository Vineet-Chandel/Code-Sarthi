import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goals: [],
    isFetched: false,
    loading: false,
    error: null
};

const goalSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        setGoals: (state, action) => {
            state.goals = action.payload;
            state.isFetched = true;
            state.error = null;
        },
        addGoal: (state, action) => {
            state.goals.unshift(action.payload);
        },
        updateGoal: (state, action) => {
            const index = state.goals.findIndex(g => g._id === action.payload._id);
            if (index !== -1) {
                state.goals[index] = action.payload;
            }
        },
        removeGoal: (state, action) => {
            state.goals = state.goals.filter(g => g._id !== action.payload);
        },
        clearGoals: (state) => {
            state.goals = [];
            state.isFetched = false;
            state.error = null;
        }
    }
});

export const { setGoals, addGoal, updateGoal, removeGoal, clearGoals } = goalSlice.actions;
export default goalSlice.reducer;
