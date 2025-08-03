import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Interview from "@/db/models/Interview"; 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    await connect();

    // Example: Get total interviews and average confidence
    const total = await Interview.countDocuments();
    const last = await Interview.findOne().sort({ date: -1 });

    const averageConfidence = await Interview.aggregate([
      { $group: { _id: null, avg: { $avg: "$confidence" } } },
    ]);

    return NextResponse.json({
      totalInterviews: total,
      averageConfidence: Math.round(averageConfidence?.[0]?.avg || 0),
      nextInterview: last?.scheduledAt || null,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
