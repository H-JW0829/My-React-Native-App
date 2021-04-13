const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversionSchema = new Schema({
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'message',
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  consumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  producerUnread: {
    default: 0,
    type: Number,
  },
  consumerUnread: {
    default: 0,
    type: Number,
  },
});

const Conversion = mongoose.model('conversion', ConversionSchema);
module.exports = Conversion;
