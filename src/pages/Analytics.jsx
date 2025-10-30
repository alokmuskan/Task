import { useEffect, useState } from "react";
import { BarChart2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import api from "../lib/api";
import { useTheme } from "../context/ThemeContext";
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
  const { theme } = useTheme();

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

  // Set chart stroke colors based on theme
  const chartStroke = theme === "dark" ? "#4b5563" : "#e5e7eb";
  const textColor = theme === "dark" ? "#e5e7eb" : "#374151";

  return (
    <div
      className={`min-h-screen p-10 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <BarChart2 className="text-sky-600" /> Analytics Overview
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Users", value: analytics.totalUsers },
          { title: "Bookings", value: analytics.totalBookings },
          { title: "Avg. Spend", value: `₹${analytics.averageSpend}` },
          { title: "Satisfaction", value: `${analytics.satisfactionRate}%` },
        ].map((card, i) => (
          <motion.div
            key={i}
            className={`p-6 rounded-2xl shadow transition-all ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <h3
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {card.title}
            </h3>
            <p className="text-2xl font-semibold">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Monthly Bookings Table */}
      <div
        className={`p-6 rounded-2xl shadow-md mb-10 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="text-green-500" /> Monthly Bookings
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr
                className={`text-left border-b ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <th className="py-2 px-4 text-gray-500">Month</th>
                <th className="py-2 px-4 text-gray-500 text-right">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {analytics.monthlyStats?.map((m) => (
                <tr
                  key={m.month}
                  className={`border-b ${
                    theme === "dark"
                      ? "border-gray-700 hover:bg-gray-700/30"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-4">{m.month}</td>
                  <td className="py-2 px-4 text-right font-medium">
                    {m.bookings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div
          className={`p-6 rounded-2xl shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-500" /> Monthly Bookings Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.monthlyStats}>
              <CartesianGrid stroke={chartStroke} strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor:
                    theme === "dark" ? "#1f2937" : "white",
                  color: textColor,
                }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#0ea5e9"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div
          className={`p-6 rounded-2xl shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 text-sky-600">
            Quarterly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.quarterlyRevenue}>
              <CartesianGrid stroke={chartStroke} strokeDasharray="3 3" />
              <XAxis dataKey="quarter" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor:
                    theme === "dark" ? "#1f2937" : "white",
                  color: textColor,
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#0ea5e9"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          className={`p-6 rounded-2xl shadow-md lg:col-span-2 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 text-sky-600">
            Tourist Distribution
          </h3>
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor:
                    theme === "dark" ? "#1f2937" : "white",
                  color: textColor,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
