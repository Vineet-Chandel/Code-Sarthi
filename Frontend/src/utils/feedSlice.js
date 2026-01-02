import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        addFeedUser: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.users.push(...action.payload);
            }
        },
        clearFeed: (state) => {
            state.users = [];
        },
    },
});

export const { addFeedUser, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
