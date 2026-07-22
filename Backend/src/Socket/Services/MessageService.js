const Conversation = require("../../models/conversation");
const User = require("../../models/user");
const Message = require("../../models/message");

const saveMessage = async ({

    senderId,
    conversationId,
    messageType,


    forwarded = false,
    edited = false,
    reactions = [],      // ✅ not false
    replyTo = null,

    content,
    members,
    type,
    name
}) => {
    console.log(senderId,
        conversationId,
        messageType,




        content,
        members,
        type,
        name)

    //minimised feature
    //initially forwarded and replyto and edited and reactions array is minimised so only boolean type is allowed
    if (forwarded !== undefined && forwarded !== true && forwarded !== false) {
        throw new Error("Invalid forwarded type");
    }

    if (edited !== undefined && edited !== true && edited !== false) {
        throw new Error("Invalid edited type");
    }
    if (reactions !== undefined && reactions !== true && reactions !== false) {
        throw new Error("Invalid reactions type");
    }


    if (typeof content !== "string") {
        throw new Error("Message content must be a string");
    }    //content verification

    // Remove leading/trailing whitespace
    content = content.trim();


    if (!content) {
        throw new Error("Message cannot be empty");
    }


    if (content.length > 10000) {
        throw new Error("Message is too long");
    }
    //members verification 

    let conversation

    if (conversationId) {
        console.log(conversationId)
        conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            throw new Error("Id Invalid");
        }
        const isMember = conversation.members.some(
            member => member.toString() === senderId.toString()
        );

        if (!isMember) {
            throw new Error("You are not a member of this conversation.")
        }
        if (!messageType) {
            throw new Error("Message Type is Undefined");
        }

        if (!["text", "image", "video", "audio", "file", "code", "system"].includes(messageType)) {
            throw new Error("Invalid conversation type or message type");
        }

    } else {

        if (!type || !messageType) {
            throw new Error("Type or Message Type is Undefined");
        }
        console.log("message service on command")
        if (!["private", "group"].includes(type) || !["text", "image", "video", "audio", "file", "code", "system"].includes(messageType)) {
            throw new Error("Invalid conversation type or message type");
        }

        if (!Array.isArray(members) || members.length === 0) {
            throw new Error("Members must be a non-empty array");
        }


        const uniqueMember = [...new Set(members)];
        if (uniqueMember.length !== members.length) {
            throw new Error("Duplicate members are not allowed");
        }


        const isMember = uniqueMember.some(
            member => member.toString() === senderId.toString()
        );
        if (!isMember) {
            throw new Error("Not your side")
        }

        const users = await User.find({
            _id: { $in: uniqueMember }
        });

        if (users.length !== uniqueMember.length) {
            throw new Error("Users do not exist");
        }

        let nameG = ""
        if (type === "group") {
            nameG = name;
        } else if (type === "private") {


            nameG = ""

        }


        const existingConversation = await Conversation.findOne({
            type: "private",
            members: {
                $all: uniqueMember,
                $size: 2
            }
        });

        if (existingConversation) {
            conversation = existingConversation;
        } else {

            conversation = new Conversation({
                members: uniqueMember,
                type: type,
                createdBy: senderId,
                name: nameG,
                admins: [senderId],
                unreadCounts: uniqueMember.map(member => ({
                    user: member,
                    count: member.toString() === senderId.toString() ? 0 : 1
                }))
            })

            await conversation.save();

        }
    }



    if (conversation.type === "private" && conversation.members.length !== 2) {
        throw new Error("Private conversation must have exactly 2 members");
    }

    if (conversation.type === "group") {
        if (conversation.members.length < 3) {
            throw new Error("Group must have at least 3 members");
        }

        if (!conversation.name) {
            throw new Error("Group name is required");
        }
    }

    //send the message


    const messageStored = new Message({
        conversation_id: conversation._id,
        sender_id: senderId,
        content: content,
        forwarded: false,
        edited: false,
        editedAt: edited ? new Date() : undefined,
        messageType: messageType,
        reactions: [],
        replyTo: replyTo,
        status: "sent"
    })

    try {
        await messageStored.save();

    } catch (err) {

        console.error(err);
        throw err;
    }

    conversation.lastMessage = messageStored._id;
    conversation.updatedAt = new Date();
    conversation.unreadCounts.forEach(item => {
        if (item.user.toString() !== senderId.toString()) {
            item.count++;
        }
    });

    await conversation.save()







    return {
        conversation,
        message: messageStored
    };






}


module.exports = {
    saveMessage
};