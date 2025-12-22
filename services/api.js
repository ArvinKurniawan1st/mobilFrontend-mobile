import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.100.211:3000/api"
});

export async function getCameraUrl() {
  const res = await axios.get("http://localhost:3000/api/camera");
  return res.data.streamUrl;
}