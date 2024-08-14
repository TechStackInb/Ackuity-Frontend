import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../css/style.css";

const Dropdown = ({
  items,
  icon,
  backgroundColor,
  textColor,
  iconColor,
  onItemClick,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items.name);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (subItemName) => {
    setSelectedItem(subItemName);
    setIsOpen(false);
    onItemClick(subItemName);
  };

  return (
    <div className="relative" style={{ width }}>
      <div
        className={`p-3 cursor-pointer flex items-center justify-between ${backgroundColor} ${textColor} dropdown-item`}
        onClick={handleToggle}
      >
        <div className="flex items-center">
          {icon && (
            <FontAwesomeIcon icon={icon} className={`mr-3 ${iconColor}`} />
          )}
          <span className="dropdown-item-text text-sizess font-poppins">
            {selectedItem}
          </span>{" "}
          {/* Specific class for text */}
        </div>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>

      {isOpen && (
        <ul
          className={`absolute left-0 w-full ${backgroundColor} sub-items-containers`}
        >
          {items.subItems.map((subItem) => (
            <li
              key={subItem.name}
              className={`sub-items gap-[0.25] p-2 cursor-pointer  hover:text-customHoverGreen font-poppins ${textColor}`}
              onClick={() => handleItemClick(subItem.name)}
            >
              <div
                className={`dot ${
                  subItem.name === selectedItem
                    ? "bg-customGreen"
                    : "bg-gray-600"
                }`}
              ></div>
              <span>{subItem.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
