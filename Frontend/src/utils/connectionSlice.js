import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    total: 0,
    loading: false,
    error: null
};

const connectionSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {

        addConnectionUser: (state, action) => {

            state.users = action.payload;
            state.total = action.payload.length

        },
        removeConnectionUser: (state, action) => {
            const idToDelete = action.payload;

            state.users = state.users.filter(
                user => user.connectionId !== idToDelete
            );

            state.total = state.total - 1;
        },
        clearConnection: (state) => {
            state.users = [];
            state.total = 0;
        },
    },
});

export const { addConnectionUser, clearConnection, removeConnectionUser } = connectionSlice.actions;
export default connectionSlice.reducer;
