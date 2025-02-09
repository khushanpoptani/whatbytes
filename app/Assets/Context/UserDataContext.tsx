"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserData, saveUserData } from "../Data/Userdata";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(getUserData());

  // Function to update data & refresh UI without page reload
  const updateUserData = (newData) => {
    saveUserData(newData);
    setUserData(newData); // Update state, which triggers re-render in consuming components
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook for easier access
export const useUserData = () => useContext(UserDataContext);
