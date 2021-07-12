const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  itemsPrice: {
    type: String,
    required: true,
  },
  deliveryCharges: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  modeOfPayment: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      image: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
