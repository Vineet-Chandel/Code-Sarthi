const mongoose = require('mongoose');
const { ref } = require('process');


const ConvoSchema = new mongoose.Schema({
  Participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'connections'
  }],
  LastMsg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Msg'
  },
  unReadCount: {
    type: Number,
    default: 0
  }
}, { Timestamp: true })

module.exports = mongoose.model("Convo", ConvoSchema, "Convo");