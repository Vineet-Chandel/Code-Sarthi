const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        requesterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        }
    },
    { timestamps: true }
);


connectionSchema.index(
    { requesterId: 1, receiverId: 1 },
    { unique: true }
);


const ConnectionModel = new mongoose.model(
    "Connection",
    connectionSchema
);

module.exports = ConnectionModel;