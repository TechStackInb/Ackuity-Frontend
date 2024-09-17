{savedData.map((data, index) => (
  <tr key={index}>
    {/* Repository Dropdown */}
    <td className="px-4 py-6 border border-customBorderColor bg-[#000000] text-white">
      {data.documentRepository}
    </td>

    {/* Document Dropdown */}
    <td className="px-4 py-6 border border-customBorderColor bg-[#000000] text-white">
      {data.documentName}
    </td>

    <td className="px-4 py-6 border border-customBorderColor bg-[#000000]">
      <div className="relative">
        <div className="flex justify-between items-start">
          <div className="flex">
            <button
              onClick={() => toggleMembershipEdit(index)}
              className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="transition ease-out duration-300 hover:transform hover:scale-110 "
              />
            </button>
          </div>
        </div>

        {openeditMembershipIndex === index && (
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
                    onClick={() => toggleMembershipEdit(index)}
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

                  {/* Divider */}
                  <div className="border-t border-gray-600"></div>

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

                  {searchResults.length > 0 && (
                    <div>
                      {searchResults.map((user) => (
                        <div
                          key={user._id}
                          className="flex items-center justify-between bg-[#1B1E26] border border-[#31B476] rounded-[5px] p-3 mt-2"
                        >
                          <div className="flex items-center">
                            <img
                              src={userIcon}
                              className="text-[#31B476]"
                              style={{
                                width: "29px",
                                height: "29px",
                              }}
                              alt="User Icon"
                            />
                            <span className="ml-3 text-white font-poppins font-semibold text-sm">
                              {user.name}
                            </span>
                          </div>
                          <button
                            className="flex items-center justify-center text-green-400 bg-gray-700 rounded-full"
                            style={{
                              width: "29px",
                              height: "29px",
                              background: "#FFFFFF00",
                              border: "2px solid #31B47663",
                            }}
                            onClick={() => addMember(user)}
                            onMouseEnter={() =>
                              setHoveredAddIndex(user._id)
                            }
                            onMouseLeave={() =>
                              setHoveredAddIndex(null)
                            }
                            title="Add Member"
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              className={`transition-transform duration-300 ${
                                hoveredAddIndex === user._id
                                  ? "text-green-500"
                                  : "text-green-400"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {errorMessage && (
                    <div className="text-red-500 mb-4">
                      {errorMessage}
                    </div>
                  )}

                  {/* Footer Buttons */}
                  <div className="flex justify-end gap-4 mt-4 group">
                    <button
                      onClick={handleSave}
                      className="flex items-center bg-[#1B1E26] hover:bg-[#31E48F] text-white px-4 py-2 rounded-lg group-hover:text-white"
                    >
                      <img
                        src={iconsmodel}
                        alt="iconsmodel"
                        className="mr-2 btn-icon"
                      />
                      <span> Update</span>
                    </button>
                    <button
                      onClick={() =>
                        toggleMembershipEdit(index)
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

        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 max-h-[50vh] overflow-y-auto">
              <h2 className="text-xl font-poppins font-semibold mb-4 text-center text-gray-800">
                {successMessage.includes("Failed")
                  ? "Failed"
                  : "Success"}
              </h2>
              <p
                className={
                  successMessage.includes("Failed")
                    ? "text-red-500 text-center"
                    : "text-green-500 text-center"
                }
              >
                {successMessage}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out"
                  onClick={() => setIsSuccessModalOpen(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </td>
  </tr>
))}