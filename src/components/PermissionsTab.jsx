import React, { useContext, useEffect, useState } from "react";
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
  faEraser,
  faSpinner,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import userIcon from "../assets/usericon.svg";
import iconsmodel from "../assets/save.svg";
import { BASE_URL } from "../services/api";
import CustomDropdown from "./CustomDropdown";
import CustomDropdwonPermisson from "./CustomDropdwonPermisson";
import { PolicyContext } from "../contexts/PolicyProvider";

function PermissionsTab() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showMembership, setShowMembership] = useState(false);
  const [showEditMembership, setShowEditMembership] = useState(false);
  const [hoveredAddIndex, setHoveredAddIndex] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [savedData, setSavedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const [sections, setSections] = useState([{ id: Date.now(), values: {} }]);

  const [loading, setLoading] = useState(false);

  const { sections, setSections } = useContext(PolicyContext);

  const [activeSectionIndex, setActiveSectionIndex] = useState(null);


  const addSection = () => {
    if (sections.length < 10) {
      const newSection = {
        id: Date.now() + sections.length + 1,
        values: {
          documentStore: "",
          documentLocation: "",
          documentName: "",
        },
        members: [],
      };
      setSections([...sections, newSection]);
    }
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const clearSection = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, values: {}, members: [] } : section
      )
    );
  };

  console.log(sections, "sections");

  const removeMember = (user, sectionIndex) => {
    console.log("User object received:", user); 
    if (!user || !user.id) {
      console.error("Invalid user object:", user);
      return; 
    }

    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[sectionIndex].members = updatedSections[
        sectionIndex
      ].members.filter((member) => member.id !== user.id);
      return updatedSections;
    });
  };


  const handleDropdownChange = (sectionId, fieldName, value) => {
    setErrorMessage("");

    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          values: {
            ...section.values,
            [fieldName]: value,
          },
        };
      }
      return section;
    });

    setSections(updatedSections);
  };



  const handleDropdownClick1 = (sectionId, index) => {
    setOpenDropdown(
      openDropdown === `${sectionId}-${index}` ? null : `${sectionId}-${index}`
    );
  };




  const handleSearch = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      try {
        const response = await fetch(
          `${BASE_URL}/api/data/members?query=${query}&page=${currentPage}&limit=100`,
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

 
        if (data.totalPages) {
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const addMember = (user, sectionIndex) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      const sectionMembers = updatedSections[sectionIndex].members;

      const memberExists = sectionMembers.some(
        (member) => member._id === user._id
      );

      if (!memberExists) {
        const newUser = { ...user, id: user._id || Date.now() }; 
        updatedSections[sectionIndex].members.push(newUser);
      }

      return updatedSections;
    });

    setSearchQuery(""); 
  };


  const fetchPolicies = async () => {
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
      console.log(data, "data");
      setSavedData(data.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const selectedSection = sections[activeSectionIndex];

      const originalPermissionsMembers = [
        "66ed58a0cecc698293bf9680",
        "66ed586bcecc698293bf967e",
      ];
      const revisedPermissionsMembers = selectedSection.members.map(
        (member) => member._id
      );

      const jsonPayload = {
        documentStore: selectedSection.values.documentStore,
        documentLocation: selectedSection.values.documentLocation,
        documentName: selectedSection.values.documentName,
        originalPermissionsMembers,
        revisedPermissionsMembers,
      };

      // console.log(jsonPayload, "jsonPayload");

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
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save members");
      }

      const data = await response.json();
      console.log("Successfully saved:", data);

      setSuccessMessage("Permissions saved successfully!");
      setIsSuccessModalOpen(true);
      setShowEditMembership(false);
      setErrorMessage("");

      await fetchPolicies();

      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error saving members:", error);
      setErrorMessage(
        error.message || "An error occurred while saving members."
      );
    } finally {
      setLoading(false);
    }
  };

  const deletePolicy = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerPermissions/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the policy");
      }


      fetchPolicies(); 
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };
  
  const toggleMemberships = () => {
    setShowMembership(!showMembership);
  };


  const toggleEditMembership = (index) => {
    if (activeSectionIndex === index) {
      setShowEditMembership(!showEditMembership); 
    } else {
      setActiveSectionIndex(index);
      setShowEditMembership(true); 
    }
  };



  const data = {
    documentStore: ["Document Store", "Share Point", "One Drive"],
    documentLocation: [
      "http://acmecorp.sharepoint.com/sites/operations",
      "http://acmecorp.sharepoint.com/sites/marketing",
      "http://acmecorp.sharepoint.com/sites/sales",
    ],
    documentName: [
      "Document1",
      "Document2",
      "Document3",
      "Document4",
      "Document5",
    ],
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
                    Document Store
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-[#000000] text-[#31E48F] font-poppins font-semibold">
                    Document location
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
                {sections.map((section, index) => (
                  <tr key={section.id}>
                    <td
                      className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px] "
                      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
                    >
                      <CustomDropdwonPermisson
                        options={data.documentStore || []}
                        placeholder="Select Document Store"
                        isOpen={openDropdown === `${section.id}-0`}
                        onDropdownClick={() =>
                          handleDropdownClick1(section.id, 0)
                        }
                        selectedOption={section.values.documentStore || ""}
                        setSelectedOption={(value) =>
                          handleDropdownChange(
                            section.id,
                            "documentStore",
                            value
                          )
                        }
                      />
                    </td>
                    <td
                      className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[750px] md:w-[600px] sm:w-[450px] "
                      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
                    >
                      <CustomDropdwonPermisson
                        options={data.documentLocation || []}
                        placeholder="Select Document Location"
                        isOpen={openDropdown === `${section.id}-1`}
                        onDropdownClick={() =>
                          handleDropdownClick1(section.id, 1)
                        }
                        selectedOption={section.values.documentLocation || ""}
                        setSelectedOption={(value) =>
                          handleDropdownChange(
                            section.id,
                            "documentLocation",
                            value
                          )
                        }
                      />
                    </td>
                    <td
                      className="px-4  border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[200px] md:w-[180px] sm:w-[150px]"
                      // width={"200px"}
                      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
                    >
                      <CustomDropdwonPermisson
                        options={data.documentName || []}
                        placeholder="Select Document"
                        isOpen={openDropdown === `${section.id}-2`}
                        onDropdownClick={() =>
                          handleDropdownClick1(section.id, 2)
                        }
                        selectedOption={section.values.documentName || ""}
                        setSelectedOption={(value) =>
                          handleDropdownChange(
                            section.id,
                            "documentName",
                            value
                          )
                        }
                      />
                    </td>
                    <td
                      className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]"
                      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
                    >
                      <div className="relative">
                        <div className="flex  flex-col items-start">
                          <div className="flex flex-col">
                            {/* <span className="font-poppins text-base">
                              Everyone System
                            </span> */}
                            <span className="text-white block text-base font-poppins font-semibold">
                              Vinod@mail.com
                            </span>
                            <span className="text-white block text-base font-poppins font-semibold">
                              Rajat@gmail.com
                            </span>
                          </div>
                          <div className="flex">
                            <button onClick={toggleMemberships}>
                              <ThreeDotsButton />
                            </button>
                          </div>
                        </div>

                        {showMembership && (
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
                                    onClick={toggleMemberships}
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
                                  <div className="flex justify-between items-center mb-4">
                                    <span className="text-white text-sm font-poppins font-medium">
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
                                          Vinod Vasudevan
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
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td
                      className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]"
                      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
                    >
                      <div className="relative">
                        <div>
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                              {/* <span className="font-poppins text-base">
                                Everyone System
                              </span> */}
                              {(section.members || []).map(
                                (member, memberIndex) => (
                                  <div
                                    key={memberIndex}
                                    className="flex justify-between items-center mb-4"
                                  >
                                    <span className="font-poppins text-base">
                                      {member.email}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="flex">
                              <button
                                onClick={() => toggleEditMembership(index)}
                                className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="transition ease-out duration-300 hover:transform hover:scale-110 "
                                />
                              </button>
                            </div>
                          </div>

                          {activeSectionIndex === index &&
                            showEditMembership && (
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
                                        onClick={() =>
                                          toggleEditMembership(index)
                                        } // Close modal for this section
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
                                      {section.members.map(
                                        (member, memberIndex) => (
                                          <div
                                            key={memberIndex}
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
                                              <div className="flex flex-col ml-3 text-left">
                                                <span className="text-white block text-base font-poppins font-semibold">
                                                  {member.name}
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
                                              onClick={() =>
                                                removeMember(
                                                  member,
                                                  activeSectionIndex
                                                )
                                              }
                                            >
                                              <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                          </div>
                                        )
                                      )}
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
                                      {searchResults.map((user, userIndex) => (
                                        <div
                                          key={user.id}
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
                                            onClick={() =>
                                              addMember(
                                                user,
                                                activeSectionIndex
                                              )
                                            }
                                            onMouseEnter={() =>
                                              setHoveredAddIndex(userIndex)
                                            }
                                            onMouseLeave={() =>
                                              setHoveredAddIndex(null)
                                            }
                                          >
                                            <FontAwesomeIcon icon={faPlus} />
                                          </button>
                                        </div>
                                      ))}

                                      {errorMessage && (
                                        <div className="text-red-500 mb-4">
                                          {errorMessage}
                                        </div>
                                      )}
                                      <div className="flex justify-end gap-4 mt-4 group">
                                        <button
                                          onClick={handleSave}
                                          className="flex items-center bg-[#1B1E26] hover:bg-[#31E48F] text-white px-4 py-2 rounded-lg group-hover:text-white"
                                          disabled={loading} 
                                        >
                                          {loading ? (
                                            <FontAwesomeIcon
                                              icon={faSpinner}
                                              spin
                                              className="mr-2"
                                            />
                                          ) : (
                                            <img
                                              src={iconsmodel}
                                              alt="iconsmodel"
                                              className="mr-2 btn-icon"
                                            />
                                          )}
                                          <span>
                                            {loading ? "Saving..." : "Save"}
                                          </span>
                                        </button>
                                        <button
                                          onClick={() =>
                                            toggleEditMembership(index)
                                          }
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
                        </div>

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
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="relative">
                      <div
                        className="absolute bottom-0 right-0 flex justify-end gap-2 min-w-[100px] ifmarginleft"
                        style={{ marginRight: "17px" }}
                      >
                        <div className="flex gap-2">
                          {sections.length === 1 ? (
                            <button
                              className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black"
                              onClick={() => clearSection(section.id)}
                            >
                              <FontAwesomeIcon
                                className="transition ease-out duration-300 hover:transform hover:scale-110 w-5 h-5"
                                icon={faEraser}
                              />
                            </button>
                          ) : (
                            <button
                              className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black"
                              onClick={() => removeSection(section.id)}
                            >
                              <FontAwesomeIcon
                                className="transition ease-out duration-300 hover:transform hover:scale-110 w-5 h-5"
                                icon={faTrash}
                              />
                            </button>
                          )}

                          {sections.length < 10 && (
                            <div className="flex gap-2">
                              <button
                                className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black"
                                onClick={addSection}
                              >
                                <FontAwesomeIcon
                                  className="transition ease-out duration-300 hover:transform hover:scale-110 w-5 h-5"
                                  icon={faPlus}
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {savedData.map((policy) => (
                  <tr key={policy._id} className="hover:bg-gray-100">
                    <td className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px] ">
                      {policy.documentStore}
                    </td>
                    <td className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px] ">
                      {policy.documentLocation}
                    </td>
                    <td className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px] ">
                      {policy.documentName}
                    </td>

                    <td
                      className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]"
                      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
                    >
                      <div className="relative">
                        <div className="flex  flex-col items-start">
                          <div className="flex flex-col">
                            {/* <span className="font-poppins text-base">
                              Everyone System
                            </span> */}
                            <span className="text-white block text-base font-poppins font-semibold">
                              Vinod@mail.com
                            </span>
                            <span className="text-white block text-base font-poppins font-semibold">
                              Rajat@gmail.com
                            </span>
                          </div>
                          <div className="flex">
                            <button onClick={toggleMemberships}>
                              <ThreeDotsButton />
                            </button>
                          </div>
                        </div>

                        {showMembership && (
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
                                    onClick={toggleMemberships}
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
                                  <div className="flex justify-between items-center mb-4">
                                    <span className="text-white text-sm font-poppins font-medium">
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
                                          Vinod Vasudevan
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
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px]">
                      {policy.revisedPermissionsMembers.length > 0 ? (
                        policy.revisedPermissionsMembers.map((member) => (
                          <div key={member._id}>
                            {member.name} ({member.email})
                          </div>
                        ))
                      ) : (
                        <span>No revised members</span>
                      )}
                      {/* 
                      <button
                        onClick={() => deletePolicy(policy._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button> */}

                      {/* <button
                        className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black "
                        onClick={() => deletePolicy(policy._id)}
                      >
                        <FontAwesomeIcon
                          className="transition ease-out duration-300 hover:transform hover:scale-110 w-5 h-5"
                          icon={faTrash}
                        />
                      </button> */}
                    </td>

                    <td className="relative">
                      <div
                        className="absolute bottom-0 right-0 flex justify-end gap-2 min-w-[100px] ifmarginleft"
                        style={{ marginRight: "17px" }}
                      >
                        <div className="flex gap-2">
                          <button
                            className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black"
                            onClick={() => deletePolicy(policy._id)}
                          >
                            <FontAwesomeIcon
                              className="transition ease-out duration-300 hover:transform hover:scale-110 w-5 h-5"
                              icon={faTrash}
                            />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default PermissionsTab;
