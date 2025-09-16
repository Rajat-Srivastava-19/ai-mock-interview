/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from "@/dbconfig/dbConfig";
import InterviewResult from "@/db/models/InterviewResult";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const saved = await InterviewResult.create(body);
        return NextResponse.json({success: true, data: saved});
    } catch(error: any){
        return NextResponse.json({success: false, error: error.message}, {status:500});
    }
}