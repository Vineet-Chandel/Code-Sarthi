const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const validator = require("validator");
const { Resend } = require('resend');

const resend = new Resend(String(process.env.RESEND_API_KEY));
const NewsletterSubscriber = require("../models/newsLetter");

/*
========================================
SUBSCRIBE API
POST /api/newsletter/subscribe
========================================
*/

router.post("/newsletter/subscribe", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        if (!validator.isEmail(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        const existingSubscriber =
            await NewsletterSubscriber.findOne({
                email: normalizedEmail,
            });

        /*
        ========================================
        ALREADY SUBSCRIBED
        ========================================
        */

        if (
            existingSubscriber &&
            existingSubscriber.isActive
        ) {
            return res.status(409).json({
                success: false,
                message: "Already subscribed",
            });
        }

        /*
        ========================================
        RE-SUBSCRIBE
        ========================================
        */

        if (
            existingSubscriber &&
            !existingSubscriber.isActive
        ) {
            existingSubscriber.isActive = true;

            existingSubscriber.unsubscribedAt =
                null;

            existingSubscriber.subscribedAt =
                new Date();

            existingSubscriber.unsubscribeToken =
                crypto
                    .randomBytes(32)
                    .toString("hex");

            await existingSubscriber.save();

            return res.status(200).json({
                success: true,
                message:
                    "Subscribed again successfully",
            });
        }

        /*
        ========================================
        NEW SUBSCRIBER
        ========================================
        */

        await NewsletterSubscriber.create({
            email: normalizedEmail,

            unsubscribeToken:
                crypto
                    .randomBytes(32)
                    .toString("hex"),
        });


        const { data, error } = await resend.emails.send({
            from: 'CodeSarthi <zenith@codesarthi.in>',
            to: [normalizedEmail],
            subject: "Welcome to CodeSarthi",
            html: `<body
    style="margin: 0; padding: 0; width: 100% !important; background-color: #f4f4f7; font-family: 'Sora', Arial, sans-serif; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">

    <!-- MASTER LAYOUT WRAPPER COMPONENT -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%"
        style="background-color: #f4f4f7; width: 100% !important; margin: 0; padding: 40px 0;">
        <tr>
            <td align="center" valign="top">

                <!-- CONTAINER MAIN COMPONENT (Max-Width Constrained for Cross-Platform Desktop/Mobile Consistency) -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="max-width: 560px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);  table-layout: fixed;">

                    <!-- HEADER HERO SECTION -->
                    <tr>
                        <td align="center" valign="top"
                            style="background: #0f0f23 linear-gradient(135deg, #0f0f23 0%, #1a1040 100%); padding: 40px 32px 0 32px; position: relative; overflow: hidden;">

                            <!-- Header Logo Module -->
                            <table border="0" cellpadding="0" cellspacing="0" align="center"
                                style="margin-bottom: 30px; ">
                                <tr>
                                    <td align="center" valign="middle"
                                        style="cursor: pointer; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(102, 126, 234, 0.3); border-radius: 50px; padding: 8px 20px 8px 8px;">
                                        <a href="https://www.codesarthi.in/"
                                            style="text-decoration: none; color: inherit;">
                                            <table border="0" cellpadding="0" cellspacing="0">

                                                <tr>
                                                    <td valign="middle" style="padding: 0; margin: 0; line-height: 0;">
                                                        <img src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1776693732/image_wxefat.png"
                                                            width="32" height="32"
                                                            style="display: block; border-radius: 8px; border: 0;"
                                                            alt="CodeSarthi Logo" />
                                                    </td>
                                                    <td valign="middle"
                                                        style="padding-left: 10px; font-family: 'Sora', Arial, sans-serif; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px; line-height: 32px;">
                                                        CodeSarthi
                                                    </td>
                                                </tr>
                                        </a>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Onboarding Badge Segment -->
                <div
                    style="display: inline-block; background: rgba(167, 139, 250, 0.15); border: 1px solid rgba(167, 139, 250, 0.3); border-radius: 50px; padding: 6px 16px; font-family: 'Sora', Arial, sans-serif; font-size: 11px; color: #a78bfa; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 24px;">
                    🎉 &nbsp;Welcome aboard
                </div>

                <!-- Mock IDE Code Frame Window Layer -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                    <tr>
                        <td align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(102, 126, 234, 0.25); border-bottom: none; border-radius: 16px 16px 0 0; ">
                                <tr>
                                    <td style="padding: 22px 24px 0 24px; text-align: left;" valign="top">

                                        <!-- Frame Status Window Buttons -->
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                                            <tr>
                                                <td width="10" height="10"
                                                    style="background: #ff5f57; border-radius: 50%; padding: 0;">
                                                </td>
                                                <td width="6" style="padding: 0;"></td>
                                                <td width="10" height="10"
                                                    style="background: #febc2e; border-radius: 50%; padding: 0;">
                                                </td>
                                                <td width="6" style="padding: 0;"></td>
                                                <td width="10" height="10"
                                                    style="background: #28c840; border-radius: 50%; padding: 0;">
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Formatted Interactive Script Code Lines -->
                                        <div
                                            style="font-family: 'Space Mono', monospace; font-size: 12px; line-height: 1.8; color: #ffffff; white-space: normal; word-break: break-all;">
                                            <span style="color: #c084fc;">Build</span><span
                                                style="color: rgba(255, 255, 255, 0.75);">.</span><span
                                                style="color: #c084fc;">Learn</span><span
                                                style="color: rgba(255, 255, 255, 0.75);">.</span><span
                                                style="color: #c084fc;">Collaborate</span><span
                                                style="color: rgba(255, 255, 255, 0.75);">.</span><br />
                                            <span style="color: rgba(255, 255, 255, 0.25); font-size: 11px;">/*
                                                ✨ Your journey starts here */</span><br />
                                            <span style="color: #60a5fa;">const</span> <span
                                                style="color: #fbbf24;">journey</span> <span
                                                style="color: rgba(255, 255, 255, 0.75);">=</span> <span
                                                style="color: #60a5fa;">new</span> <span
                                                style="color: #fb923c;">Developer</span><span
                                                style="color: rgba(255, 255, 255, 0.75);">(</span><span
                                                style="color: #f472b6;">{</span><br />
                                            &nbsp;&nbsp;
                                            &nbsp;&nbsp;<span style="color: rgba(255, 255, 255, 0.75);">visitor:</span>
                                            <span style="color: #34d399;">'growth'</span><br />
                                            <span style="color: #f472b6;">}</span><span
                                                style="color: rgba(255, 255, 255, 0.75);">)</span><span
                                                style="color: rgba(255, 255, 255, 0.25);">;</span><br />
                                            <span style="height: 6px; display: block;"></span>
                                            <span style="color: #fbbf24;">journey</span><span
                                                style="color: rgba(255, 255, 255, 0.75);">.</span><span
                                                style="color: #60a5fa;">start</span><span
                                                style="color: rgba(255, 255, 255, 0.75);">()</span><span
                                                style="color: rgba(255, 255, 255, 0.25);">;</span><span
                                                style="display: inline-block; width: 2px; height: 13px; background: #667eea; vertical-align: middle; margin-left: 2px;"></span>
                                        </div>
                                        <div style="height: 22px;"></div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- CORE CONTENT BODY COMPONENT SECTION -->
        <tr>
            <td style="padding: 40px 32px; background-color: #ffffff;" valign="top">

                <h1
                    style="font-family: 'Sora', Arial, sans-serif; font-size: 26px; font-weight: 800; color: #0f0e1a; line-height: 1.3; margin: 0 0 12px 0; letter-spacing: -0.5px;">
                    Welcome to CodeSarthi, <span style="color: #4f46e5;">!</span> 🎉<br />

                </h1>

                <p
                    style="font-family: 'Sora', Arial, sans-serif; font-size: 14px; color: #6b7280; line-height: 1.7; margin: 0 0 32px 0;">
                    Welcome to <strong style="color: #4f46e5; font-weight: 600;">CodeSarthi</strong> —
                    You’ll now receive updates about new developer tools, AI features,
                    resume builder upgrades, project collaboration tools, and community launches
                    from CodeSarthi.
                </p>



                <!-- FEATURE ENTRY CARD MODULE 1 -->


                <!-- QUOTE BOX PANEL COMPONENT -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="background: linear-gradient(135deg, #fafafe, #f5f3ff); border-left: 3px solid #7c3aed; border-radius: 0 12px 12px 0;  margin: 32px 0;">
                    <tr>
                        <td style="padding: 18px 20px;" valign="top">
                            <p
                                style="font-family: 'Sora', Arial, sans-serif; font-size: 13.5px; color: #374151; line-height: 1.65; font-style: italic; margin: 0 0 8px 0;">
                                "We are excited to have you on board"
                            </p>
                            <p
                                style="font-family: 'Sora', Arial, sans-serif; font-size: 12px; color: #7c3aed; font-weight: 700; margin: 0;">
                                — Team CodeSarthi</p>
                        </td>
                    </tr>
                </table>

                <!-- SYSTEM WARNING BLOCK NOTIFICATION -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; ">
                    <tr>
                        <td style="padding: 16px;" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="">
                                <tr>
                                    <td width="24" valign="top"
                                        style="font-family: 'Sora', Arial, sans-serif; font-size: 18px; line-height: 24px;">
                                        🔒
                                    </td>
                                    <td style="padding-left: 12px;" valign="top">
                                        <p
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 12.5px; color: #78350f; line-height: 1.6; margin: 0;">
                                            <strong style="font-weight: 700;">Keep your account
                                                safe:</strong> CodeSarthi will never request credentials or
                                            account passwords via email or platform chats. Ensure you enable
                                            two-factor authentication in your account profile metrics for
                                            optimized data security.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>

        <!-- EMAIL FOOTER PANEL COMPONENT -->
        <tr>
            <td style="background-color: #0f0e1a; padding: 36px 32px; text-align: center;" align="center" valign="top">

                <!-- Footnote Mini Brand Module -->
                <a href="https://www.codesarthi.in/" target="_blank" 
                    style="text-decoration: none; color: inherit; cursor: pointer;">
                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin-bottom: 20px; ">
                        <tr>
                            <td valign="middle" style="padding: 0; margin: 0; line-height: 0;">
                                <img src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1776693732/image_wxefat.png"
                                    width="26" height="26" style="display: block; border-radius: 6px; border: 0;"
                                    alt="CodeSarthi Mini Icon" />
                            </td>
                            <td valign="middle"
                                style="padding-left: 8px; font-family: 'Sora', Arial, sans-serif; font-size: 14px; font-weight: 700; color: rgba(255, 255, 255, 0.7); letter-spacing: 0.3px;">
                                CodeSarthi
                            </td>

                        </tr>
                    </table>
                </a>
                <!-- Native Multi-Column Native Social Platform Anchor Elements Row Links -->
                <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin-bottom: 24px; ">
                    <tr>
                        <td align="center" style="padding: 0 6px;">
                            <a href="https://www.instagram.com/codesarthik06/" target="_blank"
                                style="text-decoration: none; display: block; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 4px 8px;">
                                <img width="24" height="24" style="display: block; border: 0;"
                                    src="https://img.icons8.com/?size=100&id=32292&format=png&color=ffffff"
                                    alt="Instagram Profile Link" />
                            </a>
                        </td>
                        <td align="center" style="padding: 0 6px;">
                            <a href="https://www.youtube.com/@CodeSarthi-ZENITH" target="_blank"
                                style="text-decoration: none; display: block; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 4px 8px;">
                                <img width="24" height="24" style="display: block; border: 0;"
                                    src="https://img.icons8.com/?size=100&id=37325&format=png&color=ffffff"
                                    alt="YouTube Channel Link" />
                            </a>
                        </td>
                        <td align="center" style="padding: 0 6px;">
                            <a href="mailto:codesarthi.headmail@gmail.com"
                                style="text-decoration: none; display: block; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 4px 8px;">
                                <img width="24" height="24" style="display: block; border: 0;"
                                    src="https://img.icons8.com/?size=100&id=53388&format=png&color=ffffff"
                                    alt="Direct Mail Anchor" />
                            </a>
                        </td>
                        <td align="center" style="padding: 0 6px;">
                            <a href="https://github.com/Vineet-Chandel/Code-Sarthi" target="_blank"
                                style="text-decoration: none; display: block; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 4px 8px;">
                                <img width="24" height="24" style="display: block; border: 0;"
                                    src="https://img.icons8.com/?size=100&id=xLUf9A2uno5L&format=png&color=ffffff"
                                    alt="GitHub Repository CodeLink" />
                            </a>
                        </td>
                    </tr>
                </table>

                <!-- Utility Platform Hyperlink Navigation Bar Module -->
                <div style="margin-bottom: 20px; font-family: 'Sora', Arial, sans-serif;">
                    <a href="https://www.codesarthi.in/help-center" target="_blank"
                        style="font-size: 12.5px; color: #a78bfa; text-decoration: none; font-weight: 500; margin: 0 12px;">Help
                        Center</a>
                    <span style="color: rgba(255, 255, 255, 0.15); font-size: 12px;">|</span>
                    <a href="https://www.codesarthi.in/privacy-&-policy-hub" target="_blank"
                        style="font-size: 12.5px; color: #a78bfa; text-decoration: none; font-weight: 500; margin: 0 12px;">Privacy
                        Policy</a>
                    <span style="color: rgba(255, 255, 255, 0.15); font-size: 12px;">|</span>
                    <a href="mailto:codesarthi.help@gmail.com"
                        style="font-size: 12.5px; color: #a78bfa; text-decoration: none; font-weight: 500; margin: 0 12px;">Support</a>
                </div>

                <!-- Legal Disclaimer & Regional Data Segment Block -->
                <p
                    style="font-family: 'Sora', Arial, sans-serif; font-size: 11.5px; color: rgba(255, 255, 255, 0.3); line-height: 1.7; margin: 0;">
                    © 2026 CodeSarthi &nbsp;·&nbsp; Kanpur, Uttar Pradesh, India<br />
                    This is an automated system dispatch. Please do not reply directly to this mail account.
                </p>

            </td>
        </tr>
    </table>

    </td>
    </tr>
    </table>

</body>`,
        });
        return res.status(201).json({
            success: true,
            message:
                "Subscribed successfully",
        });

    } catch (error) {

        // Duplicate email protection
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message:
                    "Email already subscribed",
            });
        }

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong",
            error: error.message,
        });
    }
});

/*
========================================
UNSUBSCRIBE API
GET /api/newsletter/unsubscribe/:token
========================================
*/

router.get(
    "/newsletter/unsubscribe/:token",
    async (req, res) => {
        try {

            const { token } = req.params;

            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid token",
                });
            }

            const subscriber =
                await NewsletterSubscriber.findOne({
                    unsubscribeToken: token,
                });

            if (!subscriber) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Subscriber not found",
                });
            }

            if (!subscriber.isActive) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Already unsubscribed",
                });
            }

            subscriber.isActive = false;

            subscriber.unsubscribedAt =
                new Date();

            subscriber.unsubscribeToken = null;

            await subscriber.save();

            return res.status(200).json({
                success: true,
                message:
                    "Unsubscribed successfully",
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message:
                    "Something went wrong",
                error: error.message,
            });
        }
    }
);

module.exports = router;