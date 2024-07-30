// tokenUtils.ts
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

const setupInterceptors = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("No token found in session storage");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error("401 error received, logging out user");
        sessionStorage.removeItem("authToken");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const axiosInstance = setupInterceptors();
