import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Authentication/Login";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ChartSection from "./contexts/ChartSection";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { ChartProvider } from "./contexts/ChartContext";
import PrivateRoute from "./PrivateRoute";
import { PolicyProvider } from "./contexts/PolicyProvider";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ChartProvider>
      <PolicyProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div className="flex h-screen overflow-hidden bg-customGray">
                  <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                  />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header
                      isSidebarOpen={isSidebarOpen}
                      setIsSidebarOpen={setIsSidebarOpen}
                    />
                    <div className="flex-1 overflow-y-auto p-4">
                      <ChartSection />
                    </div>
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PolicyProvider>
    </ChartProvider>
  );
};

export default App;
