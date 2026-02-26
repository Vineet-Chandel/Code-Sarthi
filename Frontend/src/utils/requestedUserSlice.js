import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

const requestedUserSlice = createSlice({
    name: "requestedUser",
    initialState,
    reducers: {
        addRequestedUser: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.users.push(...action.payload);
            }
        },
        clearRequestedUser: (state) => {
            state.users = [];
        },
    },
});

export const { addRequestedUser, clearRequestedUser } = requestedUserSlice.actions;
export default requestedUserSlice.reducer;

