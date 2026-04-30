const Convo = require("../models/Convo");
const Msg = require("../models/Msg");
const upload = require("../middlewares/multerConvoImgVideo");
const uploadToCloud = require("./convoImgVideo");
const express = require("express");
const chatRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const { connection } = require("mongoose");

chatRouter.get("/chats", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;

        // all the chats of the user
        const chats = await Convo.find({
            Participants: userId
        });

        if (!chats || chats.length === 0) {
            return res.status(200).json({
                success: true,
                total: 0,
                data: []
            });
        }
        const formattedChats = await Promise.all(
            chats.map(async (chat) => {

                //find other user
                const otherUserId = chat.Participants.find(
                    id => id.toString() !== userId.toString()
                );
                //get other user credentials
                const credentials = await User.findById(otherUserId).select("firstName lastName photoUrl isVerified gmail username age gender about college skills profession");

                const lastMsg = chat.LastMsg;
                //get last message
                const findLastMsg = await Msg.findById({ _id: lastMsg });
                return {
                    chatId: chat._id,
                    otherUser: credentials,
                    lastMsg: findLastMsg.content,
                    unReadCount: chat.unReadCount
                };
            })
        );

        res.status(200).json({
            success: true,
            total: chats.length,
            data: formattedChats
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// this API will Send a message to another user
chatRouter.post("/send-message", userAuth, upload.single("file"), async (req, res) => {
    try {

        //Get sender (यह logged-in user है।)
        const senderId = req.user._id;


        const {
            //Get receiver (यह वह user है जिसे message भेजना है।)
            receiverId,
            content,
            type,
            language
        } = req.body;
        const file = req.file;
        //senderId , receiverId ----> dono hi ka hona essential hai 
        if (!senderId || !receiverId) {
            return res.status(400).json({
                success: false,
                message: "Sender and Receiver are required",
                senderId, receiverId
            });
        }
        const messageStatus = "sent";
        // sort karne ka reason taki duplicate convo na bane
        // to prevent this -- if the convo is in between [A,B]
        // A-B conversation 1
        // B-A conversation 2
        const Participants = [
            senderId.toString(),
            receiverId.toString()
        ].sort();


        //User cannot message themselves
        if (senderId.toString() === receiverId.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot message yourself"
            })
        }

        //Find conversation
        let conversation = await Convo.findOne({
            Participants: { $all: Participants },
        })


        //If convo doesn't exist -- Create new chat room
        if (!conversation) {
            conversation = new Convo({
                Participants
            });
            conversation.lastMsgAt = Date.now();
            await conversation.save()
        } else {
            conversation.lastMsgAt = Date.now();
            await conversation.save()
        }


        let ImgOrVideoUrl = null;
        let contentType = null;


        if (file) {
            const UploadVideoImageFile = await uploadToCloud(file);
            if (!UploadVideoImageFile) {
                return res.status(400).json({
                    success: false,
                    message: "File failed to upload",
                });
            }
            ImgOrVideoUrl = UploadVideoImageFile?.getDataUrl;

            if (file.mimetype.startsWith('image')) {
                contentType = "image"
            } else if (file.mimetype.startsWith('video')) {
                contentType = "video"
            } else {
                return res.status(400).json({
                    success: false,
                    message: "File failed to upload",
                });
            }
        } else if (content?.trim()) {
            contentType = "text"
        } else {
            return res.status(400).json({
                success: false,
                message: "Message content is required",
            });
        }



        //Store message in database
        const message = new Msg({
            conversationId: conversation._id,
            sender: senderId,
            receiver: receiverId,
            content,
            contentType,
            ImgOrVideoUrl,
            messageStatus,
            type,
            language
        })

        await message.save();

        //show latest message
        //update unread counter
        conversation.LastMsg = message._id;
        conversation.unReadCount += 1;
        await conversation.save();



        const populatedMessage = await Msg.findById(message._id)
            .populate("sender", "username photoUrl")
            .populate("receiver", "username photoUrl");




        res.status(200).json({
            success: true,
            populatedMessage,
        });


    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
})
//Fetch all chats of a user
chatRouter.post("/get-convo", userAuth, async (req, res) => {
    const userId = req.user._id;

    try {
        let conversations = await Convo.find({
            Participants: userId,
        })
            .populate({
                path: "LastMsg",
                populate: {
                    path: "sender receiver",
                    select: "username photoUrl firstName lastName gmail college profession gender age isVerified skills college profession about"
                }
            })
            .sort({ updatedAt: -1 });

        // Add front user to each conversation
        const updatedConversations = conversations.map(convo => {
            let atFrontUser = null;

            if (convo.LastMsg) {
                if (convo.LastMsg.sender?._id.toString() === userId.toString()) {
                    atFrontUser = convo.LastMsg.receiver;
                } else {
                    atFrontUser = convo.LastMsg.sender;
                }
            }

            return {
                ...convo.toObject(),
                atFrontUser
            };
        });

        res.status(200).json({
            success: true,
            message: "Conversations fetched successfully",
            conversation: updatedConversations,

        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
//Load chat messages
chatRouter.post("/get-message/:conversationId", userAuth, async (req, res) => {
    const { conversationId } = req.params;
    const userId = req.user._id;

    try {
        let conversation = await Convo.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Convo not found"
            });
        }

        if (!conversation.Participants.some(
            p => p.toString() === userId.toString()
        )) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized"
            });
        }

        // ✅ FIXED
        const messages = await Msg.find({ conversationId: conversationId })
            .populate("sender", "username photoUrl")
            .populate("receiver", "username photoUrl")
            .sort({ createdAt: 1 });

        // ✅ FIXED
        await Msg.updateMany(
            {
                conversationId: conversationId,
                receiver: userId,
                messageStatus: { $in: ["sent", "delivered"] }
            },
            { $set: { messageStatus: "read" } }
        );

        conversation.unReadCount = 0;
        await conversation.save();

        res.status(200).json({
            success: true,
            message: "Messages Retrieved",
            messages
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
//mannually marking as read
chatRouter.post("/mark-read", userAuth, async (req, res) => {
    const { messageIds } = req.body;
    const userId = req.user.userId;

    try {
        let message = await Msg.find({
            _id: { $in: messageIds },
            receiver: userId
        })

        await Msg.updateMany(
            { _id: { $in: messageIds }, receiver: userId },
            { $set: { messageStatus: "read" } }
        )

        if (req.io && req.socketUserMap) {
            for (const message of messages) {
                const senderSocketId = req.socketUserMap.get(message.sender.toString());

                if (senderSocketId) {
                    const updatedMessage = {
                        _id: message._id,
                        messageStatus: "read",
                    };

                    req.io.to(senderSocketId).emit("message_read", updatedMessage);
                    await message.save();
                }
            }
        }
        res.status(200).json({
            success: true,
            message: "Message Mark as read", message
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
})
//delete for everyone message
chatRouter.delete("/delete-for-everyone/:messageId", userAuth, async (req, res) => {
    try {

        const { messageId } = req.params;
        const userId = req.user._id;

        const message = await Msg.findById(messageId);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        // only sender can delete for everyone
        if (message.sender.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to delete this message"
            });
        }

        message.deletedForEveryone = true;
        await message.save();

        res.status(200).json({
            success: true,
            message: "Message deleted for everyone"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
//delete for me 
chatRouter.delete("/delete-for-me/:messageId", userAuth, async (req, res) => {

    try {

        const { messageId } = req.params;
        const userId = req.user._id;

        const message = await Msg.findById(messageId);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        // check if already deleted
        if (message.deletedFor.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "Message already deleted for this user"
            });
        }

        message.deletedFor.push(userId);
        await message.save();

        res.status(200).json({
            success: true,
            message: "Message deleted for you"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});
module.exports = chatRouter;