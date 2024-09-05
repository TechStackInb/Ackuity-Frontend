import React, { useState } from "react";
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
  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleOptionClick = (dropdownId, option) => {
    setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
    setOpenDropdown(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClicks = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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

      <div className="bg-customBlack shadow-md mt-6">
        <div className="page-center">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead></thead>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreatManagement;
