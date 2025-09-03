/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

export default function InterviewPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [interviewActive, setInterviewActive] = useState(true);

  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams("");
  const type = searchParams.get("type") || "tech";
  const time = searchParams.get("time") || "5minutes";
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timeMap: Record<string, number> = {
      "5minutes": 5 * 60,
      "10minutes": 10 * 60,
      "20minutes": 20 * 60,
    };
    setSeconds(timeMap[time] || 300);
  }, [time]);

  useEffect(() => {
    if (!interviewActive || seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setInterviewActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, interviewActive]);

  useEffect(() => {
    if(questions.length === 0 && interviewActive){
      fetchNextQuestion();
    }
  }, [interviewActive]);

  const fetchNextQuestion = async () => {
    try {
      const res = await fetch(`/api/questions?type=${type}&count=1`);
      const data = await res.json();
      setQuestions((prev) => [...prev, data.questions[0]]);
      setCurrentIndex(questions.length); // Move to the new question
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async () => {
    setAnswers((prev) => [...prev, answer]);
    setAnswer("");

    if (interviewActive && seconds > 0) {
      await fetchNextQuestion();
    } else {
      setInterviewActive(false);
      alert("Interview finished ✅");
      console.log("Your answers:", [...answers, answer]);
    }
  };

  if (!interviewActive || seconds <= 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl">
          <h1 className="text-3xl text-center font-bold mb-4">
            {type.toUpperCase()} Interview Finished
          </h1>
          <p className="mb-6 text-gray-400 text-center">Time up!</p>
          <p className="mb-6">You answered {answers.length} questions.</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return <p className="text-white">Loading questions...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl text-center font-bold mb-4">
         {type.toUpperCase()} Interview
      </h1>
      <p className="mb-6 text-gray-400 text-center">Time Left: {formatTime(seconds)}</p>

        <h1 className="text-xl font-bold mb-4">
          Question {currentIndex + 1}
        </h1>
        <p className="mb-6">{questions[currentIndex]}</p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 mb-4"
          rows={5}
        />
        <div className="flex justify-center">
          <button
          onClick={handleSubmit}
          className=" bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Submit
        </button>
        </div>
      </div>
    </div>
  );
}
