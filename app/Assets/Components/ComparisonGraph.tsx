"use client";

import React, { useEffect, useState } from "react";
import { useUserData } from "../Context/UserDataContext";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const ComparisonGraph = () => {
  const { userData } = useUserData();
  const [percentile, setPercentile] = useState<number | null>(null);

  useEffect(() => {
    if (userData) {
      setPercentile(Number(userData.percentile));
    }
  }, [userData]);

  if (percentile === null) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

  // Original xData and yData values
  let xData = [0, 10, 20, 27, 25, 45, 49, 50, 54, 60, 75, 85, 90, 100];
  let yData = [1, 2, 3, 5, 6, 8, 10, 15, 12, 6, 3, 2, 4, 1];

  // Insert user's percentile into xData and '1' into yData
  if (!xData.includes(percentile)) {
    xData.push(percentile);
    yData.push(1);
  }

  // Sort both arrays to maintain graph consistency
  const combinedData = xData.map((x, i) => ({ percentile: x, score: yData[i] }));
  combinedData.sort((a, b) => a.percentile - b.percentile); // Sort by percentile

    // Compute average percentile
    const averagePercentile = Math.round(
      xData.reduce((sum, x, i) => sum + x * yData[i], 0) /
      yData.reduce((sum, y) => sum + y, 0)
    );

  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-black">Comparison</h3>
        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-lg">📊</div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-3">
        <b>You scored {percentile}% percentile</b>, which is{" "}
        {percentile > averagePercentile ? "higher" : "lower"} than the
        average percentile of <b>{averagePercentile}%</b> of all engineers who took this assessment.
      </p>

      {/* Line Graph with Recharts */}
      <div className="w-full h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <XAxis 
              dataKey="percentile" 
              domain={[0, 100]} 
              tickFormatter={(value) => [0, 25, 50, 75, 100].includes(value) ? value : ""} 
              label={{ value: "Percentile", position: "insideBottom", dy: 10 }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "white", borderColor: "gray", color: "black" }}
              itemStyle={{ color: "black" }}
              formatter={(value) => [`NumberOfStudents: ${value}`]}
            />

            {/* Line Graph */}
            <Line type="monotone" dataKey="score" stroke="#007bff" strokeWidth={2} dot={{ r: 5 }} />

            {/* Vertical Line for User Percentile */}
            <ReferenceLine 
              x={percentile} 
              stroke="red" 
              strokeDasharray="6 6" 
              label={{
                value: `Your Percentile (${percentile}%)`, 
                position: "top", 
                fill: "black", 
                fontWeight: "bold"
              }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonGraph;
