import mongoose,{Schema} from "mongoose";
const LogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["video", "audio", "text"], required: true },
  filePath: String,
  textContent: String, 
  emotions: [String],
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
export const Log = mongoose.model("Log", LogSchema);