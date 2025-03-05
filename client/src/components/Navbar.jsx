import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // Import icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Scroll Event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full py-4 px-6 shadow-md transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 left-0 bg-[#5C4033] bg-opacity-90 backdrop-blur-md z-50"
          : "relative bg-[#5C4033]"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#D2B48C] to-[#8B5A2B] drop-shadow-lg"
        >
          Elite<span className="text-[#FAF9F6]">Events</span>
        </Link>

        {/* Burger Menu Icon (Mobile) */}
        <button
          className="md:hidden text-[#FAF9F6] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
          >
            Home
          </Link>
          <Link
            to="/venues"
            className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
          >
            Venues
          </Link>
          {user ? (
            <>
              <Link
                to="/bookings"
                className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
              >
                My Bookings
              </Link>
              <Link
                to="/dashboard"
                className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-[#A67B5B] text-[#FAF9F6] px-4 py-2 rounded-lg hover:bg-[#8B6F47] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#A67B5B] text-[#FAF9F6] px-4 py-2 rounded-lg hover:bg-[#8B6F47] transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#5C4033] py-4 px-6 w-full">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/venues"
              className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
              onClick={() => setMenuOpen(false)}
            >
              Venues
            </Link>
            {user ? (
              <>
                <Link
                  to="/bookings"
                  className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <Link
                  to="/dashboard"
                  className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-[#A67B5B] text-[#FAF9F6] px-4 py-2 md:w-40 rounded-lg hover:bg-[#8B6F47] transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#FAF9F6] hover:text-[#D2B48C] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#A67B5B] text-[#FAF9F6] px-4 py-2 rounded-lg hover:bg-[#8B6F47] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
