"use client";

export default function RecentInterviews() {
  const interviews = [
    { id: 1, type: "Tech", date: "2025-08-01", score: "85%" },
    { id: 2, type: "HR", date: "2025-08-05", score: "78%" },
    { id: 3, type: "Behavioral", date: "2025-08-10", score: "90%" },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Recent Interviews</h2>
      <table className="w-full text-left text-white">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="py-2">Type</th>
            <th className="py-2">Date</th>
            <th className="py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((i) => (
            <tr key={i.id} className="border-b border-gray-700">
              <td className="py-2">{i.type}</td>
              <td className="py-2">{i.date}</td>
              <td className="py-2">{i.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
