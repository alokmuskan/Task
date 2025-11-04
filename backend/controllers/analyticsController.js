// backend/controllers/analyticsController.js
import Analytics from "../models/Analytics.js";

export const getAnalyticsData = async (req, res) => {
  try {
    let analytics = await Analytics.findOne();

    // If no data exists, create initial mock data
    if (!analytics) {
      analytics = await Analytics.create({
        totalUsers: 56000,
        totalBookings: 850,
        averageSpend: 320,
        satisfactionRate: 91,
        monthlyStats: [
          { month: "Jan", bookings: 100 },
          { month: "Feb", bookings: 180 },
          { month: "Mar", bookings: 250 },
          { month: "Apr", bookings: 320 },
          { month: "May", bookings: 400 },
          { month: "Jun", bookings: 460 },
          { month: "Jul", bookings: 520 },
          { month: "Aug", bookings: 610 },
          { month: "Sep", bookings: 680 },
          { month: "Oct", bookings: 720 },
          { month: "Nov", bookings: 790 },
          { month: "Dec", bookings: 850 }
        ],
        quarterlyRevenue: [
          { quarter: "Q1", revenue: 12500 },
          { quarter: "Q2", revenue: 16200 },
          { quarter: "Q3", revenue: 18250 },
          { quarter: "Q4", revenue: 21000 }
        ],
        touristType: [
          { name: "International", value: 540 },
          { name: "Domestic", value: 760 }
        ]
      });
    }

    res.status(200).json({ analytics });
  } catch (err) {
    console.error("Error in getAnalyticsData:", err);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
};