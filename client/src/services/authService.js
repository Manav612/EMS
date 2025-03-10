// import axios from "axios";

// const API = "https://ems-n0yt.onrender.com/api/auth";

// // Register User
// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API}/register`, userData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error;
//   }
// };

// // Login User
// export const loginUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API}/login`, userData);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error;
//   }
// };

import axios from "axios";
import CONFIG from "../config";

const API = `${CONFIG.API_BASE_URL}/api/auth`;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/register`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
