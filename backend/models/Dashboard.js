// backend/models/Dashboard.js
import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  statsData: {
    totalVisitors: { type: Number, required: true },
    topDestination: { type: String, required: true },
    revenue: { type: Number, required: true },
    activeRegions: { type: Number, required: true }
  },
  chartData: {
    line: [{
      month: String,
      visitors: Number
    }],
    bar: [{
      month: String,
      revenue: Number
    }],
    pie: [{
      name: String,
      value: Number
    }]
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Dashboard", dashboardSchema);