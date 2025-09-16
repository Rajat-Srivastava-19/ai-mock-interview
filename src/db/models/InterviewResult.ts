import mongoose from "mongoose";

const interviewResultSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    interviewType: {type: String, required: true},
    duration: {type: String, required: true},
    questions: [{type:String, required: true}],
    answers: [{type: String, required: true}],
    mode: {type: String, enum: ["text","video"], default:"text"},
    createdAt: {type: Date, default: Date.now}
});

const InterviewResult = mongoose.models.InterviewResult || mongoose.model("InterviewResult", interviewResultSchema);
export default InterviewResult;