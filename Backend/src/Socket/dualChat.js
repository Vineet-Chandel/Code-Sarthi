// // Setup WebSocket Server

const WebSocket = require("ws");
const { WebSocketServer } = require("ws");
const Conversation = require("../models/conversation");
const { tokenVerification } = require("./tokenVerification");
const cookie = require("cookie");


//connection event

module.exports = (server) => {

    const wss = new WebSocketServer({
        server
    });


    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            if (!ws.isAlive) return ws.terminate();
            ws.isAlive = false;
            // → sends heartbeat
            ws.ping();
        });
    }, 30000);

    const onlineUsers = new Map();

    wss.on('connection', async (socket, req) => {
        console.log("✅ New Client connected ");
        const onlineUsers = new Map();


        const cookies = req.headers.cookie;
        const parsedCookies = cookie.parseCookie(cookies || "");
        const token = parsedCookies.token;



        const user = await tokenVerification(token);


        if (!user) {
            socket.close(1008, "Unauthorized");
            return;
        }
        socket.userId = user._id.toString();
        // Heartbeat
        //     // Used to detect dead connections
        //     // Server sends ping
        //     // Client replies pong
        //     // If no pong → connection is dead


        socket.isAlive = true;
        socket.on("pong", () => (socket.isAlive = true));

        socket.on('message', async (rawData) => {


            let data;
            try {
                data = JSON.parse(rawData.toString());
            } catch (err) {
                console.log("parsing error", err)
                return;
            }
            if (!data) return;
            const { conversationId, content, type } = data;

            if (!conversationId) {
                return;
            }

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



            switch (type) {


                case "typing": {
                    if (!socket.userId) return
                    if (!conversation.members.some(
                        member => member.toString() === socket.userId
                    )) {
                        console.log("user is not part of this conversation")
                        return;
                    }

                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            // Sends message to each active socket
                            client.send(JSON.stringify({

                                type: "typing",
                                members: conversation.members,
                                content: `Typing ${socket.userId}`,
                                createdAt: new Date(),

                            }))
                        }
                    });

                    break;
                }
                case "message": {

                    if (typeof content !== String) {
                        console.error("Content should be in the String ");


                    }
                    if (content.trim().length === 0 || content.length > 10000) {
                        return;
                    }

                    // Finds all sockets of a user
                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            // Sends message to each active socket
                            client.send(JSON.stringify({

                                type: "message",
                                members: conversation.members,
                                content: content,
                                createdAt: new Date(),

                            }))
                        }
                    });

                    break;

                }
            }

            // The rawMessage parameter is raw binary data (a Buffer in Node.js) or bytes received over the network.



        })
        socket.on('error', (err) => {
            console.log("error", err)
        })


        socket.on("close", () => clearInterval(interval));
    })
}


// Heartbeat interval
// You don’t manually code “pong” on client
// WebSocket protocol automatically handles ping/pong


// req contains the header , cookies, ip addresses from the upgrade requesrt  


// Store users → (userId → Set of sockets for multi-device support)

// const clients = new Map();   



// const broadcast = (payload, excludeWs = null) => {
//     wss.clients.forEach((client) => {
//         if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(payload));
//         }
//     });
// };


// // Prevents server crash if invalid JSON is received
// // JSON.parse("random text") ❌ → server crash
// const safeParse = (data) => {
//     try {
//         return JSON.parse(data);
//     } catch {
//         return null;
//     }
// };

// const sendToUser = (userId, payload) => {
//     const sockets = clients.get(userId);
//     // If user is offline → do nothing
//     if (!sockets) return;

//     sockets.forEach((ws) => {
//       
//         if (ws.readyState === WebSocket.OPEN) {
//           
//             ws.send(JSON.stringify(payload));
//         }
//     });
// };

// wss.on("connection", (ws) => {
//     console.log("New client connected");

//     let currentUserId = null;

//    


//     ws.on("message", (data) => {
//         const parsed = safeParse(data);
//         if (!parsed) return;

//         const { type } = parsed;

//         switch (type) {
//             case "register": {
//                 const { userId } = parsed;
//                 if (!userId) return;

//                 currentUserId = userId;

//                 if (!clients.has(userId)) {
//                     clients.set(userId, new Set());
//                 }

//                 clients.get(userId).add(ws);

//                 console.log(`User ${userId} connected`);

//                 // 🔥 send current online users to THIS user
//                 ws.send(JSON.stringify({
//                     type: "online-users",
//                     users: Array.from(clients.keys())
//                 }));

//                 // 🔥 notify everyone else
//                 broadcast({
//                     type: "online",
//                     userId
//                 });

//                 break;
//             }
//             case "message": {
//                 const { receiverId, text, senderId } = parsed;

//                 if (!receiverId || !text || !senderId) return;

//                 sendToUser(receiverId, {
//                     type: "message",
//                     text,
//                     senderId,
//                     createdAt: new Date(),
//                 });

//          
//             }
//             case "typing": {
//                 const { receiverId, senderId, isTyping } = parsed;

//                 if (!receiverId || !senderId) return;

//                 sendToUser(receiverId, {
//                     type: "typing",
//                     senderId,
//                     isTyping
//                 });

//                 break;
//             }
//             default:
//                 console.log("Unknown message type:", type);
//         }
//     });

//     ws.on("close", () => {
//         if (!currentUserId) return;

//         const userSockets = clients.get(currentUserId);
//         if (userSockets) {
//             userSockets.delete(ws);

//             if (userSockets.size === 0) {
//                 clients.delete(currentUserId);
//                 // 🔥 Notify everyone ONLY when fully offline
//                 broadcast({
//                     type: "offline",
//                     userId: currentUserId,
//                 });
//             }
//         }

//         console.log(`User ${currentUserId} disconnected`);
//     });

//     ws.on("error", (err) => {
//         console.error("WebSocket error:", err.message);
//     });
// });

// // Heartbeat interval
// // You don’t manually code “pong” on client
// // WebSocket protocol automatically handles ping/pong
// const interval = setInterval(() => {
//     wss.clients.forEach((ws) => {
//         if (!ws.isAlive) return ws.terminate();
//         ws.isAlive = false;
//         // → sends heartbeat
//         ws.ping();
//     });
// }, 30000);

// wss.on("close", () => clearInterval(interval));

// module.exports = wss;




