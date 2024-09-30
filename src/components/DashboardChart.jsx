import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const drawPathsPlugin = {
  id: 'drawPaths',
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
        const textAnchor = Math.cos(midAngle) >= 0 ? 'start' : 'end';
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
        ctx.fillStyle = '#FFFFFF'; 
        ctx.textAlign = textAnchor;
        ctx.fillText(value, ex + (Math.cos(midAngle) >= 0 ? 1 : -1) * 12, ey);
      });
    });
  },
};

ChartJS.register(drawPathsPlugin);

const DashboardChart = ({ chartData }) => {
  const staticColors = ['#2AE09A', '#1BBBE2', '#EC00DF', '#FCB262'];

  const pieOptions = {
    cutout: '25%',
    radius: '70%',
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
          <div key={index} className="w-full md:w-1/2 px-4 mb-8">
            <div className="p-6 bg-gray-800 text-white rounded-lg">
              <h2 className="text-xl font-poppins font-semibold mb-4">
                {chart.title}
              </h2>
              <div className="flex flex-wrap md:flex-nowrap  justify-between items-start">
                {/* Pie Chart */}
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <Pie
                    data={{
                      labels: chart.data.labels,
                      datasets: [
                        {
                          label: chart.title,
                          data: chart.data.values,
                          backgroundColor: staticColors,
                          borderColor: ['#303D4B'],
                          borderWidth: 2,
                        },
                      ],
                    }}
                    options={pieOptions}
                  />
                </div>

                {/* Progress Bars */}
                <div className="w-full md:w-1/2 space-y-4">
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