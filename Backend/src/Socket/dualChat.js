// // Setup WebSocket Server

const WebSocket = require("ws");
const { WebSocketServer } = require("ws");
const Conversation = require("../models/conversation");
const { authenticateSocket } = require("./Auth/authenticateSocket");
const cookie = require("cookie");
const typingHandler = require("./Handlers/typingHandler");
const messageHandler = require("./Handlers/messageHandler");
const {
    getOnlineUsers,
    addSocket,
    removeSocket,
    getSocket,
    isOnline,
    debug
} = require("./Services/OnlineUserManager");

//connection event

module.exports = (server) => {

    const wss = new WebSocketServer({
        server
    });
    const allUser = getOnlineUsers()
    const interval = setInterval(() => {
        allUser.forEach((sockets, userId) => {

            sockets.forEach((ws) => {
                if (!ws.isAlive) {
                    ws.terminate();
                    return;
                }
                ws.isAlive = false;
                // → sends heartbeat
                ws.ping();
            });

        });
    }, 30000);

    wss.on('connection', async (socket, req) => {
        // req contains the header , cookies, ip addresses from the upgrade requesrt  

        socket.isAlive = true;

        socket.on("pong", () => {
            socket.isAlive = true;
        });
        console.log("✅ New Client connected ");

        const url = new URL(req.url, "http://localhost");

        let token = null;

        // Try cookie authentication first
        if (req.headers.cookie) {
            const parsedCookies = cookie.parse(req.headers.cookie);
            token = parsedCookies.token;
        }

        // If no cookie, try query parameter
        if (token === null) {
            token = url.searchParams.get("token");
        }


        const user = await authenticateSocket(token);


        if (!user) {
            socket.close(1008, "Unauthorized");
            return;
        }
        socket.userId = user._id.toString();


        addSocket(socket.userId, socket);

        debug();

        socket.on('message', async (rawData) => {

            let data;
            try {
                data = JSON.parse(rawData.toString());
            } catch (err) {
                console.log("parsing error", err)
                return;
            }
            if (!data) return;
            const { conversationId, content, type, isTyping, messageType, members, conversationType } = data;


            switch (type) {


                case "typing": {

                    await typingHandler(conversationId, socket, isTyping, messageType, members, conversationType)
                    break;
                }
                case "message": {
                    await messageHandler(conversationId, socket, content, messageType, members, conversationType)
                    break;

                } default: {
                    console.log("Unknown websocket event");

                    break;
                }
            }

            // The rawMessage parameter is raw binary data (a Buffer in Node.js) or bytes received over the network.
        })
        socket.on('error', (err) => {
            console.log("error", err)
        })
        socket.on("close", () => {

            removeSocket(socket.userId, socket);

        });
    })
    wss.on("close", () => {
        clearInterval(interval);
    });
}


