import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001/api/auth" });

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
