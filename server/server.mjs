import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import venueRoutes from "./src/routes/venueRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";

dotenv.config();

const app = express();

// ✅ Fix CORS Issue
app.use(
  cors({
    origin: "*", // Allow all origins (or specify your frontend URL)
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"], // Ensure headers are allowed
  })
);

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Default Route
app.get("/", (req, res) => {
  res.send("Event Management API is running...");
});

// ✅ Place CORS fix **before defining routes**
app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
