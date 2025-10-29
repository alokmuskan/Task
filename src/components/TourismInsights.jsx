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
  // static performance metrics (new cards)
  const perfMetrics = [
    { title: "Visitor Growth", value: 12.4, suffix: "%" },
    { title: "Avg Revenue / Month", value: 4_200, prefix: "$" },
    { title: "Conversion Rate", value: 3.6, suffix: "%" },
    { title: "Satisfaction", value: 88, suffix: "%" },
  ];

  return (
    <motion.div
      className="space-y-6 mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Charts row: keep white card backgrounds so charts look clean on gradient page */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ translateY: -4 }}
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Monthly Tourism Performance
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e6eef8",
                    color: "#0f172a",
                  }}
                />
                <Line type="monotone" dataKey="visitors" stroke="#60a5fa" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          whileHover={{ translateY: -4 }}
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e6eef8",
                    color: "#0f172a",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Performance Cards row */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        {perfMetrics.map((m) => (
          <motion.div
            key={m.title}
            className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div>
              <p className="text-sm text-gray-500 mb-1">{m.title}</p>
              <h4 className="text-2xl font-semibold text-gray-800">
                {m.prefix ? <span className="mr-1">{m.prefix}</span> : null}
                <CountUp
                  end={m.value}
                  duration={1.8}
                  separator=","
                  decimals={m.suffix === "%" || String(m.value).includes(".") ? 1 : 0}
                  decimal="."
                />
                {m.suffix ? <span className="ml-1 text-gray-500">{m.suffix}</span> : null}
              </h4>
            </div>
            {/* simple decorative icon circle */}
            <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-sky-500">
                <path d="M12 2v10l3-2" stroke="#06b6d4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* NOTE:
          The parent page currently uses a subtle gradient background:
            className="bg-gradient-to-br from-gray-50 to-gray-100"
          If you want the entire app area to be pure white instead, change the parent container (in App.jsx or Dashboard.jsx)
          from that gradient class to simply `bg-white` (or remove it) — charts/cards here will still have white backgrounds.
      */}
    </motion.div>
  );
}
