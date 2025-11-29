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

  const openInterviewWindow = () => {
    const interviewUrl = `/interview?type=${type}&time=${time}&mode=${videoInterview}`;
    window.open(interviewUrl, "_blank", "width=900,height=700,resizable=yes");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-indigo-700 px-4 sm:px-6 md:px-10 py-10">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-2xl border-t-4 border-indigo-500 p-6 sm:p-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-800 tracking-wide">
          Start Interview
        </h1>

        {/* Interview Type */}
        <div className="relative">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Interview Type</h2>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full flex justify-between items-center bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-5 py-3 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {interviewOptions.find((opt) => opt.value === type)?.label || "Select Type"}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 10 6">
              <path d="M1 1l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-xl z-50">
              {interviewOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setType(option.value);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition ${
                    type === option.value
                      ? "bg-indigo-100 text-indigo-800 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Interview Duration */}
        <div className="relative">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Interview Duration</h2>
          <button
            onClick={() => setTimingDropdown((prev) => !prev)}
            className="w-full flex justify-between items-center bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-5 py-3 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {timingOptions.find((opt) => opt.value === time)?.label || "Select Time"}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 10 6">
              <path d="M1 1l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {timingDropdown && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-xl z-50">
              {timingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTime(option.value);
                    setTimingDropdown(false);
                  }}
                  className={`w-full px-5 py-3 text-sm transition ${
                    time === option.value
                      ? "bg-indigo-100 text-indigo-800 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Interview Mode */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Interview Mode</h2>
          <div className="flex flex-wrap gap-4">
            {videoOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setVideoInterview(option.value)}
                className={`flex-1 px-5 py-2 rounded-xl font-medium transition ${
                  videoInterview === option.value
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={openInterviewWindow}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-2xl shadow-xl transform hover:scale-105 transition"
          >
            🚀 Start {type.charAt(0).toUpperCase() + type.slice(1)} Interview ({time.replace("minutes", " min")})
          </button>
        </div>
      </div>
    </main>
  );
}