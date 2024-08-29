import axios from "axios";
import dayjs from "dayjs";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    tokenExpiry: localStorage.getItem("tokenExpiry"),
    userEmail: localStorage.getItem("userEmail"),
  });

  // Function to update state
  const updateAuthState = (tokenExpiry, email) => {
    setAuthState({
      isLoggedIn: true,
      tokenExpiry,
      userEmail: email,
    });
    localStorage.setItem("tokenExpiry", tokenExpiry);
    localStorage.setItem("userEmail", email);
  };

  // Handle login operation
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.message === "Logged in successfully") {
        updateAuthState(res.data.tokenExpiry, email);
        return { success: true };
      } else {
        return { success: false, error: res.data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Something went wrong during login:", error);
      return { success: false, error: "Something went wrong during login" };
    }
  };

  // Handle logout operation
  const logout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setAuthState({
        isLoggedIn: false,
        tokenExpiry: null,
        userEmail: null,
      });
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("userEmail");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Axios interceptor for request
  // useEffect(() => {
  //   const interceptor = axios.interceptors.request.use(
  //     async (config) => {
  //       const tokenExpiry = authState.tokenExpiry;

  //       if (tokenExpiry && dayjs(tokenExpiry).isBefore(dayjs())) {
  //         try {
  //           console.log("Token expired, requesting new token");
  //           const response = await axios.post(
  //             `${BASE_URL}/api/auth/refresh`,
  //             {},
  //             { withCredentials: true }
  //           );
  //           const { tokenExpiry: newTokenExpiry } = response.data;

  //           console.log("Received new token expiry:", newTokenExpiry);
  //           updateAuthState(newTokenExpiry, authState.userEmail);
  //         } catch (error) {
  //           console.error("Failed to refresh token:", error);
  //           logout(); // If refresh fails, logout the user
  //         }
  //       }
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   return () => {
  //     axios.interceptors.request.eject(interceptor);
  //   };
  // }, [authState.tokenExpiry]);

  // Axios interceptor for request
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        // If the response is successful, return it
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 403) {
          const errorMessage = error.response.data.message;

          if (errorMessage === "Not authorized, no token") {
            console.warn("Access denied, redirecting to login.");
            setIsRefreshing(false);
            logout();
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  // Handle refresh token operation
  const refreshToken = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const { tokenExpiry: newTokenExpiry, userEmail } = response.data;
      console.log("Received new token expiry:", newTokenExpiry);

      // Update the auth state with the new token expiry
      updateAuthState(newTokenExpiry, userEmail);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Check token expiry on component mount and refresh if needed
  useEffect(() => {
    if (authState.isLoggedIn) {
      const tokenExpiry = authState.tokenExpiry;
      if (tokenExpiry && dayjs(tokenExpiry).isBefore(dayjs())) {
        refreshToken();
      }
    }
  }, [authState.isLoggedIn, authState.tokenExpiry]);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
