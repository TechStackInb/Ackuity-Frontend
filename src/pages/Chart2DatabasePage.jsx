import React from "react";

const Chart2DatabasePage = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4 p-4 bg-white border border-gray-200 rounded">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Permission</th>
                <th className="px-4 py-2 border">Existing</th>
                <th className="px-4 py-2 border">
                  Revised{" "}
                  <button className="bg-blue-500 text-white py-1 px-3 rounded">
                    Edit
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">Select</td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    <span className="border p-2">Operations</span>
                    <span className="border p-2">Management</span>
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    <input type="checkbox" />
                    <span>Sales NA</span>
                    <input type="checkbox" />
                    <span>HR</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Update</td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    <span className="border p-2">Sales NA</span>
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    <input type="checkbox" />
                    <span>Operations</span>
                    <input type="checkbox" />
                    <span>Management</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Insert</td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    <span className="border p-2">Sales NA</span>
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    <input type="checkbox" />
                    <span>Operations</span>
                    <input type="checkbox" />
                    <span>Management</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Delete</td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    <span className="border p-2">Sales NA</span>
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    <input type="checkbox" />
                    <span>Operations</span>
                    <input type="checkbox" />
                    <span>Management</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <label>DataStore</label>
          <select className="w-full border border-gray-300 p-2">
            <option>DB1</option>
            <option>DB2</option>
            <option>DB3</option>
          </select>
        </div>
        <div>
          <label>Table/view</label>
          <select className="w-full border border-gray-300 p-2">
            <option>Table1</option>
            <option>Table2</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded mt-4">
        <div>
          {/* <label className="block mb-2 font-semibold mt-2">DataField</label> */}
          <select className="w-full border border-gray-300 p-2 mb-4">
            <option>Oportunity Name</option>
            <option>Account Name</option>
            <option>Amount</option>
            <option>Age</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full overflow-x-auto">
            <label className="block mb-2 font-semibold mt-2">Permissons</label>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Permission</th>
                  <th className="px-4 py-2 border">Existing</th>
                  <th className="px-4 py-2 border">
                    Revised{" "}
                    <button className="bg-blue-500 text-white py-1 px-3 rounded">
                      Edit
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">Select</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <span className="border p-2">Operations</span>
                      <span className="border p-2">Management</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <input type="checkbox" />
                      <span>Sales NA</span>
                      <input type="checkbox" />
                      <span>HR</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Update</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <span className="border p-2">Sales NA</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <input type="checkbox" />
                      <span>Operations</span>
                      <input type="checkbox" />
                      <span>Management</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Insert</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <span className="border p-2">Sales NA</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <input type="checkbox" />
                      <span>Operations</span>
                      <input type="checkbox" />
                      <span>Management</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Delete</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <span className="border p-2">Sales NA</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <input type="checkbox" />
                      <span>Operations</span>
                      <input type="checkbox" />
                      <span>Management</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full overflow-x-auto">
            <label className="block mb-2 font-semibold mt-2">
              Privacy Filtering
            </label>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Transformation Value </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>Name</option>
                      <option>DOB</option>
                      <option>SSN</option>
                      <option>None</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>Anonymize</option>
                      <option>Tokenize</option>
                      <option>None</option>
                      <option>De-Identification</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="w-full overflow-x-auto">
            <label className="block mb-2 font-semibold mt-2">
              Attribute Filtering
            </label>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Attribute</th>
                  <th className="px-4 py-2 border">Value</th>
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Transformation Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>Department</option>
                      <option>Location</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>Nort America</option>
                      <option>Asia</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>Allow</option>
                      <option>Redact</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <select className="w-full border border-gray-300 p-2">
              <option>XYZ Corp</option>
              <option>ABC Corp</option>
              <option>DEF Corp</option>
              <option>MNO Corp</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Save
          </button>
        </div>
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded mt-4">
        <div>
          {/* <label className="block mb-2 font-semibold mt-2">DataField</label> */}
          <select className="w-full border border-gray-300 p-2 mb-4">
            <option>Amount</option>
            <option>Amount1</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full overflow-x-auto">
            <label className="block mb-2 font-semibold mt-2">Permissons</label>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Permission</th>
                  <th className="px-4 py-2 border">Existing</th>
                  <th className="px-4 py-2 border">
                    Revised{" "}
                    <button className="bg-blue-500 text-white py-1 px-3 rounded">
                      Edit
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">Select</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <span className="border p-2">Opportunity Name</span>
                      <span className="border p-2">Account Name</span>
                      <span className="border p-2">Amount</span>
                      <span className="border p-2">Age</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <input type="checkbox" />
                      <span>Sales NA</span>
                      <input type="checkbox" />
                      <span>HR</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Update</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <span className="border p-2">Sales NA</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <input type="checkbox" />
                      <span>Operations</span>
                      <input type="checkbox" />
                      <span>Management</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Insert</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <span className="border p-2">Sales NA</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <input type="checkbox" />
                      <span>Operations</span>
                      <input type="checkbox" />
                      <span>Management</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Delete</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <span className="border p-2">Sales NA</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <input type="checkbox" />
                      <span>Operations</span>
                      <input type="checkbox" />
                      <span>Management</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full overflow-x-auto">
            <label className="block mb-2 font-semibold mt-2">
              Privacy Filtering
            </label>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Transformation Value </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>Name</option>
                      <option>DOB</option>
                      <option>SSN</option>
                      <option>None</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>Anonymize</option>
                      <option>Tokenize</option>
                      <option>None</option>
                      <option>De-Identification</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="w-full overflow-x-auto">
            <label className="block mb-2 font-semibold mt-2">
              Attribute Filtering
            </label>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Attribute</th>
                  <th className="px-4 py-2 border">Value</th>
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Transformation Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>Department</option>
                      <option>Location</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>North America</option>
                      <option>Asia</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <select className="w-full border border-gray-300 p-2 mb-4">
                      <option>Allow</option>
                      <option>Redact</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <select className="w-full border border-gray-300 p-2">
              <option>XYZ Corp</option>
              <option>ABC Corp</option>
              <option>DEF Corp</option>
              <option>MNO Corp</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Chart2DatabasePage;
