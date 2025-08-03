import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String },
  score: { type: Number },
  confidence: { type: Number },
  scheduledAt: { type: Date },
  date: { type: Date, default: Date.now },
});

const Interview =
  mongoose.models.Interview || mongoose.model("Interview", interviewSchema);

export default Interview;
