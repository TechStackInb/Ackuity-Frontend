import React from "react";

const ThreatManagement = () => {
  const threatData = [
    { type: "Total threats", count: 15 },
    { type: "Injection Attacks", count: 10 },
    { type: "API Attacks", count: 6 },
    { type: "Agent Anomalies", count: 4 },
    { type: "User Anomalies", count: 3 },
  ];
  return (
    <>
      <div className="flex flex-wrap gap-4 p-4 bg-white border border-gray-200 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {threatData.map((threat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-100 border border-gray-300 rounded"
            >
              <div className="text-lg font-semibold">{threat.type}</div>
              <div className="mt-2 text-2xl font-bold">{threat.count}</div>
            </div>
          ))}
        </div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Threat Name</th>
                <th className="px-4 py-2 border">Severity</th>
                <th className="px-4 py-2 border">Threat Caregory</th>
                <th className="px-4 py-2 border">Source</th>
                <th className="px-4 py-2 border">Destination</th>
                <th className="px-4 py-2 border">Impacted Assests</th>
                <th className="px-4 py-2 border">Event Time</th>
                <th className="px-4 py-2 border">Affected User</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">URL Manipulation</td>
                <td className="px-4 py-2 border">High</td>
                <td className="px-4 py-2 border">Broken Access Control</td>
                <td className="px-4 py-2 border">GenAI App1</td>
                <td className="px-4 py-2 border">
                  Services/data/V37.0/ analytics/reports/query
                </td>
                <td className="px-4 py-2 border">Salesforce Opp-App1</td>
                <td className="px-4 py-2 border">24/07/2024</td>
                <td className="px-4 py-2 border">sales1</td>
                <td className="px-4 py-2 border">
                  <select className="w-full border border-gray-300 p-2 mb-4">
                    <option>In progress</option>
                    <option>Success</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <select className="w-full border border-gray-300 p-2 mb-4">
                    <option>Analyst2</option>
                    <option>Analyst3</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
              </tr>
              <tr>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
                <td className="px-4 py-6 border"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ThreatManagement;
