// backend/controllers/analyticsController.js
export const getAnalyticsData = async (req, res) => {
  try {
    const chartData = {
      line: [
        { date: "Jan", value: 100 },
        { date: "Feb", value: 180 },
        { date: "Mar", value: 250 },
        { date: "Apr", value: 320 },
        { date: "May", value: 400 },
        { date: "Jun", value: 460 },
        { date: "Jul", value: 520 },
        { date: "Aug", value: 610 },
        { date: "Sep", value: 680 },
        { date: "Oct", value: 720 },
        { date: "Nov", value: 790 },
        { date: "Dec", value: 850 },
      ],
      bar: [
        { month: "Q1", revenue: 12500 },
        { month: "Q2", revenue: 16200 },
        { month: "Q3", revenue: 18250 },
        { month: "Q4", revenue: 21000 },
      ],
      pie: [
        { name: "International", value: 540 },
        { name: "Domestic", value: 760 },
      ],
    };

    const insights = {
      growthRate: "8.5%",
      totalTourists: 56000,
      avgSpending: 320,
      satisfactionScore: 91,
    };

    res.status(200).json({ chartData, insights });
  } catch (err) {
    console.error("Error in getAnalyticsData:", err);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
};
