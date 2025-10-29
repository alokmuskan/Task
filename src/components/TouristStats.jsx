import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { RefreshCw, Globe2, Users, MapPin, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = {
  2023: {
    Asia: { visitors: 3200000, topCountry: "India", revenue: 8.5, growth: 7.2 },
    Europe: { visitors: 2700000, topCountry: "France", revenue: 9.1, growth: 6.3 },
    America: { visitors: 2300000, topCountry: "USA", revenue: 7.4, growth: 5.8 },
  },
  2024: {
    Asia: { visitors: 3600000, topCountry: "Japan", revenue: 9.3, growth: 8.1 },
    Europe: { visitors: 2900000, topCountry: "Italy", revenue: 10.0, growth: 7.0 },
    America: { visitors: 2500000, topCountry: "Mexico", revenue: 8.2, growth: 6.1 },
  },
  2025: {
    Asia: { visitors: 4000000, topCountry: "Thailand", revenue: 10.2, growth: 9.0 },
    Europe: { visitors: 3100000, topCountry: "Spain", revenue: 10.8, growth: 7.5 },
    America: { visitors: 2700000, topCountry: "Brazil", revenue: 9.0, growth: 6.8 },
  },
};

export default function TouristStats() {
  const [year, setYear] = useState("2025");
  const [region, setRegion] = useState("Asia");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState(mockData[year][region]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const randomOffset = Math.random() * 0.2 + 0.9;
      const newStats = {
        visitors: Math.floor(stats.visitors * randomOffset),
        topCountry: stats.topCountry,
        revenue: parseFloat((stats.revenue * randomOffset).toFixed(1)),
        growth: parseFloat((stats.growth * randomOffset).toFixed(1)),
      };
      setStats(newStats);
      setIsRefreshing(false);
    }, 1500);
  };

  const handleFilterChange = (newYear, newRegion) => {
    const selectedYear = newYear || year;
    const selectedRegion = newRegion || region;
    setYear(selectedYear);
    setRegion(selectedRegion);
    setStats(mockData[selectedYear][selectedRegion]);
  };

  return (
    <section className="bg-white rounded-2xl p-8 shadow-md mt-12">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          🌍 Tourist Statistics Overview
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Year Filter */}
          <select
            value={year}
            onChange={(e) => handleFilterChange(e.target.value, null)}
            className="border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-sky-500"
          >
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>

          {/* Region Filter */}
          <select
            value={region}
            onChange={(e) => handleFilterChange(null, e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-sky-500"
          >
            <option>Asia</option>
            <option>Europe</option>
            <option>America</option>
          </select>

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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Visitors"
          value={stats.visitors}
          icon={<Users className="text-sky-500" />}
          suffix=""
        />
        <StatCard
          title="Top Country"
          value={stats.topCountry}
          icon={<MapPin className="text-sky-500" />}
        />
        <StatCard
          title="Revenue (Billion $)"
          value={stats.revenue}
          icon={<BarChart2 className="text-sky-500" />}
        />
        <StatCard
          title="Growth Rate (%)"
          value={stats.growth}
          icon={<TrendingUp className="text-sky-500" />}
          suffix="%"
        />
      </div>
    </section>
  );
}

function StatCard({ title, value, icon, suffix = "" }) {
  const isNumeric = typeof value === "number";

  return (
    <motion.div
      className="bg-gray-50 rounded-2xl shadow-sm p-6 flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
    >
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h4 className="text-2xl font-semibold text-gray-800">
          {isNumeric ? (
            <CountUp end={value} duration={2} separator="," suffix={suffix} />
          ) : (
            value
          )}
        </h4>
      </div>
      {icon}
    </motion.div>
  );
}
