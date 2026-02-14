const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/userAuth");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");
const sendMail = require("../configs/sendMail");
const redis = require("../configs/redis");
const crypto = require("crypto");

profileRouter.get("/profile/me", userAuth, async (req, res) => {
    try {
        const user = req.user;

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please Re-Login"
            });
        }
        res.status(200).json({
            success: true,
            DATA: {
                identity: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                username: user.username,
                age: user.age,
                gender: user.gender,
                photoUrl: user.photoUrl,
                about: user.about,
                college: user.college,
                skills: user.skills,
                profession: user.profession,
                gmail: user.gmail,
                isVerified: user.isVerified,
            }

        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
profileRouter.patch("/profile/me", userAuth, async (req, res) => {
    try {

        validateEditProfileData(req);

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.status(200).json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: {
                firstName: loggedInUser.firstName,
                middleName: loggedInUser.middleName,
                lastName: loggedInUser.lastName,
                age: loggedInUser.age,
                gender: loggedInUser.gender,
                photoUrl: loggedInUser.photoUrl,
                about: loggedInUser.about,
                college: loggedInUser.college,
                skills: loggedInUser.skills,
                profession: loggedInUser.profession,
            },
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
profileRouter.post("/profile/update-identity", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Please re-login");
        }
        const gmailID = user.gmail;
        if (!gmailID) {
            throw new Error("Please re-login");
        }
        const changeGmailRateKey = `updateGmailOtp:rate:${gmailID}`;
        const gmailChangeOtpAttempts = await redis.incr(changeGmailRateKey);
        if (gmailChangeOtpAttempts === 1) {
            await redis.expire(changeGmailRateKey, 300);
        }
        if (gmailChangeOtpAttempts > 3) {
            return res.status(429).json({
                success: false,
                message: "Too many verification requests. Try again later.",
            });
        }
        /* ---------------- OTP GENERATION ---------------- */
        const changeGmailOtp = crypto.randomInt(100000, 999999).toString();
        const changeGmailOtpHash = await bcrypt.hash(changeGmailOtp, 5);
        /* ---------------- STORE OTP ---------------- */
        const changeGmailOtpKey = `updateGmailOtp:hash:${gmailID}`;
        await redis.set(changeGmailOtpKey, changeGmailOtpHash, {
            EX: 300 // 5 minutes
        });


        /* ----------------  SENDING GMAIL  ---------------- */
        await sendMail({
            gmail: gmailID,
            subject: "CodeSarthi Verification Code",
            html: `<body style="margin:0; padding:0; background-color:#f5f7ff; font-family:Arial, Helvetica, sans-serif;">
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
                                Hello ${user.firstName}  👋
                            </p>

                            <p style="margin:0 0 24px 0; font-size:15px; color:#718096; line-height:1.6;">
We received a request to acess you CodeSarthi Account ${user.gmail} through your email address. Your CodeSarthi verification code is :
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
                                           ${changeGmailOtp}
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
                                Sincerely you,<br>
                                The CodeSarthi Team
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
            message: "OTP sent successfully",
        });



    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
profileRouter.patch("/profile/update-identity", userAuth, async (req, res) => {
    try {

        const { enteredChangeGmailOtp, newGmail } = req.body;
        const user = req.user;
        if (!validator.isEmail(newGmail)) {
            throw new Error("New Email is not valid!");
        }
        if (!user) {
            throw new Error("Please re-login");
        }
        const gmailID = user.gmail;
        if (!gmailID) {
            throw new Error("Please re-login");
        }
        const oldID = gmailID;
        const newID = newGmail;

        const changeGmailOtpKey = `updateGmailOtp:hash:${gmailID}`;
        const exists = await redis.exists(changeGmailOtpKey);
        if (exists) {
            const storedOtpHash = await redis.get(changeGmailOtpKey);

            if (!storedOtpHash) {
                return res.status(400).json({
                    success: false,
                    message: "OTP expired"
                });
            }
            const isOtpValid = await bcrypt.compare(
                enteredChangeGmailOtp,
                storedOtpHash,
            );
            if (isOtpValid) {
                await sendMail({
                    gmail: user.gmail,
                    subject: "Security Alert",
                    html: `<body style="margin:0; padding:0; background-color:#f5f7ff; font-family:Arial, Helvetica, sans-serif;">
    
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
                                    Your Gmail was changed
                                </h1>
    
                                
    
                                <p style="margin:0 0 24px 0; font-size:15px; color:#718096; line-height:1.6;">
                                     The gmail for the CodeSarthi Account ${oldID} was changed to ${newID}.
                                </p>
    
                                <hr style="border:none; height:1px; background:#e2e8f0; margin:0 0 24px 0;">
    
                                <!-- SECURITY -->
                                <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                                    <tr>
    
                                        <td style="padding-left:8px; font-size:13px; color:#a0aec0;">
                                            🔒 <strong>Security Tip:</strong>Ingnore if you changed the gmail
                                        </td>
                                    </tr>
                                </table>
    
                                <p style="margin:0; font-size:13px; color:#a0aec0; line-height:1.5;">
                                    If you didn’t change the gmail you should change the password again by 
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
                                   Sincerely yours,<br>
                                   The CodeSarthi Team
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
                user.gmail = newGmail
                if (newGmail === gmailID) {
                    throw new Error("New email cannot be same as current email ")
                }
                if (user.isVerified === false) {
                    user.isVerified = true;
                }

                await user.save();
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Please Enter the valid otp"
                });

            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Please resend the OTP !"
            });
        }
        /* ----------------  SENDING GMAIL  ---------------- */

        await sendMail({
            gmail: newGmail,
            subject: "CodeSarthi Account was recovered sucessfully",
            html: `<body style="margin:0; padding:0; background-color:#f5f7ff; font-family:Arial, Helvetica, sans-serif;">
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
                                Account recovered sucessfully
                            </h1>

                            

                            <p style="margin:0 0 24px 0; font-size:15px; color:#718096; line-height:1.6;">
                                 This mail is just to inform you that your gmail has been update just few seconds back from ${oldID} to ${newID}
                            </p>

                            <hr style="border:none; height:1px; background:#e2e8f0; margin:0 0 24px 0;">

                            <!-- SECURITY -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                                <tr>

                                    <td style="padding-left:8px; font-size:13px; color:#a0aec0;">
                                        🔒 <strong>Security Tip:</strong>Ingnore if you changes the gmail
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0; font-size:13px; color:#a0aec0; line-height:1.5;">
                                If you didn’t change the gmail please change the password by either 
                                <a href="#" style="color:#667eea; text-decoration:none; font-weight:600;">
                                    Reset Password
                                </a> or <a href="#" style="color:#667eea; text-decoration:none; font-weight:600;">
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



        await redis.del(changeGmailOtpKey);
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });



    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});





profileRouter.delete("/profile/me/delete", userAuth, async (req, res) => {
    try {
        console.log(req.user._id);
        const deletedUser = await User.findByIdAndDelete(req.user._id);


        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found or already deleted"
            });
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
});
profileRouter.post("/userProfile/:userame", userAuth, async (req, res) => {
    try {
        const { OldPassword, NewPassword } = req.body;

        if (!OldPassword || !NewPassword) {
            throw new Error("Old and new password are required");
        }

        const user = req.user;

        const isOldPasswordCorrect = await user.validatePassword(OldPassword);
        if (!isOldPasswordCorrect) {
            throw new Error("Old password is incorrect");
        }
        if (!validator.isStrongPassword(NewPassword)) {
            throw new Error("New password is too weak")
        }
        const passwordHash = await bcrypt.hash(NewPassword, 10);
        user.password = passwordHash;
        await user.save();

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

module.exports = profileRouter;