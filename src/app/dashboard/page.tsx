"use client";

import { useEffect, useState } from "react";
import ConfidenceChart from "@/components/ConfidenceChart";
import RecentInterviews from "@/components/RecentInterviews";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import router from "next/router";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    confidence: 0,
    interviews: 0,
    lastInterview: "-",
    upcoming: "-",
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    }
    fetchStats();
  }, []);

  return (
    <main className="ml-72 mr-6 mt-6 mb-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-violet-800">Dashboard</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <button className="p-2 rounded-full hover:bg-violet-100 text-violet-700 transition">
            <FaBell />
          </button>
          <button className="flex items-center gap-2 p-2 rounded-full hover:bg-violet-100 text-violet-700 transition">
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:inline font-medium">Profile</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border-t-4 border-violet-500">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Confidence Level
          </h2>
          <p className="text-3xl font-extrabold text-violet-700">
            {stats.confidence}%
          </p>
          <p className="text-sm text-emerald-500 mt-1">+5% since last week</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border-t-4 border-indigo-500">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Interviews Taken
          </h2>
          <p className="text-3xl font-extrabold text-indigo-600">
            {stats.interviews}
          </p>
          <p className="text-sm text-emerald-500 mt-1">+3 this month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border-t-4 border-pink-500">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Last Interview
          </h2>
          <p className="text-lg font-semibold text-violet-700">
            {stats.lastInterview}
          </p>
          <p className="text-sm text-gray-400 mt-1">1 week ago</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border-t-4 border-emerald-500">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Upcoming Interview
          </h2>
          <p className="text-lg font-semibold text-violet-700">
            {stats.upcoming}
          </p>
          <p className="text-sm text-gray-400 mt-1">In 3 days</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-violet-700 mb-4">
            Confidence Progress
          </h3>
          <ConfidenceChart />
        </div>

        <div className="bg-gradient-to-br from-violet-600 to-violet-700 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <h3 className="text-xl font-bold mb-4">Get Started 🚀</h3>
          <p className="text-sm text-violet-200">
            Improve your interview confidence with AI-based practice sessions
            and personalized feedback.
          </p>
          <button
           onClick={() => router.push("/dashboard/start")}
           className="mt-6 bg-white text-violet-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-violet-50 transition">
            Start Interview
          </button>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-violet-700 mb-4">
          Recent Interviews
        </h3>
        <RecentInterviews />
      </div>
    </main>
  );
}
