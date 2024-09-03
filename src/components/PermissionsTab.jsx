import React, { useState } from "react";
import PrivacyCustomDropdown from "./PrivacyCustomDropdown";
import ThreeDotsButton from "./ThreeDotsButton";
// import GroupMembershipModal from "./GroupMembershipModal";
// import EditPermissionsModal from "./EditPermissionsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faDownload,
  faTrash,
  faMinus,
  faPlus,
  faSearch,
  faUser,
  faUserCircle,
  faClose,
  faArrowDown,
  faAngleDown,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";
import userIcon from "../assets/usericon.svg";
import iconsmodel from "../assets/save.svg";

function PermissionsTab() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isGroupMembershipOpen, setGroupMembershipOpen] = useState(false);
  const [isEditPermissionsOpen, setEditPermissionsOpen] = useState(false);
  const [showMembership, setShowMembership] = useState(false);
  const [showEditMembership, setShowEditMembership] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredRemoveIndex, setHoveredRemoveIndex] = useState(null);
  const [hoveredAddIndex, setHoveredAddIndex] = useState(null);

  const toggleMembership = () => {
    setShowMembership(!showMembership);
  };

  const toggleeditMembership = () => {
    setShowEditMembership(!showEditMembership);
  };

  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleOptionClick = (dropdownId, option) => {
    setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
    setOpenDropdown(null);
  };

  const handleGroupMembershipOpen = () => {
    setGroupMembershipOpen(true);
  };

  const handleEditPermissionsOpen = () => {
    setEditPermissionsOpen(true);
  };

  const data = {
    attributeOption: ["xyz.sharepoint", "item 2", "item 3", "item 4"],
    documentOption: ["Document 1", "Document 2", "Document 3"],
  };

  return (
    <>
      <div className="bg-customBlack shadow-md">
        <div className="page-center">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200  ">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-customBorderColor bg-[#000000] text-[#31E48F] font-poppins font-semibold">
                    Document Repository
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-[#000000] text-[#31E48F] font-poppins font-semibold">
                    Document Name
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-[#000000] text-[#31E48F] font-poppins font-semibold">
                    Original Permissions
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-[#000000] text-[#31E48F] font-poppins font-semibold">
                    Revised Permissions
                  </th>
                  {/* <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-customTablebG">
                <tr>
                  <td className="pl-4  border border-customBorderColor text-customWhite bg-black">
                    <PrivacyCustomDropdown
                      options={data.attributeOption || []}
                      placeholder="Select Repository"
                      // width={"188px"}
                      isOpen={openDropdown === "attributeOption"}
                      onDropdownClick={() =>
                        handleDropdownClick("attributeOption")
                      }
                      selectedOption={selectedOptions["attributeOption"]}
                      onOptionClick={(option) =>
                        handleOptionClick("attributeOption", option)
                      }
                    />
                  </td>
                  <td className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]">
                    <PrivacyCustomDropdown
                      options={data.attributeOption || []}
                      placeholder="Select Document"
                      // width={"188px"}
                      isOpen={openDropdown === "documentOption"}
                      onDropdownClick={() =>
                        handleDropdownClick("documentOption")
                      }
                      selectedOption={selectedOptions["documentOption"]}
                      onOptionClick={(option) =>
                        handleOptionClick("documentOption", option)
                      }
                    />
                  </td>
                  <td className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]">
                    <div className="relative">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="font-poppins text-base">
                            Everyone System
                          </span>
                          <span className="font-poppins text-sm">
                            alice@acme.com
                          </span>
                          <span className="font-poppins text-sm">
                            bob@acme.com
                          </span>
                        </div>
                        <div className="flex">
                          <button onClick={toggleMembership}>
                            <ThreeDotsButton />
                          </button>
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
                                    <FontAwesomeIcon icon={faAngleDown} />
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
                                    <FontAwesomeIcon icon={faAngleDown} />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]">
                    <div className="relative">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="font-poppins text-base">
                            Everyone System
                          </span>
                          <span className="font-poppins text-sm">
                            alice@acme.com
                          </span>
                          <span className="font-poppins text-sm">
                            bob@acme.com
                          </span>
                        </div>
                        <div className="flex">
                          <button
                            onClick={toggleeditMembership}
                            className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="transition ease-out duration-300 hover:transform hover:scale-110 "
                            />
                          </button>
                        </div>
                      </div>

                      {showEditMembership && (
                        <div className="absolute top-0 right-0 bg-gray-800 rounded-lg shadow-lg w-80">
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
                                        <FontAwesomeIcon icon={faAngleDown} />
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
                            {[
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
                                    style={{ width: "29px", height: "29px" }}
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
                                  onMouseEnter={() => setHoveredAddIndex(index)}
                                  onMouseLeave={() => setHoveredAddIndex(null)}
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
                            ))}

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
                              <button className="text-gray-400">Cancel</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  {/* <td className="px-4 py-6 border border-customBorderColor"></td> */}
                </tr>
                <tr>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  {/* <td className="px-4 py-6 border border-customBorderColor"></td> */}
                </tr>
                <tr>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  {/* <td className="px-4 py-6 border border-customBorderColor"></td> */}
                </tr>
                <tr>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  {/* <td className="px-4 py-6 border border-customBorderColor"></td> */}
                </tr>
                <tr>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  <td className="px-4 py-10 border border-customBorderColor bg-[#000000]"></td>
                  {/* <td className="px-4 py-6 border border-customBorderColor"></td> */}
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
    </>
  );
}

export default PermissionsTab;
