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

        replaceTemporaryMessage: (state, action) => {

            const { clientMessageId, message } = action.payload;

            const conversationId = message.conversation_id;

            if (!state.messages[conversationId]) {
                state.messages[conversationId] = [message];
                return;
            }

            const index = state.messages[conversationId].findIndex(
                msg => msg.clientMessageId === clientMessageId
            );

            if (index !== -1) {
                // Replace temporary message with the real one
                state.messages[conversationId][index] = {
                    ...message,
                    clientMessageId
                };
            } else {
                // If no temporary message exists, just append
                state.messages[conversationId].push(message);
            }
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
    replaceTemporaryMessage
} = messageSlice.actions;

export default messageSlice.reducer;