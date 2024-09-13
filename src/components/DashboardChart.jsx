// import React, { useEffect } from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { BASE_URL } from "../services/api";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const drawPathsPlugin = {
//   id: "drawPaths",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const { width, height } = chart;
//     const { top, left, right, bottom } = chart.chartArea;

//     chart.data.datasets.forEach((dataset, i) => {
//       const meta = chart.getDatasetMeta(i);
//       meta.data.forEach((arc, index) => {
//         const centerX = (left + right) / 2;
//         const centerY = (top + bottom) / 2;
//         const { startAngle, endAngle } = arc;
//         const midAngle = startAngle + (endAngle - startAngle) / 2;
//         const radius = arc.outerRadius;
//         const outerRadius = radius + 5;
//         const sx = centerX + Math.cos(midAngle) * radius;
//         const sy = centerY + Math.sin(midAngle) * radius;
//         const mx = centerX + Math.cos(midAngle) * outerRadius;
//         const my = centerY + Math.sin(midAngle) * outerRadius;
//         const ex = mx + (Math.cos(midAngle) >= 0 ? 1 : -1) * 15;
//         const ey = my;
//         const textAnchor = Math.cos(midAngle) >= 0 ? "start" : "end";
//         const value = dataset.data[index];

//         ctx.beginPath();
//         ctx.moveTo(sx, sy);
//         ctx.lineTo(mx, my);
//         ctx.lineTo(ex, ey);
//         ctx.strokeStyle = dataset.backgroundColor[index];
//         ctx.stroke();
//         ctx.fillStyle = dataset.backgroundColor[index];
//         ctx.beginPath();
//         ctx.arc(ex, ey, 2, 0, 2 * Math.PI);
//         ctx.fill();
//         ctx.fillStyle = "#FFFFFF"; // Text color
//         ctx.textAlign = textAnchor;
//         ctx.fillText(value, ex + (Math.cos(midAngle) >= 0 ? 1 : -1) * 12, ey);
//       });
//     });
//   },
// };

// ChartJS.register(drawPathsPlugin);

// const DashboardChart = () => {
//   // Function to fetch policies
//   const fetchPolicies = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/data/chartData`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch policies");
//       }

//       const data = await response.json();
//       console.log(data)
//     } catch (error) {
//       console.error("Error fetching policies:", error);
//     }
//   };

//   // Call fetchPolicies after saving policy and also on component mount
//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   // Unified JSON data with different datasets for each chart
//   const chartData = [
//     {
//       title: "Total Served",
//       labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
//       data: [25, 10, 15, 20],
//       colors: ["#EC00DF", "#1BBBE2", "#2AE09A", "#FCB262"],
//     },
//     {
//       title: "Total Denied",
//       labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
//       data: [40, 20, 25, 15],
//       colors: ["#EC00DF", "#1BBBE2", "#2AE09A", "#FCB262"],
//     },
//     {
//       title: "Total Transformed",
//       labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
//       data: [30, 20, 25, 25],
//       colors: ["#EC00DF", "#1BBBE2", "#2AE09A", "#FCB262"],
//     },
//     {
//       title: "Total Threats",
//       labels: ["SQL Injection", "User Anamoly", "Agent Anomaly", "API Attacks"],
//       data: [35, 15, 25, 25],
//       colors: ["#EC00DF", "#1BBBE2", "#2AE09A", "#FCB262"],
//     },
//   ];

//   // Options for Pie Chart
//   const pieOptions = {
//     cutout: "25%",
//     radius: "60%",
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       drawPaths: {},
//     },
//   };

//   return (
//     <div className="flex flex-wrap justify-between">
//       {chartData.map((chart, index) => (
//         <div key={index} className="flex-1 basis-1/2 p-4">
//           <div className="p-6 bg-gray-800 text-white rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">{chart.title}</h2>
//             <div className="flex justify-between items-center">
//               {/* Pie Chart */}
//               <div className="w-1/2">
//                 <Pie
//                   data={{
//                     labels: chart.labels,
//                     datasets: [
//                       {
//                         label: "Total Served",
//                         data: chart.data,
//                         backgroundColor: chart.colors,
//                         borderColor: ["#303D4B"],
//                         borderWidth: 2,
//                       },
//                     ],
//                   }}
//                   options={pieOptions}
//                 />
//               </div>

//               {/* Progress Bars */}
//               <div className="w-1/2 space-y-4">
//                 {chart.labels.map((label, i) => (
//                   <div key={i} className="space-y-1">
//                     <div className="flex justify-between">
//                       <span>{label}</span>
//                       <span>{chart.data[i]}%</span>
//                     </div>
//                     <div className="w-full bg-gray-700 rounded-full h-2">
//                       <div
//                         className="h-2 rounded-full"
//                         style={{
//                           width: `${chart.data[i]}%`,
//                           backgroundColor: chart.colors[i],
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DashboardChart;
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const drawPathsPlugin = {
  id: "drawPaths",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const { top, left, right, bottom } = chart.chartArea;

    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((arc, index) => {
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;
        const { startAngle, endAngle } = arc;
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const radius = arc.outerRadius;
        const outerRadius = radius + 5;
        const sx = centerX + Math.cos(midAngle) * radius;
        const sy = centerY + Math.sin(midAngle) * radius;
        const mx = centerX + Math.cos(midAngle) * outerRadius;
        const my = centerY + Math.sin(midAngle) * outerRadius;
        const ex = mx + (Math.cos(midAngle) >= 0 ? 1 : -1) * 15;
        const ey = my;
        const textAnchor = Math.cos(midAngle) >= 0 ? "start" : "end";
        const value = dataset.data[index];

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(mx, my);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = dataset.backgroundColor[index];
        ctx.stroke();
        ctx.fillStyle = dataset.backgroundColor[index];
        ctx.beginPath();
        ctx.arc(ex, ey, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF"; // Text color
        ctx.textAlign = textAnchor;
        ctx.fillText(value, ex + (Math.cos(midAngle) >= 0 ? 1 : -1) * 12, ey);
      });
    });
  },
};

ChartJS.register(drawPathsPlugin);

const DashboardChart = ({ chartData }) => {
  const staticColors = ["#2AE09A", "#1BBBE2", "#EC00DF", "#FCB262"];

  const pieOptions = {
    cutout: "25%",
    radius: "70%",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      drawPaths: {},
    },
  };

  return (
    <div className="flex flex-wrap -mx-4">
      {chartData.length > 0 ? (
        chartData.map((chart, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 px-4 mb-8" // Ensures two charts per row on larger screens, full width on mobile
          >
            <div className="p-6 bg-gray-800 text-white rounded-lg">
              <h2 className="text-xl font-poppins font-semibold mb-4">
                {chart.title}
              </h2>
              <div className="flex justify-between items-center">
                {/* Pie Chart */}
                <div className="w-1/2">
                  <Pie
                    data={{
                      labels: chart.data.labels,
                      datasets: [
                        {
                          label: chart.title,
                          data: chart.data.values,
                          backgroundColor: staticColors,
                          borderColor: ["#303D4B"],
                          borderWidth: 2,
                        },
                      ],
                    }}
                    options={pieOptions}
                  />
                </div>

                {/* Progress Bars */}
                <div className="w-1/2 space-y-4">
                  {chart.data.labels.map((label, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-poppins font-normal text-[#F4F4F4]">
                          {label}
                        </span>
                        <span className="font-poppins font-normal text-[#F4F4F4]">
                          {chart.data.values[i]}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${chart.data.values[i]}%`,
                            backgroundColor: staticColors[i],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading charts...</p>
      )}
    </div>
  );
};

export default DashboardChart;

// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import axiosInstance from "../axiosInstance";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const drawPathsPlugin = {
//   id: "drawPaths",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const { top, left, right, bottom } = chart.chartArea;

//     chart.data.datasets.forEach((dataset, i) => {
//       const meta = chart.getDatasetMeta(i);
//       meta.data.forEach((arc, index) => {
//         const centerX = (left + right) / 2;
//         const centerY = (top + bottom) / 2;
//         const { startAngle, endAngle } = arc;
//         const midAngle = startAngle + (endAngle - startAngle) / 2;
//         const radius = arc.outerRadius;
//         const outerRadius = radius + 5;
//         const sx = centerX + Math.cos(midAngle) * radius;
//         const sy = centerY + Math.sin(midAngle) * radius;
//         const mx = centerX + Math.cos(midAngle) * outerRadius;
//         const my = centerY + Math.sin(midAngle) * outerRadius;
//         const ex = mx + (Math.cos(midAngle) >= 0 ? 1 : -1) * 15;
//         const ey = my;
//         const textAnchor = Math.cos(midAngle) >= 0 ? "start" : "end";
//         const value = dataset.data[index];

//         ctx.beginPath();
//         ctx.moveTo(sx, sy);
//         ctx.lineTo(mx, my);
//         ctx.lineTo(ex, ey);
//         ctx.strokeStyle = dataset.backgroundColor[index];
//         ctx.stroke();
//         ctx.fillStyle = dataset.backgroundColor[index];
//         ctx.beginPath();
//         ctx.arc(ex, ey, 2, 0, 2 * Math.PI);
//         ctx.fill();
//         ctx.fillStyle = "#FFFFFF"; // Text color
//         ctx.textAlign = textAnchor;
//         ctx.fillText(value, ex + (Math.cos(midAngle) >= 0 ? 1 : -1) * 12, ey);
//       });
//     });
//   },
// };

// ChartJS.register(drawPathsPlugin);

// const DashboardChart = () => {
//   const staticColors = ["#2AE09A", "#1BBBE2", "#EC00DF", "#FCB262"];

//   const [chartData, setChartData] = useState([]);

//   //   // Function to fetch chart data from the API

//   const fetchChartData = async () => {
//     try {
//       const response = await axiosInstance.get("/api/data/chartData");

//       if (!response) {
//         throw new Error("Failed to fetch policies");
//       }

//       const data = response.data;
//       setChartData(data.data);
//     } catch (error) {
//       console.error("Error fetching policies:", error);
//     }
//   };

//   useEffect(() => {
//     fetchChartData();
//   }, []);
//   console.log(chartData);

//   const chartDatas = [
//     {
//       title: "Total Served",
//       labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
//       data: [25, 10, 15, 20],
//     },
//     {
//       title: "Total Denied",
//       labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
//       data: [40, 20, 25, 15],
//     },
//     {
//       title: "Total Transformed",
//       labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
//       data: [30, 10, 16, 19],
//     },
//     {
//       title: "Total Threats",
//       labels: ["SQL Injection", "User Anomaly", "Agent Anomaly", "API Attacks"],
//       data: [35, 15, 25, 25],
//     },
//   ];

//   const pieOptions = {
//     cutout: "25%",
//     radius: "70%",
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       drawPaths: {},
//     },
//   };

//   return (
//     <div className="flex flex-wrap justify-between">
//       {chartDatas.length > 0 ? (
//         chartDatas.map((chart, index) => (
//           <div key={index} className="flex-1 basis-1/2 p-4">
//             <div className="p-6 bg-gray-800 text-white rounded-lg">
//               <h2 className="text-xl font-poppins font-semibold mb-4">
//                 {chart.title}
//               </h2>
//               <div className="flex justify-between items-center gap-6">
//                 {/* Pie Chart */}
//                 <div className="w-1/2">
//                   <Pie
//                     data={{
//                       labels: chart.labels,
//                       datasets: [
//                         {
//                           label: chart.title,
//                           data: chart.data,
//                           backgroundColor: staticColors,
//                           borderColor: ["#303D4B"],
//                           borderWidth: 2,
//                         },
//                       ],
//                     }}
//                     options={pieOptions}
//                   />
//                 </div>

//                 {/* Progress Bars */}
//                 <div className="w-1/2 space-y-4">
//                   {chart.labels.map((label, i) => (
//                     <div key={i} className="space-y-1">
//                       <div className="flex justify-between">
//                         <span className="font-poppins font-normal text-[#F4F4F4]">
//                           {label}
//                         </span>
//                         <span className="font-poppins font-normal text-[#F4F4F4]">
//                           {chart.data[i]}%
//                         </span>
//                       </div>
//                       <div className="w-full bg-gray-700 rounded-full h-2">
//                         <div
//                           className="h-2 rounded-full"
//                           style={{
//                             width: `${chart.data[i]}%`,
//                             backgroundColor: staticColors[i],
//                           }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>Loading charts...</p>
//       )}
//     </div>
//   );
// };

// export default DashboardChart;
