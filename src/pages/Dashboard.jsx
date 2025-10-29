import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Users, MapPin, BarChart2, Globe, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useDashboardStore } from "../store/useDashboardStore";
import { useState } from "react";

import MyLineChart from "../components/Charts/LineChart";
import MyBarChart from "../components/Charts/BarChart";
import MyPieChart from "../components/Charts/PieChart";

import TouristStats from "../components/TouristStats";
import TourismInsights from "../components/TourismInsights";

export default function Dashboard() {
  const { loadDashboardFromServer, loadAnalyticsFromServer } = useDashboardStore();
  const { statsData, chartData, refreshStats } = useDashboardStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    refreshStats(); // trigger Zustand update
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  useEffect(() => {
    // fire-and-forget; store handles fallback if backend fails
    loadDashboardFromServer();
    loadAnalyticsFromServer();
  }, []);

  return (
    // 🔹 Slight gradient background for subtle depth
    // 👉 To make it fully white, replace the class below with: "flex min-h-screen bg-white text-gray-800"
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <main className="flex-1 px-10 py-3 space-y-10">
        {/* Header */}
        <section>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Overview</h2>
              <p className="text-gray-500">Key metrics and recent trends</p>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-white 
                ${isRefreshing ? "bg-sky-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"}`}
            >
              <RefreshCw
                size={18}
                className={isRefreshing ? "animate-spin" : ""}
              />
              {isRefreshing ? "Refreshing..." : "Refresh Stats"}
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              title="Total Visitors"
              value={statsData.totalVisitors.toLocaleString()}
              icon={<Users className="text-sky-500" />}
            />
            <Card
              title="Top Destination"
              value={statsData.topDestination}
              icon={<MapPin className="text-sky-500" />}
            />
            <Card
              title="Revenue"
              value={`$${statsData.revenue.toLocaleString()}`}
              icon={<BarChart2 className="text-sky-500" />}
            />
            <Card
              title="Active Regions"
              value={statsData.activeRegions.toString()}
              icon={<Globe className="text-sky-500" />}
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 8px 25px rgba(14,165,233,0.15)",
            }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Visitor Growth
            </h3>
            <MyLineChart data={chartData.line} />
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Bar Chart */}
            <motion.div
              className="bg-white rounded-2xl shadow-md p-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 8px 25px rgba(14,165,233,0.15)",
              }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Revenue Overview
              </h3>
              <MyBarChart data={chartData.bar} />
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              className="bg-white rounded-2xl shadow-md p-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 8px 25px rgba(14,165,233,0.15)",
              }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Tourism Categories
              </h3>
              <MyPieChart data={chartData.pie} />
            </motion.div>
          </div>
        </section>

        {/* Tourist Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 8px 25px rgba(14,165,233,0.15)",
          }}
        >
          <TouristStats />
          <TourismInsights />
        </motion.section>
      </main>
    </div>
  );
}

// Card Component
function Card({ title, value, icon }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h4 className="text-2xl font-semibold text-gray-800">
          {isNaN(numericValue) ? (
            value
          ) : (
            <>
              {value.includes("$") && "$"}
              <CountUp
                key={numericValue}
                end={numericValue}
                duration={2.5}
                separator=","
              />
            </>
          )}
        </h4>
      </div>
      {icon}
    </motion.div>
  );
}
