const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  tel: String,
  nickname: String,
  password: String,
  avatar: String,
  myListings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'listing',
    },
  ],
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
