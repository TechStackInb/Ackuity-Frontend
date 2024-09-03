import {
  faDownload,
  faEdit,
  faEraser,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import "../css/style.css";
import CustomDropdown from "../components/CustomDropdown";
import Modal from "../components/Model";
import PrivacyCustomDropdown from "../components/PrivacyCustomDropdown";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../services/api";

const AttributeFilteringTab = ({ handleSavePolicy }) => {
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sections, setSections] = useState([{ id: Date.now(), values: {} }]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);
  const [policyName, setPolicyName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Function to fetch policies
  const fetchPolicies = async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerAttribute?page=${page}&limit=10`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch policies");
      }

      const data = await response.json();
      setPolicies(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  // Call fetchPolicies after saving policy and also on component mount
  useEffect(() => {
    fetchPolicies(currentPage);
  }, [currentPage]);

  // const handlePolicyNameChange = (event) => {
  //   setPolicyName(event.target.value.trim());
  // };

  const handlePolicyNameChange = (e) => {
    setPolicyName(e.target.value);
  };

  const openEditModal = (policyId) => {
    // Find the policy with the given ID
    const policyToEdit = policies.find((policy) => policy._id === policyId);

    if (policyToEdit) {
      setPolicyName(policyToEdit.policyName);
      setSelectedOptions({
        documentStore: policyToEdit.documentStoreOptions,
        documentLocationOptions: policyToEdit.documentLocationOptions,
      });

      setSections([
        {
          id: Date.now(),
          values: {
            documentOptions: policyToEdit.documentOptions,
            containsOptions: policyToEdit.containsOptions,
            withOptions: policyToEdit.withOptions,
            thenOptions: policyToEdit.thenOptions,
            roleOptions: policyToEdit.roleOptions,
            atOptions: policyToEdit.atOptions,
          },
        },
      ]);

      setIsEditMode(true);
      setEditingPolicyId(policyId);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdatePolicy = async () => {
    const trimmedPolicyName = policyName.trim();
    // Prepare the data to post
    const policyData = {
      policyName: trimmedPolicyName,
      documentStoreOptions: selectedOptions["documentStore"] || "",
      documentLocationOptions: selectedOptions["documentLocationOptions"] || "",
      documentOptions:
        sections
          .map((section) => section.values["documentOptions"])
          .join(", ") || "",
      containsOptions:
        sections
          .map((section) => section.values["containsOptions"])
          .join(", ") || "",
      withOptions:
        sections.map((section) => section.values["withOptions"]).join(", ") ||
        "",
      thenOptions:
        sections.map((section) => section.values["thenOptions"]).join(", ") ||
        "",
      roleOptions:
        sections.map((section) => section.values["roleOptions"]).join(", ") ||
        "",
      atOptions:
        sections.map((section) => section.values["atOptions"]).join(", ") || "",
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerAttribute/${editingPolicyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(policyData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Policy updated successfully:", result);

      setIsSaveSuccessful(true);

      // Fetch updated policies after successful update
      await fetchPolicies(currentPage);

      setTimeout(() => {
        setIsSaveSuccessful(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error updating policy:", error);
    }
  };

  const handleDeletePolicy = async (policyId) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      try {
        const response = await fetch(
          `${BASE_URL}/api/data/policyManagerAttribute/${policyId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Policy deleted successfully:", result);

        // Fetch updated policies after successful delete
        await fetchPolicies(currentPage);
      } catch (error) {
        console.error("Error deleting policy:", error);
      }
    }
  };

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
    setOpenDropdown(null);
  };

  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleOptionClick = (dropdownId, option) => {
    setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
    setOpenDropdown(null);
  };

  const datas = {
    documentStoreOptions: ["Document Store", "Share Point", "One Drive"],
    documentLocationOptions: [
      "Document Location",
      "Another Option",
      "Another Option",
    ],
    documentOptions: ["Document1", "Document2", "Document3", "Document4"],
    containsOptions: ["Document Classification", "Location", "Division"],
    withOptions: ["Confidential", "Private", "Public"],
    thenOptions: ["Anonymize", "Tokenize", "Encrypt", "De-identification"],
    roleOptions: ["Role1", "Role2", "Role3", "Role4"],
    atOptions: ["All times", "One Day", "One Week", "All Month"],
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setIsEditModalOpen(false);
    setEditingPolicyId(null);
    setPolicyName("");
    // setSelectedOptions({});
    // setSections([{ id: Date.now(), values: {} }]);
  };

  const confirmSavePolicy = async () => {
    try {
      const trimmedPolicyName = policyName.trim();
      // Iterate over each section to save as a separate policy
      for (const section of sections) {
        const policyData = {
          policyName: trimmedPolicyName,
          documentStoreOptions: selectedOptions["documentStore"] || "",
          documentLocationOptions:
            selectedOptions["documentLocationOptions"] || "",
          documentOptions: section.values["documentOptions"] || "",
          containsOptions: section.values["containsOptions"] || "",
          withOptions: section.values["withOptions"] || "",
          thenOptions: section.values["thenOptions"] || "",
          roleOptions: section.values["roleOptions"] || "",
          atOptions: section.values["atOptions"] || "",
        };

        const response = await fetch(
          `${BASE_URL}/api/data/policyManagerAttribute`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(policyData),
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Policy saved successfully:", result);
      }

      setIsSaveSuccessful(true);

      // Clear all dropdown selections and sections
      setSections([{ id: Date.now(), values: {} }]);
      setSelectedOptions({});
      setPolicyName("");

      // Fetch updated policies after successful save
      await fetchPolicies();

      // Automatically close modal after 2 seconds
      setTimeout(() => {
        setIsSaveSuccessful(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error saving policies:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDownloadPolicy = (policyId) => {
    const policy = policies.find((p) => p._id === policyId);

    if (!policy) {
      console.error("Policy not found");
      return;
    }

    const blob = new Blob([JSON.stringify(policy, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${policy.policyName || "policy"}.json`;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* <div className="bg-dropdownBackground p-4 shadow-md rounded-t-lg">
        <div className="flex flex-col space-y-4">
          <h2 className="text-[#31E48F] text-lg font-poppins font-semibold px-4">
            New Selector
          </h2>
        </div>
      </div> */}
      <div className="bg-customBlack p-4 shadow-md">
        <div className="page-center">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap px-4 justify-between">
              <div className="flex flex-col basis-full sm:basis-[49.333333%]">
                <label className="text-customGreen font-poppins font-semibold text-sm mb-4">
                  Document Store
                </label>
                <PrivacyCustomDropdown
                  options={datas.documentStoreOptions || []}
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
                  options={datas.documentLocationOptions || []}
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
                      options={datas.documentOptions || []}
                      placeholder="Select Document"
                      isOpen={openDropdown === `${section.id}-0`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 0)
                      }
                      selectedOption={section.values["documentOptions"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(
                          section.id,
                          "documentOptions",
                          value
                        )
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
                      options={datas.containsOptions || []}
                      placeholder="Select Contains"
                      isOpen={openDropdown === `${section.id}-1`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 1)
                      }
                      selectedOption={section.values["containsOptions"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(
                          section.id,
                          "containsOptions",
                          value
                        )
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
                      options={datas.withOptions || []}
                      placeholder="Select With"
                      isOpen={openDropdown === `${section.id}-2`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 2)
                      }
                      selectedOption={section.values["withOptions"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "withOptions", value)
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
                      options={datas.thenOptions || []}
                      placeholder="Select Then"
                      isOpen={openDropdown === `${section.id}-3`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 3)
                      }
                      selectedOption={section.values["thenOptions"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "thenOptions", value)
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
                      options={datas.roleOptions || []}
                      placeholder="Select Role"
                      isOpen={openDropdown === `${section.id}-4`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 4)
                      }
                      selectedOption={section.values["roleOptions"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "roleOptions", value)
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
                      options={datas.atOptions || []}
                      placeholder="Select At"
                      isOpen={openDropdown === `${section.id}-5`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 5)
                      }
                      selectedOption={section.values["atOptions"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "atOptions", value)
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
        onClick={openModal}
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
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-lg font-poppins font-semibold mb-4 text-center ">
              Confirm Policy Save
            </h2>
            {isSaveSuccessful ? (
              <p className="text-green-500 text-center">
                Policy saved successfully!
              </p>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="policyName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Policy Name
                  </label>
                  <input
                    type="text"
                    id="policyName"
                    value={policyName}
                    onChange={handlePolicyNameChange}
                    className="w-full rounded-md shadow-sm px-2.5 py-2.5 border-2 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter policy name"
                  />
                </div>
                <div className="mb-4">
                  <p className="text-sm mb-2">
                    <strong>Selected Options:</strong>
                  </p>
                  <ul>
                    <li>
                      <strong>Document Store:</strong>{" "}
                      {selectedOptions["documentStore"]}
                    </li>
                    <li>
                      <strong>Document Location:</strong>{" "}
                      {selectedOptions["documentLocationOptions"]}
                    </li>
                    {sections.map((section) => (
                      <li key={section.id}>
                        <div>
                          <strong>Document:</strong>{" "}
                          {section.values["documentOptions"]}
                        </div>
                        <div>
                          <strong>Contains:</strong>{" "}
                          {section.values["containsOptions"]}
                        </div>
                        <div>
                          <strong>With:</strong> {section.values["withOptions"]}
                        </div>
                        <div>
                          <strong>Action:</strong>{" "}
                          {section.values["thenOptions"]}
                        </div>
                        <div>
                          <strong>Role:</strong> {section.values["roleOptions"]}
                        </div>
                        <div>
                          <strong>At:</strong> {section.values["atOptions"]}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    onClick={confirmSavePolicy}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )} */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-poppins font-semibold mb-4 text-center text-gray-800">
              Confirm Policy Save
            </h2>
            {isSaveSuccessful ? (
              <p className="text-green-500 text-center">
                Policy saved successfully!
              </p>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="policyName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Policy Name
                  </label>
                  <input
                    type="text"
                    id="policyName"
                    value={policyName}
                    onChange={handlePolicyNameChange}
                    className="w-full rounded-md shadow-sm px-2.5 py-2.5 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-200 ease-in-out"
                    placeholder="Enter policy name"
                  />
                </div>
                <div className="mb-4">
                  <p className="text-sm mb-2 text-gray-700">
                    <strong>Selected Options:</strong>
                  </p>
                  <ul>
                    <li className="mb-4">
                      <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        <p>
                          <strong>Document Store:</strong>{" "}
                          {selectedOptions["documentStore"]}
                        </p>
                        <p>
                          <strong>Document Location:</strong>{" "}
                          {selectedOptions["documentLocationOptions"]}
                        </p>
                      </div>
                    </li>
                    {sections.map((section) => (
                      <li key={section.id} className="mb-4">
                        <div className="bg-gray-100 p-4 rounded-md shadow-md">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-700">
                              {/* Section {section.id} */}
                            </h3>
                            {/* Optional: Add an icon or collapse button */}
                          </div>
                          <div>
                            <strong>Document:</strong>{" "}
                            {section.values["documentOptions"]}
                          </div>
                          <div>
                            <strong>Contains:</strong>{" "}
                            {section.values["containsOptions"]}
                          </div>
                          <div>
                            <strong>With:</strong>{" "}
                            {section.values["withOptions"]}
                          </div>
                          <div>
                            <strong>Action:</strong>{" "}
                            {section.values["thenOptions"]}
                          </div>
                          <div>
                            <strong>Role:</strong>{" "}
                            {section.values["roleOptions"]}
                          </div>
                          <div>
                            <strong>At:</strong> {section.values["atOptions"]}
                          </div>
                          {/* Line separator */}
                          {/* <div className="mt-2">
                            <hr className="border-t border-gray-300" />
                          </div> */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2 transition-all duration-200 ease-in-out"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out"
                    onClick={confirmSavePolicy}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
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
                {policies.map((policy) => (
                  <tr key={policy._id}>
                    <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                      {policy.policyName}
                    </td>
                    <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                      {policy.documentStoreOptions}
                    </td>
                    <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                      {policy.documentLocationOptions}
                    </td>
                    <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                      {policy.documentOptions}
                    </td>

                    <td className="px-4 py-2 border border-customBorderColor bg-customTablebG">
                      <div className="flex items-center justify-between gap-[2px]">
                        <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                            onClick={() => openEditModal(policy._id)}
                          />
                        </button>
                        <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                          <FontAwesomeIcon
                            icon={faDownload}
                            className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                            onClick={() => handleDownloadPolicy(policy._id)}
                          />
                        </button>
                        <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                            onClick={() => handleDeletePolicy(policy._id)}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#373945] p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-lg font-poppins font-semibold mb-4 text-center text-white">
              {isEditMode ? "Edit Policy" : "Confirm Policy Save"}
            </h2>
            {isSaveSuccessful ? (
              <p className="text-green-500 text-center">
                Policy updated successfully!
              </p>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="policyName"
                    className="block text-sm font-poppins font-semibold  mb-2 text-customGreen"
                  >
                    Policy Name
                  </label>
                  <input
                    type="text"
                    id="policyName"
                    value={policyName}
                    onChange={handlePolicyNameChange}
                    className="w-full rounded-md shadow-sm px-2.5 py-2.5 border-2 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-black text-white font-semibold placeholder-gray-500"
                    placeholder="Enter policy name"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-customGreen font-poppins font-semibold text-sm mb-2">
                    Document Store
                  </label>
                  <PrivacyCustomDropdown
                    options={datas.documentStoreOptions || []}
                    placeholder="Select Document Store"
                    isOpen={openDropdown === "documentStore"}
                    onDropdownClick={() => handleDropdownClick("documentStore")}
                    selectedOption={selectedOptions["documentStore"]}
                    onOptionClick={(option) =>
                      handleOptionClick("documentStore", option)
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-customGreen font-poppins font-semibold text-sm mb-2">
                    Document Location
                  </label>
                  <PrivacyCustomDropdown
                    options={datas.documentLocationOptions || []}
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
                {sections.map((section, sectionIndex) => (
                  <div key={section.id} className="flex flex-col">
                    <label className="text-customGreen font-poppins font-semibold text-sm mb-2">
                      Document Name
                    </label>
                    <CustomDropdown
                      options={datas.documentOptions || []}
                      placeholder="Select Document"
                      isOpen={openDropdown === `${section.id}-0`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 0)
                      }
                      selectedOption={section.values["documentOptions"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(
                          section.id,
                          "documentOptions",
                          value
                        )
                      }
                    />
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    onClick={
                      isEditMode ? handleUpdatePolicy : confirmSavePolicy
                    }
                  >
                    {isEditMode ? "Update Policy" : "Confirm"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2 bg-gray-100 rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttributeFilteringTab;
