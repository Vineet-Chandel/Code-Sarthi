const express = require("express");
const passRoute = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const redis = require("../configs/redis");
const crypto = require("crypto")


const { Resend } = require('resend');

const resend = new Resend(String(process.env.RESEND_API_KEY));

//CHANGING PASSWORD API WHEN USER REMEMBERED THE PASS + LOGINED
passRoute.patch("/auth/reset-password", userAuth, async (req, res) => {
    try {
        // DATA 
        const { oldPassword, newPassword } = req.body;
        const { gmail, username, firstName, lastName } = req.user;

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

        targetUser.dateOfPasswordChange = Date.now();
        await targetUser.save();

        const { data, error } = await resend.emails.send({
            from: 'CodeSarthi <astra@codesarthi.in>',
            to: [gmail],
            subject: "Security Alert!",
            html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Security Alert: Your CodeSarthi password was just changed. If this wasn't you, secure your account immediately.
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
                            <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">SECURITY
                                ALERT</p>
                        </td>
                    </tr>

                    <!-- ===== ALERT BANNER ===== -->
                    <tr>
                        <td style="background:#7f1d1d; padding:28px 32px 24px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.1); border:2px solid rgba(255,255,255,0.25); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#b91c1c; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#128737;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Your password was changed
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.70);">
                                A security change was made to your CodeSarthi account
                            </p>
                        </td>
                    </tr>

                    <!-- ===== ALERT STRIP ===== -->
                    <tr>
                        <td
                            style="background:#fef2f2; border-bottom:2px solid #fca5a5; padding:14px 32px; text-align:center;">
                            <p style="margin:0; font-size:13px; color:#991b1b; font-weight:600;">
                                &#9888;&#65039; &nbsp; If you made this change, no action is needed. If not, act
                                immediately below.
                            </p>
                        </td>
                    </tr>

                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Hello, <strong style="color:#1a1a2e;">${firstName} ${lastName}</strong> 👋<br>
                                This is a confirmation that the password for your CodeSarthi account was successfully
                                changed. Review the details below and take action if this wasn't you.
                            </p>

                            <!-- Info: Account -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:12px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:32px;">
                                                    <div
                                                        style="width:32px; height:32px; background:#eef0ff; border-radius:8px; text-align:center; line-height:32px; font-size:15px;">
                                                        &#128100;</div>
                                                </td>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                        Account</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${gmail}</p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#fef2f2; color:#991b1b; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Password
                                                        Changed</span>
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
                                                        &#128336;</div>
                                                </td>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                        Changed at</p>
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

                            <!-- Action Steps Label -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                If this was NOT you — act now
                            </p>

                            <!-- Action 1 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:8px; vertical-align:top; padding-top:5px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#ef4444;">
                                                    </div>
                                                </td>
                                                <td style="padding-left:12px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:13px; font-weight:700; color:#1a1a2e;">
                                                        Reset your password immediately</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#7a7fa8; line-height:1.5;">
                                                        Use the "Forgot Password" flow to regain control before the
                                                        attacker locks you out.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Action 2 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:8px; vertical-align:top; padding-top:5px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#f97316;">
                                                    </div>
                                                </td>
                                                <td style="padding-left:12px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:13px; font-weight:700; color:#1a1a2e;">
                                                        Revoke all active sessions</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#7a7fa8; line-height:1.5;">
                                                        Log out all devices from your account security settings to
                                                        invalidate any unauthorised access tokens.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Action 3 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:8px; vertical-align:top; padding-top:5px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#eab308;">
                                                    </div>
                                                </td>
                                                <td style="padding-left:12px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:13px; font-weight:700; color:#1a1a2e;">
                                                        Contact our support team</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#7a7fa8; line-height:1.5;">
                                                        Report the incident to codesarthi.help@gmail.com so we can freeze
                                                        your account and investigate.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Primary CTA -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center">
                                        <a href="{{SECURE_ACCOUNT_URL}}"
                                            style="display:inline-block; background:#b91c1c; color:#ffffff; text-decoration:none; border-radius:12px; padding:16px 32px; font-size:15px; font-weight:700; letter-spacing:0.3px; width:80%; text-align:center;">
                                            I didn't do this — Secure my account &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Secondary CTA -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ACTIVITY_URL}}"
                                            style="display:inline-block; background:#f7f8ff; color:#4f46e5; text-decoration:none; border-radius:12px; padding:14px 32px; font-size:14px; font-weight:700; letter-spacing:0.3px; width:80%; text-align:center; border:1px solid #e4e6f8;">
                                            Review account activity
                                        </a>
                                    </td>
                                </tr>
                            </table>



                            <!-- Support -->
                            <p
                                style="margin:20px 0 0; font-size:13px; color:#9b9fc4; text-align:center; line-height:1.6;">
                                Need help? Reach us at
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
                                        <a href="https://www.codesarthi.in/help-center"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Help
                                            Center</a>
                                    </td>
                                    <td style="font-size:13px; color:#dde0f5;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="https://www.codesarthi.in/privacy-policy"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Privacy
                                            Policy</a>
                                    </td>
                                    <td style="font-size:13px; color:#dde0f5;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="mailto:codesarthi.help@gmail.com"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Contact
                                            Support</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin:0; font-size:12px; color:#b0b4d4; line-height:1.6;">
                                © 2026 CodeSarthi &nbsp;·&nbsp; Kanpur, Uttar Pradesh, India<br>
                                This is an automated security alert. Please do not reply directly to this email.
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
        const { gmail, username, } = req.body;
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

        const { data, error } = await resend.emails.send({
            from: 'CodeSarthi <astra@codesarthi.in>',
            to: [user.gmail],
            subject: "Your Verificat!ion code",
            html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Your CodeSarthi password reset code is ${passOtp} — expires in 10 minutes. If this wasn't you, secure your account
        now.
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
                            <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">PASSWORD
                                RESET REQUEST</p>
                        </td>
                    </tr>

                    <!-- ===== WARNING BANNER ===== -->
                    <tr>
                        <td style="background:#7c2d12; padding:28px 32px 24px; text-align:center;">

                            <!-- Lock icon ring -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.1); border:2px solid rgba(255,255,255,0.3); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#c2410c; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#128274;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Password reset requested
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.70);">
                                We received a request to reset your CodeSarthi password
                            </p>
                        </td>
                    </tr>

                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Hello, <strong style="color:#1a1a2e;">${user.firstName} ${user.lastName}</strong> 👋<br>
                                You requested a password reset for your account. Use the one-time code below to
                                proceed. If this wasn't you, please ignore this email and secure your account
                                immediately.
                            </p>

                            <!-- Info: Account -->
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
                                                        Account</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${user.gmail}</p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#fff1f2; color:#9f1239; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Reset
                                                        Pending</span>
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
                                Your password reset code
                            </p>

                            <!-- OTP Box — dark themed -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="width:100%; background:#1a1a2e; border-radius:14px; border:1px solid #2d2d4e; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:28px 24px; text-align:center;">
                                        <p
                                            style="margin:0 0 16px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                            Enter this code to reset your password</p>
                                        <table align="center" cellpadding="0" cellspacing="0" border="0"
                                            style="margin-bottom:14px;">
                                            <tr>
                                                ${passOtp.split("").map(digit => `
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
                                        <p style="margin:0; font-size:13px; color:#9b9fc4;">Do not share this code with
                                            anyone</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Expiry -->
                            <p
                                style="margin:0 0 24px; font-size:13px; color:#ef4444; font-weight:600; text-align:center;">
                                &#9679; &nbsp;This code expires in <strong>5 minutes</strong>
                            </p>

                            <!-- Warning: Wasn't you -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#fff7ed; border:1px solid #fed7aa; border-radius:10px; margin-bottom:14px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="font-size:18px; vertical-align:top; padding-right:12px; padding-top:1px;">
                                                    &#9888;&#65039;</td>
                                                <td style="font-size:13px; color:#7c2d12; line-height:1.5;">
                                                    <strong>Wasn't you?</strong> If you did not request a password
                                                    reset, your account may be compromised.
                                                    <span
                                                        style="color:#c2410c; font-weight:600; text-decoration:none;">Secure
                                                        your account now</span>
                                                    and contact our support team immediately.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Security tip -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; margin-bottom:20px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="font-size:18px; vertical-align:top; padding-right:12px; padding-top:1px;">
                                                    &#128274;</td>
                                                <td style="font-size:13px; color:#78350f; line-height:1.5;">
                                                    <strong>Security tip:</strong> CodeSarthi will never call or message
                                                    you to ask for this code. Never share it with anyone — not even our
                                                    support team.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Support -->
                            <p style="margin:0; font-size:13px; color:#9b9fc4; text-align:center; line-height:1.6;">
                                Need help? Contact us at
                                <a href="mailto:codesarthi.help@gmail.com"
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
                                        <a href="https://www.codesarthi.in/help-center"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Help
                                            Center</a>
                                    </td>
                                    <td style="font-size:13px; color:#dde0f5;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="https://www.codesarthi.in/privacy-policy"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Privacy
                                            Policy</a>
                                    </td>
                                    <td style="font-size:13px; color:#dde0f5;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="mailto:codesarthi.help@gmail.com"
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
        user.dateOfPasswordChange = Date.now();
        await user.save();
        await redis.del(passChangeSessionKey);




        const { data, error } = await resend.emails.send({
            from: 'CodeSarthi <astra@codesarthi.in>',
            to: [user.gmail],
            subject: "Security Alert!",
            html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Security Alert: Your CodeSarthi password was just changed. If this wasn't you, secure your account immediately.
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
                            <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">SECURITY
                                ALERT</p>
                        </td>
                    </tr>

                    <!-- ===== ALERT BANNER ===== -->
                    <tr>
                        <td style="background:#7f1d1d; padding:28px 32px 24px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.1); border:2px solid rgba(255,255,255,0.25); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#b91c1c; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#128737;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Your password was changed
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.70);">
                                A security change was made to your CodeSarthi account
                            </p>
                        </td>
                    </tr>

                    <!-- ===== ALERT STRIP ===== -->
                    <tr>
                        <td
                            style="background:#fef2f2; border-bottom:2px solid #fca5a5; padding:14px 32px; text-align:center;">
                            <p style="margin:0; font-size:13px; color:#991b1b; font-weight:600;">
                                &#9888;&#65039; &nbsp; If you made this change, no action is needed. If not, act
                                immediately below.
                            </p>
                        </td>
                    </tr>

                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Hello, <strong style="color:#1a1a2e;">${user.firstName} ${user.lastName}</strong> 👋<br>
                                This is a confirmation that the password for your CodeSarthi account was successfully
                                changed. Review the details below and take action if this wasn't you.
                            </p>

                            <!-- Info: Account -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:12px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:32px;">
                                                    <div
                                                        style="width:32px; height:32px; background:#eef0ff; border-radius:8px; text-align:center; line-height:32px; font-size:15px;">
                                                        &#128100;</div>
                                                </td>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                        Account</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${user.gmail}</p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#fef2f2; color:#991b1b; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Password
                                                        Changed</span>
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
                                                        &#128336;</div>
                                                </td>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                        Changed at</p>
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

                            <!-- Action Steps Label -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                If this was NOT you — act now
                            </p>

                            <!-- Action 1 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:8px; vertical-align:top; padding-top:5px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#ef4444;">
                                                    </div>
                                                </td>
                                                <td style="padding-left:12px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:13px; font-weight:700; color:#1a1a2e;">
                                                        Reset your password immediately</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#7a7fa8; line-height:1.5;">
                                                        Use the "Forgot Password" flow to regain control before the
                                                        attacker locks you out.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Action 2 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:8px; vertical-align:top; padding-top:5px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#f97316;">
                                                    </div>
                                                </td>
                                                <td style="padding-left:12px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:13px; font-weight:700; color:#1a1a2e;">
                                                        Revoke all active sessions</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#7a7fa8; line-height:1.5;">
                                                        Log out all devices from your account security settings to
                                                        invalidate any unauthorised access tokens.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Action 3 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:8px; vertical-align:top; padding-top:5px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#eab308;">
                                                    </div>
                                                </td>
                                                <td style="padding-left:12px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:13px; font-weight:700; color:#1a1a2e;">
                                                        Contact our support team</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#7a7fa8; line-height:1.5;">
                                                        Report the incident to codesarthi.help@gmail.com so we can freeze
                                                        your account and investigate.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Primary CTA -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center">
                                        <a href="https://www.codesarthi.in/forgot-password"
                                            style="display:inline-block; background:#b91c1c; color:#ffffff; text-decoration:none; border-radius:12px; padding:16px 32px; font-size:15px; font-weight:700; letter-spacing:0.3px; width:80%; text-align:center;">
                                            I didn't do this — Secure my account &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>




                            <!-- Support -->
                            <p
                                style="margin:20px 0 0; font-size:13px; color:#9b9fc4; text-align:center; line-height:1.6;">
                                Need help? Reach us at
                                <a href="mailto:codesarthi.help@gmail.com"
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
                                        <a href="https://www.codesarthi.in/help-center"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Help
                                            Center</a>
                                    </td>
                                    <td style="font-size:13px; color:#dde0f5;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="https://www.codesarthi.in/privacy-policy"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Privacy
                                            Policy</a>
                                    </td>
                                    <td style="font-size:13px; color:#dde0f5;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="mailto:codesarthi.help@gmail.com"
                                            style="font-size:13px; color:#4f46e5; font-weight:500; text-decoration:none;">Contact
                                            Support</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin:0; font-size:12px; color:#b0b4d4; line-height:1.6;">
                                © 2026 CodeSarthi &nbsp;·&nbsp; Kanpur, Uttar Pradesh, India<br>
                                This is an automated security alert. Please do not reply directly to this email.
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
            message: "Password changed successfully"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});



module.exports = passRoute;