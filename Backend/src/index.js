require("dotenv").config();
const express = require("express");
const CodeSarthi = require("./configs/Database");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const http = require("http");
const server = http.createServer(app);
require("./Socket/dualChat")(server);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        // origin: process.env.AT_FRONT,
        origin: process.env.AT_SYSTEM_API,
        credentials: true
    })
);


const feedbackRouter = require("./routes/feedbackRoute");
const authRouter = require("./routes/authentication");
const profileRouter = require("./routes/profRouter");
const requestRouter = require("./routes/request");
const userPreference = require("./routes/userPreferennce");
const passwordManagment = require("./routes/passwordManagment");
const chatRouter = require("./routes/chatController");
const fileUpload = require("./routes/profilePic")
const redis = require("./configs/redis")
const cloudinary = require("cloudinary").v2;
const reviewRouter = require("./routes/review");
const aiWorkRouter = require("./routes/aiWork");
const newsletterRouter = require("./routes/newsLetterAPI");
const resRouter = require("./routes/resumeAPI");
const botRouter = require("./routes/bot.routes");
const goalsRouter = require("./routes/goalsRoute");
const schedulesRouter = require("./routes/schedulesRoute");
const teamRoutes = require("./routes/teamRoutes");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});


app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", requestRouter);
app.use("/api", userPreference);
app.use("/api", passwordManagment);
app.use("/api", fileUpload);
app.use("/api", chatRouter);
app.use("/api", feedbackRouter);
app.use("/api", reviewRouter);
app.use("/api", aiWorkRouter);
app.use("/api", newsletterRouter);
app.use("/api", resRouter);
app.use("/api", botRouter);
app.use("/api", goalsRouter);
app.use("/api", schedulesRouter);
app.use("/api/teams", teamRoutes);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userPreference);
app.use("/", passwordManagment);
app.use("/", fileUpload);
app.use("/", chatRouter);
app.use("/", feedbackRouter);
app.use("/", reviewRouter);
app.use("/", aiWorkRouter);
app.use("/", newsletterRouter);
app.use("/", resRouter);
app.use("/", botRouter);
app.use("/", goalsRouter);
app.use("/", schedulesRouter);
app.use("/teams", teamRoutes);
const PORT = process.env.PORT || 8000;

(async () => {
    try {
        await CodeSarthi();
        console.log("✅ Database connected successfully");

        await redis.connect();
        console.log("✅ Redis connected successfully");

        server.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Startup failed:", error.message);
        process.exit(1);
    }
})();