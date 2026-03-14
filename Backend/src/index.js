require("dotenv").config();
const express = require("express");
const CodeSarthi = require("./configs/Database");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.AT_FRONT,
        // origin: process.env.AT_SYSTEM_API,
        credentials: true
    })
);

const authRouter = require("./routes/authentication");
const profileRouter = require("./routes/profRouter");
const requestRouter = require("./routes/request");
const userPreference = require("./routes/userPreferennce");
const passwordManagment = require("./routes/passwordManagment");
const chatRouter = require("./routes/chatController");
const fileUpload = require("./routes/profilePic")
const redis = require("./configs/redis")
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userPreference);
app.use("/", passwordManagment);
app.use("/", fileUpload);
app.use("/", chatRouter);


const PORT = process.env.PORT || 8000;
(async () => {
    try {
        await CodeSarthi();
        console.log("✅ Database connected successfully");
        app.listen(PORT, () => { console.log(`🚀 Server running at http://localhost:${PORT}`); });

        await redis.connect(); // 🔥 VERY IMPORTANT
    } catch (error) {
        console.error("❌ Database connection failed:", error.message); process.exit(1);
    }
})();