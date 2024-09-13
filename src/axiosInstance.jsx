import axios from "axios";
import { BASE_URL } from "./services/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Axios interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If it's a 401 error and we haven't already tried to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // If the refresh was successful, update the auth state with the new token
        if (res.data.message === "Access token refreshed successfully") {
          localStorage.setItem("tokenExpiry", res.data.tokenExpiry);

          // Update the Authorization header with the new token
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;

          // Retry the original request with the new access token
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
