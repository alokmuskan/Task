import { useEffect, useState } from "react";
import { BarChart2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import api from "../lib/api";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get("/api/analytics");
        setAnalytics(data.analytics || {});
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading analytics...</p>;

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <BarChart2 className="text-sky-600" /> Analytics Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div className="bg-white p-6 rounded-2xl shadow" whileHover={{ scale: 1.05 }}>
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-semibold">{analytics.totalUsers}</p>
        </motion.div>

        <motion.div className="bg-white p-6 rounded-2xl shadow" whileHover={{ scale: 1.05 }}>
          <h3 className="text-gray-500">Bookings</h3>
          <p className="text-2xl font-semibold">{analytics.totalBookings}</p>
        </motion.div>

        <motion.div className="bg-white p-6 rounded-2xl shadow" whileHover={{ scale: 1.05 }}>
          <h3 className="text-gray-500">Avg. Spend</h3>
          <p className="text-2xl font-semibold">₹{analytics.averageSpend}</p>
        </motion.div>

        <motion.div className="bg-white p-6 rounded-2xl shadow" whileHover={{ scale: 1.05 }}>
          <h3 className="text-gray-500">Satisfaction</h3>
          <p className="text-2xl font-semibold">{analytics.satisfactionRate}%</p>
        </motion.div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="text-green-500" /> Monthly Bookings
        </h3>
        <ul className="space-y-2">
          {analytics.monthlyStats?.map((m) => (
            <li key={m.month} className="flex justify-between">
              <span>{m.month}</span>
              <span>{m.bookings}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
