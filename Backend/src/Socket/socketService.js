
// This imports the Socket.IO server class.
// Socket.IO is a WebSocket abstraction layer.

// Normal HTTP: Client → Request → Server → Response
// Socket: Client ↔ Server (persistent connection)

// Benefits:realtime messaging ,typing indicator ,notifications ,live updates
const { Server } = require("socket.io");

//Mongoose models created in past
const User = require("../models/user");
const Msg = require("../models/Msg");

///in-memory data structures ... Why This Is Called In-Memory Storage?
// Because the data exists only in the server’s RAM.
// ~ Fast ,Temporary,Local

// Purpose: Track which users are currently online and their socket connection.
// why we need this ? :When someone sends a message, you must know which socket belongs to the receiver.
const onlineUsers = new Map();


// Purpose: Track who is typing in which conversation.
// This allows the server to emit: "User is typing..."
const typingUsers = new Map();

//This function attaches Socket.IO to the HTTP server.
// HTTP server
//    │
//    └── Socket.IO
//           │
//           └── WebSocket connections

const initialSocket = (server) => {
    // This creates the socket server.
    const io = new Server(server, {

        // This allows your frontend domain to connect.
        cors: {
            origin: process.env.AT_FRONT,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        },

        // If the client does not respond to a ping within 6 seconds, disconnect.
        pingTimeout: 6000, //DISCONNECT THE USERS
    })



    // Every time a user connects, this runs.
    // socket.id
    // socket.emit()
    // socket.on()
    // socket.join()
    // socket.leave()
    io.on("connection", (socket) => {
        console.log(`User Connected : ${socket.id}`);
        let userId = null;

        // These are the User Connection Event

        // Why needed?
        // Because socket connection does NOT know the user yet.
        socket.on("userConnected", async (connectingUserId) => {
            try {
                userId = connectingUserId.toString();

                onlineUsers.set(userId, socket.id);
                socket.join(userId);


                await User.findByIdAndUpdate(userId, {
                    isOnline: true,
                    lastSeen: new Date(),
                })


                io.emit("user_status", { userId, isOnline: true });
            } catch (error) {
                console.log("ERROR HANDLING USER CONNECTION :", error);
            }
        })
        socket.on("getUserStatus", (requesterUserId, callback) => {
            const isOnline = onlineUsers.has(requesterUserId.toString())
            callback({
                userId: requesterUserId,
                isOnline,
                lastSeen: isOnline ? new Date() : null,
            })
        })
        socket.on("sendMessage", async (message) => {
            try {
                const receiverSocketId = onlineUsers.get(message.receiver._id.toString());

                // send back to sender
                socket.emit("receiveMessage", message);

                // send to receiver if online
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", message);
                }

            } catch (error) {
                console.log("Error in sending the message:", error);
                socket.emit("messageError", { error: "Failed to send the message" });
            }
        });
        socket.on("message_read", async ({ messageIds, senderId }) => {
            try {
                await Msg.updateMany(
                    { _id: { $in: messageIds } },
                    { $set: { messageStatus: "read" } }
                );

                const senderSocketId = onlineUsers.get(senderId.toString());

                if (senderSocketId) {
                    messageIds.forEach((messageId) => {
                        io.to(senderSocketId).emit("message_status_update", {
                            messageId,
                            messageStatus: "read"
                        });
                    });
                }

            } catch (error) {
                console.error("Error updating message read status", error);
            }
        });
        socket.on("typing_start", ({ conversationId, receiverId }) => {
            if (!userId || !conversationId || !receiverId) return;

            if (!typingUsers.has(userId)) typingUsers.set(userId, {});

            const userTyping = typingUsers.get(userId);

            userTyping[conversationId] = true;

            // clear any existing timeout
            if (userTyping[`${conversationId}_timeout`]) {
                clearTimeout(userTyping[`${conversationId}_timeout`]);
            }

            // auto-stop after 3s
            userTyping[`${conversationId}_timeout`] = setTimeout(() => {
                userTyping[conversationId] = false;

                socket.to(receiverId).emit("user_typing", {
                    userId,
                    conversationId,
                    isTyping: false
                });

            }, 3000);

            socket.to(receiverId).emit("user_typing", {
                userId,
                conversationId,
                isTyping: true
            })
        });
        socket.on("typing_stop", ({ conversationId, receiverId }) => {
            if (!userId || !conversationId || !receiverId) return;

            if (typingUsers.has(userId)) {
                const userTyping = typingUsers.get(userId);
                userTyping[conversationId] = false;

                if (userTyping[`${conversationId}_timeout`]) {
                    clearTimeout(userTyping[`${conversationId}_timeout`]);
                    delete userTyping[`${conversationId}_timeout`];
                }
            }

            socket.to(receiverId).emit("user_typing", {
                userId,
                conversationId,
                isTyping: false
            })
        });
        // Add or update reaction on message
        socket.on("add_reaction", async ({ messageId, emoji, reactionUserId }) => {
            try {
                const message = await Msg.findById(messageId);
                if (!message) return;

                const existingIndex = message.reactions.findIndex(
                    (r) => r.user.toString() === reactionUserId
                );

                if (existingIndex > -1) {
                    const existing = message.reactions[existingIndex];

                    if (existing.emoji === emoji) {
                        // remove same reaction
                        message.reactions.splice(existingIndex, 1);
                    } else {
                        // change emoji
                        message.reactions[existingIndex].emoji = emoji;
                    }
                } else {
                    // add new reaction
                    message.reactions.push({ user: reactionUserId, emoji });
                }
                await message.save();
                const populatedMessage = await Msg.findById(message._id)
                    .populate("sender", "username photoUrl")
                    .populate("receiver", "username photoUrl")
                    .populate("reactions.user", "username")
                    .lean();

                const senderSocket = onlineUsers.get(populatedMessage.sender._id.toString());
                const receiverSocket = onlineUsers.get(populatedMessage.receiver?._id.toString());
                const reactionUpdated = populatedMessage;
                if (senderSocket) io.to(senderSocket).emit("reaction_update", reactionUpdated);

                if (receiverSocket) io.to(receiverSocket).emit("reaction_update", reactionUpdated);
            } catch (error) {
                console.log("ERROR HANDLING USER CONNECTION :", error);
            }
        });
        const handleDisconnected = async () => {
            if (!userId) return;

            try {
                onlineUsers.delete(userId);

                // clear all typing timeouts
                if (typingUsers.has(userId)) {
                    const userTyping = typingUsers.get(userId);

                    Object.keys(userTyping).forEach((key) => {
                        if (key.endsWith("_timeout")) {
                            clearTimeout(userTyping[key]);
                        }
                    });

                    typingUsers.delete(userId);
                }

                await User.findByIdAndUpdate(userId, {
                    isOnline: false,
                    lastSeen: new Date(),
                });

                io.emit("user_status", { userId, isOnline: false, lastSeen: new Date() });
                socket.leave(userId);
                console.log(`user ${userId} disconnected`);
            } catch (error) {
                console.error("Error handling disconnection", error);

            }
        };
        // disconnect event
        socket.on("disconnect", handleDisconnected);
    })
    // attach the online user map to the cocket server for external user
    io.socketUserMap = onlineUsers;

    return io;
}
module.exports = initialSocket;