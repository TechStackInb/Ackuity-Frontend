import React, { useState } from "react";
import "./../App.css";
import CustomDropdown from "../components/CustomDropdown";
import {
  faAngleDown,
  faClose,
  faDownload,
  faEdit,
  faEraser,
  faMinus,
  faPlus,
  faPlusMinus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../components/Dropdown";
import PrivacyCustomDropdown from "../components/PrivacyCustomDropdown";
import Modal from "../components/Model";
import ThreeDotsButton from "../components/ThreeDotsButton";
import userIcon from "../assets/usericon.svg";
import iconsmodel from "../assets/save.svg";
// import GroupMembershipModal from "../components/GroupMembershipModal";
// import EditPermissionsModal from "../components/EditPermissionsModal";

const Chart2DatabasePage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [sections, setSections] = useState([{ id: Date.now(), values: {} }]);
  const [showMembership, setShowMembership] = useState(false);
  const [showEditMembership, setShowEditMembership] = useState(false);
  const [showEditMembershipPermission, setShowEditMembershipPermission] =
    useState(false);
  const [hoveredRemoveIndex, setHoveredRemoveIndex] = useState(null);
  const [hoveredAddIndex, setHoveredAddIndex] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleeditMembership = () => {
    setShowEditMembership(!showEditMembership);
  };

  const toggleeditMembershipPermission = () => {
    setShowEditMembershipPermission(!showEditMembershipPermission);
  };

  const toggleMembership = () => {
    setShowMembership(!showMembership);
  };

  // Handle click to toggle selection
  const handleClick = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };
  const [isSectionVisible, setSectionVisible] = useState(sections.length > 0);

  const [isContentVisible, setContentVisible] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSavePolicy = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    // Add your save logic here
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addSection = () => {
    console.log(sections, "first");
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

  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleOptionClick = (dropdownId, option) => {
    setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
    setOpenDropdown(null);
  };

  const data = {
    dataStoreOptions: ["DB1", "DB2", "DB3"],
    tableOptions: ["Table1", "Table2", "Table3"],
    dataFeildOption: ["Opportunity Name", "Account Name", "Amount", "Age"],
    genAiAppOptions: ["App1", "App2", "App3", "App4"],
    locationOption: ["Department", "Location"],
    privacyValueOption: ["Asia", "North America"],
    privacyActionOption: ["Allow", "Reduct"],
    attributeOption: ["Department", "Location"],
    attributeValueOption: ["Asia", " America"],
    attributeActionOption: ["Allow", "Reduct"],
    rowLevelFilterinOption: ["XYZ Corp", "ABC Corp", "DEF Corp", "MNO Corp"],
  };

  const items = {
    name: "Opportunity Name",
    subItems: [
      { name: "Opportunity Name" },
      { name: "Account Name" },
      { name: "Amount" },
      { name: "Age" },
    ],
  };

  const Sales = {
    name: "Sales Opportunities",
    subItems: [
      { name: "API 1" },
      { name: "API 2" },
      { name: "API 3" },
      { name: "API 4" },
    ],
  };

  const [isGroupMembershipOpen, setGroupMembershipOpen] = useState(false);
  const [isEditPermissionsOpen, setEditPermissionsOpen] = useState(false);
  console.log(selectedItems);

  const handleGroupMembershipOpen = () => {
    setGroupMembershipOpen(true);
  };

  const handleEditPermissionsOpen = () => {
    setEditPermissionsOpen(true);
  };

  return (
    <>
      <div className="p-4 bg-[#30b375] bg-bubble-pattern  rounded-md  mb-4 ">
        <div className="page-center">
          <h2 className="text-3xl font-poppins font-semibold mb-4 text-customWhite">
            Policy Manager
          </h2>
          <h2 className="text-sm text-[#2F3A45] font-poppins mb-4">
            Policy Manager
            <span className="text-customWhite text-sm"> / Chat2Database</span>
          </h2>
        </div>
      </div>

      <div className="bg-customBlack p-4 shadow-md mb-4">
        <label
          htmlFor="policyName"
          className="block text-sm font-poppins font-semibold  mb-2 text-customGreen"
        >
          Policy Name
        </label>
        <input
          type="text"
          id="policyName"
          // value={policyName}
          // onChange={handlePolicyNameChange}
          className="w-full rounded-md shadow-sm px-2.5 py-2.5 border-2 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-black text-white font-semibold placeholder-gray-500"
          placeholder="Enter policy name"
          // readOnly={isEditMode}
        />
      </div>

      <div className="bg-dropdownBackground p-4 shadow-md mt-4 rounded-t-lg ">
        <div className="page-center">
          <div className="flex flex-wrap justify-between">
            <h2 className="text-[#31E48F] text-xs sm:text-xl md:text-xl font-poppins font-semibold px-4 text-Action">
              Configure Permissions
            </h2>
            <button
              className="bg-[#2F3A45] text-[#000000] px-2 py-2 rounded hover:text-customGreen"
              onClick={() => setSectionVisible(!isSectionVisible)}
            >
              <FontAwesomeIcon
                icon={isSectionVisible ? faMinus : faPlus}
                className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
      {isSectionVisible &&
        sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className=" bg-customBlack  opacity-100 ">
            <div className="page-center">
              <div className="bg-customBlack p-4 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <div className="flex flex-wrap justify-between">
                    <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[100%] xl:basis-[100%] 2xl:basis-[100%] p-2 overflow-x-auto basis-ipad">
                      <h2 className="p-2 text-[#f7fbf9] bg-[#0a854b] text-center font-poppins font-semibold text-lg">
                        Permissions
                      </h2>
                      <div className="overflow-x-auto overflow-y-hidden">
                        <table className="bg-customBlack border border-gray-200 w-full">
                          <thead>
                            <tr>
                              <th className="px-2.5 py-2 border border-customBorderColor bg-[#1b1e26] text-customWhite font-poppins font-semibold">
                                Permission
                              </th>
                              <th className="px-2.5 py-2 border border-customBorderColor bg-[#2f3a45] text-customWhite font-poppins font-semibolde">
                                Existing
                              </th>
                              <th className="px-2.5 py-2 border border-customBorderColor bg-[#6a7581] text-customWhite font-poppins font-semibold">
                                Revised
                              </th>
                              <th className="px-2.5 py-2 border border-customBorderColor bg-[#6a7581] text-customWhite font-poppins font-semibold">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                Select
                              </td>
                              <td className="border border-customBorderColor text-customWhite bg-black">
                                <div className="relative">
                                  <div className="flex flex-wrap">
                                    <div className="px-4 flex gap-4">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleClick("Operations")
                                        }
                                        className={`border border-green-500 font-poppins font-normal text-[#FFFFFF] px-4  ${
                                          selectedItems.includes("Operations")
                                            ? "text-white bg-[#0a854b]"
                                            : "bg-black"
                                        }`}
                                      >
                                        Operations
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleClick("management")
                                        }
                                        className={`border border-green-500 font-poppins font-normal text-[#FFFFFF] px-4 py-2  ${
                                          selectedItems.includes("management")
                                            ? "text-white bg-[#0a854b]"
                                            : "bg-black"
                                        }`}
                                      >
                                        Management
                                      </button>
                                      <div className="flex ">
                                        <button onClick={toggleMembership}>
                                          <ThreeDotsButton />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  {showMembership && (
                                    <div className="absolute top-[10%] right-0 bg-gray-800 rounded-lg shadow-lg w-80">
                                      <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg">
                                        <span className="text-base font-poppins font-semibold">
                                          Group Membership
                                        </span>
                                        <button
                                          className="absolute top-0 right-0 transform -translate-y-1/2  text-green-400 bg-[#FFFFFF] rounded-full"
                                          onClick={toggleMembership}
                                          style={{
                                            width: "29px",
                                            height: "29px",
                                            background: "#FFFFFF",
                                            border: "2px solid #31B47663",
                                            opacity: 1,
                                          }}
                                        >
                                          &times;
                                        </button>
                                      </div>
                                      <div className="p-4">
                                        <div className="flex justify-between items-center mb-4">
                                          <span className="text-white tex-sm font-poppins font-medium">
                                            2 Members
                                          </span>
                                        </div>

                                        <div className="space-y-4">
                                          <div className="flex ">
                                            <div
                                              className="flex items-center justify-center text-[black] bg-gray-700 rounded-full"
                                              // style={{
                                              //   width: "47px",
                                              //   height: "47px",
                                              //   background: "#FFFFFF",
                                              //   opacity: 1,
                                              // }}
                                            >
                                              <img
                                                src={userIcon}
                                                alt="icons"
                                                style={{
                                                  width: "47px",
                                                  height: "47px",
                                                }}
                                              />
                                            </div>
                                            <div className="flex flex-col ml-3">
                                              <span className="text-white block text-base font-poppins font-semibold">
                                                Rajat Mohanty
                                              </span>
                                              <span className="text-gray-400 text-sm font-poppins font-normal">
                                                Member{" "}
                                                <FontAwesomeIcon
                                                  icon={faAngleDown}
                                                />
                                              </span>
                                            </div>
                                          </div>
                                          <div className="border-t border-gray-600"></div>
                                          <div className="flex ">
                                            <div
                                              className="flex items-center justify-center text-[black] bg-gray-700 rounded-full"
                                              style={{
                                                width: "47px",
                                                height: "47px",
                                                background: "#FFFFFF",
                                                opacity: 1,
                                              }}
                                            >
                                              <img
                                                src={userIcon}
                                                alt="icons"
                                                style={{
                                                  width: "47px",
                                                  height: "47px",
                                                }}
                                              />
                                            </div>
                                            <div className="flex flex-col ml-3">
                                              <span className="text-white block text-base font-poppins font-semibold">
                                                Rajat Mohanty
                                              </span>
                                              <span className="text-gray-400 text-sm font-poppins font-normal">
                                                Member{" "}
                                                <FontAwesomeIcon
                                                  icon={faAngleDown}
                                                />
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                <div className="flex flex-col">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      className="custom-checkbox"
                                    />
                                    <span className="text-[#6A7581] font-poppins ">
                                      Operations
                                    </span>
                                  </label>
                                  <label className="flex items-center space-x-2 mt-2">
                                    <input
                                      type="checkbox"
                                      className="custom-checkbox"
                                    />
                                    <span className="text-[#6A7581] font-poppins">
                                      Management
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                <div className="relative">
                                  <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="transition ease-out duration-300  hover:transform hover:scale-110 w-6 h-6"
                                      onClick={toggleeditMembership}
                                    />
                                  </button>

                                  {showEditMembership && (
                                    <div className="absolute top-[-34px] right-0 bg-gray-800 rounded-lg shadow-lg w-80">
                                      <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg relative">
                                        <span className="text-base font-poppins font-semibold">
                                          Group Membership
                                        </span>
                                        <button
                                          className="absolute top-2 right-2 text-green-400 bg-white rounded-full"
                                          onClick={toggleeditMembership}
                                          style={{
                                            width: "29px",
                                            height: "29px",
                                            border: "2px solid #31B47663",
                                          }}
                                        >
                                          &times;
                                        </button>
                                      </div>

                                      <div className="p-4 space-y-4">
                                        {/* Member List */}
                                        {["Rajat Mohanty", "Rajat Mohanty"].map(
                                          (member, index) => (
                                            <div
                                              key={index}
                                              className="flex justify-between items-center mb-4"
                                            >
                                              <div className="flex items-center">
                                                <div
                                                  className="flex items-center justify-center text-black bg-gray-700 rounded-full"
                                                  // style={{
                                                  //   width: "47px",
                                                  //   height: "47px",
                                                  //   background: "#FFFFFF",
                                                  //   opacity: 1,
                                                  // }}
                                                >
                                                  {/* <FontAwesomeIcon icon={faUserLarge} /> */}
                                                  <img
                                                    src={userIcon}
                                                    alt="icons"
                                                    style={{
                                                      width: "47px",
                                                      height: "47px",
                                                    }}
                                                  />
                                                </div>
                                                <div className="flex flex-col ml-3">
                                                  <span className="text-white block text-base font-poppins font-semibold">
                                                    {member}
                                                  </span>
                                                  <span className="text-gray-400 text-sm font-poppins font-normal">
                                                    Member{" "}
                                                    <FontAwesomeIcon
                                                      icon={faAngleDown}
                                                    />
                                                  </span>
                                                </div>
                                              </div>
                                              <button
                                                className="flex items-center justify-center text-green-400 bg-gray-700 rounded-full transition-colors duration-200 ease-in-out"
                                                style={{
                                                  width: "29px",
                                                  height: "29px",
                                                  background: "#FFFFFF00",
                                                  border: "2px solid #31B47663",
                                                }}
                                                onMouseEnter={() =>
                                                  setHoveredRemoveIndex(index)
                                                }
                                                onMouseLeave={() =>
                                                  setHoveredRemoveIndex(null)
                                                }
                                              >
                                                <FontAwesomeIcon
                                                  icon={
                                                    hoveredRemoveIndex === index
                                                      ? faClose
                                                      : faMinus
                                                  }
                                                  className="transition-transform duration-1000 ease-in-out"
                                                />
                                              </button>
                                            </div>
                                          )
                                        )}

                                        {/* Divider */}
                                        <div className="border-t border-gray-600"></div>

                                        {/* Add Members Input Box - Aligned with Member List */}
                                        <div className="flex items-center justify-between bg-[#1B1E26] border border-[#31B47633] rounded-[5px] p-3">
                                          <input
                                            type="text"
                                            placeholder="Add new member"
                                            className="bg-transparent text-white placeholder-gray-400 w-full outline-none"
                                          />
                                          <FontAwesomeIcon
                                            className="text-[#31B476]"
                                            icon={faSearch}
                                          />
                                        </div>

                                        {/* Add Member List */}
                                        {/* {[
                                          "Rajat Mohanty",
                                          "Vinod Vasudevan",
                                          "Rajat Mohanty",
                                        ].map((username, index) => (
                                          <div
                                            key={index}
                                            className="flex items-center justify-between bg-[#1B1E26] border border-[#31B476] rounded-[5px] p-3 mt-2"
                                          >
                                            <div className="flex items-center">
                                              <img
                                                src={userIcon}
                                                // icon={faUserLarge}
                                                className="text-[#31B476]"
                                                style={{
                                                  width: "29px",
                                                  height: "29px",
                                                }}
                                              />
                                              <span className="ml-3 text-white font-poppins font-semibold text-sm">
                                                {username}
                                              </span>
                                            </div>
                                            <button
                                              className="flex items-center justify-center text-green-400 bg-gray-700 rounded-full"
                                              style={{
                                                width: "29px",
                                                height: "29px",
                                                background: "#FFFFFF00",
                                                border: "2px solid #31B47663",
                                              }}
                                              onMouseEnter={() =>
                                                setHoveredAddIndex(index)
                                              }
                                              onMouseLeave={() =>
                                                setHoveredAddIndex(null)
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={
                                                  hoveredAddIndex === index
                                                    ? faClose
                                                    : faPlus
                                                }
                                              />
                                            </button>
                                          </div>
                                        ))} */}

                                        {/* Footer Buttons */}
                                        <div className="flex justify-end gap-4 mt-4 group">
                                          <button className="flex items-center bg-[#1B1E26] hover:bg-[#31E48F] text-white px-4 py-2 rounded-lg group-hover:text-white">
                                            <img
                                              src={iconsmodel}
                                              alt="iconsmodel"
                                              className="mr-2 btn-icon"
                                            />
                                            <span>Save</span>
                                          </button>
                                          <button className="text-gray-400">
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                Insert
                              </td>
                              <td className="border border-customBorderColor text-customWhite bg-black">
                                <div className="flex flex-wrap">
                                  <div className="px-4 flex gap-4">
                                    <button
                                      type="button"
                                      onClick={() => handleClick("insertSales")}
                                      className={`border border-[#6A7581] font-poppins font-normal text-[#FFFFFF] px-4 py-2 w-40 h-12 ${
                                        selectedItems.includes("insertSales")
                                          ? "text-white bg-[#0a854b]"
                                          : "bg-black"
                                      }`}
                                    >
                                      Sales NA
                                    </button>
                                  </div>
                                  {/* <span
                                    onClick={() => handleClick("sales2")}
                                    className={`p-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("sales2")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    Sales NA
                                  </span> */}
                                </div>
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                <div className="flex flex-col">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      className="custom-checkbox"
                                    />
                                    <span className="text-[#6A7581] font-poppins">
                                      Operation
                                    </span>
                                  </label>
                                  <label className="flex items-center space-x-2 mt-2">
                                    <input
                                      type="checkbox"
                                      className="custom-checkbox"
                                    />
                                    <span className="text-[#6A7581] font-poppins">
                                      Management
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                                  />
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                Update
                              </td>
                              <td className="border border-customBorderColor text-customWhite bg-black">
                                <div className="flex flex-wrap">
                                  <div className="px-4 flex gap-4">
                                    <button
                                      type="button"
                                      onClick={() => handleClick("updateSales")}
                                      className={`border border-[#6A7581] font-poppins font-normal text-[#FFFFFF] px-4 py-2 w-40 h-12 ${
                                        selectedItems.includes("updateSales")
                                          ? "text-white bg-[#0a854b]"
                                          : "bg-black"
                                      }`}
                                    >
                                      Sales NA
                                    </button>
                                  </div>
                                  {/* <span
                                    onClick={() => handleClick("sales3")}
                                    className={`p-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("sales3")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    Sales NA
                                  </span> */}
                                </div>
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                <div className="flex flex-col">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      className="custom-checkbox"
                                    />
                                    <span className="text-[#6A7581] font-poppins">
                                      Operation
                                    </span>
                                  </label>
                                  <label className="flex items-center space-x-2 mt-2">
                                    <input
                                      type="checkbox"
                                      className="custom-checkbox"
                                    />
                                    <span className="text-[#6A7581] font-poppins">
                                      Management
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                                  />
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                Delete
                              </td>
                              <td className="border border-customBorderColor text-customWhite bg-black">
                                <div className="flex flex-wrap">
                                  <div className="px-4 flex gap-4">
                                    <button
                                      type="button"
                                      onClick={() => handleClick("deleteSales")}
                                      className={`border border-[#6A7581] font-poppins font-normal text-[#FFFFFF] px-4 py-2 w-40 h-12 ${
                                        selectedItems.includes("deleteSales")
                                          ? "text-white bg-[#0a854b]"
                                          : "bg-black"
                                      }`}
                                    >
                                      Sales NA
                                    </button>
                                  </div>
                                  {/* <span
                                    onClick={() => handleClick("sales4")}
                                    className={`p-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("sales4")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    Sales NA
                                  </span> */}
                                </div>
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                <div className="flex flex-col">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      className="custom-checkbox"
                                    />
                                    <span className="text-[#6A7581] font-poppins">
                                      Operation
                                    </span>
                                  </label>
                                  <label className="flex items-center space-x-2 mt-2">
                                    <input
                                      type="checkbox"
                                      className="custom-checkbox"
                                    />
                                    <span className="text-[#6A7581] font-poppins">
                                      Management
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                                  />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-customBlack py-8 rounded-lg shadow-md mt-4">
                <div className="page-center">
                  <div className="flex px-4 justify-center">
                    <h1 className="text-[#FFFFFF] font-poppins font-semibold text-2xl">
                      ON
                    </h1>
                  </div>
                  <div className="flex flex-wrap justify-around px-4">
                    {/* First Column */}

                    <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[45.333333%] xl:basis-[45.333333%] 2xl:basis-[45.333333%] ipad-query">
                      <div className="flex items-baseline mb-2">
                        <span
                          className="text-[#6A7581] font-poppins font-semibold text-sm"
                          // style={{ marginLeft: "35px" }}
                        >
                          Data Store
                        </span>
                      </div>
                      <div className="flex items-baseline">
                        {/* <span className="text-white mr-2 ">On</span> */}
                        <PrivacyCustomDropdown
                          options={data.dataStoreOptions || []}
                          placeholder="DB1"
                          isOpen={openDropdown === "dataStoreOptions"}
                          onDropdownClick={() =>
                            handleDropdownClick("dataStoreOptions")
                          }
                          selectedOption={selectedOptions["dataStoreOptions"]}
                          onOptionClick={(option) =>
                            handleOptionClick("dataStoreOptions", option)
                          }
                          // paddingLeft={"1rem"}
                          // paddingRight={"1rem"}
                        />
                      </div>
                    </div>

                    {/* Second Column */}
                    <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[45.333333%] xl:basis-[45.333333%] 2xl:basis-[45.333333%] mt-4 sm:mt-0 ipad-query">
                      <div className="flex items-baseline mb-2">
                        <span
                          className="text-[#6A7581] font-poppins font-semibold text-sm"
                          // style={{ marginLeft: "31px" }}
                        >
                          Table/View
                        </span>
                      </div>
                      <div className="flex items-baseline">
                        {/* <span className="text-white mr-2 ">On</span> */}
                        <PrivacyCustomDropdown
                          options={data.tableOptions || []}
                          placeholder="Table1"
                          isOpen={openDropdown === "tableOptions"}
                          onDropdownClick={() =>
                            handleDropdownClick("tableOptions")
                          }
                          selectedOption={selectedOptions["tableOptions"]}
                          onOptionClick={(option) =>
                            handleOptionClick("tableOptions", option)
                          }
                          // paddingLeft={"1rem"}
                          // paddingRight={"1rem"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="with_the_following_action">
                <div className="pt-[1rem] ">
                  <div className="flex items-baseline  px-4 pt-[1rem] ml-2 gap-2.5">
                    {/* <span className="text-[#31B476]  mr-2 font-poppins  font-semibold">
                    DataField
                  </span> */}
                    <PrivacyCustomDropdown
                      options={data.dataFeildOption || []}
                      placeholder="Opportunity Name"
                      isOpen={openDropdown === "dataFeildOption"}
                      onDropdownClick={() =>
                        handleDropdownClick("dataFeildOption")
                      }
                      selectedOption={selectedOptions["dataFeildOption"]}
                      onOptionClick={(option) =>
                        handleOptionClick("dataFeildOption", option)
                      }
                      width={"250px"}
                      // paddingLeft={"1rem"}
                      // paddingRight={"1rem"}
                    />
                  </div>
                </div>

                <div className="bg-customBlack p-4 rounded-lg shadow-md">
                  <div className="flex flex-col">
                    <div className="flex flex-wrap justify-between">
                      <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[49%] xl:basis-[49%] 2xl:basis-[49%] p-2 overflow-x-auto basis-ipad">
                        <h2 className="p-2 text-[#f7fbf9] bg-[#0a854b] text-center font-poppins font-semibold text-lg">
                          Permissions
                        </h2>
                        <div className="overflow-x-auto overflow-y-hidden">
                          <table className="bg-customBlack border border-gray-200 w-full">
                            <thead>
                              <tr>
                                <th className="px-2.5 py-2 border border-customBorderColor bg-[#1b1e26] text-customWhite font-poppins font-semibold">
                                  Permission
                                </th>
                                <th className="px-2.5 py-2 border border-customBorderColor bg-[#2f3a45] text-customWhite font-poppins font-semibolde">
                                  Existing
                                </th>
                                <th className="px-2.5 py-2 border border-customBorderColor bg-[#6a7581] text-customWhite font-poppins font-semibold">
                                  <div className="relative">
                                    <div className="flex gap-2">
                                      <div>Revised</div>
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                                        onClick={toggleeditMembershipPermission}
                                      />
                                    </div>

                                    {showEditMembershipPermission && (
                                      <>
                                        {/* Backdrop */}
                                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

                                        {/* Modal */}
                                        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                                          <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                                            <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg relative">
                                              <span className="text-base font-poppins font-semibold">
                                                Group Membership
                                              </span>
                                              <button
                                                className="absolute top-2 right-2 text-green-400 bg-white rounded-full"
                                                onClick={
                                                  toggleeditMembershipPermission
                                                }
                                                style={{
                                                  width: "29px",
                                                  height: "29px",
                                                  border: "2px solid #31B47663",
                                                }}
                                              >
                                                &times;
                                              </button>
                                            </div>

                                            <div className="p-4 space-y-4">
                                              {/* Member List */}
                                              {[
                                                "Rajat Mohanty",
                                                "Rajat Mohanty",
                                              ].map((member, index) => (
                                                <div
                                                  key={index}
                                                  className="flex justify-between items-center mb-4"
                                                >
                                                  <div className="flex items-center">
                                                    <div className="flex items-center justify-center text-black bg-gray-700 rounded-full">
                                                      <img
                                                        src={userIcon}
                                                        alt="icons"
                                                        style={{
                                                          width: "47px",
                                                          height: "47px",
                                                        }}
                                                      />
                                                    </div>
                                                    <div className="flex flex-col ml-3">
                                                      <span className="text-white block text-base font-poppins font-semibold">
                                                        {member}
                                                      </span>
                                                      <span className="text-gray-400 text-sm font-poppins font-normal">
                                                        Member{" "}
                                                        <FontAwesomeIcon
                                                          icon={faAngleDown}
                                                        />
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <button
                                                    className="flex items-center justify-center text-green-400 bg-gray-700 rounded-full transition-colors duration-200 ease-in-out"
                                                    style={{
                                                      width: "29px",
                                                      height: "29px",
                                                      background: "#FFFFFF00",
                                                      border:
                                                        "2px solid #31B47663",
                                                    }}
                                                    onMouseEnter={() =>
                                                      setHoveredRemoveIndex(
                                                        index
                                                      )
                                                    }
                                                    onMouseLeave={() =>
                                                      setHoveredRemoveIndex(
                                                        null
                                                      )
                                                    }
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={
                                                        hoveredRemoveIndex ===
                                                        index
                                                          ? faClose
                                                          : faMinus
                                                      }
                                                      className="transition-transform duration-1000 ease-in-out"
                                                    />
                                                  </button>
                                                </div>
                                              ))}

                                              {/* Divider */}
                                              <div className="border-t border-gray-600"></div>

                                              {/* Add Members Input Box */}
                                              <div className="flex items-center justify-between bg-[#1B1E26] border border-[#31B47633] rounded-[5px] p-3">
                                                <input
                                                  type="text"
                                                  placeholder="Add new member"
                                                  className="bg-transparent text-white placeholder-gray-400 w-full outline-none"
                                                />
                                                <FontAwesomeIcon
                                                  className="text-[#31B476]"
                                                  icon={faSearch}
                                                />
                                              </div>

                                              {/* Footer Buttons */}
                                              <div className="flex justify-end gap-4 mt-4 group">
                                                <button className="flex items-center bg-[#1B1E26] hover:bg-[#31E48F] text-white px-4 py-2 rounded-lg group-hover:text-white">
                                                  <img
                                                    src={iconsmodel}
                                                    alt="iconsmodel"
                                                    className="mr-2 btn-icon"
                                                  />
                                                  <span>Save</span>
                                                </button>
                                                <button className="text-gray-400">
                                                  Cancel
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                  Select
                                </td>
                                <td className="border border-customBorderColor text-customWhite bg-black">
                                  <div className="flex flex-col">
                                    {/* <span
                                    onClick={() => handleClick("sales1")}
                                    className={`p-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("sales1")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    Sales NA
                                  </span>
                                  <span
                                    onClick={() => handleClick("management")}
                                    className={`p-2 mt-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("management")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    HR
                                  </span> */}
                                    <div className="px-4 flex gap-4">
                                      <button
                                        type="button"
                                        onClick={() => handleClick("sales1")}
                                        className={`border border-green-500 font-poppins font-normal text-xs text-[#FFFFFF] px-4 py-2  ${
                                          selectedItems.includes("sales1")
                                            ? "text-white bg-[#0a854b]"
                                            : "bg-black"
                                        }`}
                                      >
                                        Operation
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleClick("management")
                                        }
                                        className={`border border-green-500 font-poppins font-normal  text-xs text-[#FFFFFF] px-4 py-2   ${
                                          selectedItems.includes("management")
                                            ? "text-white bg-[#0a854b]"
                                            : "bg-black"
                                        }`}
                                      >
                                        Management
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                  <div className="flex flex-col">
                                    <label className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                      />
                                      <span className="text-[#5d5d5d] font-poppins">
                                        Operations
                                      </span>
                                    </label>
                                    <label className="flex items-center space-x-2 mt-2">
                                      <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                      />
                                      <span className="text-[#5d5d5d] font-poppins">
                                        Management
                                      </span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                  Insert
                                </td>
                                <td className="border border-customBorderColor text-customWhite bg-black">
                                  <div className="flex flex-col">
                                    {/* <span
                                    onClick={() => handleClick("sales2")}
                                    className={`p-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("sales2")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    Sales NA
                                  </span> */}
                                    <div className="px-4 flex gap-4">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleClick("insertSalesPermission")
                                        }
                                        className={`border border-[#6A7581] font-poppins font-normal text-xs text-[#FFFFFF] px-4 py-2 w-[107px] h-[31px] ${
                                          selectedItems.includes(
                                            "insertSalesPermission"
                                          )
                                            ? "text-white bg-[#0a854b]"
                                            : "bg-black"
                                        }`}
                                      >
                                        Sales NA
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                  <div className="flex flex-col">
                                    <label className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                      />
                                      <span className="text-[#5d5d5d] font-poppins">
                                        Operation
                                      </span>
                                    </label>
                                    <label className="flex items-center space-x-2 mt-2">
                                      <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                      />
                                      <span className="text-[#5d5d5d] font-poppins">
                                        Management
                                      </span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                  Update
                                </td>
                                <td className="border border-customBorderColor text-customWhite bg-black">
                                  <div className="flex flex-col">
                                    {/* <span
                                    onClick={() => handleClick("sales3")}
                                    className={`p-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("sales3")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    Sales NA
                                  </span> */}
                                    <div className="px-4 flex gap-4">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleClick("updateSalesPermission")
                                        }
                                        className={`border border-[#6A7581] font-poppins font-normal text-xs text-[#FFFFFF] px-4 py-2 w-[107px] h-[31px] ${
                                          selectedItems.includes(
                                            "updateSalesPermission"
                                          )
                                            ? "text-white bg-[#0a854b]"
                                            : "bg-black"
                                        }`}
                                      >
                                        Sales NA
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                  <div className="flex flex-col">
                                    <label className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                      />
                                      <span className="text-[#5d5d5d] font-poppins">
                                        Operation
                                      </span>
                                    </label>
                                    <label className="flex items-center space-x-2 mt-2">
                                      <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                      />
                                      <span className="text-[#5d5d5d] font-poppins">
                                        Management
                                      </span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                  Delete
                                </td>
                                <td className="border border-customBorderColor text-customWhite bg-black">
                                  <div className="flex flex-col">
                                    {/* <span
                                    onClick={() => handleClick("sales4")}
                                    className={`p-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("sales4")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    Sales NA
                                  </span> */}
                                    <div className="px-4 flex gap-4">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleClick("deleteSalespermisson")
                                        }
                                        className={`border border-[#6A7581] font-poppins font-normal text-xs text-[#FFFFFF] px-4 py-2 w-[107px] h-[31px] ${
                                          selectedItems.includes(
                                            "deleteSalespermisson"
                                          )
                                            ? "text-white bg-[#0a854b]"
                                            : "bg-black"
                                        }`}
                                      >
                                        Sales NA
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                  <div className="flex flex-col">
                                    <label className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                      />
                                      <span className="text-[#5d5d5d] font-poppins">
                                        Operation
                                      </span>
                                    </label>
                                    <label className="flex items-center space-x-2 mt-2">
                                      <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                      />
                                      <span className="text-[#5d5d5d] font-poppins">
                                        Management
                                      </span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[49%] xl:basis-[49%] 2xl:basis-[49%] p-2 overflow-x-auto overflow-y-hidden basis-ipad">
                        <h2 className="p-2 text-[#f7fbf9] bg-[#0a854b] text-center font-poppins font-semibold text-lg">
                          Privacy Filtering
                        </h2>
                        <div className="overflow-x-auto overflow-y-hidden">
                          <table className="bg-customBlack border border-gray-200 w-full">
                            <thead>
                              <tr>
                                <th className=" py-2 border border-customBorderColor bg-[#1b1e26] text-customWhite font-poppins font-semibold">
                                  Category
                                </th>
                                <th className=" py-2 border border-customBorderColor bg-[#2f3a45] text-customWhite font-poppins font-semibold">
                                  Action
                                </th>
                                <th className=" py-2 border border-customBorderColor bg-[#6a7581] text-customWhite font-poppins font-semibold">
                                  Transformation value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className=" py-2 border border-customBorderColor text-customWhite bg-black">
                                  <PrivacyCustomDropdown
                                    options={data.privacyValueOption || []}
                                    width={"169px "}
                                    placeholder="None"
                                    isOpen={openDropdown === "privacyValue"}
                                    onDropdownClick={() =>
                                      handleDropdownClick("privacyValue")
                                    }
                                    selectedOption={
                                      selectedOptions["privacyValue"]
                                    }
                                    onOptionClick={(option) =>
                                      handleOptionClick("privacyValue", option)
                                    }
                                  />
                                </td>
                                <td className=" py-2 border border-customBorderColor text-customWhite bg-black">
                                  <PrivacyCustomDropdown
                                    options={data.privacyActionOption || []}
                                    placeholder="None"
                                    width={"139px"}
                                    isOpen={openDropdown === "privacyAction"}
                                    onDropdownClick={() =>
                                      handleDropdownClick("privacyAction")
                                    }
                                    selectedOption={
                                      selectedOptions["privacyAction"]
                                    }
                                    onOptionClick={(option) =>
                                      handleOptionClick("privacyAction", option)
                                    }
                                  />
                                </td>
                                <td className=" py-2 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                              </tr>
                              <tr>
                                <td className=" py-7 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                <td className=" py-7 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                <td className=" py-7 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                              </tr>
                   
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap">
                      <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[100%] xl:basis-[100%] 2xl:basis-[100%] p-2 overflow-x-auto overflow-y-hidden ">
                        <h2 className="p-2 text-[#f7fbf9] bg-[#0a854b] text-center font-poppins font-semibold text-lg">
                          Attribute Filtering
                        </h2>
                        <div className="overflow-x-auto overflow-y-hidden">
                          <table className="bg-customBlack border border-gray-200 w-full">
                            <thead>
                              <tr>
                                <th className="pl-4 py-2 border border-customBorderColor bg-[#1b1e26] text-customWhite font-poppins font-semibold">
                                  Attribute
                                </th>
                                <th className="pl-4  py-2 border border-customBorderColor bg-[#2f3a45] text-customWhite font-poppins font-semibold">
                                  Value
                                </th>
                                <th className="pl-4  py-2 border border-customBorderColor bg-[#6a7581] text-customWhite font-poppins font-semibold">
                                  Action
                                </th>
                                <th className="pl-4  py-2 border border-customBorderColor bg-[#2f3a45] text-customWhite font-poppins font-semibold">
                                  Transformation Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="pl-4  py-2 border border-customBorderColor text-customWhite bg-black">
                                  <PrivacyCustomDropdown
                                    options={data.attributeOption || []}
                                    placeholder="Select Option"
                                    isOpen={openDropdown === "attributeOption"}
                                    width={"194px"}
                                    onDropdownClick={() =>
                                      handleDropdownClick("attributeOption")
                                    }
                                    selectedOption={
                                      selectedOptions["attributeOption"]
                                    }
                                    onOptionClick={(option) =>
                                      handleOptionClick(
                                        "attributeOption",
                                        option
                                      )
                                    }
                                  />
                                </td>
                                <td className="pl-4 py-2 border border-customBorderColor text-customWhite bg-black">
                                  <PrivacyCustomDropdown
                                    options={data.attributeValueOption || []}
                                    placeholder="Select Option"
                                    width={"194px"}
                                    isOpen={openDropdown === "attributeValue"}
                                    onDropdownClick={() =>
                                      handleDropdownClick("attributeValue")
                                    }
                                    selectedOption={
                                      selectedOptions["attributeValue"]
                                    }
                                    onOptionClick={(option) =>
                                      handleOptionClick(
                                        "attributeValue",
                                        option
                                      )
                                    }
                                  />
                                </td>
                                <td className="pl-4  py-2 border border-customBorderColor text-customWhite bg-black">
                                  <PrivacyCustomDropdown
                                    options={data.attributeActionOption || []}
                                    placeholder="Select Option"
                                    width={"194px"}
                                    isOpen={
                                      openDropdown === "attributeActionOption"
                                    }
                                    onDropdownClick={() =>
                                      handleDropdownClick(
                                        "attributeActionOption"
                                      )
                                    }
                                    selectedOption={
                                      selectedOptions["attributeActionOption"]
                                    }
                                    onOptionClick={(option) =>
                                      handleOptionClick(
                                        "attributeActionOption",
                                        option
                                      )
                                    }
                                  />
                                </td>
                                <td className="pl-4  py-6 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                              </tr>
                              <tr>
                                <td className="pl-4  py-8 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                <td className="pl-4  py-8 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                <td className="pl-4  py-8 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                <td className="pl-4  py-8 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-[1rem] ">
                    <div className="flex items-baseline  px-4 pt-[1rem] ml-2 gap-2.5">
                      <span className="text-[#31B476]  mr-2 font-poppins  font-semibold">
                        Row Level Filtering Based on Value
                      </span>
                      <PrivacyCustomDropdown
                        options={data.rowLevelFilterinOption || []}
                        placeholder="Opportunity Name"
                        isOpen={openDropdown === "rowLevelFilterinOption"}
                        onDropdownClick={() =>
                          handleDropdownClick("rowLevelFilterinOption")
                        }
                        selectedOption={
                          selectedOptions["rowLevelFilterinOption"]
                        }
                        onOptionClick={(option) =>
                          handleOptionClick("rowLevelFilterinOption", option)
                        }
                        width={"250px"}
                        // paddingLeft={"1rem"}
                        // paddingRight={"1rem"}
                      />
                    </div>
                  </div>

                  <div
                    className={`bg-[#6A7581] hover:bg-customGreen text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform cursor-pointer font-poppins  ${
                      isClickedAdd
                        ? "hover:bg-customGreen hover:text-white"
                        : ""
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
                  {/* <div className="flex justify-end text-end gap-2 px-4 py-4">
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
              </div> */}

                  {/* {sections.length === 1 ? (
                  <div className="flex justify-end text-end gap-2 px-4 py-4">
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
                      onClick={() => setSectionVisible(!isSectionVisible)}
                    >
                      <FontAwesomeIcon
                        className=" transition ease-out duration-300 hover:transform hover:scale-110 w-7 h-7"
                        icon={faTrash}
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end text-end gap-2 px-4 py-4">
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
                )} */}
                </div>
              </div>
            </div>
            <div className="mb-2"></div>
          </div>
        ))}

      {/* <div
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
      </div> */}

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
                    Target Application
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    GenAI Application
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Business Function
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    API Name
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    JSON Format
                  </th>
                </tr>
              </thead>
              <tbody className="bg-customTablebG">
                <tr>
                  <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                    Secure Sales Opportunities API
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
                    Sales Opportunities
                  </td>
                  <td className="px-4 py-2 border border-customBorderColor bg-customTablebG">
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
                  <td className="px-4 py-6 border border-customBorderColor"></td>
                </tr>
                <tr>
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

      {/* {isGroupMembershipOpen && (
        <GroupMembershipModal onClose={() => setGroupMembershipOpen(false)} />
      )}

      {isEditPermissionsOpen && (
        <EditPermissionsModal onClose={() => setEditPermissionsOpen(false)} />
      )} */}

      {isModalOpen && (
        <Modal
          message="Are you sure you want to save this policy?"
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default Chart2DatabasePage;
