const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    type: {
        type: String,
        enum: ["Bug", "Feature", "UI/UX", "Performance", "Content", "Other"],
        required: true,
    },

    stars: {
        type: Number,
        min: 1,
        max: 5,
    },

    feedbackArea: {
        type: String,
        enum: [
            "api",
            "dashboard",
            "bots",
            "onboarding",
            "sdk",
            "server",
            "performance",
            "account",
            "safety",
            "other",
        ],
        trim: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 140,
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1040,
    },

    photoUrl: {
        url: {
            type: String,
            default:
                "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1776576935/img_qbbodz.jpg",
        },
        id: {
            type: String,
            default: null,
        },
    },

    name: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    howDidYouHearAboutCodeSarthi: {
        type: String,
        enum: [
            "Friend or colleague",
            "Twitter / X",
            "GitHub",
            "Product Hunt",
            "Search engine",
            "Other",
        ],
        trim: true,
    },
},
    {
        timestamps: true // 🔥 adds createdAt & updatedAt
    });

module.exports = mongoose.model("Feedback", feedbackSchema);