import axios from "axios";

// const API_URL = "http://localhost:5001/api/bookings";
const API_URL = "https://ems-n0yt.onrender.com/api/bookings";

export const getUserBookings = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/my-bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    console.log("-------  bookingData -------", bookingData);

    const response = await axios.post(
      `${API_URL}/createBookings`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};
