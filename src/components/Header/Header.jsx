import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAngleDown,
  faBars,
  faCircleRight,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import user from "./../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// import { useAuth } from "../../contexts/AuthContext";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const { authState } = useContext(AuthContext);
  const { userEmail, data } = authState; // Access userEmail

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // if (!userEmail)
  //   return (
  //     <div className="hidden lg:flex flex-col ml-4 text-customWhite">
  //       <span className="text-xl font-poppins font-semibold">
  //         Hello, {userEmail}
  //       </span>
  //       <span
  //         className="font-normal text-sm font-poppins"
  //         style={{ color: "#ffffffba" }}
  //       >
  //         Have a nice day
  //       </span>
  //     </div>
  //   );

  const handleLogout = async () => {
    await logout(); // Call logout method from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="sticky top-0 z-10 bg-customGray py-6 px-4 flex justify-between items-center lg:justify-end">
      <div className="page-center flex justify-between items-center w-full">
        <div className="flex items-center lg:ml-4">
          <button
            className="lg:hidden p-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {userEmail && (  
            <div className="hidden lg:flex flex-col ml-4 text-customWhite">
              <span className="text-xl font-poppins font-semibold">
                Hello, {userEmail}
              </span>
              <span
                className="font-normal text-sm font-poppins"
                style={{ color: "#ffffffba" }}
              >
                Have a nice day
              </span>
            </div>
          )}
          {/* <div className="hidden lg:flex flex-col ml-4 text-customWhite">
            <span className="text-xl font-poppins font-semibold">
              Hello, {userEmail}
            </span>
            <span
              className="font-normal text-sm font-poppins"
              style={{ color: "#ffffffba" }}
            >
              Have a nice day
            </span>
          </div> */}
        </div>

        <div className="flex items-center lg:ml-auto space-x-4">
          <FontAwesomeIcon icon={faBell} className="text-customWhite" />
          <div className="h-10 w-px bg-gray-500"></div>
          <div className="relative">
            <button
              className="flex items-center space-x-4 text-gray-700"
              onClick={toggleDropdown}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-customWhite font-poppins font-semibold">
                  Hello,{userEmail}
                </span>
                <span
                  className="font-normal text-sm text-customWhite font-poppins"
                  style={{ color: "#ffffffba" }}
                >
                  Admin
                </span>
              </div>
              <FontAwesomeIcon icon={faAngleDown} style={{ color: "white" }} />
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                <li className="hover:bg-customGreen px-4 py-2 cursor-pointer font-poppins">
                  My Profile
                </li>
                <li className="hover:bg-customGreen px-4 py-2 cursor-pointer font-poppins">
                  Account Settings
                </li>
                <li
                  className="hover:bg-customGreen px-4 py-2 cursor-pointer font-poppins"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
