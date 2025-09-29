"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ConfidenceChart() {
  const data = {
    labels: ["Interview 1", "Interview 2", "Interview 3", "Interview 4"],
    datasets: [
      {
        label: "Confidence %",
        data: [60, 70, 75, 85],
        fill: false,
        borderColor: "rgb(34,197,94)", 
        backgroundColor: "rgb(34,197,94)",
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4b5563", 
        },
      },
      title: {
        display: true,
        text: "Confidence Growth Over Interviews",
        color: "#4c1d95", 
        font: {
          size: 16,
          weight: "bold" as const, 
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4b5563",
        },
        grid: {
          color: "#e5e7eb", 
        },
      },
      y: {
        ticks: {
          color: "#4b5563",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 shadow-sm">
      <Line data={data} options={options} />
    </div>
  );
}