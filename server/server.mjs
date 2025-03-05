import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import venueRoutes from "./src/routes/venueRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import Razorpay from "razorpay";
dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
// console.log(
//   "Razorpay Key Secret:",
//   process.env.RAZORPAY_KEY_SECRET ? "Exists" : "Not Found"
// );

// // ✅ Razorpay Instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID?.trim(), // Trim any accidental spaces
//   key_secret: process.env.RAZORPAY_KEY_SECRET?.trim(),
// });

// // ✅ Payment Route
// app.post("/api/payment", async (req, res) => {
//   try {
//     const { amount, currency } = req.body;

//     const options = {
//       amount: amount * 100, // Convert to paise (smallest currency unit)
//       currency: currency || "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.json({ success: true, order });
//   } catch (error) {
//     console.error("Payment Error:", error);
//     res.status(500).json({ success: false, message: "Payment failed" });
//   }
// });

// ✅ Connect to MongoDB with Better Error Handling
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Event Management API is running...");
});

// ✅ Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
