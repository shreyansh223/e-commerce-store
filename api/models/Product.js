const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const colorSchema = new mongoose.Schema({
  code: { type: String },
  img: { type: String },
});
const productSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  colors: [colorSchema],
});

const ProductModel = model('Product', productSchema);
module.exports = ProductModel;
