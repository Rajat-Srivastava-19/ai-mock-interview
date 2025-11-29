/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "@/lib/chartSetup";
import { Radar, Doughnut } from "react-chartjs-2";
import { generateInterviewPDF } from "@/lib/generateInterviewPDF";

export default function ResultPage() {
  const { id } = useParams();
  const router = useRouter();

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [evaluation, setEvaluation] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchResultAndEvaluate() {
      try {
        const res = await fetch(`/api/interview/result/${id}`);
        const data = await res.json();
        setResult(data.result);

        const evalRes = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questions: data.result.questions.map((q: any) => q.question),
            answers: data.result.questions.map((q: any) => q.answer),
          }),
        });

        const evalData = await evalRes.json();
        setEvaluation(evalData);
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResultAndEvaluate();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Evaluating your responses... ⏳
      </div>
    );

  if (!result)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <p>No result found.</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
        >
          Back to Dashboard
        </button>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 to-white p-8">
      <div id="pdf-content" className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-violet-800 mb-6">
          AI Evaluation Report
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-violet-700 mb-4">
            Overall Confidence
          </h2>
          
          <div className="w-64 mx-auto">
            <Doughnut
              data={{
                labels: ["Score", "Remaining"],
                datasets: [
                  {
                    data: [
                      evaluation?.confidence ?? 0,
                      100 - (evaluation?.confidence ?? 0),
                    ],
                    backgroundColor: ["#7C3AED", "#EDE9FE"],
                    borderWidth: 0,
                  },
                ],
              }}
            />
          </div>

          <p className="text-center text-gray-600 text-lg mt-4">
            {evaluation?.feedback}
          </p>
        </div>

        <h2 className="text-2xl font-bold text-violet-700 mb-4">
          Question-by-Question Analysis
        </h2>

        {evaluation?.results?.map((r: any,i:number) => (
          <div key={i} className="bg-white rounded-2xl p-6 mb-6 shadow-md border border-violet-100">
            <p className="font-semibold text-violet-700 mb-2">
              Q{i+1}.{r.question}
            </p>
            
            <p className="text-gray-700 bg-violet-50 border border-violet-100 p-3 rounded-lg mb-4">
              {r.answer || "No answer given"}
            </p>

            <Radar
              data={{
                labels: [
                  "Sentiment",
                  "Keyword Match",
                  "Grammer",
                  "Clarity",
                  "Length",
                ],
                datasets: [
                  {
                    label: "Evaluation Metrics",
                    data: [
                      r.sentimentScore * 100,
                      r.keywordScore,
                      r.grammerScore,
                      r.clarityScore,
                      r.lengthScore,
                    ],
                    backgroundColor: "rgba(124,58,237,0.2)",
                    borderColor: "#7C3AED",
                    borderWidth: 2,
                  }
                ],
              }}
              options={{
                scales: {
                  r: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {display:false},
                  },
                },
              }}
             />
          </div>
        ))}

        <button
          onClick={() => generateInterviewPDF(result, evaluation)}
          className="mt-6 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
        >
          Download PDF Report
        </button>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-md"
          >
            Back to Dashboard
          </button>
        </div>
        
      </div>
    </main> 
  );
}
