import axios from "axios";

// const API_URL = "http://localhost:5001/api/venues";
const API_URL = "https://ems-n0yt.onrender.com/api/venues";

export const getVenues = async () => {
  try {
    const response = await axios.get(API_URL);
    // console.log("-------  venues -------", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};
