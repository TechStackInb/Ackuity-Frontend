// import {
//   faDeleteLeft,
//   faDownload,
//   faEdit,
//   faMinusSquare,
//   faPlus,
//   faPlusSquare,
//   faTrash,
//   faUserPlus,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
// import "../css/style.css";
// import CustomDropdown from "../components/CustomDropdown";

// const DocumentRAG = () => {
//   const [activeTab, setActiveTab] = useState("Permissions");
//   const [isClicked, setIsClicked] = useState(false);
//   const [isClickedAdd, setIsClickedAdd] = useState(false);

//   const [openDropdown, setOpenDropdown] = useState(null);

//   const handleDropdownClick = (index) => {
//     setOpenDropdown(openDropdown === index ? null : index);
//   };

//   const data = {
//     documentStoreOptions: ["Document Store", "Share Point", "One Drive"],
//     documentLocationOptions: [
//       "Document Location",
//       "Another Option",
//       "Another Option",
//     ],
//     documentOptions: ["Document1", "Document2", "Document3", "Document4"],
//     containsOptions: ["Document Classification", "Location", "Devision"],
//     withOptions: ["Confidential", "Private", "Public"],
//     thenOptions: ["Anonymize", "Tokenize", "Encrypt", "De-identification"],
//     roleOptions: ["Role1", "Role2", "Role3", "Role4"],
//     atOptions: ["All times", "one Day", "Aone Week", "All Month"],
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Permissions":
//         return <div className="overflow-x-auto"></div>;
//       case "Privacy Filtering":
//         return <></>;
//       case "Attribute Filtering":
//         return (
//           <>
//             {/* Section 1 */}
//             <div className="bg-dropdownBackground p-4 shadow-md">
//               <div className="flex flex-col space-y-4">
//                 <h2 className="text-green-500 text-lg font-semibold px-4">
//                   New Selector
//                 </h2>
//               </div>
//             </div>
//             <div className="bg-customBlack p-4  shadow-md">
//               <div className="flex flex-col space-y-4">
//                 {/* <h2 className="text-green-500 text-lg font-semibold px-4">
//                   New Selector
//                 </h2> */}
//                 <div className="flex space-x-4 ml-4">
//                   <div className="flex-1 min-w-[120px] max-w-[528px]">
//                     <div className="flex items-center">
//                       <CustomDropdown
//                         options={data.documentStoreOptions || []}
//                         placeholder="Select Document Store"
//                         isOpen={openDropdown === 0}
//                         onDropdownClick={() => handleDropdownClick(0)}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-[200px] max-w-[528px]">
//                     <div className="flex items-center">
//                       <CustomDropdown
//                         options={data.documentLocationOptions || []}
//                         placeholder="Select Document Location"
//                         isOpen={openDropdown === 1}
//                         onDropdownClick={() => handleDropdownClick(1)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Section 2 */}

//             <div className="bg-customBlack p-4 rounded-lg shadow-md mt-4">
//               <div className="flex flex-col space-y-4">
//                 <div className="flex flex-wrap gap-4 justify-center">
//                   <div className="flex-1 min-w-[200px] max-w-[337px]">
//                     <div className="flex items-center">
//                       <span className="text-white mr-2 custom-label">
//                         If Document
//                       </span>
//                       <CustomDropdown
//                         options={data.documentOptions || []}
//                         placeholder="Select Document"
//                         isOpen={openDropdown === 3}
//                         onDropdownClick={() => handleDropdownClick(3)}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-[200px] max-w-[337px]">
//                     <div className="flex items-center ">
//                       <span className="text-white mr-2 custom-label">
//                         Contains
//                       </span>
//                       <CustomDropdown
//                         options={data.containsOptions || []}
//                         placeholder="Contains"
//                         isOpen={openDropdown === 4}
//                         onDropdownClick={() => handleDropdownClick(4)}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-[200px] max-w-[337px]">
//                     <div className="flex items-center">
//                       <span className="text-white mr-2 custom-label">With</span>
//                       <CustomDropdown
//                         options={data.withOptions || []}
//                         placeholder="With"
//                         isOpen={openDropdown === 5}
//                         onDropdownClick={() => handleDropdownClick(5)}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-4 justify-center">
//                   <div className="flex-1 min-w-[200px] max-w-[337px]">
//                     <div className="flex items-center">
//                       <span className="text-white mr-2 custom-label">Then</span>
//                       <CustomDropdown
//                         options={data.thenOptions || []}
//                         placeholder="Then"
//                         isOpen={openDropdown === 6}
//                         onDropdownClick={() => handleDropdownClick(6)}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-[200px] max-w-[337px]">
//                     <div className="flex items-center">
//                       <span className="text-white mr-2 custom-label">For</span>
//                       <CustomDropdown
//                         options={data.roleOptions || []}
//                         placeholder="For"
//                         isOpen={openDropdown === 7}
//                         onDropdownClick={() => handleDropdownClick(7)}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-[200px] max-w-[337px]">
//                     <div className="flex items-center">
//                       <span className="text-white mr-2 custom-label">At</span>
//                       <CustomDropdown
//                         options={data.atOptions || []}
//                         placeholder="At"
//                         isOpen={openDropdown === 8}
//                         onDropdownClick={() => handleDropdownClick(8)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-end gap-2 min-w-[100px]">
//                   <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                     <FontAwesomeIcon icon={faPlus} />
//                   </button>
//                   <button className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded">
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`bg-customBlack text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform hover:bg-customGreen hover:text-white cursor-pointer ${
//                 isClickedAdd ? "border-2 border-green-500" : ""
//               }`}
//               onClick={() => setIsClickedAdd(!isClickedAdd)}
//             >
//               Save Policy
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="page-center p-4">
//       {/* Tabs */}
//       <div className="p-4 bg-customGreen bg-bubble-pattern  rounded  mb-4">
//         <h2 className="text-xl font-semibold mb-4 text-customWhite">
//           Policy Manager
//         </h2>
//         <h2 className="text-sm font-semibold mb-4">
//           Policy Manager
//           <span className="text-customWhite"> / Document</span>
//         </h2>
//       </div>
//       <div className="flex justify-around mb-4">
//         {["Permissions", "Privacy Filtering", "Attribute Filtering"].map(
//           (tab) => (
//             <button
//               key={tab}
//               className={`flex items-center w-full h-15 py-3 px-4 text-left ${
//                 activeTab === tab
//                   ? "bg-[#31B476] text-white"
//                   : "bg-black text-[#31E48F] "
//               }`}
//               onClick={() => setActiveTab(tab)}
//             >
//               <span className="font-semibold text-16 leading-6">{tab}</span>
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
import {
  faDeleteLeft,
  faDownload,
  faEdit,
  faMinusSquare,
  faPlus,
  faPlusSquare,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../css/style.css";
import CustomDropdown from "../components/CustomDropdown";

const DocumentRAG = () => {
  const [activeTab, setActiveTab] = useState("Permissions");
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sections, setSections] = useState([{ id: Date.now() }]); // Array to hold section data

  const handleDropdownClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const addSection = () => {
    setSections([...sections, { id: Date.now() }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const data = {
    documentStoreOptions: ["Document Store", "Share Point", "One Drive"],
    documentLocationOptions: [
      "Document Location",
      "Another Option",
      "Another Option",
    ],
    documentOptions: ["Document1", "Document2", "Document3", "Document4"],
    containsOptions: ["Document Classification", "Location", "Devision"],
    withOptions: ["Confidential", "Private", "Public"],
    thenOptions: ["Anonymize", "Tokenize", "Encrypt", "De-identification"],
    roleOptions: ["Role1", "Role2", "Role3", "Role4"],
    atOptions: ["All times", "one Day", "Aone Week", "All Month"],
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Permissions":
        return <div className="overflow-x-auto"></div>;
      case "Privacy Filtering":
        return <></>;
      case "Attribute Filtering":
        return (
          <>
            {/* Section 1 */}
            <div className="bg-dropdownBackground p-4 shadow-md">
              <div className="flex flex-col space-y-4">
                <h2 className="text-green-500 text-lg font-semibold px-4">
                  New Selector
                </h2>
              </div>
            </div>

            {sections.map((section, index) => (
              <div
                key={section.id}
                className="bg-customBlack p-4 rounded-lg shadow-md mt-4"
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex-1 min-w-[200px] max-w-[337px]">
                      <div className="flex items-center">
                        <span className="text-white mr-2 custom-label">
                          If Document
                        </span>
                        <CustomDropdown
                          options={data.documentOptions || []}
                          placeholder="Select Document"
                          isOpen={openDropdown === index * 3 + 3}
                          onDropdownClick={() =>
                            handleDropdownClick(index * 3 + 3)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-[200px] max-w-[337px]">
                      <div className="flex items-center ">
                        <span className="text-white mr-2 custom-label">
                          Contains
                        </span>
                        <CustomDropdown
                          options={data.containsOptions || []}
                          placeholder="Contains"
                          isOpen={openDropdown === index * 3 + 4}
                          onDropdownClick={() =>
                            handleDropdownClick(index * 3 + 4)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-[200px] max-w-[337px]">
                      <div className="flex items-center">
                        <span className="text-white mr-2 custom-label">
                          With
                        </span>
                        <CustomDropdown
                          options={data.withOptions || []}
                          placeholder="With"
                          isOpen={openDropdown === index * 3 + 5}
                          onDropdownClick={() =>
                            handleDropdownClick(index * 3 + 5)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex-1 min-w-[200px] max-w-[337px]">
                      <div className="flex items-center">
                        <span className="text-white mr-2 custom-label">
                          Then
                        </span>
                        <CustomDropdown
                          options={data.thenOptions || []}
                          placeholder="Then"
                          isOpen={openDropdown === index * 3 + 6}
                          onDropdownClick={() =>
                            handleDropdownClick(index * 3 + 6)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-[200px] max-w-[337px]">
                      <div className="flex items-center">
                        <span className="text-white mr-2 custom-label">
                          For
                        </span>
                        <CustomDropdown
                          options={data.roleOptions || []}
                          placeholder="For"
                          isOpen={openDropdown === index * 3 + 7}
                          onDropdownClick={() =>
                            handleDropdownClick(index * 3 + 7)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-[200px] max-w-[337px]">
                      <div className="flex items-center">
                        <span className="text-white mr-2 custom-label">At</span>
                        <CustomDropdown
                          options={data.atOptions || []}
                          placeholder="At"
                          isOpen={openDropdown === index * 3 + 8}
                          onDropdownClick={() =>
                            handleDropdownClick(index * 3 + 8)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 min-w-[100px]">
                    <button
                      className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded"
                      onClick={addSection}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded"
                      onClick={() => removeSection(section.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div
              className={`bg-customBlack text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform hover:bg-customGreen hover:text-white cursor-pointer ${
                isClickedAdd ? "border-2 border-green-500" : ""
              }`}
              onClick={() => setIsClickedAdd(!isClickedAdd)}
            >
              Save Policy
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-center p-4">
      {/* Tabs */}
      <div className="p-4 bg-customGreen bg-bubble-pattern rounded mb-4">
        <h2 className="text-xl font-semibold mb-4 text-customWhite">
          Policy Manager
        </h2>
        <h2 className="text-sm font-semibold mb-4">
          Policy Manager
          <span className="text-customWhite"> / Document</span>
        </h2>
      </div>
      <div className="flex justify-around mb-4">
        {["Permissions", "Privacy Filtering", "Attribute Filtering"].map(
          (tab) => (
            <button
              key={tab}
              className={`flex items-center w-full h-15 py-3 px-4 text-left ${
                activeTab === tab
                  ? "bg-[#31B476] text-white"
                  : "bg-black text-[#31E48F]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="font-semibold text-16 leading-6">{tab}</span>
            </button>
          )
        )}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default DocumentRAG;


// import React, { useState } from "react";

// const DocumentRAG = () => {
//   const [activeTab, setActiveTab] = useState("Permissions");

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
//           <div className="p-4 bg-white border border-gray-200 rounded">
//             <h2 className="text-xl font-semibold mb-4">Privacy Filtering</h2>
//             <div className="flex flex-wrap gap-4">
//               <div className="flex items-center">
//                 <label className="mr-2">If Document</label>
//                 <div className="flex flex-col items-center">
//                   <label className="mr-2">Document Name</label>
//                   <select className="border border-gray-300 p-2">
//                     <option>Document1</option>
//                     <option>Document2</option>
//                     <option>Dcoument3</option>
//                     <option>Document4</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <label className="mr-2">Contains</label>
//                 <div className="flex flex-col items-center">
//                   <label className="mr-2">Classifier</label>
//                   <select className="border border-gray-300 p-2">
//                     <option>Name</option>
//                     <option>DOB</option>
//                     <option>SSN</option>
//                     <option>Age</option>
//                   </select>
//                 </div>
//               </div>
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
//             </div>
//             <div className="flex flex-wrap gap-4 mt-4">
//               <div className="flex items-center">
//                 <label className="mr-2">with Value</label>
//                 <input type="text" className="border border-gray-300 p-2" />
//               </div>
//               <div className="flex items-center">
//                 <label className="mr-2">For</label>
//                 <div className="flex flex-col items-center">
//                   <label className="mr-2">Role</label>
//                   <select className="border border-gray-300 p-2">
//                     <option>Finance</option>
//                     <option>HR</option>
//                     <option>Operations</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <label className="mr-2">at</label>
//                 <select className="border border-gray-300 p-2">
//                   <option>All Times</option>
//                   <option>1 Day</option>
//                   <option>1 Week</option>
//                   <option>1 Month</option>
//                   <option>1 Year</option>
//                 </select>
//               </div>
//             </div>
//           </div>
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
//                     <option>Dcoument classification</option>
//                     <option>Docation</option>
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
//                 {/* <input type="text" className="border border-gray-300 p-2" /> */}
//                 <div className="flex flex-col items-center">
//                   <label className="mr-2">Action</label>
//                   <select className="border border-gray-300 p-2">
//                     <option>Anonymize</option>
//                     <option>Tokenize</option>
//                     <option>Encrypt</option>
//                     <option>De-Identication</option>
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
//                 {/* <input type="text" className="border border-gray-300 p-2" /> */}
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

import {
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../css/style.css";
import CustomDropdown from "../components/CustomDropdown";

const DocumentRAG = () => {
  const [activeTab, setActiveTab] = useState("Permissions");
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sections, setSections] = useState([{ id: Date.now() }]);

  const handleDropdownClick = (sectionId, index) => {
    setOpenDropdown(
      openDropdown === `${sectionId}-${index}` ? null : `${sectionId}-${index}`
    );
  };

  const addSection = () => {
    setSections([...sections, { id: Date.now() }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const data = {
    documentStoreOptions: ["Document Store", "Share Point", "One Drive"],
    documentLocationOptions: ["Document Location", "Another Option", "Another Option"],
    documentOptions: ["Document1", "Document2", "Document3", "Document4"],
    containsOptions: ["Document Classification", "Location", "Division"],
    withOptions: ["Confidential", "Private", "Public"],
    thenOptions: ["Anonymize", "Tokenize", "Encrypt", "De-identification"],
    roleOptions: ["Role1", "Role2", "Role3", "Role4"],
    atOptions: ["All times", "one Day", "one Week", "All Month"],
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Permissions":
        return <div className="overflow-x-auto"></div>;
      case "Privacy Filtering":
        return <></>;
      case "Attribute Filtering":
        return (
          <>
            {/* Section 1 */}
            <div className="bg-dropdownBackground p-4 shadow-md">
              <div className="flex flex-col space-y-4">
                <h2 className="text-green-500 text-lg font-semibold px-4">New Selector</h2>
              </div>
            </div>
            <div className="bg-customBlack p-4 shadow-md">
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4 ml-4">
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
              <div key={section.id} className="bg-customBlack p-4 rounded-lg shadow-md mt-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex-1 min-w-[200px] max-w-[337px]">
                      <div className="flex items-center">
                        <span className="text-white mr-2 custom-label">If Document</span>
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
                        <span className="text-white mr-2 custom-label">Contains</span>
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
                  <div className="flex justify-end gap-2 min-w-[100px]">
                    <button
                      className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded"
                      onClick={addSection}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-2 rounded"
                      onClick={() => removeSection(section.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div
              className={`bg-customBlack text-white text-center py-2 rounded mt-2 transition-all duration-300 ease-out transform hover:bg-customGreen hover:text-white cursor-pointer ${
                isClickedAdd ? "border-2 border-green-500" : ""
              }`}
              onClick={() => setIsClickedAdd(!isClickedAdd)}
            >
              Save Policy
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-center p-4">
      {/* Tabs */}
      <div className="p-4 bg-customGreen bg-bubble-pattern rounded mb-4">
        <h2 className="text-xl font-semibold mb-4 text-customWhite">Policy Manager</h2>
        <h2 className="text-sm font-semibold mb-4">
          Policy Manager<span className="text-customWhite"> / Document</span>
        </h2>
      </div>
      <div className="flex justify-around mb-4">
        {["Permissions", "Privacy Filtering", "Attribute Filtering"].map((tab) => (
          <button
            key={tab}
            className={`flex items-center w-full h-15 py-3 px-4 text-left ${
              activeTab === tab ? "bg-[#31B476] text-white" : "bg-black text-[#31E48F]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <span className="font-semibold text-16 leading-6">{tab}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default DocumentRAG;

