const { Server } = require("socket.io");
const User = require("../models/user");
const Msg = require("../models/Msg");


const onlineUsers = newMap();
const typingUser = newMap();

const initialSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.AT_Front;
        }
    })
}