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
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  cardNumber: { type: String, required: true },

  order: [productSchema],
  Date,
});

const OrderModel = model('Orders', orderSchema);
module.exports = OrderModel;
