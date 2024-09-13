import axios from "axios";
import dayjs from "dayjs";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [authState, setAuthState] = useState({
//     isLoggedIn: false,
//     tokenExpiry: localStorage.getItem("tokenExpiry"),
//     userEmail: localStorage.getItem("userEmail"),
//   });

//   // Function to update state
//   const updateAuthState = (tokenExpiry, email) => {
//     setAuthState({
//       isLoggedIn: true,
//       tokenExpiry,
//       userEmail: email,
//     });
//     localStorage.setItem("tokenExpiry", tokenExpiry);
//     localStorage.setItem("userEmail", email);
//   };

//   // Handle login operation
//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/api/auth/login`,
//         { email, password },
//         { withCredentials: true }
//       );

//       if (res.data.message === "Logged in successfully") {
//         updateAuthState(res.data.tokenExpiry, email);
//         return { success: true };
//       } else {
//         return { success: false, error: res.data.message || "Login failed" };
//       }
//     } catch (error) {
//       console.error("Something went wrong during login:", error);
//       return { success: false, error: "Something went wrong during login" };
//     }
//   };

//   // Handle logout operation
//   const logout = async () => {
//     try {
//       await axios.post(
//         `${BASE_URL}/api/auth/logout`,
//         {},
//         { withCredentials: true }
//       );
//       setAuthState({
//         isLoggedIn: false,
//         tokenExpiry: null,
//         userEmail: null,
//       });
//       localStorage.removeItem("tokenExpiry");
//       localStorage.removeItem("userEmail");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ authState, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
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

  // Function to refresh access token
  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );

      if (res.data.message === "Access token refreshed successfully") {
        updateAuthState(res.data.tokenExpiry, authState.userEmail);
        console.log("Access token refreshed successfully");
      } else {
        console.error("Failed to refresh access token:", res.data.message);
        logout();
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      logout();
    }
  };

  useEffect(() => {
    const checkForExistingSession = async () => {
      // Check if there's a refresh token (could be in an HttpOnly cookie)
      if (localStorage.getItem("tokenExpiry")) {
        try {
          await refreshAccessToken(); 
          navigate("/dashboard"); 
        } catch (error) {
          console.error("Failed to refresh token:", error);
          navigate("/login"); 
        }
      } else {
        navigate("/login"); 
      }
    };

    checkForExistingSession();
  }, []);

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
      return { success: false, error: "Username or Password is incorrect" };
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
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Set up interval to check token expiry and refresh if needed
  useEffect(() => {
    if (authState.isLoggedIn) {
      const interval = setInterval(() => {
        const now = dayjs();
        const expiry = dayjs(authState.tokenExpiry);

        if (expiry.diff(now, "minute") <= 1) {
          // If token is about to expire in 1 minute
          refreshAccessToken();
        }
      }, 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [authState.isLoggedIn, authState.tokenExpiry]);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
