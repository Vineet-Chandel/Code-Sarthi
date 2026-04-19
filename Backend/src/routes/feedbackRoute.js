const express = require("express");
const feedbackRouter = express.Router();
const Feedback = require("../models/feedback");

// ➤ Create Feedback
feedbackRouter.post("/feedback", async (req, res) => {
    try {
        const { type, title, description } = req.body;

        // ✅ Proper validation
        if (!type || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "Type, title and description are required",
            });
        }

        // ✅ Cleaner creation
        const feedback = new Feedback(req.body);

        await feedback.save();

        res.status(201).json({
            success: true,
            message: "Feedback created successfully",
            data: feedback,
        });

    } catch (err) {
        console.error(err);

        // ✅ Handle mongoose validation errors
        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

module.exports = feedbackRouter;