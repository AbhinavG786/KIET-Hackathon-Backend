import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  role: { type: String, enum: ["astronaut", "medical_officer"], default: "astronaut" },
  profile: {
    name: String,
    age: Number,
    gender: String,
  },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", UserSchema);