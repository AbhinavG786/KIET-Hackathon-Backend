import mongoose,{Schema} from "mongoose";
const ActivitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  activity: { type: String, enum: ["meditation", "exercise", "journaling", "other"] },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false }
});

export const Activity = mongoose.model("Activity", ActivitySchema);