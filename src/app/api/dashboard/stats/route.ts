import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; 
import Interview from "@/db/models/Interview";

export async function GET() {
  try {
    await dbConnect();

    const userId = "12345";

    const interviews = await Interview.find({ userId }).sort({ date: -1 });

    const lastInterview = interviews[0]?.date
      ? new Date(interviews[0].date).toDateString()
      : "No data";

    const upcomingInterview = interviews.find(i => i.date > new Date());
    const upcoming = upcomingInterview
      ? new Date(upcomingInterview.date).toLocaleString("en-IN", {
          weekday: "long",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : "No upcoming interviews";

    return NextResponse.json({
      confidence: 72,
      interviews: interviews.length,
      lastInterview,
      upcoming,
    });
  } catch (error) {
    console.error(" Error in dashboard stats route:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}