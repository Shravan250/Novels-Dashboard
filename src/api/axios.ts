import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:4002",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
