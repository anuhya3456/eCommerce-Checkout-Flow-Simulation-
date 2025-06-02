import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/order.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
  });
})
.catch((err) => console.error("❌ MongoDB error:", err));