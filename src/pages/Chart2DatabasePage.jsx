import React, { useEffect, useRef, useState } from 'react';
import './../App.css';
import CustomDropdown from '../components/CustomDropdown';
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
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from '../components/Dropdown';
import PrivacyCustomDropdown from '../components/PrivacyCustomDropdown';
import Modal from '../components/Model';
import ThreeDotsButton from '../components/ThreeDotsButton';
import userIcon from '../assets/usericon.svg';
import iconsmodel from '../assets/save.svg';
import { BASE_URL } from '../services/api';
import ConfirmationModal from '../components/ConfirmationModal';
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
  const [membersBySection, setMembersBySection] = useState([[], [], [], []]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeleteModel, setDeleteModel] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  // const [errorMessages, setErrorMessages] = useState({});

  const [errorMessageMember, setErrorMessageMember] = useState('');

  const [loading, setLoading] = useState(false);

  const [policyId, setPolicyId] = useState(null);

  const toggleEditMembership = (sectionIndex) => {
    setOpeneditMembershipIndex(
      openEditMembershipIndex === sectionIndex ? null : sectionIndex
    );
  };

  const [sectionsPlus, setSectionsPlus] = useState([
    { id: Date.now(), values: {} },
  ]);

  const handleDropdownClick1 = (sectionId, index) => {
    setOpenDropdown(
      openDropdown === `${sectionId}-${index}` ? null : `${sectionId}-${index}`
    );
  };

  const toggleeditMembershipPermission = () => {
    setShowEditMembershipPermission(!showEditMembershipPermission);
  };

  useEffect(() => {
    if (policyId) {
      setIsEditMode(true);
      handleEditButtonClick(policyId);
    }
  }, [policyId]);

  // const toggleMembership = () => {
  //   setShowMembership(!showMembership);
  // };

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

  const [openMembershipIndex, setOpenMembershipIndex] = useState(null);
  const [openMembershipPermissonIndex, setOpenMembershipPermissonIndex] =
    useState(null);
  const [openEditMembershipIndex, setOpeneditMembershipIndex] = useState(null);

  const [openEditMembershipIndexRevised, setOpeneditMembershipIndexRevised] =
    useState(null);

  const [searchResults, setSearchResults] = useState([]);
  const [policyName, setPolicyName] = useState('');
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const memberIds = members.map((member) => member._id);

  const topRef = useRef(null);

  const [filteredMembers, setFilteredMembers] = useState({
    select: [],
    insert: [],
    update: [],
    delete: [],
  });

  // console.log(membersBySection, "membersBySectiontext2sql");

  console.log(sectionsPlus, 'sectionsPlus');

  const [isListVisibleSelect, setIsListVisibleSelect] = useState(null);
  const [isListVisibleInsert, setIsListVisibleInsert] = useState(null);
  const [isListVisibleUpdate, setIsListVisibleUpdate] = useState(null);
  const [isListVisibleDelete, setIsListVisibleDelete] = useState(null);

  const toggleListVisibilitySelect = (sectionIndex) => {
    setIsListVisibleSelect(
      isListVisibleSelect === sectionIndex ? null : sectionIndex
    );
  };

  const toggleListVisibilityInsert = (sectionIndex) => {
    setIsListVisibleInsert(
      isListVisibleInsert === sectionIndex ? null : sectionIndex
    );
  };

  const toggleListVisibilityUpdate = (sectionIndex) => {
    setIsListVisibleUpdate(
      isListVisibleUpdate === sectionIndex ? null : sectionIndex
    );
  };

  const toggleListVisibilityDelete = (sectionIndex) => {
    setIsListVisibleDelete(
      isListVisibleDelete === sectionIndex ? null : sectionIndex
    );
  };

  const toggleMembership = (index) => {
    setOpenMembershipIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleMembershipPermission = (index) => {
    setOpenMembershipPermissonIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const toggleMembershipEdit = (index) => {
    setOpeneditMembershipIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const toggleMembershipEditRevised = (index) => {
    setOpeneditMembershipIndexRevised((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const handlePolicyNameChange = (e) => {
    setPolicyName(e.target.value);
  };

  const fetchData = async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data/PolicyManagerText2SQL?page=${page}&limit=6`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setTableData(result.data);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const handleSearch = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      try {
        const response = await fetch(
          `${BASE_URL}/api/data/members?query=${query}&page=${currentPage}&limit=100`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }

        const data = await response.json();
        const filteredUsers = data.data.filter((user) => {
          const userNameLower = user.name.toLowerCase();
          return query === userNameLower || userNameLower.startsWith(query);
        });

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
        console.error('Error fetching members:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleDropdownChange = (sectionId, dropdownType, value) => {
    setSectionsPlus(
      sectionsPlus.map((section) =>
        section.id === sectionId
          ? { ...section, values: { ...section.values, [dropdownType]: value } }
          : section
      )
    );
    setOpenDropdown(null);

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleConfirm = async () => {
    const trimmedPolicyName = policyName.trim();

    const configurePermissionsSelectRevised = membersBySection[0].map(
      (member) => member._id
    );
    const configurePermissionsInsertRevised = membersBySection[1].map(
      (member) => member._id
    );
    const configurePermissionsUpdateRevised = membersBySection[2].map(
      (member) => member._id
    );
    const configurePermissionsDeleteRevised = membersBySection[3].map(
      (member) => member._id
    );

    const configurePermissionsSelectExisting = membersBySection[0].map(
      (member) => member._id
    );
    const configurePermissionsInsertExisting = membersBySection[1].map(
      (member) => member._id
    );
    const configurePermissionsUpdateExisting = membersBySection[2].map(
      (member) => member._id
    );
    const configurePermissionsDeleteExisting = membersBySection[3].map(
      (member) => member._id
    );

    const cleanSection = (section) => {
      return Object.fromEntries(
        Object.entries(section).filter(([_, v]) => v !== '')
      );
    };

    const plusData = sectionsPlus.map((section) =>
      cleanSection({
        ONname: section.values['dataFeildOption'] || '',
        ONprivacyFilteringAction: section.values['privacyActionOption'] || '',
        ONprivacyFilteringTransformValue: 'transformation value',
        ONattributeFilteringAttribute: section.values['attributeOption'] || '',
        ONattributeFilteringValue: section.values['attributeValueOption'] || '',
        ONattributeFilteringAction:
          section.values['attributeActionOption'] || '',
        ONattributeFilteringTransformationValue: '',
        rowLevelFilteringBasedonValue:
          section.values['rowLevelFilterinOption'] || '',
      })
    );

    const postData = {
      policyName: trimmedPolicyName,
      configurePermissionsSelectExisting,
      configurePermissionsSelectRevised,
      configurePermissionsInsertExisting,
      configurePermissionsInsertRevised,
      configurePermissionsUpdateExisting,
      configurePermissionsUpdateRevised,
      configurePermissionsDeleteExisting,
      configurePermissionsDeleteRevised,
      ONdataStore: selectedOptions['dataStoreOptions'],
      ONtableView: selectedOptions['tableOptions'],
      plusData,
    };

    console.log(postData);

    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/data/PolicyManagerText2SQL`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await fetchData();

      const result = await response.json();
      console.log('Policy saved successfully:', result);
      setIsSaveSuccessful(true);
      setSelectedOptions({});
      setPolicyName('');
      setMembersBySection([[], [], [], []]);
      setSectionsPlus([{ id: Date.now(), values: {} }]);

      setTimeout(() => {
        setIsSaveSuccessful(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error('Error saving policy:', error);
      setIsSaveSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  const [showList, setShowList] = useState(
    Array(membersBySection.length).fill(false)
  );

  // const addMember = (user, sectionIndex) => {
  //   const updatedMembersBySection = [...membersBySection];

  //   updatedMembersBySection[sectionIndex] = [
  //     ...updatedMembersBySection[sectionIndex],
  //     user,
  //   ];

  //   setMembersBySection(updatedMembersBySection);
  //   setSearchResults(searchResults.filter((u) => u._id !== user._id));
  //   setSearchQuery('');
  // };

  const addMember = (user, sectionIndex) => {
    const updatedMembersBySection = [...membersBySection];

    // Check if the user already exists in the section to prevent duplicates
    const isDuplicate = updatedMembersBySection[sectionIndex].some(
      (member) => member._id === user._id
    );

    if (isDuplicate) {
      // Set an error message if the member already exists
      setErrorMessageMember('Member already exists');
    } else {
      // Add the member if not a duplicate
      updatedMembersBySection[sectionIndex] = [
        ...updatedMembersBySection[sectionIndex],
        user,
      ];

      setMembersBySection(updatedMembersBySection);
      setSearchResults(searchResults.filter((u) => u._id !== user._id));
      setSearchQuery('');
      setErrorMessageMember('');
    }
  };

  // Clear error message after a delay
  useEffect(() => {
    if (errorMessageMember) {
      const timer = setTimeout(() => setErrorMessageMember(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessageMember]);

  console.log(errorMessageMember, 'errorMessageMember');

  const removeMember = (memberIndex, sectionIndex) => {
    const updatedMembersBySection = [...membersBySection];
    updatedMembersBySection[sectionIndex].splice(memberIndex, 1);
    setMembersBySection(updatedMembersBySection);
  };

  const handleSavePolicy = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setDeleteModel(false);
    setIsModalOpen(false);
    setIsSaveSuccessful(false);
    setIsEditMode(false);
    setIsSuccessModalOpen(false);
  };

  // const handleEditButtonClick = async (policyId) => {
  //   topRef.current?.scrollIntoView({ behavior: "smooth" });
  //   setIsSaveSuccessful(false);

  //   try {
  //     const policyToEdit = tableData.find((policy) => policy._id === policyId);

  //     if (policyToEdit) {
  //       setPolicyName(policyToEdit.policyName);
  //       setSelectedOptions({
  //         dataStoreOptions: policyToEdit.ONdataStore,
  //         tableOptions: policyToEdit.ONtableView,
  //       });

  //       const memberIds = [
  //         ...policyToEdit.configurePermissionsSelectRevised,
  //         ...policyToEdit.configurePermissionsInsertRevised,
  //         ...policyToEdit.configurePermissionsUpdateRevised,
  //         ...policyToEdit.configurePermissionsDeleteRevised,
  //       ];

  //       if (memberIds.length > 0) {
  //         const queryParams = new URLSearchParams({
  //           ids: memberIds.join(","),
  //         }).toString();

  //         const response = await fetch(
  //           `${BASE_URL}/api/data/members?${queryParams}`,
  //           {
  //             method: "GET",
  //             headers: { "Content-Type": "application/json" },
  //             credentials: "include",
  //           }
  //         );
  //         const memberData = await response.json();

  //         const sections = [
  //           policyToEdit.configurePermissionsSelectRevised,
  //           policyToEdit.configurePermissionsInsertRevised,
  //           policyToEdit.configurePermissionsUpdateRevised,
  //           policyToEdit.configurePermissionsDeleteRevised,
  //         ];

  //         const organizedMembers = sections.map((section) =>
  //           memberData.data.filter((member) => section.includes(member._id))
  //         );

  //         const sectionsData = policyToEdit.plusData.map((section, index) => ({
  //           id: Date.now() + index,
  //           values: {
  //             dataFeildOption: section.ONname,
  //             privacyActionOption: section.ONprivacyFilteringAction,
  //             attributeOption: section.ONattributeFilteringAttribute,
  //             attributeValueOption: section.ONattributeFilteringValue,
  //             attributeActionOption: section.ONattributeFilteringAction,
  //             rowLevelFilterinOption: section.rowLevelFilteringBasedonValue,
  //           },
  //         }));
  //         console.log(sectionsData, "sectionsData");
  //         setSectionsPlus(sectionsData);

  //         setMembersBySection(organizedMembers);
  //         setPolicyId(policyId);
  //       } else {
  //         setPolicyId(policyId);
  //         console.log("No members found in the permission fields.");
  //       }
  //     } else {
  //       console.log("No policy found with the given policyId.");
  //     }
  //   } catch (error) {
  //     console.error("Error during fetchMemberData:", error);
  //   }
  // };

  const handleEditButtonClick = async (policyId) => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsSaveSuccessful(false);

    try {
      const policyToEdit = tableData.find((policy) => policy._id === policyId);

      if (policyToEdit) {
        setPolicyName(policyToEdit.policyName);
        setSelectedOptions({
          dataStoreOptions: policyToEdit.ONdataStore,
          tableOptions: policyToEdit.ONtableView,
        });
        const sections = [
          policyToEdit.configurePermissionsSelectRevised,
          policyToEdit.configurePermissionsInsertRevised,
          policyToEdit.configurePermissionsUpdateRevised,
          policyToEdit.configurePermissionsDeleteRevised,
        ];

        const organizedMembers = sections.map((section) => section);

        const sectionsData = policyToEdit.plusData.map((section, index) => ({
          id: Date.now() + index,
          values: {
            dataFeildOption: section.ONname,
            privacyActionOption: section.ONprivacyFilteringAction,
            attributeOption: section.ONattributeFilteringAttribute,
            attributeValueOption: section.ONattributeFilteringValue,
            attributeActionOption: section.ONattributeFilteringAction,
            rowLevelFilterinOption: section.rowLevelFilteringBasedonValue,
          },
        }));
        console.log(sectionsData, 'sectionsData');
        setSectionsPlus(sectionsData);

        setMembersBySection(organizedMembers);
        setPolicyId(policyId);
      } else {
        console.log('No policy found with the given policyId.');
      }
    } catch (error) {
      console.error('Error during handleEditButtonClick:', error);
    }
  };

  const handleUpdatePolicy = async () => {
    setIsSaveSuccessful(false);

    const trimmedPolicyName = policyName.trim();

    const configurePermissionsSelectRevised = membersBySection[0].map(
      (member) => member._id
    );
    const configurePermissionsInsertRevised = membersBySection[1].map(
      (member) => member._id
    );
    const configurePermissionsUpdateRevised = membersBySection[2].map(
      (member) => member._id
    );
    const configurePermissionsDeleteRevised = membersBySection[3].map(
      (member) => member._id
    );

    const cleanSection = (section) => {
      return Object.fromEntries(
        Object.entries(section).filter(([_, v]) => v !== '')
      );
    };

    // const plusData = sectionsPlus.map((section) => ({
    //   ONname: section.values["dataFeildOption"] || "",
    //   ONprivacyFilteringAction: section.values["privacyActionOption"] || "",
    //   ONattributeFilteringAttribute: section.values["attributeOption"] || "",
    //   ONattributeFilteringValue: section.values["attributeValueOption"],
    //   ONattributeFilteringAction: section.values["attributeActionOption"] || "",
    //   rowLevelFilteringBasedonValue:
    //     section.values["rowLevelFilterinOption"] || "",
    // }));

    const plusData = sectionsPlus.map((section) =>
      cleanSection({
        ONname: section.values['dataFeildOption'] || '',
        ONprivacyFilteringAction: section.values['privacyActionOption'] || '',
        ONattributeFilteringAttribute: section.values['attributeOption'] || '',
        ONattributeFilteringValue: section.values['attributeValueOption'] || '',
        ONattributeFilteringAction:
          section.values['attributeActionOption'] || '',
        rowLevelFilteringBasedonValue:
          section.values['rowLevelFilterinOption'] || '',
      })
    );

    const updatedPolicy = {
      policyName: trimmedPolicyName,
      configurePermissionsSelectRevised,
      configurePermissionsInsertRevised,
      configurePermissionsUpdateRevised,
      configurePermissionsDeleteRevised,
      ONdataStore: selectedOptions['dataStoreOptions'],
      ONtableView: selectedOptions['tableOptions'],
      plusData,
    };

    console.log('Updating policy with ID:', policyId);

    if (!policyId) {
      console.error('Invalid policy ID.');
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/data/PolicyManagerText2SQL/${policyId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPolicy),
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Policy updated successfully:', result);

      setSuccessMessage('Policy updated successfully!');
      setIsSuccessModalOpen(true);
      setSelectedOptions({});
      setPolicyName('');
      setMembersBySection([[], [], [], []]);
      setPolicyId(null);
      setSectionsPlus([{ id: Date.now(), values: {} }]);

      await fetchData();

      setTimeout(() => {
        setIsSaveSuccessful(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error('Error updating policy:', error);
      setIsSaveSuccessful(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedPolicyId(id);
    setDeleteModel(true);
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data/PolicyManagerText2SQL/${selectedPolicyId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete policy');
      }

      console.log('Policy deleted successfully');

      await fetchData();
      setDeleteModel(false);
    } catch (error) {
      console.error('Error deleting policy:', error);
    }
  };

  const handleDownloadButtonClick = (id) => {
    const policyToDownload = tableData.find((policy) => policy._id === id);

    if (policyToDownload) {
      const dataToDownload = JSON.stringify(policyToDownload, null, 2);
      const blob = new Blob([dataToDownload], { type: 'application/json' });
      saveAs(blob, `policy_${id}.json`);

      console.log('Data downloaded successfully');
    } else {
      console.error('Policy not found');
    }
  };
  console.log(members, 'members');

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addSection = () => {
    console.log(sections, 'first');
    setSections([...sections, { id: Date.now(), values: {} }]);
  };

  const addSectionPlus = () => {
    console.log(sections, 'first');
    setSectionsPlus([...sectionsPlus, { id: Date.now(), values: {} }]);
  };

  const removeSectionPlus = (id) => {
    setSectionsPlus(sectionsPlus.filter((section) => section.id !== id));
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

  const handleDropdownClick = (dropdownKey) => {
    if (openDropdown === dropdownKey) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownKey);
    }
  };

  const handleOptionClick = (dropdownKey, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [dropdownKey]: option,
    });
  };

  const [selectedFilteringAttribute, setSelectedFilteringAttribute] =
    useState('');

  const data = {
    dataStoreOptions: ['DB1', 'DB2', 'DB3'],
    tableOptions: ['TABLE1', 'TABLE2', 'TABLE3'],
    dataFeildOption: ['Opportunity Name', 'Account Name', 'Amount', 'Age'],
    genAiAppOptions: ['App1', 'App2', 'App3', 'App4'],
    locationOption: ['Department', 'Location'],
    privacyValueOption: ['Name', 'DOB', 'SSN', 'None'],
    privacyActionOption: ['Anonymize', 'Tokenize', 'None', 'De-Identification'],
    attributeOption: ['None', 'Department', 'Location'],
    // attributeValueOption: [
    //   'Asia',
    //   'North America',
    //   'Sales',
    //   'Human Resources',
    //   'Finance',
    //   'Operations',
    // ],
    attributeValueOption: {
      default: ['Sales', 'Human Resources', 'Finance', 'Operations'],
      Location: ['Asia', 'North America'],
    },
    attributeActionOption: ['Allow', 'Redact'],
    rowLevelFilterinOption: ['XYZ Corp', 'ABC Corp', 'DEF Corp', 'MNO Corp'],
  };

  // const filteringValues =
  //   selectedFilteringAttribute === 'Location'
  //     ? data.attributeValueOption.Location
  //     : data.attributeValueOption.default;

  // const filteringValues =
  //   selectedFilteringAttribute === 'Location'
  //     ? data.attributeValueOption.Location
  //     : selectedFilteringAttribute
  //     ? data.attributeValueOption.default
  //     : [];

  const filteringValues =
    selectedFilteringAttribute === 'Location'
      ? [...data.attributeValueOption.Location]
      : selectedFilteringAttribute === 'Department'
      ? data.attributeValueOption.default
      : [];

  const [isGroupMembershipOpen, setGroupMembershipOpen] = useState(false);
  const [isEditPermissionsOpen, setEditPermissionsOpen] = useState(false);

  const handleGroupMembershipOpen = () => {
    setGroupMembershipOpen(true);
  };

  const handleEditPermissionsOpen = () => {
    setEditPermissionsOpen(true);
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
          <h2 className="text-sm text-[#2F3A45] font-poppins ">
            Policy Manager
            <span className="text-customWhite text-sm"> / text2SQL</span>
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

      <div className="bg-dropdownBackground p-4 shadow-md mt-4 rounded-t-lg ">
        <div className="page-center">
          <div className="flex flex-wrap justify-between">
            <h2 className="text-[#31E48F] text-xs sm:text-xl md:text-xl font-poppins font-semibold px-4 text-Action">
              Configure Permissions
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
                            {membersBySection.map(
                              (sectionMembers, sectionIndex) => (
                                <tr key={sectionIndex}>
                                  {/* Section Column */}
                                  <td className="px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                    {sectionIndex === 0 && <span>Select</span>}
                                    {sectionIndex === 1 && <span>Insert</span>}
                                    {sectionIndex === 2 && <span>Update</span>}
                                    {sectionIndex === 3 && <span>Delete</span>}
                                  </td>

                                  <td className="relative px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                    {sectionIndex === 0 && (
                                      <div>
                                        <div className="flex  flex-col items-start">
                                          <div className=" flex flex-col">
                                            <span className="text-white block text-base font-poppins ">
                                              Alice Evans,
                                            </span>
                                            <span className="text-white block text-base font-poppins">
                                              Bob Rogers,
                                            </span>
                                          </div>
                                          <div className="px-4 flex">
                                            <div className="">
                                              <button
                                                onClick={() =>
                                                  toggleListVisibilitySelect(
                                                    sectionIndex
                                                  )
                                                }
                                                className="absolute top-2 right-2"
                                              >
                                                <ThreeDotsButton />
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                        {isListVisibleSelect ===
                                          sectionIndex && (
                                          <>
                                            <div
                                              className="fixed inset-0 bg-black opacity-50 z-40"
                                              onClick={() =>
                                                toggleMembership(index)
                                              }
                                            />

                                            <div
                                              className="fixed inset-0 flex items-center justify-center z-50"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                                                <button
                                                  className="absolute top-2 right-2 text-green-400 bg-[#FFFFFF] rounded-full"
                                                  onClick={() =>
                                                    toggleListVisibilitySelect(
                                                      null
                                                    )
                                                  }
                                                  style={{
                                                    width: '29px',
                                                    height: '29px',
                                                    background: '#FFFFFF',
                                                    border:
                                                      '2px solid #31B47663',
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
                                                      <div className="flex items-center justify-center text-[black] bg-gray-700 rounded-full">
                                                        <img
                                                          src={userIcon}
                                                          alt="icons"
                                                          style={{
                                                            width: '47px',
                                                            height: '47px',
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="flex flex-col ml-3">
                                                        <span className="text-white block text-base font-poppins font-semibold">
                                                          Alice Evans
                                                        </span>
                                                        <span className="text-gray-400 text-sm font-poppins font-normal">
                                                          Member{' '}
                                                          <FontAwesomeIcon
                                                            icon={faAngleDown}
                                                          />
                                                        </span>
                                                      </div>
                                                    </div>

                                                    <div className="flex ">
                                                      <div className="flex items-center justify-center text-[black] bg-gray-700 rounded-full">
                                                        <img
                                                          src={userIcon}
                                                          alt="icons"
                                                          style={{
                                                            width: '47px',
                                                            height: '47px',
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="flex flex-col ml-3">
                                                        <span className="text-white block text-base font-poppins font-semibold">
                                                          Bob Rogers
                                                        </span>
                                                        <span className="text-gray-400 text-sm font-poppins font-normal">
                                                          Member{' '}
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
                                      <div>
                                        <div className="flex  flex-col items-start">
                                          <div className=" flex flex-col">
                                            <span className="text-white block text-base font-poppins">
                                              Aiden Harper,
                                            </span>
                                            <span className="text-white block text-base font-poppins">
                                              Lila Montgomery,
                                            </span>
                                          </div>
                                          <div className="px-4 flex">
                                            <div className="">
                                              <button
                                                onClick={() =>
                                                  toggleListVisibilityInsert(
                                                    sectionIndex
                                                  )
                                                }
                                                className="absolute top-2 right-2"
                                              >
                                                <ThreeDotsButton />
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                        {isListVisibleInsert ===
                                          sectionIndex && (
                                          <>
                                            <div
                                              className="fixed inset-0 bg-black opacity-50 z-40"
                                              onClick={() =>
                                                toggleMembership(index)
                                              }
                                            />

                                            <div
                                              className="fixed inset-0 flex items-center justify-center z-50"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                                                <button
                                                  className="absolute top-2 right-2 text-green-400 bg-[#FFFFFF] rounded-full"
                                                  onClick={() =>
                                                    toggleListVisibilityInsert(
                                                      null
                                                    )
                                                  }
                                                  style={{
                                                    width: '29px',
                                                    height: '29px',
                                                    background: '#FFFFFF',
                                                    border:
                                                      '2px solid #31B47663',
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
                                                      <div className="flex items-center justify-center text-[black] bg-gray-700 rounded-full">
                                                        <img
                                                          src={userIcon}
                                                          alt="icons"
                                                          style={{
                                                            width: '47px',
                                                            height: '47px',
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="flex flex-col ml-3">
                                                        <span className="text-white block text-base font-poppins font-semibold">
                                                          Aiden Harper
                                                        </span>
                                                        <span className="text-gray-400 text-sm font-poppins font-normal">
                                                          Member{' '}
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
                                                          width: '47px',
                                                          height: '47px',
                                                          background: '#FFFFFF',
                                                          opacity: 1,
                                                        }}
                                                      >
                                                        <img
                                                          src={userIcon}
                                                          alt="icons"
                                                          style={{
                                                            width: '47px',
                                                            height: '47px',
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="flex flex-col ml-3">
                                                        <span className="text-white block text-base font-poppins font-semibold">
                                                          Lila Montgomery
                                                        </span>
                                                        <span className="text-gray-400 text-sm font-poppins font-normal">
                                                          Member{' '}
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
                                    {sectionIndex === 2 && (
                                      <div>
                                        <div className="flex  flex-col items-start">
                                          <div className="flex flex-col">
                                            <span className="text-white block text-base font-poppins">
                                              Ethan Caldwell,
                                            </span>
                                            <span className="text-white block text-base font-poppins">
                                              Sophie Bennett,
                                            </span>
                                          </div>
                                          <div className="px-4 flex">
                                            <div className="">
                                              <button
                                                onClick={() =>
                                                  toggleListVisibilityUpdate(
                                                    sectionIndex
                                                  )
                                                }
                                                className="absolute top-2 right-2"
                                              >
                                                <ThreeDotsButton />
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                        {isListVisibleUpdate ===
                                          sectionIndex && (
                                          <>
                                            <div
                                              className="fixed inset-0 bg-black opacity-50 z-40"
                                              onClick={() =>
                                                toggleMembership(index)
                                              }
                                            />

                                            <div
                                              className="fixed inset-0 flex items-center justify-center z-50"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                                                <button
                                                  className="absolute top-2 right-2 text-green-400 bg-[#FFFFFF] rounded-full"
                                                  onClick={() =>
                                                    toggleListVisibilityUpdate(
                                                      null
                                                    )
                                                  }
                                                  style={{
                                                    width: '29px',
                                                    height: '29px',
                                                    background: '#FFFFFF',
                                                    border:
                                                      '2px solid #31B47663',
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
                                                      <div className="flex items-center justify-center text-[black] bg-gray-700 rounded-full">
                                                        <img
                                                          src={userIcon}
                                                          alt="icons"
                                                          style={{
                                                            width: '47px',
                                                            height: '47px',
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="flex flex-col ml-3">
                                                        <span className="text-white block text-base font-poppins font-semibold">
                                                          Ethan Caldwell
                                                        </span>
                                                        <span className="text-gray-400 text-sm font-poppins font-normal">
                                                          Member{' '}
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
                                                          width: '47px',
                                                          height: '47px',
                                                          background: '#FFFFFF',
                                                          opacity: 1,
                                                        }}
                                                      >
                                                        <img
                                                          src={userIcon}
                                                          alt="icons"
                                                          style={{
                                                            width: '47px',
                                                            height: '47px',
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="flex flex-col ml-3">
                                                        <span className="text-white block text-base font-poppins font-semibold">
                                                          Sophie Bennett
                                                        </span>
                                                        <span className="text-gray-400 text-sm font-poppins font-normal">
                                                          Member{' '}
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
                                    {sectionIndex === 3 && (
                                      <div>
                                        <div className="flex  flex-col items-start">
                                          <div className=" flex flex-col">
                                            <span className="text-white block text-base font-poppins">
                                              Lucas Hayes
                                            </span>
                                          </div>
                                          <div className="px-4 flex">
                                            <div className="">
                                              <button
                                                onClick={() =>
                                                  toggleListVisibilityDelete(
                                                    sectionIndex
                                                  )
                                                }
                                                className="absolute top-2 right-2"
                                              >
                                                <ThreeDotsButton />
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                        {isListVisibleDelete ===
                                          sectionIndex && (
                                          <>
                                            <div
                                              className="fixed inset-0 bg-black opacity-50 z-40"
                                              onClick={() =>
                                                toggleMembership(index)
                                              }
                                            />

                                            <div
                                              className="fixed inset-0 flex items-center justify-center z-50"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                                                <button
                                                  className="absolute top-2 right-2 text-green-400 bg-[#FFFFFF] rounded-full"
                                                  onClick={() =>
                                                    toggleListVisibilityDelete(
                                                      null
                                                    )
                                                  }
                                                  style={{
                                                    width: '29px',
                                                    height: '29px',
                                                    background: '#FFFFFF',
                                                    border:
                                                      '2px solid #31B47663',
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
                                                      1 Members
                                                    </span>
                                                  </div>

                                                  <div className="space-y-4">
                                                    <div className="flex ">
                                                      <div className="flex items-center justify-center text-[black] bg-gray-700 rounded-full">
                                                        <img
                                                          src={userIcon}
                                                          alt="icons"
                                                          style={{
                                                            width: '47px',
                                                            height: '47px',
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="flex flex-col ml-3">
                                                        <span className="text-white block text-base font-poppins font-semibold">
                                                          Lucas Hayes
                                                        </span>
                                                        <span className="text-gray-400 text-sm font-poppins font-normal">
                                                          Member{' '}
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

                                  <td className="relative px-2.5 py-2 border border-customBorderColor text-customWhite bg-black font-poppins">
                                    {/* Display section-specific members */}
                                    <div className="mb-6">
                                      {sectionMembers.length > 0 ? (
                                        <div className="flex flex-col space-y-1">
                                          {sectionMembers.map(
                                            (member, memberIndex) => (
                                              <div
                                                key={memberIndex}
                                                className="flex items-center"
                                              >
                                                <span className="text-white text-base font-poppins">
                                                  {member.name}
                                                  {/* Add a comma after each member name except the last one */}
                                                  {memberIndex <
                                                    sectionMembers.length - 1 &&
                                                    ','}
                                                </span>
                                              </div>
                                            )
                                          )}

                                          <button
                                            onClick={() =>
                                              toggleMembershipEditRevised(
                                                sectionIndex
                                              )
                                            }
                                            className="absolute top-2 right-2"
                                          >
                                            <ThreeDotsButton />
                                          </button>
                                        </div>
                                      ) : (
                                        <span></span>
                                      )}
                                    </div>

                                    {/* {members.length > 0 ? (
                                      members.map((member, memberIndex) => (
                                        <div
                                          key={member._id}
                                          className="flex justify-between items-center mb-2"
                                        >
                                          <span className="text-white block text-base font-poppins font-semibold">
                                            {member.name}
                                          </span>
                                          <button
                                            className="flex items-center justify-center text-green-400 bg-gray-700 rounded-full transition-colors duration-200 ease-in-out"
                                            style={{
                                              width: '29px',
                                              height: '29px',
                                              background: '#FFFFFF00',
                                              border: '2px solid #31B47663',
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
                                    )} */}

                                    {/* Modal for Revised section members */}
                                    {openEditMembershipIndexRevised ===
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
                                                  toggleMembershipEditRevised(
                                                    sectionIndex
                                                  )
                                                }
                                                style={{
                                                  width: '29px',
                                                  height: '29px',
                                                  border: '2px solid #31B47663',
                                                }}
                                              >
                                                &times;
                                              </button>
                                            </div>

                                            <div className="p-4 space-y-4 max-h-72 overflow-y-auto">
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
                                                          width: '47px',
                                                          height: '47px',
                                                        }}
                                                      />
                                                    </div>
                                                    <div className="flex flex-col ml-3">
                                                      <span className="text-white block text-base font-poppins font-semibold">
                                                        {member.name}
                                                      </span>
                                                      <span className="text-gray-400 text-sm font-poppins font-normal">
                                                        Member{' '}
                                                        <FontAwesomeIcon
                                                          icon={faAngleDown}
                                                        />
                                                      </span>
                                                    </div>
                                                  </div>
                                                  {/* <button
                                                    className="flex items-center justify-center text-green-400 bg-gray-700 rounded-full"
                                                    onClick={() =>
                                                      removeMember(
                                                        memberIndex,
                                                        sectionIndex
                                                      )
                                                    }
                                                    style={{
                                                      width: '29px',
                                                      height: '29px',
                                                      background: '#FFFFFF00',
                                                      border:
                                                        '2px solid #31B47663',
                                                    }}
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faMinus}
                                                    />
                                                  </button> */}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
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
                                                  width: '29px',
                                                  height: '29px',
                                                  border: '2px solid #31B47663',
                                                }}
                                              >
                                                &times;
                                              </button>
                                            </div>

                                            <div className="p-4 space-y-4">
                                              {/* Display section-specific members inside modal */}

                                              <div
                                                className="overflow-y-auto"
                                                style={{ maxHeight: '250px' }}
                                              >
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
                                                            width: '47px',
                                                            height: '47px',
                                                          }}
                                                        />
                                                      </div>
                                                      <div className="flex flex-col ml-3">
                                                        <span className="text-white block text-base font-poppins font-semibold">
                                                          {member.name}
                                                        </span>
                                                        <span className="text-gray-400 text-sm font-poppins font-normal">
                                                          Member{' '}
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
                                                        width: '29px',
                                                        height: '29px',
                                                        background: '#FFFFFF00',
                                                        border:
                                                          '2px solid #31B47663',
                                                      }}
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faMinus}
                                                      />
                                                    </button>
                                                  </div>
                                                ))}
                                              </div>

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
                                                            width: '29px',
                                                            height: '29px',
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
                                                        }
                                                        style={{
                                                          width: '29px',
                                                          height: '29px',
                                                          background:
                                                            '#FFFFFF00',
                                                          border:
                                                            '2px solid #31B47663',
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
                                              {errorMessageMember && (
                                                <p style={{ color: 'red' }}>
                                                  {errorMessageMember}
                                                </p>
                                              )}
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
                  </div>
                </div>
              </div>

              <div className="bg-customBlack py-8 rounded-lg shadow-md mt-4">
                <div className="page-center">
                  <div className="flex px-4 justify-center mb-4">
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
                          isOpen={openDropdown === 'dataStoreOptions'}
                          onDropdownClick={() =>
                            handleDropdownClick('dataStoreOptions')
                          }
                          selectedOption={selectedOptions['dataStoreOptions']}
                          onOptionClick={(option) => {
                            handleOptionClick('dataStoreOptions', option);
                            if (option) {
                              setErrorMessage(''); // Clear error message if a valid option is selected
                            }
                            setOpenDropdown(null); // Close the dropdown after selecting an option
                          }}
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
                          isOpen={openDropdown === 'tableOptions'}
                          onDropdownClick={() =>
                            handleDropdownClick('tableOptions')
                          }
                          selectedOption={selectedOptions['tableOptions']}
                          onOptionClick={(option) => {
                            handleOptionClick('tableOptions', option);
                            if (option) {
                              setErrorMessage('');
                            }
                            setOpenDropdown(null);
                          }}

                          // paddingLeft={"1rem"}
                          // paddingRight={"1rem"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {sectionsPlus.map((section, index) => (
                <div key={index} className="with_the_following_action">
                  <div className="pt-[1rem] ">
                    <div
                      className="flex items-baseline  px-4 pt-[1rem] ml-2 gap-2.5"
                      style={{ width: '350px' }}
                    >
                      <CustomDropdown
                        options={data.dataFeildOption || []}
                        placeholder="Select DataField"
                        isOpen={openDropdown === `${section.id}-0`}
                        onDropdownClick={() =>
                          handleDropdownClick1(section.id, 0)
                        }
                        selectedOption={section.values['dataFeildOption'] || ''}
                        setSelectedOption={(value) =>
                          handleDropdownChange(
                            section.id,
                            'dataFeildOption',
                            value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="bg-customBlack p-4 rounded-lg shadow-md">
                    <div className="flex flex-col">
                      <div className="flex flex-wrap justify-between">
                        <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[30%] xl:basis-[30%] 2xl:basis-[30%] p-2 overflow-x-auto basis-ipad">
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
                                  <td
                                    className=" py-2 border border-customBorderColor text-customWhite bg-black"
                                    style={{ width: '200px' }}
                                  >
                                    <CustomDropdown
                                      options={data.privacyActionOption || []}
                                      placeholder="None"
                                      isOpen={
                                        openDropdown === `${section.id}-1`
                                      }
                                      onDropdownClick={() =>
                                        handleDropdownClick1(section.id, 1)
                                      }
                                      selectedOption={
                                        section.values['privacyActionOption'] ||
                                        ''
                                      }
                                      setSelectedOption={(value) =>
                                        handleDropdownChange(
                                          section.id,
                                          'privacyActionOption',
                                          value
                                        )
                                      }
                                    />
                                  </td>
                                  <td className=" py-2 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                </tr>
                                <tr>
                                  <td className=" py-7 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                  <td className=" py-7 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                </tr>
                                <tr>
                                  <td className=" py-7 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                  <td className=" py-7 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                </tr>
                                <tr>
                                  <td className=" py-7 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                  <td className=" py-7 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[70%] xl:basis-[70%] 2xl:basis-[70%] p-2 overflow-x-auto overflow-y-hidden basis-ipad">
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
                                    className="pl-4  py-2 border border-customBorderColor text-customWhite bg-black"
                                    style={{ width: '186px' }}
                                  >
                                    <CustomDropdown
                                      options={data.attributeOption || []}
                                      placeholder="Select Option"
                                      isOpen={
                                        openDropdown === `${section.id}-2`
                                      }
                                      onDropdownClick={() =>
                                        handleDropdownClick1(section.id, 2)
                                      }
                                      selectedOption={
                                        section.values['attributeOption'] || ''
                                      }
                                      // setSelectedOption={(value) =>
                                      //   handleDropdownChange(
                                      //     section.id,
                                      //     'attributeOption',
                                      //     value
                                      //   )
                                      // }
                                      setSelectedOption={(value) => {
                                        setSelectedFilteringAttribute(value);
                                        handleDropdownChange(
                                          section.id,
                                          'attributeOption',
                                          value
                                        );
                                      }}
                                    />
                                  </td>
                                  <td
                                    className="pl-4 py-2 border border-customBorderColor text-customWhite bg-black"
                                    style={{ width: '216px' }}
                                  >
                                    <CustomDropdown
                                      options={filteringValues}
                                      placeholder="Select Option"
                                      isOpen={
                                        openDropdown === `${section.id}-3`
                                      }
                                      onDropdownClick={() =>
                                        handleDropdownClick1(section.id, 3)
                                      }
                                      selectedOption={
                                        section.values[
                                          'attributeValueOption'
                                        ] || ''
                                      }
                                      setSelectedOption={(value) =>
                                        handleDropdownChange(
                                          section.id,
                                          'attributeValueOption',
                                          value
                                        )
                                      }
                                    />
                                  </td>
                                  <td
                                    className="pl-4  py-2 border border-customBorderColor text-customWhite bg-black"
                                    style={{ width: '190px' }}
                                  >
                                    <CustomDropdown
                                      options={data.attributeActionOption || []}
                                      placeholder="Select Option"
                                      isOpen={
                                        openDropdown === `${section.id}-4`
                                      }
                                      onDropdownClick={() =>
                                        handleDropdownClick1(section.id, 4)
                                      }
                                      selectedOption={
                                        section.values[
                                          'attributeActionOption'
                                        ] || ''
                                      }
                                      setSelectedOption={(value) =>
                                        handleDropdownChange(
                                          section.id,
                                          'attributeActionOption',
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
                                <tr>
                                  <td className="pl-4  py-8 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                  <td className="pl-4  py-8 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                  <td className="pl-4  py-8 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
                                  <td className="pl-4  py-8 border border-customBorderColor text-customWhite bg-black font-poppins"></td>
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

                      <div className="flex flex-wrap"></div>
                    </div>

                    {/* <div className="pt-[1rem] ">
                      <div
                        className="flex items-baseline  px-4 pt-[1rem] ml-2 gap-2.5"
                        style={{ width: "500px" }}
                      >
                        <span className="text-[#31B476]  mr-2 font-poppins  font-semibold">
                          Row Level Filtering Based on Value
                        </span>
           

                        <CustomDropdown
                          options={data.rowLevelFilterinOption || []}
                          placeholder="Select Option"
                          isOpen={openDropdown === `${section.id}-5`}
                          onDropdownClick={() =>
                            handleDropdownClick1(section.id, 5)
                          }
                          selectedOption={
                            section.values["rowLevelFilterinOption"] || ""
                          }
                          setSelectedOption={(value) =>
                            handleDropdownChange(
                              section.id,
                              "rowLevelFilterinOption",
                              value
                            )
                          }
                        />
                      </div>
                    </div> */}

                    <div className="pt-4">
                      <div
                        className="flex flex-col sm:flex-row items-start sm:items-center px-4 pt-4 ml-2 gap-2 sm:gap-2.5"
                        style={{
                          maxWidth: '100%',
                          width: '50%',
                          minWidth: '250px',
                        }}
                      >
                        <span className="text-[#31B476] font-poppins font-semibold text-sm sm:text-base lg:text-lg">
                          Row Level Filtering Based on Value
                        </span>

                        <CustomDropdown
                          options={data.rowLevelFilterinOption || []}
                          placeholder="Select Option"
                          isOpen={openDropdown === `${section.id}-5`}
                          onDropdownClick={() =>
                            handleDropdownClick1(section.id, 5)
                          }
                          selectedOption={
                            section.values['rowLevelFilterinOption'] || ''
                          }
                          setSelectedOption={(value) =>
                            handleDropdownChange(
                              section.id,
                              'rowLevelFilterinOption',
                              value
                            )
                          }
                          className="w-full sm:w-auto"
                        />
                      </div>
                    </div>

                    {sectionsPlus.length === 1 ? (
                      <div className="flex justify-end text-end gap-2 px-4 py-4">
                        <button
                          className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded  hover:bg-black  "
                          onClick={addSectionPlus}
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
                          onClick={addSectionPlus}
                        >
                          <FontAwesomeIcon
                            className=" transition ease-out duration-300 hover:transform hover:scale-110 w-7 h-7"
                            icon={faPlus}
                          />
                        </button>
                        <button
                          className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black transition ease-out duration-300"
                          onClick={() => removeSectionPlus(section.id)}
                        >
                          <FontAwesomeIcon
                            className=" transition ease-out duration-300 hover:transform hover:scale-110 w-7 h-7"
                            icon={faTrash}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mb-2"></div>
                </div>
              ))}
            </div>
          </div>
        ))}

      <div
        className={`bg-customBlack hover:bg-customGreen text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform cursor-pointer font-poppins ${
          isEditMode ? 'hover:bg-customGreen hover:text-white' : ''
        }`}
        onClick={isEditMode ? handleUpdatePolicy : handleSavePolicy}
      >
        <span
          className="transition-transform duration-300 ease-out inline-block"
          style={{
            letterSpacing: '0.2em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isEditMode ? 'UPDATE POLICY' : 'SAVE POLICY'}
        </span>
      </div>

      {isEditMode && (
        <div
          className="bg-red-500 text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform cursor-pointer font-poppins"
          onClick={() => {
            setIsEditMode(false);
            setPolicyId(null);
            setPolicyName('');
            setSelectedOptions({});
            setMembersBySection([[], [], [], []]);
            setSectionsPlus([{ id: Date.now(), values: {} }]);
          }}
        >
          <span className="transition-transform duration-300 ease-out">
            CANCEL EDIT
          </span>
        </div>
      )}

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
                    onChange={(e) => {
                      handlePolicyNameChange(e);
                      if (e.target.value.trim() !== '') {
                        setErrorMessage('');
                      }
                    }}
                    className="w-full rounded-md shadow-sm px-4 py-2 border-2 border-gray-400 focus:border-green-500 focus:ring-green-500 bg-[#393C46] text-white transition-all duration-200 ease-in-out"
                    placeholder="Enter policy name"
                  />
                </div>

                <li className="mb-6">
                  <div className="bg-[#393C46] p-4 rounded-md shadow-lg">
                    <p className="text-white">
                      <strong>Document Store:</strong>{' '}
                      {selectedOptions['dataStoreOptions']}
                    </p>
                    <p className="text-white">
                      <strong>Table Option:</strong>{' '}
                      {selectedOptions['tableOptions']}
                    </p>

                    {sectionsPlus.map((section) => (
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
                            <strong>Data Field:</strong>{' '}
                            {section.values['dataFeildOption']}
                          </div>

                          <div className="text-[#c4c9d0]">
                            <strong>Privacy Action:</strong>{' '}
                            {section.values['privacyActionOption']}
                          </div>
                          <div className="text-[#c4c9d0]">
                            <strong>Attribute Option:</strong>{' '}
                            {section.values['attributeOption']}
                          </div>
                          <div className="text-[#c4c9d0]">
                            <strong>Attribute Value:</strong>{' '}
                            {section.values['attributeValueOption']}
                          </div>
                          <div className="text-[#c4c9d0]">
                            <strong>Attribute Action:</strong>{' '}
                            {section.values['attributeActionOption']}
                          </div>
                          <div className="text-[#c4c9d0]">
                            <strong>Row Level Filter:</strong>{' '}
                            {section.values['rowLevelFilterinOption']}
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                </li>

                {/* Display error message */}
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
                    {loading ? (
                      <>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          className="mr-2"
                        />
                        Loading...
                      </>
                    ) : (
                      'Confirm'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#2E313B] p-6 rounded-lg shadow-lg w-1/3 max-h-[50vh] overflow-y-auto">
            <h2 className="text-xl font-poppins font-semibold mb-4 text-center text-white">
              {successMessage.includes('Failed') ? 'Failed' : 'Success'}
            </h2>
            <p
              className={
                successMessage.includes('Failed')
                  ? 'text-red-500 text-center'
                  : 'text-green-500 text-center'
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
                    Data Store
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Table/View
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    Row Level Filter
                  </th>
                  <th className="px-4 py-2 border border-customBorderColor bg-customTableGreen text-customWhite font-poppins font-semibold">
                    JSON Format
                  </th>
                </tr>
              </thead>
              <tbody className="bg-customTablebG">
                {tableData.map((item) =>
                  // Loop through plusData array to show each row of data
                  item.plusData.map((plusItem) => (
                    <tr key={plusItem._id}>
                      <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                        {item.policyName || 'N/A'}
                      </td>
                      <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                        {plusItem.ONname}
                      </td>
                      <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                        {plusItem.ONattributeFilteringAttribute}
                      </td>
                      <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                        {plusItem.ONattributeFilteringValue}
                      </td>
                      <td className="px-4 py-2 border border-customBorderColor text-customWhite font-poppins">
                        {plusItem.rowLevelFilteringBasedonValue}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModel}
        onClose={closeModal}
        onConfirm={handleDeleteButtonClick}
      />

      <div className="flex justify-end items-center mt-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#31B476] text-white hover:bg-[#28a165]'
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
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#31B476] text-white hover:bg-[#28a165]'
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* {isGroupMembershipOpen && (
        <GroupMembershipModal onClose={() => setGroupMembershipOpen(false)} />
      )}

      {isEditPermissionsOpen && (
        <EditPermissionsModal onClose={() => setEditPermissionsOpen(false)} />
      )} */}
    </>
  );
};

export default Chart2DatabasePage;
