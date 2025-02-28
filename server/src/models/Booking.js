import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    },
    eventDate: { type: Date, required: true },
    eventType: {
      type: String,
      enum: ["wedding", "corporate", "birthday"],
      required: true,
    },
    additionalServices: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
