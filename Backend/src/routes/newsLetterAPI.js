const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const validator = require("validator");

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