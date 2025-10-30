// src/components/TourismInsights.jsx
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

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171"];

export default function TourismInsights() {
  const perfMetrics = [
    { title: "Visitor Growth", value: 12.4, suffix: "%" },
    { title: "Avg Revenue / Month", value: 4_200, prefix: "$" },
    { title: "Conversion Rate", value: 3.6, suffix: "%" },
    { title: "Satisfaction", value: 88, suffix: "%" },
  ];

  return (
    <motion.div
      className="space-y-6 mt-8 text-gray-800 dark:text-gray-100 transition-colors duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ translateY: -4 }}
        >
          <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mb-4">
            Monthly Tourism Performance
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 6, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  strokeOpacity={0.3}
                />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--tooltip-bg, #fff)",
                    border: "1px solid var(--tooltip-border, #e5e7eb)",
                    color: "var(--tooltip-text, #111827)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#60a5fa"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#34d399"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex flex-col transition-all duration-300 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          whileHover={{ translateY: -4 }}
        >
          <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mb-4">
            Tourism Category Distribution
          </h3>
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
                  label
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
                    backgroundColor: "var(--tooltip-bg, #fff)",
                    border: "1px solid var(--tooltip-border, #e5e7eb)",
                    color: "var(--tooltip-text, #111827)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Performance Metric Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        {perfMetrics.map((m) => (
          <motion.div
            key={m.title}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 flex items-center justify-between border border-gray-200 dark:border-gray-700 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {m.title}
              </p>
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {m.prefix ? <span className="mr-1">{m.prefix}</span> : null}
                <CountUp
                  end={m.value}
                  duration={1.8}
                  separator=","
                  decimals={
                    m.suffix === "%" || String(m.value).includes(".") ? 1 : 0
                  }
                  decimal="."
                />
                {m.suffix ? (
                  <span className="ml-1 text-gray-500 dark:text-gray-400">
                    {m.suffix}
                  </span>
                ) : null}
              </h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-900 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-sky-500 dark:text-sky-400"
              >
                <path
                  d="M12 2v10l3-2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
