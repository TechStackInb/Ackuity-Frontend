import React, { useEffect, useState } from "react";
import {
  faChevronDown,
  faChevronUp,
  faClock,
  faDownload,
  faEdit,
  faSave,
  faSyncAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrivacyCustomDropdown from "../components/PrivacyCustomDropdown";
import { BASE_URL } from "../services/api";

const ThreatManagement = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOption, setSelectedOption] = useState("Last 24 hours");
  const [isOpen, setIsOpen] = useState(false);

  const [threatData, setThreatData] = useState([]);

  const [threatDataDashboard, setThreatDataDashboard] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [averages, setAverages] = useState({});

  // const handleDropdownClick = (dropdownId) => {
  //   // Only open one dropdown at a time
  //   setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  // };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const selectedData = averages[optionMapping[option]];
    updateThreatData(selectedData); 
    setIsOpen(false);
  };

  const handleRefreshClick = () => {
    setSelectedOption("Last 24 hours");
    const last24HoursData = averages.last24Hours;
    updateThreatData(last24HoursData); 
  };

  const optionMapping = {
    "Last 24 hours": "last24Hours",
    "Last 7 days": "last7Days",
    "Last 30 days": "last30Days",
  };

  const updateThreatData = (data) => {
    if (data) {
      const threatData = [
        { type: "Total Threats", count: data.totalThreats },
        { type: "Injection Attacks", count: data.injectionAttacks },
        { type: "API Attacks", count: data.apiAttacks },
        { type: "Agent Anomalies", count: data.agentAnamalies },
        { type: "User Anomalies", count: data.userAnamalies },
      ];
      setThreatDataDashboard(threatData);
    }
  };

  useEffect(() => {
    const fetchThreatData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/data/threatManagementacdata`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAverages(data.averages);
          updateThreatData(data.averages.last24Hours); 
        } else {
          console.error("Failed to fetch threat data");
        }
      } catch (error) {
        console.error("Error fetching threat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreatData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClick = (dropdownKey) => {
    if (openDropdown === dropdownKey) {
      setOpenDropdown(null); 
    } else {
      setOpenDropdown(dropdownKey); 
    }
  };

  const handleOptionClickDrop = (dropdownKey, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [dropdownKey]: option,
    });

  };

  const handleOptionClicks = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
    setIsSaveSuccessful(false);
  };

  const data = {
    userOption: ["Open", "In Progress", "Closed"],
    statusOption: ["Analyst 1", "Analyst 2", "Analyst 3"],
  };
  const threatDatas = [
    { type: "Total threats", count: 15 },
    { type: "Injection Attacks", count: 10 },
    { type: "API Attacks", count: 6 },
    { type: "Agent Anomalies", count: 4 },
    { type: "User Anomalies", count: 3 },
  ];

  console.log(threatDataDashboard, "threatDataDashboard");

  useEffect(() => {
    const fetchThreatData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/data/threatManagement`, {
          method: "GET",
          credentials: "include", 
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data, "threat");
          setThreatData(data.data); 
        } else {
          console.error("Failed to fetch threat data");
        }
      } catch (error) {
        console.error("Error fetching threat data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchThreatData();
  }, []);

  const confirmSave = async () => {
    const data = {
      threatName: "Test Name 1",
      severity: "Medium",
      threatCatagory: "Risky",
      source: "GenAPI",
      destination: "Services/data/V37.0/ analytics/reports/query",
      impactedAssests: "Salesforce Opp-App1",
      eventTime: new Date().toISOString(),
      affectedUser: "Sales1",
      status: selectedOptions["userOption"] || "",
      assignedTo: selectedOptions["statusOption"] || "",
    };

    setIsLoading(true); 
    try {
      const response = await fetch(`${BASE_URL}/api/data/threatManagement`, {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSaveSuccessful(true);
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving data.");
    }
    setIsLoading(false); 
  };

  return (
    <>
      <div className="p-4 bg-[#30b375] bg-bubble-pattern  rounded-md  mb-4 ">
        <div className="page-center">
          <h2 className="text-3xl font-poppins font-semibold mb-4 text-customWhite">
            Threat Management
          </h2>
          <h2 className="text-sm text-[#eff2f6] font-poppins mb-4">
            Threat Management
            {/* <span className="text-customWhite text-sm">
              {" "}
              / Function Calling
            </span> */}
          </h2>
        </div>
      </div>

      {/* Divider line with buttons */}

      <div className="rounded-lg">
        <div className="page-center">
          <div className="flex items-center ">
            <div className="flex basis-[80%] justify-end gap-[10px]">
              <button
                className="group flex items-center text-black px-4 py-2 bg-[#1B1E26] rounded-t-lg hover:bg-[#31B476]"
                onClick={handleRefreshClick} 
              >
                <FontAwesomeIcon
                  icon={faSyncAlt}
                  className="mr-2 text-[#31B476] group-hover:text-white"
                />
                <span className="text-white">Refresh</span>
              </button>

              <div className="relative inline-block text-left w-48">
                {" "}
                {/* Set a fixed width for the dropdown */}
                <button
                  className="group flex items-center justify-between px-4 py-2 border border-[#1b1e26] rounded-t-lg bg-[#1b1e26] shadow-sm w-full" // Make the button take full width
                  onClick={toggleDropdown}
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className="mr-2 text-[#31B476]"
                  />
                  <span className="text-[#31B476] truncate">
                    {selectedOption}
                  </span>{" "}
                  <FontAwesomeIcon
                    icon={isOpen ? faChevronUp : faChevronDown}
                    className="ml-2 text-[#31B476]"
                  />
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1b1e26] border border-[#1b1e26] rounded-lg shadow-lg z-10">
                    {" "}
  
                    <ul className="py-2">
                      <li
                        className="px-4 py-2 hover:bg-[#31B476] hover:text-white text-white cursor-pointer"
                        onClick={() => handleOptionClick("Last 24 hours")}
                      >
                        Last 24 hours
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-[#31B476] hover:text-white text-white cursor-pointer"
                        onClick={() => handleOptionClick("Last 7 days")}
                      >
                        Last 7 days
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-[#31B476] hover:text-white text-white cursor-pointer"
                        onClick={() => handleOptionClick("Last 30 days")}
                      >
                        Last 30 days
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex basis-[80%] border-t-2 border-[#091024dc]"></div>
          </div>

          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="flex flex-wrap gap-4 mt-4">
                {threatDataDashboard.map((threat, index) => (
                  <div
                    key={index}
                    className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[15%] xl:basis-[15%] 2xl:basis-[15%] items-center justify-between rounded-md overflow-hidden ipad-threat"
                  >
                    <div className="w-full bg-[#2a2f3a] p-2 text-center text-[#d1d5db] text-sm font-medium">
                      {threat.type}
                    </div>
                    <div className="w-full bg-black flex-grow flex items-center justify-center py-8">
                      <div className="text-4xl text-white font-bold">
                        {threat.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full mb-4">
        {threatData.map((threat, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white border border-gray-300 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 "
          >
            <div className="text-lg font-poppins font-semibold ">
              {threat.type}
            </div>
            <div className="mt-2 text-3xl font-poppins font-semibold">
              {threat.count}
            </div>
          </div>
        ))}
      </div> */}

      <div className="bg-customBlack shadow-md mt-6">
        <div className="page-center">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Threat Name
                  </th>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Severity
                  </th>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Threat Caregory
                  </th>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Source
                  </th>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Destination
                  </th>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Impacted Assests
                  </th>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Event Time
                  </th>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Affected User
                  </th>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Status
                  </th>
                  <th className="px-2 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Assigned To
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-customTablebG">
                {/* {threatData.map((threat, index) => ())} */}
                <tr>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    {/* {threat.threatName} */}
                    URL Manipulation
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    {/* {threat.severity} */}
                    High
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    {/* {threat.threatCatagory} */}
                    Broken Access Control
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    {/* {threat.source} */}
                    GenAI App1
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    {/* {threat.destination} */}
                    Services/data/V37.0/ analytics/reports/query
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    {/* {threat.impactedAssests} */}
                    Salesforce Opp-App1
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    {/* {threat.eventTime} */}
                    12/08/2024
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    {/* {threat.affectedUser} */}
                    Sales1
                  </td>

                  {/* Add more cells based on the threatData structure */}
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite bg-black text-sm">
                    <PrivacyCustomDropdown
                      options={data.userOption || []}
                      placeholder="In Progress"
                      isOpen={openDropdown === "userOption"}
                      width={"144px"}
                      onDropdownClick={() => handleDropdownClick("userOption")}
                      selectedOption={selectedOptions["userOption"]}
                      onOptionClick={(option) => {
                        handleOptionClickDrop("userOption", option);

                        setOpenDropdown(null);
                      }}
                    />
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite bg-black">
                    <PrivacyCustomDropdown
                      options={data.statusOption || []}
                      placeholder="Analyst"
                      isOpen={openDropdown === "statusOption"}
                      width={"144px"}
                      onDropdownClick={() =>
                        handleDropdownClick("statusOption")
                      }
                      selectedOption={selectedOptions["statusOption"]}
                      onOptionClick={(option) => {
                        handleOptionClickDrop("statusOption", option);
                        setOpenDropdown(null); 
                      }}
                    />
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    <div className="flex items-center justify-between gap-2 spaceGaps">
                      <button
                        className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
                        onClick={handleSaveClick}
                      >
                        <FontAwesomeIcon
                          icon={faSave}
                          className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                        />
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-2 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                </tr>
                <tr>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            {!isSaveSuccessful ? (
              <>
                <p>Are you sure you want to save?</p>
                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={confirmSave}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Confirm"}
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-green-500 font-semibold">
                  Data saved successfully!
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ThreatManagement;
