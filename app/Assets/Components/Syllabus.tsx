"use client";

import React from "react";

const syllabusData = [
  { topic: "HTML Tools, Forms, History", percentage: 80, color: "bg-blue-500" },
  { topic: "Tags & References in HTML", percentage: 60, color: "bg-orange-500" },
  { topic: "Tables & References in HTML", percentage: 24, color: "bg-red-500" },
  { topic: "Tables & CSS Basics", percentage: 96, color: "bg-green-500" },
];

const Syllabus = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-full">
      {/* Title */}
      <h3 className="text-lg font-bold text-black mb-5">Syllabus Wise Analysis</h3>

      {/* Topic List */}
      {syllabusData.map((item, index) => (
        <div key={index} className="flex flex-col mb-8">
          {/* Topic Name */}
          <span className="text-sm font-medium text-black mb-2">{item.topic}</span>

          {/* Progress Bar */}
          <div className="flex items-center">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className={`${item.color} h-full`} style={{ width: `${item.percentage}%` }}></div>
            </div>
            <span className="ml-3 text-sm font-bold text-black">{item.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Syllabus;
