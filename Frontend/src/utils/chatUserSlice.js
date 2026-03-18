import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    total: 0
};

const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {

        addChatsUser: (state, action) => {
            state.chats = action.payload || [];
            state.total = state.chats.length;
        },
        clearChats: (state) => {
            state.users = [];
            state.total = 0;
        },
    },
});

export const { addChatsUser, clearChats } = chatSlice.actions;
export default chatSlice.reducer;
