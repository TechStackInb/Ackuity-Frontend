import React, { createContext, useState } from "react";

// Create a context to store the sections
export const PolicyContext = createContext();

export const PolicyProvider = ({ children }) => {
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      values: {
        documentStore: "",
        documentLocation: "",
        documentName: "",
      },
      members: [],
    },
  ]);

  return (
    <PolicyContext.Provider value={{ sections, setSections }}>
      {children}
    </PolicyContext.Provider>
  );
};