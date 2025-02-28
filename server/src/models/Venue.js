import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String },
    ratings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Venue", venueSchema);
