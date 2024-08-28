import React, { useContext } from "react";
import { ChartContext } from "./ChartContext";
import Analytics from "../pages/AnalyticsPage";
import Reports from "../pages/Reportspage";
import DocumentRAG from "../pages/DocumentRAGPage";
import FunctionCalling from "../pages/FunctionCallingPage";
import ThreatManagement from "../pages/ThreatManagementPage";
import Chart2DatabasePage from "../pages/Chart2DatabasePage";

const ChartSection = () => {
  const { selectedChart, setSelectedChart } = useContext(ChartContext);

  return (
    <div className="flex-1 p-4 overflow-y-auto ">
      <div>
        {selectedChart === "Analytics" && <Analytics />}
        {selectedChart === "Reports" && <Reports />}
        {selectedChart === "Function Calling" && <FunctionCalling />}
        {selectedChart === "Document RAG" && <DocumentRAG />}
        {selectedChart === "Threat Management" && <ThreatManagement />}
        {selectedChart === "Chat2Database" && <Chart2DatabasePage />}
      </div>
    </div>
  );
};

export default ChartSection;
