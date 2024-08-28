
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import "../css/style.css";
import CustomDropdown from "../components/CustomDropdown";
import { AuthContext } from "../contexts/AuthContext";

const AttributeFilteringTab = ({ handleSavePolicy }) => {
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sections, setSections] = useState([{ id: Date.now(), values: {} }]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const [policies, setPolicies] = useState([]);

  const { authState } = useContext(AuthContext);
  const { data } = authState;

  console.log(data);

  // const { auth } = useAuth();

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
    setOpenDropdown(null); // Close the dropdown after selection
  };

  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleOptionClick = (dropdownId, option) => {
    setSelectedOptions({ ...selectedOptions, [dropdownId]: option });
    setOpenDropdown(null);
  };




  return (
    <div>
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
                      options={data.documentOptions || []}
                      placeholder="Select Document"
                      isOpen={openDropdown === `${section.id}-0`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 0)
                      }
                      selectedOption={section.values["document"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "document", value)
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
                      options={data.containsOptions || []}
                      placeholder="Select Contains"
                      isOpen={openDropdown === `${section.id}-1`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 1)
                      }
                      selectedOption={section.values["contains"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "contains", value)
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
                      options={data.withOptions || []}
                      placeholder="Select With"
                      isOpen={openDropdown === `${section.id}-2`}
                      onDropdownClick={() =>
                        handleDropdownClick1(section.id, 2)
                      }
                      selectedOption={section.values["with"] || ""}
                      setSelectedOption={(value) =>
                        handleDropdownChange(section.id, "with", value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttributeFilteringTab;
