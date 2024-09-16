<tbody className="bg-customTablebG">
<tr>
  <td className="pl-4  border border-customBorderColor text-customWhite bg-black">
    <PrivacyCustomDropdown
      options={data.attributeOption || []}
      placeholder="Select Repository"
      // width={"188px"}
      isOpen={openDropdown === "attributeOption"}
      onDropdownClick={() =>
        handleDropdownClick("attributeOption")
      }
      selectedOption={selectedOptions["attributeOption"]}
      onOptionClick={(option) =>
        handleOptionClick("attributeOption", option)
      }
    />
  </td>
  <td className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]">
    <PrivacyCustomDropdown
      options={data.documentOption || []}
      placeholder="Select Document"
      // width={"188px"}
      isOpen={openDropdown === "documentOption"}
      onDropdownClick={() =>
        handleDropdownClick("documentOption")
      }
      selectedOption={selectedOptions["documentOption"]}
      onOptionClick={(option) =>
        handleOptionClick("documentOption", option)
      }
    />
  </td>
  <td className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]">
    <div className="relative">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="font-poppins text-base">
            Everyone System
          </span>
          <span className="font-poppins text-sm">
            alice@acme.com
          </span>
          <span className="font-poppins text-sm">
            bob@acme.com
          </span>
        </div>
        <div className="flex">
          <button onClick={toggleMembership}>
            <ThreeDotsButton />
          </button>
        </div>
      </div>

      {showMembership && (
        <div className="absolute top-[10%] right-0 bg-gray-800 rounded-lg shadow-lg w-80">
          <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg">
            <span className="text-base font-poppins font-semibold">
              Group Membership
            </span>
            <button
              className="absolute top-0 right-0 transform -translate-y-1/2  text-green-400 bg-[#FFFFFF] rounded-full"
              onClick={toggleMembership}
              style={{
                width: "29px",
                height: "29px",
                background: "#FFFFFF",
                border: "2px solid #31B47663",
                opacity: 1,
              }}
            >
              &times;
            </button>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white tex-sm font-poppins font-medium">
                {members.length} Members
              </span>
            </div>

            {members.map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center text-black bg-gray-700 rounded-full">
                    <img
                      src={userIcon}
                      alt="icons"
                      style={{
                        width: "47px",
                        height: "47px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col ml-3">
                    <span className="text-white block text-base font-poppins font-semibold">
                      {member.name}
                    </span>
                    <span className="text-gray-400 text-sm font-poppins font-normal">
                      Member{" "}
                      <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </td>

</tr>

</tbody>