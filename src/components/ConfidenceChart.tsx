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

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Confidence Growth Over Interviews" },
    },
  };

  return <Line data={data} options={options} />;
}
