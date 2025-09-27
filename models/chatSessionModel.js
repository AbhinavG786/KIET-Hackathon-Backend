import mongoose,{Schema} from "mongoose";
const ChatSessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      sender: { type: String, enum: ["astronaut", "ai"] },
      text: String,
      timestamp: { type: Date, default: Date.now },
      emotions: [String] 
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export const ChatSession = mongoose.model("ChatSession", ChatSessionSchema);
