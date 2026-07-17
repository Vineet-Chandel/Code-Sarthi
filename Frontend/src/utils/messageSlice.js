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

            const { clientMessageId, message, localChatKey } = action.payload;

            const conversationId = message.conversation_id;
            console.log("🔥 receiveMessage fired");
            console.log("Conversation:", conversationId);
            console.log("Messages Array:", state.messages[conversationId]);

            console.log("Incoming:", message);

            if (
                localChatKey &&
                state.messages[localChatKey]
            ) {
                state.messages[message.conversation_id] =
                    state.messages[localChatKey];

                delete state.messages[localChatKey];
            }
            if (!state.messages[conversationId]) {
                state.messages[conversationId] = [];
            }

            console.log("Incoming clientMessageId:", clientMessageId);
            const messages = state.messages[conversationId];
            console.log(
                "Stored clientMessageIds:",
                messages.map(msg => ({
                    clientMessageId: msg.clientMessageId,
                    id: msg._id,
                    isTemporary: msg.isTemporary
                }))
            );
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