import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const performanceData = [
  { month: "Jan", visitors: 1200, revenue: 300 },
  { month: "Feb", visitors: 1800, revenue: 400 },
  { month: "Mar", visitors: 1500, revenue: 350 },
  { month: "Apr", visitors: 2200, revenue: 500 },
  { month: "May", visitors: 2000, revenue: 450 },
  { month: "Jun", visitors: 2500, revenue: 550 },
];

const categoryData = [
  { name: "Adventure", value: 32 },
  { name: "Cultural", value: 25 },
  { name: "Wildlife", value: 18 },
  { name: "Beach", value: 25 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function TourismInsights() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Performance Line Chart */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Monthly Tourism Performance
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Visitors</p>
            <p className="text-lg font-semibold text-sky-600">
              <CountUp
                end={performanceData.reduce((a, b) => a + b.visitors, 0)}
                duration={2}
              />
            </p>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  color: "#111827",
                }}
              />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Category Pie Chart */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Tourism Category Distribution
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Categories</p>
            <p className="text-lg font-semibold text-emerald-600">
              <CountUp end={categoryData.length} duration={1.5} />
            </p>
          </div>
        </div>

        <div className="h-72 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  color: "#111827",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
