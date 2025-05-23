import express from "express";
import {
  createBooking,
  getUserBookings,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createBookings", authMiddleware, createBooking);
router.get("/my-bookings", authMiddleware, getUserBookings);

export default router;
