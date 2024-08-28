import axios from "axios";
import dayjs from "dayjs";
import React, { createContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    tokenExpiry: null,
    userEmail: null,
  });

  // Handle login operation
  const login = (tokenExpiry, email) => {
    setAuthState({
      isLoggedIn: true,
      tokenExpiry: tokenExpiry,
      userEmail: email,
    });
    localStorage.setItem("tokenExpiry", tokenExpiry);
    localStorage.setItem("userEmail", email);
  };

  // Handle logout operation
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
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
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      async (config) => {
        const tokenExpiry = authState.tokenExpiry;

        if (tokenExpiry && dayjs(tokenExpiry).isBefore(dayjs())) {
          // Token is expired, request a new one
          try {
            const response = await axios.post(
              "http://localhost:3000/api/auth/refresh",
              {},
              { withCredentials: true }
            );

            const { tokenExpiry: newTokenExpiry } = response.data;

            setAuthState((prevState) => ({
              ...prevState,
              tokenExpiry: newTokenExpiry,
            }));

            localStorage.setItem("tokenExpiry", newTokenExpiry);
          } catch (error) {
            console.error("Failed to refresh token:", error);
            logout(); // If refresh fails, logout the user
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [authState.tokenExpiry]);

  // Set data
  // const setData = (data) => {
  //   setAuthState((prevState) => ({
  //     ...prevState,
  //     data,
  //   }));
  // };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
