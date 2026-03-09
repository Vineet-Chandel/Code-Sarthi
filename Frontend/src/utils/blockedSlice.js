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
        clearBlockedUser: (state, action) => {
            state.users = state.users.filter(
                user => user.blockId !== action.payload
            );
        }
    },
});

export const { addBlockedUsers, clearBlockedUser } = blockedSlice.actions;
export default blockedSlice.reducer;
