import mongoose, { Schema, Document } from "mongoose";

interface IQuestion {
  question?: string;
  answer?: string;
  sentimentScore?: number | null;
}

export interface IInterviewResult extends Document {
  userId?: string; // keep flexible
  interviewType?: string;
  duration?: string;
  mode?: string;
  confidence?: number;
  score?: number;
  questions?: IQuestion[];
  feedback?: string;
  createdAt?: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: false }, // made optional
  answer: { type: String, required: false },
  sentimentScore: { type: Number, required: false },
});

const interviewResultSchema = new Schema<IInterviewResult>({
  userId: { type: String, required: false }, // changed from ObjectId
  interviewType: { type: String, required: false }, // relaxed
  duration: { type: String, required: false },
  mode: { type: String, enum: ["text", "video"], default: "text" },
  confidence: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  questions: { type: [QuestionSchema], default: [] },
  feedback: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const InterviewResult =
  mongoose.models.InterviewResult ||
  mongoose.model<IInterviewResult>("InterviewResult", interviewResultSchema);

export default InterviewResult;
