import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

const blockedSlice = createSlice({
    name: "blocked",
    initialState,
    reducers: {
        addBlockedUsers: (state, action) => {

            state.users = action.payload;

        },
        clearBlockedUser: (state) => {
            state.users = [];
        },
    },
});

export const { addBlockedUsers, clearBlockedUser } = blockedSlice.actions;
export default blockedSlice.reducer;
