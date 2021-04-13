const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  icon: String,
  title: String,
  backgroundColor: String,
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;
