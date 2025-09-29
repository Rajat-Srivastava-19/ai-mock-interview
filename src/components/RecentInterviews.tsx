"use client";

export default function RecentInterviews() {
  const interviews = [
    { id: 1, type: "Tech", date: "2025-08-01", score: "85%" },
    { id: 2, type: "HR", date: "2025-08-05", score: "78%" },
    { id: 3, type: "Behavioral", date: "2025-08-10", score: "90%" },
  ];

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-purple-900 mb-4">Recent Interviews</h2>
      <table className="w-full text-left text-gray-800">
        <thead>
          <tr className="border-b border-purple-300">
            <th className="py-2 font-medium text-sm">Type</th>
            <th className="py-2 font-medium text-sm">Date</th>
            <th className="py-2 font-medium text-sm">Score</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((i) => (
            <tr key={i.id} className="border-b border-purple-100 hover:bg-purple-100/50 transition">
              <td className="py-2 text-sm">{i.type}</td>
              <td className="py-2 text-sm">{i.date}</td>
              <td className="py-2 text-sm font-semibold text-purple-700">{i.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}