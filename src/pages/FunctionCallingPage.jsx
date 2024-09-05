import React, { useEffect, useRef, useState } from "react";
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
import ConfirmationModal from "../components/ConfirmationModal";
import { saveAs } from "file-saver";

const FunctionCalling = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [sections, setSections] = useState([{ id: Date.now(), values: {} }]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSectionVisible, setSectionVisible] = useState(sections.length > 0);
  const [isContentVisible, setContentVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [isDeleteModel, setDeleteModel] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [checkboxSelections, setCheckboxSelections] = useState([
    { label: "Sales NA", isChecked: false },
    { label: "Management", isChecked: false },
  ]);
  const [actionOnDataField, setActionOnDataField] = useState("Account");
  const [actionOnPermission, setActionOnPermission] = useState("ReadOrWrite");
  const [actionOnPermissionExisting, setActionOnPermissionExisting] =
    useState("Management");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const topRef = useRef(null);

  const fetchData = async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerFunctionCalling?page=${page}&limit=10`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setTableData(result.data);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data from API on component mount
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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

      setTimeout(() => {
        setIsSaveSuccessful(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error saving policy:", error);
      setIsSaveSuccessful(false);
    }
  };

  const fetchDataForEdit = (id) => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });

    setIsSaveSuccessful(false);
    const policyToEdit = tableData.find((policy) => policy._id === id);
    if (policyToEdit) {
      setSelectedOptions({
        targetLocation: policyToEdit.targetApplication,
        genAiApp: policyToEdit.genAiApp,
        privacyValue: policyToEdit.actionOnPrivacyFilteringCategory,
        privacyAction: policyToEdit.actionOnPrivacyFilteringAction,
        attributeOption: policyToEdit.actionOnAttributeFilteringAttribute,
        attributeValue: policyToEdit.actionOnAttributeFilteringValue,
        attributeActionOption: policyToEdit.actionOnAttributeFilteringAction,
      });
      setDescription(policyToEdit.selectApiDescription);
      setDataFields(
        policyToEdit.selectApiDataFields.reduce((acc, field) => {
          acc[field.label] = field.isChecked;
          return acc;
        }, {})
      );
      setCheckboxSelections(policyToEdit.actionOnPermissionRevised);
      setPolicyId(id);
    } else {
      console.error("Policy not found with ID:", id);
    }
  };

  const handleEditButtonClick = (id) => {
    setIsEditMode(true);
    fetchDataForEdit(id);
    // setIsEditModalOpen(true);
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

      setSuccessMessage("Policy updated successfully!");
      setIsSuccessModalOpen(true);

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

      setTimeout(() => {
        setIsSaveSuccessful(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error updating policy:", error);
      // setIsSaveSuccessful(false);
    }
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data/policyManagerFunctionCalling/${selectedPolicyId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete policy");
      }

      console.log("Policy deleted successfully");

      // Call fetchData to update table data after deletion
      await fetchData();
      setDeleteModel(false);
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  const handleDownloadButtonClick = (id) => {
    const policyToDownload = tableData.find((policy) => policy._id === id);

    if (policyToDownload) {
      const dataToDownload = JSON.stringify(policyToDownload, null, 2);
      const blob = new Blob([dataToDownload], { type: "application/json" });
      saveAs(blob, `policy_${id}.json`);

      console.log("Data downloaded successfully");
    } else {
      console.error("Policy not found");
    }
  };

  const openDeleteModal = (id) => {
    setSelectedPolicyId(id);
    setDeleteModel(true);
  };

  const closeModal = () => {
    setDeleteModel(false);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsSaveSuccessful(false);
    setIsEditMode(false);
    setSelectedPolicyId(null);
    setIsSuccessModalOpen(false);
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
      [label]: !prevState[label],
    }));
  };

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

  const handleSpanClick = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );

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
    subItems: [{ name: "API 1" }, { name: "API 2" }, { name: "API 3" }],
  };

  return (
    <>
      <div
        ref={topRef}
        className="p-4 bg-[#30b375] bg-bubble-pattern  rounded-md  mb-4 "
      >
        <div className="page-center">
          <h2 className="text-3xl font-poppins font-semibold mb-4 text-customWhite">
            Policy Manager
          </h2>
          <h2 className="text-sm text-[#2F3A45] font-poppins mb-4">
            Policy Manager
            <span className="text-customWhite text-sm">
              {" "}
              / Function Calling
            </span>
          </h2>
        </div>
      </div>
      {isEditMode && (
        <h2 className="text-xl font-poppins font-semibold flex justify-center text-customGreen mb-4">
          Please Update your policy
        </h2>
      )}
      <div className="bg-customBlack py-8 rounded-lg shadow-md mt-4">
        <div className="page-center">
          <div className="flex flex-wrap justify-around px-4 py-4">
            {/* First Column */}
            <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[26.333333%] xl:basis-[26.333333%] 2xl:basis-[26.333333%] ipad-query">
              <div className="flex items-baseline mb-4">
                <span
                  className="text-customGreen font-poppins font-semibold text-sm ipdadleft"
                  style={{ marginLeft: "35px" }}
                >
                  Query
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-white mr-2 ipadhide">Run</span>
                <PrivacyCustomDropdown
                  options={data.netSalesOptions || []}
                  placeholder="Select Query"
                  isOpen={openDropdown === "netSales"}
                  onDropdownClick={() => handleDropdownClick("netSales")}
                  selectedOption={selectedOptions["netSales"]}
                  onOptionClick={(option) =>
                    handleOptionClick("netSales", option)
                  }
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[26.333333%] xl:basis-[26.333333%] 2xl:basis-[26.333333%] mt-4 sm:mt-0 ipad-query">
              <div className="flex items-baseline mb-4">
                <span
                  className="text-customGreen font-poppins font-semibold text-sm ipdadleft"
                  style={{ marginLeft: "31px" }}
                >
                  Target Application
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-white mr-2 ipadhide ">On</span>
                <PrivacyCustomDropdown
                  options={data.targetLocationOptions || []}
                  placeholder="Select Target Application "
                  isOpen={openDropdown === "targetLocation"}
                  onDropdownClick={() => handleDropdownClick("targetLocation")}
                  selectedOption={selectedOptions["targetLocation"]}
                  onOptionClick={(option) =>
                    handleOptionClick("targetLocation", option)
                  }
                />
              </div>
            </div>

            {/* Third Column */}
            <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[26.333333%] xl:basis-[26.333333%] 2xl:basis-[26.333333%] mt-4 sm:mt-0 ipad-query">
              <div className="flex items-baseline mb-4">
                <span
                  className="text-customGreen font-poppins font-semibold text-sm ipdadleft"
                  style={{ marginLeft: "46px" }}
                >
                  GenAPI App
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-white mr-2 ipadhide">From</span>
                <PrivacyCustomDropdown
                  options={data.genAiAppOptions || []}
                  placeholder="Select  GenAPI App"
                  isOpen={openDropdown === "genAiApp"}
                  onDropdownClick={() => handleDropdownClick("genAiApp")}
                  selectedOption={selectedOptions["genAiApp"]}
                  onOptionClick={(option) =>
                    handleOptionClick("genAiApp", option)
                  }
                />
                <span className="text-white ml-2 ipadhide">For</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dropdownBackground p-4 shadow-md mt-4 rounded-t-lg">
        <div className=" page-center">
          <div className="flex flex-wrap justify-between">
            <h2 className="text-[#31E48F] text-xl font-poppins font-semibold px-4">
              Select API Data
            </h2>
            <button
              className="bg-[#2F3A45] text-[#000000] px-2 py-2 rounded hover:text-customGreen"
              onClick={() => setContentVisible(!isContentVisible)}
            >
              <FontAwesomeIcon
                icon={isContentVisible ? faMinus : faPlus}
                className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>

      {isContentVisible && (
        <div className="p-4 bg-customBlack opacity-100">
          <div className="page-center">
            <div className="p-4 mt-6">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap p-2 rounded-lg justify-between">
                  <div className="flex flex-col w-full sm:w-full md:w-full lg:w-[19%] xl:w-[19%] 2xl:w-[19%] mb-4 md:mb-0 ipad-width">
                    <label className="py-3.5 text-[#31E48F] text-lg font-poppins font-semibold">
                      Select API Data
                    </label>
                    <div>
                      <Dropdown
                        items={Sales}
                        iconColor="text-customIconColor"
                        backgroundColor="bg-black"
                        textColor="text-white"
                        onItemClick={(subItemName) => {
                          console.log("Selected:", subItemName);
                        }}
                      />
                    </div>
                  </div>
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

                  {/* <div className="flex flex-col w-full sm:w-full  md:w-full lg:w-[56%] xl:w-[56%] 2xl:w-[56%] ipad-width">
                    <label className="py-3.5 text-[#31E48F] text-lg font-poppins font-semibold">
                      Data Fields
                    </label>
                    <div className="bg-black pt-[22px] pb-[20px] pl-[30px]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="text-customWhite font-poppins text-sizess">
                            Opportunity Name
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="text-customWhite font-poppins text-base text-sizess">
                            Lead Source
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="text-customWhite font-poppins text-base text-sizess">
                            Close_Date
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="text-customWhite font-poppins text-base text-sizess">
                            Account Name
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="text-customWhite font-poppins text-base text-sizess">
                            Amount
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="text-customWhite font-poppins text-base text-sizess">
                            Age
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="text-customWhite font-poppins text-base text-sizess">
                            Type
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="text-customWhite font-poppins text-base text-sizess">
                            Probability
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="text-customWhite font-poppins text-base text-sizess">
                            Created_Date
                          </span>
                        </label>
                      </div>
                    </div>
                  </div> */}
                  <div className="flex flex-col w-full sm:w-full md:w-full lg:w-[56%] xl:w-[56%] 2xl:w-[56%] ipad-width">
                    <label className="py-3.5 text-[#31E48F] text-lg font-poppins font-semibold">
                      Data Fields
                    </label>
                    <div className="bg-black pt-[22px] pb-[20px] pl-[30px]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {Object.keys(dataFields).map((field) => (
                          <label
                            key={field}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              checked={dataFields[field]}
                              onChange={() => handleCheckboxChange(field)}
                            />
                            <span className="text-customWhite font-poppins text-sizess">
                              {field}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-dropdownBackground p-4 shadow-md mt-4 rounded-t-lg ">
        <div className="page-center">
          <div className="flex flex-wrap justify-between">
            <h2 className="text-[#31E48F] text-xs sm:text-xl md:text-xl font-poppins font-semibold px-4 text-Action">
              With the following Action on Data
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
              <div className="pt-[1rem] ">
                <div className="flex items-baseline  px-4 pt-[1rem] ml-2 gap-2.5">
                  <span className="text-[#31B476]  mr-2 font-poppins  font-semibold">
                    DataField
                  </span>
                  <Dropdown
                    width={"200px"}
                    items={items}
                    iconColor="text-customIconColor"
                    backgroundColor="bg-black"
                    textColor="text-white"
                    onItemClick={(subItemName) => {
                      console.log(subItemName);
                    }}
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
                                Revised
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                Read
                              </td>

                              <td className="border border-customBorderColor text-customWhite bg-black">
                                <div className="flex flex-col">
                                  <span
                                    onClick={() => handleSpanClick("Sales NA")}
                                    className={`p-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("Sales NA")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    Sales NA
                                  </span>
                                  <span
                                    onClick={() =>
                                      handleSpanClick("Management")
                                    }
                                    className={`p-2 cursor-pointer border border-customBorderColor font-poppins ${
                                      selectedItems.includes("Management")
                                        ? "text-white bg-[#0a854b]"
                                        : "bg-black"
                                    }`}
                                  >
                                    Management
                                  </span>
                                </div>
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black">
                                <div className="flex flex-col">
                                  {checkboxSelections.map((item) => (
                                    <label
                                      key={item.label}
                                      className="flex items-center space-x-2 mt-2"
                                    >
                                      <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                        checked={item.isChecked}
                                        onChange={() =>
                                          handleCheckboxSelectionsChange(
                                            item.label
                                          )
                                        }
                                      />
                                      <span className="text-[#5d5d5d] font-poppins">
                                        {item.label}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                Read + Write
                              </td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                              <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
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
                              <td className=" py-2.5 border border-customBorderColor text-customWhite bg-black">
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
                              <td className=" py-2.5 border border-customBorderColor text-customWhite bg-black">
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
                              <td className=" py-2.5 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
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
                                    handleOptionClick("attributeOption", option)
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
                                    handleOptionClick("attributeValue", option)
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
                                    handleDropdownClick("attributeActionOption")
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

                {sections.length === 1 ? (
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
                )}
              </div>
            </div>
            <div className="mb-2"></div>
          </div>
        ))}

      <div
        className={`bg-customBlack hover:bg-customGreen text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform cursor-pointer font-poppins  ${
          isClickedAdd ? "hover:bg-customGreen hover:text-white" : ""
        }`}
        onClick={isEditMode ? handleUpdatePolicy : handleSavePolicy}
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
          {isEditMode ? "UPDATE POLICY" : "SAVE POLICY"}
        </span>
      </div>

      {isEditMode && (
        <div
          className="bg-red-500 text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform cursor-pointer font-poppins"
          onClick={() => {
            setIsEditMode(false);
            setPolicyId(null);
            setPolicyName("");
            setDescription("");
            setSelectedOptions({});
            setSections([{ id: Date.now(), values: {} }]);
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
          }}
        >
          <span className="transition-transform duration-300 ease-out">
            CANCEL EDIT
          </span>
        </div>
      )}

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
                {/* <div className="mb-4">
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
                </div> */}
                <div className="mb-4">
                  <p className="text-sm mb-2 text-gray-700">
                    <strong>Selected Options:</strong>
                  </p>
                  <ul>
                    <div className="">
                      <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        {Object.entries(selectedOptions).map(([key, value]) => (
                          <li key={key} className="text-gray-700">
                            {key}: {value}
                          </li>
                        ))}
                        <li className="text-gray-700">
                          Description: {description}
                        </li>
                        {Object.keys(dataFields).map((field) => (
                          <li key={field} className="text-gray-700">
                            {field}:{" "}
                            {dataFields[field] ? "Checked" : "Unchecked"}
                          </li>
                        ))}
                      </div>
                    </div>

                    <li className="">
                      <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        <h1 className="font-poppins font-semibold">
                          Permission
                        </h1>
                        <li className="text-gray-700">
                          Action on Data Field: {actionOnDataField}
                        </li>
                        <li className="text-gray-700">
                          Action on Permission: {actionOnPermission}
                        </li>
                        <li className="text-gray-700">
                          Action on Permission Existing:{" "}
                          {actionOnPermissionExisting}
                        </li>
                        <li className="text-gray-700">
                          Action on Permission Revised:
                        </li>
                        {checkboxSelections.map((item) => (
                          <li key={item.label} className="text-gray-700">
                            {item.label}:{" "}
                            {item.isChecked ? "Checked" : "Unchecked"}
                          </li>
                        ))}
                      </div>
                    </li>

                    <li className="">
                      <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        <h1 className="font-poppins font-semibold">
                          Privacy Filtering
                        </h1>
                        <p>
                          <span>Privacy Category:</span>{" "}
                          {selectedOptions["privacyValue"]}
                        </p>
                        <p>
                          <span>Privacy Action:</span>{" "}
                          {selectedOptions["privacyAction"]}
                        </p>
                        <p>
                          <span>Transformation Value:</span> Transformation
                        </p>
                      </div>
                    </li>
                    <li className="">
                      <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        <h1 className="font-poppins font-semibold">
                          Attribute Filtering
                        </h1>
                        <p>
                          <span>Attribute:</span>{" "}
                          {selectedOptions["attributeOption"]}
                        </p>
                        <p>
                          <span> Attribute Value:</span>{" "}
                          {selectedOptions["attributeValue"]}
                        </p>
                        <p>
                          <span> Attribute Action:</span>{" "}
                          {selectedOptions["attributeActionOption"]}
                        </p>
                        <p>
                          <span>Transformation Value:</span> Transformation
                          Attribute
                        </p>
                      </div>
                    </li>
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
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[50vh] overflow-y-auto">
            <h2 className="text-xl font-poppins font-semibold mb-4 text-center text-gray-800">
              Success
            </h2>
            <p className="text-green-500 text-center">{successMessage}</p>
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

      <div className="bg-dropdownBackground p-4 shadow-md mt-2 rounded-t-lg ">
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
                    API Name
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    API Description
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Actions
                  </th>
                </tr>
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

                        <button
                          className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
                          onClick={() => handleDownloadButtonClick(item._id)}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
                          />
                        </button>

                        <button
                          className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
                          // onClick={() => handleDeleteButtonClick(item._id)}
                          onClick={() => openDeleteModal(item._id)}
                        >
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
      <ConfirmationModal
        isOpen={isDeleteModel}
        onClose={closeModal} // Close modal handler
        onConfirm={handleDeleteButtonClick} // Confirm deletion handler
      />
      {/* {isEditModalOpen && (
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

                  <div className="flex flex-col w-full sm:w-full md:w-full lg:w-[100%] xl:w-[100%] 2xl:w-[100%] mb-4 md:mb-0 pl-[2px] pr-[2px] ipad-width">
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

                <div className="flex justify-end mt-4">
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
      )} */}

      <div className="flex justify-end items-center mt-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#31B476] text-white hover:bg-[#28a165]"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2 rounded-lg bg-[#2f3a45] text-white font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#31B476] text-white hover:bg-[#28a165]"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FunctionCalling;
