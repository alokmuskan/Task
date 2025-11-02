// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // adjust if backend runs elsewhere
});

export default api;
