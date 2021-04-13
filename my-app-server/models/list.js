const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  images: [String],
  title: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  desc: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Listing = mongoose.model('listing', ListingSchema);
module.exports = Listing;
