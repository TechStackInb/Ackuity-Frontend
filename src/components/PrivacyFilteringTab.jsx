import {
  faDeleteLeft,
  faDownload,
  faEdit,
  faEraser,
  faMinusSquare,
  faPlus,
  faPlusSquare,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../css/style.css";
import CustomDropdown from "../components/CustomDropdown";
import Modal from "../components/Model";
import PrivacyCustomDropdown from "../components/PrivacyCustomDropdown";
// import { useAuth } from "../contexts/AuthContext";
// import axiosInstance from "../services/axiosInstance";

const PrivacyFilteringTab = ({ handleSavePolicy }) => {
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sections, setSections] = useState([{ id: Date.now(), values: {} }]);
  const [selectedOptions, setSelectedOptions] = useState({});

  // const { auth, loading } = useAuth();
  // const [userData, setUserData] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   console.log("Auth state changed:", auth);
  //   if (auth.token) {
  //     fetchData();
  //   } else {
  //     console.log("No token found, skipping fetchData call.");
  //   }
  // }, [auth]);

  // const fetchData = async () => {
  //   try {
  //     console.log("Attempting to fetch data...");
  //     const response = await axiosInstance.get("/api/data");
  //     console.log("Data fetched successfully:", response.data);
  //     setUserData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("Failed to fetch data. Please try again.");
  //   }
  // };

  // console.log("UserData state:", userData);

  const handleDropdownClick1 = (sectionId, index) => {
    setOpenDropdown(
      openDropdown === `${sectionId}-${index}` ? null : `${sectionId}-${index}`
    );
  };

  const addSection = () => {
    setSections([...sections, { id: Date.now(), values: {} }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const clearSection = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, values: {} } : section
      )
    );
  };

  const handleDropdownChange = (sectionId, dropdownType, value) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, values: { ...section.values, [dropdownType]: value } }
          : section
      )
    );
    setOpenDropdown(null); // Close the dropdown after selection
  };

  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleOptionClick = (dropdownId, option) => {
    setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
    setOpenDropdown(null);
  };

  const data = {
    documentStoreOptions: ["Document Store", "Share Point", "One Drive"],
    documentLocationOptions: [
      "Document Location",
      "Another Option",
      "Another Option",
    ],
    documentOptions: ["Document1", "Document2", "Document3", "Document4"],
    containsOptions: ["Document Classification", "Location", "Devision"],
    withOptions: ["Confidential", "Private", "Public"],
    thenOptions: ["Anonymize", "Tokenize", "Encrypt", "De-identification"],
    roleOptions: ["Role1", "Role2", "Role3", "Role4"],
    atOptions: ["All times", "one Day", "Aone Week", "All Month"],
  };
  return (
    <div>
      <div className="bg-dropdownBackground p-4 shadow-md rounded-t-lg">
        <div className="flex flex-col space-y-4">
          <h2 className="text-[#31E48F] text-lg font-poppins font-semibold px-4">
            New Selector
          </h2>
        </div>
      </div>
      <div className="bg-customBlack p-4 shadow-md">
        <div className="page-center">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap px-4 justify-between">
              <div className="flex flex-col basis-full sm:basis-[49.333333%]">
                <label className="text-customGreen font-poppins font-semibold text-sm mb-4">
                  Document Store
                </label>
                <PrivacyCustomDropdown
                  options={data.documentStoreOptions || []}
                  placeholder="Select Document Store"
                  isOpen={openDropdown === "documentStore"}
                  onDropdownClick={() => handleDropdownClick("documentStore")}
                  selectedOption={selectedOptions["documentStore"]}
                  onOptionClick={(option) =>
                    handleOptionClick("documentStore", option)
                  }
                />
              </div>
              <div className="flex flex-col basis-full sm:basis-[49.333333%]">
                <label className="text-customGreen font-poppins font-semibold text-sm mb-4">
                  Document Location
                </label>
                <PrivacyCustomDropdown
                  options={data.documentLocationOptions || []}
                  placeholder="Select Document Location"
                  isOpen={openDropdown === "documentLocationOptions"}
                  onDropdownClick={() =>
                    handleDropdownClick("documentLocationOptions")
                  }
                  selectedOption={selectedOptions["documentLocationOptions"]}
                  onOptionClick={(option) =>
                    handleOptionClick("documentLocationOptions", option)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}
      {sections.map((section, sectionIndex) => (
        <div
          key={section.id}
          className="bg-customBlack p-4 rounded-lg shadow-md mt-4"
        >
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex flex-wrap px-4 justify-between">
              <div className="flex basis-full sm:basis-full md:basis-full lg:basis-[33.333333%] xl:basis-[33.333333%] 2xl:basis-[33.333333%] items-baseline flex-col sm:flex-row ipad-if-prvcy">
                <div className="flex flex-col w-full">
                  <span
                    className="text-customGreen font-poppins font-semibold text-sm mb-4"
                    style={{ marginLeft: "85px" }}
                  >
                    Document Name
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-white mr-2 w-[100px] sm:text-right sm:mb-0 text-left mb-4  text-sm custmTextRight">
                      If Document
                    </span>
                    <CustomDropdown
                      options={data.documentOptions || []}
                      placeholder="Select Document"
                      isOpen={openDropdown === `${section.id}-0`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 0)
                      }
                      selectedOption={section.values["document"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "document", value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex basis-full sm:basis-full md:basis-full lg:basis-[33.333333%] xl:basis-[33.333333%] 2xl:basis-[33.333333%] items-baseline flex-col sm:flex-row ipad-if-prvcy">
                <div className="flex flex-col w-full">
                  {" "}
                  <span
                    className="text-customGreen font-poppins font-semibold text-sm mb-4"
                    style={{ marginLeft: "85px" }}
                  >
                    Attribute
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-white mr-2 w-[100px] sm:text-right sm:mb-0 text-left mb-4  text-sm custmTextRight">
                      Contains
                    </span>
                    <CustomDropdown
                      options={data.containsOptions || []}
                      placeholder="Select Contains"
                      isOpen={openDropdown === `${section.id}-1`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 1)
                      }
                      selectedOption={section.values["contains"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "contains", value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex basis-full sm:basis-full md:basis-full lg:basis-[33.333333%] xl:basis-[33.333333%] 2xl:basis-[33.333333%] items-baseline flex-col sm:flex-row ipad-if-prvcy">
                <div className="flex flex-col w-full">
                  <span
                    className="text-customGreen font-poppins font-semibold text-sm mb-4"
                    style={{ marginLeft: "85px" }}
                  >
                    Value
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-white mr-2 w-[100px] sm:text-right sm:mb-0 text-left mb-4 text-sm custmTextRight">
                      With
                    </span>
                    <CustomDropdown
                      options={data.withOptions || []}
                      placeholder="Select With"
                      isOpen={openDropdown === `${section.id}-2`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 2)
                      }
                      selectedOption={section.values["with"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "with", value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap px-4 justify-between">
              <div className="flex basis-full sm:basis-full md:basis-full lg:basis-[33.333333%] xl:basis-[33.333333%] 2xl:basis-[33.333333%] items-baseline flex-col sm:flex-row ipad-if-prvcy">
                <div className="flex flex-col w-full">
                  <span
                    className="text-customGreen font-poppins font-semibold text-sm mb-4"
                    style={{ marginLeft: "85px" }}
                  >
                    Action
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-white mr-2 w-[100px]  sm:text-right sm:mb-0 text-left mb-4 text-sm custmTextRight">
                      Then
                    </span>
                    <CustomDropdown
                      options={data.thenOptions || []}
                      placeholder="Select Then"
                      isOpen={openDropdown === `${section.id}-3`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 3)
                      }
                      selectedOption={section.values["then"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "then", value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex basis-full sm:basis-full md:basis-full lg:basis-[33.333333%] xl:basis-[33.333333%] 2xl:basis-[33.333333%] items-baseline flex-col sm:flex-row ipad-if-prvcy">
                <div className="flex flex-col w-full">
                  <span
                    className="text-customGreen font-poppins font-semibold text-sm mb-4"
                    style={{ marginLeft: "85px" }}
                  >
                    Role
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-white mr-2 w-[100px] sm:text-right sm:mb-0 text-left mb-4 text-sm custmTextRight">
                      Role
                    </span>
                    <CustomDropdown
                      options={data.roleOptions || []}
                      placeholder="Select Role"
                      isOpen={openDropdown === `${section.id}-4`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 4)
                      }
                      selectedOption={section.values["role"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "role", value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex basis-full sm:basis-full md:basis-full lg:basis-[33.333333%] xl:basis-[33.333333%] 2xl:basis-[33.333333%] items-baseline flex-col sm:flex-row ipad-if-prvcy">
                <div className="flex flex-col w-full">
                  <span
                    className="text-customGreen font-poppins font-semibold text-sm mb-4"
                    style={{ marginLeft: "85px", visibility: "hidden" }}
                  >
                    At
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-white mr-2 w-[100px] sm:text-right sm:mb-0 text-left mb-4 text-sm custmTextRight">
                      At
                    </span>
                    <CustomDropdown
                      options={data.atOptions || []}
                      placeholder="Select At"
                      isOpen={openDropdown === `${section.id}-5`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 5)
                      }
                      selectedOption={section.values["at"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "at", value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex justify-end gap-2 min-w-[100px] ifmarginleft"
              style={{ marginRight: "17px" }}
            >
              {sections.length === 1 ? (
                <div className="flex gap-2">
                  <button
                    className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded  hover:bg-black  "
                    onClick={addSection}
                  >
                    <FontAwesomeIcon
                      className=" transition ease-out duration-300 hover:transform hover:scale-110 w-7 h-7"
                      icon={faPlus}
                    />
                  </button>
                  <button
                    className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded  hover:bg-black  "
                    onClick={() => clearSection(section.id)}
                  >
                    <FontAwesomeIcon
                      className=" transition ease-out duration-300 hover:transform hover:scale-110 w-7 h-7"
                      icon={faEraser}
                    />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded  hover:bg-black  "
                    onClick={addSection}
                  >
                    <FontAwesomeIcon
                      className=" transition ease-out duration-300 hover:transform hover:scale-110 w-7 h-7"
                      icon={faPlus}
                    />
                  </button>
                  <button
                    className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black transition ease-out duration-300"
                    onClick={() => removeSection(section.id)}
                  >
                    <FontAwesomeIcon
                      className=" transition ease-out duration-300 hover:transform hover:scale-110 w-7 h-7"
                      icon={faTrash}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div
        className={`bg-customBlack hover:bg-customGreen text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform cursor-pointer font-poppins  ${
          isClickedAdd ? "hover:bg-customGreen hover:text-white" : ""
        }`}
        onClick={handleSavePolicy}
      >
        <span
          className="transition-transform duration-300 ease-out"
          style={{
            display: "inline-block",
            letterSpacing: "0.2em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.letterSpacing = "normal";
            e.currentTarget.style.transform = "scale(0.95)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.letterSpacing = "0.2em";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          SAVE POLICY
        </span>
      </div>

      <div className="bg-dropdownBackground p-4 shadow-md mt-4 rounded-t-lg ">
        <div className="page-center">
          <div className="flex flex-col space-y-4">
            <h2 className="text-[#31E48F] text-xl font-poppins font-semibold px-4">
              Current Policies
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
                    Policy Name
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Document Store
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Document Location
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Document Name
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-customTablebG">
                <tr>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    Secure RFP response templates
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    Sharepoint
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    Shared RFP Documents Website
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    Banking_RFP_Response_Template1
                  </td>

                  <td className="px-4 py-2 border border-customBorderColor bg-customTablebG">
                    <div className="flex items-center justify-between gap-[2px]">
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
    </div>
  );
};

export default PrivacyFilteringTab;
