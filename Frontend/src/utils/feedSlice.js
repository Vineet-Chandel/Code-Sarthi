import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    loading: false,
    error: null
};

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        addFeedUser: (state, action) => {
            const newUsers = action.payload.filter(
                newUser =>
                    !state.users.some(
                        existingUser => existingUser._id === newUser._id
                    )
            );

            state.users.push(...newUsers);
        },
        removeFeedUser: (state, action) => {
            state.users = state.users.filter(
                user => user._id !== action.payload
            );
        },
        clearFeed: (state) => {
            state.users = [];
        },
    },
});

export const { addFeedUser, removeFeedUser, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
