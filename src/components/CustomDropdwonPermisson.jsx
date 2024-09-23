import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const CustomDropdwonPermisson = ({
  options,
  placeholder,
  isOpen,
  onDropdownClick,
  selectedOption,
  setSelectedOption,
}) => {
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onDropdownClick();
  };

  return (
    <div className="relative inline-block text-left w-full mb-2 md:mb-2">
      <div
        className={`custom-select px-4 py-3 cursor-pointer font-poppins text-[#FFFFFF] ${
          isOpen ? "open" : ""
        }`}
        onClick={onDropdownClick}
      >
        {selectedOption || placeholder}
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full shadow-lg bg-[#080707] ring-1 ring-black ring-opacity-5">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer text-dropdownTextColor hover:text-customHoverGreen flex items-center font-poppins"
              onClick={() => handleOptionClick(option)}
              style={{ fontSize: "15px" }}
            >
              <span className="dot-circles"></span>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdwonPermisson;
