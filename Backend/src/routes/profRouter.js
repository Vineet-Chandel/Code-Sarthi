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

const resend = new Resend("re_AgE7BCRT_JQiKrPvbDLJyFYRNBtUf3X2Q");


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
                                           ${changeIdentityOtp}
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
                                     The gmail for the CodeSarthi Account ${oldOnes} was changed to ${newChange}.
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

                        user.gmail = newGmail;
                        await user.save();

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
                                 This mail is just to inform you that your gmail has been update just few seconds back from ${oldOnes} to ${newChange}
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
                    }
                    if (newUsername) {
                        if (!user.isVerified) {
                            user.isVerified = true;
                        }
                        const { data, error } = await resend.emails.send({
                            from: 'CodeSarthi <nova@codesarthi.in>',
                            to: [user.gmail],
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
                                    Your Username was changed
                                </h1>
    
                                
    
                                <p style="margin:0 0 24px 0; font-size:15px; color:#718096; line-height:1.6;">
                                     The username for the CodeSarthi Account ${oldOnes} was changed to ${newChange}.
                                </p>
    
                                <hr style="border:none; height:1px; background:#e2e8f0; margin:0 0 24px 0;">
    
                                <!-- SECURITY -->
                                <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                                    <tr>
    
                                        <td style="padding-left:8px; font-size:13px; color:#a0aec0;">
                                            🔒 <strong>Security Tip:</strong>Ingnore if you changed the username
                                        </td>
                                    </tr>
                                </table>
    
                                <p style="margin:0; font-size:13px; color:#a0aec0; line-height:1.5;">
                                    If you didn’t change the username you should change the password again by 
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
                        user.username = newUsername;
                        await user.save();
                    }
                } else if (newGmail && newUsername) {

                    const { data2, error2 } = await resend.emails.send({
                        from: 'CodeSarthi <nova@codesarthi.in>',
                        to: [oldGmail],
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
                                    Your Gmail & Username was changed
                                </h1>
    
                                
    
                                <p style="margin:0 0 24px 0; font-size:15px; color:#718096; line-height:1.6;">
                                     The gmail for the CodeSarthi Account ${oldGmail} was changed to ${newGmail} and 
                                     username ${user.username} changed to ${newUsername}.
                                </p>
    
                                <hr style="border:none; height:1px; background:#e2e8f0; margin:0 0 24px 0;">
    
                                <!-- SECURITY -->
                                <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                                    <tr>
    
                                        <td style="padding-left:8px; font-size:13px; color:#a0aec0;">
                                            🔒 <strong>Security Tip:</strong>Ingnore if you changed the gmail and username
                                        </td>
                                    </tr>
                                </table>
    
                                <p style="margin:0; font-size:13px; color:#a0aec0; line-height:1.5;">
                                    If you didn’t change the gmail and username you should change the password by 
                                     <a href="#" style="color:#667eea; text-decoration:none; font-weight:600;">
                                        Reset Password 
                                    </a> or by 
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
                                           ${changeDeleteOtp}
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