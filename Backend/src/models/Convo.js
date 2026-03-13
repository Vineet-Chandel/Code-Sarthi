const mongoose = require('mongoose');



const ConvoSchema = new mongoose.Schema({
  Participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }],
  LastMsg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Msg'
  },
  unReadCount: {
    type: Number,
    default: 0,
  },
  lastMsgAt: {
    type: Date
  }
}, { timestamps: true })

module.exports = mongoose.model("Convo", ConvoSchema, "Convo");