// backend/controllers/dashboardController.js
import Dashboard from "../models/Dashboard.js";

// Get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne();
    
    // If no data exists, create initial mock data
    if (!dashboard) {
      dashboard = await Dashboard.create({
        statsData: {
          totalVisitors: 125847,
          topDestination: "Paris",
          revenue: 2450000,
          activeRegions: 24
        },
        chartData: {
          line: [
            { month: "Jan", visitors: 8500 },
            { month: "Feb", visitors: 9200 },
            { month: "Mar", visitors: 10500 },
            { month: "Apr", visitors: 12000 },
            { month: "May", visitors: 14200 },
            { month: "Jun", visitors: 16500 }
          ],
          bar: [
            { month: "Jan", revenue: 145000 },
            { month: "Feb", revenue: 168000 },
            { month: "Mar", revenue: 192000 },
            { month: "Apr", revenue: 215000 },
            { month: "May", revenue: 240000 },
            { month: "Jun", revenue: 268000 }
          ],
          pie: [
            { name: "Adventure", value: 450 },
            { name: "Beach", value: 320 },
            { name: "Cultural", value: 280 },
            { name: "Wildlife", value: 150 }
          ]
        }
      });
    }

    res.status(200).json(dashboard);
  } catch (err) {
    console.error("Error in getDashboardData:", err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};

// Refresh Dashboard Stats (generates new random data)
export const refreshDashboardStats = async (req, res) => {
  try {
    const randomVisitors = Math.floor(Math.random() * 50000) + 100000;
    const randomRevenue = Math.floor(Math.random() * 1000000) + 2000000;
    const randomRegions = Math.floor(Math.random() * 10) + 20;
    
    const destinations = ["Paris", "Tokyo", "New York", "London", "Dubai", "Barcelona"];
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];

    const updated = await Dashboard.findOneAndUpdate(
      {},
      {
        statsData: {
          totalVisitors: randomVisitors,
          topDestination: randomDestination,
          revenue: randomRevenue,
          activeRegions: randomRegions
        },
        updatedAt: Date.now()
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error in refreshDashboardStats:", err);
    res.status(500).json({ error: "Failed to refresh dashboard stats" });
  }
};