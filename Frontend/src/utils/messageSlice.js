import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: {},
};

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setConversationMessages: (state, action) => {
            const { conversation_id, messages } = action.payload;

            state.messages[conversation_id] = messages;
        },

        addMessage: (state, action) => {
            const message = action.payload;
            const conversation_id = message.conversation_id;

            if (!state.messages[conversation_id]) {
                state.messages[conversation_id] = [];
            }

            state.messages[conversation_id].push(message);
        },

        clearConversation: (state, action) => {
            delete state.messages[action.payload];
        },

        clearAllMessages: (state) => {
            state.messages = {};
        },
    },
});

export const {
    setConversationMessages,
    addMessage,
    clearConversation,
    clearAllMessages,
} = messageSlice.actions;

export default messageSlice.reducer;