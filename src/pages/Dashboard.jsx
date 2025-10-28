import { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Users, MapPin, BarChart2, Globe, RefreshCw } from "lucide-react";

import MyLineChart from "../components/Charts/LineChart";
import MyBarChart from "../components/Charts/BarChart";
import MyPieChart from "../components/Charts/PieChart";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <main className="flex-1 px-10 py-3 space-y-10 bg-gray-50">
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
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all"
            >
              <RefreshCw size={18} />
              Refresh Stats
            </button>
          </div>

          {/* Cards */}
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

        {/*  Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <motion.div
            className="lg:col-span-2 bg-[#0f172a] rounded-2xl shadow-sm p-8 text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 8px 25px rgba(14,165,233,0.3)",
            }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Visitor Growth</h3>
            <MyLineChart key={refreshKey} refreshKey={refreshKey} />
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Bar Chart */}
            <motion.div
              className="bg-[#0f172a] rounded-2xl shadow-sm p-8 text-white"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 8px 25px rgba(14,165,233,0.3)",
              }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">Revenue Overview</h3>
              <MyBarChart key={refreshKey} refreshKey={refreshKey} />
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              className="bg-[#0f172a] rounded-2xl shadow-sm p-6 text-white"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 8px 25px rgba(14,165,233,0.3)",
              }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">Tourism Categories</h3>
              <MyPieChart key={refreshKey} refreshKey={refreshKey} />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Card Component
function Card({ title, value, icon }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 flex items-center justify-between cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
