import React, { useState } from "react";
import {
  faDownload,
  faEdit,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrivacyCustomDropdown from "../components/PrivacyCustomDropdown";
const ThreatManagement = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleOptionClick = (dropdownId, option) => {
    setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
    setOpenDropdown(null);
  };

  const data = {
    userOption: ["open", "In Progress", "Success"],
    statusOption: ["Analyst1", "Analyst2", "Analyst3"],
  };
  const threatData = [
    { type: "Total threats", count: 15 },
    { type: "Injection Attacks", count: 10 },
    { type: "API Attacks", count: 6 },
    { type: "Agent Anomalies", count: 4 },
    { type: "User Anomalies", count: 3 },
  ];

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
      <div className="bg-[#1e2432] p-6 rounded-lg">
        <div className="flex flex-wrap gap-4">
          {threatData.map((threat, index) => (
            <div
              key={index}
              className="flex-1 min-w-[210px] flex flex-col items-center justify-between rounded-md overflow-hidden"
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

      <div className="bg-customBlack shadow-md">
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
                    User
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
                <tr>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    URL Manipulation
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    High
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    Broken Access Control
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    GenAI App1
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    Services/data/V37.0/ analytics/reports/query
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    Salesforce Opp-App1
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    12/08/2024
                  </td>
                  <td className="px-2 py-2 border border-customBorderColor text-customWhite font-poppins text-sm">
                    Sales1
                  </td>
                  <td className="px-2  py-2 border border-customBorderColor text-customWhite bg-black text-sm">
                    <PrivacyCustomDropdown
                      options={data.userOption || []}
                      placeholder="In Progress"
                      isOpen={openDropdown === "userOption"}
                      width={"144px"}
                      onDropdownClick={() => handleDropdownClick("userOption")}
                      selectedOption={selectedOptions["userOption"]}
                      onOptionClick={(option) =>
                        handleOptionClick("userOption", option)
                      }
                    />
                  </td>
                  <td className="px-2  py-2 border border-customBorderColor text-customWhite bg-black">
                    <PrivacyCustomDropdown
                      options={data.statusOption || []}
                      placeholder="Analyst"
                      isOpen={openDropdown === "statusOption"}
                      width={"144px"}
                      onDropdownClick={() =>
                        handleDropdownClick("statusOption")
                      }
                      selectedOption={selectedOptions["statusOption"]}
                      onOptionClick={(option) =>
                        handleOptionClick("statusOption", option)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    <div className="flex items-center justify-between gap-2 spaceGaps">
                      <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
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
    </>
  );
};

export default ThreatManagement;
