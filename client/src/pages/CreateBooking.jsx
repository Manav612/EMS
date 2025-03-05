import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";
import { getVenues } from "../services/venueService";

const CreateBooking = () => {
  const { venueId } = useParams();
  console.log("venueId:", venueId);

  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("user:", user);

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

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { createBooking } from "../services/bookingService";
// import { useAuth } from "../context/AuthContext";
// import { getVenues } from "../services/venueService";
// import axios from "axios";

// const CreateBooking = () => {
//   const { venueId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [venue, setVenue] = useState(null);
//   const [eventType, setEventType] = useState("wedding");
//   const [eventDate, setEventDate] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchVenue = async () => {
//       try {
//         const venues = await getVenues();
//         const selectedVenue = venues.find((v) => v._id === venueId);
//         if (!selectedVenue) {
//           setError("Venue not found");
//         } else {
//           setVenue(selectedVenue);
//         }
//       } catch (err) {
//         setError("Failed to fetch venue details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVenue();
//   }, [venueId]);

//   const handlePayment = async () => {
//     if (!eventDate) {
//       setError("Please select an event date.");
//       return;
//     }

//     // ✅ Convert price from "$1000" → 1000
//     const price = parseInt(venue.price.replace(/[^0-9]/g, ""), 10);
//     console.log("price", price);

//     const body = {
//       amount: price * 100, // Convert to paise (smallest unit in INR)
//       currency: "INR",
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/api/payment",
//         body,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("====================================");
//       console.log(response);
//       console.log("====================================");

//       const data = response.data;

//       if (!data.success) throw new Error("Payment initiation failed");

//       const options = {
//         key: "rzp_test_4mMJ7O2UWx3lBt", // Razorpay Test Key
//         amount: data.order.amount,
//         currency: data.order.currency,
//         name: "HuntsJob Events",
//         description: `Booking for ${venue.name}`,
//         order_id: data.order.id,
//         handler: async function (response) {
//           console.log("Payment successful:", response);

//           await createBooking({
//             user: user.id,
//             venue: venueId,
//             eventType,
//             eventDate,
//             payment_id: response.razorpay_payment_id,
//           });

//           navigate("/bookings");
//         },
//         prefill: {
//           name: user?.name || "Guest",
//           email: user?.email || "guest@example.com",
//           contact: "9999999999", // Change this if needed
//         },
//         theme: {
//           color: "#5C4033",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       setError("Payment failed. Please try again.");
//     }
//   };

//   if (loading)
//     return <p className="text-center text-lg">Loading venue details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#A67B5B] to-[#5C4033] text-[#FAF9F6] flex flex-col items-center p-6 md:p-10">
//       <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
//         Book Venue
//       </h2>

//       <div className="bg-[#FAF9F6] text-[#5C4033] p-6 rounded-xl shadow-lg w-full max-w-lg">
//         {venue?.images?.length > 0 && (
//           <img
//             src={venue.images[0]}
//             alt={venue.name}
//             className="w-full h-48 object-cover rounded-md mb-4"
//           />
//         )}

//         <h3 className="text-2xl font-bold">{venue?.name}</h3>
//         <p className="opacity-80">{venue?.location}</p>
//         <p className="mt-2 text-lg opacity-90">{venue?.description}</p>
//         <p className="mt-2 text-lg font-bold">Price: {venue?.price}</p>

//         <div className="mt-4">
//           <label className="block text-lg font-bold">Event Type:</label>
//           <select
//             value={eventType}
//             onChange={(e) => setEventType(e.target.value)}
//             className="w-full p-2 mt-1 text-[#5C4033] bg-[#FAF9F6] border rounded-md"
//           >
//             <option value="wedding">Wedding</option>
//             <option value="birthday">Birthday</option>
//             <option value="conference">Conference</option>
//           </select>
//         </div>

//         <div className="mt-4">
//           <label className="block text-lg font-bold">Event Date:</label>
//           <input
//             type="date"
//             value={eventDate}
//             onChange={(e) => setEventDate(e.target.value)}
//             className="w-full p-2 mt-1 text-[#5C4033] bg-[#FAF9F6] border rounded-md"
//           />
//         </div>

//         {error && <p className="text-red-500 mt-2">{error}</p>}

//         <button
//           onClick={handlePayment}
//           className="mt-4 w-full bg-[#5C4033] text-[#FAF9F6] px-4 py-2 rounded-md text-lg font-semibold hover:bg-[#7A5C46] transition"
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateBooking;
