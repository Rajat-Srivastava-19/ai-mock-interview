/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function InterviewPage() {
  // ---------- State ----------
  const [type, setType] = useState<string>("tech");
  const [time, setTime] = useState<string>("5minutes");
  const [mode, setMode] = useState<string>("text");

  const [interviewReady, setInterviewReady] = useState(false);
  const [questions, setQuestions] = useState<Array<string | { question: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [interviewActive, setInterviewActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [fetchingQuestion, setFetchingQuestion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);



  // ---------- Extract query params ----------
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);

    const t = searchParams.get("type") || "tech";
    const tm = searchParams.get("time") || "5minutes";
    const m = searchParams.get("mode") || "text";

    setType(t);
    setTime(tm);
    setMode(m);

    const timeMap: Record<string, number> = {
      "5minutes": 5 * 60,
      "10minutes": 10 * 60,
      "20minutes": 20 * 60,
    };
    setSeconds(timeMap[tm] || 300);

    setInterviewReady(true);
  }, []);

  // ---------- Voice recognition (video mode) ----------
  useEffect(() => {
    if(mode!== "video" || !interviewReady) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if(!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser. ");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";

      for(let i = event.resultIndex; i<event.results.length; ++i){
        const transcript = event.results[i][0].transcript;
        if(event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      setAnswer(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();

    return () => {
      try {
        recognition.stop();
      } catch{}
    };
  }, [mode, interviewReady]);

  useEffect(() => {
    if(mode !== "video" || !interviewReady) return;

    async function setupWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true});
        setVideoStream(stream);
        if(videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch(err) {
        console.error("Webcam access error:", err);
      }
    }

    setupWebcam();

    return () => {
      if(videoStream){
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mode, interviewReady, videoStream]);

  // ---------- Fetch next question ----------
  const fetchNextQuestion = useCallback(async (): Promise<boolean> => {
    if (fetchingQuestion) return false;
    setFetchingQuestion(true);

    try {
      const res = await fetch(`/api/questions?type=${encodeURIComponent(type)}&count=1`);
      if (!res.ok) return false;

      const data = await res.json();
      if (data?.questions && data.questions.length > 0) {
        setQuestions((prev) => [...prev, data.questions[0]]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to fetch question:", error);
      return false;
    } finally {
      setFetchingQuestion(false);
    }
  }, [type, fetchingQuestion]);

  // ---------- Load first question ----------
  useEffect(() => {
    if (!interviewReady || !interviewActive) return;
    if (questions.length === 0) {
      fetchNextQuestion().then((added) => {
        if (added) setCurrentIndex(0);
      });
    }
  }, [fetchNextQuestion, interviewReady, interviewActive, questions.length]);

  // ---------- Countdown ----------
  useEffect(() => {
    if (!interviewReady || !interviewActive || questions.length === 0) return;

    const id = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(id);
  }, [interviewReady, interviewActive, questions.length]);

  // ---------- Finish interview ----------
  const handleFinish = useCallback(async () => {
    if (!interviewActive) return;
    setInterviewActive(false);
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId") || "guest";

      const resultData = {
        userId,
        interviewType: type,
        duration: time,
        mode,
        questions: questions.map((q,i) => ({
          question: q,
          answer: answers[i] || "",
        })),
      };

      const res = await fetch("/api/interview/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultData),
      });

      const data = await res.json();
      if(!data.success) throw new Error("Failed to save interview result.");

      const interviewId = data.result?._id;

      const evalRes = await fetch("/api/evaluate", {
        method: "POST",
        headers: {"Content-Type" : "application/json" },
        body: JSON.stringify({
          questions: resultData.questions.map((q) => q.question),
          answers: resultData.questions.map((q) => q.answer),
        }),
      });

      const evalData = await evalRes.json();

      if(evalData.success) {
        await fetch(`/api/interview/update/${interviewId}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            confidence: evalData.confidence,
            feedback: evalData.feedback,
            questions: evalData.results,
          }),
        });
      }

      window.location.href = `/dashboard/result/${interviewId}`;
    } catch (error) {
      console.error("Error finishing interview:", error);
      alert("Error submitting interview!");
    } finally {
      setLoading(false);
    }
  }, [type, time, mode, questions, answers, interviewActive]);

  // ---------- Auto-finish when time is up ----------
  useEffect(() => {
    if (seconds === 0 && interviewActive && questions.length > 0) {
      handleFinish();
    }
  }, [seconds, interviewActive, handleFinish, questions.length]);

  // ---------- Submit answer ----------
  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setAnswers((prev) => [...prev, answer.trim()]);
    setAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    const added = await fetchNextQuestion();
    if (added) setCurrentIndex((prev) => prev + 1);
    else await handleFinish();
  };

  if (!interviewReady || (!interviewActive && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        {loading ? "Saving your responses... ⏳" : "Loading interview settings..."}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading questions...
      </div>
    );
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl text-center font-bold mb-4">{type.toUpperCase()} Interview</h1>
        <p className="mb-6 text-gray-400 text-center">Time Left: {formatTime(seconds)}</p>

        <h2 className="text-xl font-bold mb-4">Question {currentIndex + 1}</h2>
        <p className="mb-6">
          {typeof questions[currentIndex] === "string"
            ? questions[currentIndex]
            : questions[currentIndex]?.question || "Loading next question..."}
        </p>

        {mode === "text" ? (
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 mb-4"
            rows={5}
          />
        ) : (
         <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <p className="text-violet-300 mb-2">Listening....</p>
          <p className="text-violet-300 mb-4">{answer || "Start speaking..."}</p>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full rounded-md border border-gray-600" 
          />
         </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || fetchingQuestion}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {fetchingQuestion ? "Loading..." : "Submit & Next"}
          </button>

          <button
            onClick={handleFinish}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Finish Interview
          </button>
        </div>
      </div>
    </div>
  );
}
