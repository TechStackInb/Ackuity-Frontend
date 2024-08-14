import React, { useContext } from "react";
import { ChartContext } from "./ChartContext";
import Analytics from "../pages/AnalyticsPage";
import Reports from "../pages/Reportspage";
import DocumentRAG from "../pages/DocumentRAGPage";
import FunctionCalling from "../pages/FunctionCallingPage";
import ThreatManagement from "../pages/ThreatManagementPage";
import Admin from "../pages/AdminPage";
import Chart2DatabasePage from "../pages/Chart2DatabasePage";

const ChartSection = () => {
  const { selectedChart } = useContext(ChartContext);

  return (
    <div className="flex-1 p-4 overflow-y-auto ">
      {/* <h2 className="text-2xl font-poppins font-semibold mb-4 text-white">
        {selectedChart}
      </h2> */}
      <div>
        {selectedChart === "Analytics" && <Analytics />}
        {selectedChart === "Reports" && <Reports />}
        {selectedChart === "Function Calling" && <FunctionCalling />}
        {selectedChart === "Document RAG" && <DocumentRAG />}
        {selectedChart === "Threat Management" && <ThreatManagement />}
        {/* {selectedChart === "Admin" && <Admin />} */}
        {selectedChart === "Chat2Database" && <Chart2DatabasePage />}
      </div>
    </div>
  );
};

export default ChartSection;
