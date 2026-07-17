const WebSocket = require("ws");
const OnlineUserManager = require("./OnlineUserManager");

const broadcastService = (participants, payload) => {



    participants.forEach((member) => {

        const sockets = OnlineUserManager.getSocket(member.toString());



        if (!sockets) {
            console.log("❌ User Offline");
            return;
        }

        sockets.forEach((clientSocket) => {



            if (clientSocket.readyState === WebSocket.OPEN) {




                clientSocket.send(JSON.stringify(payload));

            } else {

                console.log("❌ Socket not open");

            }

        });

    });

};

module.exports = { broadcastService };