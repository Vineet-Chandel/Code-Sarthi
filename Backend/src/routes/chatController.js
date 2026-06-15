const conversation = require("../models/conversation");
const message = require("../models/message");
const upload = require("../middlewares/multerConvoImgVideo");
const uploadToCloud = require("./convoImgVideo");
const express = require("express");
const chatRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const { connection } = require("mongoose");


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

        if (!convId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Attempt"
            })
        }
        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty"
            });
        }

        session = await mongoose.startSession();
        session.startTransaction();


        let convoContainer = await conversation.findById(convId).session(session)

        if (!convoContainer) {
            if (!members || !type) {
                await session.abortTransaction();
                await session.endSession();

                return res.status(400).json({
                    success: false,
                    message: "Invalid Attempt"
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
                admin: [userId]

            })
        }

        const isMember = convoContainer.members.some(member =>
            member.equals(userId)
        );

        if (!isMember) {
            await session.abortTransaction();
            await session.endSession();

            return res.status(403).json({
                success: false,
                message: "Invalid Attempt"
            });
        }


        const message = new Msg({
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




        await message.save({ session });

        convoContainer.lastMessage = message._id;
        convoContainer.updatedAt = new Date();
        convoContainer.unreadCounts += 1

        await convoContainer.save({ session });

        await session.commitTransaction();

        await session.endSession();





        return res.status(500).json({
            success: true,
            message: "Message sent successfully",
            data: message
        });







    } catch (err) {
        if (session) {
            await session.abortTransaction();
            await session.endSession();
        }
        return res.status(400).json({
            success: false,
            message: "Message failed to sent",
            error: err
        });
    }
})



// // // this API will Send a message to another user
// chatRouter.post("/send-message", userAuth, async (req, res) => {
//     try {

//         // THIS WILL GET THE LOGGED IN PERSON's ID
//         const sender_id = req.user._id;


//         const {
//             //Get receiver (यह वह user है जिसे message भेजना है।)
//             conversation_id,
//             content,
//             type,
//             forwarded,
//             edited,
//             messageType,
//             reactions

//         } = req.body;
//         // const file = req.file;
//         //senderId , receiverId ----> dono hi ka hona essential hai 
//         if (!sender_id || !conversation_id) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Attempt",
//             });
//         }

//         let convo = await conversation.findById(conversation_id);


//         if (convo && !convo.members.includes(sender_id.toString())) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Attempt"
//             })
//         }
//         // sort karne ka reason taki duplicate convo na bane
//         // to prevent this -- if the convo is in between [A,B]
//         // A-B conversation 1
//         // B-A conversation 2
//         const members = [sender_id.toString(), convo.members].sort();


//         if (!convo && type === 'private') {
//             convo = new conversation({
//                 members: [members],
//                 lastMessage: content,
//                 lastActivity: "text"

//             });
//             convo.updatedAt = Date.now();
//             await convo.save()
//         } else {
//             convo.updatedAt = Date.now();
//             await convo.save()
//         }







//         //If convo doesn't exist -- Create new chat room



//         let ImgOrVideoUrl = null;
//         let contentType = null;


//         // if (file) {
//         //     const UploadVideoImageFile = await uploadToCloud(file);
//         //     if (!UploadVideoImageFile) {
//         //         return res.status(400).json({
//         //             success: false,
//         //             message: "File failed to upload",
//         //         });
//         //     }
//         //     ImgOrVideoUrl = UploadVideoImageFile?.getDataUrl;

//         //     if (file.mimetype.startsWith('image')) {
//         //         contentType = "image"
//         //     } else if (file.mimetype.startsWith('video')) {
//         //         contentType = "video"
//         //     } else {
//         //         return res.status(400).json({
//         //             success: false,
//         //             message: "File failed to upload",
//         //         });
//         //     }
//         // } else if (content?.trim()) {
//         //     contentType = "text"
//         // } else {
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: "Message content is required",
//         //     });
//         // }

//         let isForwarded;
//         if (forwarded) {
//             isForwarded = true;
//         } else {
//             isForwarded = false;
//         }
//         let isEdited;
//         if (edited) {
//             isEdited = true;
//         } else {
//             isEdited = false;
//         }


//         //Store message in database
//         const message = new Msg({
//             conversationId: convo._id,
//             sender: sender_id,
//             content: content,
//             forwarded: isForwarded,
//             edited: isEdited,
//             messageType: messageType,
//             reactions: reactions

//         })

//         await message.save();

//         //show latest message
//         //update unread counter
//         convo.lastMessage = message._id;
//         convo.unreadCounts += 1;
//         await convo.save();



//         const populatedMessage = await message.findById(message._id)
//             .populate("sender", "username photoUrl")




//         res.status(200).json({
//             success: true,
//             populatedMessage,
//         });


//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// })
// //Fetch all chats of a user
// chatRouter.post("/get-convo", userAuth, async (req, res) => {
//     const userId = req.user._id;

//     try {
//         let conversations = await Convo.find({
//             Participants: userId,
//         })
//             .populate({
//                 path: "LastMsg",
//                 populate: {
//                     path: "sender receiver",
//                     select: "username photoUrl firstName lastName gmail college profession gender age isVerified skills college profession about"
//                 }
//             })
//             .sort({ updatedAt: -1 });

//         // Add front user to each conversation
//         const updatedConversations = conversations.map(convo => {
//             let atFrontUser = null;

//             if (convo.LastMsg) {
//                 if (convo.LastMsg.sender?._id.toString() === userId.toString()) {
//                     atFrontUser = convo.LastMsg.receiver;
//                 } else {
//                     atFrontUser = convo.LastMsg.sender;
//                 }
//             }

//             return {
//                 ...convo.toObject(),
//                 atFrontUser
//             };
//         });

//         res.status(200).json({
//             success: true,
//             message: "Conversations fetched successfully",
//             conversation: updatedConversations,

//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// });
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