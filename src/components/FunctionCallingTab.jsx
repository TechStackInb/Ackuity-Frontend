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
import WaterfallChart from "./WaterfallChart";


const CustomBackground = (props) => {
  const { x, y, width, height, radius } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius} // This adds rounded corners to the background
      ry={radius}
      fill="#1B1E26"
    />
  );
};


const options = {
  chart: {
    type: 'waterfall',
  },
  title: {
    text: 'Waterfall Chart',
  },
  xAxis: {
    categories: ['All', 'Served', 'Denied', 'Transformed', 'Flagged'],
    crosshair: true,
  },
  yAxis: {
    title: {
      text: 'Value',
    },
  },
  series: [
    {
      data: [
        { name: 'All', y: 12 },
        { name: 'Served', y: -4 },
        { name: 'Denied', y: -3 },
        { name: 'Transformed', y: -2 },
        { name: 'Flagged', y: -1 },
      ],
      color: '#6baed6',
    },
  ],
};

const data1 = [
  { day: "All", value: 12, base: 0 },
  { day: "Served", value: -4, base: 12 },
  { day: "Denied", value: -3, base: 8 },
  { day: "Transformed", value: -2, base: 5 },
  { day: "Flagged", value: -1, base: 3 },
];
// const data1 = [
//   {
//     day: "All",
//     FunctionCalling: [-4, 16],
//   },
//   {
//     day: "Served",
//     FunctionCalling: [5, 16],
//   },
//   {
//     day: "Denied",
//     FunctionCalling: [3, 12],
//   },
//   {
//     day: "Transformed",
//     FunctionCalling: [0, 8],
//   },
//   {
//     day: "Flagged",
//     FunctionCalling: [-3, 5],
//   },
// ];
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

const colors = ["#31B476", "#31B476", "#31B476", "#31B476", "#31B476"]; // Green, Yellow, Red, Black, Grey

const FunctionCalling = () => {
  return (
    <div className="page-center p-4">
      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-5">
          {/* <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-[#303D4B] shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={630}
                height={250}
                data={data1}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                barSize={40}
              >
                <XAxis dataKey="day" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar
                  dataKey="FunctionCalling"
                  fill={colors[0]}
                  radius={[22, 22, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div> */}
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-[#303D4B] shadow-lg rounded-lg mb-4 md:mb-0">
            {/* <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={630}
                height={250}
                data={data1}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis dataKey="day" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />

                <Bar dataKey="base" fill="transparent" stackId="a" />

                <Bar
                  dataKey="value"
                  fill={colors[0]}
                  stackId="a"
                  radius={[22, 22, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer> */}
          <WaterfallChart />
            
          </div>
          
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-[#303D4B] shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={50}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#85898d87" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip cursor={{ fill: "#444" }} />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={colors[1]}
                  name="# Policy Categories Configured"
                  radius={[22, 22, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-[#000000] shadow p-4 rounded-lg">
        <p className="text-left text-xl text-[#31B476] font-poppins font-semibold">
          Top Items
        </p>
      </div>
      <div className="mt-6">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-[#303D4B] shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topItemsServed}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#85898d87" />
                <XAxis type="number" stroke="#fff" />
                <YAxis type="category" dataKey="name" stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={colors[0]}
                  name="# Queries Served"
                  radius={[0, 22, 22, 0]}
                  background={<CustomBackground radius={22} />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-[#303D4B] shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topItemsDenied}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#85898d87" />
                <XAxis type="number" stroke="#fff" />
                <YAxis type="category" dataKey="name" stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={colors[2]}
                  name="# Queries Denied"
                  radius={[0, 22, 22, 0]}
                  background={<CustomBackground radius={22} />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-[#303D4B] shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topItemTransformed}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#85898d87" />
                <XAxis type="number" stroke="#fff" />
                <YAxis type="category" dataKey="name" stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={colors[1]}
                  name="# Queries Transformed"
                  radius={[0, 22, 22, 0]}
                  background={<CustomBackground radius={22} />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 p-2 bg-[#303D4B] shadow-lg rounded-lg mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topItemsThreats}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#85898d87" />
                <XAxis type="number" stroke="#fff" />
                <YAxis type="category" dataKey="name" stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={colors[3]}
                  name="# Queries Threats"
                  radius={[0, 22, 22, 0]}
                  // background={{ fill: "#1B1E26" }}
                  background={<CustomBackground radius={22} />}
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
