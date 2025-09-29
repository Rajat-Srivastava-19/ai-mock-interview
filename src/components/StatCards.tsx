"use client";

import { Calendar, BarChart2, CheckCircle } from "lucide-react";

export default function StatCards() {
  const stats = [
    {
      title: "Total Interviews",
      value: "12",
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Avg Confidence",
      value: "78%",
      icon: <BarChart2 className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Next Interview",
      value: "Aug 25, 2025",
      icon: <Calendar className="w-6 h-6 text-yellow-500" />,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-purple-50 border border-purple-200 p-6 rounded-lg shadow-sm"
        >
          <div className="p-3 bg-white border border-purple-100 rounded-lg shadow-sm">
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-purple-700 font-medium">{stat.title}</p>
            <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}