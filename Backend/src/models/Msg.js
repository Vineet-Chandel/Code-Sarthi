const mongoose = require('mongoose');


const MsgSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Convo",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true

    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    content: {
        type: String,
    },
    ImgOrVideoUrl: {
        type: String,
    },
    ContentType: {
        type: String,
        enum: ['image', 'video', 'text']
    },
    Reactions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            emoji: String
        }
    ],
    messageStatus: {
        type: String,
        enum: ["sent", "delivered", "seen"],
        default: 'sent',

    },
    deletedForEveryone: {
        type: Boolean,
        default: false
    },
    deletedFor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }]
}, { timestamps: true });

MsgSchema.index({ conversation: 1, createdAt: -1 });

module.exports = mongoose.model("Msg", MsgSchema, "Msg");