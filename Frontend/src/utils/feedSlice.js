//feedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feeduser: null,
};

const feedSlice = createSlice({
    name: "feeduser",
    initialState,
    reducers: {
        addFeedUser: (state, action) => {
            state.feeduser = action.payload  // new data
        },
        removeFeedUser: (state) => {
            state.feeduser = null;
        },
    },
});

export const { addFeedUser, removeFeedUser } = feedSlice.actions;
export default feedSlice.reducer;