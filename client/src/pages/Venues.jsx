import { useEffect, useState } from "react";
import { getVenues } from "../services/venueService";
import { useNavigate } from "react-router-dom";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const navigateToBookings = (venueId) => () => {
    navigate(`/createBooking/${venueId}`);
  };
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        setVenues(data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A67B5B] to-[#5C4033] text-[#FAF9F6] flex flex-col items-center p-6 md:p-10">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
        Available Venues
      </h2>

      {loading ? (
        <p className="text-lg text-center">Loading venues...</p>
      ) : venues.length === 0 ? (
        <p className="text-lg text-center">No venues available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {venues.map((venue) => (
            <div
              key={venue._id}
              className="bg-[#FAF9F6] text-[#5C4033] p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {/* Venue Image */}
              {venue.images?.length > 0 && (
                <img
                  src={venue.images[0]}
                  alt={venue.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}

              {/* Venue Details */}
              <h3 className="text-2xl font-bold">{venue.name}</h3>
              <p className="opacity-80">{venue.location}</p>
              <p className="mt-2 text-lg opacity-90">
                {venue.description.slice(0, 100)}...
              </p>

              {/* Ratings */}
              <p className="mt-4 text-yellow-500 font-bold text-lg">
                ⭐ {venue.ratings}/5
              </p>

              {/* Book Now Button */}
              <button
                // onClick={() => navigate(`/bookings/${venue._id}`)}
                onClick={navigateToBookings(venue._id)}
                className="mt-4 bg-[#5C4033] text-[#FAF9F6] px-4 py-2 rounded-md text-lg font-semibold hover:bg-[#7A5C46] transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Venues;
