import React from "react";

const CircularProgressBar = ({ value, label, strokeColor, maxValue }) => {
  const normalizedValue = Math.min(Math.max(value, 0), maxValue);
  const circumference = 2 * Math.PI * 45; // Radius of the circle is 45
  const offset = circumference - (normalizedValue / maxValue) * circumference;

  return (
    <div className="flex flex-col items-center">
      <h3>{label}</h3>
      <svg width="120" height="120" className="rotate-90">
        <circle
          cx="60"
          cy="60"
          r="45"
          stroke="#e6e6e6"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="60"
          cy="60"
          r="45"
          stroke={strokeColor}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span>{normalizedValue}</span>
    </div>
  );
};

export default CircularProgressBar;
