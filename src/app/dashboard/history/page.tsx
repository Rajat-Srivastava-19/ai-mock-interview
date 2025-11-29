

export default function InterviewHistory() {
  const interviews = [
    { date: "Aug 1", type: "Tech", score: 78 },
    { date: "Jul 28", type: "HR", score: 85 },
    { date: "Jul 20", type: "Behavioral", score: 91 },
  ];

  return (
    <main className="ml-72 mr-6 mt-6 mb-6">
      <h1 className="text-3xl font-bold text-violet-800 mb-6">Interview History</h1>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border-t-4 border-violet-500 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-violet-50 text-violet-700">
            <tr>
              <th className="p-4 text-sm font-semibold">Date</th>
              <th className="p-4 text-sm font-semibold">Type</th>
              <th className="p-4 text-sm font-semibold">Score</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((item, i) => (
              <tr key={i} className="hover:bg-violet-50 transition">
                <td className="p-4 text-gray-700">{item.date}</td>
                <td className="p-4 text-gray-700">{item.type}</td>
                <td className="p-4 text-violet-700 font-semibold">{item.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}