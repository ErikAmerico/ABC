import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        triggerRefetch,
        setTriggerRefetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
