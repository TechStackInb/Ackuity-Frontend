{savedData.map((policy) => (
  <tr key={policy._id} className="hover:bg-gray-100">
    <td className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px] ">
      {policy.documentStore}
    </td>
    <td className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px] ">
      {policy.documentLocation}
    </td>
    <td className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px] ">
      {policy.documentName}
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
    <td className="px-4 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px]">
      {policy.revisedPermissionsMembers.length > 0 ? (
        policy.revisedPermissionsMembers.map((member) => (
          <div key={member._id}>
            {member.name} ({member.email})
          </div>
        ))
      ) : (
        <span>No revised members</span>
      )}
      {/* 
      <button
        onClick={() => deletePolicy(policy._id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button> */}

      {/* <button
        className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black "
        onClick={() => deletePolicy(policy._id)}
      >
        <FontAwesomeIcon
          className="transition ease-out duration-300 hover:transform hover:scale-110 w-5 h-5"
          icon={faTrash}
        />
      </button> */}
    </td>

    <td className="relative">
      <div
        className="absolute bottom-0 right-0 flex justify-end gap-2 min-w-[100px] ifmarginleft"
        style={{ marginRight: "17px" }}
      >
        <div className="flex gap-2">
          <button
            className="bg-[#2E313B] hover:text-customGreen text-[#6A7581] px-2 py-2 rounded hover:bg-black"
            onClick={() => deletePolicy(policy._id)}
          >
            <FontAwesomeIcon
              className="transition ease-out duration-300 hover:transform hover:scale-110 w-5 h-5"
              icon={faTrash}
            />
          </button>
        </div>
      </div>
    </td>
  </tr>
))}



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
          </div>

     
        </div>
      </div>
    </td>
  </tr>
))}