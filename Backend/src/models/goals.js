const mongoose = require("mongoose");
const { Schema } = mongoose; //“We are extracting the Schema property from the mongoose object and storing it in a variable called Schema.”

const goalSchema = new Schema(

    {

        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxength: 500,

        },
        status: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxength: 100,
            enum: ["Completed", "In Progress", "On Track", "At Risk", "Not Started", "On Hold"]
        },
        progress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        targetDate: {
            type: Date,
            // required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Users",
        },
        following: {
            type: Boolean,
            default: false
        },
        lastUpdated: {
            type: Date
        },
        priority: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxength: 100,
            enum: ["Critical", "High", "Medium", "Low"]
        },
        category: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxength: 100
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxength: 1000,
        },

        tags: [
            {
                type: String,
                trim: true,
                minlength: 2,
                maxength: 50
            }
        ],
        isArchived: {
            type: Boolean,
            default: false
        },
        comments: [
            {
                byUser: {
                    type: Schema.Types.ObjectId,
                    ref: "Users",
                    required: true
                },
                text: {
                    type: String,
                    required: true,
                    trim: true,
                    minlength: 3,
                    maxength: 1000
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                },
                reactions: [
                    {
                        byUser: {
                            type: Schema.Types.ObjectId,
                            ref: "Users",
                            required: true
                        },
                        emoji: {
                            type: String,
                            required: true
                        }
                    }
                ]
            }
        ]
    },

)

module.exports = mongoose.model("Goals", goalSchema, "Goals")