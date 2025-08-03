"use client";

import { useEffect, useState } from "react";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageConfidence: 0,
    nextInterview: "",
  });
  

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();
        setStats({
          totalInterviews: data.totalInterviews,
          averageConfidence: data.averageConfidence,
          nextInterview: new Date(data.nextInterview).toLocaleString(),
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    }

    fetchStats();
  }, []);
  

  return (
    <><h1 className="text-3xl font-bold text-white">Welcome back 👋</h1><div className="h-screen dark:bg-gray-800 flex justify-center items-center">

      <section className="grid gap-6 md:grid-cols-3 p-4 md:p-8 max-w-5xl mx-auto w-full ">
        <div className="p-6 bg-white shadow rounded-2xl dark:bg-gray-900">
          <dl className="space-y-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Mock Interviews Taken</dt>

            <dd className="text-5xl font-light md:text-6xl dark:text-white">{stats.totalInterviews}</dd>


          </dl>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl dark:bg-gray-900">
          <dl className="space-y-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Confidence</dt>

            <dd className="text-5xl font-light md:text-6xl dark:text-white">{stats.averageConfidence}</dd>


          </dl>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl dark:bg-gray-900">
          <dl className="space-y-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Interview</dt>

            <dd className="text-5xl font-light md:text-6xl dark:text-white">{stats.nextInterview || "Not scheduled"}</dd>
          </dl>
        </div>
      </section>

    </div></>
  );
}
