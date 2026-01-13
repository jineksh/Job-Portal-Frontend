import axios from "axios";

const axiosConfig = {
  withCredentials: true,
};

// Auth Service
export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
  ...axiosConfig,
});

// Job Service
export const jobApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JOB_SERVICE_URL,
  ...axiosConfig,
});
