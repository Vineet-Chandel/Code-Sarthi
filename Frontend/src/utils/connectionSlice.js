import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

const connectionSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {
        addConnectionUser: (state, action) => {

            state.users = action.payload;

        },
        clearConnection: (state) => {
            state.users = [];
        },
    },
});

export const { addConnectionUser, clearConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
