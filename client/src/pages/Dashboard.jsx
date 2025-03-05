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
    <div className="min-h-screen bg-gradient-to-br from-[#A67B5B] to-[#5C4033] text-[#FAF9F6] flex flex-col items-center p-8">
      {/* Welcome Section */}
      <div className="bg-[#FAF9F6] text-[#5C4033] rounded-2xl shadow-xl p-6 md:p-10 w-full max-w-3xl text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Welcome, {user?.name}!
        </h1>
        <p className="text-lg opacity-80 mt-2">
          Manage your bookings and account here.
        </p>
      </div>

      {/* My Bookings Section */}
      <section className="mt-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center mb-4">My Bookings</h2>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-[#FAF9F6] text-[#5C4033] p-5 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold">{booking.venue.name}</h3>
                <p className="opacity-80">
                  Date: {new Date(booking.eventDate).toDateString()}
                </p>
                <p className="opacity-80">Status: {booking.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80">
            You have no bookings yet.
          </p>
        )}
      </section>

      {/* Profile Section */}
      <section className="mt-8 w-full max-w-3xl bg-[#FAF9F6] text-[#5C4033] p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">My Profile</h2>
        <p className="text-lg">
          Name: <span className="font-semibold">{user?.name}</span>
        </p>
        <p className="text-lg">
          Email: <span className="font-semibold">{user?.email}</span>
        </p>
      </section>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-8 bg-[#D2B48C] text-[#5C4033] px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#B29575] transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
