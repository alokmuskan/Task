import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    rating: { type: Number, default: 0 },
    visitors: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
