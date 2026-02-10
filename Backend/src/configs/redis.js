const { createClient } = require("redis");

const redis = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
    console.log("✅ Redis connected");
});

redis.on("error", (err) => {
    console.error("❌ Redis Error:", err);
});

module.exports = redis;
