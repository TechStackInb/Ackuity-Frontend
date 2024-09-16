import React, { useEffect, useState } from "react";
import PrivacyCustomDropdown from "./PrivacyCustomDropdown";
import ThreeDotsButton from "./ThreeDotsButton";
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
import { BASE_URL } from "../services/api";

function PermissionsTab() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isGroupMembershipOpen, setGroupMembershipOpen] = useState(false);
  const [isEditPermissionsOpen, setEditPermissionsOpen] = useState(false);
  const [showMembership, setShowMembership] = useState(false);
  const [showEditMembership, setShowEditMembership] = useState(false);

  const [hoveredRemoveIndex, setHoveredRemoveIndex] = useState(null);
  const [hoveredAddIndex, setHoveredAddIndex] = useState(null);

  const [members, setMembers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [availableUsers, setAvailableUsers] = useState([]);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [Allusers, setUsers] = useState([]);

  const [savedData, setSavedData] = useState([]);
  const [Members, setAllMembers] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  // const fetchPolicyUsers = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/api/data/members`, {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch policies");
  //     }

  //     const data = await response.json();
  //     const allMembers = data.data;
  //     console.log(allMembers, "allMembers");
  //     setAllMembers(allMembers);
  //     // console.log(allUsers, "allUsers");
  //   } catch (error) {
  //     console.error("Error fetching policies:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchPolicyUsers();
  // }, []);

  const fetchPolicyPermission = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerPermissions`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch policies");
      }

      const data = await response.json();
      const allUsers = data.data.map((policy) => policy.members).flat();
      // console.log(allUsers, "allUsers");
      setAvailableUsers(allUsers);
      setSavedData(data.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  useEffect(() => {
    fetchPolicyPermission();
  }, []);

  console.log(savedData);

  console.log(Allusers, "Allusers");

  const availableUserss = [
    "Rajat Mohanty",
    "Vinod Vasudevan",
    "John Doe",
    "Jane Smith",
  ];

  // const handleSearch = (event) => {
  //   const query = event.target.value.toLowerCase();
  //   setSearchQuery(query);
  //   if (query) {
  //     const filteredUsers = availableUsers.filter(
  //       (user) =>
  //         user.name.toLowerCase().includes(query) &&
  //         !members.some((member) => member._id === user._id)
  //     );
  //     setSearchResults(filteredUsers);
  //   } else {
  //     setSearchResults([]);
  //   }
  // };
  // const handleSearch = (event) => {
  //   const query = event.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   if (query) {
  //     const filteredUsers = availableUsers
  //       .filter(
  //         (user) =>
  //           user.name.toLowerCase().includes(query) &&
  //           !members.some((member) => member._id === user._id)
  //       )
  //       // Use a Map to filter out duplicate users based on _id
  //       .reduce((acc, current) => {
  //         if (!acc.find((user) => user._id === current._id)) {
  //           acc.push(current);
  //         }
  //         return acc;
  //       }, []);

  //     setSearchResults(filteredUsers);
  //   } else {
  //     setSearchResults([]);
  //   }
  // };

  const handleSearch = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      try {
        const response = await fetch(
          `${BASE_URL}/api/data/members?query=${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }

        const data = await response.json();
        const filteredUsers = data.data.filter((user) => {
          const userNameLower = user.name.toLowerCase();
          return query === userNameLower || userNameLower.startsWith(query);
        });

        // Ensure no duplicate members are added
        const uniqueFilteredUsers = filteredUsers.reduce((acc, current) => {
          if (!acc.find((user) => user._id === current._id)) {
            acc.push(current);
          }
          return acc;
        }, []);

        setSearchResults(uniqueFilteredUsers);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const addMember = (user) => {
    setMembers([...members, user]); // Store the user object including the ID
    setSearchResults(searchResults.filter((u) => u._id !== user._id)); // Remove the added user from the search results
    setSearchQuery(""); // Clear the search query
  };

  const removeMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  // const handleSave = async () => {

  //   const memberIds = members.map((member) => member._id);
  //   const jsonPayload = {
  //     documentRepository: selectedOptions["attributeOption"],
  //     documentName: selectedOptions["documentOption"],
  //     members: memberIds,
  //   };

  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/api/data/policyManagerPermissions`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(jsonPayload),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to save members");
  //     }

  //     const data = await response.json();
  //     console.log("Successfully saved:", data);

  //     setSuccessMessage("Permissions saved successfully!");
  //     setIsSuccessModalOpen(true);

  //     setTimeout(() => {
  //       setIsSuccessModalOpen(false);
  //       setShowEditMembership(false);
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error saving members:", error);
  //   }
  // };

  const handleSave = async () => {
    // Check for missing fields
    if (!selectedOptions["attributeOption"]) {
      setErrorMessage("Document Repository is required.");
      return;
    }

    if (!selectedOptions["documentOption"]) {
      setErrorMessage("Document Name is required.");
      return;
    }

    if (members.length === 0) {
      setErrorMessage("At least one member must be selected.");
      return;
    }

    const memberIds = members.map((member) => member._id);
    const jsonPayload = {
      documentRepository: selectedOptions["attributeOption"],
      documentName: selectedOptions["documentOption"],
      members: memberIds,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerPermissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(jsonPayload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save members");
      }

      const data = await response.json();
      console.log("Successfully saved:", data);

      setSuccessMessage("Permissions saved successfully!");
      setIsSuccessModalOpen(true);

      setTimeout(() => {
        setIsSuccessModalOpen(false);
        setShowEditMembership(false);
      }, 2000);
    } catch (error) {
      console.error("Error saving members:", error);
      setErrorMessage("Failed to save permissions. Please try again.");
    }
  };

  const toggleMembership = () => {
    setShowMembership(!showMembership);
  };

  const toggleeditMembership = () => {
    setShowEditMembership(!showEditMembership);
  };

  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  // const handleOptionClick = (dropdownId, option) => {
  //   setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
  //   setOpenDropdown(null);
  // };

  const handleOptionClick = (key, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [key]: option,
    }));
    setOpenDropdown(null);
    fetchMembers(option);
  };

  const fetchMembers = () => {
    const selectedRepository = selectedOptions["attributeOption"];
    const selectedDocument = selectedOptions["documentOption"];

    console.log(selectedRepository, "selectedRepository");
    console.log(selectedDocument, "selectedDocument");

    // Ensure data is available and is an array
    const dataArray = data?.data || [];

    if (selectedRepository && selectedDocument && Array.isArray(dataArray)) {
      const matchingItem = dataArray.find(
        (item) =>
          item.documentRepository.trim().toLowerCase() ===
            selectedRepository.trim().toLowerCase() &&
          item.documentName.trim().toLowerCase() ===
            selectedDocument.trim().toLowerCase()
      );

      if (
        matchingItem &&
        matchingItem.members &&
        matchingItem.members.length > 0
      ) {
        setMembers(matchingItem.members);
      } else {
        setMembers([]); // No matching item or no members
      }
    }
  };

  console.log(members, "members");

  const handleGroupMembershipOpen = () => {
    setGroupMembershipOpen(true);
  };

  const handleEditPermissionsOpen = () => {
    setEditPermissionsOpen(true);
  };

  const data = {
    attributeOption: ["item1", "item2", "item3"],
    documentOption: ["item1", "item2", "item3"],
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
                      options={data.documentOption || []}
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
                      {members.length > 0 && showMembership && (
                        <div className="modal">
                          <h3>{members.length} Members</h3>
                          {members.map((member) => (
                            <div key={member._id}>
                              <p>{member.name}</p>
                              <p>{member.email}</p>
                            </div>
                          ))}
                        </div>
                      )}

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
                                {members.length} Members
                              </span>
                            </div>

                            {members.map((member, index) => (
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
                                      {member.name}
                                    </span>
                                    <span className="text-gray-400 text-sm font-poppins font-normal">
                                      Member{" "}
                                      <FontAwesomeIcon icon={faAngleDown} />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
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
                        <>
                          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                            <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
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
                                {members.map((member, index) => (
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
                                          {member.name}
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
                                      onClick={() => removeMember(index)}
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
                                ))}

                                {/* Divider */}
                                <div className="border-t border-gray-600"></div>

                                <div className="flex items-center justify-between bg-[#1B1E26] border border-[#31B47633] rounded-[5px] p-3">
                                  <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Add new member"
                                    className="bg-transparent text-white placeholder-gray-400 w-full outline-none"
                                  />
                                  <FontAwesomeIcon
                                    className="text-[#31B476]"
                                    icon={faSearch}
                                  />
                                </div>

                                {/* {searchResults.length > 0 && (
                                  <div>
                                    {searchResults.map((user, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between bg-[#1B1E26] border border-[#31B476] rounded-[5px] p-3 mt-2"
                                      >
                                        <div className="flex items-center">
                                          <img
                                            src={userIcon}
                                            className="text-[#31B476]"
                                            style={{
                                              width: "29px",
                                              height: "29px",
                                            }}
                                          />
                                          <span className="ml-3 text-white font-poppins font-semibold text-sm">
                                            {user.name}
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
                                          onClick={() => addMember(user)}
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
                                                ? faPlus
                                                : faPlus
                                            }
                                          />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )} */}
                                {searchResults.length > 0 && (
                                  <div>
                                    {searchResults.map((user) => (
                                      <div
                                        key={user._id}
                                        className="flex items-center justify-between bg-[#1B1E26] border border-[#31B476] rounded-[5px] p-3 mt-2"
                                      >
                                        <div className="flex items-center">
                                          <img
                                            src={userIcon}
                                            className="text-[#31B476]"
                                            style={{
                                              width: "29px",
                                              height: "29px",
                                            }}
                                            alt="User Icon"
                                          />
                                          <span className="ml-3 text-white font-poppins font-semibold text-sm">
                                            {user.name}
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
                                          onClick={() => addMember(user)}
                                          onMouseEnter={() =>
                                            setHoveredAddIndex(user._id)
                                          }
                                          onMouseLeave={() =>
                                            setHoveredAddIndex(null)
                                          }
                                          title="Add Member"
                                        >
                                          <FontAwesomeIcon
                                            icon={faPlus}
                                            className={`transition-transform duration-300 ${
                                              hoveredAddIndex === user._id
                                                ? "text-green-500"
                                                : "text-green-400"
                                            }`}
                                          />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {errorMessage && (
                                  <div className="text-red-500 mb-4">
                                    {errorMessage}
                                  </div>
                                )}

                                {/* Footer Buttons */}
                                <div className="flex justify-end gap-4 mt-4 group">
                                  <button
                                    onClick={handleSave}
                                    className="flex items-center bg-[#1B1E26] hover:bg-[#31E48F] text-white px-4 py-2 rounded-lg group-hover:text-white"
                                  >
                                    <img
                                      src={iconsmodel}
                                      alt="iconsmodel"
                                      className="mr-2 btn-icon"
                                    />
                                    <span> Save</span>
                                  </button>
                                  <button
                                    onClick={toggleeditMembership}
                                    className="text-gray-400"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {isSuccessModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 max-h-[50vh] overflow-y-auto">
                            <h2 className="text-xl font-poppins font-semibold mb-4 text-center text-gray-800">
                              {successMessage.includes("Failed")
                                ? "Failed"
                                : "Success"}
                            </h2>
                            <p
                              className={
                                successMessage.includes("Failed")
                                  ? "text-red-500 text-center"
                                  : "text-green-500 text-center"
                              }
                            >
                              {successMessage}
                            </p>
                            <div className="flex justify-end mt-4">
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out"
                                onClick={() => setIsSuccessModalOpen(false)}
                              >
                                OK
                              </button>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <table className="min-w-full bg-black text-white">
        <thead>
          <tr>
            <th className="pl-4 py-2">Document Repository</th>
            <th className="px-4 py-2">Document Name</th>
            <th className="px-4 py-2">Members</th>
          </tr>
        </thead>
        <tbody>
          {savedData.map((data, index) => (
            <tr key={index}>
              {/* Repository Dropdown */}
              <td className="px-4 py-6 border border-customBorderColor bg-[#000000]">
                {data.documentRepository}
              </td>

              {/* Document Dropdown */}
              <td className="px-4 py-6 border border-customBorderColor bg-[#000000]">
                {data.documentName}
              </td>

              {/* Members Column */}
              <td className="px-4 py-6 border border-customBorderColor bg-[#000000]">
                <div>
                  {Array.isArray(data.members) && data.members.length > 0 ? (
                    <div>
                      {data.members.map((member, memberIndex) => (
                        <div
                          key={memberIndex}
                          className="flex  items-center mb-4"
                        >
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
                              {member.name}
                            </span>
                            <span className="text-gray-400 text-sm font-poppins font-normal">
                              Member <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                          </div>
                          {/* <span>{member.name}</span> -{" "}
                          <span>{member.email}</span> */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>No Members</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PermissionsTab;
