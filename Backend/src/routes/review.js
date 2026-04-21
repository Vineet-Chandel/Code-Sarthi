const express = require("express");
const reviewRouter = express.Router();
const Review = require("../models/review");
const { Resend } = require('resend');

const resend = new Resend(String(process.env.RESEND_API_KEY));

// CREATE REVIEW API
reviewRouter.post("/create-review", async (req, res) => {
    try {
        const data = req.body;

        // Required fields
        if (!data.name || !data.email || !data.reviewText) {
            return res.status(400).json({
                success: false,
                message: "Name, email and reviewText are required"
            });
        }

        // Email validation
        const isValidEmail = (email) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!isValidEmail(data.email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        // Length check
        if (data.reviewText.length < 40) {
            return res.status(400).json({
                success: false,
                message: "Review too short"
            });
        }

        // Detect malicious content
        const containsScript = (text) =>
            /<script|onerror|onload/i.test(text);

        if (containsScript(data.name) || containsScript(data.reviewText)) {
            return res.status(400).json({
                success: false,
                message: "Malicious content detected"
            });
        }

        // Sanitize
        const sanitize = (str) =>
            str.replace(/<[^>]*>?/gm, "");

        data.name = sanitize(data.name);
        data.reviewText = sanitize(data.reviewText);
        data.best = data.best ? sanitize(data.best) : undefined;
        data.better = data.better ? sanitize(data.better) : undefined;

        // Rating validation
        const isValidRating = (val, min, max) =>
            val == null || (val >= min && val <= max);

        if (!isValidRating(data.msg, 0, 5) || !isValidRating(data.nps, 0, 10)) {
            return res.status(400).json({
                success: false,
                message: "Invalid rating values"
            });
        }

        // Create review
        const review = await Review.create(data);


        const { emailData, emailError } = await resend.emails.send({
            from: 'CodeSarthi <nova@codesarthi.in>',
            to: [data.email],
            subject: "Thanks for your review on CodeSarthi 🎉",
            html: `
<body style="margin:0; padding:0; background-color:#f0f2ff; font-family:Arial,Helvetica,sans-serif;">

    <!-- Preheader -->
    <div
        style="display:none;font-size:1px;color:#f0f2ff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Thank you for your review on CodeSarthi! Your feedback helps thousands of developers make
        better ecosystem of developing.
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
                                               <td align="center" style="vertical-align:middle;">
  
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
                            <p style="margin:14px 0 0; color:#9b9fc4; font-size:13px; letter-spacing:0.4px;">THANKS YOU
                                FOR YOUR REVIEW</p>
                        </td>
                    </tr>

                    <!-- ===== THANK YOU BANNER ===== -->
                    <tr>
                        <td
                            style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#1e1b4b 100%); padding:36px 32px 28px; text-align:center;">

                            <!-- Star icon ring -->
                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                style="margin-bottom:18px;">
                                <tr>
                                    <td
                                        style="width:80px; height:80px; border-radius:50%; background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2); text-align:center; vertical-align:middle;">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td
                                                    style="width:60px; height:60px; border-radius:50%; background:rgba(99,102,241,0.6); text-align:center; vertical-align:middle;">
                                                    <span
                                                        style="font-size:30px; color:#ffffff; line-height:60px; display:block;">&#11088;</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <h1 style="margin:0 0 8px; font-size:24px; font-weight:700; color:#ffffff;">
                                Thank you, ${data.name}! &#127881;
                            </h1>
                            <p style="margin:0 0 18px; font-size:14px; color:rgba(255,255,255,0.70); line-height:1.6;">
                                Your review means the world to us and helps thousands of developers<br>make better
                                decisions on CodeSarthi.
                            </p>


                        </td>
                    </tr>

                    <!-- ===== BODY ===== -->
                    <tr>
                        <td style="background:#ffffff; padding:32px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 20px; font-size:15px; color:#2d3060; line-height:1.7;">
                                Hello, <strong style="color:#1a1a2e;">${data.name}</strong> 👋<br>
                                We've received your review and it has been published on CodeSarthi. Honest feedback from
                                our community is what makes this platform better for everyone. We truly appreciate you
                                taking the time to share your experience.
                            </p>

                            <!-- Info: Reviewer -->
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
                                                        Review by</p>
                                                    <p
                                                        style="margin:0; font-size:13px; color:#2d3060; font-weight:600;">
                                                       ${data.name}
                                                    </p>
                                                </td>
                                                <td align="right">
                                                    <span
                                                        style="display:inline-block; background:#e1f5ee; color:#085041; font-size:11px; font-weight:600; border-radius:20px; padding:3px 10px; letter-spacing:0.3px;">Published</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>


                            <!-- Info: Submitted at -->
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
                                                        Submitted at</p>
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

                            <!-- Review Snapshot -->
                            <p
                                style="margin:0 0 14px; font-size:12px; color:#9b9fc4; text-transform:uppercase; letter-spacing:0.8px;">
                                Your review snapshot</p>

                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="background:#f7f8ff; border:1px solid #e4e6f8; border-radius:12px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:20px;">

                                        <!-- Stars -->
                                        <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                                            <tr>
${Array(data.msg).fill("⭐").join(" ")}

                                            </tr>
                                        </table>

                                        <!-- Review text -->
                                        <p
                                            style="margin:0 0 16px; font-size:14px; color:#2d3060; line-height:1.7; font-style:italic; border-left:3px solid #667eea; padding-left:14px;">
                                            &ldquo;${data.reviewText}&rdquo;
                                        </p>

                                        <!-- Reviewer meta -->
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="padding-left:10px;">
                                                    <p
                                                        style="margin:0 0 2px; font-size:13px; font-weight:700; color:#1a1a2e;">
                                                        ${data.name}</p>

                                                </td>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>
                            </table>


                            <!-- Secondary CTA -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://www.codesarthi.in/login"
                                            style="display:inline-block; background:#f7f8ff; color:#4f46e5; text-decoration:none; border-radius:12px; padding:14px 40px; font-size:14px; font-weight:700; letter-spacing:0.3px; border:1px solid #e4e6f8;">
                                            Continue to CodeSarthi
                                        </a>
                                    </td>
                                </tr>
                            </table>



                            <!-- Support -->
                            <p
                                style="margin:20px 0 0; font-size:13px; color:#9b9fc4; text-align:center; line-height:1.6;">
                                Questions? Contact us at
                                <a href="mailto:codesarthi.help@gmail.com " style=color:#4f46e5; font-weight:600;
                                    text-decoration:none;">codesarthi.help@gmail.com</a>
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
        res.status(201).json({
            success: true,
            message: "Review submitted successfully"
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Review already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: Object.values(error.errors).map(e => e.message)
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = reviewRouter;