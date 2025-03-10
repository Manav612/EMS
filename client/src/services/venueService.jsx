// import axios from "axios";

// // const API_URL = "http://localhost:5001/api/venues";
// const API_URL = "https://ems-n0yt.onrender.com/api/venues";

// export const getVenues = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching venues:", error);
//     throw error;
//   }
// };

import axios from "axios";
import CONFIG from "../config"; // Import the config file

const API_URL = `${CONFIG.API_BASE_URL}/api/venues`;

export const getVenues = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};
