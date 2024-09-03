import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import iconsmodel from "../assets/iconsmodel.svg";

function ThreeDotsButton({ onClick }) {
  return (
    <button onClick={onClick} className="text-[#6A7581] hover:text-customGreen">
      {/* <FontAwesomeIcon
        icon={faEllipsisV}
        className="transition ease-out duration-300 hover:transform hover:scale-110 w-6 h-6"
      /> */}
      <img src={iconsmodel} alt="iconsmodel" />
    </button>
  );
}

export default ThreeDotsButton;
