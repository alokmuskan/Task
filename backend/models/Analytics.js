import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    visitors: { type: Number, required: true },
    revenue: { type: Number, required: true },
    bookings: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
