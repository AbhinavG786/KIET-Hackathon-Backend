import mongoose,{Schema} from "mongoose";

const ReportSchema = new Schema({
  astronautId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  officerId: { type: Schema.Types.ObjectId, ref: "User" },
  summary: String, 
  fromDate: Date,
  toDate: Date,
  generatedAt: { type: Date, default: Date.now },
  recommendations: [String]
});

export const Report = mongoose.model("Report", ReportSchema);