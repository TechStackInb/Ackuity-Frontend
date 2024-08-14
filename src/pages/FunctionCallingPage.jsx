// import React from "react";

// const FunctionCalling = () => {
//   return (
//     <>
//       <div className="p-4 bg-white border border-gray-200 rounded">
//         <div className="flex flex-wrap gap-4">
//           <div className="flex items-center">
//             {/* <label className="mr-2">Run</label> */}
//             <div className="flex flex-col items-center">
//               <label className="mr-2">Query</label>
//               <input
//                 type="text"
//                 className="border border-gray-300 p-2"
//                 value="Net sales orders"
//               />
//             </div>
//           </div>
//           <div className="flex items-center">
//             {/* <label className="mr-2">On</label> */}
//             <div className="flex flex-col items-center">
//               <label className="mr-2">Target Application</label>
//               <select className="border border-gray-300 p-2">
//                 <option>Salesforce</option>
//                 <option>Servicenow</option>
//                 <option>Microsoft Dynamics</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex items-center">
//             {/* <label className="mr-2">From</label> */}
//             <div className="flex flex-col items-center">
//               <label className="mr-2">GenAI App</label>
//               <select className="border border-gray-300 p-2">
//                 <option>App1</option>
//                 <option>App2</option>
//                 <option>App3</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex items-center">
//             {/* <label className="mr-2">For</label> */}
//           </div>
//         </div>
//       </div>

//       {/* <div className="p-4">
//         <h2 className="text-xl font-semibold mb-4 text-center">
//           Select API Data
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 mt-2">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Description</th>
//                 <th className="px-4 py-2 border">Data Fields</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="px-4 py-6 border">
//                   <select className="w-full border border-gray-300 p-2">
//                     <option>Sales Opp</option>
//                     <option>Marketing Data</option>
//                   </select>
//                 </td>
//                 <td className="px-4 py-6 border">
//                   Retrieve sales opportunities
//                 </td>
//                 <td className="px-4 py-6 border">
//                   <div className="grid grid-cols-3 gap-2">
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Opportunity Name</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Lead Source</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Close_Date</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Account Name</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Amount</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Age</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Type</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Probability</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Created_Date</span>
//                     </label>
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border">
//                   <div className="grid grid-cols-3 gap-2"></div>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border">
//                   <div className="grid grid-cols-3 gap-2"></div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div> */}
//       <div className="p-4 mt-6">
//         <h2 className="text-xl font-semibold mb-4 text-center">
//           Select API Data
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 mt-2">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Description</th>
//                 <th className="px-4 py-2 border">Data Fields</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="px-4 py-6 border">
//                   <select className="w-full border border-gray-300 p-2">
//                     <option>Sales Opportunities</option>
//                     <option>API2</option>
//                     <option>API3</option>
//                     <option>API4</option>
//                   </select>
//                 </td>
//                 <td className="px-4 py-6 border">
//                   Retrieve sales opportunities
//                 </td>
//                 <td className="px-4 py-6 border">
//                   <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Opportunity Name</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Lead Source</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Close_Date</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Account Name</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Amount</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Age</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Type</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Probability</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" />
//                       <span>Created_Date</span>
//                     </label>
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"></div>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"></div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-4 text-center">
//           Action on Data
//         </h2>

//         <div className="">
//           <div>
//             <label className="block mb-2 font-semibold">DataField</label>
//             <select className="w-full border border-gray-300 p-2 mb-4">
//               <option>Opportunity Name</option>
//               <option>Account Name</option>
//               <option>Amount</option>
//               <option>Age</option>
//             </select>
//           </div>

//           <h3 className="text-lg font-semibold mb-2">Permissions</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border">Permission</th>
//                   <th className="px-4 py-2 border">Existing</th>
//                   <th className="px-4 py-2 border">Revised</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-4 py-2 border">Read</td>
//                   <td className="px-4 py-2 border">
//                     <div className="flex space-x-2">
//                       <span className="border p-2">Sales NA</span>
//                       <span className="border p-2">Management</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <div className="flex space-x-2">
//                       <input type="checkbox" />
//                       <span>Sales NA</span>
//                       <input type="checkbox" />
//                       <span>Management</span>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-4 py-2 border">Read + Write</td>
//                   <td className="px-4 py-2 border"></td>
//                   <td className="px-4 py-2 border"></td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mt-2">Privacy Filtering</h3>
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border">Category</th>
//                   <th className="px-4 py-2 border">Action</th>
//                   <th className="px-4 py-2 border">Transformation Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-4 py-2 border">
//                     <select className="w-full border border-gray-300 p-2">
//                       <option>Name</option>
//                       <option>DOB</option>
//                       <option>SSN</option>
//                       <option>None</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select className="w-full border border-gray-300 p-2">
//                       <option>Anonymize</option>
//                       <option>Tokenize</option>
//                       <option>None</option>
//                       <option>De-Identification</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {/* <select className="w-full border border-gray-300 p-2">
//                       <option>None</option>
//                       <option>Transformation 1</option>
//                     </select> */}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="">
//           <h3 className="text-lg font-semibold mt-2">Attribute Filtering</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border">Attribute</th>
//                   <th className="px-4 py-2 border">Value</th>
//                   <th className="px-4 py-2 border">Action</th>
//                   <th className="px-4 py-2 border">Transformation Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-4 py-2 border">
//                     <select className="w-full border border-gray-300 p-2">
//                       <option>Department</option>
//                       <option>Location</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select className="w-full border border-gray-300 p-2">
//                       <option>North America</option>
//                       <option>Asia</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select className="w-full border border-gray-300 p-2">
//                       <option>Allow</option>
//                       <option>Reduct</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {/* <select className="w-full border border-gray-300 p-2">
//                       <option>None</option>
//                       <option>Transformation 1</option>
//                     </select> */}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div>
//             <div>
//               <label className="block mb-2 font-semibold mt-2">DataField</label>
//               <select className="w-full border border-gray-300 p-2 mb-4">
//                 <option>Opportunity Name</option>
//                 <option>Account Name</option>
//                 <option>Amount</option>
//                 <option>Age</option>
//               </select>
//             </div>

//             <table className="min-w-full bg-white border border-gray-200 mt-2">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border">Permission</th>
//                   <th className="px-4 py-2 border">Existing</th>
//                   <th className="px-4 py-2 border">Reviced</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-4 py-2 border">
//                     <select className="w-full border border-gray-300 p-2">
//                       <option>Department</option>
//                       <option>Location</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select className="w-full border border-gray-300 p-2">
//                       <option>Noth America</option>
//                       <option>Asia</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select className="w-full border border-gray-300 p-2">
//                       <option>Allow</option>
//                       <option>Reduct</option>
//                     </select>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="flex flex-col items-center justify-center">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//             Save
//           </button>
//           {/* <div className="flex space-x-4">
//               <button className="border border-gray-300 p-2 rounded">
//                 Yes
//               </button>
//               <button className="border border-gray-300 p-2 rounded">No</button>
//             </div> */}
//         </div>

//         <div>
//           <table className="min-w-full bg-white border border-gray-200 mt-2">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Description</th>
//                 <th className="px-4 py-2 border">JSON Format</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border"></td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border"></td>
//                 <td className="px-4 py-6 border"></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-col items-center justify-center">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//             Download
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FunctionCalling;
import React, { useState } from "react";
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

const FunctionCalling = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [sections, setSections] = useState([{ id: Date.now(), values: {} }]);

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
    netSalesOptions: ["Document Store", "Share Point", "One Drive"],
    targetLocationOptions: ["SalesForce", "Servicenow", "Microsoft Dynamics"],
    genAiAppOptions: ["App1", "App2", "App3", "App4"],
    locationOption: ["Department", "Location"],
    privacyValueOption: ["Asia", "North America"],
    privacyActionOption: ["Allow", "Reduct"],
    attributeOption: ["Department", "Location"],
    attributeValueOption: ["Asia", " America"],
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
      <div className="p-4 bg-[#30b375] bg-bubble-pattern  rounded-md  mb-4 ">
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

      <div className="bg-customBlack py-8 rounded-lg shadow-md mt-4">
        <div className="page-center">
          <div className="flex flex-wrap justify-around px-4">
            {/* First Column */}
            <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[26.333333%] xl:basis-[26.333333%] 2xl:basis-[26.333333%] ipad-query">
              <div className="flex items-baseline mb-2">
                <span
                  className="text-customGreen font-poppins font-semibold text-sm"
                  style={{ marginLeft: "35px" }}
                >
                  Query
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-white mr-2 ">Run</span>
                <PrivacyCustomDropdown
                  options={data.netSalesOptions || []}
                  placeholder="Net Sales orders"
                  isOpen={openDropdown === "netSales"}
                  onDropdownClick={() => handleDropdownClick("netSales")}
                  selectedOption={selectedOptions["netSales"]}
                  onOptionClick={(option) =>
                    handleOptionClick("netSales", option)
                  }
                  // paddingLeft={"1rem"}
                  // paddingRight={"1rem"}
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[26.333333%] xl:basis-[26.333333%] 2xl:basis-[26.333333%] mt-4 sm:mt-0 ipad-query">
              <div className="flex items-baseline mb-2">
                <span
                  className="text-customGreen font-poppins font-semibold text-sm"
                  style={{ marginLeft: "31px" }}
                >
                  Target Application
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-white mr-2 ">On</span>
                <PrivacyCustomDropdown
                  options={data.targetLocationOptions || []}
                  placeholder="Salesforce"
                  isOpen={openDropdown === "targetLocation"}
                  onDropdownClick={() => handleDropdownClick("targetLocation")}
                  selectedOption={selectedOptions["targetLocation"]}
                  onOptionClick={(option) =>
                    handleOptionClick("targetLocation", option)
                  }
                  // paddingLeft={"1rem"}
                  // paddingRight={"1rem"}
                />
              </div>
            </div>

            {/* Third Column */}
            <div className="flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[26.333333%] xl:basis-[26.333333%] 2xl:basis-[26.333333%] mt-4 sm:mt-0 ipad-query">
              <div className="flex items-baseline mb-2">
                <span
                  className="text-customGreen font-poppins font-semibold text-sm"
                  style={{ marginLeft: "46px" }}
                >
                  GenAPI App
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-white mr-2 ">From</span>
                <PrivacyCustomDropdown
                  options={data.genAiAppOptions || []}
                  placeholder="App one"
                  isOpen={openDropdown === "genAiApp"}
                  onDropdownClick={() => handleDropdownClick("genAiApp")}
                  selectedOption={selectedOptions["genAiApp"]}
                  onOptionClick={(option) =>
                    handleOptionClick("genAiApp", option)
                  }
                  // paddingLeft={"1rem"}
                  // paddingRight={"1rem"}
                />
                <span className="text-white ml-2 ">For</span>
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
        // <div className="p-4 bg-customBlack opacity-100 ">
        //   <div className="page-center ">
        //     <div className="p-4 mt-6">
        //       <div className="flex flex-col space-y-4">
        //         {/* Content Section */}
        //         <div className="flex flex-wrap  p-2 rounded-lg justify-between">
        //           <div className="flex flex-col basis-[20%]">
        //             <label className=" py-3.5 text-[#31E48F] text-lg font-semibold">
        //               Select API Data
        //             </label>
        //             <div>
        //               <Dropdown
        //                 items={Sales}
        //                 iconColor="text-customIconColor"
        //                 backgroundColor="bg-black"
        //                 textColor="text-white"
        //                 onItemClick={(subItemName) => {
        //                   console.log("Selected:", subItemName);
        //                 }}
        //               />
        //             </div>
        //           </div>
        //           <div className="flex flex-col basis-[20%] ">
        //             <label className=" py-3.5 text-[#31E48F] text-lg font-semibold">
        //               Description
        //             </label>
        //             <div className="bg-black pb-[96px] pt-[10px] pl-[15px] pr-[9px] text-customWhite text-base">
        //               Retrieve sales opportunities
        //             </div>
        //             {/* <div className="bg-black px-4 py-2 text-customWhite"></div>
        //           <div className="bg-black px-4 py-2 text-customWhite"></div>
        //           <div className="bg-black px-4 py-2 text-customWhite"></div>
        //           <div className="bg-black px-4 py-2 text-customWhite"></div> */}
        //           </div>

        //           <div className="flex flex-col basis-[59%]">
        //             <label className=" py-3.5 text-[#31E48F] text-lg font-semibold">
        //               Data Fields
        //             </label>
        //             <div className="bg-black pt-[22px] pb-[20px] pl-[30px]">
        //               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        //                 <label className="flex items-center space-x-2">
        //                   <input type="checkbox" className="custom-checkbox" />
        //                   <span className="text-customWhite">
        //                     Opportunity Name
        //                   </span>
        //                 </label>
        //                 <label className="flex items-center space-x-2">
        //                   <input type="checkbox" className="custom-checkbox" />
        //                   <span className="text-customWhite">Lead Source</span>
        //                 </label>
        //                 <label className="flex items-center space-x-2">
        //                   <input type="checkbox" className="custom-checkbox" />
        //                   <span className="text-customWhite">Close_Date</span>
        //                 </label>
        //                 <label className="flex items-center space-x-2">
        //                   <input type="checkbox" className="custom-checkbox" />
        //                   <span className="text-customWhite">Account Name</span>
        //                 </label>
        //                 <label className="flex items-center space-x-2">
        //                   <input type="checkbox" className="custom-checkbox" />
        //                   <span className="text-customWhite">Amount</span>
        //                 </label>
        //                 <label className="flex items-center space-x-2">
        //                   <input type="checkbox" className="custom-checkbox" />
        //                   <span className="text-customWhite">Age</span>
        //                 </label>
        //                 <label className="flex items-center space-x-2">
        //                   <input type="checkbox" className="custom-checkbox" />
        //                   <span className="text-customWhite">Type</span>
        //                 </label>
        //                 <label className="flex items-center space-x-2">
        //                   <input type="checkbox" className="custom-checkbox" />
        //                   <span className="text-customWhite">Probability</span>
        //                 </label>
        //                 <label className="flex items-center space-x-2">
        //                   <input type="checkbox" className="custom-checkbox" />
        //                   <span className="text-customWhite">Created_Date</span>
        //                 </label>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div className="p-4 bg-customBlack opacity-100">
          <div className="page-center">
            <div className="p-4 mt-6">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap p-2 rounded-lg justify-between">
                  <div className="flex flex-col w-full sm:w-full md:w-full lg:w-[20%] xl:w-[20%] 2xl:w-[20%] mb-4 md:mb-0 ipad-width">
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
                  <div className="flex flex-col w-full sm:w-full  md:w-full lg:w-[29%] xl:w-[29%] 2xl:w-[29%]  mb-4 md:mb-0 pl-[2px] pr-[2px] ipad-width">
                    <label className="py-3.5 text-[#31E48F] text-lg font-poppins font-semibold">
                      Description
                    </label>
                    <div className="bg-black pb-[96px] pt-[10px] pl-[15px] pr-[9px] text-customWhite text-base font-poppins text-sizess">
                      Retrieve sales opportunities
                    </div>
                  </div>
                  <div className="flex flex-col w-full sm:w-full  md:w-full lg:w-[51%] xl:w-[51%] 2xl:w-[51%] ipad-width">
                    <label className="py-3.5 text-[#31E48F] text-lg font-poppins font-semibold">
                      Data Fields
                    </label>
                    <div className="bg-black pt-[22px] pb-[20px] pl-[30px]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
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
                                  <span className="p-2 bg-[#0a854b] border border-customBorderColor font-poppins">
                                    Sales NA
                                  </span>
                                  <span className="p-2 mt-2 bg-[#0a854b] border border-customBorderColor font-poppins">
                                    Management
                                  </span>
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
                                      Sales NA
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

      {/* ..........................copyy............... */}
      {/* {isSectionVisible &&
        sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-customBlack opacity-100">
            <div className="page-center">
              <div className="ml-3">
                <div className="flex items-baseline p-2 ml-2">
                  <span className="text-[#31B476] mr-2 font-semibold">
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

              <div className="bg-customBlack p-2 rounded-lg shadow-md">
                <div className="flex flex-row gap-2">
                  <div className="flex-1 p-2 overflow-x-auto">
                    <h2 className="p-2 text-[#f7fbf9] bg-[#0a854b] text-center font-semibold text-base">
                      Permissions
                    </h2>
                    <div className="overflow-x-auto md:overflow-x-visible">
                      <table className="bg-customBlack border border-gray-200 w-full">
                        <thead>
                          <tr>
                            <th className="py-2 border border-customBorderColor bg-[#1b1e26] text-customWhite text-sm">
                              Permission
                            </th>
                            <th className="py-2 border border-customBorderColor bg-[#2f3a45] text-customWhite text-sm">
                              Existing
                            </th>
                            <th className="py-2 border border-customBorderColor bg-[#6a7581] text-customWhite text-sm">
                              Revised
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 border border-customBorderColor text-customWhite text-sm">
                              Read
                            </td>
                            <td className="py-2 border border-customBorderColor text-customWhite ">
                              <div className="flex flex-col">
                                <span className="p-2 bg-[#0a854b] text-sm">
                                  Sales NA
                                </span>
                                <span className="p-2 mt-2 bg-[#0a854b] text-sm">
                                  Management
                                </span>
                              </div>
                            </td>
                            <td className="py-2 border border-customBorderColor text-customWhite">
                              <div className="flex flex-col">
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                  />
                                  <span className="text-[#5d5d5d] text-sm">
                                    Sales NA
                                  </span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                  />
                                  <span className="text-[#5d5d5d] text-sm">
                                    NAManagement
                                  </span>
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 border border-customBorderColor text-customWhite">
                              Read + Write
                            </td>
                            <td className="py-2 border border-customBorderColor text-customWhite"></td>
                            <td className="py-2 border border-customBorderColor text-customWhite"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex-1 p-2 overflow-x-auto md:overflow-x-visible">
                    <h2 className="p-2 text-[#f7fbf9] bg-[#0a854b] text-center font-semibold text-base">
                      Privacy Filtering
                    </h2>
                    <div className="overflow-x-auto md:overflow-x-visible">
                      <table className="bg-customBlack border border-gray-200 w-full">
                        <thead>
                          <tr>
                            <th className="py-2 border border-customBorderColor bg-[#1b1e26] text-customWhite text-sm">
                              Category
                            </th>
                            <th className="py-2 border border-customBorderColor bg-[#2f3a45] text-customWhite text-sm">
                              Action
                            </th>
                            <th className="py-2 border border-customBorderColor bg-[#6a7581] text-customWhite text-sm">
                              Transformation value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 border border-customBorderColor text-customWhite">
                              <PrivacyCustomDropdown
                                options={data.privacyValueOption || []}
                                placeholder="None"
                                isOpen={openDropdown === "privacyValue"}
                                onDropdownClick={() =>
                                  handleDropdownClick("privacyValue")
                                }
                                fontSize={"12px"}
                                selectedOption={selectedOptions["privacyValue"]}
                                onOptionClick={(option) =>
                                  handleOptionClick("privacyValue", option)
                                }
                              />
                            </td>
                            <td className="py-2 border border-customBorderColor text-customWhite">
                              <PrivacyCustomDropdown
                                options={data.privacyActionOption || []}
                                placeholder="None"
                                fontSize={"12px"}
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
                            <td className="py-2 border border-customBorderColor text-customWhite"></td>
                          </tr>
                          <tr>
                            <td className="py-6 border border-customBorderColor text-customWhite"></td>
                            <td className="py-6 border border-customBorderColor text-customWhite"></td>
                            <td className="py-6 border border-customBorderColor text-customWhite"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex-1 p-2 overflow-x-auto md:overflow-x-visible">
                    <h2 className="p-2 text-[#f7fbf9] bg-[#0a854b] text-center font-semibold text-base">
                      Attribute Filtering
                    </h2>
                    <div className="overflow-x-auto md:overflow-x-visible">
                      <table className="bg-customBlack border border-gray-200 w-full">
                        <thead>
                          <tr>
                            <th className="py-2 border border-customBorderColor bg-[#1b1e26] text-customWhite text-sm">
                              Attribute
                            </th>
                            <th className="py-2 border border-customBorderColor bg-[#2f3a45] text-customWhite text-sm">
                              Value
                            </th>
                            <th className="py-2 border border-customBorderColor bg-[#6a7581] text-customWhite text-sm">
                              Action
                            </th>
                            <th className="py-2 border border-customBorderColor bg-[#2f3a45] text-customWhite text-sm">
                              Transformation Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 border border-customBorderColor text-customWhite">
                              <PrivacyCustomDropdown
                                options={data.attributeOption || []}
                                placeholder="Location"
                                fontSize={"12px"}
                                isOpen={openDropdown === "attributeOption"}
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
                            <td className="py-2 border border-customBorderColor text-customWhite">
                              <PrivacyCustomDropdown
                                options={data.attributeValueOption || []}
                                placeholder="Asia"
                                fontSize={"12px"}
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
                            <td className="py-2 border border-customBorderColor text-customWhite">
                              <PrivacyCustomDropdown
                                options={data.attributeActionOption || []}
                                placeholder="Reduct"
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
                                fontSize={"12px"}
                              />
                            </td>
                            <td className="py-2 border border-customBorderColor text-customWhite"></td>
                          </tr>
                          <tr>
                            <td className="py-6 border border-customBorderColor text-customWhite"></td>
                            <td className="py-6 border border-customBorderColor text-customWhite"></td>
                            <td className="py-6 border border-customBorderColor text-customWhite"></td>
                            <td className="py-6 border border-customBorderColor text-customWhite"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))} */}

      {/* <div
        className={`bg-customBlack hover:bg-customGreen text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform cursor-pointer font-poppins font-semibold  ${
          isClickedAdd ? "hover:bg-customGreen hover:text-white" : ""
        }`}
        onClick={handleSavePolicy}
      >
        SAVE POLICY
      </div> */}
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
                    <div className="flex items-center justify-between">
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

export default FunctionCalling;
