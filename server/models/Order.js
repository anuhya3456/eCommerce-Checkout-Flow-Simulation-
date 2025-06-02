import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  productName: String,
  variant: String,
  quantity: Number,
  price: Number,
  fullName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  cardNumber: String,
  expiry: String,
  cvv: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;