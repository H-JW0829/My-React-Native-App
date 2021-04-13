const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: String,
  conversion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'message',
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  time: Number,
  read: Boolean,
});

const Message = mongoose.model('message', MessageSchema);
module.exports = Message;
