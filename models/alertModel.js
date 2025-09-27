import mongoose,{Schema} from "mongoose";
const AlertSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String },
  message: String,
  severity: { type: String },
  triggeredAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});
export const Alert = mongoose.model("Alert", AlertSchema);