import React, { useState } from "react";
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

const DashboardChart = () => {
  const [timeRange, setTimeRange] = useState("Last 24 hours");

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    // Fetch or update data based on selected time range
  };

  const handleRefresh = () => {
    // Logic to refresh data
    console.log("Refresh clicked");
  };

  const chartData = [
    {
      title: "Total Served - Chart 1",
      labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
      data: [25, 10, 15, 20],
      colors: ["#EC00DF", "#1BBBE2", "#2AE09A", "#FCB262"],
    },
    {
      title: "Total Served - Chart 2",
      labels: ["User Activity", "Backend Calls", "Front End", "Database"],
      data: [40, 20, 25, 15],
      colors: ["#FF6384", "#36A2EB", "#FFCE56", "#00A950"],
    },
    {
      title: "Total Served - Chart 3",
      labels: ["Sales", "Marketing", "Support", "IT"],
      data: [30, 20, 25, 25],
      colors: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
    },
    {
      title: "Total Served - Chart 4",
      labels: ["Research", "Development", "Operations", "HR"],
      data: [35, 15, 25, 25],
      colors: ["#D4E157", "#4CAF50", "#FFEB3B", "#FF5722"],
    },
  ];

  const pieOptions = {
    cutout: "25%",
    radius: "60%",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      drawPaths: {},
    },
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleRefresh}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Refresh
        </button>
        <div className="relative">
          <select
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md border border-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        {chartData.map((chart, index) => (
          <div key={index} className="flex-1 basis-1/2 p-4">
            <div className="p-6 bg-gray-800 text-white rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{chart.title}</h2>
              <div className="flex justify-between items-center">
                {/* Pie Chart */}
                <div className="w-1/2">
                  <Pie
                    data={{
                      labels: chart.labels,
                      datasets: [
                        {
                          label: "Total Served",
                          data: chart.data,
                          backgroundColor: chart.colors,
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
                  {chart.labels.map((label, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{label}</span>
                        <span>{chart.data[i]}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${chart.data[i]}%`,
                            backgroundColor: chart.colors[i],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardChart;
