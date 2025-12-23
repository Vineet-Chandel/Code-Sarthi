const express = require("express");
const CodeSarthi = require("./configs/Database");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authentication");
const profileRouter = require("./routes/profRouter");
const requestRouter = require("./routes/request");
const userPreference = require("./routes/userPreferennce");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userPreference);


const PORT = process.env.PORT || 3000;
(async () => {
    try {
        await CodeSarthi();
        console.log("✅ Database connected successfully");
        app.listen(PORT, () => { console.log(`🚀 Server running at http://localhost:${PORT}`); });
    } catch (error) {
        console.error("❌ Database connection failed:", error.message); process.exit(1);
    }
})();