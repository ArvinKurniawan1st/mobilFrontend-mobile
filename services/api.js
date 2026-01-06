// services/api.js
import axios from "axios";

const BASE_URL = "http://192.168.100.211:3000/api";

export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for logging
API.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ API Error Response:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("❌ API No Response:", error.message);
    } else {
      console.error("❌ API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// API Functions
export async function getCameraUrl() {
  try {
    const res = await API.get("/camera/status");
    return res.data.camera_url || "http://192.168.100.138/stream";
  } catch (error) {
    console.error("Failed to get camera URL:", error);
    return "http://192.168.100.138/stream";
  }
}

export async function sendCommand(cmd, speed = 180) {
  return API.post("/mobil/command", { cmd, speed });
}

export async function setMode(mode) {
  return API.post("/mobil/mode", { mode });
}

export async function sendWaypoint(x, y) {
  return API.post("/waypoint", { x, y });
}

export async function setBuzzer(state) {
  return API.post("/mobil/buzzer", { state });
}