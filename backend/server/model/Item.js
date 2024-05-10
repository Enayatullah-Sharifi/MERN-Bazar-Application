import mongoose from "mongoose";

const StuffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["technology", "clothes", "electronics", "vehicle", ""],
    },
    phone_number: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Stuff", StuffSchema);
