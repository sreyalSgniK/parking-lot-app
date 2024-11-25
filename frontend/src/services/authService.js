import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8080";

// Save user profile in cookies
export const saveUserToCookie = (user) => {
  Cookies.set("userProfile", JSON.stringify(user), { expires: 7 }); // Expires in 7 days
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    }); // This ensures POST request
    saveUserToCookie(response.data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const logout = () => {
  localStorage.removeItem("account");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("account"));
};
