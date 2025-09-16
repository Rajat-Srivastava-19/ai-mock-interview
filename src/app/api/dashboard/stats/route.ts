import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Interview from "@/db/models/Interview";

export async function GET() {
  await connect();

  const userId = "12345";

  const interviews = await Interview.find({ userId }).sort({ date: -1 });

  return NextResponse.json({
    confidence: 72, 
    interviews: interviews.length,
    lastInterview: interviews[0]?.date?.toDateString() || "No data",
    upcoming: "Tomorrow at 5 PM", 
  });
}
