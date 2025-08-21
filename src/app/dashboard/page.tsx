"use client";

import { useEffect, useState } from "react";
import ConfidenceChart from "@/components/ConfidenceChart";
import RecentInterviews from "@/components/RecentInterviews";
import StatCards from "@/components/StatCards";

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
    <div className="bg-contain min-h-screen p-6 bg-gradient-to-br from-white to-gray-800 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Welcome Back 👋</h1>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Confidence Level</h2>
          <p className="text-4xl font-bold text-emerald-400">{stats.confidence}%</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Interviews Taken</h2>
          <p className="text-4xl font-bold text-blue-400">{stats.interviews}</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Last Interview</h2>
          <p className="text-xl font-medium">{stats.lastInterview}</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Upcoming Interview</h2>
          <p className="text-xl font-medium">{stats.upcoming}</p>
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-black">Dashboard Overview</h1>
        <StatCards />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
            <ConfidenceChart />
          </div>
          <RecentInterviews />
        </div>
      </div>
    </div>
    
  );
}
