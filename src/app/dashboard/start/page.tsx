"use client";

import { useState } from "react";
import { FaLaptopCode, FaUserTie, FaComments } from "react-icons/fa";

export default function StartInterview() {
  const [type, setType] = useState("tech");
  const [time, setTime] = useState("5minutes");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timingDropdown, setTimingDropdown] = useState(false);
  const [videoInterview, setVideoInterview] = useState("video");

  const videoOptions = [
    { label: "Video", value: "video" },
    { label: "Text", value: "text" },
  ];

  const interviewOptions = [
    { label: "Tech", value: "tech", icon: <FaLaptopCode className="text-indigo-500" /> },
    { label: "HR", value: "hr", icon: <FaUserTie className="text-emerald-500" /> },
    { label: "Behavioral", value: "behavioral", icon: <FaComments className="text-pink-500" /> },
  ];

  const timingOptions = [
    { label: "5:00 minutes", value: "5minutes" },
    { label: "10:00 minutes", value: "10minutes" },
    { label: "20:00 minutes", value: "20minutes" },
  ];

  const openInterviewWindow = async () => {
    const res = await fetch(`/api/questions?type=${type}&count=5`);
    const data = await res.json();
    const questions = data.questions;

    localStorage.setItem("questions-temp", JSON.stringify(questions));

    const interviewUrl = `/interview?type=${type}&time=${time}`;
    window.open(interviewUrl, "_blank", "width=800,height=600");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-black px-6 py-12">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 space-y-8">
        
        <h1 className="text-3xl font-bold text-center text-white tracking-wide">
          Start Interview
        </h1>

        <div className="relative">
          <h2 className="text-white mb-2 font-semibold">Select Interview Type:</h2>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            type="button"
            className="w-full flex justify-between items-center text-white bg-blue-600/80 hover:bg-blue-700 transition px-5 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {interviewOptions.find((opt) => opt.value === type)?.label || "Select Type"}
            <svg
              className="w-3 h-3 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 10 6"
            >
              <path d="M1 1l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
              {interviewOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setType(option.value);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition ${
                    type === option.value
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <h2 className="text-white mb-2 font-semibold">Select Interview Timing:</h2>
          <button
            onClick={() => setTimingDropdown((prev) => !prev)}
            type="button"
            className="w-full flex justify-between items-center text-white bg-blue-600/80 hover:bg-blue-700 transition px-5 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {timingOptions.find((opt) => opt.value === time)?.label || "Select Time"}
            <svg
              className="w-3 h-3 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 10 6"
            >
              <path d="M1 1l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {timingDropdown && (
            <div className="absolute mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
              {timingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTime(option.value);
                    setTimingDropdown(false);
                  }}
                  className={`w-full px-5 py-3 text-sm transition ${
                    time === option.value
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-white">
          <h2 className="mb-2 font-semibold">Interview Mode:</h2>
          <div className="flex gap-4">
            {videoOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setVideoInterview(option.value)}
                className={`px-5 py-2 rounded-lg font-medium transition ${
                  videoInterview === option.value
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={openInterviewWindow}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition"
          >
            🚀 Start {type.toUpperCase()} {time.toLowerCase()} Interview
          </button>
        </div>
      </div>
    </div>
  );
}
