/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbConnect";
import InterviewResult from "@/db/models/InterviewResult";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // 🧩 Force format data safely
    const formattedBody: any = {
      userId: body.userId || null, // No ObjectId enforcement
      interviewType: body.interviewType || "unknown",
      duration: body.duration || "5minutes",
      mode: body.mode || "text",
      confidence: body.confidence || 0,
      score: body.score || 0,
      feedback: body.feedback || "",
      questions: (body.questions || []).map((q: any) => ({
        question: q.question || (typeof q === "string" ? q : ""),
        answer: q.answer || "",
        sentimentScore: q.sentimentScore || null,
      })),
      createdAt: new Date(),
    };

    // 🧠 Force save, ignoring validation
    const savedResult = new InterviewResult(formattedBody);
    await savedResult.save({ validateBeforeSave: false });

    return NextResponse.json({
      success: true,
      result: savedResult,
    });
  } catch (error: any) {
    console.error("Error saving interview result:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
