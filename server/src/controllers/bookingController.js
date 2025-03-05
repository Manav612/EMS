// import Booking from "../models/Booking.js";

// export const createBooking = async (req, res) => {
//   try {
//     const newBooking = await Booking.create(req.body);
//     res.status(201).json({ message: "Booking created", booking: newBooking });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const getUserBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.user.id }).populate(
//       "venue"
//     );
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    console.log("====================================");
    console.log(newBooking);
    console.log("====================================");

    // ✅ Ensure io is correctly retrieved from req.app
    const io = req.app.get("io");
    if (!io) {
      console.error("❌ WebSocket (io) is not defined in req.app.");
      return res.status(500).json({ message: "WebSocket server error" });
    }

    // ✅ Emit WebSocket Notification
    io.emit("new_notification", {
      message: `New booking created for venue ID: ${newBooking.venue}`,
      userId: newBooking.user,
    });

    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
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
