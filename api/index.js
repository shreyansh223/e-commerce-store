const express = require('express');
const cors = require('cors');
const Product = require('./models/Product');
const Order = require('./models/Orders');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(
  'mongodb+srv://shreyanshgupta0440:2RLL3OllS7AWRWJn@cluster0.ujztv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);
app.get('/products', async (req, res) => {
  res.json(await Product.find());
});

app.post('/submit', async (req, res) => {
  const { name, address, contact, cardno, mm, cvv, yyyy, order } = req.body;

  const newOrder = new Order({
    name,
    address,
    contact,
    cardNumber: cardno,
    mm,
    cvv,
    yyyy,
    order,
  });
  await newOrder.save();

  res.json({ message: 'Payment Successful Order Placed!!', data: req.body });
});
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
