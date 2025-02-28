import Venue from "../models/Venue.js";

export const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createVenue = async (req, res) => {
  try {
    const newVenue = await Venue.create(req.body);
    res
      .status(201)
      .json({ message: "Venue added successfully", venue: newVenue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
