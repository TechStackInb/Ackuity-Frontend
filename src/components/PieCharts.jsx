
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
        backgroundColor: ["#31E48F", "#3232CD", "#00BFFF", "#32CDCD"],
        hoverBackgroundColor: ["#31E48F", "#3232CD", "#00BFFF", "#32CDCD"],
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
          ctx.fillStyle = "#333";
          ctx.textAlign = textAnchor;
          ctx.fillText(value, ex + (Math.cos(midAngle) >= 0 ? 1 : -1) * 12, ey);
        });
      });
    },
  };

  const options = {
    cutout: "70%",
    radius: "90%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-xl font-bold">{title}</h3>
      <Doughnut
        data={chartData}
        options={options}
        plugins={[drawPathsPlugin]}
      />
    </div>
  );
};

export default PieCharts;
