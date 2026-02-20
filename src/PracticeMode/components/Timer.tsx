import React from "react";

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

export function Timer({ timeRemaining, totalTime }: TimerProps) {
  const progress = (timeRemaining / totalTime) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r="44"
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r="44"
            className="stroke-blue-500"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-800 dark:text-white">
            {timeRemaining}
          </span>
        </div>
      </div>
    </div>
  );
}
