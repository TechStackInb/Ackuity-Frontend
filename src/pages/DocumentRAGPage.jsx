import React, { useState } from "react";
import "../css/style.css";

import PermissionsTab from "../components/PermissionsTab";
import PrivacyFilteringTab from "../components/PrivacyFilteringTab";
import AttributeFilteringTab from "../components/AttributeFilteringTab";
import Modal from "../components/Model";

const DocumentRAG = () => {
  const [activeTab, setActiveTab] = useState("Permissions");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sections, setSections] = useState([
    {
      id: Date.now(),
      values: {
        documentStore: "",
        documentLocation: "",
        documentName: "",
      },
      members: [],
    },
  ]);

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

  const renderContent = () => {
    switch (activeTab) {
      case "Permissions":
        return <PermissionsTab sections={sections} setSections={setSections} />;
      case "Privacy Filtering":
        return (
          <PrivacyFilteringTab
            sections={sections}
            setSections={setSections}
            handleSavePolicy={handleSavePolicy}
          />
        );
      case "Attribute Filtering":
        return (
          <AttributeFilteringTab
            sections={sections}
            setSections={setSections}
            handleSavePolicy={handleSavePolicy}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-center p-4">
      {/* Tabs */}

      <div className="p-4 bg-[#30b375] bg-bubble-pattern  rounded-md  mb-4 ">
        <div className="page-center">
          <h2 className="text-3xl font-poppins font-semibold mb-4 text-customWhite">
            Policy Manager
          </h2>
          <h2 className="text-sm text-[#2F3A45] font-poppins ">
            Policy Manager
            <span className="text-customWhite text-sm"> / Document RAG</span>
          </h2>
        </div>
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
              <span className="font-poppins font-semibold leading-6 text-[11px] sm:text-base">
                {tab}
              </span>
            </button>
          )
        )}
      </div>

      {/* Content */}
      {renderContent()}

      {/* Modal */}
      {isModalOpen && (
        <Modal
          message="Are you sure you want to save this policy?"
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default DocumentRAG;
