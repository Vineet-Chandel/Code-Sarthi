const mongoose = require("mongoose");
const { Schema } = mongoose;

const scheduleSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Users",
        },
        goal: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Goals",
        },
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["Scheduled", "Completed", "Missed"],
            default: "Scheduled",
        },
        notes: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Schedules", scheduleSchema, "Schedules");
