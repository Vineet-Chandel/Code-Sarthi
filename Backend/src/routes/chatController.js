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

            const existConvo = await Conversation.findOne({
                members: {
                    $all: members,
                    $size: members.length
                },
                type
            }).session(session)
            if (existConvo) {
                convoContainer = existConvo;
            }

        }

        if (convId) {

            convoContainer = await Conversation.findById(convId).session(session)
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

            convoContainer = new Conversation({
                members: members,
                type: type,
                createdBy: userId,
                name: name,
                admins: [userId],
                unreadCounts: members.map(member => ({
                    user: member,
                    count: member.toString() === userId.toString() ? 0 : 1
                }))
            })

            await convoContainer.save({ session });

        }

        let isMember = false;


        convoContainer.members.forEach(member => {


            if (member.toString() === userId.toString()) {
                isMember = true;
            }

        });




        if (!isMember) {
            await session.abortTransaction();
            await session.endSession();

            return res.status(403).json({
                success: false,
                message: "Unauthorised Access"
            });
        }

        const uniqueMember = convoContainer.members.filter((member) => member.toString() !== userId.toString());
        let isMemberItself = false;

        uniqueMember.forEach(member => {


            if (member.toString() === userId.toString()) {
                isMemberItself = true;
            }

        });



        if (isMemberItself) {
            await session.abortTransaction();
            await session.endSession();

            return res.status(403).json({
                success: false,
                message: "Unauthorised Access"
            });
        }

        for (const member of convoContainer.members) {
            const valid = await User.findById(member).session(session);

            if (!valid) {
                await session.abortTransaction();

                return res.status(400).json({
                    success: false,
                    message: "Invalid Member"
                });
            }
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
        console.error(err);


        if (session?.inTransaction()) {
            await session.abortTransaction();
        }

        if (session) {
            await session.endSession();
        }

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