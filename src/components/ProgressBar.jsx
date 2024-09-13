import React from "react";

const ProgressBar = ({ data }) => {
  return (
    <div className="flex flex-col space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between">
            <span className="text-white">{item.label}</span>
            <span className="text-white">{item.value}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${item.color}`}
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
