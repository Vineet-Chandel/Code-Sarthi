const express = require("express");
const passRoute = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const sendMail = require("../configs/sendMail");
const redis = require("../configs/redis");
const crypto = require("crypto")

//CHANGING PASSWORD API WHEN USER REMEMBERED THE PASS + LOGINED
passRoute.patch("/auth/reset-password", userAuth, async (req, res) => {
    try {
        // DATA 
        const { oldPassword, newPassword } = req.body;
        const { gmail } = req.user;

        //VALIDATION 
        if (!oldPassword || !newPassword) {
            throw new Error("Enter all the entries properly");
        }
        if (oldPassword === newPassword) {
            throw new Error("Password is as same as the old password");
        }


        //DIGGING OUT THE PRIVATE INFORMATION
        const targetUser = await User.findOne({ gmail: gmail.toLowerCase() }).select("+password");
        const { isVerified } = targetUser;

        if (!targetUser) {
            throw new Error("Something went wrong please re-login");
        }
        if (!isVerified) {
            throw new Error("Please verify your email first")
        }

        // OLD IS CORRECT OR NOT
        const isOldPasswordCorrect = await targetUser.validatePassword(oldPassword);
        if (!isOldPasswordCorrect) {
            throw new Error("Old password is incorrect");
        }
        //NEW IS MEETING OUR STANDARDS OR NOT 
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("New Password! iss too weak");
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        targetUser.password = passwordHash;
        await targetUser.save();
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});



//through gmail or username
passRoute.post("/auth/forgot-password", async (req, res) => {
    try {
        const { gmail, username } = req.body;
        const identifier = gmail || username;
        if (!gmail && !username) {
            throw new Error("Please enter gmail or username");
        }
        const user = await User.findOne({
            $or: [{ gmail: identifier }, { username: identifier }]
        })
        if (!user) {
            return res.json({
                success: true,
                message: "OTP sent if account exists"
            });
        }
        /* ---------------- RATE LIMITING ---------------- */
        const passRateKey = `forgotPassOtp:rate:${user._id}`;
        const passAttempts = await redis.incr(passRateKey);
        if (passAttempts === 1) {
            await redis.expire(passRateKey, 300);
        }
        if (passAttempts > 3) {
            return res.status(429).json({
                success: false,
                message: "Too many verification requests. Try again later.",
            });
        }
        /* ---------------- OTP GENERATION ---------------- */
        const passOtp = crypto.randomInt(100000, 999999).toString();
        const passOtpHash = await bcrypt.hash(passOtp, 5);
        /* ---------------- STORE OTP ---------------- */
        const passOtpKey = `forgotPassOtp:hash:${user._id}`;
        await redis.set(passOtpKey, passOtpHash, {
            EX: 300 // 5 minutes
        });


        //CREATING A SESSION
        const token = crypto.randomBytes(32).toString("hex");
        const passSession = `forgotPassOtp:session:${token}`;
        await redis.set(passSession, user._id.toString(), {
            EX: 300
        });
        /* ---------------- SEND EMAIL ---------------- */
        await sendMail({
            gmail: user.gmail,
            subject: "Your Password Verification Code",
            html: `<body style="margin:0; padding:0; background-color:#f5f7ff; font-family:Arial, Helvetica, sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
        Verify your email for CodeSarthi. Your verification code is {{OTP}}.
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:30px 20px;">
        <tr>
            <td align="center">

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:500px;">

                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="padding-bottom:30px;">
                            <table cellpadding="0" cellspacing="0" border="0"
                                style="background:#000000; border-radius:20px;">
                                <tr>
                                    <td style="padding:12px 24px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td>
                                                    <img src="https://res.cloudinary.com/dj0ivep44/image/upload/v1770692070/WhatsApp_Image_2026-02-08_at_09.56.39_jrys9v.jpg"
                                                        alt="CodeSarthi Logo" width="60" height="60"
                                                        style="border-radius:20px; display:block;">
                                                </td>
                                                <td
                                                    style="padding-left:10px; font-size:24px; font-weight:700; color:#ffffff;">
                                                    CodeSarthi
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CARD -->
                    <tr>
                        <td style="
              background:#ffffff;
              background:linear-gradient(145deg,#ffffff 0%,#f8f9ff 100%);
              border-radius:16px;
              border:1px solid #e0e4ff;
              padding:40px 32px;
              text-align:center;
              box-shadow:0 8px 30px rgba(102,126,234,0.1);
            ">

                            <h1 style="margin:0 0 16px 0; font-size:28px; color:#2d3748;">
                                Verify Your Identity
                            </h1>

                            <p style="margin:0 0 8px 0; font-size:16px; color:#4a5568;">
                                Hello there! 👋
                            </p>

                            <p style="margin:0 0 24px 0; font-size:15px; color:#718096; line-height:1.6;">
                                 Use the verification code below to reset your CodeSarthi Password
                            </p>

                            <!-- OTP BOX -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td style="
                    background:#667eea;
                    background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
                    padding:24px;
                    border-radius:12px;
                    text-align:center;
                    min-width:260px;
                  ">
                                        <div style="
                      font-size:36px;
                      font-weight:700;
                      letter-spacing:4px;
                      font-family:'Courier New', monospace;
                      color:#ffffff;
                    ">
                                           ${passOtp}
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 24px 0; font-size:14px; color:#e53e3e; font-weight:600;">
                                This code expires in <strong>5 minutes</strong>
                            </p>

                            <hr style="border:none; height:1px; background:#e2e8f0; margin:0 0 24px 0;">

                            <!-- SECURITY -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                                <tr>

                                    <td style="padding-left:8px; font-size:13px; color:#a0aec0;">
                                        🔒 <strong>Security Tip:</strong> Never share this code with anyone.
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0; font-size:13px; color:#a0aec0; line-height:1.5;">
                                If you didn’t request this email, please ignore it or
                                <a href="#" style="color:#667eea; text-decoration:none; font-weight:600;">
                                    contact support
                                </a>.
                            </p>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td align="center" style="padding-top:32px;">
                            <p style="margin:0 0 16px 0; font-size:14px; color:#718096;">
                                Need help?
                                <a href="#" style="color:#667eea; text-decoration:none;">
                                    Contact our support team
                                </a>
                            </p>

                            <p style="margin:0; font-size:12px; color:#a0aec0; line-height:1.5;">
                                © 2024 CodeSarthi. All rights reserved.<br>
                                Kanpur, Uttar Pradesh, India
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
`,
        });

        return res.json({
            success: true,
            message: "OTP sent successfully",
            token
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
passRoute.post("/auth/forgot-password/:token", async (req, res) => {
    try {

        const { token } = req.params;
        const { enteredOtpByUser } = req.body;

        const sessionKey = `forgotPassOtp:session:${token}`;
        const userID = await redis.get(sessionKey);
        if (!userID) {
            throw new Error("Session Expired");
        }

        /* ---------- GET OTP HASH ---------- */
        const otpKey = `forgotPassOtp:hash:${userID}`;
        const storedHash = await redis.get(otpKey);
        if (!storedHash) {
            throw new Error("OTP expired");
        }
        /* ---------- VERIFY OTP ---------- */
        const isPassOtpValid = await bcrypt.compare(
            enteredOtpByUser,
            storedHash,
        );
        if (!isPassOtpValid) {
            throw new Error("OTP is not valid")
        }
        await redis.del(sessionKey);
        await redis.del(otpKey);


        //CREATING A SESSION
        const token1 = crypto.randomBytes(32).toString("hex");
        const passChangeSession1 = `forgotPassOtp:passChangeSession:${token1}`;
        await redis.set(passChangeSession1, userID, {
            EX: 300
        });
        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            resetToken: token1
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
passRoute.patch("/auth/forgot-password/:token1", async (req, res) => {
    try {
        const { token1 } = req.params;

        const { newPassword } = req.body;
        //NEW IS MEETING OUR STANDARDS OR NOT 
        if (!newPassword) {
            throw new Error("New Password required");
        }
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("New Password! iss too weak");
        }
        const passChangeSessionKey = `forgotPassOtp:passChangeSession:${token1}`;
        const userID = await redis.get(passChangeSessionKey);
        if (!userID) {
            throw new Error("Session Expired");
        }
        const user = await User.findById(userID).select("+password");
        if (!user) {
            throw new Error("Invalid Credantials");
        }
        const isNewPassIsSame = await user.validatePassword(newPassword);

        if (isNewPassIsSame) {
            throw new Error("Entered password is same as the Old password")
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash;
        await user.save();
        await redis.del(passChangeSessionKey);

        await sendMail({
            gmail: user.gmail,
            subject: "Your Password Changed Sucessfully",
            html: `<body style="margin:0; padding:0; background-color:#f5f7ff; font-family:Arial, Helvetica, sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
        Verify your email for CodeSarthi. Your verification code is {{OTP}}.
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:30px 20px;">
        <tr>
            <td align="center">

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:500px;">

                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="padding-bottom:30px;">
                            <table cellpadding="0" cellspacing="0" border="0"
                                style="background:#000000; border-radius:20px;">
                                <tr>
                                    <td style="padding:12px 24px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td>
                                                    <img src="https://res.cloudinary.com/dj0ivep44/image/upload/v1770692070/WhatsApp_Image_2026-02-08_at_09.56.39_jrys9v.jpg"
                                                        alt="CodeSarthi Logo" width="60" height="60"
                                                        style="border-radius:20px; display:block;">
                                                </td>
                                                <td
                                                    style="padding-left:10px; font-size:24px; font-weight:700; color:#ffffff;">
                                                    CodeSarthi
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CARD -->
                    <tr>
                        <td style="
              background:#ffffff;
              background:linear-gradient(145deg,#ffffff 0%,#f8f9ff 100%);
              border-radius:16px;
              border:1px solid #e0e4ff;
              padding:40px 32px;
              text-align:center;
              box-shadow:0 8px 30px rgba(102,126,234,0.1);
            ">

                            <h1 style="margin:0 0 16px 0; font-size:28px; color:#2d3748;">
                                Password Changed Sucessfully
                            </h1>

                            <p style="margin:0 0 8px 0; font-size:16px; color:#4a5568;">
                                Hello there! 👋
                            </p>

                            <p style="margin:0 0 24px 0; font-size:15px; color:#718096; line-height:1.6;">
                                 This mail is just to inform you that your password has been reset just few seconds back
                            </p>

                            <hr style="border:none; height:1px; background:#e2e8f0; margin:0 0 24px 0;">

                            <!-- SECURITY -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                                <tr>

                                    <td style="padding-left:8px; font-size:13px; color:#a0aec0;">
                                        🔒 <strong>Security Tip:</strong>Ingnore if you changes the password
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0; font-size:13px; color:#a0aec0; line-height:1.5;">
                                If you didn’t change the password please change the password again by 
                                <a href="#" style="color:#667eea; text-decoration:none; font-weight:600;">
                                    Forgot Password
                                </a>.
                            </p>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td align="center" style="padding-top:32px;">
                            <p style="margin:0 0 16px 0; font-size:14px; color:#718096;">
                                Need help?
                                <a href="#" style="color:#667eea; text-decoration:none;">
                                    Contact our support team
                                </a>
                            </p>

                            <p style="margin:0; font-size:12px; color:#a0aec0; line-height:1.5;">
                                © 2024 CodeSarthi. All rights reserved.<br>
                                Kanpur, Uttar Pradesh, India
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
`,
        });
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

//throudh usernam

module.exports = passRoute;