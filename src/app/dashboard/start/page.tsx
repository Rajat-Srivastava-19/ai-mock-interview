"use client";

import { useState } from "react";
import { FaLaptopCode, FaUserTie, FaComments } from "react-icons/fa";

export default function StartInterview() {
  const [type, setType] = useState("tech");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const interviewOptions = [
    { label: "Tech", value: "tech", icon: <FaLaptopCode className="text-indigo-500" /> },
    { label: "HR", value: "hr", icon: <FaUserTie className="text-emerald-500" /> },
    { label: "Behavioral", value: "behavioral", icon: <FaComments className="text-pink-500" /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Start Interview</h1>

      {/* Dropdown */}
      <div className="relative inline-block text-left">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center gap-2"
        >
          {interviewOptions.find((opt) => opt.value === type)?.label || "Select Type"}
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 10 6"
          >
            <path d="M1 1l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute mt-2 w-56 bg-white dark:bg-gray-700 rounded-md shadow-lg z-50 py-2">
            {interviewOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setType(option.value);
                  setDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  type === option.value ? "bg-gray-100 dark:bg-gray-600 font-semibold" : ""
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <br></br>

      {/* Start Button */}
      <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        Start {type.toUpperCase()} Interview
      </button>
      
    </div>
  );
}
