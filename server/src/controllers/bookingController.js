import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "venue"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
