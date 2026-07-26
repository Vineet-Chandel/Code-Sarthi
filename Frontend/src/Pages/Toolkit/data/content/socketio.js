export default {
  topics: [
    {
      id: "connection",
      title: "Connection",
      sections: [
        {
          heading: "Server setup (Node.js)",
          description: "Attach Socket.IO to an existing HTTP server. It handles the WebSocket upgrade automatically.",
          language: "javascript",
          code: `import { createServer } from "node:http";
import { Server } from "socket.io";
import express from "express";

const app    = express();
const server = createServer(app);
const io     = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
  });
});

server.listen(3000);`,
        },
        {
          heading: "Client setup (browser)",
          description: "Import the client library and connect to your server. The connection is established automatically.",
          language: "javascript",
          code: `import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: true,          // default
  reconnection: true,
  reconnectionDelay: 1000,
  auth: { token: localStorage.getItem("token") },
});

socket.on("connect", () => {
  console.log("Connected, id:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
});`,
        },
        {
          heading: "Namespaces",
          description: "Namespaces create separate communication channels on the same physical socket connection.",
          language: "javascript",
          code: `// Server — define namespaces
const chatNs  = io.of("/chat");
const adminNs = io.of("/admin");

chatNs.on("connection", (socket) => {
  console.log("Chat namespace:", socket.id);
});

adminNs.use((socket, next) => {
  if (isAdmin(socket.handshake.auth.token)) next();
  else next(new Error("Unauthorized"));
});

// Client — connect to a namespace
const chatSocket  = io("http://localhost:3000/chat");
const adminSocket = io("http://localhost:3000/admin", {
  auth: { token: "admin-token" },
});`,
        },
      ],
    },
    {
      id: "events",
      title: "Events",
      sections: [
        {
          heading: "Emitting & listening",
          description: "socket.emit() sends an event; socket.on() listens. Events are arbitrary named strings.",
          language: "javascript",
          code: `// Server — receive from client, send back
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log("Received:", data);
    // Emit back to sender only
    socket.emit("message:ack", { ok: true, id: data.id });
  });
});

// Client — send, then listen for acknowledgement
socket.emit("message", { id: 1, text: "Hello!" });
socket.on("message:ack", (ack) => {
  console.log("Server confirmed:", ack.id);
});`,
        },
        {
          heading: "Acknowledgements (callbacks)",
          description: "Pass a callback as the last argument to emit() for guaranteed one-time reply.",
          language: "javascript",
          code: `// Client — send with ack callback
socket.emit("create:post", { title: "Hello" }, (response) => {
  if (response.error) return console.error(response.error);
  console.log("Created post:", response.id);
});

// Server — call the callback to reply
socket.on("create:post", async (data, callback) => {
  try {
    const post = await db.posts.create(data);
    callback({ id: post.id });
  } catch (err) {
    callback({ error: err.message });
  }
});`,
        },
      ],
    },
    {
      id: "rooms",
      title: "Rooms",
      sections: [
        {
          heading: "Joining & leaving rooms",
          description: "Rooms are server-side groupings — a socket can be in multiple rooms simultaneously.",
          language: "javascript",
          code: `io.on("connection", (socket) => {
  // Join a room
  socket.join("room:general");
  socket.join(\`user:\${socket.userId}\`);

  // Leave a room
  socket.on("leave:channel", (channelId) => {
    socket.leave(\`channel:\${channelId}\`);
  });

  // List rooms the socket is in
  console.log(socket.rooms); // Set { socket.id, "room:general", ... }
});`,
        },
        {
          heading: "Broadcasting to rooms",
          description: "Target a room instead of a single socket to fan out messages to all members.",
          language: "javascript",
          code: `// To everyone in a room (including sender)
io.to("room:general").emit("announcement", { text: "Server restart in 5m" });

// To everyone in a room EXCEPT the sender
socket.to("room:general").emit("chat:message", {
  user: socket.username,
  text: "Hello everyone!",
});

// To multiple rooms at once
io.to("room:a").to("room:b").emit("event", data);

// To all connected clients
io.emit("broadcast", { message: "Hello everyone" });`,
        },
        {
          heading: "Room membership",
          description: "Fetch socket IDs in a room server-side for presence and occupancy features.",
          language: "javascript",
          code: `// Get all socket IDs in a room
const sockets = await io.in("room:general").fetchSockets();
const count   = sockets.length;

// Check if a room has members before emitting
const members = await io.in("room:abc").fetchSockets();
if (members.length > 0) {
  io.to("room:abc").emit("notification", data);
}`,
        },
      ],
    },
    {
      id: "middleware",
      title: "Middleware & Auth",
      sections: [
        {
          heading: "Socket middleware",
          description: "Run authentication logic before the connection event fires. Call next(err) to reject.",
          language: "javascript",
          code: `import jwt from "jsonwebtoken";

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Missing token"));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId   = payload.sub;
    socket.username = payload.name;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

// Now socket.userId is available in all event handlers
io.on("connection", (socket) => {
  console.log("User:", socket.username);
});`,
        },
      ],
    },
  ],
};
