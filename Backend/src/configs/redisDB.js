const { createClient } = require("redis");

const redis = createClient({
    url: process.env.REDIS_URL,
});

module.exports = { redis };
