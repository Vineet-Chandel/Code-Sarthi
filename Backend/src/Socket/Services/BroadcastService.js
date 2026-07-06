const WebSocket = require("ws");
const OnlineUserManager = require("./OnlineUserManager");

const broadcastService = (participants, payload) => {


    participants.forEach((member) => {



        const sockets = OnlineUserManager.getSocket(member.toString());



        if (!sockets) {

            return;
        }

        sockets.forEach((clientSocket) => {



            if (clientSocket.readyState === WebSocket.OPEN) {

                clientSocket.send(JSON.stringify(payload));
            }

        });

    });


};

module.exports = { broadcastService };