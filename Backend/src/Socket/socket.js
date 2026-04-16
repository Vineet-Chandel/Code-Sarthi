//creating the web socket server 
const { Console } = require("console");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
wss.on("connection", (socket) => {
    console.log("Client connected");
    //sending the message to the client
    setInterval(() => {
        socket.send("Welcome to the WebSocket server , todays INR wrt to US Dollar is " + Math.random());
    }, 1000);
    socket.on("message", (message) => {
        if (message.toString() === "PING") {
            console.log("PONG");
            socket.send("PONG");
        } else if (message.toString() === "PONG") {
            console.log("PING");
            socket.send("PING");
        } else if (message.toString() === "HI THERE") {
            console.log("HI THERE");
            socket.send("HI THERE");
        } else {
            console.log("Unknown message");
            socket.send(`Unknown message ${message}`);
        }
    })
})
module.exports = wss;