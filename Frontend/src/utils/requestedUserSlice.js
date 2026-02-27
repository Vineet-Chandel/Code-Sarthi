import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    total: 0
};

const requestedUserSlice = createSlice({
    name: "requestedUser",
    initialState,
    reducers: {

        addRequestedUser: (state, action) => {

            state.users = action.payload;
            state.total = action.payload.length

        },
        clearRequestedUser: (state) => {
            state.users = [];
            state.total = 0;
        },
    },
});

export const { addRequestedUser, clearRequestedUser } = requestedUserSlice.actions;
export default requestedUserSlice.reducer;
