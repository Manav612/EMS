import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { getUserBookings } from "../services/bookingService";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A67B5B] to-[#5C4033] text-[#FAF9F6] flex flex-col items-center py-12 px-6">
      {/* Welcome Section */}
      <div className="bg-[#FAF9F6] text-[#5C4033] rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-4xl text-center transition-transform duration-300 hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Welcome, {user?.name}! 🎉
        </h1>
        <p className="text-lg opacity-80 mt-3">
          Manage your bookings, profile, and account settings in one place.
        </p>
      </div>

      {/* Bookings Section */}
      <section className="mt-12 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-6">📅 My Bookings</h2>
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-[#FAF9F6] text-[#5C4033] p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-bold">{booking.venue.name}</h3>
                <p className="opacity-80 mt-1">📍 {booking.venue.location}</p>
                <p className="mt-3 text-lg opacity-90">
                  <strong>📆 Event Date:</strong>{" "}
                  {new Date(booking.eventDate).toDateString()}
                </p>
                <p className="mt-2 text-lg">
                  <strong>🔖 Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      booking.status === "pending"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80">
            No bookings found. <br />
            <Link to="/venues" className="underline font-semibold">
              Browse Venues →
            </Link>
          </p>
        )}
      </section>

      {/* Profile Section */}
      <section className="mt-12 w-full max-w-4xl bg-[#FAF9F6] text-[#5C4033] p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">👤 My Profile</h2>
        <div className="text-lg space-y-3">
          <p>
            <strong>Name:</strong>{" "}
            <span className="font-semibold">{user?.name}</span>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <span className="font-semibold">{user?.email}</span>
          </p>
        </div>
      </section>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-12 bg-[#D2B48C] text-[#5C4033] px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-[#B29575] transition-transform duration-200 hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
