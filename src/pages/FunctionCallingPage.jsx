import React, { useEffect, useRef, useState } from "react";
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

import { BASE_URL } from "../services/api";
import axios from "axios";
import ConfirmationModal from "../components/ConfirmationModal";
import { saveAs } from "file-saver";
import userIcon from "../assets/usericon.svg";
import iconsmodel from "../assets/save.svg";
import ThreeDotsButton from "../components/ThreeDotsButton";

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
    useState("Rajat");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedApiName, setSelectedApiName] = useState("");

  const [actionOnDataFieldSelections, setActionOnDataFieldSelections] =
    useState(Array(sections.length).fill(""));

  const topRef = useRef(null);

  const [showEditMembership, setShowEditMembership] = useState(false);
  const [showEditMembershipPermission, setShowEditMembershipPermission] =
    useState(false);
  const [hoveredRemoveIndex, setHoveredRemoveIndex] = useState(null);
  const [hoveredAddIndex, setHoveredAddIndex] = useState(null);
  const [members, setMembers] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [showMembership, setShowMembership] = useState(false);

  const [membersBySection, setMembersBySection] = useState([[], []]);
  const [openMembershipIndex, setOpenMembershipIndex] = useState(null);
  const [openEditMembershipIndex, setOpeneditMembershipIndex] = useState(null);

  const availableUsers = [
    "Rajat Mohanty",
    "Vinod Vasudevan",
    "John Doe",
    "Jane Smith",
  ];

  useEffect(() => {
    if (policyId) {
      setIsEditMode(true);
      handleEditButtonClick(policyId);
    }
  }, [policyId]);

  // console.log(membersBySection, "membersBySection");

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

        // Set total pages based on response (if included in API response)
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
    const updatedMembersBySection = [...membersBySection];

    // Add member to the correct section's array based on sectionIndex
    updatedMembersBySection[sectionIndex] = [
      ...updatedMembersBySection[sectionIndex],
      user,
    ];

    setMembersBySection(updatedMembersBySection); // Update state
    setSearchResults(searchResults.filter((u) => u._id !== user._id)); // Remove from search
    setSearchQuery(""); // Clear search query
  };
  const removeMember = (memberIndex, sectionIndex) => {
    const updatedMembersBySection = [...membersBySection];
    updatedMembersBySection[sectionIndex].splice(memberIndex, 1);
    setMembersBySection(updatedMembersBySection); // Update state
  };

  const toggleeditMembership = () => {
    setShowEditMembership(!showEditMembership);
  };

  const toggleMembership = (index) => {
    setOpenMembershipIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleEditMembership = (sectionIndex) => {
    setOpeneditMembershipIndex(
      openEditMembershipIndex === sectionIndex ? null : sectionIndex
    );
  };

  const toggleMembershipEdit = (index) => {
    setOpeneditMembershipIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

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
      // console.log(result);
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

  // console.log(actionOnDataFieldSelections, "actionOnDataFieldSelections");

  // const handleConfirm = async () => {
  //   const trimmedPolicyName = policyName.trim();
  //   const postData = {
  //     policyName: trimmedPolicyName,
  //     query: selectedOptions["netSales"],
  //     targetApplication: selectedOptions["targetLocation"],
  //     genAiApp: selectedOptions["genAiApp"],
  //     selectApiName: selectedOptions["genAiApp"],
  //     selectApiDescription: description,
  //     selectApiDataFields: Object.keys(dataFields).map((key) => ({
  //       label: key,
  //       isChecked: dataFields[key],
  //     })),
  //     actionOnDataField: actionOnDataField,
  //     actionOnPermission: actionOnPermission,
  //     actionOnPermissionExisting: actionOnPermissionExisting,
  //     actionOnPermissionRevised: checkboxSelections,
  //     actionOnPrivacyFilteringCategory: selectedOptions["privacyValue"] || "",
  //     actionOnPrivacyFilteringAction: selectedOptions["privacyAction"] || "",
  //     actionOnPrivacyFilteringTransformValue: "Transformation privacy" || "",
  //     actionOnAttributeFilteringAttribute:
  //       selectedOptions["attributeOption"] || "",
  //     actionOnAttributeFilteringValue: selectedOptions["attributeValue"] || "",
  //     actionOnAttributeFilteringAction:
  //       selectedOptions["attributeActionOption"] || "",
  //     actionOnAttributeFilteringTransformValue:
  //       "Transformation Attribute" || "",
  //   };

  //   console.log(postData, "functionCalling");

  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/api/data/policyManagerFunctionCalling`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(postData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     console.log("Policy saved successfully:", result);
  //     setIsSaveSuccessful(true);

  //     // Clear all dropdown selections and section data
  //     setSelectedOptions({});
  //     setDataFields({
  //       "Opportunity Name": false,
  //       "Lead Source": false,
  //       Close_Date: false,
  //       "Account Name": false,
  //       Amount: false,
  //       Age: false,
  //       Type: false,
  //       Probability: false,
  //       Created_Date: false,
  //     });
  //     setCheckboxSelections([
  //       { label: "Sales NA", isChecked: false },
  //       { label: "Management", isChecked: false },
  //     ]);
  //     setDescription("");
  //     setActionOnDataField("Account");
  //     setActionOnPermission("ReadOrWrite");
  //     setActionOnPermissionExisting("Management");

  //     // Call fetchData to update table data
  //     await fetchData();

  //     setTimeout(() => {
  //       setIsSaveSuccessful(false);
  //       closeModal();
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error saving policy:", error);
  //     setIsSaveSuccessful(false);
  //   }
  // };

  // const handleConfirm = async () => {
  //   const trimmedPolicyName = policyName.trim();

  //   const functionCallingPlusData = sections.map((section, index) => ({
  //     actionOnDataField: section.values["actionOnDataField"] || "",
  //     actionOnPermission: section.values.actionOnPermission || "ReadOrWrite",
  //     actionOnPermissionExisting:
  //       section.values.actionOnPermissionExisting || "Management",
  //     actionOnPermissionRevised: checkboxSelections,
  //     actionOnPrivacyFilteringCategory:
  //       section.values["privacyValueOption"] || "",
  //     actionOnPrivacyFilteringAction:
  //       section.values["privacyActionOption"] || "",
  //     actionOnPrivacyFilteringTransformValue: "Transformation privacy" || "",
  //     actionOnAttributeFilteringAttribute:
  //       section.values["attributeOption"] || "",
  //     actionOnAttributeFilteringValue:
  //       section.values["attributeValueOption"] || "",
  //     actionOnAttributeFilteringAction:
  //       section.values["attributeActionOption"] || "",
  //     actionOnAttributeFilteringTransformValue:
  //       "Transformation Attribute" || "",
  //   }));

  //   const postData = {
  //     policyName: trimmedPolicyName,
  //     query: selectedOptions["netSales"],
  //     targetApplication: selectedOptions["targetLocation"],
  //     genAiApp: selectedOptions["genAiApp"],
  //     selectApiName: selectedOptions["selectApiName"],
  //     selectApiDescription: description,
  //     selectApiDataFields: Object.keys(dataFields).map((key) => ({
  //       label: key,
  //       isChecked: dataFields[key],
  //     })),
  //     functionCallingPlusData,
  //   };

  //   // console.log(postData, "functionCalling");

  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/api/data/policyManagerFunctionCalling`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(postData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     console.log("Policy saved successfully:", result);
  //     setIsSaveSuccessful(true);

  //     // Clear all dropdown selections and section data
  //     setSelectedOptions({});
  //     setDataFields({
  //       "Opportunity Name": false,
  //       "Lead Source": false,
  //       Close_Date: false,
  //       "Account Name": false,
  //       Amount: false,
  //       Age: false,
  //       Type: false,
  //       Probability: false,
  //       Created_Date: false,
  //     });
  //     setCheckboxSelections([
  //       { label: "Sales NA", isChecked: false },
  //       { label: "Management", isChecked: false },
  //     ]);
  //     setDescription("");
  //     setActionOnDataField("Account");
  //     setActionOnPermission("ReadOrWrite");
  //     setActionOnPermissionExisting("Management");

  //     // Call fetchData to update table data
  //     await fetchData();

  //     setTimeout(() => {
  //       setIsSaveSuccessful(false);
  //       closeModal();
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error saving policy:", error);
  //     setIsSaveSuccessful(false);
  //   }
  // };

  const handleConfirm = async () => {
    const trimmedPolicyName = policyName.trim();
    const trimmedDescription = description.trim();

    const memberIds = members.map((member) => member._id);

    // Validation for top-level fields
    if (!trimmedPolicyName) {
      setErrorMessage("Policy Name is required.");
      return;
    }

    if (!selectedOptions["netSales"]) {
      setErrorMessage("Net Sales is required.");
      return;
    }

    if (!selectedOptions["targetLocation"]) {
      setErrorMessage("Target Location is required.");
      return;
    }

    if (!selectedOptions["genAiApp"]) {
      setErrorMessage("Gen AI App is required.");
      return;
    }

    if (!selectedOptions["selectApiName"]) {
      setErrorMessage("API Name is required.");
      return;
    }

    if (!trimmedDescription) {
      setErrorMessage("Description is required.");
      return;
    }

    // Validation for fields inside functionCallingPlusData
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      if (!section.values["actionOnDataField"]) {
        setErrorMessage(
          `Action on Data Field is required for section ${i + 1}.`
        );
        return;
      }

      // if (!section.values["privacyValueOption"]) {
      //   setErrorMessage(
      //     `Privacy Filtering Category is required for section ${i + 1}.`
      //   );
      //   return;
      // }

      if (!section.values["privacyActionOption"]) {
        setErrorMessage(
          `Privacy Filtering Action is required for section ${i + 1}.`
        );
        return;
      }

      if (!section.values["attributeOption"]) {
        setErrorMessage(
          `Attribute Filtering Attribute is required for section ${i + 1}.`
        );
        return;
      }

      if (!section.values["attributeValueOption"]) {
        setErrorMessage(
          `Attribute Filtering Value is required for section ${i + 1}.`
        );
        return;
      }

      if (!section.values["attributeActionOption"]) {
        setErrorMessage(
          `Attribute Filtering Action is required for section ${i + 1}.`
        );
        return;
      }
    }

    // If validation passes, clear the error message
    setErrorMessage("");

    const actionOnPermissionReadRevisedMember = membersBySection[0].map(
      (member) => member._id
    );
    const actionOnPermissionReadorWriteRevisedMember = membersBySection[1].map(
      (member) => member._id
    );

    const actionOnPermissionReadExistingMember = membersBySection[0].map(
      (member) => member._id
    );
    const actionOnPermissionReadorWriteExistingMember = membersBySection[1].map(
      (member) => member._id
    );

    // console.log(configurePermissionsReadRevised,configurePermissionsReadWriteRevised,configurePermissionsReadExisting,configurePermissionsReadWriteExisting)

    const functionCallingPlusData = sections.map((section) => ({
      actionOnDataField: section.values["actionOnDataField"] || "",
      actionOnPermissionReadExistingMember,
      actionOnPermissionReadRevisedMember,
      actionOnPermissionReadorWriteExistingMember,
      actionOnPermissionReadorWriteRevisedMember,
      // actionOnPrivacyFilteringCategory:
      //   section.values["privacyValueOption"] || "",
      actionOnPrivacyFilteringAction:
        section.values["privacyActionOption"] || "",
      actionOnPrivacyFilteringTransformValue: "Transformation privacy" || "",
      actionOnAttributeFilteringAttribute:
        section.values["attributeOption"] || "",
      actionOnAttributeFilteringValue:
        section.values["attributeValueOption"] || "",
      actionOnAttributeFilteringAction:
        section.values["attributeActionOption"] || "",
      actionOnAttributeFilteringTransformValue:
        "Transformation Attribute" || "",
    }));

    const postData = {
      policyName: trimmedPolicyName,
      query: selectedOptions["netSales"],
      targetApplication: selectedOptions["targetLocation"],
      genAiApp: selectedOptions["genAiApp"],
      selectApiName: selectedOptions["selectApiName"],
      selectApiDescription: description,
      selectApiDataFields: Object.keys(dataFields).map((key) => ({
        label: key,
        isChecked: dataFields[key],
      })),
      functionCallingPlusData,
    };

    // console.log(postData, "postData");

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
      setPolicyName("");
      setMembersBySection([[], []]);

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

  //   topRef.current?.scrollIntoView({ behavior: "smooth" });

  //   setIsSaveSuccessful(false);
  //   const policyToEdit = tableData.find((policy) => policy._id === id);
  //   if (policyToEdit) {
  //     setPolicyName(policyToEdit.policyName);
  //     setSelectedOptions({
  //       netSales: policyToEdit.query,
  //       targetLocation: policyToEdit.targetApplication,
  //       genAiApp: policyToEdit.genAiApp,
  //       privacyValue: policyToEdit.actionOnPrivacyFilteringCategory,
  //       privacyAction: policyToEdit.actionOnPrivacyFilteringAction,
  //       attributeOption: policyToEdit.actionOnAttributeFilteringAttribute,
  //       attributeValue: policyToEdit.actionOnAttributeFilteringValue,
  //       attributeActionOption: policyToEdit.actionOnAttributeFilteringAction,
  //     });
  //     setDescription(policyToEdit.selectApiDescription);
  //     setDataFields(
  //       policyToEdit.selectApiDataFields.reduce((acc, field) => {
  //         acc[field.label] = field.isChecked;
  //         return acc;
  //       }, {})
  //     );
  //     setCheckboxSelections(policyToEdit.actionOnPermissionRevised);
  //     setPolicyId(id);
  //   } else {
  //     console.error("Policy not found with ID:", id);
  //   }
  // };

  // const fetchDataForEdit = (id) => {
  //   topRef.current?.scrollIntoView({ behavior: "smooth" });

  //   setIsSaveSuccessful(false);
  //   const policyToEdit = tableData.find((policy) => policy._id === id);

  //   if (policyToEdit) {
  //     setPolicyName(policyToEdit.policyName);
  //     setSelectedOptions({
  //       netSales: policyToEdit.query,
  //       targetLocation: policyToEdit.targetApplication,
  //       genAiApp: policyToEdit.genAiApp,
  //       privacyValueOption: policyToEdit.actionOnPrivacyFilteringCategory,
  //       privacyAction: policyToEdit.actionOnPrivacyFilteringAction,
  //       attributeOption: policyToEdit.actionOnAttributeFilteringAttribute,
  //       attributeValue: policyToEdit.actionOnAttributeFilteringValue,
  //       attributeActionOption: policyToEdit.actionOnAttributeFilteringAction,
  //     });
  //     setDescription(policyToEdit.selectApiDescription);
  //     setDataFields(
  //       policyToEdit.selectApiDataFields.reduce((acc, field) => {
  //         acc[field.label] = field.isChecked;
  //         return acc;
  //       }, {})
  //     );

  //     // Ensure actionOnPermissionRevised is an array
  //     const actionOnPermissionRevised =
  //       policyToEdit.actionOnPermissionRevised || [];

  //     // Map the fetched data to the checkboxSelections state
  //     setCheckboxSelections([
  //       {
  //         label: "Sales NA",
  //         isChecked: actionOnPermissionRevised.some(
  //           (p) => p.label === "Sales NA" && p.isChecked
  //         ),
  //       },
  //       {
  //         label: "Management",
  //         isChecked: actionOnPermissionRevised.some(
  //           (p) => p.label === "Management" && p.isChecked
  //         ),
  //       },
  //     ]);

  //     // Map through multiple sections (functionCallingPlusData) to populate them in the form
  //     const sectionsData = policyToEdit.functionCallingPlusData.map(
  //       (section, index) => ({
  //         id: Date.now() + index, // Ensure unique id
  //         values: {
  //           actionOnDataField: section.actionOnDataField,
  //           actionOnPermission: section.actionOnPermission,
  //           actionOnPermissionExisting: section.actionOnPermissionExisting,
  //           actionOnPermissionRevised: actionOnPermissionRevised,
  //           privacyValueOption: section.actionOnPrivacyFilteringCategory,
  //           privacyActionOption: section.actionOnPrivacyFilteringAction,
  //           actionOnPrivacyFilteringTransformValue:
  //             section.actionOnPrivacyFilteringTransformValue,
  //           attributeOption: section.actionOnAttributeFilteringAttribute,
  //           attributeValueOption: section.actionOnAttributeFilteringValue,
  //           attributeActionOption: section.actionOnAttributeFilteringAction,
  //           actionOnAttributeFilteringTransformValue:
  //             section.actionOnAttributeFilteringTransformValue,
  //         },
  //       })
  //     );

  //     setSections(sectionsData); // Set the sections with the mapped data
  //     setPolicyId(id);
  //   } else {
  //     console.error("Policy not found with ID:", id);
  //   }
  // };

  // const fetchDataForEdit = (id) => {
  //   topRef.current?.scrollIntoView({ behavior: "smooth" });

  //   setIsSaveSuccessful(false);
  //   const policyToEdit = tableData.find((policy) => policy._id === id);
  //   // console.log(policyToEdit.selectApiName, "selectApiName");

  //   if (policyToEdit) {
  //     setPolicyName(policyToEdit.policyName);

  //     setSelectedOptions({
  //       netSales: policyToEdit.query,
  //       targetLocation: policyToEdit.targetApplication,
  //       genAiApp: policyToEdit.genAiApp,
  //       selectApiName: policyToEdit.selectApiName,
  //       privacyValueOption: policyToEdit.actionOnPrivacyFilteringCategory,
  //       privacyAction: policyToEdit.actionOnPrivacyFilteringAction,
  //       attributeOption: policyToEdit.actionOnAttributeFilteringAttribute,
  //       attributeValue: policyToEdit.actionOnAttributeFilteringValue,
  //       attributeActionOption: policyToEdit.actionOnAttributeFilteringAction,
  //     });
  //     // setSelectedApiName(policyToEdit.selectedApiName);
  //     setDescription(policyToEdit.selectApiDescription);
  //     setDataFields(
  //       policyToEdit.selectApiDataFields.reduce((acc, field) => {
  //         acc[field.label] = field.isChecked;
  //         return acc;
  //       }, {})
  //     );

  //     // Initialize checkboxSelections based on actionOnPermissionRevised
  //     const checkboxSelectionsMap = (label) => {
  //       return policyToEdit.functionCallingPlusData.some((section) =>
  //         section.actionOnPermissionRevised.some(
  //           (perm) => perm.label === label && perm.isChecked
  //         )
  //       );
  //     };

  //     setCheckboxSelections([
  //       { label: "Sales NA", isChecked: checkboxSelectionsMap("Sales NA") },
  //       { label: "Management", isChecked: checkboxSelectionsMap("Management") },
  //     ]);

  //     const memberIds = members.map((member) => member._id);

  //     const sectionsData = policyToEdit.functionCallingPlusData.map(
  //       (section, index) => ({
  //         id: Date.now() + index,
  //         values: {
  //           actionOnDataField: section.actionOnDataField,
  //           actionOnPermission: section.actionOnPermission,
  //           actionOnPermissionExisting: memberIds,
  //           actionOnPermissionRevised: memberIds,
  //           privacyValueOption: section.actionOnPrivacyFilteringCategory,
  //           privacyActionOption: section.actionOnPrivacyFilteringAction,
  //           actionOnPrivacyFilteringTransformValue:
  //             section.actionOnPrivacyFilteringTransformValue,
  //           attributeOption: section.actionOnAttributeFilteringAttribute,
  //           attributeValueOption: section.actionOnAttributeFilteringValue,
  //           attributeActionOption: section.actionOnAttributeFilteringAction,
  //           actionOnAttributeFilteringTransformValue:
  //             section.actionOnAttributeFilteringTransformValue,
  //         },
  //       })
  //     );

  //     setSections(sectionsData);
  //     setPolicyId(id);
  //   } else {
  //     console.error("Policy not found with ID:", id);
  //   }
  // };

  // const handleEditButtonClick = async (policyId) => {
  //   topRef.current?.scrollIntoView({ behavior: "smooth" });
  //   setIsSaveSuccessful(false);

  //   const policyToEdit = tableData.find((policy) => policy._id === policyId);
  //   if (policyToEdit) {
  //     // Set policy data
  //     setPolicyName(policyToEdit.policyName);
  //     setSelectedOptions({
  //       netSales: policyToEdit.query,
  //       targetLocation: policyToEdit.targetApplication,
  //       genAiApp: policyToEdit.genAiApp,
  //       selectApiName: policyToEdit.selectApiName,
  //     });
  //     setDescription(policyToEdit.selectApiDescription);

  //     // Set the data fields with isChecked status
  //     setDataFields(
  //       policyToEdit.selectApiDataFields.reduce((acc, field) => {
  //         acc[field.label] = field.isChecked;
  //         return acc;
  //       }, {})
  //     );

  //     // Fetch members based on actionOnPermissionRevisedMember and actionOnPermissionReadorWriteRevisedMember IDs
  //     const memberIds = [
  //       ...new Set(
  //         policyToEdit.functionCallingPlusData.flatMap((section) => [
  //           ...section.actionOnPermissionReadRevisedMember,
  //           ...section.actionOnPermissionReadorWriteRevisedMember,
  //         ])
  //       ),
  //     ];

  //     if (memberIds.length > 0) {
  //       // Fetch members based on the constructed query
  //       const queryParams = new URLSearchParams({
  //         ids: memberIds.join(","),
  //       }).toString();

  //       try {
  //         const response = await fetch(
  //           `${BASE_URL}/api/data/members?${queryParams}`,
  //           {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             credentials: "include",
  //           }
  //         );

  //         const memberData = await response.json();

  //         // Organize members into sections
  //         // const organizedMembers = policyToEdit.functionCallingPlusData.map(
  //         //   (section) => ({
  //         //     memberData.data.filter((member) => section.includes(member._id))
  //         //   })
  //         // );

  //         const sections = [
  //           ...new Set(
  //             policyToEdit.functionCallingPlusData.flatMap((section) => [
  //               ...section.actionOnPermissionReadRevisedMember,
  //               ...section.actionOnPermissionReadorWriteRevisedMember,
  //             ])
  //           ),
  //         ];

  //         const organizedMembers = sections.map(
  //           (section) =>
  //             memberData.data.filter((member) => section.includes(member._id))
  //         );

  //         setMembersBySection(organizedMembers);
  //       } catch (error) {
  //         console.error("Error fetching members:", error);
  //       }
  //     } else {
  //       console.log("No members found in the permission fields.");
  //     }

  //     // Populate sections data for editing
  //     const sectionsData = policyToEdit.functionCallingPlusData.map(
  //       (section, index) => ({
  //         id: Date.now() + index,
  //         values: {
  //           actionOnDataField: section.actionOnDataField,
  //           privacyActionOption: section.actionOnPrivacyFilteringAction,
  //           actionOnPrivacyFilteringTransformValue:
  //             section.actionOnPrivacyFilteringTransformValue,
  //           attributeOption: section.actionOnAttributeFilteringAttribute,
  //           attributeValueOption: section.actionOnAttributeFilteringValue,
  //           attributeActionOption: section.actionOnAttributeFilteringAction,
  //           actionOnAttributeFilteringTransformValue:
  //             section.actionOnAttributeFilteringTransformValue,
  //         },
  //       })
  //     );

  //     setSections(sectionsData);
  //     setPolicyId(policyId);
  //   } else {
  //     console.error("Policy not found with ID:", policyId);
  //   }
  // };

  const handleEditButtonClick = async (policyId) => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsSaveSuccessful(false);

    const policyToEdit = tableData.find((policy) => policy._id === policyId);
    if (policyToEdit) {
      // Set policy data
      setPolicyName(policyToEdit.policyName);
      setSelectedOptions({
        netSales: policyToEdit.query,
        targetLocation: policyToEdit.targetApplication,
        genAiApp: policyToEdit.genAiApp,
        selectApiName: policyToEdit.selectApiName,
      });
      setDescription(policyToEdit.selectApiDescription);

      // Set the data fields with isChecked status
      setDataFields(
        policyToEdit.selectApiDataFields.reduce((acc, field) => {
          acc[field.label] = field.isChecked;
          return acc;
        }, {})
      );

      // Fetch members based on actionOnPermissionRevisedMember and actionOnPermissionReadorWriteRevisedMember IDs
      const memberIds = [
        ...new Set(
          policyToEdit.functionCallingPlusData.flatMap((section) => [
            ...section.actionOnPermissionReadRevisedMember,
            ...section.actionOnPermissionReadorWriteRevisedMember,
          ])
        ),
      ];

      if (memberIds.length > 0) {
        // Fetch members based on the constructed query
        const queryParams = new URLSearchParams({
          ids: memberIds.join(","),
        }).toString();

        try {
          const response = await fetch(
            `${BASE_URL}/api/data/members?${queryParams}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          const memberData = await response.json();

          // Organize members into two sections based on the actionOnPermission* fields
          const readMembers = memberData.data.filter((member) =>
            policyToEdit.functionCallingPlusData.some((section) =>
              section.actionOnPermissionReadRevisedMember.includes(member._id)
            )
          );

          const readWriteMembers = memberData.data.filter((member) =>
            policyToEdit.functionCallingPlusData.some((section) =>
              section.actionOnPermissionReadorWriteRevisedMember.includes(
                member._id
              )
            )
          );

          // Set the members into the state
          setMembersBySection([readMembers, readWriteMembers]);
        } catch (error) {
          console.error("Error fetching members:", error);
        }
      } else {
        console.log("No members found in the permission fields.");
      }

      // Populate sections data for editing
      const sectionsData = policyToEdit.functionCallingPlusData.map(
        (section, index) => ({
          id: Date.now() + index,
          values: {
            actionOnDataField: section.actionOnDataField,
            privacyActionOption: section.actionOnPrivacyFilteringAction,
            actionOnPrivacyFilteringTransformValue:
              section.actionOnPrivacyFilteringTransformValue,
            attributeOption: section.actionOnAttributeFilteringAttribute,
            attributeValueOption: section.actionOnAttributeFilteringValue,
            attributeActionOption: section.actionOnAttributeFilteringAction,
            actionOnAttributeFilteringTransformValue:
              section.actionOnAttributeFilteringTransformValue,
          },
        })
      );

      setSections(sectionsData);
      setPolicyId(policyId);
    } else {
      console.error("Policy not found with ID:", policyId);
    }
  };

  // const handleEditButtonClick = (id) => {
  //   setIsEditMode(true);
  //   fetchDataForEdit(id);
  // };

  //   const trimmedPolicyName = policyName.trim();
  //   const postData = {
  //     policyName: trimmedPolicyName,
  //     query: selectedOptions["netSales"],
  //     targetApplication: selectedOptions["targetLocation"],
  //     genAiApp: selectedOptions["genAiApp"],
  //     selectApiName: selectedOptions["genAiApp"],
  //     selectApiDescription: description,
  //     selectApiDataFields: Object.keys(dataFields).map((key) => ({
  //       label: key,
  //       isChecked: dataFields[key],
  //     })),
  //     actionOnDataField: actionOnDataField,
  //     actionOnPermission: actionOnPermission,
  //     actionOnPermissionExisting: actionOnPermissionExisting,
  //     actionOnPermissionRevised: checkboxSelections,
  //     actionOnPrivacyFilteringCategory: selectedOptions["privacyValue"] || "",
  //     actionOnPrivacyFilteringAction: selectedOptions["privacyAction"] || "",
  //     actionOnPrivacyFilteringTransformValue: "Transformation privacy" || "",
  //     actionOnAttributeFilteringAttribute:
  //       selectedOptions["attributeOption"] || "",
  //     actionOnAttributeFilteringValue: selectedOptions["attributeValue"] || "",
  //     actionOnAttributeFilteringAction:
  //       selectedOptions["attributeActionOption"] || "",
  //     actionOnAttributeFilteringTransformValue:
  //       "Transformation Attribute" || "",
  //   };

  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/api/data/policyManagerFunctionCalling/${policyId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(postData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     console.log("Policy updated successfully:", result);

  //     setSuccessMessage("Policy updated successfully!");
  //     setIsSuccessModalOpen(true);

  //     setSections([{ id: Date.now(), values: {} }]);
  //     setPolicyName("");
  //     setSelectedOptions({});
  //     setDataFields({
  //       "Opportunity Name": false,
  //       "Lead Source": false,
  //       Close_Date: false,
  //       "Account Name": false,
  //       Amount: false,
  //       Age: false,
  //       Type: false,
  //       Probability: false,
  //       Created_Date: false,
  //     });
  //     setCheckboxSelections([
  //       { label: "Sales NA", isChecked: false },
  //       { label: "Management", isChecked: false },
  //     ]);
  //     setDescription("");
  //     setActionOnDataField("Account");
  //     setActionOnPermission("ReadOrWrite");
  //     setActionOnPermissionExisting("Management");

  //     // Call fetchData to update table data
  //     await fetchData();

  //     setTimeout(() => {
  //       setIsSaveSuccessful(false);
  //       closeModal();
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error updating policy:", error);
  //     // setIsSaveSuccessful(false);
  //   }
  // };
  // const handleUpdatePolicy = async () => {
  //   const trimmedPolicyName = policyName.trim();

  //   const actionOnPermissionReadRevisedMember = membersBySection[0].map(
  //     (member) => member._id
  //   );
  //   const actionOnPermissionReadorWriteRevisedMember = membersBySection[1].map(
  //     (member) => member._id
  //   );
  //   // Map through sections to build the functionCallingPlusData array
  //   const functionCallingPlusData = sections.map((section) => ({
  //     actionOnDataField: section.values["actionOnDataField"] || "",
  //     actionOnPermissionReadRevisedMember,
  //     actionOnPermissionReadorWriteRevisedMember,
  //     actionOnPrivacyFilteringAction:
  //       section.values["privacyActionOption"] || "",
  //     actionOnPrivacyFilteringTransformValue:
  //       section.values.actionOnPrivacyFilteringTransformValue ||
  //       "Transformation privacy",
  //     actionOnAttributeFilteringAttribute:
  //       section.values["attributeOption"] || "",
  //     actionOnAttributeFilteringValue:
  //       section.values["attributeValueOption"] || "",
  //     actionOnAttributeFilteringAction:
  //       section.values["attributeActionOption"] || "",
  //     actionOnAttributeFilteringTransformValue:
  //       section.values.actionOnAttributeFilteringTransformValue ||
  //       "Transformation Attribute",
  //   }));

  //   const postData = {
  //     policyName: trimmedPolicyName,
  //     query: selectedOptions["netSales"],
  //     targetApplication: selectedOptions["targetLocation"],
  //     genAiApp: selectedOptions["genAiApp"],
  //     selectApiName: selectedOptions["selectApiName"],
  //     selectApiDescription: description,
  //     selectApiDataFields: Object.keys(dataFields).map((key) => ({
  //       label: key,
  //       isChecked: dataFields[key],
  //     })),
  //     functionCallingPlusData,
  //   };

  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/api/data/policyManagerFunctionCalling/${policyId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(postData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     console.log("Policy updated successfully:", result);

  //     setSuccessMessage("Policy updated successfully!");
  //     setIsSuccessModalOpen(true);

  //     // Reset form fields
  //     setSections([{ id: Date.now(), values: {} }]);
  //     setPolicyName("");
  //     setSelectedOptions({});
  //     setDataFields({
  //       "Opportunity Name": false,
  //       "Lead Source": false,
  //       Close_Date: false,
  //       "Account Name": false,
  //       Amount: false,
  //       Age: false,
  //       Type: false,
  //       Probability: false,
  //       Created_Date: false,
  //     });
  //     setCheckboxSelections([
  //       { label: "Sales NA", isChecked: false },
  //       { label: "Management", isChecked: false },
  //     ]);
  //     setDescription("");
  //     setActionOnDataField("Account");
  //     setActionOnPermission("ReadOrWrite");
  //     setActionOnPermissionExisting("Management");
  //     setMembersBySection([[], []]);

  //     await fetchData();

  //     setTimeout(() => {
  //       setIsSaveSuccessful(false);
  //       closeModal();
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error updating policy:", error);
  //     setIsSaveSuccessful(false);
  //   }
  // };

  const handleUpdatePolicy = async () => {
    const trimmedPolicyName = policyName.trim();

    // Map the members from the sections
    const actionOnPermissionReadRevisedMember = membersBySection[0].map(
      (member) => member._id
    );
    const actionOnPermissionReadorWriteRevisedMember = membersBySection[1].map(
      (member) => member._id
    );

    // Map through sections to build the functionCallingPlusData array
    const functionCallingPlusData = sections.map((section) => ({
      actionOnDataField: section.values["actionOnDataField"] || "",
      actionOnPermissionReadRevisedMember,
      actionOnPermissionReadorWriteRevisedMember,
      actionOnPrivacyFilteringAction:
        section.values["privacyActionOption"] || "",
      actionOnPrivacyFilteringTransformValue:
        section.values.actionOnPrivacyFilteringTransformValue ||
        "Transformation privacy",
      actionOnAttributeFilteringAttribute:
        section.values["attributeOption"] || "",
      actionOnAttributeFilteringValue:
        section.values["attributeValueOption"] || "",
      actionOnAttributeFilteringAction:
        section.values["attributeActionOption"] || "",
      actionOnAttributeFilteringTransformValue:
        section.values.actionOnAttributeFilteringTransformValue ||
        "Transformation Attribute",
    }));

    const postData = {
      policyName: trimmedPolicyName,
      query: selectedOptions["netSales"],
      targetApplication: selectedOptions["targetLocation"],
      genAiApp: selectedOptions["genAiApp"],
      selectApiName: selectedOptions["selectApiName"],
      selectApiDescription: description,
      selectApiDataFields: Object.keys(dataFields).map((key) => ({
        label: key,
        isChecked: dataFields[key],
      })),
      functionCallingPlusData,
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

      // Reset form fields
      setSections([{ id: Date.now(), values: {} }]);
      setPolicyName("");
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
      setMembersBySection([[], []]);

      await fetchData();

      setTimeout(() => {
        setIsSaveSuccessful(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error updating policy:", error);
      setIsSaveSuccessful(false);
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
    if (errorMessage) {
      setErrorMessage("");
    }
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

  const handleDropdownClick1 = (sectionId, index) => {
    setOpenDropdown(
      openDropdown === `${sectionId}-${index}` ? null : `${sectionId}-${index}`
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

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleOptionClick = (dropdownId, option) => {
    setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
    setOpenDropdown(null);
    if (errorMessage) {
      setErrorMessage("");
    }
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

  const handleCheckboxSelectionsChange = (label, sectionIndex) => {
    setCheckboxSelections((prevSelections) =>
      prevSelections.map((item) =>
        item.label === label ? { ...item, isChecked: !item.isChecked } : item
      )
    );

    // Update the sections with the new checkbox state
    setSections((prevSections) =>
      prevSections.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              values: {
                ...section.values,
                actionOnPermissionRevised: checkboxSelections.map((item) => ({
                  label: item.label,
                  isChecked: item.isChecked,
                })),
              },
            }
          : section
      )
    );
  };

  const data = {
    netSalesOptions: ["Net Sales Orders", "Total Sales Orders"],
    targetLocationOptions: ["Salesforce", "Servicenow", "Microsoft Dynamics"],
    genAiAppOptions: ["App1", "App2", "App3"],
    locationOption: ["Department", "Location"],
    privacyValueOption: ["Name", "Dob", "SSN", "None"],
    privacyActionOption: ["Anonymize", "Tokenize", "None", "De-identification"],
    attributeOption: ["Department", "Location"],
    attributeValueOption: ["Asia", "North America"],
    attributeActionOption: ["Allow", "Redact"],
    actionOnDataField: ["Opportunity name", "Account Name", "Amount", "Age"],
    selectApiName: ["Sales Opportunities", "API2", "API3", "API4"],
  };

  const items = {
    name: "Opportunity Name",
    subItems: [
      { name: "Oppurtunity Name" },
      { name: "Account Name" },
      { name: "Account" },
      { name: "Age" },
    ],
  };

  const Sales = {
    name: "Sales Opportunities",
    subItems: [{ name: "App1" }, { name: "App2" }, { name: "App3" }],
  };

  // console.log(members);

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
          <h2 className="text-sm text-[#2F3A45] font-poppins ">
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
          value={policyName}
          onChange={handlePolicyNameChange}
          className="w-full rounded-md shadow-sm px-2.5 py-2.5 border-2 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-black text-white font-semibold placeholder-gray-500"
          placeholder="Enter policy name"
          readOnly={isEditMode}
        />
      </div>
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
              className="bg-[#2F3A45] text-[#000000] px-2 rounded hover:text-customGreen"
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
                      {/* <Dropdown
                        items={Sales}
                        iconColor="text-customIconColor"
                        backgroundColor="bg-black"
                        textColor="text-white"
                        selectedItem={selectedApiName}
                        onItemClick={(subItemName) => {
                          console.log("Selected:", subItemName);
                          setSelectedApiName(subItemName);
                        }}
                      /> */}
                      <PrivacyCustomDropdown
                        options={data.selectApiName || []}
                        placeholder="Select API"
                        isOpen={openDropdown === "selectApiName"}
                        onDropdownClick={() =>
                          handleDropdownClick("selectApiName")
                        }
                        selectedOption={selectedOptions["selectApiName"]}
                        onOptionClick={(option) =>
                          handleOptionClick("selectApiName", option)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full sm:w-full md:w-full lg:w-[25%] xl:w-[25%] 2xl:w-[25%] mb-4 md:mb-0 pl-[2px] pr-[2px] ipad-width">
                    <label className="py-3.5 text-[#31E48F] text-lg font-poppins font-semibold">
                      Description
                    </label>

                    <input
                      type="text"
                      placeholder="Enter Description"
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
              className="bg-[#2F3A45] text-[#000000] px-2  rounded hover:text-customGreen"
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
        sections.map((section, index) => (
          <div key={index} className=" bg-customBlack  opacity-100 ">
            <div className="page-center">
              <div className=" w-full md:w-[35%]  pt-[1rem] ">
                <div className="flex items-baseline  px-4 pt-[1rem] ml-2 gap-2.5">
                  <span className="text-[#31B476]  mr-2 font-poppins  font-semibold">
                    DataField
                  </span>

                  <CustomDropdown
                    options={data.actionOnDataField || []}
                    placeholder="Select Data Field"
                    isOpen={openDropdown === `${section.id}-5`}
                    onDropdownClick={() => handleDropdownClick1(section.id, 5)}
                    selectedOption={section.values["actionOnDataField"] || ""}
                    setSelectedOption={(value) =>
                      handleDropdownChange(
                        section.id,
                        "actionOnDataField",
                        value
                      )
                    }
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
                              <th className="px-2.5 py-2 border border-customBorderColor bg-[#6a7581] text-customWhite font-poppins font-semibold">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {membersBySection.map(
                              (sectionMembers, sectionIndex) => (
                                <tr key={sectionIndex}>
                                  {/* Section Column */}
                                  <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                    {sectionIndex === 0 && <span>Read</span>}
                                    {sectionIndex === 1 && (
                                      <span>Read + Write</span>
                                    )}
                                  </td>

                                  <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                    {sectionIndex === 0 && (
                                      <div className="relative">
                                        <div className="flex flex-wrap justify-between">
                                          <div className="px-4 flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[20%] xl:basis-[20%] 2xl:basis-[20%]">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleClick("Vinod")
                                              }
                                              className={`border border-green-500 font-poppins font-normal text-[#FFFFFF] px-4  py-2 mb-4 ${
                                                selectedItems.includes("Vinod")
                                                  ? "text-white bg-[#0a854b]"
                                                  : "bg-black"
                                              }`}
                                            >
                                              Vinod
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleClick("Rajat")
                                              }
                                              className={`border border-green-500 font-poppins font-normal text-[#FFFFFF] px-4 py-2  ${
                                                selectedItems.includes("Rajat")
                                                  ? "text-white bg-[#0a854b]"
                                                  : "bg-black"
                                              }`}
                                            >
                                              Rajat
                                            </button>
                                          </div>
                                          <div className="px-4 flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[30%] xl:basis-[30%] 2xl:basis-[30%]">
                                            <button
                                              onClick={() =>
                                                toggleMembership(index)
                                              }
                                            >
                                              <ThreeDotsButton />
                                            </button>
                                          </div>
                                        </div>

                                        {/* Show membership modal only if this row's index is open */}
                                        {openMembershipIndex === index && (
                                          <>
                                            {/* Overlay */}
                                            <div
                                              className="fixed inset-0 bg-black opacity-50 z-40"
                                              onClick={() =>
                                                toggleMembership(index)
                                              } // Close when clicking outside
                                            />

                                            {/* Membership Modal */}
                                            <div
                                              className="fixed inset-0 flex items-center justify-center z-50"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              } // Prevent clicks inside modal from closing it
                                            >
                                              <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                                                {/* Close button */}
                                                <button
                                                  className="absolute top-2 right-2 text-green-400 bg-[#FFFFFF] rounded-full"
                                                  onClick={() =>
                                                    toggleMembership(index)
                                                  }
                                                  style={{
                                                    width: "29px",
                                                    height: "29px",
                                                    background: "#FFFFFF",
                                                    border:
                                                      "2px solid #31B47663",
                                                    opacity: 1,
                                                  }}
                                                >
                                                  &times;
                                                </button>

                                                <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg">
                                                  <span className="text-base font-poppins font-semibold">
                                                    Group Membership
                                                  </span>
                                                </div>
                                                <div className="p-4">
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
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    )}
                                    {sectionIndex === 1 && (
                                      <div className="relative">
                                        <div className="flex flex-wrap justify-between">
                                          <div className="px-4 flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[20%] xl:basis-[20%] 2xl:basis-[20%]">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleClick("Vinod1")
                                              }
                                              className={`border border-green-500 font-poppins font-normal text-[#FFFFFF] px-4 py-2 mb-4 ${
                                                selectedItems.includes("Vinod1")
                                                  ? "text-white bg-[#0a854b]"
                                                  : "bg-black"
                                              }`}
                                            >
                                              Vinod
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleClick("Rajat1")
                                              }
                                              className={`border border-green-500 font-poppins font-normal text-[#FFFFFF] px-4 py-2  ${
                                                selectedItems.includes("Rajat1")
                                                  ? "text-white bg-[#0a854b]"
                                                  : "bg-black"
                                              }`}
                                            >
                                              Rajat
                                            </button>
                                          </div>
                                          <div className="px-4 flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[30%] xl:basis-[30%] 2xl:basis-[30%]">
                                            <div className="">
                                              <button
                                                onClick={() =>
                                                  toggleMembership(index)
                                                }
                                              >
                                                <ThreeDotsButton />
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Show membership modal only if this row's index is open */}
                                        {openMembershipIndex === index && (
                                          <>
                                            {/* Overlay */}
                                            <div
                                              className="fixed inset-0 bg-black opacity-50 z-40"
                                              onClick={() =>
                                                toggleMembership(index)
                                              } // Close when clicking outside
                                            />

                                            {/* Membership Modal */}
                                            <div
                                              className="fixed inset-0 flex items-center justify-center z-50"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              } // Prevent clicks inside modal from closing it
                                            >
                                              <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                                                {/* Close button */}
                                                <button
                                                  className="absolute top-2 right-2 text-green-400 bg-[#FFFFFF] rounded-full"
                                                  onClick={() =>
                                                    toggleMembership(index)
                                                  }
                                                  style={{
                                                    width: "29px",
                                                    height: "29px",
                                                    background: "#FFFFFF",
                                                    border:
                                                      "2px solid #31B47663",
                                                    opacity: 1,
                                                  }}
                                                >
                                                  &times;
                                                </button>

                                                <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg">
                                                  <span className="text-base font-poppins font-semibold">
                                                    Group Membership
                                                  </span>
                                                </div>
                                                <div className="p-4">
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
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </td>

                                  <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                    {/* Display section-specific members */}
                                    {sectionMembers.length > 0 ? (
                                      sectionMembers.map(
                                        (member, memberIndex) => (
                                          <div
                                            key={memberIndex}
                                            className="flex justify-between items-center mb-2"
                                          >
                                            <span className="text-white block text-base font-poppins font-semibold">
                                              {member.name}
                                            </span>
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
                                              onClick={() =>
                                                removeMember(
                                                  memberIndex,
                                                  sectionIndex
                                                )
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={
                                                  hoveredRemoveIndex === index
                                                    ? faClose
                                                    : faClose
                                                }
                                                className="transition-transform duration-1000 ease-in-out"
                                              />
                                            </button>
                                          </div>
                                        )
                                      )
                                    ) : (
                                      <span></span>
                                    )}

                                    {members.length > 0 ? (
                                      members.map((member, memberIndex) => (
                                        <div
                                          key={member._id} // Assuming _id is unique for each member
                                          className="flex justify-between items-center mb-2"
                                        >
                                          <span className="text-white block text-base font-poppins font-semibold">
                                            {member.name}
                                          </span>
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
                                            onClick={() =>
                                              removeMember(
                                                memberIndex,
                                                sectionIndex
                                              )
                                            }
                                          >
                                            <FontAwesomeIcon
                                              icon={
                                                hoveredRemoveIndex === index
                                                  ? faClose
                                                  : faClose
                                              }
                                              className="transition-transform duration-1000 ease-in-out"
                                            />
                                          </button>
                                        </div>
                                      ))
                                    ) : (
                                      <span></span>
                                    )}
                                  </td>
                                  <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                    <button
                                      onClick={() =>
                                        toggleMembershipEdit(sectionIndex)
                                      }
                                      className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
                                    >
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        className="transition ease-out duration-300 hover:transform hover:scale-110 "
                                      />
                                    </button>

                                    {/* Modal for editing section members */}
                                    {openEditMembershipIndex ===
                                      sectionIndex && (
                                      <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
                                        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                                          <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                                            <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg relative">
                                              <span className="text-base font-poppins font-semibold">
                                                Group Membership
                                              </span>
                                              <button
                                                className="absolute top-2 right-2 text-green-400 bg-white rounded-full"
                                                onClick={() =>
                                                  toggleMembershipEdit(
                                                    sectionIndex
                                                  )
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
                                              {/* Display section-specific members inside modal */}
                                              {membersBySection[
                                                sectionIndex
                                              ].map((member, memberIndex) => (
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
                                                    <div className="flex flex-col ml-3">
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
                                                    className="flex items-center justify-center text-green-400 bg-gray-700 rounded-full"
                                                    onClick={() =>
                                                      removeMember(
                                                        memberIndex,
                                                        sectionIndex
                                                      )
                                                    }
                                                    style={{
                                                      width: "29px",
                                                      height: "29px",
                                                      background: "#FFFFFF00",
                                                      border:
                                                        "2px solid #31B47663",
                                                    }}
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faMinus}
                                                    />
                                                  </button>
                                                </div>
                                              ))}

                                              {/* Add new member input */}
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

                                              {/* Display search results */}
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
                                                        onClick={() =>
                                                          addMember(
                                                            user,
                                                            sectionIndex
                                                          )
                                                        } // Add member to correct section
                                                        style={{
                                                          width: "29px",
                                                          height: "29px",
                                                          background:
                                                            "#FFFFFF00",
                                                          border:
                                                            "2px solid #31B47663",
                                                        }}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faPlus}
                                                        />
                                                      </button>
                                                    </div>
                                                  ))}
                                                </div>
                                              )}

                                              <div className="flex justify-end gap-4 mt-4 group">
                                                <button
                                                  onClick={() =>
                                                    toggleMembershipEdit(
                                                      sectionIndex
                                                    )
                                                  }
                                                  // onClick={handleSave}
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
                                                  onClick={() =>
                                                    toggleMembershipEdit(
                                                      sectionIndex
                                                    )
                                                  }
                                                  className="text-gray-400"
                                                >
                                                  Cancel
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
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
                              {/* <th className=" py-2 border border-customBorderColor bg-[#1b1e26] text-customWhite font-poppins font-semibold">
                                Category
                              </th> */}
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
                              {/* <td
                                className=" py-2.5 border border-customBorderColor text-customWhite bg-black "
                                style={{ width: "200px" }}
                              >
                                <CustomDropdown
                                  options={data.privacyValueOption || []}
                                  // width={"169px "}
                                  placeholder="None"
                                  isOpen={openDropdown === `${section.id}-0`}
                                  onDropdownClick={() =>
                                    handleDropdownClick1(section.id, 0)
                                  }
                                  selectedOption={
                                    section.values["privacyValueOption"] || ""
                                  }
                                  setSelectedOption={(value) =>
                                    handleDropdownChange(
                                      section.id,
                                      "privacyValueOption",
                                      value
                                    )
                                  }
                                />
                              </td> */}
                              <td
                                className=" py-2.5 border border-customBorderColor text-customWhite bg-black"
                                style={{ width: "200px" }}
                              >
                                <CustomDropdown
                                  options={data.privacyActionOption || []}
                                  placeholder="Select Contains"
                                  isOpen={openDropdown === `${section.id}-1`}
                                  onDropdownClick={() =>
                                    handleDropdownClick1(section.id, 1)
                                  }
                                  selectedOption={
                                    section.values["privacyActionOption"] || ""
                                  }
                                  setSelectedOption={(value) =>
                                    handleDropdownChange(
                                      section.id,
                                      "privacyActionOption",
                                      value
                                    )
                                  }
                                />
                              </td>
                              <td className=" py-2.5 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                            </tr>
                            <tr>
                              <td className=" py-4 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                              <td className=" py-4 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                            </tr>
                            <tr>
                              <td className=" py-4 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                              <td className=" py-4 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                            </tr>
                            <tr>
                              <td className=" py-4 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                              <td className=" py-4 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                            </tr>
                            <tr>
                              <td className=" py-4 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                              <td className=" py-4 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
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
                              <td
                                className="pl-4 py-2 border border-customBorderColor text-customWhite bg-black"
                                style={{ width: "200px" }}
                              >
                                <CustomDropdown
                                  options={data.attributeOption || []}
                                  placeholder="Select Option"
                                  isOpen={openDropdown === `${section.id}-2`}
                                  onDropdownClick={() =>
                                    handleDropdownClick1(section.id, 2)
                                  }
                                  selectedOption={
                                    section.values["attributeOption"] || ""
                                  }
                                  setSelectedOption={(value) =>
                                    handleDropdownChange(
                                      section.id,
                                      "attributeOption",
                                      value
                                    )
                                  }
                                />
                              </td>
                              <td
                                className="pl-4 py-2 border border-customBorderColor text-customWhite bg-black"
                                style={{ width: "200px" }}
                              >
                                <CustomDropdown
                                  options={data.attributeValueOption || []}
                                  placeholder="Select Option"
                                  isOpen={openDropdown === `${section.id}-3`}
                                  onDropdownClick={() =>
                                    handleDropdownClick1(section.id, 3)
                                  }
                                  selectedOption={
                                    section.values["attributeValueOption"] || ""
                                  }
                                  setSelectedOption={(value) =>
                                    handleDropdownChange(
                                      section.id,
                                      "attributeValueOption",
                                      value
                                    )
                                  }
                                />
                              </td>
                              <td
                                className="pl-4  py-2 border border-customBorderColor text-customWhite bg-black"
                                style={{ width: "200px" }}
                              >
                                <CustomDropdown
                                  options={data.attributeActionOption || []}
                                  placeholder="Select Option"
                                  isOpen={openDropdown === `${section.id}-4`}
                                  onDropdownClick={() =>
                                    handleDropdownClick1(section.id, 4)
                                  }
                                  selectedOption={
                                    section.values["attributeActionOption"] ||
                                    ""
                                  }
                                  setSelectedOption={(value) =>
                                    handleDropdownChange(
                                      section.id,
                                      "attributeActionOption",
                                      value
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
            setMembersBySection([[], []]);
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
          <div className="bg-[#2E313B] p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-poppins font-semibold mb-4 text-center text-white">
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
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Policy Name
                  </label>
                  <input
                    type="text"
                    id="policyName"
                    value={policyName}
                    onChange={handlePolicyNameChange}
                    className="w-full rounded-md shadow-sm px-4 py-2 border-2 border-gray-400 focus:border-green-500 focus:ring-green-500 bg-[#393C46] text-white transition-all duration-200 ease-in-out"
                    placeholder="Enter policy name"
                  />
                </div>
                <div className="mb-4">
                  <p className="text-sm mb-2 text-white">
                    <strong>Selected Options:</strong>
                  </p>
                  <ul>
                    <div className="">
                      <div className="bg-[#2E313B] p-4 rounded-md shadow-md">
                        {Object.entries(selectedOptions).map(([key, value]) => (
                          <li key={key} className="text-[#c4c9d0]">
                            {key}: {value}
                          </li>
                        ))}
                        <li className="text-[#c4c9d0]">
                          Description: {description}
                        </li>
                      </div>
                    </div>

                    <li className="">
                      <div className="bg-[#2E313B] p-4 rounded-md shadow-md">
                        <h1 className="font-poppins font-semibold text-white">
                          Permission
                        </h1>
                        <li className="text-[#c4c9d0]">
                          Action on Data Field: {actionOnDataField}
                        </li>
                        <li className="text-[#c4c9d0]">
                          Action on Permission: {actionOnPermission}
                        </li>
                        <li className="text-[#c4c9d0]">
                          Action on Permission Existing:{" "}
                          {actionOnPermissionExisting}
                        </li>
                      </div>
                    </li>

                    {sections.map((section) => (
                      <li key={section.id} className="mb-6">
                        <div className="bg-[#393C46] p-4 rounded-md shadow-lg">
                          <div className="mb-2">
                            <h3 className="font-semibold text-lg text-white">
                              {/* Section {section.id} */}
                            </h3>
                          </div>
                          {/* <div className="text-[#c4c9d0]">
                            <strong>Privacy Category:</strong>{" "}
                            {section.values["privacyValueOption"]}
                          </div> */}
                          <div className="text-[#c4c9d0]">
                            <strong>Privacy Action:</strong>{" "}
                            {section.values["privacyActionOption"]}
                          </div>
                          <p className="text-[#c4c9d0]">
                            <span>Transformation Value:</span> Transformation
                          </p>
                          <div className="text-[#c4c9d0]">
                            <strong>Attribute:</strong>{" "}
                            {section.values["attributeOption"]}
                          </div>
                          <div className="text-[#c4c9d0]">
                            <strong>Attribute Value:</strong>{" "}
                            {section.values["attributeValueOption"]}
                          </div>
                          <div className="text-[#c4c9d0]">
                            <strong>Attribute Action:</strong>{" "}
                            {section.values["attributeActionOption"]}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-center mb-4">
                    {errorMessage}
                  </p>
                )}
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
              {successMessage.includes("Failed") ? "Failed" : "Success"}
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
                      {item.policyName}
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
