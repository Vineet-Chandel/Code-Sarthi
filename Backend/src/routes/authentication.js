const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { userAuth } = require("../middlewares/userAuth");

const redis = require("../configs/redis");
const crypto = require("crypto")
const { Resend } = require('resend');

const resend = new Resend("re_AgE7BCRT_JQiKrPvbDLJyFYRNBtUf3X2Q");


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
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 8 * 60 * 60 * 1000
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
                dateOfPasswordChange: user.dateOfPasswordChange
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
                secure: true,
                sameSite: "none",
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
                    dateOfPasswordChange: user.dateOfPasswordChange
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
//email verification
//get otp
authRouter.get("/auth/verify-email", userAuth, async (req, res) => {
    try {
        /* ----------------  USER MAIL  ---------------- */
        const { gmail: userGmail, isVerified, firstName, lastName } = req.user;

        if (isVerified) {
            return res.status(400).json({
                success: false,
                message: "User is already verified"
            });
        }
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
            EX: 300 // 5 minutes
        });

        /* ---------------- RATE LIMITING ---------------- */
        const rateKey = `otp:rate:${userGmail}`;
        const attempts = await redis.incr(rateKey);
        if (attempts === 1) {
            await redis.expire(rateKey, 300);
        }
        if (attempts > 3) {
            return res.status(429).json({
                success: false,
                message: "Too many OTP requests. Try again later.",
            });
        }




        const { data, error } = await resend.emails.send({
            from: 'CodeSarthi <nova@codesarthi.in>',
            to: [userGmail],
            subject: "Your Verification Code",
            html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

                <!-- Preheader (hidden preview text) -->
                <div
                    style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
                    Your CodeSarthi verification code is {{OTP}} — expires in 2 minutes.
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:32px 16px;">
                    <tr>
                        <td align="center">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="max-width:520px; border-radius:16px; overflow:hidden; border:1px solid #dde0f5; box-shadow:0 8px 40px rgba(79,70,229,0.08);">

                                <!-- ===== HEADER ===== -->
                                <tr>
                                    <td style="background:#1a1a2e; padding:28px 32px; text-align:center;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="background:#0d0d1a; border-radius:14px; padding:10px 20px;">
                                                    <table cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td
                                                                style="background:#667eea; border-radius:8px; width:36px; height:36px; text-align:center; vertical-align:middle;">
                                                                <span
                                                                    style="font-size:16px; font-weight:700; color:#ffffff; line-height:36px; display:block;">CS</span>
                                                            </td>
                                                            <td
                                                                style="padding-left:10px; font-size:20px; font-weight:700; color:#ffffff; letter-spacing:0.3px;">
                                                                CodeSarthi
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">EMAIL
                                            VERIFICATION</p>
                                    </td>
                                </tr>

                                <!-- ===== BODY ===== -->
                                <tr>
                                    <td style="background:#ffffff; padding:36px 32px;">

                                        <!-- Greeting -->
                                        <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#1a1a2e;">
                                            Verify your email address
                                        </h1>
                                        <p style="margin:0 0 24px; font-size:14px; color:#7a7fa8; line-height:1.6;">
                                            Hello, <strong style="color:#2d3060;">${firstName} ${lastName}</strong> 👋 — We received a request
                                            to verify your identity. Please use the code below to complete the process.
                                        </p>

                                        <!-- Info: Email -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                            style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                            <tr>
                                                <td style="padding:12px 16px;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="width:32px;">
                                                                <div
                                                                    style="width:32px; height:32px; background:#eef0ff; border-radius:8px; text-align:center; line-height:32px; font-size:15px;">
                                                                    👤</div>
                                                            </td>
                                                            <td style="padding-left:10px;">
                                                                <p
                                                                    style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                                    Registered as</p>
                                                                <p
                                                                    style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                                    ${userGmail}</p>
                                                            </td>

                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- Info: Time -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                            style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:24px;">
                                            <tr>
                                                <td style="padding:12px 16px;">
                                                    <table cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="width:32px;">
                                                                <div
                                                                    style="width:32px; height:32px; background:#fff7ed; border-radius:8px; text-align:center; line-height:32px; font-size:15px;">
                                                                    🕐</div>
                                                            </td>
                                                            <td style="padding-left:10px;">
                                                                <p
                                                                    style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                                    Requested at</p>
                                                                <p
                                                                    style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                                    ${new Date().toLocaleString([], {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })} IST</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Divider -->
                                        <hr style="border:none; height:1px; background:#eef0fb; margin:0 0 24px;">

                                        <!-- OTP Label -->
                                        <p
                                            style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px; text-align:center;">
                                            Your one-time verification code
                                        </p>

                                        <!-- OTP Box -->
                                        <table align="center" cellpadding="0" cellspacing="0" border="0"
                                            style="margin-bottom:10px; width:100%;">
                                            <tr>
                                                <td
                                                    style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%); border-radius:14px; padding:28px 24px; text-align:center;">
                                                    <table align="center" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <!-- Each OTP digit rendered in its own cell -->
                                                         ${otp.split("").map(digit => `
            <td style="padding:0 4px;">
              <div style="
                background:rgba(255,255,255,0.25);
                border:1px solid rgba(255,255,255,0.4);
                border-radius:12px;
                width:44px;
                height:44px;
                text-align:center;
                line-height:44px;
                box-shadow:0 4px 12px rgba(0,0,0,0.15);
              ">
                <span style="
                  font-size:20px;
                  font-weight:700;
                  color:#ffffff;
                ">
                  ${digit}
                </span>
              </div>
            </td>
            `).join("")}
                                                        </tr>
                                                    </table>
                                                    <p style="margin:12px 0 0; font-size:13px; color:rgba(255,255,255,0.75);">Enter
                                                        this code on the verification page</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Expiry -->
                                        <p
                                            style="margin:0 0 24px; font-size:13px; color:#ef4444; font-weight:600; text-align:center;">
                                            ● &nbsp;This code expires in <strong>2 minutes</strong>
                                        </p>

                                        <!-- Security Notice -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                            style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; margin-bottom:20px;">
                                            <tr>
                                                <td style="padding:14px 16px;">
                                                    <table cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="font-size:18px; vertical-align:top; padding-right:12px;">🔒
                                                            </td>
                                                            <td style="font-size:13px; color:#78350f; line-height:1.5;">
                                                                <strong>Security notice:</strong> CodeSarthi will never ask for this
                                                                code via phone, chat, or email. Never share it with anyone — not
                                                                even our team.
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Ignore notice -->
                                        <p style="margin:0; font-size:13px; color:#9b9fc4; text-align:center; line-height:1.6;">
                                            Didn't request this? You can safely ignore this email, or
                                            <a href="mailto:support@codesarthi.com"
                                                style="color:#4f46e5; font-weight:600; text-decoration:none;">contact our support
                                                team</a>
                                            if something seems wrong.
                                        </p>

                                    </td>
                                </tr>

                                <!-- ===== FOOTER ===== -->
                                <tr>
                                    <td
                                        style="background:#f7f8ff; border-top:1px solid #eef0fb; padding:24px 32px; text-align:center;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0"
                                            style="margin-bottom:14px;">
                                            <tr>
                                                <td style="padding:0 12px;">
                                                    <a href="https://codesarthi.com/help"
                                                        style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Help
                                                        Center</a>
                                                </td>
                                                <td style="font-size:13px; color:#dde0f5;">|</td>
                                                <td style="padding:0 12px;">
                                                    <a href="https://codesarthi.com/privacy"
                                                        style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Privacy
                                                        Policy</a>
                                                </td>
                                                <td style="font-size:13px; color:#dde0f5;">|</td>
                                                <td style="padding:0 12px;">
                                                    <a href="mailto:support@codesarthi.com"
                                                        style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Contact
                                                        Support</a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="margin:0; font-size:12px; color:#b0b4d4; line-height:1.6;">
                                            © 2026 CodeSarthi &nbsp;·&nbsp; Kanpur, Uttar Pradesh, India<br>
                                            This is an automated message. Please do not reply directly to this email.
                                        </p>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                </table>

            </body>`,
        });

        if (error) {
            return console.error({ error });
        }

        console.log({ data });


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
authRouter.post("/auth/verify-email", userAuth, async (req, res) => {
    try {
        const targetUser = req.user;
        const { toVerifyotp } = req.body;
        /* ----------------  USER MAIL  ---------------- */
        const userGmail = targetUser.gmail;
        const firstName = targetUser.firstName;
        const lastName = targetUser.lastName;
        const username = targetUser.username;
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
            const isOtpValid = await bcrypt.compare(
                toVerifyotp,
                storedOtpHash,
            );
            if (isOtpValid) {

                if (targetUser.isVerified === false) {
                    targetUser.isVerified = true;
                    await targetUser.save();
                }
                await redis.del(otpKey);



                const { data, error } = await resend.emails.send({
                    from: 'CodeSarthi <nova@codesarthi.in>',
                    to: [userGmail],
                    subject: "Your Email Verification Status",
                    html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Your CodeSarthi email has been verified successfully. Welcome aboard!
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:32px 16px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="max-width:520px; border-radius:16px; overflow:hidden; border:1px solid #dde0f5; box-shadow:0 8px 40px rgba(79,70,229,0.08);">

                    <!-- ===== HEADER ===== -->
                    <tr>
                        <td style="background:#1a1a2e; padding:28px 32px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="background:#0d0d1a; border-radius:14px; padding:10px 20px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="background:#667eea; border-radius:8px; width:36px; height:36px; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:16px; font-weight:700; color:#ffffff; line-height:36px; display:block;">CS</span>
                                                </td>
                                                <td
                                                    style="padding-left:10px; font-size:20px; font-weight:700; color:#ffffff; letter-spacing:0.3px;">
                                                    CodeSarthi
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">ACCOUNT
                                VERIFICATION</p>
                        </td>
                    </tr>

                    <!-- ===== SUCCESS BANNER ===== -->
                    <tr>
                        <td style="background:#0f6e56; padding:32px 32px 28px; text-align:center;">

                            <!-- Check circle -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.15); border:2px solid rgba(255,255,255,0.35); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#1d9e75; text-align:center; vertical-align:middle;">
                                                    <!-- Checkmark as table cell trick for email clients -->
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#10003;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Email verified successfully!
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.75);">
                                Your account is now active and ready to use
                            </p>
                        </td>
                    </tr>

                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Welcome to CodeSarthi, <strong style="color:#1a1a2e;">${firstName} ${lastName}</strong>
                                🎉<br>
                                Your email address has been confirmed and your account is fully set up. Here's a summary
                                of what was verified.
                            </p>

                            <!-- Info: Email -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:12px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:32px;">
                                                    <div
                                                        style="width:32px; height:32px; background:#eef0ff; border-radius:8px; text-align:center; line-height:32px; font-size:15px;">
                                                        👤</div>
                                                </td>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                        Verified account</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${userGmail}</p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#e1f5ee; color:#085041; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Verified</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>



                            <!-- Info: Time -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:12px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="width:32px;">
                                                    <div
                                                        style="width:32px; height:32px; background:#fff7ed; border-radius:8px; text-align:center; line-height:32px; font-size:15px;">
                                                        🕐</div>
                                                </td>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                        Verified at</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${new Date().toLocaleString([], {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })} IST</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Info: Account ID -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:12px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:32px;">
                                                    <div
                                                        style="width:32px; height:32px; background:#eef0ff; border-radius:8px; text-align:center; line-height:32px; font-size:15px;">
                                                        🆔</div>
                                                </td>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                        Account Username</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600; font-family:'Courier New',monospace;">
                                                        ${username}</p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#eef0ff; color:#4f46e5; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Active</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Divider -->
                            <hr style="border:none; height:1px; background:#eef0fb; margin:0 0 24px;">

                            <!-- Next Steps -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                What's next for you</p>

                            <!-- Step 1 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                                <tr>
                                    <td style="width:28px; vertical-align:top; padding-top:1px;">
                                        <div
                                            style="width:28px; height:28px; border-radius:50%; background:#4f46e5; text-align:center; line-height:28px; font-size:13px; font-weight:700; color:#ffffff;">
                                            1</div>
                                    </td>
                                    <td style="padding-left:14px;">
                                        <p style="margin:0 0 2px; font-size:14px; font-weight:700; color:#1a1a2e;">
                                            Complete your profile</p>
                                        <p style="margin:0; font-size:13px; color:#7a7fa8; line-height:1.5;">Add your
                                            skills, bio, and a profile photo to get personalised recommendations.</p>
                                    </td>
                                </tr>
                            </table>



                            <!-- Step 2 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                                <tr>
                                    <td style="width:28px; vertical-align:top; padding-top:1px;">
                                        <div
                                            style="width:28px; height:28px; border-radius:50%; background:#4f46e5; text-align:center; line-height:28px; font-size:13px; font-weight:700; color:#ffffff;">
                                            2</div>
                                    </td>
                                    <td style="padding-left:14px;">
                                        <p style="margin:0 0 2px; font-size:14px; font-weight:700; color:#1a1a2e;">Join
                                            the community</p>
                                        <p style="margin:0; font-size:13px; color:#7a7fa8; line-height:1.5;">Connect
                                            with fellow developers, join discussions, and start your new coding journey
                                            with CodeSarthi.</p>
                                    </td>
                                </tr>
                            </table>


                            <!-- Step 3 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                                <tr>
                                    <td style="width:28px; vertical-align:top; padding-top:1px;">
                                        <div
                                            style="width:28px; height:28px; border-radius:50%; background:#4f46e5; text-align:center; line-height:28px; font-size:13px; font-weight:700; color:#ffffff;">
                                            3</div>
                                    </td>
                                    <td style="padding-left:14px;">
                                        <p style="margin:0 0 2px; font-size:14px; font-weight:700; color:#1a1a2e;">
                                            Explore Shastra AI</p>
                                        <p style="margin:0; font-size:13px; color:#7a7fa8; line-height:1.5;">Explore the
                                            exciting features of Shastra AI and enhance your coding experience. Now you
                                            can also create the AI automated resume builder.</p>
                                    </td>
                                </tr>
                            </table>



                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center">
                                        <a href="https://www.codesarthi.in/app/dashboard"
                                            style="display:inline-block; background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%); color:#ffffff; text-decoration:none; border-radius:12px; padding:16px 40px; font-size:15px; font-weight:700; letter-spacing:0.3px;">
                                            Go to your dashboard &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Security warning -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; margin-top:20px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="font-size:18px; vertical-align:top; padding-right:12px; padding-top:1px;">
                                                    🔒</td>
                                                <td style="font-size:13px; color:#78350f; line-height:1.5;">
                                                    <strong>Didn't verify this?</strong> If you didn't perform this
                                                    action, your account may be at risk. Please
                                                    <a href="{{RESET_PASSWORD_URL}}"
                                                        style="color:#4f46e5; font-weight:600; text-decoration:none;">reset
                                                        your password immediately</a>
                                                    and contact our support team.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Support email -->
                            <p
                                style="margin:20px 0 0; font-size:13px; color:#9b9fc4; text-align:center; line-height:1.6;">
                                Questions? Reach us at
                                <a href="mailto:support@codesarthi.com"
                                    style="color:#4f46e5; font-weight:600; text-decoration:none;">codesarthi.help@gmail.com</a>
                            </p>

                        </td>
                    </tr>

                    <!-- ===== FOOTER ===== -->
                    <tr>
                        <td
                            style="background:#f7f8ff; border-top:1px solid #eef0fb; padding:24px 32px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:14px;">
                                <tr>
                                    <td style="padding:0 12px;">
                                        <a href="https://codesarthi.com/help"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Help
                                            Center</a>
                                    </td>
                                    <td style="font-size:13px; color:#dde0f5;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="https://codesarthi.com/privacy"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Privacy
                                            Policy</a>
                                    </td>
                                    <td style="font-size:13px; color:#dde0f5;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="mailto:support@codesarthi.com"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Contact
                                            Support</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin:0; font-size:12px; color:#b0b4d4; line-height:1.6;">
                                © 2026 CodeSarthi &nbsp;·&nbsp; Kanpur, Uttar Pradesh, India<br>
                                This is an automated message. Please do not reply directly to this email.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>`,
                });
                res.status(200).json({
                    success: true,
                    message: "Email verified"
                })

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