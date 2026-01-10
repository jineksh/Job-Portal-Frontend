import axios from "axios";

// Common config
const axiosConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

// Auth Service Instance
export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
  ...axiosConfig,
});

// Job Service Instance
export const jobApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JOB_SERVICE_URL,
  ...axiosConfig,
});