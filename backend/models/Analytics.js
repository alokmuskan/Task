// backend/models/Analytics.js
import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  totalUsers: { type: Number, required: true },
  totalBookings: { type: Number, required: true },
  averageSpend: { type: Number, required: true },
  satisfactionRate: { type: Number, required: true },
  monthlyStats: [{
    month: String,
    bookings: Number
  }],
  quarterlyRevenue: [{
    quarter: String,
    revenue: Number
  }],
  touristType: [{
    name: String,
    value: Number
  }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Analytics", analyticsSchema);