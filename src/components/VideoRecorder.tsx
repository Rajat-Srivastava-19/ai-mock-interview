"use client";

import { useEffect, useRef, useState } from "react";

interface VideoRecorderProps {
  onSave: (url: string) => void;
}

export default function VideoRecorder({ onSave }: VideoRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    }
    initCamera();
  }, []);

  const startRecording = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;
    const stream = videoRef.current.srcObject as MediaStream;

    mediaRecorderRef.current = new MediaRecorder(stream);
    chunks.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      onSave(url); // pass video url back to parent
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="space-y-4">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full rounded-lg border border-gray-600"
      />
      <div className="flex gap-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="bg-green-600 px-4 py-2 rounded-lg text-white"
          >
            🎥 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-600 px-4 py-2 rounded-lg text-white"
          >
            ⏹ Stop Recording
          </button>
        )}
      </div>

      {videoUrl && (
        <div>
          <h3 className="text-white mb-2">Recorded Answer:</h3>
          <video src={videoUrl} controls className="w-full rounded-lg" />
        </div>
      )}
    </div>
  );
}
