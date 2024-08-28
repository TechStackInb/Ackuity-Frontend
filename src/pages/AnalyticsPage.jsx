import React, { useState } from "react";
import FunctionCalling from "../components/FunctionCallingTab";
import Chat2Database from "../components/Chat2DatabaseTab";
import Agents from "../components/AgentsTab";
import DocumentRAG from "../components/DocumentRAGTab";
import PieCharts from "../components/PieCharts";

const tabs = [
  { name: "Function Calling", component: <FunctionCalling /> },
  { name: "Chat2Database", component: <Chat2Database /> },
  { name: "Agents", component: <Agents /> },
  { name: "Document RAG", component: <DocumentRAG /> },
];

const pieChartData = [
  {
    title: "Total Served",
    data: {
      labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
      values: [25, 10, 15, 20],
    },
  },
  {
    title: "Total Denied",
    data: {
      labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
      values: [20, 25, 15, 20],
    },
  },
  {
    title: "Total Transformed",
    data: {
      labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
      values: [25, 25, 10, 20],
    },
  },
  {
    title: "Total Threats",
    data: {
      labels: ["RAG", "User Anomaly", "Agent", "API Attacks"],
      values: [25, 25, 10, 20],
    },
  },
];
const Analytics = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="page-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  font-poppins font-semibold ">
        {pieChartData.map((chart, index) => (
          <PieCharts key={index} title={chart.title} data={chart.data} />
        ))}
      </div>

      <div className="mt-8 bg-customGreen shadow p-4 rounded-lg">
        <p className="text-center text-2xl text-customWhite font-poppins font-semibold ">Inventory Information</p>
      </div>
      <div className="flex flex-wrap justify-around border-b-2 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-center font-poppins font-semibold ${
              index === activeTab ? "border-b-2 border-green-500" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].component}</div>
    </div>
  );
};

export default Analytics;
