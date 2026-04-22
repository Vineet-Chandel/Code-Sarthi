const mongoose = require('mongoose');


const MsgSchema = new mongoose.Schema({
    conversationId: {
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

    Reactions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            emoji: String
        }
    ],
    type: {
        type: String,
        enum: ["text", "code", 'image', 'video'],
        default: "text"
    },
    language: {
        type: String,
        default: ""
    },
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

MsgSchema.index({ conversationId: 1, createdAt: -1 });

module.exports = mongoose.model("Msg", MsgSchema, "Msg");