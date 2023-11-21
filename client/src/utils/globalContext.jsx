import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

function formatDate(date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function GlobalProvider({ children }) {
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({
    name: null,
    id: null,
  });
  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date(Date.now() + 86400000))
  );

  return (
    <GlobalContext.Provider
      value={{
        triggerRefetch,
        setTriggerRefetch,
        rowSelectionModel,
        setRowSelectionModel,
        rows,
        setRows,
        open,
        setOpen,
        selectedCompany,
        setSelectedCompany,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
