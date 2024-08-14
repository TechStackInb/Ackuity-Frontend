import { faDownload, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../css/style.css";
import PrivacyCustomDropdown from "../components/PrivacyCustomDropdown";

function PermissionsTab() {
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
    attributeOption: ["item2", "item3"],
  };

  return (
    <>
      <div className="bg-dropdownBackground p-4 shadow-md mt-4 rounded-t-lg ">
        <div className="page-center">
          <div className="flex flex-col space-y-4">
            <h2 className="text-[#31E48F] text-xl font-poppins font-semibold px-4">
              Permissions
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-customBlack shadow-md">
        <div className="page-center">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Document Repository
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Document Name
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Original Permissions
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Revised Permissions
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-customTablebG">
                <tr>
                  <td className="pl-4  py-2 border border-customBorderColor text-customWhite bg-black">
                    <PrivacyCustomDropdown
                      options={data.attributeOption || []}
                      placeholder="xyz sharepoint"
                      isOpen={openDropdown === "attributeOption"}
                      //   width={"194px"}
                      onDropdownClick={() =>
                        handleDropdownClick("attributeOption")
                      }
                      selectedOption={selectedOptions["attributeOption"]}
                      onOptionClick={(option) =>
                        handleOptionClick("attributeOption", option)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    Salesforce
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    App one
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    Net Sales Order
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    <div className="flex items-center justify-between spaceGaps">
                      <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                        />
                      </button>

                      <button className="bg-customBlack  text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                        <FontAwesomeIcon
                          icon={faDownload}
                          className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                        />
                      </button>

                      <button className="bg-customBlack  text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                </tr>
                <tr>
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
}

export default PermissionsTab;
