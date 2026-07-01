// // Heartbeat interval
// // You don’t manually code “pong” on client
// // WebSocket protocol automatically handles ping/pong
const interval = setInterval(() => {
    onlineUsers.forEach((sockets, userId) => {

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


// Heartbeat
//     // Used to detect dead connections
//     // Server sends ping
//     // Client replies pong
//     // If no pong → connection is dead


socket.isAlive = true;
socket.on("pong", () => (socket.isAlive = true));


