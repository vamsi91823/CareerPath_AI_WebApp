import axios from "axios";

const API = axios.create({
  baseURL: "https://careerpathai-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
