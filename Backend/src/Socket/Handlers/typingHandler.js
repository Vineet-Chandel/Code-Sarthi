const Conversation = require("../../models/conversation");
const broadcastService = require("../Services/BroadcastService");






const typingHandler = async (conversationId, socket, isTyping) => {

    if (typeof isTyping !== "boolean") {
        return;
    }
    // ConversationService.getConversation()
    let conversation = null;
    try {
        conversation = await Conversation.findById(conversationId)


        if (!conversation) {
            console.log("no conversation")
            return;
        }
    } catch (err) {
        console.log("Database error while fetching conversation", err)
        return;
    }

    // Validate sender
    if (!conversation.members.some(
        member => member.toString() === socket.userId
    )) {
        console.log("user is not part of this conversation")
        return;
    }


    const receivers = conversation.members.filter(
        member => member.toString() !== socket.userId
    );



    const payload = {
        type: "typing",
        conversationId,
        senderId: socket.userId,
        isTyping,
        createdAt: new Date(),
    };

    await broadcastService(
        receivers,
        payload
    );



}

module.exports = typingHandler