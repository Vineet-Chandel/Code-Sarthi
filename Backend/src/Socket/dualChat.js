// Setup WebSocket Server
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

// Store users → (userId → Set of sockets for multi-device support)
const clients = new Map();



const broadcast = (payload, excludeWs = null) => {
    wss.clients.forEach((client) => {
        if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
        }
    });
};


// Prevents server crash if invalid JSON is received
// JSON.parse("random text") ❌ → server crash
const safeParse = (data) => {
    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
};

const sendToUser = (userId, payload) => {
    const sockets = clients.get(userId);
    // If user is offline → do nothing
    if (!sockets) return;

    sockets.forEach((ws) => {
        // Finds all sockets of a user
        if (ws.readyState === WebSocket.OPEN) {
            // Sends message to each active socket
            ws.send(JSON.stringify(payload));
        }
    });
};

wss.on("connection", (ws) => {
    console.log("New client connected");

    let currentUserId = null;

    // Heartbeat
    // Used to detect dead connections
    // Server sends ping
    // Client replies pong
    // If no pong → connection is dead
    ws.isAlive = true;
    ws.on("pong", () => (ws.isAlive = true));

    ws.on("message", (data) => {
        const parsed = safeParse(data);
        if (!parsed) return;

        const { type } = parsed;

        switch (type) {
            case "register": {
                const { userId } = parsed;
                if (!userId) return;

                currentUserId = userId;

                if (!clients.has(userId)) {
                    clients.set(userId, new Set());
                }

                clients.get(userId).add(ws);

                console.log(`User ${userId} connected`);

                // 🔥 send current online users to THIS user
                ws.send(JSON.stringify({
                    type: "online-users",
                    users: Array.from(clients.keys())
                }));

                // 🔥 notify everyone else
                broadcast({
                    type: "online",
                    userId
                });

                break;
            }
            case "message": {
                const { receiverId, text, senderId } = parsed;

                if (!receiverId || !text || !senderId) return;

                sendToUser(receiverId, {
                    type: "message",
                    text,
                    senderId,
                    createdAt: new Date(),
                });

                break;
            }
            case "typing": {
                const { receiverId, senderId, isTyping } = parsed;

                if (!receiverId || !senderId) return;

                sendToUser(receiverId, {
                    type: "typing",
                    senderId,
                    isTyping
                });

                break;
            }
            default:
                console.log("Unknown message type:", type);
        }
    });

    ws.on("close", () => {
        if (!currentUserId) return;

        const userSockets = clients.get(currentUserId);
        if (userSockets) {
            userSockets.delete(ws);

            if (userSockets.size === 0) {
                clients.delete(currentUserId);
                // 🔥 Notify everyone ONLY when fully offline
                broadcast({
                    type: "offline",
                    userId: currentUserId,
                });
            }
        }

        console.log(`User ${currentUserId} disconnected`);
    });

    ws.on("error", (err) => {
        console.error("WebSocket error:", err.message);
    });
});

// Heartbeat interval
// You don’t manually code “pong” on client
// WebSocket protocol automatically handles ping/pong
const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (!ws.isAlive) return ws.terminate();
        ws.isAlive = false;
        // → sends heartbeat
        ws.ping();
    });
}, 30000);

wss.on("close", () => clearInterval(interval));

module.exports = wss;