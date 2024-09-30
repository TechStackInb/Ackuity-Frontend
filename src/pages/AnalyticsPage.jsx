// import React, { useState } from "react";
// import FunctionCalling from "../components/FunctionCallingTab";
// import Chat2Database from "../components/Chat2DatabaseTab";
// import Agents from "../components/AgentsTab";
// import DocumentRAG from "../components/DocumentRAGTab";
// import PieCharts from "../components/PieCharts";
// import DashboardChart from "../components/DashboardChart";

// const tabs = [
//   { name: "Function Calling", component: <FunctionCalling /> },
//   { name: "Chat2Database", component: <Chat2Database /> },
//   { name: "Agents", component: <Agents /> },
//   { name: "Document RAG", component: <DocumentRAG /> },
// ];

// const pieChartData = [
//   {
//     title: "Total Served",
//     data: {
//       labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
//       values: [25, 10, 15, 20],
//     },
//   },
//   {
//     title: "Total Denied",
//     data: {
//       labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
//       values: [25, 10, 15, 20],
//     },
//   },
//   {
//     title: "Total Transformed",
//     data: {
//       labels: ["RAG", "Function Calling", "Agents", "Chat2Database"],
//       values: [25, 25, 10, 20],
//     },
//   },
//   {
//     title: "Total Threats",
//     data: {
//       labels: ["RAG", "User Anomaly", "Agent", "API Attacks"],
//       values: [25, 10, 15, 20],
//     },
//   },
// ];
// const Analytics = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   return (
//     <div className="page-center p-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4  font-poppins font-semibold ">
//         {pieChartData.map((chart, index) => (
//           <PieCharts key={index} title={chart.title} data={chart.data} />
//         ))}

//         <DashboardChart />
//       </div>

//       <div className="mt-8 bg-customGreen shadow p-4 rounded-lg">
//         <p className="text-center text-2xl text-customWhite font-poppins font-semibold ">
//           Inventory Information
//         </p>
//       </div>
//       <div className="flex flex-wrap justify-around border-b-2 mb-4">
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             className={`py-2 px-4 text-center font-poppins font-semibold ${
//               index === activeTab ? "border-b-2 border-green-500" : ""
//             }`}
//             onClick={() => setActiveTab(index)}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>
//       <div>{tabs[activeTab].component}</div>
//     </div>
//   );
// };

// export default Analytics;
import React, { useEffect, useState } from 'react';
import FunctionCalling from '../components/FunctionCallingTab';
import Chat2Database from '../components/Chat2DatabaseTab';
import Agents from '../components/AgentsTab';
import DocumentRAG from '../components/DocumentRAGTab';
import PieCharts from '../components/PieCharts';
import DashboardChart from '../components/DashboardChart';
import ProgressBar from '../components/ProgressBar';
import {
  faChevronDown,
  faChevronUp,
  faClock,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../axiosInstance';

const tabs = [
  { name: 'Function Calling', component: <FunctionCalling /> },
  { name: 'Chat2Database', component: <Chat2Database /> },
  { name: 'Agents', component: <Agents /> },
  { name: 'Document RAG', component: <DocumentRAG /> },
];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState('Last 24 hours');
  const [isOpen, setIsOpen] = useState(false);
  const [chartData, setChartData] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClicks = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const fetchChartData = async () => {
    try {
      let response;
      if (selectedOption === 'Last 24 hours') {
        response = await axiosInstance.get('/api/data/chartData');
        setChartData(response.data.recentEntries);
      } else {
        response = await axiosInstance.get('/api/data/chartData/getAverage');
        const data =
          selectedOption === 'Last 7 days'
            ? response.data.sevenDayAverages
            : response.data.thirtyDayAverages;

        const mappedData = data.map((entry) => ({
          title: entry._id,
          data: {
            labels: ['RAG', 'Function Calling', 'Agents', 'Chat2Database'],
            values: [
              entry.avgRAG,
              entry.avgFunctionCalling,
              entry.avgAgents,
              entry.avgChat2Database,
            ],
          },
        }));
        setChartData(mappedData);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const handleRefreshClick = async () => {
    await fetchChartData();
    setSelectedOption('Last 24 hours');
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedOption]);

  return (
    <div className="page-center p-4">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={fetchChartData}
          className="group flex items-center  text-black px-4 py-2 bg-[#1B1E26] rounded-t-lg hover:bg-[#31B476]"
        >
          <FontAwesomeIcon
            icon={faSyncAlt}
            className="mr-2 text-[#31B476] group-hover:text-white"
          />
          <span className="text-white " onClick={handleRefreshClick}>
            Refresh
          </span>
        </button>

        <div className="relative inline-block text-left w-48">
          <button
            className="group flex items-center justify-between px-4 py-2 border border-[#1b1e26] rounded-t-lg bg-[#1b1e26] shadow-sm w-full"
            onClick={toggleDropdown}
          >
            <FontAwesomeIcon icon={faClock} className="mr-2 text-[#31B476]" />
            <span className="text-[#31B476]">{selectedOption}</span>
            <FontAwesomeIcon
              icon={isOpen ? faChevronUp : faChevronDown}
              className="ml-2 text-[#31B476]"
            />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1b1e26] border border-[#1b1e26] rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li
                  className={`px-4 py-2 cursor-pointer ${
                    selectedOption === 'Last 24 hours'
                      ? 'text-[#31B476]'
                      : 'text-white hover:bg-[#31B476]'
                  }`}
                  onClick={() => handleOptionClick('Last 24 hours')}
                >
                  Last 24 hours
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer ${
                    selectedOption === 'Last 7 days'
                      ? 'text-[#31B476]'
                      : 'text-white hover:bg-[#31B476]'
                  }`}
                  onClick={() => handleOptionClick('Last 7 days')}
                >
                  Last 7 days
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer ${
                    selectedOption === 'Last 30 days'
                      ? 'text-[#31B476]'
                      : 'text-white hover:bg-[#31B476]'
                  }`}
                  onClick={() => handleOptionClick('Last 30 days')}
                >
                  Last 30 days
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 bg-[#30b375] bg-bubble-pattern  rounded-md  mb-4 ">
        <div className="page-center">
          <div className="page-center">
            <h2 className="text-3xl font-poppins font-semibold mb-4 text-customWhite">
              Dashboard
            </h2>
            <h2 className="text-sm text-[#eff2f6] font-poppins">
              Dashboard
              <span className="text-customWhite text-sm"> / Analytics</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="font-poppins font-semibold space-x-4">
        <DashboardChart chartData={chartData} />
        {/* <DashboardChart /> */}
      </div>

      {/* <div className="mt-8 bg-[#000000] shadow p-4 rounded-lg">
        <p className="text-left text-xl text-[#31B476] font-poppins font-semibold">
          Inventory Information
        </p>
      </div> */}
      <div className="flex gap-1 sm:gap-2 lg:gap-2 mt-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex items-center justify-center rounded-sm py-2 px-2 sm:py-3 sm:px-4 w-full ${
              index === activeTab
                ? 'bg-[#31B476] text-white'
                : 'bg-black text-[#31E48F]'
            }`}
            onClick={() => setActiveTab(index)}
          >
            <span className="font-poppins font-semibold text-[10px] leading-4 sm:text-[12px] sm:leading-6 md:text-base lg:text-lg">
              {tab.name}
            </span>
          </button>
        ))}
      </div>

      <div>{tabs[activeTab].component}</div>
    </div>
  );
};

export default Analytics;
