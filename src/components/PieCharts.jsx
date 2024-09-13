import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCharts = ({ title, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.colors,
        borderColor: "#303D4B", // Border color
        borderWidth: 2, // Border width
        hoverBackgroundColor: data.colors,
      },
    ],
  };

  const drawPathsPlugin = {
    id: "drawPaths",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const { width, height } = chart;
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

  const options = {
    cutout: "25%",
    radius: "40%",
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div className="bg-[#303D4B] p-4 shadow rounded-lg">
      <h3 className="text-xl font-bold text-[#ffffff]">{title}</h3>
      <Doughnut
        data={chartData}
        options={options}
        plugins={[drawPathsPlugin]}
      />
    </div>
  );
};

export default PieCharts;

// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieCharts = ({ title, data }) => {
//   const chartData = {
//     labels: data.labels,
//     datasets: [
//       {
//         data: data.values,
//         backgroundColor: ["#EC00DF", "#1BBBE2", "#2AE09A", "#FCB262"],
//         hoverBackgroundColor: ["#EC00DF", "#1BBBE2", "#2AE09A", "#FCB262"],
//       },
//     ],
//   };

//   const drawPathsPlugin = {
//     id: "drawPaths",
//     afterDraw: (chart) => {
//       const ctx = chart.ctx;
//       const { width, height } = chart;
//       const { top, left, right, bottom } = chart.chartArea;

//       chart.data.datasets.forEach((dataset, i) => {
//         const meta = chart.getDatasetMeta(i);
//         meta.data.forEach((arc, index) => {
//           const centerX = (left + right) / 2;
//           const centerY = (top + bottom) / 2;
//           const { startAngle, endAngle } = arc;
//           const midAngle = startAngle + (endAngle - startAngle) / 2;
//           const radius = arc.outerRadius;
//           const outerRadius = radius + 5;
//           const sx = centerX + Math.cos(midAngle) * radius;
//           const sy = centerY + Math.sin(midAngle) * radius;
//           const mx = centerX + Math.cos(midAngle) * outerRadius;
//           const my = centerY + Math.sin(midAngle) * outerRadius;
//           const ex = mx + (Math.cos(midAngle) >= 0 ? 1 : -1) * 15;
//           const ey = my;
//           const textAnchor = Math.cos(midAngle) >= 0 ? "start" : "end";
//           const value = dataset.data[index];

//           ctx.beginPath();
//           ctx.moveTo(sx, sy);
//           ctx.lineTo(mx, my);
//           ctx.lineTo(ex, ey);
//           ctx.strokeStyle = dataset.backgroundColor[index];
//           ctx.stroke();
//           ctx.fillStyle = dataset.backgroundColor[index];
//           ctx.beginPath();
//           ctx.arc(ex, ey, 2, 0, 2 * Math.PI);
//           ctx.fill();
//           ctx.fillStyle = "#FFFFFF";
//           ctx.textAlign = textAnchor;
//           ctx.fillText(value, ex + (Math.cos(midAngle) >= 0 ? 1 : -1) * 12, ey);
//         });
//       });
//     },
//   };

//   const options = {
//     cutout: "25%",
//     radius: "40%",
//     plugins: {
//       legend: {
//         display: true,
//         position: "bottom",
//       },
//     },
//   };

//   return (
//     <div className="bg-[#303D4B] p-4 shadow rounded-lg">
//       <h3 className="text-xl font-bold text-[#ffffff]">{title}</h3>
//       <Doughnut
//         data={chartData}
//         options={options}
//         plugins={[drawPathsPlugin]}
//       />
//     </div>
//   );
// };

// export default PieCharts;
// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieCharts = ({ title, data }) => {
//   const chartData = {
//     labels: data.labels,
//     datasets: [
//       {
//         data: data.values,
//         backgroundColor: [
//           "rgb(10 133 75)", // Main green
//           "rgba(106, 216, 148, 1)", // Light green
//           "rgba(49, 180, 118, 0.7)", // Semi-transparent green
//           "rgba(172, 234, 193, 1)", // Very light green
//         ],
//         hoverBackgroundColor: [
//           "rgba(49, 180, 118, 0.9)", // Slightly transparent on hover
//           "rgba(106, 216, 148, 0.9)", // Slightly transparent on hover
//           "rgba(49, 180, 118, 1)", // Fully opaque on hover
//           "rgba(172, 234, 193, 0.9)", // Slightly transparent on hover
//         ],
//         borderWidth: 2, // Thicker border for better separation
//         borderColor: "#ffffff", // White border to enhance contrast
//       },
//     ],
//   };

//   const drawPathsPlugin = {
//     id: "drawPaths",
//     afterDraw: (chart) => {
//       const ctx = chart.ctx;
//       const { top, left, right, bottom } = chart.chartArea;

//       chart.data.datasets.forEach((dataset, i) => {
//         const meta = chart.getDatasetMeta(i);
//         meta.data.forEach((arc, index) => {
//           const centerX = (left + right) / 2;
//           const centerY = (top + bottom) / 2;
//           const { startAngle, endAngle } = arc;
//           const midAngle = startAngle + (endAngle - startAngle) / 2;
//           const radius = arc.outerRadius;
//           const outerRadius = radius + 5;
//           const sx = centerX + Math.cos(midAngle) * radius;
//           const sy = centerY + Math.sin(midAngle) * radius;
//           const mx = centerX + Math.cos(midAngle) * outerRadius;
//           const my = centerY + Math.sin(midAngle) * outerRadius;
//           const ex = mx + (Math.cos(midAngle) >= 0 ? 1 : -1) * 15;
//           const ey = my;
//           const textAnchor = Math.cos(midAngle) >= 0 ? "start" : "end";
//           const value = dataset.data[index];

//           ctx.beginPath();
//           ctx.moveTo(sx, sy);
//           ctx.lineTo(mx, my);
//           ctx.lineTo(ex, ey);
//           ctx.strokeStyle = dataset.backgroundColor[index];
//           ctx.stroke();
//           ctx.fillStyle = dataset.backgroundColor[index];
//           ctx.beginPath();
//           ctx.arc(ex, ey, 2, 0, 2 * Math.PI);
//           ctx.fill();
//           ctx.fillStyle = "#FFFFFF"; // White text for contrast
//           ctx.textAlign = textAnchor;
//           ctx.fillText(value, ex + (Math.cos(midAngle) >= 0 ? 1 : -1) * 12, ey);
//         });
//       });
//     },
//   };

//   const options = {
//     cutout: "70%",
//     radius: "90%",
//     plugins: {
//       legend: {
//         display: true,
//         position: "bottom",
//         labels: {
//           color: "#FFFFFF", // White legend text
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-[#161b2f] p-4 shadow rounded-lg">
//       <h3 className="text-xl font-bold text-white">{title}</h3>
//       <Doughnut
//         data={chartData}
//         options={options}
//         plugins={[drawPathsPlugin]}
//       />
//     </div>
//   );
// };

// export default PieCharts;
