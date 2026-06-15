const mongoose = require('mongoose');


const MsgSchema = new mongoose.Schema({

    // ID OF CONVERSATION, it tells that the message is been going to send on the team or the private, so it have the various feilds to know about it 
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Convo",
        required: true
    },

    // Senders Id: who is sending the message
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true

    },

    //Receiver Id: who is receiving the message 
    // receiver_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Users',
    //     required: true,
    // },

    //not needed as we get to know who is the reciver by the conversation model

    //Text Content Which is been sent
    content: {
        type: String,
    },

    // Media url if message is been sent in format of image or video
    attachments: [
        {
            type: {
                type: String,
                enum: ["image", "video", "file", "audio"]
            },
            url: String,
            size: Number,
            mimeType: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    //Reaction
    reactions: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
            },
            emoji: String
        }
    ],

    deletedFor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",

    }],


    replyTo: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        content: String,
        media: {
            type: {
                String,
                enum: ["image", "video", "file", "audio"]
            },
            url: String,
            size: Number,
            mimeType: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    },

    forwarded: {
        type: Boolean,
        default: false,
    },
    edited: {
        type: Boolean,
        default: false
    },
    editedAt: {
        type: Date,
    },
    messageType: {
        type: String,
        enum: [
            "text",
            "image",
            "video",
            "audio",
            "file",
            "code",
            "system"
        ],
        default: "text"
    },
    status: {
        type: String,
        enum: [
            "sending",
            "sent",
        ],
        default: "sending"
    },
    seenBy: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            },
            seenAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

MsgSchema.index({ conversation_id: 1, createdAt: -1 });

module.exports = mongoose.model("message", MsgSchema, "message");