const fetchPolicyPermission = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/data/policyManagerPermissions`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch policies");
    }

    const data = await response.json();
    const allUsers = data.data.map((policy) => policy.members).flat();
    // console.log(allUsers, "allUsers");
    setAvailableUsers(allUsers);
    setSavedData(data.data);
  } catch (error) {
    console.error("Error fetching policies:", error);
  }
};

fetched JOSN: for ur reference
{
  "data": [
      {
          "_id": "66ed199120bd251997042473",
          "documentStore": "Document Store",
          "documentRepository": "item2",
          "documentLocation": "Another Option",
          "members": [
              {
                  "_id": "66e710bfcfaf84cb964c814f",
                  "email": "anand@mail.com",
                  "name": "Anand",
                  "createdAt": "2024-09-15T16:52:15.463Z",
                  "updatedAt": "2024-09-15T16:52:15.463Z",
                  "__v": 0
              },
              {
                  "_id": "66e7160909fa27af095596b9",
                  "email": "beuron@mail.com",
                  "name": "Beuron",
                  "createdAt": "2024-09-15T17:14:49.498Z",
                  "updatedAt": "2024-09-15T17:14:49.498Z",
                  "__v": 0
              }
          ],
          "createdAt": "2024-09-20T06:43:29.425Z",
          "updatedAt": "2024-09-20T06:43:29.425Z",
          "__v": 0
      },
      {
          "_id": "66ed1bdec9f461ff298ca9f8",
          "documentStore": "Document Store",
          "documentRepository": "item2",
          "documentLocation": "Another Option",
          "members": [
              {
                  "_id": "66e7160909fa27af095596b9",
                  "email": "beuron@mail.com",
                  "name": "Beuron",
                  "createdAt": "2024-09-15T17:14:49.498Z",
                  "updatedAt": "2024-09-15T17:14:49.498Z",
                  "__v": 0
              }
          ],
          "createdAt": "2024-09-20T06:53:18.327Z",
          "updatedAt": "2024-09-20T07:25:46.951Z",
          "__v": 0
      }
  ],
  "currentPage": 1,
  "totalPages": 1,
  "totalItems": 2
}
const handleSave = async () => {
  try {
    const memberIds = members.map((member) => member._id);

    // Assuming only one section is needed based on your required payload structure
    const payloadSection = sections[0]; // Use the first section for the payload

    const jsonPayload = {
      documentStore: payloadSection.values["documentStoreOptions"],
      documentRepository: payloadSection.values["attributeOption"],
      documentLocation: payloadSection.values["documentOption"],
      members: memberIds,
    };

    console.log(jsonPayload, "");

    const response = await fetch(
      `${BASE_URL}/api/data/policyManagerPermissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(jsonPayload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save members");
    }

    const data = await response.json();
    console.log("Successfully saved:", data);

    // Refresh policies after save
    await fetchPolicyPermission();

    setSuccessMessage("Permissions saved successfully!");
    setIsSuccessModalOpen(true);

    setTimeout(() => {
      setIsSuccessModalOpen(false);
    }, 2000);
  } catch (error) {
    console.error("Error saving members:", error);
    setErrorMessage("Failed to save permissions. Please try again.");
  }
};

{sections.map((section, sectionIndex) => (
  <tr key={section.id}>
    <td
      className="pl-4  border border-customBorderColor text-customWhite bg-black"
      width={"385px"}
    >
      <CustomDropdown
        options={data.documentStoreOptions || []}
        placeholder="Select store"
        isOpen={openDropdown === `${section.id}-0`}
        onDropdownClick={() =>
          handleDropdownClick1(section.id, 0)
        }
        selectedOption={
          section.values["documentStoreOptions"] || ""
        }
        setSelectedOption={(value) =>
          handleDropdownChange(
            section.id,
            "documentStoreOptions",
            value
          )
        }
      />
    </td>
    <td
      className="pl-4  border border-customBorderColor text-customWhite bg-black"
      width={"385px"}
    >
      <CustomDropdown
        options={data.attributeOption || []}
        placeholder="Select Document"
        isOpen={openDropdown === `${section.id}-1`}
        onDropdownClick={() =>
          handleDropdownClick1(section.id, 1)
        }
        selectedOption={section.values["attributeOption"] || ""}
        setSelectedOption={(value) =>
          handleDropdownChange(
            section.id,
            "attributeOption",
            value
          )
        }
      />
    </td>
    <td
      className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]"
      width={"200px"}
    >
      <CustomDropdown
        options={data.documentOption || []}
        placeholder="Select Document"
        isOpen={openDropdown === `${section.id}-2`}
        onDropdownClick={() =>
          handleDropdownClick1(section.id, 2)
        }
        selectedOption={section.values["documentOption"] || ""}
        setSelectedOption={(value) =>
          handleDropdownChange(
            section.id,
            "documentOption",
            value
          )
        }
      />
    </td>
    <td className="px-4  border border-customBorderColor text-customWhite font-poppins bg-[#000000]">
 
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
            <button
              onClick={toggleeditMembership}
              className="bg-customBlack text-[#6A7581] px-2 py-2 rounded hover:text-customGreen"
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="transition ease-out duration-300 hover:transform hover:scale-110 "
              />
            </button>
          </div>
        </div>

        {showEditMembership && (
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
                    onClick={toggleeditMembership}
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
                        onMouseEnter={() =>
                          setHoveredRemoveIndex(index)
                        }
                        onMouseLeave={() =>
                          setHoveredRemoveIndex(null)
                        }
                        onClick={() => removeMember(index)}
                      >
                        <FontAwesomeIcon
                          icon={
                            hoveredRemoveIndex === index
                              ? faClose
                              : faMinus
                          }
                          className="transition-transform duration-1000 ease-in-out"
                        />
                      </button>
                    </div>
                  ))}

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
                      <span> Save</span>
                    </button>
                    <button
                      onClick={toggleeditMembership}
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
    </td>

  </tr>
))}

PATCH for update members  http://localhost:3000/api/data/policyManagerPermissions/66ed1bdec9f461ff298ca9f8


please observe correct code after adding adding data i provided saved json i need fetch member same column shouldnt create new column, it should update in same column can u achive this way functionality?

