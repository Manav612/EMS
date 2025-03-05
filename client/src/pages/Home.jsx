import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-[#A67B5B] to-[#5C4033] min-h-screen flex flex-col items-center justify-center text-[#FAF9F6]">
      {/* Hero Section */}
      <div className="text-center max-w-3xl px-6 pt-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider drop-shadow-lg">
          Welcome to <span className="text-[#D2B48C]">EliteEvents</span>
        </h1>
        <p className="text-lg md:text-xl mt-4 text-[#FAF9F6] opacity-90">
          Your one-stop solution for managing and discovering exclusive events.
          Experience seamless event planning like never before.
        </p>
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-[#D2B48C] text-[#5C4033] px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#B29575] transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border-2 border-[#D2B48C] text-[#FAF9F6] px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#D2B48C] hover:text-[#5C4033] transition"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="mt-16 w-full max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Business Gala", date: "March 20, 2025" },
            { title: "Tech Conference", date: "April 5, 2025" },
            { title: "Music Fest", date: "May 12, 2025" },
          ].map((event, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-center"
            >
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              <p className="opacity-90 mt-2">{event.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center max-w-3xl px-6">
        <h2 className="text-3xl font-bold">Plan Your Event Effortlessly</h2>
        <p className="mt-2 opacity-90">
          Join our platform to create, manage, and attend the most exclusive
          events with ease.
        </p>
        <Link
          to="/register"
          className="mt-6 inline-block bg-[#D2B48C] text-[#5C4033] px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#B29575] transition"
        >
          Start Now
        </Link>
      </div>

      <footer className="mt-16 py-6 w-full text-center bg-[#5C4033]">
        <p className="text-[#FAF9F6] opacity-80">
          &copy; 2025 EliteEvents. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
