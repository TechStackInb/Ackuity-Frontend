import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faClipboardList,
  faTasks,
  faCog,
  faUser,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./../../assets/ackuity_logo.svg";
import DashboardIcon from "./../../assets/Dashboard-cion.png";
import PolicyManagerIcon from "./../../assets/Policy Manager-cion.png";
import AuditIcon from "./../../assets/Audit-cion.png";
import OnboardingIcon from "./../../assets/Onboarding-cion.png";
import ThreatManagementIcon from "./../../assets/Threat Management_cion.png";
import AdminIcon from "./../../assets/Admin-cion.png";
import { ChartContext } from "../../contexts/ChartContext";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeItem, setActiveItem] = useState("");
  const { setSelectedChart, selectedChart } = useContext(ChartContext);

  const handleMenuClick = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? "" : menu));
  };

  const handleSubItemClick = (chartName) => {
    setSelectedChart(chartName);
    setActiveItem(chartName);
    window.scrollTo(0, 0);
  };

  const handleItemClick = (chartName) => {
    setSelectedChart(chartName);
    setActiveItem(chartName);
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: DashboardIcon,
      isImage: true,
      subItems: [{ name: "Analytics" }, { name: "Reports" }],
    },
    {
      name: "Policy Manager",
      icon: PolicyManagerIcon,
      isImage: true,
      subItems: [
        { name: "Function Calling" },
        { name: "Agents" },
        { name: "Document RAG" },
        { name: "text2SQL" },
        { name: "User View" },
      ],
    },
    {
      name: "Audit",
      icon: AuditIcon,
      isImage: true,
      subItems: [
        { name: "Queries" },
        { name: "Agent Action" },
        { name: "Authorization" },
      ],
    },
    {
      name: "Onboarding",
      icon: OnboardingIcon,
      isImage: true,
      subItems: [
        { name: "Function Calling" },
        { name: "Agents" },
        { name: "Document RAG" },
        { name: "text2SQL" },
      ],
    },
  ];

  return (
    <div
      className={`absolute left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-hidden bg-customBlack text-sideBarTextColor duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-center p-4 lg:justify-left mb-4">
        <a href="https://ackuity.ai/" className="flex items-center">
          {/* Add your desired link path to the href attribute */}
          <img className="w-48" src={Logo} alt="logo" />
        </a>
        <button
          className="lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <div
              className={`p-3  menu-item rounded-md cursor-pointer flex items-center justify-between ml-2 mr-2 ${
                activeItem === item.name
                  ? "bg-customGreen text-customWhite"
                  : ""
              }`}
              onClick={() => handleMenuClick(item.name)}
            >
              <div className="flex items-center ml-2.5">
                {item.isImage ? (
                  <img
                    src={item.icon}
                    alt={`${item.name} icon`}
                    className="mr-3 sidebar-icon"
                  />
                ) : (
                  <FontAwesomeIcon icon={item.icon} className="mr-3" />
                )}
                <span className="font-poppins">{item.name}</span>
              </div>
              <FontAwesomeIcon
                icon={activeMenu === item.name ? faChevronUp : faChevronDown}
                className="ml-2 custom-arrow"
              />
            </div>
            <ul
              className={`pl-7 mt-2 relative sub-items-container ${
                activeMenu === item.name ? "expanded" : ""
              }`}
            >
              {item.subItems.map((subItem) => (
                <li
                  key={subItem.name}
                  className={`relative p-2 flex items-center cursor-pointer sub-item hover:text-customHoverGreen ${
                    selectedChart === subItem.name ? "text-customGreen" : ""
                  }`}
                  onClick={() => handleSubItemClick(subItem.name)}
                  style={{ gap: "5px" }}
                >
                  {/* Dot */}
                  <div
                    className={`w-2 h-2 rounded-full mr-2 dot ${
                      selectedChart === subItem.name
                        ? "bg-customGreen"
                        : "bg-gray-600"
                    }`}
                  ></div>
                  <span className="font-poppins">{subItem.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li
          className={`p-3 menu-item rounded-md cursor-pointer flex items-center ml-2 mr-2 ${
            activeItem === "Threat Management" ? "text-customGreen" : ""
          }`}
          onClick={() => handleItemClick("Threat Management")}
          style={{ marginLeft: "17px", gap: "3px" }}
        >
          <img src={ThreatManagementIcon} className="mr-2 sidebar-icon" />
          <span>Threat Management</span>
        </li>
        <li
          className={`p-3 menu-item rounded-md cursor-pointer flex items-center ml-2 mr-2 ${
            activeItem === "Admin" ? "text-customGreen" : ""
          }`}
          onClick={() => handleItemClick("Admin")}
          style={{ marginLeft: "17px", gap: "3px" }}
        >
          <img src={AdminIcon} className="mr-2 sidebar-icon" />
          <span>Admin</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
