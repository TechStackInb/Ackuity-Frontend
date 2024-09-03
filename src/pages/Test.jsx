{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-poppins font-semibold mb-4 text-center text-gray-800">
        Confirm Policy Save
      </h2>
      {isSaveSuccessful ? (
        <p className="text-green-500 text-center">
          Policy saved successfully!
        </p>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor="policyName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Policy Name
            </label>
            <input
              type="text"
              id="policyName"
              value={policyName}
              onChange={handlePolicyNameChange}
              className="w-full rounded-md shadow-sm px-2.5 py-2.5 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-200 ease-in-out"
              placeholder="Enter policy name"
            />
          </div>
          <div className="mb-4">
            <p className="text-sm mb-2 text-gray-700">
              <strong>Selected Options:</strong>
            </p>
            <ul>
              <li className="mb-4">
              list of dropdown selected options and checkbox list 
              </li>
           
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2 transition-all duration-200 ease-in-out"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out"
              onClick={confirmSavePolicy}
            >
              Confirm
            </button>
          </div>
        </>
      )}