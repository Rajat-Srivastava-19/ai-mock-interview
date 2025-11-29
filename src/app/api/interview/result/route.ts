import {NextResponse} from "next/server";
import dbConnect from "@/lib/dbConnect";
import InterviewResult from "@/db/models/InterviewResult";

export async function POST(req: Request){
    try {
        await dbConnect();
        const body = await req.json();
        const newResult = await InterviewResult.create(body);
        return NextResponse.json({success: true, id: newResult._id});
    } catch (err) {
        console.error("Error saving interview result:",err);
        return NextResponse.json({success:false,error: "Failed to save result"});
    }
}