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

                const otherUserId = chat.Participants.find(
                    id => id.toString() !== userId.toString()
                );

                const credentials = await User.findById(otherUserId);

                const lastMsg = chat.LastMsg;

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
        console.error(error);

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
            content
        } = req.body;
        const file = req.file;

        const messageStatus = "sent";
        //senderId , receiverId ----> dono hi ka hona essential hai 
        if (!senderId || !receiverId) {
            return res.status(400).json({
                success: false,
                message: "Sender and Receiver are required",
                senderId, receiverId
            });
        }

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
            conversation: conversation._id,
            sender: senderId,
            receiver: receiverId,
            content,
            contentType,
            ImgOrVideoUrl,
            messageStatus
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



        //Emit socket event for realtime
        if (req.io && req.socketUserMap) {
            const receiverSocketId = req.socketUserMap.get(receiverId);

            if (receiverSocketId) {
                req.io.to(receiverSocketId).emit("receive_message", populatedMessage);
                message.messageStatus = "delivered";
                await message.save();
            }
        }
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
                    select: "username photoUrl firstName lastName gmail college profession gender age"
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

        // is the conversation exists or not
        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Convo not found"
            })
        }
        //User must be part of conversation
        if (!conversation.Participants.some(
            p => p.toString() === userId.toString()
        )) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized to view this convo"
            })

        }


        //Msg.find({ conversation })
        const messages = await Msg.find({ conversation: conversationId })
            .populate("sender", "username photoUrl")
            .populate("receiver", "username photoUrl")
            .sort({ createdAt: 1 }) //old → new


        await Msg.updateMany(
            {
                conversation: conversationId,
                receiver: userId,
                messageStatus: { $in: ["send", "delivered"] }
            },
            { $set: { messageStatus: "read" } },
        )


        // updated the read count to the zero

        conversation.unReadCount = 0;




        await conversation.save();
        res.status(200).json({
            success: true,
            message: "Message Retrived", messages
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
})
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