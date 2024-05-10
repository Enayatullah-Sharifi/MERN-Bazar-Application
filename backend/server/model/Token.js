import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 36000 },
});

const Token = mongoose.model("Token", TokenSchema);
export default Token;
