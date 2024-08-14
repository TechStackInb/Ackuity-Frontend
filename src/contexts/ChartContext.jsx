import React, { createContext, useState } from "react";

export const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
  const [selectedChart, setSelectedChart] = useState("Analytics");

  return (
    <ChartContext.Provider value={{ selectedChart, setSelectedChart }}>
      {children}
    </ChartContext.Provider>
  );
};
