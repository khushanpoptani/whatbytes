"use client";

import React, { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Image from "next/image";
import { useUserData } from "../Context/UserDataContext";
import Bullseye from "../Images/Bullseye.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const QuestionAnalysis = () => {
  const { userData } = useUserData();
  const totalQuestions = 15;
  const [correct, setCorrect] = useState<number | null>(null);
  const incorrect = correct !== null ? totalQuestions - correct : 0;
  const chartRef = useRef(null);

  useEffect(() => {
    if (userData) {
      setCorrect(Number(userData.score));
    }
  }, [userData]);

  if (correct === null) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const data = {
    datasets: [
      {
        data: [correct, incorrect],
        backgroundColor: ["#4285F4", "#EAEAEA"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-black">Question Analysis</h3>
        <span className="text-blue-500 font-semibold text-sm">
          {correct}/{totalQuestions}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">
        <b>
          You scored {correct} question{correct !== 1 ? "s" : ""} correct
        </b>{" "}
        out of {totalQuestions}.
        {incorrect > 0
          ? " However, it still needs some improvements."
          : " Great job!"}
      </p>

      {/* Chart Section */}
      <div className="flex justify-center items-center">
        <div className="relative w-44 h-44">
          <Doughnut ref={chartRef} data={data} options={options} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src={Bullseye} alt="Target" width={50} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnalysis;
