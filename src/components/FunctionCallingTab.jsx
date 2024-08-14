import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data1 = [
  {
    day: "All",
    FunctionCalling: [-4, 16],
  },
  {
    day: "Served",
    FunctionCalling: [5, 16],
  },
  {
    day: "Denied",
    FunctionCalling: [3, 12],
  },
  {
    day: "Transformed",
    FunctionCalling: [0, 8],
  },
  {
    day: "Flagged",
    FunctionCalling: [-3, 5],
  },
];
const data = [
  { name: "Permissions", value: 10 },
  { name: "Attributes", value: 50 },
  { name: "Privacy", value: 30 },
];

const topItemsServed = [
  { name: "MS O365", value: 50 },
  { name: "Hubspot", value: 40 },
  { name: "MS Dynamics", value: 30 },
  { name: "Servicenow", value: 20 },
  { name: "Salesforce", value: 10 },
];

const topItemsDenied = [
  { name: "MS O365", value: 5 },
  { name: "Hubspot", value: 10 },
  { name: "MS Dynamics", value: 8 },
  { name: "Servicenow", value: 10 },
  { name: "Salesforce", value: 3 },
];

const topItemTransformed = [
  { name: "MS O365", value: 45 },
  { name: "Hubspot", value: 30 },
  { name: "MS Dynamics", value: 22 },
  { name: "Servicenow", value: 10 },
  { name: "Salesforce", value: 7 },
];

const topItemsThreats = [
  { name: "MS O365", value: 6 },
  { name: "Hubspot", value: 12 },
  { name: "MS Dynamics", value: 13 },
  { name: "Servicenow", value: 4 },
  { name: "Salesforce", value: 6 },
];

const colors = ["#08683b", "#08683b", "#08683b", "#08683b", "#08683b"]; // Green, Yellow, Red, Black, Grey

const FunctionCalling = () => {
  return (
    <div className="page-center p-4">
      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-white shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={630}
                height={250}
                data={data1}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="FunctionCalling" fill={colors[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-white shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={colors[1]}
                  name="# Policy Categories Configured"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-center mb-4 font-bold text-2xl">Top Items</h3>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-white shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topItemsServed}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={colors[0]} name="# Queries Served" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-white shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topItemsDenied}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={colors[2]} name="# Queries Denied" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-white shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topItemTransformed}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={colors[1]}
                  name="# Queries Transformed"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-white shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topItemsThreats}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={colors[3]}
                  name="# Queries Threats"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionCalling;
