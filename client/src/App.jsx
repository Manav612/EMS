import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Venues from "./pages/Venues";
import CreateBooking from "./pages/CreateBooking";
import { MessageCircle, MessageCircleMore } from "lucide-react"; // WhatsApp-like Icon

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Login />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/venues" element={<Venues />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/bookings"
          element={<PrivateRoute element={<Bookings />} />}
        />
        <Route
          path="/createBooking/:venueId"
          element={<PrivateRoute element={<CreateBooking />} />}
        />
      </Routes>

      <a
        href="https://wa.me/8355837646"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 group flex items-center space-x-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="p-2 bg-white rounded-full group-hover:rotate-12 transition-all duration-300">
          <MessageCircleMore className="w-8 h-8 text-green-500 group-hover:scale-110 transition-all duration-300" />
        </div>
      </a>
    </>
  );
}

export default App;
