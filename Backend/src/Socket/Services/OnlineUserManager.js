

const onlineUsers = new Map();

const getSocket = (userId) => {
    return onlineUsers.get(userId);
};


const getOnlineUsers = () => {





    return onlineUsers;

}


const addSocket = (userID, socket) => {

    if (!onlineUsers.has(userID)) {
        onlineUsers.set(userID, new Set());
    }

    // it will add the socket for the particular user ID
    onlineUsers.get(userID).add(socket);

}


const removeSocket = (userID, socket) => {
    if (onlineUsers.has(userID)) {
        onlineUsers.get(userID).delete(socket)


        if (onlineUsers.get(userID).size === 0) {
            onlineUsers.delete(userID);
        }
    }

}



const isOnline = (userID, socket) => {

    if (onlineUsers.has(userID)) {

        if (onlineUsers.get(userID).size !== 0) {
            return true;
        } else {
            return false;
        }
    }

}


const debug = (userID, socket) => {
    onlineUsers.forEach((sockets, userId) => {
        console.log(
            `${userId} -> ${sockets.size} socket(s)`
        );
    });
}








module.exports = { getOnlineUsers, getSocket, debug, addSocket, removeSocket, isOnline }