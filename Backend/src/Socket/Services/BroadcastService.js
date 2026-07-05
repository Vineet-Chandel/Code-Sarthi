const WebSocket = require("ws");
const OnlineUserManager = require("./OnlineUserManager");

const broadcastService = (participants, payload) => {
    console.log("📡 Broadcast Service Called");
    console.log("Participants:", participants);

    participants.forEach((member) => {

        console.log("➡️ Member:", member.toString());

        const sockets = OnlineUserManager.getSocket(member.toString());

        console.log("Sockets:", sockets);

        if (!sockets) {
            console.log("❌ No sockets");
            return;
        }

        sockets.forEach((clientSocket) => {

            console.log("ReadyState:", clientSocket.readyState);

            if (clientSocket.readyState === WebSocket.OPEN) {
                console.log("✅ Sending");
                clientSocket.send(JSON.stringify(payload));
            }

        });

    });

    console.log("🏁 Finished");
};

module.exports = { broadcastService };