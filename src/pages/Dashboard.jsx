import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Users, MapPin, BarChart2, Globe, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useDashboardStore } from "../store/useDashboardStore";

import MyLineChart from "../components/Charts/LineChart";
import MyBarChart from "../components/Charts/BarChart";
import MyPieChart from "../components/Charts/PieChart";

import TouristStats from "../components/TouristStats";
import TourismInsights from "../components/TourismInsights";

export default function Dashboard() {
  const { theme } = useTheme();
  const { loadDashboardFromServer, loadAnalyticsFromServer } = useDashboardStore();
  const { statsData, chartData, refreshStats } = useDashboardStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 🔍 For search filtering
  const [filteredStats, setFilteredStats] = useState(statsData);
  const [filteredCharts, setFilteredCharts] = useState(chartData);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    refreshStats();
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  useEffect(() => {
    loadDashboardFromServer();
    loadAnalyticsFromServer();
  }, []);

  // 🔍 Search listener (global from Topbar)
  useEffect(() => {
    const handleSearch = (event) => {
      const query = event.detail.toLowerCase();

      if (!query) {
        setFilteredStats(statsData);
        setFilteredCharts(chartData);
        return;
      }

      // Match query with stat titles or values
      const filteredStatObj = Object.keys(statsData)
        .filter((key) => {
          const value = statsData[key]?.toString().toLowerCase();
          return key.toLowerCase().includes(query) || value.includes(query);
        })
        .reduce((obj, key) => {
          obj[key] = statsData[key];
          return obj;
        }, {});

      // Filter chart data based on key names
      const filteredChartObj = {
        line: chartData.line?.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(query)
        ),
        bar: chartData.bar?.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(query)
        ),
        pie: chartData.pie?.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(query)
        ),
      };

      setFilteredStats(
        Object.keys(filteredStatObj).length ? filteredStatObj : statsData
      );
      setFilteredCharts(filteredChartObj);
    };

    window.addEventListener("searchDestination", handleSearch);
    return () => window.removeEventListener("searchDestination", handleSearch);
  }, [statsData, chartData]);

  // ✅ FIX: Update filteredStats whenever statsData or chartData changes
  useEffect(() => {
    setFilteredStats(statsData);
    setFilteredCharts(chartData);
  }, [statsData, chartData]);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"
      }`}
    >
      <main className="flex-1 px-10 py-3 space-y-10">
        {/* Header */}
        <section>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Overview</h2>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Key metrics and recent trends
              </p>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-white 
                ${
                  isRefreshing
                    ? "bg-sky-400 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-sky-600"
                }`}
            >
              <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
              {isRefreshing ? "Refreshing..." : "Refresh Stats"}
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              title="Total Visitors"
              value={filteredStats.totalVisitors?.toLocaleString?.() || "0"}
              icon={<Users className="text-sky-500" />}
              theme={theme}
              key={`visitors-${filteredStats.totalVisitors}`}
            />
            <Card
              title="Top Destination"
              value={filteredStats.topDestination || "—"}
              icon={<MapPin className="text-sky-500" />}
              theme={theme}
              key={`destination-${filteredStats.topDestination}`}
            />
            <Card
              title="Revenue"
              value={`$${filteredStats.revenue?.toLocaleString?.() || "0"}`}
              icon={<BarChart2 className="text-sky-500" />}
              theme={theme}
              key={`revenue-${filteredStats.revenue}`}
            />
            <Card
              title="Active Regions"
              value={filteredStats.activeRegions?.toString?.() || "0"}
              icon={<Globe className="text-sky-500" />}
              theme={theme}
              key={`regions-${filteredStats.activeRegions}`}
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <motion.div
            className={`lg:col-span-2 rounded-2xl p-8 transition-colors duration-300 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Visitor Growth
            </h3>
            <MyLineChart data={filteredCharts.line || chartData.line} />
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Bar Chart */}
            <motion.div
              className={`rounded-2xl p-8 transition-colors duration-300 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Revenue Overview
              </h3>
              <MyBarChart data={filteredCharts.bar || chartData.bar} />
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              className={`rounded-2xl p-6 transition-colors duration-300 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Tourism Categories
              </h3>
              <MyPieChart data={filteredCharts.pie || chartData.pie} />
            </motion.div>
          </div>
        </section>

        {/* Tourist Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-2xl p-6 transition-colors duration-300`}
        >
          <TouristStats />
          <TourismInsights />
        </motion.section>
      </main>
    </div>
  );
}

// Card Component
function Card({ title, value, icon, theme }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

  return (
    <motion.div
      className={`rounded-2xl p-6 flex items-center justify-between transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div>
        <p className={`text-sm mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          {title}
        </p>
        <h4 className="text-2xl font-semibold">
          {isNaN(numericValue) ? (
            value
          ) : (
            <>
              {value.includes("$") && "$"}
              <CountUp end={numericValue} duration={2.5} separator="," />
            </>
          )}
        </h4>
      </div>
      {icon}
    </motion.div>
  );
}