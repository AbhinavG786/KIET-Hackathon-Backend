import mongoose,{Schema} from "mongoose";
const WearableDataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  heartRate: Number,
  sleepHours: Number,
  caloriesBurnt: Number,
  oxygenLevel: Number,
});

export const WearableData = mongoose.model("WearableData", WearableDataSchema);