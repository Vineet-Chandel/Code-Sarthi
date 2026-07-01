

const broadcastService = (participants, payload) => {


    participants.forEach((member) => {



        const sockets = OnlineUserManager.getSocket(participants.toString());

        if (!sockets) return; // User is offline

        sockets.forEach((clientSocket) => {

            if (clientSocket.readyState === WebSocket.OPEN) {


                clientSocket.send(JSON.stringify(payload));
            }

        });

    });
}