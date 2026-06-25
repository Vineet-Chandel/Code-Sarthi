const conversation = require("../models/conversation");
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
        const chats = await conversation.find({
            members: userId
        }).sort({ updatedAt: -1 }).populate([
            { path: "members", select: "firstName lastName gmail username profession photoUrl" },
            { path: "admins", select: "firstName lastName gmail username profession photoUrl" },
            { path: "createdBy", select: "firstName lastName gmail username profession photoUrl" },
            { path: "lastMessage", populate: { path: "sender_id", select: "firstName lastName photoUrl gmail username profession" } }
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

    let session;
    try {

        //LOGINNED USER KI USER ID
        const userId = req.user._id
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Please Re-Login"
            })
        }
        const { convId, messageType, content, forwarded, edited, reactions, replyTo, name, members, type } = req.body


        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty"
            });
        }

        session = await mongoose.startSession();
        session.startTransaction();


        let convoContainer = null;


        if (!convId) {

            const existConvo = await conversation.findOne({
                members: {
                    $all: members
                },
                type
            }).session(session)

            convoContainer = await conversation.findById(existConvo._id).session(session)
        }

        if (convId) {
            convoContainer = await conversation.findById(convId).session(session)
        }

        if (!convoContainer) {
            if (!members || !type) {
                await session.abortTransaction();
                await session.endSession();

                return res.status(400).json({
                    success: false,
                    message: "Invalid Attempt 1"
                })

            }
            const uniqueMembers = [...new Set([
                ...members.map(String),
                userId.toString()
            ])];
            convoContainer = new conversation({
                members: uniqueMembers,
                type: type,
                createdBy: userId,
                name: name,
                admin: [userId],
                unreadCounts: uniqueMembers.map(member => ({
                    user: member,
                    count: member.toString() === userId.toString() ? 0 : 1
                }))
            })

            await convoContainer.save({ session });

        }

        const isMember = convoContainer.members.some(member =>
            member.equals(userId)
        );

        if (!isMember) {
            await session.abortTransaction();
            await session.endSession();

            return res.status(403).json({
                success: false,
                message: "Invalid Attempt 2"
            });
        }


        const messageStored = new message({
            conversation_id: convoContainer._id,
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




        await messageStored.save({ session });

        convoContainer.lastMessage = messageStored._id;
        convoContainer.updatedAt = new Date();
        convoContainer.unreadCounts.forEach(item => {
            if (item.user.toString() !== userId.toString()) {
                item.count++;
            }
        });

        await convoContainer.save({ session });

        await session.commitTransaction();

        await session.endSession();





        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: messageStored
        });







    } catch (err) {
        if (session) {
            await session.abortTransaction();
            await session.endSession();
        }
        return res.status(400).json({
            success: false,
            message: "Message failed to sent",
            error: err.message
        });
    }
})



// //Load chat messages
// chatRouter.post("/get-message/:conversationId", userAuth, async (req, res) => {
//     const { conversationId } = req.params;
//     const userId = req.user._id;

//     try {
//         let conversation = await Convo.findById(conversationId);

//         if (!conversation) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Convo not found"
//             });
//         }

//         if (!conversation.Participants.some(
//             p => p.toString() === userId.toString()
//         )) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Not Authorized"
//             });
//         }

//         // ✅ FIXED
//         const messages = await Msg.find({ conversationId: conversationId })
//             .populate("sender", "username photoUrl")
//             .populate("receiver", "username photoUrl")
//             .sort({ createdAt: 1 });

//         // ✅ FIXED
//         await Msg.updateMany(
//             {
//                 conversationId: conversationId,
//                 receiver: userId,
//                 messageStatus: { $in: ["sent", "delivered"] }
//             },
//             { $set: { messageStatus: "read" } }
//         );

//         conversation.unReadCount = 0;
//         await conversation.save();

//         res.status(200).json({
//             success: true,
//             message: "Messages Retrieved",
//             messages
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// });



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