const onlineUsers = new Map();

const normalizeUserId = (userId) => {
    return userId?.toString();
};

const getOnlineUsers = () => {
    return onlineUsers;
};

const getSockets = (userId) => {
    userId = normalizeUserId(userId);

    return onlineUsers.get(userId) || new Set();
};

const addSocket = (userId, socket) => {
    userId = normalizeUserId(userId);

    if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
    }

    onlineUsers.get(userId).add(socket);

    console.log(`🟢 Added socket for ${userId}`);
    debug();
};

const removeSocket = (userId, socket) => {
    userId = normalizeUserId(userId);

    const sockets = onlineUsers.get(userId);

    if (!sockets) return;

    sockets.delete(socket);

    if (sockets.size === 0) {
        onlineUsers.delete(userId);
    }

    debug();
};

const isOnline = (userId) => {
    userId = normalizeUserId(userId);

    const sockets = onlineUsers.get(userId);

    return !!sockets && sockets.size > 0;
};

const debug = () => {
    console.log("========== ONLINE USERS ==========");

    onlineUsers.forEach((sockets, userId) => {
        console.log(`${userId} -> ${sockets.size} socket(s)`);
    });

    console.log("==================================");
};

module.exports = {
    getOnlineUsers,
    getSockets,
    addSocket,
    removeSocket,
    isOnline,
    debug
};