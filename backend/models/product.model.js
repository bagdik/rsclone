const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  username: { type: String, required: true },
  type: {type: String, required: true},
  description: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  link: { type: String, required: true, unique: true, trim: true, minlength: 3},
  
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;