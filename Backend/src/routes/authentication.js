const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");

// models import 
const User = require("../models/user");
const NewsletterSubscriber = require("../models/newsLetter");

const bcrypt = require("bcryptjs");

// the most important middleware 
const { userAuth } = require("../middlewares/userAuth");

const redis = require("../configs/redis");
const crypto = require("crypto")
const { Resend } = require('resend');

const resend = new Resend(String(process.env.RESEND_API_KEY));


//signUp
authRouter.post("/auth/signup", async (req, res) => {
    try {

        const { firstName, middleName, lastName, gmail, password, username, termsAccepted } = req.body;
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

        });

        let rate = Math.floor(Math.random() * 100);
        if (rate < 12.5) {
            user.photoUrl.url = "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778848890/robo6_qerfgw.jpg";
        } else if (rate < 25 && rate > 12.5) {
            user.photoUrl.url = "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778848891/robo2_th69at.jpg";
        } else if (rate < 37.5 && rate > 25) {
            user.photoUrl.url = "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778848890/robo7_ixkipt.jpg";
        } else if (rate < 50 && rate > 37.5) {
            user.photoUrl.url = "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778848889/robo4_v1qyln.jpg";
        } else if (rate < 62.5 && rate > 50) {
            user.photoUrl.url = "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778848889/robo5_p3bwre.jpg";
        } else if (rate < 75 && rate > 62.5) {
            user.photoUrl.url = "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778848888/robo3_uqaqzv.jpg";
        } else if (rate < 87.5 && rate > 75) {
            user.photoUrl.url = "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778848889/robo1_fyviei.jpg";
        } else if (rate < 100 && rate > 87.5) {
            user.photoUrl.url = "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778848888/robo8_jhm1p8.jpg";
        }


        // this token is essential once the user want to unsubscribe with the newsletter 
        const unsubscribeToken = crypto.randomBytes(32).toString("hex");

        // if user is subscribed to newsletter, update the isActive to true
        const emailData = await NewsletterSubscriber.findOne({ email: user.gmail });
        if (emailData) {
            emailData.isActive = true;
            emailData.unsubscribeToken = unsubscribeToken;
            await emailData.save();
        } else {
            await NewsletterSubscriber.create({
                email: user.gmail,
                isActive: true,
                subscribedAt: Date.now(),
                unsubscribeToken: unsubscribeToken,
            });
        }

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 8 * 60 * 60 * 1000
        });

        const { data, error } = await resend.emails.send({
            from: 'CodeSarthi <astra@codesarthi.in>',
            to: [user.gmail],
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
                            <a href="https://codesarthi.in/"
                                style="text-decoration: none; color: inherit; cursor: pointer; ">
                                <table border="0" cellpadding="0" cellspacing="0" align="center"
                                    style="margin-bottom: 30px; ">

                                    <tr>
                                        <td align="center" valign="middle"
                                            style="cursor: pointer; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(102, 126, 234, 0.3); border-radius: 50px; padding: 8px 20px 8px 8px;">
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
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </a>

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
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        style="margin-bottom: 16px;">
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
                                                        <span style="color: #c084fc;">import</span> <span
                                                            style="color: rgba(255, 255, 255, 0.75);">{ Developer
                                                            }</span> <span style="color: #c084fc;">from</span> <span
                                                            style="color: #34d399;">'@codesarthi/you'</span><span
                                                            style="color: rgba(255, 255, 255, 0.25);">;</span><br />
                                                        <span
                                                            style="color: rgba(255, 255, 255, 0.25); font-size: 11px;">/*
                                                            ✨ Your journey starts here */</span><br />
                                                        <span style="color: #60a5fa;">const</span> <span
                                                            style="color: #fbbf24;">journey</span> <span
                                                            style="color: rgba(255, 255, 255, 0.75);">=</span> <span
                                                            style="color: #60a5fa;">new</span> <span
                                                            style="color: #fb923c;">Developer</span><span
                                                            style="color: rgba(255, 255, 255, 0.75);">(</span><span
                                                            style="color: #f472b6;">{</span><br />
                                                        &nbsp;&nbsp;<span
                                                            style="color: rgba(255, 255, 255, 0.75);">name:</span>
                                                        <span style="color: #34d399;">'${user.firstName}'</span><span
                                                            style="color: rgba(255, 255, 255, 0.25);">,</span><br />
                                                        &nbsp;&nbsp;<span
                                                            style="color: rgba(255, 255, 255, 0.75);">skills:</span>
                                                        <span style="color: #f472b6;">[</span><span
                                                            style="color: #34d399;">'DSA'</span><span
                                                            style="color: rgba(255, 255, 255, 0.25);">,</span> <span
                                                            style="color: #34d399;">'Web Dev'</span><span
                                                            style="color: rgba(255, 255, 255, 0.25);">,</span> <span
                                                            style="color: #34d399;">'AI'</span><span
                                                            style="color: #f472b6;">]</span><span
                                                            style="color: rgba(255, 255, 255, 0.25);">,</span><br />
                                                        &nbsp;&nbsp;<span
                                                            style="color: rgba(255, 255, 255, 0.75);">mindset:</span>
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
                                You're in, <span style="color: #4f46e5;">${user.firstName}!</span> 🎉<br />
                                Let's build something great.
                            </h1>

                            <p
                                style="font-family: 'Sora', Arial, sans-serif; font-size: 14px; color: #6b7280; line-height: 1.7; margin: 0 0 32px 0;">
                                Welcome to <strong style="color: #4f46e5; font-weight: 600;">CodeSarthi</strong> — it
                                connects you with a global developer community to build and scale projects. Designed to
                                boost efficiency while keeping workflows fluid and intuitive.
                            </p>

                            <!-- Mini Section Segment Heading Title -->
                            <p
                                style="font-family: 'Sora', Arial, sans-serif; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 16px 0;">
                                What's waiting for you
                            </p>

                            <!-- FEATURE ENTRY CARD MODULE 1 -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="margin-bottom: 20px; border-bottom: 1px solid #f3f4f6; padding-bottom: 20px; ">
                                <tr>
                                    <td width="40" valign="top" style="padding-top: 2px;">
                                        <img width="40" height="40"
                                            style="display: block; border-radius: 12px; background-color: #ede9fe; border: 0;"
                                            src="https://img.icons8.com/?size=100&id=118374&format=png&color=000000"
                                            alt="Collaboration Icon" />
                                    </td>
                                    <td style="padding-left: 16px;" valign="top">
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 8px; line-height: 1.3;">
                                            Real-time collaboration with Global developers
                                        </div>
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 8px;">
                                            • Eliminating friction by providing one seamless layer where messaging,
                                            meetings, and shared code live dynamically together.
                                        </div>
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 8px;">
                                            • Enable instant personal chats, global hub circles, specialized workspaces,
                                            and AI-assisted pair-programming setups.
                                        </div>
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.6;">
                                            • Move entirely beyond fragmented asynchronous updates via contextual code
                                            comments and high-bandwidth team environments.
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- FEATURE ENTRY CARD MODULE 2 -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="margin-bottom: 20px; border-bottom: 1px solid #f3f4f6; padding-bottom: 20px; ">
                                <tr>
                                    <td width="40" valign="top" style="padding-top: 2px;">
                                        <img width="40" height="40"
                                            style="display: block; border-radius: 12px; background-color: #eff6ff; border: 0;"
                                            src="https://img.icons8.com/?size=100&id=R9cokz2UAdyo&format=png&color=000000"
                                            alt="AI Analyzer Icon" />
                                    </td>
                                    <td style="padding-left: 16px;" valign="top">
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 8px; line-height: 1.3;">
                                            AI Resume Builder & Analyser
                                        </div>
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 8px;">
                                            • Structure tech achievements from scratch or drop your existing file to
                                            construct tailored, high-grade ATS optimized iterations instantly.
                                        </div>
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.6;">
                                            • Receive instant diagnostics identifying semantic content gaps with precise
                                            industry metric-driven suggestions.
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- FEATURE ENTRY CARD MODULE 3 -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="margin-bottom: 24px; ">
                                <tr>
                                    <td width="40" valign="top" style="padding-top: 2px;">
                                        <img width="40" height="40"
                                            style="display: block; border-radius: 12px; background-color: #ecfdf5; border: 0;"
                                            src="https://img.icons8.com/?size=100&id=s4Xt7WXfxRMk&format=png&color=000000"
                                            alt="Operations Decentralization Icon" />
                                    </td>
                                    <td style="padding-left: 16px;" valign="top">
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 8px; line-height: 1.3;">
                                            Decentralizing Project Operations
                                        </div>
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 8px;">
                                            • Enable self-managed, transparent project collaboration — product squads
                                            synchronize seamlessly without management bottlenecks.
                                        </div>
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 8px;">
                                            • Automated real-time logging of product cycles, code velocity metrics, and
                                            development sprint health parameters.
                                        </div>
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 8px;">
                                            • Consolidate localized feature tracking tickets and comprehensive master
                                            architecture updates onto a single view.
                                        </div>
                                        <div
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.6;">
                                            • Isolate regression dependencies early and alert cross-functional engineers
                                            instantly to preserve release velocities.
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- QUOTE BOX PANEL COMPONENT -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="background: linear-gradient(135deg, #fafafe, #f5f3ff); border-left: 3px solid #7c3aed; border-radius: 0 12px 12px 0;  margin: 32px 0;">
                                <tr>
                                    <td style="padding: 18px 20px;" valign="top">
                                        <p
                                            style="font-family: 'Sora', Arial, sans-serif; font-size: 13.5px; color: #374151; line-height: 1.65; font-style: italic; margin: 0 0 8px 0;">
                                            "The best time to start collaborating was yesterday. The second best time is
                                            right now. You've already taken the first step."
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
                        <td style="background-color: #0f0e1a; padding: 36px 32px; text-align: center;" align="center"
                            valign="top">

                            <!-- Footnote Mini Brand Module -->
                            <a href="https://www.codesarthi.in/" target="_blank"
                                style="text-decoration: none; color: inherit; cursor: pointer;">
                                <table border="0" cellpadding="0" cellspacing="0" align="center"
                                    style="margin-bottom: 20px; ">
                                    <tr>
                                        <td valign="middle" style="padding: 0; margin: 0; line-height: 0;">
                                            <img src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1776693732/image_wxefat.png"
                                                width="26" height="26"
                                                style="display: block; border-radius: 6px; border: 0;"
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
                            <table border="0" cellpadding="0" cellspacing="0" align="center"
                                style="margin-bottom: 24px; ">
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

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                firstName: user.firstName,
                username: user.username,
                gmail: user.gmail
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
                message: "Credentials are required"
            });
        }

        const user = await User.findOne({ gmail: gmail.toLowerCase() }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:
                    process.env.NODE_ENV === "production"
                        ? "none"
                        : "lax",
                maxAge: 8 * 60 * 60 * 1000
            });
            res.status(200).json({
                success: true,
                message: "User logined successfully",
                data: {
                    id: user._id,
                    firstName: user.firstName,
                    username: user.username,
                    gmail: user.gmail
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
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
            from: 'CodeSarthi <astra@codesarthi.in>',
            to: [userGmail],
            subject: "Your Verification Code",
            html: `<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

                <!-- Preheader (hidden preview text) -->
                <div
                    style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
                    Your CodeSarthi verification code is ${otp} — expires in 2 minutes.
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
                                            <a href="mailto:codesarthi.help@gmail.com"
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

        ``


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
                    message: "Invalid OTP"
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
                    from: 'CodeSarthi <astra@codesarthi.in>',
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
                    message: "Invalid OTP"
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