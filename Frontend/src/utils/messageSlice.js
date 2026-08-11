import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: {},
    conversationMappings: {},
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
            const {
                clientMessageId,
                message,
                localChatKey
            } = action.payload;

            const realConversationId =
                String(message.conversation_id);

            // =========================================
            // NEW CONVERSATION
            // =========================================

            if (localChatKey) {

                const tempMessages =
                    state.messages[localChatKey] || [];

                // Find the optimistic message using
                // the SAME clientMessageId
                const tempIndex = tempMessages.findIndex(
                    msg =>
                        String(msg.clientMessageId) ===
                        String(clientMessageId)
                );

                console.log("========== MESSAGE REPLACEMENT ==========");

                console.log("localChatKey:", localChatKey);

                console.log("realConversationId:", realConversationId);

                console.log("clientMessageId:", clientMessageId);

                console.log(
                    "TEMP MESSAGES:",
                    state.messages[localChatKey]
                );

                console.log(
                    "TEMP IDS:",
                    state.messages[localChatKey]?.map(
                        msg => msg.clientMessageId
                    )
                );

                console.log(
                    "TEMP MESSAGE INDEX:",
                    tempIndex
                );

                if (tempIndex !== -1) {

                    // Replace optimistic message
                    tempMessages[tempIndex] = {
                        ...message,

                        clientMessageId,

                        isTemporary: false
                    };

                } else {

                    // Safety fallback
                    tempMessages.push({
                        ...message,

                        clientMessageId,

                        isTemporary: false
                    });

                }

                // Move temporary conversation bucket
                // to the real conversation ID
                state.messages[realConversationId] =
                    tempMessages;

                delete state.messages[localChatKey];
                
                state.conversationMappings[localChatKey] = realConversationId;

                return;
            }


            // =========================================
            // EXISTING CONVERSATION
            // =========================================

            if (!state.messages[realConversationId]) {
                state.messages[realConversationId] = [];
            }

            const messages =
                state.messages[realConversationId];


            const existingIndex = messages.findIndex(
                msg =>
                    String(msg.clientMessageId) ===
                    String(clientMessageId)
            );


            if (
                clientMessageId &&
                existingIndex !== -1
            ) {

                messages[existingIndex] = {
                    ...message,

                    clientMessageId,

                    isTemporary: false
                };

                return;
            }


            // Normal incoming message
            messages.push({
                ...message,

                clientMessageId,

                isTemporary: false
            });
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