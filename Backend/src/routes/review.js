const express = require("express");
const reviewRouter = express.Router();
const Review = require("../models/review");

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

        if (!isValidRating(data.msg, 1, 5) || !isValidRating(data.nps, 0, 10)) {
            return res.status(400).json({
                success: false,
                message: "Invalid rating values"
            });
        }

        // Create review
        const review = await Review.create(data);

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