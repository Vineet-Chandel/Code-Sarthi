import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],              // chat list (sidebar)
    loading: false,
    error: null
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

        },
        updateConversation: (state, action) => {
            const { conversation } = action.payload;

            const index = state.users.findIndex(
                chat => chat._id === conversation._id
            );

            if (index !== -1) {
                state.users[index] = conversation;
            } else {
                state.users.unshift(conversation);
            }
        }
    }
});

export const {
    setChatUsers,
    clearChats,
    updateConversation,
} = chatSlice.actions;

export default chatSlice.reducer;