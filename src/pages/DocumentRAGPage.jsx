import React, { useState } from "react";
import "../css/style.css";

import PermissionsTab from "../components/PermissionsTab";
import PrivacyFilteringTab from "../components/PrivacyFilteringTab";
import AttributeFilteringTab from "../components/AttributeFilteringTab";
import Modal from "../components/Model";

const DocumentRAG = () => {
  const [activeTab, setActiveTab] = useState("Permissions");
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

  const renderContent = () => {
    switch (activeTab) {
      case "Permissions":
        return <PermissionsTab />;
      case "Privacy Filtering":
        return <PrivacyFilteringTab handleSavePolicy={handleSavePolicy} />;
      case "Attribute Filtering":
        return <AttributeFilteringTab handleSavePolicy={handleSavePolicy} />;
      default:
        return null;
    }
  };

  return (
    <div className="page-center p-4">
      {/* Tabs */}
      <div className="p-4 bg-[#30b375] bg-bubble-pattern rounded-md mb-4">
        <h2 className="text-3xl font-poppins font-semibold mb-4 text-customWhite">
          Policy Manager
        </h2>
        <h2 className="text-sm text-[#2F3A45] font-poppins mb-4">
          Policy Manager
          <span className="text-customWhite text-sm"> / Document</span>
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
