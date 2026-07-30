// src/api/axios.js

import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;