// app/dashboard/upload/page.tsx
"use client";

import { useState } from "react";

export default function UploadResume() {
  const [fileName, setFileName] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Upload Resume</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        className="bg-white text-black p-2 rounded-lg"
      />

      {fileName && (
        <p className="mt-3 text-emerald-300 font-semibold">📄 Uploaded: {fileName}</p>
      )}
    </div>
  );
}
