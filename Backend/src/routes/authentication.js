const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/userAuth");
const sendMail = require("../configs/sendMail");
const redis = require("../configs/redis");
const crypto = require("crypto")


//signUp
authRouter.post("/auth/signup", async (req, res) => {
    try {

        const { firstName, middleName, lastName, gmail, password, username, age, gender, college, profession, termsAccepted } = req.body;
        // Validation of data
        validateSignUpData(req.body);

        const existingGmailUser = await User.findOne({
            gmail
        });

        if (existingGmailUser) {
            return res.status(409).json({
                message: "Gmail already exists"
            });
        }
        const existingUsernameUser = await User.findOne({
            username
        });

        if (existingUsernameUser) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        //   Creating a new instance of the User model
        const user = new User({
            //Authentication
            gmail,
            password: passwordHash,
            termsAccepted,
            //Identity
            firstName,
            middleName,
            lastName,
            username,
            age,
            gender,
            college,
            profession,
        });

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token", token, {
            httpOnly: true,        // JS can't access it
            secure: true,          // HTTPS only (required in prod)
            sameSite: "strict",    // CSRF protection
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.status(201).json({
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
        res.status(400).json({ message: "Request Failed" + err.message });
    }
});
//sigin
authRouter.post("/auth/signin", async (req, res) => {
    try {
        const { gmail, password } = req.body;
        if (!gmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ gmail: gmail.toLowerCase() }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token, {
                // expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: true,          // JS can’t access it
                secure: true,            // HTTPS only
                sameSite: "strict",      // CSRF protection
                maxAge: 8 * 60 * 60 * 1000
            });
            res.status(200).json({
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
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    } catch (err) {
        res.status(400).json({ message: "Login Failed" });
    }
});
//signout
authRouter.post("/auth/signout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
});
// email verification
//get otp
authRouter.get("/auth/verify-email/get-otp", userAuth, async (req, res) => {
    try {
        /* ----------------  USER MAIL  ---------------- */
        const { gmail: userGmail } = req.user;
        if (!userGmail) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong"
            });
        }
        /* ---------------- OTP GENERATION ---------------- */
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpHash = await bcrypt.hash(otp, 10);


        /* ---------------- STORE OTP ---------------- */
        const otpKey = `otp:hash:${userGmail}`;
        await redis.set(otpKey, otpHash, {
            EX: 120 // 2 minutes
        });

        /* ---------------- RATE LIMITING ---------------- */
        const rateKey = `otp:rate:${userGmail}`;
        const attempts = await redis.incr(rateKey);
        if (attempts === 1) {
            await redis.expire(rateKey, 120);
        }
        if (attempts > 3) {
            return res.status(429).json({
                success: false,
                message: "Too many OTP requests. Try again later.",
            });
        }

        /* ---------------- SEND EMAIL ---------------- */
        await sendMail({
            gmail: userGmail,
            subject: "Your Verification Code",
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
                                Verify Your Email Address
                            </h1>

                            <p style="margin:0 0 8px 0; font-size:16px; color:#4a5568;">
                                Hello there! 👋
                            </p>

                            <p style="margin:0 0 24px 0; font-size:15px; color:#718096; line-height:1.6;">
                                Thank you for joining CodeSarthi! Use the verification code below to complete your
                                registration.
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
                                           ${otp}
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 24px 0; font-size:14px; color:#e53e3e; font-weight:600;">
                                This code expires in <strong>2 minutes</strong>
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
        res.status(200).json({
            success: true,
            message: "Verification send to email"
        })

    } catch (error) {
        console.error("Verify email error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send verification email"
        });
    }
});

//email verification 
//match otp
authRouter.post("/auth/verify-email/match-otp", userAuth, async (req, res) => {
    try {

        const { toVerifyOtpotp } = req.body;
        /* ----------------  USER MAIL  ---------------- */
        const { gmail: userGmail } = req.user;
        if (!userGmail) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong"
            });
        }

        const otpKey = `otp:hash:${userGmail}`;
        const exists = await redis.exists(otpKey);
        if (exists) {
            const storedOtpHash = await redis.get(otpKey, "otp");

            if (!storedOtpHash) {
                return res.status(400).json({
                    success: false,
                    message: "OTP expired"
                });
            }
            const isPasswordValid = await bcrypt.compare(
                toVerifyOtpotp,
                storedOtpHash,
            );
            if (isPasswordValid) {
                res.status(200).json({
                    success: true,
                    message: "Email verified"
                })
                await redis.del(otpKey);
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

    } catch (error) {
        console.error("Verify email error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to verify email"
        });
    }
});


module.exports = authRouter;