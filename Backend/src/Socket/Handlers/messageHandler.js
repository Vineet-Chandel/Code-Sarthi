const Conversation = require("../../models/conversation");
const broadcastService = require("../Services/BroadcastService");






const messageHandler = async (conversationId, socket, content) => {
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




    if (typeof content !== "string") {
        console.error("Content should be in the String ");


    }
    if (content.trim().length === 0 || content.length > 10000) {
        return;
    }

    const payload = {
        type: "message",
        conversationId,
        senderId: socket.userId,
        content,
        createdAt: new Date()
    };

    await broadcastService(
        conversation.members,
        payload
    );



}

module.exports = messageHandler