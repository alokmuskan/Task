// backend/controllers/dashboardController.js
export const getDashboardData = async (req, res) => {
  try {
    const statsData = {
      totalVisitors: 24320,
      topDestination: "Bihar",
      revenue: 52430,
      activeRegions: 18,
    };

    const chartData = {
      line: [
        { date: "Jan", value: 120 }, { date: "Feb", value: 200 }, { date: "Mar", value: 180 },
        { date: "Apr", value: 260 }, { date: "May", value: 300 }, { date: "Jun", value: 350 },
        { date: "Jul", value: 420 }, { date: "Aug", value: 460 }, { date: "Sep", value: 500 },
        { date: "Oct", value: 550 }, { date: "Nov", value: 600 }, { date: "Dec", value: 650 },
      ],
      bar: [
        { month: "Jan", revenue: 4000 },
        { month: "Feb", revenue: 3000 },
        { month: "Mar", revenue: 5000 },
        { month: "Apr", revenue: 4500 },
        { month: "May", revenue: 6000 },
      ],
      pie: [
        { name: "Beaches", value: 400 },
        { name: "Mountains", value: 300 },
        { name: "Historical Sites", value: 300 },
        { name: "Adventure Sports", value: 200 },
      ],
    };

    res.status(200).json({ statsData, chartData });
  } catch (err) {
    console.error("Error in getDashboardData:", err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};
