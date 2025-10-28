import { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { Users, MapPin, BarChart2, Globe, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Main content */}
      <main className="flex-1 px-10 py-3 space-y-10 bg-gray-50">
        {/* Overview */}
        <section>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Overview</h2>
              <p className="text-gray-500">Key metrics and recent trends</p>
            </div>

            {/* ✅ Refresh Button */}
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all"
            >
              <RefreshCw size={18} />
              Refresh Stats
            </button>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              key={`visitors-${refreshKey}`}
              title="Total Visitors"
              value="24,320"
              icon={<Users className="text-sky-500" />}
            />
            <Card
              key={`destination-${refreshKey}`}
              title="Top Destination"
              value="Bali"
              icon={<MapPin className="text-sky-500" />}
            />
            <Card
              key={`revenue-${refreshKey}`}
              title="Revenue"
              value="$52,430"
              icon={<BarChart2 className="text-sky-500" />}
            />
            <Card
              key={`regions-${refreshKey}`}
              title="Active Regions"
              value="18"
              icon={<Globe className="text-sky-500" />}
            />
          </div>
        </section>

        {/* Charts section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-lg font-semibold mb-4">Visitor Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { name: "Jan", value: 120 },
                  { name: "Feb", value: 200 },
                  { name: "Mar", value: 180 },
                  { name: "Apr", value: 260 },
                  { name: "May", value: 310 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    { name: "Beach", value: 400 },
                    { name: "Mountain", value: 300 },
                    { name: "City", value: 200 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tourism Categories
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Adventure", value: 30 },
                      { name: "Luxury", value: 20 },
                      { name: "Culture", value: 25 },
                      { name: "Nature", value: 25 },
                    ]}
                    dataKey="value"
                    outerRadius={70}
                  >
                    <Cell fill="#0ea5e9" />
                    <Cell fill="#38bdf8" />
                    <Cell fill="#7dd3fc" />
                    <Cell fill="#bae6fd" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Card component
function Card({ title, value, icon }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 flex items-center justify-between cursor-pointer
      hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {isNaN(numericValue) ? (
            value
          ) : (
            <>
              {value.includes("$") && "$"}
              <CountUp key={numericValue} end={numericValue} duration={2.5} separator="," />
              {value.includes("k") && "k"}
            </>
          )}
        </h4>
      </div>
      {icon}
    </motion.div>
  );
}
