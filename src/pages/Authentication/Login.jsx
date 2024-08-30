// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../services/api";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [backendError, setBackendError] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const validate = () => {
//     const validationErrors = {};
//     if (!email) validationErrors.email = "Email is required";
//     if (!password) validationErrors.password = "Password is required";
//     return validationErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await login(email, password);
//       if (response.success) {
//         navigate("/dashboard");
//       } else {
//         setBackendError(response.error);
//       }
//     } catch (err) {
//       setBackendError("Something went wrong");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="flex flex-wrap items-center">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//             <h2 className="text-2xl font-bold mb-4">Login</h2>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Username</label>
//               <input
//                 type="email"
//                 placeholder="Enter your username"
//                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">{errors.password}</p>
//               )}
//             </div>
//             {/* {backendError && (
//               <p className="text-red-500 text-sm">{backendError}</p>
//             )} */}

//             <button
//               className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600 font-bold text-white"
//               type="submit"
//             >
//               Login
//             </button>
//             {backendError && (
//               <p className="text-red-500 text-sm">{backendError}</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Login;
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setBackendError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await login(email, password);
      if (response.success) {
        navigate("/dashboard");
      } else {
        setBackendError(response.error);
      }
    } catch (err) {
      setBackendError("Something went wrong");
    } finally {
      setLoading(false);
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
                disabled={loading}
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
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <button
              className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600 font-bold text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>

            {backendError && (
              <p className="text-red-500 text-sm">{backendError}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
