import express from "express";
import Order from "../models/Order.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    // dummy email config
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });

    await transporter.sendMail({
      from: '"Shoe Store" <noreply@shoestore.com>',
      to: req.body.email,
      subject: "Order Confirmation",
      text: `Thank you for your order! ID: ${savedOrder._id}`
    });

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Order error:", err);
    res.status(500).json({ error: "Failed to submit order" });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("❌ Fetch order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
