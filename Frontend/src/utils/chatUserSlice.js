import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],              // chat list (sidebar)
};

const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        // ✅ set all chat users
        setChatUsers: (state, action) => {
            state.users = action.payload;
        },


        // ❌ optional: clear messages (when logout etc.)
        clearChats: (state) => {
            state.users = [];

        }
    }
});

export const {
    setChatUsers,
    clearChats
} = chatSlice.actions;

export default chatSlice.reducer;