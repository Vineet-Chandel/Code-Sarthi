const Conversation = require("../models/conversation");
const message = require("../models/message");
const upload = require("../middlewares/multerConvoImgVideo");
const uploadToCloud = require("./convoImgVideo");
const express = require("express");
const chatRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const { connection } = require("mongoose");
const mongoose = require("mongoose");

chatRouter.get("/chats", userAuth, async (req, res) => {
    try {

        //take the loginned user id 
        const userId = req.user._id;

        // all the chats of the user
        const chats = await Conversation.find({
            members: userId
        }).sort({ updatedAt: -1 }).populate([
            { path: "members", select: "firstName lastName gmail username profession photoUrl  college about middleName skills isVerified" },
            { path: "admins", select: "firstName lastName gmail username profession photoUrl  college about middleName skills isVerified" },
            { path: "createdBy", select: "firstName lastName gmail username profession photoUrl  college about middleName skills isVerified" },
            { path: "lastMessage", populate: { path: "sender_id", select: "firstName lastName photoUrl gmail username profession college about middleName skills isVerified" } }
        ])

        //chats are there not 
        if (!chats || chats.length === 0) {
            return res.status(200).json({
                success: true,
                total: 0,
                data: []
            });
        }

        res.status(200).json({
            success: true,
            total: chats.length,
            data: chats
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

//send the message

chatRouter.post("/send-message", userAuth, async (req, res) => {

    try {
        const userId = req.user._id;
        if (!userId) {
            throw new Error("Please re-login!");
        }

        const { conversationId, messageType, forwarded, edited, reactions, replyTo, name, members, type } = req.body
        let { content } = req.body

        //minimised feature
        //initially forwarded and replyto and edited and reactions array is minimised so only boolean type is allowed
        if (forwarded !== undefined && forwarded !== true && forwarded !== false) {
            throw new Error("Invalid forwarded type");
        }
        if (replyTo !== undefined && replyTo !== true && replyTo !== false) {
            throw new Error("Invalid replyTo type");
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
            conversation = await Conversation.findById(conversationId);

            if (!conversation) {
                return res.status(404).json({
                    success: false,
                    message: "Id invalid",
                });
            }
            const isMember = conversation.members.some(
                member => member.toString() === userId.toString()
            );

            if (!isMember) {
                return res.status(403).json({
                    success: false,
                    message: "You are not a member of this conversation."
                });
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
                member => member.toString() === userId.toString()
            );
            if (!isMember) {
                return res.status(403).json({
                    success: false,
                    message: "Not your matter",
                });
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
                    createdBy: userId,
                    name: nameG,
                    admins: [userId],
                    unreadCounts: uniqueMember.map(member => ({
                        user: member,
                        count: member.toString() === userId.toString() ? 0 : 1
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


        const messageStored = new message({
            conversation_id: conversation._id,
            sender_id: userId,
            content: content,
            forwarded,
            edited,
            editedAt: edited ? new Date() : undefined,
            messageType: messageType,
            reactions: reactions,
            replyTo: replyTo,
            status: "sent"
        })




        await messageStored.save()

        conversation.lastMessage = messageStored._id;
        conversation.updatedAt = new Date();
        conversation.unreadCounts.forEach(item => {
            if (item.user.toString() !== userId.toString()) {
                item.count++;
            }
        });

        await conversation.save()







        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: messageStored
        });



    } catch (err) {
        console.error(err);
        return res.status(400).json({
            success: false,
            message: "Message failed to send",
            error: err.message
        });
    }

})


// //Load chat messages
chatRouter.post("/get-message/:conversationId", userAuth, async (req, res) => {
    const { conversationId } = req.params;
    const userId = req.user._id;

    try {


        if (
            !conversationId ||
            conversationId.includes("<") ||
            conversationId.includes(">") ||
            conversationId.includes("@")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not Valid Id"
            });
        }

        let conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Convo not found"
            });
        }

        if (!conversation.members.some(
            p => p.toString() === userId.toString()
        )) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized"
            });
        }

        // ✅ FIXED
        const messages = await message.find({ conversation_id: conversationId })
            .populate("sender_id", "username photoUrl")
            .sort({ createdAt: 1 });

        // ✅ FIXED
        await message.updateMany(
            {
                conversation_id: conversationId,
                receiver: userId,
                status: { $in: ["sent", "delivered"] }
            },
            { $set: { status: "read" } }
        );

        conversation.unreadCounts.forEach((p) => {
            if (p.user.toString() === userId.toString()) {
                p.count = 0;
            }
        });
        await conversation.save();

        res.status(200).json({
            success: true,
            message: "Messages Retrieved",
            conversation_id: conversationId,
            messages
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});



// //mannually marking as read
// chatRouter.post("/mark-read", userAuth, async (req, res) => {
//     const { messageIds } = req.body;
//     const userId = req.user.userId;

//     try {
//         let message = await Msg.find({
//             _id: { $in: messageIds },
//             receiver: userId
//         })

//         await Msg.updateMany(
//             { _id: { $in: messageIds }, receiver: userId },
//             { $set: { messageStatus: "read" } }
//         )

//         if (req.io && req.socketUserMap) {
//             for (const message of messages) {
//                 const senderSocketId = req.socketUserMap.get(message.sender.toString());

//                 if (senderSocketId) {
//                     const updatedMessage = {
//                         _id: message._id,
//                         messageStatus: "read",
//                     };

//                     req.io.to(senderSocketId).emit("message_read", updatedMessage);
//                     await message.save();
//                 }
//             }
//         }
//         res.status(200).json({
//             success: true,
//             message: "Message Mark as read", message
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// })
// //delete for everyone message
// chatRouter.delete("/delete-for-everyone/:messageId", userAuth, async (req, res) => {
//     try {

//         const { messageId } = req.params;
//         const userId = req.user._id;

//         const message = await Msg.findById(messageId);

//         if (!message) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Message not found"
//             });
//         }

//         // only sender can delete for everyone
//         if (message.sender.toString() !== userId.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Not allowed to delete this message"
//             });
//         }

//         message.deletedForEveryone = true;
//         await message.save();

//         res.status(200).json({
//             success: true,
//             message: "Message deleted for everyone"
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });
// //delete for me 
// chatRouter.delete("/delete-for-me/:messageId", userAuth, async (req, res) => {

//     try {

//         const { messageId } = req.params;
//         const userId = req.user._id;

//         const message = await Msg.findById(messageId);

//         if (!message) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Message not found"
//             });
//         }

//         // check if already deleted
//         if (message.deletedFor.includes(userId)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Message already deleted for this user"
//             });
//         }

//         message.deletedFor.push(userId);
//         await message.save();

//         res.status(200).json({
//             success: true,
//             message: "Message deleted for you"
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }

// });
module.exports = chatRouter;