const mongoose = require("mongoose");
const validator = require("validator");

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,

            validate: {
                validator: validator.isEmail,
                message: "Invalid email",
            },
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        subscribedAt: {
            type: Date,
            default: Date.now,
        },
        unsubscribeToken: {
            type: String,
            default: null,
        },

        unsubscribedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "NewsletterSubscriber",
    newsletterSchema,
    "newslettersubscribers"
);