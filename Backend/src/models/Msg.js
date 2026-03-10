const mongoose = require('mongoose');
const { type } = require('os');

const MsgSchema = new mongoose.Schema({
    Convo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Convo'
    }],
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true

    },
    Receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    Content: {
        type: String,
    },
    ImgOrVideo: {
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
        default: 'send'
    }

}, { Timestamp: true });

module.exports = mongoose.model("Msg", MsgSchema, "Msg");