import { Schema } from "mongoose";

const StreakSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  activity: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
  streakCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export const Streak = mongoose.model("Streak", StreakSchema);