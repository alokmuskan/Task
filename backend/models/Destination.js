// backend/models/Destination.js
import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  visitors: { type: Number, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  popularMonths: [String],
  averageStay: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Destination", destinationSchema);