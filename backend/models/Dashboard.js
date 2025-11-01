import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
  {
    totalVisitors: { type: Number, default: 0 },
    totalBookings: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Dashboard", dashboardSchema);
