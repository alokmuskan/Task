import { useEffect, useState } from "react";
import { BarChart2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import api from "../lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0ea5e9", "#22c55e"];

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

      {/* Overview Cards */}
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

      {/* Monthly Bookings Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="text-green-500" /> Monthly Bookings
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="py-2 px-4 text-gray-600">Month</th>
                <th className="py-2 px-4 text-gray-600 text-right">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {analytics.monthlyStats?.map((m) => (
                <tr key={m.month} className="border-b border-gray-100">
                  <td className="py-2 px-4">{m.month}</td>
                  <td className="py-2 px-4 text-right font-medium">{m.bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-500" /> Monthly Bookings Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#0ea5e9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-sky-600">Quarterly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.quarterlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-sky-600">Tourist Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.touristType}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {analytics.touristType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
