import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [colAdded, setcolAdded] = useState(0);
  const [rowAdded, setRowAdded] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserDetails(() => decoded.user);
    }
  }, []);

  return (
   <MyContext.Provider value={{
  setShouldRefresh,
  shouldRefresh,
  selectedProjectId,
  setSelectedProjectId,
  setAuthToken,
  userDetails,
  colAdded,
  setcolAdded,
  rowAdded,
  setRowAdded
}}>
      {children}
    </MyContext.Provider>
  );
};
