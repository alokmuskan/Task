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

// Refresh Dashboard Stats (generates new random data for BOTH stats AND charts)
export const refreshDashboardStats = async (req, res) => {
  try {
    // Generate random stats
    const randomVisitors = Math.floor(Math.random() * 50000) + 100000;
    const randomRevenue = Math.floor(Math.random() * 1000000) + 2000000;
    const randomRegions = Math.floor(Math.random() * 10) + 20;
    
    const destinations = ["Paris", "Tokyo", "New York", "London", "Dubai", "Barcelona"];
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];

    // Generate random chart data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    
    const newLineData = months.map((month) => ({
      month,
      visitors: Math.floor(Math.random() * 10000) + 5000
    }));

    const newBarData = months.map((month) => ({
      month,
      revenue: Math.floor(Math.random() * 100000) + 100000
    }));

    const categories = ["Adventure", "Beach", "Cultural", "Wildlife"];
    const newPieData = categories.map((name) => ({
      name,
      value: Math.floor(Math.random() * 350) + 150
    }));

    // Update MongoDB with new stats AND charts
    const updated = await Dashboard.findOneAndUpdate(
      {},
      {
        statsData: {
          totalVisitors: randomVisitors,
          topDestination: randomDestination,
          revenue: randomRevenue,
          activeRegions: randomRegions
        },
        chartData: {
          line: newLineData,
          bar: newBarData,
          pie: newPieData
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