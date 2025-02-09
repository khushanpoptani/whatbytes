"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import HTMLLogo from "../Images/HTML5.png";
import { saveUserData, getUserData } from "../Data/Userdata";
import { useUserData } from "../Context/UserDataContext";

const MarksModal = ({ onClose }) => {
  const { userData, updateUserData } = useUserData();
  const [rank, setRank] = useState("");
  const [percentile, setPercentile] = useState("");
  const [score, setScore] = useState("");
  const [errors, setErrors] = useState({ rank: "", percentile: "", score: "" });
  const [inputShift, setInputShift] = useState({ rank: "0px", percentile: "0px", score: "0px" });

  useEffect(() => {
    const userData = getUserData();
    setRank(userData.rank);
    setPercentile(userData.percentile);
    setScore(userData.score);
  }, []);

  useEffect(() => {
    let newErrors = { rank: "", percentile: "", score: "" };
    let newShifts = { rank: "0px", percentile: "0px", score: "0px" };

    if (!rank) {
      newErrors.rank = "Required | Should be a number";
      newShifts.rank = "-40px";
    } else if (isNaN(rank) || rank.includes(".")) {
      newErrors.rank = "Required | Whole number only";
      newShifts.rank = "-40px";
    }

    if (!percentile) {
      newErrors.percentile = "Required | Percentile 0 - 100";
      newShifts.percentile = "-40px";
    } else if (isNaN(percentile) || percentile < 0 || percentile > 100 || percentile.includes(".")) {
      newErrors.percentile = "Required | Whole number between 0 - 100";
      newShifts.percentile = "-40px";
    }

    if (!score) {
      newErrors.score = "Required | Current score 0 - 15";
      newShifts.score = "-40px";
    } else if (isNaN(score) || score < 0 || score > 15 || score.includes(".")) {
      newErrors.score = "Required | Whole number between 0 - 15";
      newShifts.score = "-40px";
    }

    setErrors(newErrors);
    setInputShift(newShifts);
  }, [rank, percentile, score]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ minHeight: "400px" }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Update Scores</h2>
          <Image src={HTMLLogo} alt="HTML5 Logo" width={40} height={40} />
        </div>

        {/* Form Fields */}
        <div className="flex flex-col space-y-6">
          {/* Rank Input */}
          <div className="flex items-center space-x-6">
            <span className="w-7 h-7 flex items-center justify-center bg-blue-700 text-white text-xs font-bold rounded-full">1</span>
            <label className="font-semibold text-black w-1/2 text-sm">Update your Rank</label>
            <div className="w-1/3 relative">  {/* ⬇️ Reduced input field width */}
              <input
                type="text"
                value={rank}
                onChange={(e) => setRank(e.target.value.replace(/\D/g, ""))}
                className={`w-full p-2 border rounded-md text-black text-sm transition-transform duration-300 focus:outline-none ${
                  errors.rank ? "border-red-500" : "border-blue-500"
                }`}
                style={{ transform: `translateX(${inputShift.rank})`, transition: "transform 0.3s ease-in-out" }}
              />
              {errors.rank && (
                <p
                  className="text-red-500 text-xs mt-1 absolute"
                  style={{ transform: `translateX(${inputShift.rank})`, transition: "transform 0.3s ease-in-out" }}
                >
                  {errors.rank}
                </p>
              )}
            </div>
          </div>

          {/* Percentile Input */}
          <div className="flex items-center space-x-6">
            <span className="w-7 h-7 flex items-center justify-center bg-blue-700 text-white text-xs font-bold rounded-full">2</span>
            <label className="font-semibold text-black w-1/2 text-sm">Update your Percentile</label>
            <div className="w-1/3 relative">  {/* ⬇️ Reduced input field width */}
              <input
                type="text"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value.replace(/\D/g, ""))}
                className={`w-full p-2 border rounded-md text-black text-sm transition-transform duration-300 focus:outline-none ${
                  errors.percentile ? "border-red-500" : "border-blue-500"
                }`}
                style={{ transform: `translateX(${inputShift.percentile})`, transition: "transform 0.3s ease-in-out" }}
              />
              {errors.percentile && (
                <p
                  className="text-red-500 text-xs mt-1 absolute"
                  style={{ transform: `translateX(${inputShift.percentile})`, transition: "transform 0.3s ease-in-out" }}
                >
                  {errors.percentile}
                </p>
              )}
            </div>
          </div>

          {/* Score Input */}
          <div className="flex items-center space-x-6">
            <span className="w-7 h-7 flex items-center justify-center bg-blue-700 text-white text-xs font-bold rounded-full">3</span>
            <label className="font-semibold text-black w-1/2 text-sm">Update your Current Score (out of 15)</label>
            <div className="w-1/3 relative">  {/* ⬇️ Reduced input field width */}
              <input
                type="text"
                value={score}
                onChange={(e) => setScore(e.target.value.replace(/\D/g, ""))}
                className={`w-full p-2 border rounded-md text-black text-sm transition-transform duration-300 focus:outline-none ${
                  errors.score ? "border-red-500" : "border-blue-500"
                }`}
                style={{ transform: `translateX(${inputShift.score})`, transition: "transform 0.3s ease-in-out" }}
              />
              {errors.score && (
                <p
                  className="text-red-500 text-xs mt-1 absolute"
                  style={{ transform: `translateX(${inputShift.score})`, transition: "transform 0.3s ease-in-out" }}
                >
                  {errors.score}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons Centered */}
        <div className="flex justify-end space-x-6 mt-8">
          <button className="bg-transparent text-black border border-gray-500 px-5 py-2 rounded-md text-sm font-bold hover:bg-gray-100 transition" onClick={onClose}>
            cancel
          </button>
          <button
            className={`bg-blue-900 text-white px-5 py-2 rounded-md text-sm font-bold ${
              Object.values(errors).some((err) => err) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800 transition"
            }`}
            disabled={Object.values(errors).some((err) => err)}
            onClick={() => {
              updateUserData({ rank, percentile, score });
              onClose();
            }}
          >
            save →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarksModal;
