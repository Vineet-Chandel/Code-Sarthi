const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["blocked", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`,
            },
        },
    },
    { timestamps: true }
);

// ConnectionRequest.find({fromUserId: 273478465864786587, toUserId: 273478465864786587})

connectionRequestSchema.index(
    { fromUserId: 1, toUserId: 1 },
    { unique: true }
);


const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;