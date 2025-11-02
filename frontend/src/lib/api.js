
// src/lib/api.js - UPDATE THIS FILE

import axios from "axios";

// Use environment variable or fallback to relative URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;