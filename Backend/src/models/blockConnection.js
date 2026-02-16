const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema(
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



blockSchema.index(
    { requesterId: 1, receiverId: 1 },
    { unique: true }
);


const blockModel = new mongoose.model(
    "block",
    blockSchema
);

module.exports = blockModel;