/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import InterviewResult from "@/db/models/InterviewResult";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await request.json();

        const updated = await InterviewResult.findByIdAndUpdate(
            params.id,
            {
                $set: {
                    confidence: body.confidence,
                    feedback: body.feedback,
                    questions: body.questions
                },
            },
            {new: true}
        );

        if(!updated){
            return NextResponse.json({success: false, error: "Interview not found" });
        }

        return NextResponse.json({success: true, updated});
    } catch(error: any){
        console.error("Error updating interview:", error);
        return NextResponse.json({success: false, error: error.message});
    }
}