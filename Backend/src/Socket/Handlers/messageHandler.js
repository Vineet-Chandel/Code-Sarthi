const Conversation = require("../../models/conversation");
const { broadcastService } = require("../Services/BroadcastService");

const { saveMessage } = require("../Services/MessageService")



const messageHandler = async (clientMessageId, conversationId, socket, content, messageType, members, type, replyTo, localChatKey) => {


    try {


        const result = await saveMessage({

            senderId: socket.userId,
            conversationId,
            content,
            messageType,
            forwarded: false,
            edited: false,
            reactions: false,
            replyTo: replyTo,
            members: members,
            type: type
        });


        const payload = {
            type: "message",
            clientMessageId,
            localChatKey,              // 👈 temp key
            conversation: result.conversation,
            message: result.message
        };


        broadcastService(
            result.conversation.members,
            payload
        );



    } catch (err) {
        socket.send(JSON.stringify({
            type: "error",
            event: "message",
            message: err.message
        }));
    }



}

module.exports = messageHandler