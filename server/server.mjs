// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./src/routes/authRoutes.js";
// import venueRoutes from "./src/routes/venueRoutes.js";
// import bookingRoutes from "./src/routes/bookingRoutes.js";

// dotenv.config();

// const app = express();

// // ✅ Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ CORS Configuration
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // ✅ Connect to MongoDB with Better Error Handling
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); // Exit process if MongoDB connection fails
//   });

// // ✅ Default Route
// app.get("/", (req, res) => {
//   res.send("Event Management API is running...");
// });

// // ✅ Define Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/venues", venueRoutes);
// app.use("/api/bookings", bookingRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http"; // Import HTTP module
import authRoutes from "./src/routes/authRoutes.js";
import venueRoutes from "./src/routes/venueRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
  },
});

// ✅ Store `io` in `app` so it can be accessed in other routes
app.set("io", io);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ WebSocket Connection
io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ✅ API Route to Emit Notifications
app.post("/api/notify", (req, res) => {
  const { message, userId } = req.body;

  // Emit notification event to all connected clients (or specific user if needed)
  io.emit("new_notification", { message, userId });

  res.json({ success: true, message: "Notification sent" });
});

// ✅ Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
