import React, { useEffect, useState } from "react";
import "./../App.css";
import CustomDropdown from "../components/CustomDropdown";
import {
  faDownload,
  faEdit,
  faEraser,
  faMinus,
  faPlus,
  faPlusMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../components/Dropdown";
import PrivacyCustomDropdown from "../components/PrivacyCustomDropdown";
import Modal from "../components/Model";

import { BASE_URL } from "../services/api";
import axios from "axios";

const FunctionCalling = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [sections, setSections] = useState([{ id: Date.now(), values: {} }]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isSectionVisible, setSectionVisible] = useState(sections.length > 0);

  const [isContentVisible, setContentVisible] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to hold fetched data
  const [tableData, setTableData] = useState([]);

  const [description, setDescription] = useState("");
  const [dataFields, setDataFields] = useState({
    "Opportunity Name": false,
    "Lead Source": false,
    Close_Date: false,
    "Account Name": false,
    Amount: false,
    Age: false,
    Type: false,
    Probability: false,
    Created_Date: false,
  });
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);
  const [policyName, setPolicyName] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [policyId, setPolicyId] = useState(null);

  // State for managing selected items for spans and checkboxes
  const [checkboxSelections, setCheckboxSelections] = useState([
    { label: "Sales NA", isChecked: false },
    { label: "Management", isChecked: false },
  ]);

  const [actionOnDataField, setActionOnDataField] = useState("Account");
  const [actionOnPermission, setActionOnPermission] = useState("ReadOrWrite");
  const [actionOnPermissionExisting, setActionOnPermissionExisting] =
    useState("Management");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerFunctionCalling`,
        {
          method: "GET",
          credentials: "include", // Ensure cookies are included in the request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setTableData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data from API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirm = async () => {
    const postData = {
      query: selectedOptions["netSales"],
      targetApplication: selectedOptions["targetLocation"],
      genAiApp: selectedOptions["genAiApp"],
      selectApiName: selectedOptions["genAiApp"],
      selectApiDescription: description,
      selectApiDataFields: Object.keys(dataFields).map((key) => ({
        label: key,
        isChecked: dataFields[key],
      })),
      actionOnDataField: actionOnDataField,
      actionOnPermission: actionOnPermission,
      actionOnPermissionExisting: actionOnPermissionExisting,
      actionOnPermissionRevised: checkboxSelections,
      actionOnPrivacyFilteringCategory: selectedOptions["privacyValue"] || "",
      actionOnPrivacyFilteringAction: selectedOptions["privacyAction"] || "",
      actionOnPrivacyFilteringTransformValue: "Transformation privacy" || "",
      actionOnAttributeFilteringAttribute:
        selectedOptions["attributeOption"] || "",
      actionOnAttributeFilteringValue: selectedOptions["attributeValue"] || "",
      actionOnAttributeFilteringAction:
        selectedOptions["attributeActionOption"] || "",
      actionOnAttributeFilteringTransformValue:
        "Transformation Attribute" || "",
    };

    console.log(postData, "functionCalling");

    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerFunctionCalling`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Policy saved successfully:", result);
      setIsSaveSuccessful(true);

      // Clear all dropdown selections and section data
      setSelectedOptions({});
      setDataFields({
        "Opportunity Name": false,
        "Lead Source": false,
        Close_Date: false,
        "Account Name": false,
        Amount: false,
        Age: false,
        Type: false,
        Probability: false,
        Created_Date: false,
      });
      setCheckboxSelections([
        { label: "Sales NA", isChecked: false },
        { label: "Management", isChecked: false },
      ]);
      setDescription("");
      setActionOnDataField("Account");
      setActionOnPermission("ReadOrWrite");
      setActionOnPermissionExisting("Management");

      // Call fetchData to update table data
      await fetchData();

      // Close modal after 2 seconds
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error saving policy:", error);
      setIsSaveSuccessful(false);
    }
  };

  const fetchDataForEdit = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerFunctionCalling/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      const data = result.data;

      // Populate modal with fetched data
      setSelectedOptions({
        targetLocation: data.targetApplication,
        genAiApp: data.genAiApp,
        privacyValue: data.actionOnPrivacyFilteringCategory,
        privacyAction: data.actionOnPrivacyFilteringAction,
        attributeOption: data.actionOnAttributeFilteringAttribute,
        attributeValue: data.actionOnAttributeFilteringValue,
        attributeActionOption: data.actionOnAttributeFilteringAction,
      });
      setDescription(data.selectApiDescription);
      setDataFields(
        data.selectApiDataFields.reduce((acc, field) => {
          acc[field.label] = field.isChecked;
          return acc;
        }, {})
      );
      setCheckboxSelections(data.actionOnPermissionRevised);
      setPolicyId(id);
    } catch (error) {
      console.error("Error fetching data for edit:", error);
    }
  };

  const handleEditButtonClick = (id) => {
    setIsEditMode(true);
    fetchDataForEdit(id);
    setIsEditModalOpen(true);
  };
  const handleUpdatePolicy = async () => {
    const postData = {
      query: selectedOptions["netSales"],
      targetApplication: selectedOptions["targetLocation"],
      genAiApp: selectedOptions["genAiApp"],
      selectApiName: selectedOptions["genAiApp"],
      selectApiDescription: description,
      selectApiDataFields: Object.keys(dataFields).map((key) => ({
        label: key,
        isChecked: dataFields[key],
      })),
      actionOnDataField: actionOnDataField,
      actionOnPermission: actionOnPermission,
      actionOnPermissionExisting: actionOnPermissionExisting,
      actionOnPermissionRevised: checkboxSelections,
      actionOnPrivacyFilteringCategory: selectedOptions["privacyValue"] || "",
      actionOnPrivacyFilteringAction: selectedOptions["privacyAction"] || "",
      actionOnPrivacyFilteringTransformValue: "Transformation privacy" || "",
      actionOnAttributeFilteringAttribute:
        selectedOptions["attributeOption"] || "",
      actionOnAttributeFilteringValue: selectedOptions["attributeValue"] || "",
      actionOnAttributeFilteringAction:
        selectedOptions["attributeActionOption"] || "",
      actionOnAttributeFilteringTransformValue:
        "Transformation Attribute" || "",
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerFunctionCalling/${policyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Policy updated successfully:", result);
      setIsSaveSuccessful(true);

      // Optionally, call fetchTableData here to refresh the table data
      setTimeout(() => {
        setIsEditModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating policy:", error);
      setIsSaveSuccessful(false);
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsSaveSuccessful(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePolicyNameChange = (e) => {
    setPolicyName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCheckboxChange = (label) => {
    setDataFields((prevState) => ({
      ...prevState,
      [label]: !prevState[label], // Toggle the checkbox state
    }));
  };

  // Handle click to toggle selection
  const handleClick = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  const handleSavePolicy = () => {
    setIsModalOpen(true);
  };

  const addSection = () => {
    // console.log(sections, "first");
    setSections([...sections, { id: Date.now(), values: {} }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleOptionClick = (dropdownId, option) => {
    setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
    setOpenDropdown(null);
  };

  // Update handleSpanClick to also set actionOnPermissionExisting
  const handleSpanClick = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );

    // Update actionOnPermissionExisting with selected items
    setActionOnPermissionExisting((prevSelectedItems) =>
      prevSelectedItems.includes(item) ? "None" : item
    );
  };

  const handleCheckboxSelectionsChange = (label) => {
    setCheckboxSelections((prevState) =>
      prevState.map((item) =>
        item.label === label ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const data = {
    netSalesOptions: ["Net Sales Orders", "Total Sales Orders"],
    targetLocationOptions: ["Salesforce", "Servicenow", "Microsoft Dynamics"],
    genAiAppOptions: ["App1", "App2", "App3", "App4"],
    locationOption: ["Department", "Location"],
    privacyValueOption: ["Asia", "North America"],
    privacyActionOption: ["Allow", "Reduct"],
    attributeOption: ["Department", "Location"],
    attributeValueOption: ["Asia", "America"],
    attributeActionOption: ["Allow", "Reduct"],
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

  return (
    <>
      <div className="bg-customBlack shadow-md">
        <div className="page-center">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
      
              </thead>
              <tbody className="bg-customTablebG">
                {tableData.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                      {/* {item.query} */}
                      Secure RFP response template
                    </td>
                    <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                      {item.targetApplication}
                    </td>
                    <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                      {item.genAiApp}
                    </td>
                    <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                      {item.selectApiName}
                    </td>
                    <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                      {item.selectApiDescription}
                    </td>
                    <td className="px-4 py-2 border border-customBorderColor bg-customTablebG">
                      <div className="flex items-center justify-between spaceGaps">
                        <button
                          className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
                          onClick={() => handleEditButtonClick(item._id)}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                          />
                        </button>

                        <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                          <FontAwesomeIcon
                            icon={faDownload}
                            className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                          />
                        </button>

                        <button className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen">
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
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
                <div className="flex flex-col">
                  <label className="text-customGreen font-poppins font-semibold text-sm mb-2">
                    Target Application
                  </label>
                  <PrivacyCustomDropdown
                    options={data.targetLocationOptions || []}
                    placeholder="Salesforce"
                    isOpen={openDropdown === "targetLocation"}
                    onDropdownClick={() =>
                      handleDropdownClick("targetLocation")
                    }
                    selectedOption={selectedOptions["targetLocation"]}
                    onOptionClick={(option) =>
                      handleOptionClick("targetLocation", option)
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-customGreen font-poppins font-semibold text-sm mb-2">
                    GenAPI App
                  </label>
                  <PrivacyCustomDropdown
                    options={data.genAiAppOptions || []}
                    placeholder="App one"
                    isOpen={openDropdown === "genAiApp"}
                    onDropdownClick={() => handleDropdownClick("genAiApp")}
                    selectedOption={selectedOptions["genAiApp"]}
                    onOptionClick={(option) =>
                      handleOptionClick("genAiApp", option)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-customGreen font-poppins font-semibold text-sm mb-2">
                    Select API Data
                  </label>
                  <Dropdown
                    items={Sales}
                    iconColor="text-customIconColor"
                    backgroundColor="bg-black"
                    textColor="text-white"
                    onItemClick={(subItemName) => {
                      console.log("Selected:", subItemName);
                    }}
                  />

                  <div className="flex flex-col w-full sm:w-full md:w-full lg:w-[25%] xl:w-[25%] 2xl:w-[25%] mb-4 md:mb-0 pl-[2px] pr-[2px] ipad-width">
                    <label className="py-3.5 text-[#31E48F] text-lg font-poppins font-semibold">
                      Description
                    </label>

                    <input
                      type="text"
                      placeholder="Retrieve sales opportunities"
                      className="bg-black pb-[96px] pt-[10px] pl-[15px] pr-[9px] text-customWhite text-base font-poppins text-sizess"
                      value={description} // Controlled input value
                      onChange={handleDescriptionChange} // Handle input change
                    />
                  </div>
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
    </>
  );
};

export default FunctionCalling;
