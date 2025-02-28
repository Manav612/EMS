import express from "express";
import { getAllVenues, createVenue } from "../controllers/venueController.js";

const router = express.Router();

router.get("/", getAllVenues);
router.post("/add", createVenue); // Admin only (Add middleware later)

export default router;
