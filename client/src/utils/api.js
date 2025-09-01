// src/utils/api.js
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
});

// helper to set/remove Authorization header
export const setAuthToken = (token) => {
    if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete API.defaults.headers.common["Authorization"];
};

export default API;
