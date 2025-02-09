"use client";

import React, { useState, useEffect } from "react";
import Layout from "./Assets/Components/Layout";
import SkillTest from "./Assets/Components/SkillTest";
import Syllabus from "./Assets/Components/Syllabus";
import ComparisonGraph from "./Assets/Components/ComparisonGraph";
import QuestionAnalysis from "./Assets/Components/QuestionAnalysis";
import { UserDataProvider } from "./Assets/Context/UserDataContext";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize(); // Initialize on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <UserDataProvider>
      <div className="flex flex-col h-screen bg-white overflow-y-auto">
        <Layout />
        <div className="flex flex-1">
          <main
            className={`flex-1 p-6 transition-all duration-300 overflow-y-auto h-[calc(100vh-77px)] ${
              isMobile ? "ml-20" : "ml-60"
            } max-w-full`}
          >

            <h2 className="text-xl font-bold mb-5 text-black">Skill Test</h2>

            <div className={`flex gap-5 ${isMobile ? "flex-col" : "flex-row"} items-start w-full`}>
              {/* Left Column */}
              <div className={`flex flex-col gap-4 flex-1`}>
                <SkillTest />
                <ComparisonGraph />
              </div>

              {/* Right Column */}
              <div className={`flex flex-col gap-4 flex-1`}>
                <Syllabus />
                <QuestionAnalysis />
              </div>
            </div>
          </main>
        </div>
      </div>
    </UserDataProvider>
  );
}
