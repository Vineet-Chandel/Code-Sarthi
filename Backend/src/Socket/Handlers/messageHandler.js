const Conversation = require("../../models/conversation");
const { broadcastService } = require("../Services/BroadcastService");

const { saveMessage } = require("../Services/MessageService")




const messageHandler = async (conversationId, socket, content, messageType, members, type) => {

    console.log("🚀 MessageHandler Started");
    try {


        const result = await saveMessage({

            senderId: socket.userId,
            conversationId,
            content,
            messageType,
            forwarded: false,
            edited: false,
            reactions: false,
            replyTo: false,
            members: members,
            type: type
        });

        console.log("✅ Message Saved");
        const payload = {
            type: "message",
            message: result.message
        };


        console.log("📤 Broadcasting...", payload);
        console.log(typeof broadcastService);
        console.log(broadcastService);
        broadcastService(
            result.conversation.members,
            payload
        );

        console.log("✅ Broadcast Finished");
    } catch (err) {
        socket.send(JSON.stringify({
            type: "error",
            event: "message",
            message: err.message
        }));
    }



}

module.exports = messageHandler