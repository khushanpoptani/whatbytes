"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import HTMLLogo from "../Images/HTML5.png";
import MarksModal from "./MarksModal";
import { getUserData } from "../Data/Userdata";

const SkillTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ rank: "", percentile: "", score: "" });
  const [refresh, setRefresh] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleSave = () => setRefresh(!refresh);

  // Detect screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setUserData(getUserData());
  }, [isModalOpen]);

  return (
    <div className="p-5">
      {/* Skill Test Tile */}
      <div className={`flex ${isMobile ? "flex-col text-center items-center p-4" : "justify-between p-5"} bg-white rounded-xl shadow-md w-full border border-gray-200`}>
        <div className="flex items-center gap-4">
          <Image src={HTMLLogo} alt="HTML5 Logo" width={50} height={50} />
          <div>
            <h3 className="text-lg font-bold text-black">Hyper Text Markup Language</h3>
            <p className="text-sm text-gray-500">
              Questions: <b>08</b> | Duration: <b>15 mins</b> <br />
              Submitted on <b>5 June 2021</b>
            </p>
          </div>
        </div>
        <button
          className="bg-blue-900 text-white border-2 border-black px-2 py-2 rounded-md font-bold transition hover:bg-blue-800 mt-2 h-12"
          onClick={() => setIsModalOpen(true)}
        >
          Update
        </button>
      </div>

      {/* Quick Statistics Section */}
      <div className="mt-5 p-5 bg-white rounded-xl shadow-md w-full border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Statistics</h3>
        <div className={`flex ${isMobile ? "flex-col items-center gap-4" : "justify-between items-center"} text-center`}>
          
          {/* Rank */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">🏆</div>
            <span className="text-lg font-bold text-black">{userData.rank ? userData.rank : "--"}</span>
            <span className="text-xs uppercase text-gray-500 tracking-wide">Your Rank</span>
          </div>

          {!isMobile && <div className="w-[1px] h-12 bg-gray-300"></div>}

          {/* Percentile */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">📋</div>
            <span className="text-lg font-bold text-black">{userData.percentile ? `${userData.percentile}%` : "--%"}</span>
            <span className="text-xs uppercase text-gray-500 tracking-wide">Percentile</span>
          </div>

          {!isMobile && <div className="w-[1px] h-12 bg-gray-300"></div>}

          {/* Correct Answers */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">✅</div>
            <span className="text-lg font-bold text-black">{userData.score ? `${userData.score} / 15` : "-- / 15"}</span>
            <span className="text-xs uppercase text-gray-500 tracking-wide">Correct Answers</span>
          </div>
        </div>
      </div>

      {/* Marks Modal */}
      {isModalOpen && <MarksModal onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
    </div>
  );
};

export default SkillTest;
