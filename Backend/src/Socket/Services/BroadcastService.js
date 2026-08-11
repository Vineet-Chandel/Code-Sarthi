const WebSocket = require("ws");
const OnlineUserManager = require("./OnlineUserManager");

const broadcastService = (participants, payload) => {

    participants.forEach((member) => {

        const userId = member._id.toString();

        console.log("Trying user:", userId);

        const sockets = OnlineUserManager.getSockets(userId);

        console.log("Sockets:", sockets);
        console.log("Socket count:", sockets.size);

        if (sockets.size === 0) {
            console.log(`❌ User Offline: ${userId}`);
            return;
        }

        sockets.forEach((clientSocket) => {

            console.log(
                "Socket state:",
                clientSocket.readyState
            );

            if (clientSocket.readyState === WebSocket.OPEN) {

                clientSocket.send(
                    JSON.stringify(payload)
                );

                console.log(
                    `📤 Message sent to ${userId}`
                );

            } else {

                console.log(
                    `❌ Socket not open: ${userId}`
                );

            }

        });

    });
};

module.exports = { broadcastService };