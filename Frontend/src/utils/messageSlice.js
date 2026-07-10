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


        receiveMessage: (state, action) => {

            const { clientMessageId, message } = action.payload;

            const conversationId = message.conversation_id;

            if (!state.messages[conversationId]) {
                state.messages[conversationId] = [];
            }


            const messages = state.messages[conversationId];

            // Replace only when clientMessageId exists
            if (clientMessageId) {
                const index = messages.findIndex(
                    msg => msg.clientMessageId === clientMessageId
                );

                if (index !== -1) {
                    messages[index] = {
                        ...message,
                        clientMessageId
                    };
                    return;
                }
            }

            // Receiver or no temporary message
            messages.push(message);
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
    receiveMessage
} = messageSlice.actions;

export default messageSlice.reducer;