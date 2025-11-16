import axios from "axios";

const API = axios.create({
  baseURL: "https://landing-page-builder-backend.onrender.com/api", // backend URL
});

// 🔐 attach token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
