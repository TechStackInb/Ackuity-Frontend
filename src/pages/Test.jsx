{sections.map((section, index) => (
  <tr key={section.id}>
    <td
      className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px] "
      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
    >
      <CustomDropdwonPermisson
        options={data.documentStore || []}
        placeholder="Select Document Store"
        isOpen={openDropdown === `${section.id}-0`}
        onDropdownClick={() =>
          handleDropdownClick1(section.id, 0)
        }
        selectedOption={section.values.documentStore || ""}
        setSelectedOption={(value) =>
          handleDropdownChange(
            section.id,
            "documentStore",
            value
          )
        }
      />
    </td>
    <td
      className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[750px] md:w-[600px] sm:w-[450px] "
      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
    >
      <CustomDropdwonPermisson
        options={data.documentLocation || []}
        placeholder="Select Document Location"
        isOpen={openDropdown === `${section.id}-1`}
        onDropdownClick={() =>
          handleDropdownClick1(section.id, 1)
        }
        selectedOption={section.values.documentLocation || ""}
        setSelectedOption={(value) =>
          handleDropdownChange(
            section.id,
            "documentLocation",
            value
          )
        }
      />
    </td>
    <td
      className="px-4  border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[200px] md:w-[180px] sm:w-[150px]"
      // width={"200px"}
      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
    >
      <CustomDropdwonPermisson
        options={data.documentName || []}
        placeholder="Select Document"
        isOpen={openDropdown === `${section.id}-2`}
        onDropdownClick={() =>
          handleDropdownClick1(section.id, 2)
        }
        selectedOption={section.values.documentName || ""}
        setSelectedOption={(value) =>
          handleDropdownChange(
            section.id,
            "documentName",
            value
          )
        }
      />
    </td>
    <td
      className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]"
      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
    >
      <div className="relative">
        <div className="flex  flex-col items-start">
          <div className="flex flex-col">
            {/* <span className="font-poppins text-base">
              Everyone System
            </span> */}
            <span className="text-white block text-base font-poppins font-semibold">
              Vinod@mail.com
            </span>
            <span className="text-white block text-base font-poppins font-semibold">
              Rajat@gmail.com
            </span>
          </div>
          <div className="flex">
            <button onClick={toggleMemberships}>
              <ThreeDotsButton />
            </button>
          </div>
        </div>

        {showMembership && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
              <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg relative">
                  <span className="text-base font-poppins font-semibold">
                    Group Membership
                  </span>
                  <button
                    className="absolute top-2 right-2 text-green-400 bg-white rounded-full"
                    onClick={toggleMemberships}
                    style={{
                      width: "29px",
                      height: "29px",
                      border: "2px solid #31B47663",
                    }}
                  >
                    &times;
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white text-sm font-poppins font-medium">
                      2 Members
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex ">
                      <div
                        className="flex items-center justify-center text-[black] bg-gray-700 rounded-full"
                        // style={{
                        //   width: "47px",
                        //   height: "47px",
                        //   background: "#FFFFFF",
                        //   opacity: 1,
                        // }}
                      >
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
                          Vinod Vasudevan
                        </span>
                        <span className="text-gray-400 text-sm font-poppins font-normal">
                          Member{" "}
                          <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-600"></div>
                    <div className="flex ">
                      <div
                        className="flex items-center justify-center text-[black] bg-gray-700 rounded-full"
                        style={{
                          width: "47px",
                          height: "47px",
                          background: "#FFFFFF",
                          opacity: 1,
                        }}
                      >
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
                          Rajat Mohanty
                        </span>
                        <span className="text-gray-400 text-sm font-poppins font-normal">
                          Member{" "}
                          <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </td>
    <td
      className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]"
      style={{ paddingTop: "3rem", paddingBottom: "7rem" }}
    >
      <div className="relative">
        <div>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              {/* <span className="font-poppins text-base">
                Everyone System
              </span> */}
              {(section.members || []).map(
                (member, memberIndex) => (
                  <div
                    key={memberIndex}
                    className="flex justify-between items-center mb-4"
                  >
                    <span className="font-poppins text-base">
                      {member.email}
                    </span>
                  </div>
                )
              )}
            </div>
            <div className="flex">
              <button
                onClick={() => toggleEditMembership(index)}
                className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="transition ease-out duration-300 hover:transform hover:scale-110 "
                />
              </button>
            </div>
          </div>

          {activeSectionIndex === index &&
            showEditMembership && (
              <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                  <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
                    <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg relative">
                      <span className="text-base font-poppins font-semibold">
                        Group Membership
                      </span>
                      <button
                        className="absolute top-2 right-2 text-green-400 bg-white rounded-full"
                        onClick={() =>
                          toggleEditMembership(index)
                        } // Close modal for this section
                        style={{
                          width: "29px",
                          height: "29px",
                          border: "2px solid #31B47663",
                        }}
                      >
                        &times;
                      </button>
                    </div>
                    <div className="p-4 space-y-4">
                      {section.members.map(
                        (member, memberIndex) => (
                          <div
                            key={memberIndex}
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
                              <div className="flex flex-col ml-3 text-left">
                                <span className="text-white block text-base font-poppins font-semibold">
                                  {member.name}
                                </span>
                                <span className="text-gray-400 text-sm font-poppins font-normal">
                                  Member{" "}
                                  <FontAwesomeIcon
                                    icon={faAngleDown}
                                  />
                                </span>
                              </div>
                            </div>
                            <button
                              className="flex items-center justify-center text-green-400 bg-gray-700 rounded-full transition-colors duration-200 ease-in-out"
                              style={{
                                width: "29px",
                                height: "29px",
                                background: "#FFFFFF00",
                                border: "2px solid #31B47663",
                              }}
                              onClick={() =>
                                removeMember(
                                  member,
                                  activeSectionIndex
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          </div>
                        )
                      )}
                      <div className="flex items-center justify-between bg-[#1B1E26] border border-[#31B47633] rounded-[5px] p-3">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearch}
                          placeholder="Add new member"
                          className="bg-transparent text-white placeholder-gray-400 w-full outline-none"
                        />
                        <FontAwesomeIcon
                          className="text-[#31B476]"
                          icon={faSearch}
                        />
                      </div>
                

                      {errorMessage && (
                        <div className="text-red-500 mb-4">
                          {errorMessage}
                        </div>
                      )}
                      <div className="flex justify-end gap-4 mt-4 group">
                        <button
                          onClick={handleSave}
                          className="flex items-center bg-[#1B1E26] hover:bg-[#31E48F] text-white px-4 py-2 rounded-lg group-hover:text-white"
                          disabled={loading} // Disable button while loading
                        >
                          {loading ? (
                            <FontAwesomeIcon
                              icon={faSpinner}
                              spin
                              className="mr-2"
                            />
                          ) : (
                            <img
                              src={iconsmodel}
                              alt="iconsmodel"
                              className="mr-2 btn-icon"
                            />
                          )}
                          <span>
                            {loading ? "Saving..." : "Save"}
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            toggleEditMembership(index)
                          }
                          className="text-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>

  
      </div>
    </td>
  
  </tr>
))}