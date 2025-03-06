import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";
import { getVenues } from "../services/venueService";
import socket from "../components/socket";

const CreateBooking = () => {
  const { venueId } = useParams();

  const navigate = useNavigate();
  const { user } = useAuth();

  const [venue, setVenue] = useState(null);
  const [eventType, setEventType] = useState("wedding");
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venues = await getVenues();
        const selectedVenue = venues.find((v) => v._id === venueId);
        if (!selectedVenue) {
          setError("Venue not found");
        } else {
          setVenue(selectedVenue);
        }
      } catch (err) {
        setError("Failed to fetch venue details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [venueId]);

  const handleBooking = async () => {
    if (!eventDate) {
      setError("Please select an event date.");
      return;
    }

    try {
      await createBooking({
        user: user.id,
        venue: venueId,
        eventType,
        eventDate,
      });

      console.log("✅ Booking created successfully!");
      alert("✅ Booking created successfully!");

      // ✅ Emit event to WebSocket server
      socket.emit("booking_created", { userId: user.id, venueId });

      navigate("/bookings"); // Redirect after success
    } catch (err) {
      setError("Failed to create booking. Please try again.");
    }
  };

  if (loading)
    return <p className="text-center text-lg">Loading venue details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A67B5B] to-[#5C4033] text-[#FAF9F6] flex flex-col items-center p-6 md:p-10">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
        Book Venue
      </h2>

      <div className="bg-[#FAF9F6] text-[#5C4033] p-6 rounded-xl shadow-lg w-full max-w-lg">
        {venue?.images?.length > 0 && (
          <img
            src={venue.images[0]}
            alt={venue.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}

        <h3 className="text-2xl font-bold">{venue?.name}</h3>
        <p className="opacity-80">{venue?.location}</p>
        <p className="mt-2 text-lg opacity-90">{venue?.description}</p>

        <div className="mt-4">
          <label className="block text-lg font-bold">Event Type:</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full p-2 mt-1 text-[#5C4033] bg-[#FAF9F6] border rounded-md"
          >
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="conference">Conference</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-lg font-bold">Event Date:</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full p-2 mt-1 text-[#5C4033] bg-[#FAF9F6] border rounded-md"
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={handleBooking}
          className="mt-4 w-full bg-[#5C4033] text-[#FAF9F6] px-4 py-2 rounded-md text-lg font-semibold hover:bg-[#7A5C46] transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default CreateBooking;
