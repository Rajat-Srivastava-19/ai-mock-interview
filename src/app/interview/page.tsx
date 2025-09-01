"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "tech";
  const time = searchParams.get("time") || "5minutes";

  const [seconds, setSeconds] = useState(0);

  // Convert "5minutes" into seconds dynamically
  useEffect(() => {
    const timeMap: Record<string, number> = {
      "5minutes": 5 * 60,
      "10minutes": 10 * 60,
      "20minutes": 20 * 60,
    };
    setSeconds(timeMap[time] || 300);
  }, [time]);

  // Countdown timer
  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  // Format time mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">
        🎤 {type.toUpperCase()} Interview
      </h1>
      <p className="mb-6 text-gray-400">Time Left: {formatTime(seconds)}</p>

      <div className="bg-gray-800 w-full max-w-2xl p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Question 1</h2>
        <p className="text-gray-300 mb-4">Tell me about yourself.</p>

        <textarea
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
          placeholder="Type your answer here..."
          rows={6}
        />
      </div>
    </div>
  );
}
