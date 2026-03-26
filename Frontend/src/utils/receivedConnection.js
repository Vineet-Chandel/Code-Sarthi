import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    total: 0,
    loading: false,
    error: null
};

const receivedConnectionSlice = createSlice({
    name: "receivedConnection",
    initialState,
    reducers: {

        addReceviedConnectionUser: (state, action) => {

            state.users = action.payload;


        },
        clearReceviedConnectionUser: (state) => {
            state.users = [];

        },
    },
});

export const { addReceviedConnectionUser, clearReceviedConnectionUser } = receivedConnectionSlice.actions;
export default receivedConnectionSlice.reducer;
