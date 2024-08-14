// // import React, { useState } from "react";

// // const DocumentRAG = () => {
// //   const [activeTab, setActiveTab] = useState("Permissions");

// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case "Permissions":
// //         return (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full bg-white border border-gray-200">
// //               <thead>
// //                 <tr>
// //                   <th className="px-4 py-2 border">Document Repository</th>
// //                   <th className="px-4 py-2 border">Document Name</th>
// //                   <th className="px-4 py-2 border">Original Permissions</th>
// //                   <th className="px-4 py-2 border">Revised Permissions</th>
// //                   <th className="px-4 py-2 border">Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 <tr>
// //                   <td className="px-4 py-2 border">
// //                     <select className="w-full border border-gray-300 p-2">
// //                       <option>xyz.sharepoint.t</option>
// //                       <option>Item 2</option>
// //                       <option>Item 3</option>
// //                       <option>Item 4</option>
// //                       <option>Item 5</option>
// //                     </select>
// //                   </td>
// //                   <td className="px-4 py-2 border"></td>
// //                   <td className="px-4 py-2 border"></td>
// //                   <td className="px-4 py-2 border"></td>
// //                   <td className="px-4 py-2 border">
// //                     <button className="bg-blue-500 text-white py-1 px-3 rounded">
// //                       Edit
// //                     </button>
// //                   </td>
// //                 </tr>
// //                 {/* Additional rows can be added here */}
// //                 <tr>
// //                   <td className="px-4 py-6 border"></td>
// //                   <td className="px-4 py-6 border"></td>
// //                   <td className="px-4 py-6 border"></td>
// //                   <td className="px-4 py-6 border"></td>
// //                   <td className="px-4 py-6 border"></td>
// //                 </tr>
// //                 <tr>
// //                   <td className="px-4 py-6 border"></td>
// //                   <td className="px-4 py-6 border"></td>
// //                   <td className="px-4 py-6 border"></td>
// //                   <td className="px-4 py-6 border"></td>
// //                   <td className="px-4 py-6 border"></td>
// //                 </tr>
// //               </tbody>
// //             </table>
// //           </div>
// //         );
// //       case "Privacy Filtering":
// //         return (
// //           <div className="p-4 bg-white border border-gray-200 rounded">
// //             <h2 className="text-xl font-semibold mb-4">Privacy Filtering</h2>
// //             <div className="flex flex-wrap gap-4">
// //               <div className="flex items-center">
// //                 <label className="mr-2">If Document</label>
// //                 <div className="flex flex-col items-center">
// //                   <label className="mr-2">Document Name</label>
// //                   <select className="border border-gray-300 p-2">
// //                     <option>Document1</option>
// //                     <option>Document2</option>
// //                     <option>Dcoument3</option>
// //                     <option>Document4</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <label className="mr-2">Contains</label>
// //                 <div className="flex flex-col items-center">
// //                   <label className="mr-2">Classifier</label>
// //                   <select className="border border-gray-300 p-2">
// //                     <option>Name</option>
// //                     <option>DOB</option>
// //                     <option>SSN</option>
// //                     <option>Age</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <label className="mr-2">then</label>
// //                 <div className="flex flex-col items-center">
// //                   <label className="mr-2">Action</label>
// //                   <select className="border border-gray-300 p-2">
// //                     <option>Anonymize</option>
// //                     <option>Tokenize</option>
// //                     <option>Encrypt</option>
// //                     <option>De-Identification</option>
// //                   </select>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="flex flex-wrap gap-4 mt-4">
// //               <div className="flex items-center">
// //                 <label className="mr-2">with Value</label>
// //                 <input type="text" className="border border-gray-300 p-2" />
// //               </div>
// //               <div className="flex items-center">
// //                 <label className="mr-2">For</label>
// //                 <div className="flex flex-col items-center">
// //                   <label className="mr-2">Role</label>
// //                   <select className="border border-gray-300 p-2">
// //                     <option>Finance</option>
// //                     <option>HR</option>
// //                     <option>Operations</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <label className="mr-2">at</label>
// //                 <select className="border border-gray-300 p-2">
// //                   <option>All Times</option>
// //                   <option>1 Day</option>
// //                   <option>1 Week</option>
// //                   <option>1 Month</option>
// //                   <option>1 Year</option>
// //                 </select>
// //               </div>
// //             </div>
// //           </div>
// //         );
// //       case "Attribute Filtering":
// //         return (
// //           <div className="p-4 bg-white border border-gray-200 rounded">
// //             <h2 className="text-xl font-semibold mb-4">Attribute Filtering</h2>
// //             <div className="flex flex-wrap gap-4">
// //               <div className="flex items-center">
// //                 <label className="mr-2">If Document</label>
// //                 <div className="flex flex-col items-center">
// //                   <label className="mr-2">Document Name</label>
// //                   <select className="border border-gray-300 p-2">
// //                     <option>Document1</option>
// //                     <option>Document2</option>
// //                     <option>Document3</option>
// //                     <option>Document4</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <label className="mr-2">Contains</label>
// //                 <div className="flex flex-col items-center">
// //                   <label className="mr-2">Attributes</label>
// //                   <select className="border border-gray-300 p-2">
// //                     <option>Dcoument classification</option>
// //                     <option>Docation</option>
// //                     <option>Division</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <label className="mr-2">with</label>
// //                 <div className="flex flex-col items-center">
// //                   <label className="mr-2">value</label>
// //                   <select className="border border-gray-300 p-2">
// //                     <option>Confidential</option>
// //                     <option>Private</option>
// //                     <option>Public</option>
// //                   </select>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="flex flex-wrap gap-4 mt-4">
// //               <div className="flex items-center">
// //                 <label className="mr-2">then</label>
// //                 {/* <input type="text" className="border border-gray-300 p-2" /> */}
// //                 <div className="flex flex-col items-center">
// //                   <label className="mr-2">Action</label>
// //                   <select className="border border-gray-300 p-2">
// //                     <option>Anonymize</option>
// //                     <option>Tokenize</option>
// //                     <option>Encrypt</option>
// //                     <option>De-Identication</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <label className="mr-2">with value</label>
// //                 <input type="text" className="border border-gray-300 p-2" />
// //               </div>
// //               <div className="flex items-center">
// //                 <label className="mr-2">For</label>
// //                 <select className="border border-gray-300 p-2">
// //                   <option>Role1</option>
// //                   <option>Role2</option>
// //                   <option>Role3</option>
// //                   <option>Role4</option>
// //                 </select>
// //               </div>
// //             </div>
// //             <div className="flex flex-wrap gap-4 mt-4">
// //               <div className="flex items-center">
// //                 <label className="mr-2">at</label>
// //                 {/* <input type="text" className="border border-gray-300 p-2" /> */}
// //                 <select className="border border-gray-300 p-2">
// //                   <option>All Times</option>
// //                   <option>Management</option>
// //                 </select>
// //               </div>
// //             </div>
// //           </div>
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="p-4">
// //       {/* Tabs */}
// //       <div className="flex justify-around border-b-2 mb-4">
// //         {["Permissions", "Privacy Filtering", "Attribute Filtering"].map(
// //           (tab) => (
// //             <button
// //               key={tab}
// //               className={`py-2 px-4 text-center ${
// //                 activeTab === tab
// //                   ? "border-b-2 border-blue-500 text-blue-500"
// //                   : ""
// //               }`}
// //               onClick={() => setActiveTab(tab)}
// //             >
// //               {tab}
// //             </button>
// //           )
// //         )}
// //       </div>

// //       {/* Content */}
// //       {renderContent()}
// //     </div>
// //   );
// // };

// // export default DocumentRAG;

// import {
//   faDeleteLeft,
//   faEdit,
//   faPlus,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";

// const DocumentRAG = () => {
//   const [activeTab, setActiveTab] = useState("Permissions");

//   const [privacySections, setPrivacySections] = useState([
//     {
//       id: 1,
//       document: "Document1",
//       contains: "Name",
//       then: "Anonymize",
//       withValue: "",
//       for: "Operations",
//       at: "All Times",
//     },
//   ]);

//   const handleAddSection = () => {
//     setPrivacySections([
//       ...privacySections,
//       {
//         id: Date.now(),
//         document: "Document1",
//         contains: "Name",
//         then: "Anonymize",
//         withValue: "",
//         for: "Operations",
//         at: "All Times",
//       },
//     ]);
//   };

//   const handleRemoveSection = (id) => {
//     setPrivacySections(privacySections.filter((section) => section.id !== id));
//   };

//   const handleChange = (id, field, value) => {
//     setPrivacySections(
//       privacySections.map((section) =>
//         section.id === id ? { ...section, [field]: value } : section
//       )
//     );
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Permissions":
//         return (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border">Document Repository</th>
//                   <th className="px-4 py-2 border">Document Name</th>
//                   <th className="px-4 py-2 border">Original Permissions</th>
//                   <th className="px-4 py-2 border">Revised Permissions</th>
//                   <th className="px-4 py-2 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-4 py-2 border">
//                     <select className="w-full border border-gray-300 p-2">
//                       <option>xyz.sharepoint.t</option>
//                       <option>Item 2</option>
//                       <option>Item 3</option>
//                       <option>Item 4</option>
//                       <option>Item 5</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border"></td>
//                   <td className="px-4 py-2 border"></td>
//                   <td className="px-4 py-2 border"></td>
//                   <td className="px-4 py-2 border">
//                     <button className="bg-blue-500 text-white py-1 px-3 rounded">
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//                 {/* Additional rows can be added here */}
//                 <tr>
//                   <td className="px-4 py-6 border"></td>
//                   <td className="px-4 py-6 border"></td>
//                   <td className="px-4 py-6 border"></td>
//                   <td className="px-4 py-6 border"></td>
//                   <td className="px-4 py-6 border"></td>
//                 </tr>
//                 <tr>
//                   <td className="px-4 py-6 border"></td>
//                   <td className="px-4 py-6 border"></td>
//                   <td className="px-4 py-6 border"></td>
//                   <td className="px-4 py-6 border"></td>
//                   <td className="px-4 py-6 border"></td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );
//       case "Privacy Filtering":
//         return (
//           <>
//             {/* <div className="flex justify-end">
//               <button
//                 className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-500 hover:text-white mb-4"
//                 onClick={handleAddSection}
//               >
//                 +
//               </button>
//             </div>
//             <div className="p-4 bg-white border border-gray-200 rounded">
//               <h2 className="text-xl font-semibold mb-4">Privacy Filtering</h2>

//               {privacySections.map((section) => (
//                 <div
//                   key={section.id}
//                   className="mb-4 border border-gray-300 p-4 rounded"
//                 >
//                   <div className="flex items-center mb-4">
//                     <label className="mr-2 w-20">If</label>
//                     <select
//                       className="border border-gray-300 p-2 mr-2 w-48"
//                       value={section.document}
//                       onChange={(e) =>
//                         handleChange(section.id, "document", e.target.value)
//                       }
//                     >
//                       <option value="Document1">Document1</option>
//                       <option value="Document2">Document2</option>
//                       <option value="Document3">Document3</option>
//                       <option value="Document4">Document4</option>
//                     </select>
//                     <label className="mr-2 w-20">Contains</label>
//                     <select
//                       className="border border-gray-300 p-2 mr-2 w-48"
//                       value={section.contains}
//                       onChange={(e) =>
//                         handleChange(section.id, "contains", e.target.value)
//                       }
//                     >
//                       <option value="Name">Name</option>
//                       <option value="DOB">DOB</option>
//                       <option value="SSN">SSN</option>
//                       <option value="Age">Age</option>
//                     </select>
//                     <label className="mr-2 w-20">Then</label>
//                     <select
//                       className="border border-gray-300 p-2 mr-2 w-48"
//                       value={section.then}
//                       onChange={(e) =>
//                         handleChange(section.id, "then", e.target.value)
//                       }
//                     >
//                       <option value="Anonymize">Anonymize</option>
//                       <option value="contains">Tokenize</option>
//                       <option value="is equal to">Encrypt</option>
//                       <option value="is equal to">De-Identification</option>
//                     </select>
//                     <button
//                       className="ml-2 text-blue-500 border border-red-500 rounded px-2 py-1 hover:bg-red-500 hover:text-white"
//                       onClick={() => handleRemoveSection(section.id)}
//                     >
//                       -
//                     </button>
//                   </div>
//                   <div className="flex items-center mb-4">
//                     <label className="mr-2 w-20">with Value</label>
//                     <input
//                       className="border border-gray-300 p-2 mr-2 w-48"
//                       value={section.withValue}
//                       onChange={(e) =>
//                         handleChange(section.id, "withValue", e.target.value)
//                       }
//                     />

//                     <label className="mr-2 w-20">For</label>
//                     <select
//                       className="border border-gray-300 p-2 mr-2 w-48"
//                       value={section.for}
//                       onChange={(e) =>
//                         handleChange(section.id, "for", e.target.value)
//                       }
//                     >
//                       <option value="Anonymize">Operations</option>
//                       <option value="contains">Finance</option>
//                       <option value="is equal to">HR</option>
//                     </select>
//                     <label className="mr-2 w-20">at</label>
//                     <select
//                       className="border border-gray-300 p-2 mr-2 w-48"
//                       value={section.at}
//                       onChange={(e) =>
//                         handleChange(section.id, "at", e.target.value)
//                       }
//                     >
//                       <option value="is a member of">All Times</option>
//                       <option value="1 Day">1 Day</option>
//                       <option value="1 Week">1 Week</option>
//                       <option value="1 Month">1 Month</option>
//                       <option value="1 Year">1 Year</option>
//                     </select>
//                     <button
//                       className="ml-2 text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-500 hover:text-white"
//                       onClick={handleAddSection}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div> */}

//             <div className="bg-customBlack p-4 rounded-lg shadow-md">
//               <h2 className="text-green-500 text-lg font-semibold">
//                 New Selector
//               </h2>
//               <div className="flex justify-between items-center mb-4">
//                 <div className="flex space-x-2 py-4 px-4">
//                   <select
//                     className="bg-gray-700 text-white px-4 py-2 rounded "
//                     style={{
//                       backgroundColor: "#000000",
//                       borderRadius: "3px",
//                       opacity: "1",
//                       color: "#6A7581",
//                       fontFamily: "Poppins, sans-serif",
//                       fontSize: "16px",
//                       lineHeight: "25px",
//                       textAlign: "left",
//                       letterSpacing: "0px",
//                       width: "264px", // Adjust the width as needed
//                     }}
//                   >
//                     <option>Data Store</option>
//                     {/* Add more options as needed */}
//                   </select>
//                   <select
//                     className="bg-gray-700 text-white px-4 py-2 rounded"
//                     style={{
//                       backgroundColor: "#000000",
//                       borderRadius: "3px",
//                       opacity: "1",
//                       color: "#6A7581",
//                       fontFamily: "Poppins, sans-serif",
//                       fontSize: "16px",
//                       lineHeight: "25px",
//                       textAlign: "left",
//                       letterSpacing: "0px",
//                       width: "264px", // Adjust the width as needed
//                     }}
//                   >
//                     <option>Field Location</option>
//                     {/* Add more options as needed */}
//                   </select>
//                   <select
//                     className="bg-gray-700 text-white px-4 py-2 rounded"
//                     style={{
//                       backgroundColor: "#000000",
//                       borderRadius: "3px",
//                       opacity: "1",
//                       color: "#6A7581",
//                       fontFamily: "Poppins, sans-serif",
//                       fontSize: "16px",
//                       lineHeight: "25px",
//                       textAlign: "left",
//                       letterSpacing: "0px",
//                       width: "264px", // Adjust the width as needed
//                     }}
//                   >
//                     <option>User Filter Value</option>
//                     {/* Add more options as needed */}
//                   </select>
//                   <div className="flex items-center space-x-2">
//                     <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                     <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                       <FontAwesomeIcon icon={faEdit} />
//                     </button>
//                     <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                       <FontAwesomeIcon icon={faDeleteLeft} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-customBlack text-white text-center py-2 rounded mt-2">
//               ADD
//             </div>

//             <div className="bg-customBlack p-4 rounded-lg shadow-md mt-4">
//               <div className="flex flex-col space-y-4">
//                 {/* First Row */}
//                 <div className="flex justify-between items-center space-x-2">
//                   <div className="flex space-x-2 items-center">
//                     <span className="text-white">If Document</span>
//                     <select className="bg-gray-700 text-white px-4 py-2 rounded">
//                       <option>Document Name</option>
//                       {/* Add more options as needed */}
//                     </select>
//                   </div>
//                   <div className="flex space-x-2 items-center">
//                     <span className="text-white">Contains</span>
//                     <select className="bg-gray-700 text-white px-4 py-2 rounded">
//                       <option>Classifier</option>
//                       {/* Add more options as needed */}
//                     </select>
//                   </div>
//                   <div className="flex space-x-2 items-center">
//                     <span className="text-white">Then</span>
//                     <select className="bg-gray-700 text-white px-4 py-2 rounded">
//                       <option>Action</option>
//                       {/* Add more options as needed */}
//                     </select>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 4v16m8-8H4"
//                         />
//                       </svg>
//                     </button>
//                     <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 16h-1v-4H8l4-4 4 4h-3v4z"
//                         />
//                       </svg>
//                     </button>
//                     <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Second Row */}
//                 <div className="flex justify-between items-center space-x-2">
//                   <div className="flex space-x-2 items-center">
//                     <span className="text-white">Allow</span>
//                     <select className="bg-gray-700 text-white px-4 py-2 rounded">
//                       <option>Text Value</option>
//                       {/* Add more options as needed */}
//                     </select>
//                   </div>
//                   <div className="flex space-x-2 items-center">
//                     <span className="text-white">Location</span>
//                     <select className="bg-gray-700 text-white px-4 py-2 rounded">
//                       <option>Select</option>
//                       {/* Add more options as needed */}
//                     </select>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 4v16m8-8H4"
//                         />
//                       </svg>
//                     </button>
//                     <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 16h-1v-4H8l4-4 4 4h-3v4z"
//                         />
//                       </svg>
//                     </button>
//                     <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Add Button */}
//                 <div className="bg-gray-700 text-white text-center py-2 rounded">
//                   ADD
//                 </div>
//               </div>
//             </div>
//           </>
//         );
//       case "Attribute Filtering":
//         return (
//           <div className="p-4 bg-white border border-gray-200 rounded">
//             <h2 className="text-xl font-semibold mb-4">Attribute Filtering</h2>
//             <div className="flex flex-wrap gap-4">
//               <div className="flex items-center">
//                 <label className="mr-2">If Document</label>
//                 <div className="flex flex-col items-center">
//                   <label className="mr-2">Document Name</label>
//                   <select className="border border-gray-300 p-2">
//                     <option>Document1</option>
//                     <option>Document2</option>
//                     <option>Document3</option>
//                     <option>Document4</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <label className="mr-2">Contains</label>
//                 <div className="flex flex-col items-center">
//                   <label className="mr-2">Attributes</label>
//                   <select className="border border-gray-300 p-2">
//                     <option>Document classification</option>
//                     <option>Location</option>
//                     <option>Division</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <label className="mr-2">with</label>
//                 <div className="flex flex-col items-center">
//                   <label className="mr-2">value</label>
//                   <select className="border border-gray-300 p-2">
//                     <option>Confidential</option>
//                     <option>Private</option>
//                     <option>Public</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-4 mt-4">
//               <div className="flex items-center">
//                 <label className="mr-2">then</label>
//                 <div className="flex flex-col items-center">
//                   <label className="mr-2">Action</label>
//                   <select className="border border-gray-300 p-2">
//                     <option>Anonymize</option>
//                     <option>Tokenize</option>
//                     <option>Encrypt</option>
//                     <option>De-Identification</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <label className="mr-2">with value</label>
//                 <input type="text" className="border border-gray-300 p-2" />
//               </div>
//               <div className="flex items-center">
//                 <label className="mr-2">For</label>
//                 <select className="border border-gray-300 p-2">
//                   <option>Role1</option>
//                   <option>Role2</option>
//                   <option>Role3</option>
//                   <option>Role4</option>
//                 </select>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-4 mt-4">
//               <div className="flex items-center">
//                 <label className="mr-2">at</label>
//                 <select className="border border-gray-300 p-2">
//                   <option>All Times</option>
//                   <option>Management</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Tabs */}
//       <div className="flex justify-around border-b-2 mb-4">
//         {["Permissions", "Privacy Filtering", "Attribute Filtering"].map(
//           (tab) => (
//             <button
//               key={tab}
//               className={`py-2 px-4 text-center ${
//                 activeTab === tab
//                   ? "border-b-2 border-blue-500 text-blue-500"
//                   : ""
//               }`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </button>
//           )
//         )}
//       </div>

//       {/* Content */}
//       {renderContent()}
//     </div>
//   );
// };

// export default DocumentRAG;
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "./CustomDropdown"; // Adjust the path accordingly

const ParentComponent = ({ data }) => {
  const [openDropdown, setOpenDropdown] = useState("");
  const [sections, setSections] = useState([
    { id: 1, options: data.documentStoreOptions },
    { id: 2, options: data.documentLocationOptions },
    // Add initial sections as needed
  ]);

  const handleDropdownClick = (row, col) => {
    const key = `${row}-${col}`;
    setOpenDropdown(openDropdown === key ? "" : key);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { id: sections.length + 1, options: data.documentStoreOptions },
    ]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <div>
      <div className="bg-dropdownBackground p-4 shadow-md rounded-t-lg">
        <div className="flex flex-col space-y-4">
          <h2 className="text-green-500 text-lg font-semibold px-4">
            New Selector
          </h2>
        </div>
      </div>
      <div className="bg-customBlack p-4 shadow-md">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap space-x-4 ml-4">
            <div className="flex-1 min-w-[120px] max-w-[528px]">
              <div className="flex items-center">
                <CustomDropdown
                  options={data.documentStoreOptions || []}
                  placeholder="Select Document Store"
                  isOpen={openDropdown === "0-0"}
                  onDropdownClick={() => handleDropdownClick(0, 0)}
                />
              </div>
            </div>
            <div className="flex-1 min-w-[200px] max-w-[528px]">
              <div className="flex items-center">
                <CustomDropdown
                  options={data.documentLocationOptions || []}
                  placeholder="Select Document Location"
                  isOpen={openDropdown === "0-1"}
                  onDropdownClick={() => handleDropdownClick(0, 1)}
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
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex-1 min-w-[200px] max-w-[337px]">
                <div className="flex items-center">
                  <span className="text-white mr-2 custom-label">
                    If Document
                  </span>
                  <CustomDropdown
                    options={data.documentOptions || []}
                    placeholder="Select Document"
                    isOpen={openDropdown === `${section.id}-0`}
                    onDropdownClick={() => handleDropdownClick(section.id, 0)}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] max-w-[337px]">
                <div className="flex items-center">
                  <span className="text-white mr-2 custom-label">
                    Contains
                  </span>
                  <CustomDropdown
                    options={data.containsOptions || []}
                    placeholder="Contains"
                    isOpen={openDropdown === `${section.id}-1`}
                    onDropdownClick={() => handleDropdownClick(section.id, 1)}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] max-w-[337px]">
                <div className="flex items-center">
                  <span className="text-white mr-2 custom-label">With</span>
                  <CustomDropdown
                    options={data.withOptions || []}
                    placeholder="With"
                    isOpen={openDropdown === `${section.id}-2`}
                    onDropdownClick={() => handleDropdownClick(section.id, 2)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex-1 min-w-[200px] max-w-[337px]">
                <div className="flex items-center">
                  <span className="text-white mr-2 custom-label">Then</span>
                  <CustomDropdown
                    options={data.thenOptions || []}
                    placeholder="Then"
                    isOpen={openDropdown === `${section.id}-3`}
                    onDropdownClick={() => handleDropdownClick(section.id, 3)}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] max-w-[337px]">
                <div className="flex items-center">
                  <span className="text-white mr-2 custom-label">For</span>
                  <CustomDropdown
                    options={data.roleOptions || []}
                    placeholder="For"
                    isOpen={openDropdown === `${section.id}-4`}
                    onDropdownClick={() => handleDropdownClick(section.id, 4)}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] max-w-[337px]">
                <div className="flex items-center">
                  <span className="text-white mr-2 custom-label">At</span>
                  <CustomDropdown
                    options={data.atOptions || []}
                    placeholder="At"
                    isOpen={openDropdown === `${section.id}-5`}
                    onDropdownClick={() => handleDropdownClick(section.id, 5)}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex justify-end gap-2 min-w-[100px]"
              style={{ marginRight: "46px" }}
            >
              <button
                className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black"
                onClick={addSection}
              >
                <FontAwesomeIcon
                  className="transition ease-out duration-300 hover:transform hover:scale-110 w-7 h-7"
                  icon={faPlus}
                />
              </button>
              <button
                className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black transition ease-out duration-300"
                onClick={() => removeSection(section.id)}
              >
                <FontAwesomeIcon
                  className="transition ease-out duration-300 hover:transform hover:scale-110 w-7 h-7"
                  icon={faTrash}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParentComponent;


import React from "react";

const FunctionCalling = () => {
  return (
    <>
      <div className="p-4 bg-white border border-gray-200 rounded">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            {/* <label className="mr-2">Run</label> */}
            <div className="flex flex-col items-center">
              <label className="mr-2">Query</label>
              <input
                type="text"
                className="border border-gray-300 p-2"
                value="Net sales orders"
              />
            </div>
          </div>
          <div className="flex items-center">
            {/* <label className="mr-2">On</label> */}
            <div className="flex flex-col items-center">
              <label className="mr-2">Target Application</label>
              <select className="border border-gray-300 p-2">
                <option>Salesforce</option>
                <option>Servicenow</option>
                <option>Microsoft Dynamics</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
            {/* <label className="mr-2">From</label> */}
            <div className="flex flex-col items-center">
              <label className="mr-2">GenAI App</label>
              <select className="border border-gray-300 p-2">
                <option>App1</option>
                <option>App2</option>
                <option>App3</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
          </div>
        </div>
      </div>

      <div className="p-4 mt-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Select API Data
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mt-2">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Data Fields</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-6 border">
                  <select className="w-full border border-gray-300 p-2">
                    <option>Sales Opportunities</option>
                    <option>API2</option>
                    <option>API3</option>
                    <option>API4</option>
                  </select>
                </td>
                <td className="px-4 py-6 border">
                  Retrieve sales opportunities
                </td>
                <td className="px-4 py-6 border">
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Opportunity Name</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Lead Source</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Close_Date</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Account Name</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Amount</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Age</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Type</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Probability</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Created_Date</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"></div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Action on Data
        </h2>

        <div className="">
          <div>
            <label className="block mb-2 font-semibold">DataField</label>
            <select className="w-full border border-gray-300 p-2 mb-4">
              <option>Opportunity Name</option>
              <option>Account Name</option>
              <option>Amount</option>
              <option>Age</option>
            </select>
          </div>

          <h3 className="text-lg font-semibold mb-2">Permissions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Permission</th>
                  <th className="px-4 py-2 border">Existing</th>
                  <th className="px-4 py-2 border">Revised</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">Read</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <span className="border p-2">Sales NA</span>
                      <span className="border p-2">Management</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <input type="checkbox" />
                      <span>Sales NA</span>
                      <input type="checkbox" />
                      <span>Management</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Read + Write</td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mt-2">Privacy Filtering</h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Transformation Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2">
                      <option>Name</option>
                      <option>DOB</option>
                      <option>SSN</option>
                      <option>None</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2">
                      <option>Anonymize</option>
                      <option>Tokenize</option>
                      <option>None</option>
                      <option>De-Identification</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    {/* <select className="w-full border border-gray-300 p-2">
                      <option>None</option>
                      <option>Transformation 1</option>
                    </select> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="">
          <h3 className="text-lg font-semibold mt-2">Attribute Filtering</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Attribute</th>
                  <th className="px-4 py-2 border">Value</th>
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Transformation Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2">
                      <option>Department</option>
                      <option>Location</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2">
                      <option>North America</option>
                      <option>Asia</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2">
                      <option>Allow</option>
                      <option>Reduct</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    {/* <select className="w-full border border-gray-300 p-2">
                      <option>None</option>
                      <option>Transformation 1</option>
                    </select> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div>
              <label className="block mb-2 font-semibold mt-2">DataField</label>
              <select className="w-full border border-gray-300 p-2 mb-4">
                <option>Opportunity Name</option>
                <option>Account Name</option>
                <option>Amount</option>
                <option>Age</option>
              </select>
            </div>

            <table className="min-w-full bg-white border border-gray-200 mt-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Permission</th>
                  <th className="px-4 py-2 border">Existing</th>
                  <th className="px-4 py-2 border">Reviced</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2">
                      <option>Department</option>
                      <option>Location</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2">
                      <option>Noth America</option>
                      <option>Asia</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2">
                      <option>Allow</option>
                      <option>Reduct</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Save
          </button>
          {/* <div className="flex space-x-4">
              <button className="border border-gray-300 p-2 rounded">
                Yes
              </button>
              <button className="border border-gray-300 p-2 rounded">No</button>
            </div> */}
        </div>

        <div>
          <table className="min-w-full bg-white border border-gray-200 mt-2">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">JSON Format</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
              </tr>
              <tr>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default FunctionCalling;