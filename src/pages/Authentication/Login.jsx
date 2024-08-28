import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const { login, setData } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.message === "Logged in successfully") {
        const tokenExpiry = res.data.tokenExpiry;
        login(tokenExpiry, email);

        // Fetch data after successful login
        // const dataRes = await axios.get("http://localhost:3000/api/data", {
        //   withCredentials: true,
        // });
        // setData(dataRes.data); // Store data in context
        // console.log(dataRes.data);
        navigate("/dashboard");
      } else {
        setBackendError(res.data.message || "Login failed");
      }
    } catch (err) {
      setBackendError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-wrap items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="email"
                placeholder="Enter your username"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            {errors.global && (
              <p className="text-red-500 text-sm">{errors.global}</p>
            )}

            <button
              className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600 font-bold text-white"
              type="submit"
            >
              Login
            </button>
            {backendError && <p>{backendError}</p>}

            <div className="text-right mt-4"></div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
