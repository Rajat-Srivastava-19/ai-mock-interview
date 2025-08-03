// app/dashboard/history/page.tsx
export default function InterviewHistory() {
  const interviews = [
    { date: "Aug 1", type: "Tech", score: 78 },
    { date: "Jul 28", type: "HR", score: 85 },
    { date: "Jul 20", type: "Behavioral", score: 91 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Interview History</h1>

      <div className="bg-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left text-white">
          <thead className="bg-white/20">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((item, i) => (
              <tr key={i} className="hover:bg-white/10 transition">
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
