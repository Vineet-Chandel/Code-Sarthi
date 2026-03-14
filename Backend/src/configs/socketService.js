const { Server } = require("socket.io");
const User = require("../models/user");
const Msg = require("../models/Msg");


const onlineUsers = newMap();
const typingUser = newMap();

const initialSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.AT_FRONT,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        },
        pingTimeout: 6000, //DISCONNECT THE USERS
    })




    io.on("connection", (socket) => {
        console.log(`User Connected : ${socket.id}`);
        let userId = null;

        socket.on("userConnected", async (connectingUserId) => {
            try {
                userId = connectingUserId;
                onlineUsers.set(userId, socket.id);
                socket.join(userId)


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
            const isOnline = onlineUsers.has(requesterUserId)
            callback({
                userId: requesterUserId,
                isOnline,
                lastSeen: isOnline ? new Date() : null,
            })
        })

        socket.on("sendMessage", async (message) => {
            try {
                const receiverSocketId = onlineUsers.get(message.receiver._id);
                if (!receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", message)
                }
            } catch (error) {
                console.log("Error in sending the message: ", error);
                socket.emit("messageError", { error: "Failed to send the message" })
            }
        })
        socket.on("message_read", async ({ messageIds, senderId }) => {
            try {
                await Message.updateMany(
                    { _id: { $in: messageIds } },
                    { $set: { messageStatus: "read" } }
                );

                const senderSocketId = onlineUsers.get(senderId);

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
    })
}