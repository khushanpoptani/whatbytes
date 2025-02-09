"use client";

const defaultUserData = {
  rank: "2",
  percentile: "98",
  score: "14",
};

// Retrieve stored data from sessionStorage if available
const storedData = typeof window !== "undefined" ? sessionStorage.getItem("userData") : null;
let userData = storedData ? JSON.parse(storedData) : defaultUserData;

// Function to update and save user data in sessionStorage
export const saveUserData = (newData) => {
  userData = { ...newData };
  sessionStorage.setItem("userData", JSON.stringify(userData)); // Save to session
  return userData;
};

// Function to retrieve user data
export const getUserData = () => {
  return userData;
};
