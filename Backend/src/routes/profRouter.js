const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { userAuth } = require("../middlewares/userAuth");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");

const redis = require("../configs/redis");
const crypto = require("crypto");

const { Resend } = require('resend');

const resend = new Resend(String(process.env.RESEND_API_KEY));


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
                _id: user._id,
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
                dateOfPasswordChange: user.dateOfPasswordChange,
                isVerified: user.isVerified,
            }

        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
profileRouter.patch("/profile/me/edit", userAuth, async (req, res) => {
    try {

        validateEditProfileData(req);

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.status(200).json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: loggedInUser
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
profileRouter.get("/profile/update-identity", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Please re-login");
        }
        const gmailID = user.gmail;
        if (!gmailID) {
            throw new Error("Please re-login");
        }

        const changeIdentityRateKey = `updateIdentityOtp:rate:${user._id}`;
        const identityChangeOtpAttempts = await redis.incr(changeIdentityRateKey);
        if (identityChangeOtpAttempts === 1) {
            await redis.expire(changeIdentityRateKey, 300);
        }
        if (identityChangeOtpAttempts > 3) {
            return res.status(429).json({
                success: false,
                message: "Too many verification requests. Try again later.",
            });
        }
        /* ---------------- OTP GENERATION ---------------- */
        const changeIdentityOtp = crypto.randomInt(100000, 999999).toString();
        const changeIdentityOtpHash = await bcrypt.hash(changeIdentityOtp, 5);
        /* ---------------- STORE OTP ---------------- */
        const changeIdentityOtpKey = `updateIdentityOtp:hash:${user._id}`;
        await redis.set(changeIdentityOtpKey, changeIdentityOtpHash, {
            EX: 300 // 5 minutes
        });


        /* ----------------  SENDING GMAIL  ---------------- */

        const { data, error } = await resend.emails.send({
            from: 'CodeSarthi <nova@codesarthi.in>',
            to: [gmailID],
            subject: "CodeSarthi Verification Code",
            html: `
<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Identity change requested on your CodeSarthi account. Your verification code is ${changeIdentityOtp} — expires
        in 10 minutes. If this wasn't you, act now.
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
                            <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">IDENTITY
                                CHANGE REQUEST</p>
                        </td>
                    </tr>

                    <!-- ===== AMBER BANNER ===== -->
                    <tr>
                        <td style="background:#451a03; padding:28px 32px 24px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#b45309; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#128100;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Identity change requested
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.65);">
                                A request to update your email or username was received
                            </p>
                        </td>
                    </tr>

                    <!-- ===== AMBER STRIP ===== -->
                    <tr>
                        <td
                            style="background:#fffbeb; border-bottom:2px solid #fcd34d; padding:12px 32px; text-align:center;">
                            <p style="margin:0; font-size:13px; color:#78350f; font-weight:600;">
                                &#9888;&#65039; &nbsp; Your identity details are used to log in — verify carefully
                                before confirming
                            </p>
                        </td>
                    </tr>

                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Hello, <strong style="color:#1a1a2e;">${user.firstName} ${user.lastName}</strong> 👋<br>
                                We received a request to update your identity details on CodeSarthi. Please review the
                                changes below and enter the verification code to confirm. If this wasn't you, secure
                                your account immediately.
                            </p>

                            <!-- Info: Current Account -->
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
                                                        Current account</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${gmailID}</p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#fefce8; color:#854d0e; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Change
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
                                                        &#128336;</div>
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
                                Verification code to confirm changes
                            </p>

                            <!-- OTP Box -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="width:100%; background:#1a1a2e; border-radius:14px; border:1px solid #2d2d4e; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:28px 24px; text-align:center;">
                                        <p
                                            style="margin:0 0 16px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                            Enter this code to apply the identity changes above</p>
                                        <table align="center" cellpadding="0" cellspacing="0" border="0"
                                            style="margin-bottom:14px;">
                                            <tr>
                                                ${changeIdentityOtp.split("").map(digit => `
                                                <td style="padding:0 4px;">
                                                    <div style="
    background:rgba(255, 217, 0, 0.25);
    border:1px solid rgba(255, 208, 0, 0.4);
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
                                        <p style="margin:0; font-size:13px; color:#9b9fc4;">This code authorises the
                                            identity update on your account</p>
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
                                                    <strong>Wasn't you?</strong> Do not enter this code. Someone may
                                                    have accessed your account.
                                                    <span "
                                                        style="color:#c2410c; font-weight:600; text-decoration:none;">Secure
                                                        your account immediately </span>
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
                                                    <strong>Security tip:</strong> After changing your email, all future
                                                    login OTPs and security alerts will be sent to your new address.
                                                    Make sure the new email is one you control.
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
                                        <a href="https://www.codesarthi.in/privacy-&-policy-hub"
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
                                This is an automated security email. Please do not reply directly to this email.
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
            message: "OTP sent successfully",
        });



    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
profileRouter.patch("/profile/update-identity", userAuth, async (req, res) => {
    try {
        //taking input by the user
        const { enteredChangeIdentityOtp, newGmail, newUsername } = req.body;

        // First validation does the user should enter atleast one of the entery to change either mail or username
        if (!newGmail && !newUsername) {
            throw new Error("Nothing to update");
        }
        const user = req.user;
        if (!user) {
            throw new Error("Please re-login");
        }
        const gmailID = user.gmail;
        if (!gmailID) {
            throw new Error("Please re-login");
        }
        const oldGmail = user.gmail;
        const oldUsername = user.username;

        if (!(newGmail && newUsername)) {
            if (newGmail) {
                if (!validator.isEmail(newGmail)) {
                    throw new Error("New Email is not valid!");
                }
                if (newGmail === oldGmail) {
                    throw new Error("New email cannot be same as current email ")
                }
            }
            if (newUsername) {
                if (newUsername === user.username) {
                    throw new Error("New username cannot be same as current username ")
                }
                if (!validator.matches(newUsername, /^[a-z0-9._]{3,20}$/)) {
                    throw new Error("Please enter a username! which has lowercase letters , underscores and numbers");
                }
            }
        }

        if (newGmail && newUsername) {
            if (!validator.isEmail(newGmail)) {
                throw new Error("New Email is not valid!");
            }
            if (newGmail === oldGmail) {
                throw new Error("New email cannot be same as current email ")
            }
            if (newUsername === user.username) {
                throw new Error("New username cannot be same as current username ")
            }
            if (!validator.matches(newUsername, /^[a-z0-9._]{3,20}$/)) {
                throw new Error("Please enter a username! which has lowercase letters , underscores and numbers");
            }
            if (newGmail === oldGmail && newUsername === user.username) {
                throw new Error("Identities is as same as the current identities")
            }
        }

        // Determine old and new values based on which field is being update
        const newChange = newUsername ?? newGmail;
        const oldOnes = newUsername ? user.username : user.gmail;

        //taking the hashed otp stored in the redis DB
        const changeIdentityOtpKey = `updateIdentityOtp:hash:${user._id}`;
        //is the hashed otp exists??
        const storedOtpHash = await redis.get(changeIdentityOtpKey);
        if (!storedOtpHash) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }
        if (storedOtpHash) {
            //comparing the otp is this is same as the user entered
            const isOtpValid = await bcrypt.compare(
                enteredChangeIdentityOtp,
                storedOtpHash,
            );
            if (isOtpValid) {

                if (!(newGmail && newUsername)) {
                    if (newGmail) {
                        if (!user.isVerified) {
                            user.isVerified = true;
                        }


                        const { data1, error2 } = await resend.emails.send({
                            from: 'CodeSarthi <nova@codesarthi.in>',
                            to: [oldGmail],
                            subject: "Identity Change Alert",
                            html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Email change confirmation on your CodeSarthi account. If
        this wasn't you, act now.
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
                                CHANGE CONFIRMATION</p>
                        </td>
                    </tr>

                    <!-- ===== AMBER BANNER ===== -->
                    <tr>
                        <td style="background:#451a03; padding:28px 32px 24px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#b45309; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#128231;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Email address change confirmed
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.65);">
                                Your email address has been changed successfully
                            </p>
                        </td>
                    </tr>


                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Hello, <strong style="color:#1a1a2e;">${user.firstName} ${user.lastName}</strong> 👋<br>
                                A request was made to change the email address linked to your CodeSarthi account. Review
                                the details carefully and use the gmail below to future login. If this wasn't
                                you, secure your account immediately.
                            </p>

                            <!-- Info: Account Owner -->
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
                                                        Account owner</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${user.firstName} ${user.lastName} &nbsp;·&nbsp; <span
                                                            style="font-family:'Courier New',monospace;">${user.username}</span>
                                                    </p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#fefce8; color:#854d0e; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Old
                                                        Gmail</span>
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
                                                        &#128336;</div>
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

                            <!-- Change Summary Label -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                Email address change summary
                            </p>

                            <!-- ===== OLD EMAIL CARD ===== -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="border-radius:12px; overflow:hidden; border:1px solid #fecaca;">
                                <tr>
                                    <td style="background:#fff5f5; padding:10px 16px; border-bottom:1px solid #fecaca;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; height:8px; vertical-align:middle; padding-right:8px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#ef4444;">
                                                    </div>
                                                </td>
                                                <td
                                                    style="font-size:11px; font-weight:600; color:#991b1b; text-transform:uppercase; letter-spacing:0.8px;">
                                                    Current email &nbsp;&mdash;&nbsp; removed
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:#ffffff; padding:16px;">
                                        <p
                                            style="margin:0 0 6px; font-size:15px; font-weight:700; color:#7f1d1d; text-decoration:line-through; word-break:break-all;">
                                            ${oldGmail}</p>
                                        <p style="margin:0; font-size:12px; color:#9b9fc4; line-height:1.5;">This
                                            address is no longer receive CodeSarthi notifications after the change was
                                            confirmed.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Arrow bridge -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:10px 0;">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="background:#fef3c7; border:1px solid #fcd34d; border-radius:20px; padding:5px 14px;">
                                                    <table cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td
                                                                style="font-size:14px; color:#92400e; padding-right:6px; vertical-align:middle;">
                                                                &#8595;</td>
                                                            <td
                                                                style="font-size:12px; font-weight:600; color:#92400e; white-space:nowrap;">
                                                                Changed to</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- ===== NEW EMAIL CARD ===== -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="border-radius:12px; overflow:hidden; border:1px solid #bbf7d0; margin-bottom:20px;">
                                <tr>
                                    <td style="background:#f0fdf4; padding:10px 16px; border-bottom:1px solid #bbf7d0;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; height:8px; vertical-align:middle; padding-right:8px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#22c55e;">
                                                    </div>
                                                </td>
                                                <td
                                                    style="font-size:11px; font-weight:600; color:#14532d; text-transform:uppercase; letter-spacing:0.8px;">
                                                    New email &nbsp;&mdash;&nbsp; being linked
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:#ffffff; padding:16px;">
                                        <p
                                            style="margin:0 0 6px; font-size:15px; font-weight:700; color:#14532d; word-break:break-all;">
                                            ${newGmail}</p>
                                        <p style="margin:0; font-size:12px; color:#9b9fc4; line-height:1.5;">All future
                                            login OTPs, security alerts and notifications will be sent here after the
                                            change was confirmed.</p>
                                    </td>
                                </tr>
                            </table>


                            <!-- Divider -->
                            <hr style="border:none; height:1px; background:#eef0fb; margin:0 0 24px;">


                            <!-- Warning -->
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
                                                    <strong>Wasn't you?</strong>
                                                    <a href="{{SECURE_ACCOUNT_URL}}"
                                                        style="color:#c2410c; font-weight:600; text-decoration:none;">Secure
                                                        your account immediately</a>
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
                                        <a href="https://www.codesarthi.in/privacy-&-policy-hub"
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
                                This is an automated security email. Please do not reply directly to this email.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body> `,
                        });

                        user.gmail = newGmail;
                        await user.save();

                        const { data, error } = await resend.emails.send({
                            from: 'CodeSarthi <nova@codesarthi.in>',
                            to: [newGmail],
                            subject: "CodeSarthi Account was recovered sucessfully",
                            html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Email change confirmation on your CodeSarthi account. If
        this wasn't you, act now.
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
                            <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">ACCOUNT RECOVERED SUCESSFULLY</p>
                        </td>
                    </tr>

                    <!-- ===== AMBER BANNER ===== -->
                    <tr>
                        <td style="background:#451a03; padding:28px 32px 24px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#b45309; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#128231;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Email address change confirmed
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.65);">
                                Your email address has been changed successfully
                            </p>
                        </td>
                    </tr>


                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Hello, <strong style="color:#1a1a2e;">${user.firstName} ${user.lastName}</strong> 👋<br>
                                A request was made to change the email address linked to your CodeSarthi account. Review
                                the details carefully and use the gmail below to future login. If this wasn't
                                you, secure your account immediately.
                            </p>

                            <!-- Info: Account Owner -->
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
                                                        Account owner</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${user.firstName} ${user.lastName} &nbsp;·&nbsp; <span
                                                            style="font-family:'Courier New',monospace;">${user.username}</span>
                                                    </p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#fefce8; color:#854d0e; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Old
                                                        Gmail</span>
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
                                                        &#128336;</div>
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

                            <!-- Change Summary Label -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                Email address change summary
                            </p>

                            <!-- ===== OLD EMAIL CARD ===== -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="border-radius:12px; overflow:hidden; border:1px solid #fecaca;">
                                <tr>
                                    <td style="background:#fff5f5; padding:10px 16px; border-bottom:1px solid #fecaca;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; height:8px; vertical-align:middle; padding-right:8px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#ef4444;">
                                                    </div>
                                                </td>
                                                <td
                                                    style="font-size:11px; font-weight:600; color:#991b1b; text-transform:uppercase; letter-spacing:0.8px;">
                                                    Current email &nbsp;&mdash;&nbsp; removed
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:#ffffff; padding:16px;">
                                        <p
                                            style="margin:0 0 6px; font-size:15px; font-weight:700; color:#7f1d1d; text-decoration:line-through; word-break:break-all;">
                                            ${oldGmail}</p>
                                        <p style="margin:0; font-size:12px; color:#9b9fc4; line-height:1.5;">This
                                            address is no longer receive CodeSarthi notifications after the change was
                                            confirmed.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Arrow bridge -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:10px 0;">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="background:#fef3c7; border:1px solid #fcd34d; border-radius:20px; padding:5px 14px;">
                                                    <table cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td
                                                                style="font-size:14px; color:#92400e; padding-right:6px; vertical-align:middle;">
                                                                &#8595;</td>
                                                            <td
                                                                style="font-size:12px; font-weight:600; color:#92400e; white-space:nowrap;">
                                                                Changed to</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- ===== NEW EMAIL CARD ===== -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="border-radius:12px; overflow:hidden; border:1px solid #bbf7d0; margin-bottom:20px;">
                                <tr>
                                    <td style="background:#f0fdf4; padding:10px 16px; border-bottom:1px solid #bbf7d0;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; height:8px; vertical-align:middle; padding-right:8px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#22c55e;">
                                                    </div>
                                                </td>
                                                <td
                                                    style="font-size:11px; font-weight:600; color:#14532d; text-transform:uppercase; letter-spacing:0.8px;">
                                                    New email &nbsp;&mdash;&nbsp; being linked
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:#ffffff; padding:16px;">
                                        <p
                                            style="margin:0 0 6px; font-size:15px; font-weight:700; color:#14532d; word-break:break-all;">
                                            ${newGmail}</p>
                                        <p style="margin:0; font-size:12px; color:#9b9fc4; line-height:1.5;">All future
                                            login OTPs, security alerts and notifications will be sent here after the
                                            change was confirmed.</p>
                                    </td>
                                </tr>
                            </table>


                            <!-- Divider -->
                            <hr style="border:none; height:1px; background:#eef0fb; margin:0 0 24px;">


                            <!-- Warning -->
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
                                                    <strong>Wasn't you?</strong>
                                                    <a href="{{SECURE_ACCOUNT_URL}}"
                                                        style="color:#c2410c; font-weight:600; text-decoration:none;">Secure
                                                        your account immediately</a>
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
                                        <a href="https://www.codesarthi.in/privacy-&-policy-hub"
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
                                This is an automated security email. Please do not reply directly to this email.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body> `,
                        });
                    }
                    if (newUsername) {
                        if (!user.isVerified) {
                            user.isVerified = true;
                        }
                        const { data, error } = await resend.emails.send({
                            from: 'CodeSarthi <nova@codesarthi.in>',
                            to: [user.gmail],
                            subject: "Identity Change Alert",
                            html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Username change confirmation on your CodeSarthi account.
        If this wasn't you, act now.
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
                            <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">USERNAME
                                CHANGE CONFIRMATION</p>
                        </td>
                    </tr>

                    <!-- ===== INDIGO BANNER ===== -->
                    <tr>
                        <td style="background:#1e1b4b; padding:28px 32px 24px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#4338ca; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#127991;&#65039;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Username change confirmation
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.65);">
                                Your public identity on CodeSarthi was changed
                            </p>
                        </td>
                    </tr>

                    <!-- ===== INDIGO STRIP ===== -->
                    <tr>
                        <td
                            style="background:#eef2ff; border-bottom:2px solid #a5b4fc; padding:12px 32px; text-align:center;">
                            <p style="margin:0; font-size:13px; color:#3730a3; font-weight:600;">
                                &#9888;&#65039; &nbsp; Your username is visible to the entire CodeSarthi community —
                                change it only when it needed
                            </p>
                        </td>
                    </tr>

                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Hello, <strong style="color:#1a1a2e;">${user.firstName} ${user.lastName}</strong> 👋<br>
                                A request was made to change the username linked to your CodeSarthi account. Review the
                                change carefully below and enter the verification code to confirm. If this wasn't you,
                                secure your account immediately.
                            </p>

                            <!-- Info: Linked Account Email -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:12px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:32px;">
                                                    <div
                                                        style="width:32px; height:32px; background:#eef0ff; border-radius:8px; text-align:center; line-height:32px; font-size:15px;">
                                                        &#128231;</div>
                                                </td>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                        Linked account</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${user.gmail}</p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#eef2ff; color:#3730a3; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Change Confirmed</span>
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
                                                        Requested at</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${new Date().toLocaleString([], {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}  IST</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>



                            <!-- Divider -->
                            <hr style="border:none; height:1px; background:#eef0fb; margin:0 0 24px;">

                            <!-- Change Summary Label -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                Username change summary
                            </p>

                            <!-- ===== OLD USERNAME CARD ===== -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="border-radius:12px; overflow:hidden; border:1px solid #fecaca;">
                                <tr>
                                    <td style="background:#fff5f5; padding:10px 16px; border-bottom:1px solid #fecaca;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; height:8px; vertical-align:middle; padding-right:8px; padding-top:2px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#ef4444;">
                                                    </div>
                                                </td>
                                                <td
                                                    style="font-size:11px; font-weight:600; color:#991b1b; text-transform:uppercase; letter-spacing:0.8px;">
                                                    Current username &nbsp;&mdash;&nbsp; removed
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:#ffffff; padding:20px 16px;">
                                        <p
                                            style="margin:0 0 6px; font-size:22px; font-weight:700; color:#9b9fc4; text-decoration:line-through; font-family:'Courier New',monospace; letter-spacing:1px; word-break:break-all;">
                                            ${oldUsername}</p>
                                        <p style="margin:0; font-size:12px; color:#9b9fc4; line-height:1.5;">This handle
                                            will be released and may be claimed by another user after your change was
                                            confirmed.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Arrow bridge -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:10px 0;">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="background:#eef2ff; border:1px solid #a5b4fc; border-radius:20px; padding:5px 14px;">
                                                    <table cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td
                                                                style="padding-right:6px; vertical-align:middle; font-size:14px; color:#4338ca;">
                                                                &#8595;</td>
                                                            <td
                                                                style="font-size:12px; font-weight:600; color:#3730a3; white-space:nowrap;">
                                                                Changed to</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- ===== NEW USERNAME CARD ===== -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="border-radius:12px; overflow:hidden; border:1px solid #a5b4fc; margin-bottom:20px;">
                                <tr>
                                    <td style="background:#eef2ff; padding:10px 16px; border-bottom:1px solid #a5b4fc;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; height:8px; vertical-align:middle; padding-right:8px; padding-top:2px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#6366f1;">
                                                    </div>
                                                </td>
                                                <td
                                                    style="font-size:11px; font-weight:600; color:#3730a3; text-transform:uppercase; letter-spacing:0.8px;">
                                                    New username &nbsp;&mdash;&nbsp; newly linked
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:#ffffff; padding:20px 16px;">
                                        <p
                                            style="margin:0 0 6px; font-size:22px; font-weight:700; color:#3730a3; font-family:'Courier New',monospace; letter-spacing:1px; word-break:break-all;">
                                            ${newUsername}</p>
                                        <p style="margin:0; font-size:12px; color:#9b9fc4; line-height:1.5;">This is
                                            your new public handle across all CodeSarthi pages, posts, and community
                                            interactions.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- What this change affects -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                What this change affects
                            </p>



                            <!-- Impact 2 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:8px;">
                                <tr>
                                    <td style="padding:13px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; vertical-align:top; padding-top:5px; padding-right:12px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#6366f1;">
                                                    </div>
                                                </td>
                                                <td style="font-size:13px; color:#2d3060; line-height:1.5;">
                                                    <strong>Community posts &amp; replies</strong> — your username will
                                                    update on all existing posts and comments automatically
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Impact 3 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:13px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; vertical-align:top; padding-top:5px; padding-right:12px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#9ca3af;">
                                                    </div>
                                                </td>
                                                <td style="font-size:13px; color:#2d3060; line-height:1.5;">
                                                    <strong>Old handle released</strong> —
                                                    <span
                                                        style="font-family:'Courier New',monospace; font-size:12px;">${oldUsername}</span>
                                                    will become available for others to claim after confirmation
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Divider -->
                            <hr style="border:none; height:1px; background:#eef0fb; margin:0 0 24px;">


                            <!-- Warning -->
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
                                                    <strong>Wasn't you?</strong> Your old
                                                    username may be claimed by someone else if this goes through.
                                                    <div style="color:#c2410c; font-weight:600; text-decoration:none;">
                                                        Secure
                                                        your account immediately</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Heads up tip -->
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
                                                    <strong>Heads up:</strong> Usernames can only be changed once every
                                                    30 days. Choose carefully — your old handle will be released
                                                    publicly once the change is confirmed.
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
                                        <a href="https://www.codesarthi.in/privacy-&-policy-hub"
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
                                This is an automated security email. Please do not reply directly to this email.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>`,
                        });
                        user.username = newUsername;
                        await user.save();
                    }
                } else if (newGmail && newUsername) {

                    const { data2, error2 } = await resend.emails.send({
                        from: 'CodeSarthi <nova@codesarthi.in>',
                        to: [oldGmail],
                        subject: "Security Alert",
                        html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Username change confirmation on your CodeSarthi account.
        If this wasn't you, act now.
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
                            <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">USERNAME
                                CHANGE CONFIRMATION</p>
                        </td>
                    </tr>

                    <!-- ===== INDIGO BANNER ===== -->
                    <tr>
                        <td style="background:#1e1b4b; padding:28px 32px 24px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#4338ca; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#127991;&#65039;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Username change confirmation
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.65);">
                                Your public identity on CodeSarthi was changed
                            </p>
                        </td>
                    </tr>

                    <!-- ===== INDIGO STRIP ===== -->
                    <tr>
                        <td
                            style="background:#eef2ff; border-bottom:2px solid #a5b4fc; padding:12px 32px; text-align:center;">
                            <p style="margin:0; font-size:13px; color:#3730a3; font-weight:600;">
                                &#9888;&#65039; &nbsp; Your username is visible to the entire CodeSarthi community —
                                change it only when it needed
                            </p>
                        </td>
                    </tr>

                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Hello, <strong style="color:#1a1a2e;">{}</strong> 👋<br>
                                A request was made to change the username linked to your CodeSarthi account. Review the
                                change carefully below and enter the verification code to confirm. If this wasn't you,
                                secure your account immediately.
                            </p>

                            <!-- Info: Linked Account Email -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:12px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="width:32px;">
                                                    <div
                                                        style="width:32px; height:32px; background:#eef0ff; border-radius:8px; text-align:center; line-height:32px; font-size:15px;">
                                                        &#128231;</div>
                                                </td>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.6px;">
                                                        Linked account</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        {{EMAIL}}</p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#eef2ff; color:#3730a3; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Change
                                                        Pending</span>
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
                                                        Requested at</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        {{DATETIME}} IST</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>



                            <!-- Divider -->
                            <hr style="border:none; height:1px; background:#eef0fb; margin:0 0 24px;">

                            <!-- Change Summary Label -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                Username change summary
                            </p>

                            <!-- ===== OLD USERNAME CARD ===== -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="border-radius:12px; overflow:hidden; border:1px solid #fecaca;">
                                <tr>
                                    <td style="background:#fff5f5; padding:10px 16px; border-bottom:1px solid #fecaca;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; height:8px; vertical-align:middle; padding-right:8px; padding-top:2px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#ef4444;">
                                                    </div>
                                                </td>
                                                <td
                                                    style="font-size:11px; font-weight:600; color:#991b1b; text-transform:uppercase; letter-spacing:0.8px;">
                                                    Current username &nbsp;&mdash;&nbsp; removed
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:#ffffff; padding:20px 16px;">
                                        <p
                                            style="margin:0 0 6px; font-size:22px; font-weight:700; color:#9b9fc4; text-decoration:line-through; font-family:'Courier New',monospace; letter-spacing:1px; word-break:break-all;">
                                            {{CURRENT_USERNAME}}</p>
                                        <p style="margin:0; font-size:12px; color:#9b9fc4; line-height:1.5;">This handle
                                            will be released and may be claimed by another user after your change was
                                            confirmed.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Arrow bridge -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:10px 0;">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="background:#eef2ff; border:1px solid #a5b4fc; border-radius:20px; padding:5px 14px;">
                                                    <table cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td
                                                                style="padding-right:6px; vertical-align:middle; font-size:14px; color:#4338ca;">
                                                                &#8595;</td>
                                                            <td
                                                                style="font-size:12px; font-weight:600; color:#3730a3; white-space:nowrap;">
                                                                Changed to</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- ===== NEW USERNAME CARD ===== -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="border-radius:12px; overflow:hidden; border:1px solid #a5b4fc; margin-bottom:20px;">
                                <tr>
                                    <td style="background:#eef2ff; padding:10px 16px; border-bottom:1px solid #a5b4fc;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; height:8px; vertical-align:middle; padding-right:8px; padding-top:2px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#6366f1;">
                                                    </div>
                                                </td>
                                                <td
                                                    style="font-size:11px; font-weight:600; color:#3730a3; text-transform:uppercase; letter-spacing:0.8px;">
                                                    New username &nbsp;&mdash;&nbsp; newly linked
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:#ffffff; padding:20px 16px;">
                                        <p
                                            style="margin:0 0 6px; font-size:22px; font-weight:700; color:#3730a3; font-family:'Courier New',monospace; letter-spacing:1px; word-break:break-all;">
                                            {{NEW_USERNAME}}</p>
                                        <p style="margin:0; font-size:12px; color:#9b9fc4; line-height:1.5;">This is
                                            your new public handle across all CodeSarthi pages, posts, and community
                                            interactions.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- What this change affects -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                What this change affects
                            </p>



                            <!-- Impact 2 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:8px;">
                                <tr>
                                    <td style="padding:13px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; vertical-align:top; padding-top:5px; padding-right:12px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#6366f1;">
                                                    </div>
                                                </td>
                                                <td style="font-size:13px; color:#2d3060; line-height:1.5;">
                                                    <strong>Community posts &amp; replies</strong> — your username will
                                                    update on all existing posts and comments automatically
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Impact 3 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:10px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:13px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:8px; vertical-align:top; padding-top:5px; padding-right:12px;">
                                                    <div
                                                        style="width:8px; height:8px; border-radius:50%; background:#9ca3af;">
                                                    </div>
                                                </td>
                                                <td style="font-size:13px; color:#2d3060; line-height:1.5;">
                                                    <strong>Old handle released</strong> —
                                                    <span
                                                        style="font-family:'Courier New',monospace; font-size:12px;">{{CURRENT_USERNAME}}</span>
                                                    will become available for others to claim after confirmation
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Divider -->
                            <hr style="border:none; height:1px; background:#eef0fb; margin:0 0 24px;">


                            <!-- Warning -->
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
                                                    <strong>Wasn't you?</strong> Your old
                                                    username may be claimed by someone else if this goes through.
                                                    <div style="color:#c2410c; font-weight:600; text-decoration:none;">
                                                        Secure
                                                        your account immediately</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Heads up tip -->
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
                                                    <strong>Heads up:</strong> Usernames can only be changed once every
                                                    30 days. Choose carefully — your old handle will be released
                                                    publicly once the change is confirmed.
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
                                        <a href="https://www.codesarthi.in/privacy-&-policy-hub"
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
                                This is an automated security email. Please do not reply directly to this email.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body> `,
                    });





                    const { data, error } = await resend.emails.send({
                        from: 'CodeSarthi <nova@codesarthi.in>',
                        to: [newGmail],
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
Account of the CodeSarthi ${oldGmail} is been switched to this email !!
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
                                If you didn’t change the gmail --------- 
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

                    if (!user.isVerified) {
                        user.isVerified = true;
                    }
                    user.gmail = newGmail;
                    user.username = newUsername;
                    await user.save();
                }



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
        const changeIdentityRateKey = `updateIdentityOtp:rate:${user._id}`;
        await redis.del(changeIdentityRateKey);
        await redis.del(changeIdentityOtpKey);
        res.status(200).json({
            success: true,
            message: "Identity updated successfully",
        });



    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
profileRouter.post("/profile/me/delete", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Please re-login");
        }


        const changeDeleteRateKey = `updateDeleteOtp:rate:${user._id}`;
        const DeleteChangeOtpAttempts = await redis.incr(changeDeleteRateKey);
        if (DeleteChangeOtpAttempts === 1) {
            await redis.expire(changeDeleteRateKey, 300);
        }
        if (DeleteChangeOtpAttempts > 3) {
            return res.status(429).json({
                success: false,
                message: "Too many verification requests. Try again later.",
            });
        }
        /* ---------------- OTP GENERATION ---------------- */
        const changeDeleteOtp = crypto.randomInt(100000, 999999).toString();
        const changeDeleteOtpHash = await bcrypt.hash(changeDeleteOtp, 5);
        /* ---------------- STORE OTP ---------------- */
        const changeDeleteOtpKey = `updateDeleteOtp:hash:${user._id}`;
        await redis.set(changeDeleteOtpKey, changeDeleteOtpHash, {
            EX: 300 // 5 minutes
        });


        /* ----------------  SENDING GMAIL  ---------------- */


        const { data1, error2 } = await resend.emails.send({
            from: 'CodeSarthi <nova@codesarthi.in>',
            to: [user.gmail],
            subject: "CodeSarthi Verification Code",
            html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Account deletion requested for your CodeSarthi account. Your verification code is {{OTP}} — expires in 15
        minutes. This cannot be undone.
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
                                DELETION REQUEST</p>
                        </td>
                    </tr>

                    <!-- ===== DANGER BANNER ===== -->
                    <tr>
                        <td style="background:#450a0a; padding:28px 32px 24px; text-align:center;">
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:16px;">
                                <tr>
                                    <td
                                        style="width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:52px; height:52px; border-radius:50%; background:#991b1b; text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:26px; color:#ffffff; line-height:52px; display:block;">&#128465;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff;">
                                Account deletion requested
                            </h1>
                            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.65);">
                                This action is permanent and cannot be undone
                            </p>
                        </td>
                    </tr>

                    <!-- ===== DANGER STRIP ===== -->
                    <tr>
                        <td
                            style="background:#fef2f2; border-bottom:2px solid #fca5a5; padding:12px 32px; text-align:center;">
                            <p style="margin:0; font-size:13px; color:#991b1b; font-weight:600;">
                                &#9888;&#65039; &nbsp; Proceeding will permanently erase all your data from CodeSarthi
                            </p>
                        </td>
                    </tr>

                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.6;">
                                Hello, <strong style="color:#1a1a2e;">${user.firstName} ${user.lastName}</strong> 👋<br>
                                We received a request to permanently delete your CodeSarthi account. Before we proceed,
                                please verify this was really you using the code below. If you change your mind, simply
                                ignore this email.
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
                                                        Account to be deleted</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                        ${user.gmail}</p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#fef2f2; color:#991b1b; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Deletion
                                                        Pending</span>
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

                            <!-- What will be lost -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                What you will permanently lose
                            </p>

                            <!-- Loss 1 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#fff5f5; border:1px solid #fecaca; border-radius:10px; margin-bottom:8px;">
                                <tr>
                                    <td style="padding:13px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="width:20px; vertical-align:top; padding-top:1px;">
                                                    <div
                                                        style="width:20px; height:20px; border-radius:50%; background:#ef4444; text-align:center; line-height:20px; font-size:11px; font-weight:700; color:#ffffff;">
                                                        &#10005;</div>
                                                </td>
                                                <td
                                                    style="padding-left:12px; font-size:13px; color:#7f1d1d; line-height:1.5;">
                                                    <strong>Your entire profile</strong> — username, bio, skills,
                                                    profile photo and all personal settings
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Loss 2 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#fff5f5; border:1px solid #fecaca; border-radius:10px; margin-bottom:8px;">
                                <tr>
                                    <td style="padding:13px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="width:20px; vertical-align:top; padding-top:1px;">
                                                    <div
                                                        style="width:20px; height:20px; border-radius:50%; background:#ef4444; text-align:center; line-height:20px; font-size:11px; font-weight:700; color:#ffffff;">
                                                        &#10005;</div>
                                                </td>
                                                <td
                                                    style="padding-left:12px; font-size:13px; color:#7f1d1d; line-height:1.5;">
                                                    <strong>Learning progress</strong> — all completed courses, streaks,
                                                    badges and certificates earned
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Loss 3 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#fff5f5; border:1px solid #fecaca; border-radius:10px; margin-bottom:8px;">
                                <tr>
                                    <td style="padding:13px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="width:20px; vertical-align:top; padding-top:1px;">
                                                    <div
                                                        style="width:20px; height:20px; border-radius:50%; background:#ef4444; text-align:center; line-height:20px; font-size:11px; font-weight:700; color:#ffffff;">
                                                        &#10005;</div>
                                                </td>
                                                <td
                                                    style="padding-left:12px; font-size:13px; color:#7f1d1d; line-height:1.5;">
                                                    <strong>Submissions &amp; projects</strong> — all code submissions,
                                                    saved solutions and project files
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Loss 4 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#fff5f5; border:1px solid #fecaca; border-radius:10px; margin-bottom:8px;">
                                <tr>
                                    <td style="padding:13px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="width:20px; vertical-align:top; padding-top:1px;">
                                                    <div
                                                        style="width:20px; height:20px; border-radius:50%; background:#ef4444; text-align:center; line-height:20px; font-size:11px; font-weight:700; color:#ffffff;">
                                                        &#10005;</div>
                                                </td>
                                                <td
                                                    style="padding-left:12px; font-size:13px; color:#7f1d1d; line-height:1.5;">
                                                    <strong>Community activity</strong> — your posts, replies, followers
                                                    and following list
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- OTP Label -->
                            <p
                                style="margin:24px 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px; text-align:center;">
                                Verification code to confirm deletion
                            </p>

                            <!-- OTP Box -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="width:100%; background:#1a1a2e; border-radius:14px; border:1px solid #2d2d4e; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:28px 24px; text-align:center;">
                                        <p
                                            style="margin:0 0 16px; font-size:11px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                            Enter this code only if you truly want to delete your account</p>
                                        <table align="center" cellpadding="0" cellspacing="0" border="0"
                                            style="margin-bottom:14px;">
                                            <tr>
                                                ${changeDeleteOtp.split("").map(digit => `
                                                <td style="padding:0 4px;">
                                                    <div style="
                background:rgba(251, 93, 93, 0.25);
                border:1px solid rgba(255, 60, 60, 0.4);
                border-radius:12px;
                width:44px;
                height:44px;
                text-align:center;
                line-height:44px;

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
                                        <p style="margin:0; font-size:13px; color:#9b9fc4;">This code authorises
                                            permanent account deletion</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Expiry -->
                            <p
                                style="margin:0 0 24px; font-size:13px; color:#ef4444; font-weight:600; text-align:center;">
                                &#9679; &nbsp;This code expires in <strong>5 minutes</strong>
                            </p>


                            <!-- Security warning -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; margin-top:20px;">
                                <tr>
                                    <td style="padding:14px 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="font-size:18px; vertical-align:top; padding-right:12px; padding-top:1px;">
                                                    &#128274;</td>
                                                <td style="font-size:13px; color:#78350f; line-height:1.5;">
                                                    <strong>Didn't request this?</strong> Someone may have unauthorised
                                                    access to your account.
                                                    <a href="{{SECURE_ACCOUNT_URL}}"
                                                        style="color:#c2410c; font-weight:600; text-decoration:none;">Secure
                                                        your account immediately</a>
                                                    and contact our support team.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Support -->
                            <p
                                style="margin:20px 0 0; font-size:13px; color:#9b9fc4; text-align:center; line-height:1.6;">
                                Need help? Contact us at
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
                                This is an automated security email. Please do not reply directly to this email.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>`
        });

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });



    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})
profileRouter.delete("/profile/me/delete", userAuth, async (req, res) => {
    try {
        const user = req.user;

        const { enteredChangeDeleteOtp } = req.body;

        if (!enteredChangeDeleteOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP required"
            });
        }
        //taking the hashed otp stored in the redis DB
        const changeDeleteOtpKey = `updateDeleteOtp:hash:${user._id}`;
        //is the hashed otp exists??
        const storedOtpHash = await redis.get(changeDeleteOtpKey);
        if (!storedOtpHash) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }
        if (storedOtpHash) {
            //comparing the otp is this is same as the user entered
            const isOtpValid = await bcrypt.compare(
                enteredChangeDeleteOtp,
                storedOtpHash,
            );
            if (isOtpValid) {
                const deletedUserGmail = user.gmail;
                const deletedUserName = user.firstName;

                const deletedUserID = await User.findByIdAndDelete(user._id);
                if (!deletedUserID) {
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



                const { data, error } = await resend.emails.send({
                    from: 'CodeSarthi <nova@codesarthi.in>',
                    to: [deletedUserGmail],
                    subject: `GoodBye ${deletedUserName}`,
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
                                Verify Your Delete
                            </h1>

                            <p style="margin:0 0 8px 0; font-size:16px; color:#4a5568;">
                                Hello ${user.firstName}  👋
                            </p>

                            <p style="margin:0 0 24px 0; font-size:15px; color:#718096; line-height:1.6;">
Your CodeSarthi Account ${user.gmail} has been sucessfully deleted.
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
                const changeDeleteRateKey = `updateDeleteOtp:rate:${user._id}`;
                await redis.del(changeDeleteRateKey);
                await redis.del(changeDeleteOtpKey);
                return res.status(200).json({
                    success: true,
                    message: "User deleted successfully"
                });


            }

            if (!isOtpValid) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP"
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
});
profileRouter.post("/profile/others", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;


        if (!loggedInUser || !loggedInUser._id) {
            return res.status(401).json({
                success: false,
                message: "Please re-login"
            });
        }


        const { username } = req.body;

        if (!username || typeof username !== "string") {
            return res.status(400).json({
                success: false,
                message: "Valid username is required"
            });
        }

        const trimmedUsername = username.trim().toLowerCase();

        if (trimmedUsername.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Username cannot be empty"
            });
        }


        if (trimmedUsername === loggedInUser.username?.toLowerCase()) {
            return res.status(400).json({
                success: false,
                message: "It's your profile only!"
            });
        }


        const otherUser = await User.findOne({ username: trimmedUsername })
            .select(
                "firstName middleName lastName username about photoUrl skills gmail profession college gender age"
            );


        if (!otherUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        res.status(200).json({
            success: true,
            data: otherUser
        });

    } catch (err) {
        console.error("Fetch other profile error:", err);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});


module.exports = profileRouter;