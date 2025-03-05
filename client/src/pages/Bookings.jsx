import { useEffect, useState } from "react";
import { getUserBookings } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getUserBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A67B5B] to-[#5C4033] text-[#FAF9F6] flex flex-col items-center p-6 md:p-10">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
        My Bookings
      </h2>

      {loading ? (
        <p className="text-lg text-center">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-lg text-center">No bookings found.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#FAF9F6] text-[#5C4033] p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {/* Venue Image */}
              {booking.venue?.images?.length > 0 && (
                <img
                  src={booking.venue.images[0]}
                  alt={booking.venue.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}

              {/* Venue Details */}
              <h3 className="text-2xl font-bold">{booking.venue.name}</h3>
              <p className="opacity-80">{booking.venue.location}</p>
              <p className="mt-2 text-lg opacity-90">
                {booking.venue.description.slice(0, 100)}...
              </p>

              {/* Event Details */}
              <p className="mt-4 text-lg">
                <strong>Event Type:</strong> {booking.eventType}
              </p>
              <p className="mt-2 text-lg">
                <strong>Event Date:</strong>{" "}
                {new Date(booking.eventDate).toDateString()}
              </p>

              {/* Additional Services */}
              {booking.additionalServices?.length > 0 && (
                <p className="mt-2 text-lg">
                  <strong>Additional Services:</strong>{" "}
                  {booking.additionalServices.join(", ")}
                </p>
              )}

              {/* Status */}
              <p
                className={`mt-4 font-bold text-lg ${
                  booking.status === "pending"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
