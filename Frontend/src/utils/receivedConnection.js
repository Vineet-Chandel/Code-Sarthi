import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

const receivedConnectionSlice = createSlice({
    name: "receivedConnection",
    initialState,
    reducers: {
        addReceviedConnectionUser: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.users.push(...action.payload);
            }
        },
        clearReceviedConnectionUser: (state) => {
            state.users = [];
        },
    },
});

export const { addReceviedConnectionUser, clearReceviedConnectionUser } = receivedConnectionSlice.actions;
export default receivedConnectionSlice.reducer;

