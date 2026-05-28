// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload  // new data
        },
        removeUser: (state) => {
            state.user = null;
        },
        addNewUser: (state, action) => {
            state.user.DATA = action.payload  // new data
        },
    },
});

export const { addUser, removeUser, addNewUser } = userSlice.actions;
export default userSlice.reducer;
