import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import InterviewResult from "@/db/models/InterviewResult";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string}> }
) {
    try {
        const { id } = await context.params;
        
        await dbConnect();

        const result = await InterviewResult.findById(id);
        if(!result) {
            return NextResponse.json({ success: false, error: "Result not found"}, {status: 404});
        }

        return NextResponse.json({success: true, result});
    } catch (err) {
        console.error("Error fetching interview result:",err);
        return NextResponse.json({success: false, error: "Error fetching result"}, { status: 500});
    }
}