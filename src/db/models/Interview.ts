import mongoose, {Schema,Document} from "mongoose";

const interviewSchema:Schema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);
export interface IInterview extends Document {
  type: string;
  status: string;
  createdAt: Date;
}

const Interview =
  mongoose.models.Interview || mongoose.model<IInterview>("Interview", interviewSchema);

export default Interview;
