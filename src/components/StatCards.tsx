"use client";

import { Calendar, BarChart2, CheckCircle } from "lucide-react"; // lightweight icon lib

export default function StatCards() {
  const stats = [
    { title: "Total Interviews", value: "12", icon: <CheckCircle className="w-6 h-6 text-green-400" /> },
    { title: "Avg Confidence", value: "78%", icon: <BarChart2 className="w-6 h-6 text-blue-400" /> },
    { title: "Next Interview", value: "Aug 25, 2025", icon: <Calendar className="w-6 h-6 text-yellow-400" /> },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg"
        >
          <div className="p-3 bg-white/20 rounded-lg">{stat.icon}</div>
          <div>
            <p className="text-black text-sm">{stat.title}</p>
            <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
