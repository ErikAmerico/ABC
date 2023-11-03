import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rows, setRows] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        triggerRefetch,
        setTriggerRefetch,
        rowSelectionModel,
        setRowSelectionModel,
        rows,
        setRows,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
