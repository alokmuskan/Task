import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const initialData = [
  { name: "Bali", visitors: 4200 },
  { name: "Paris", visitors: 3600 },
  { name: "Tokyo", visitors: 3100 },
  { name: "Dubai", visitors: 2800 },
  { name: "New York", visitors: 2500 },
];

export default function TouristStats() {
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    const newData = initialData.map((item) => ({
      ...item,
      visitors: Math.floor(Math.random() * 5000) + 1500,
    }));
    setTimeout(() => {
      setData(newData);
      setIsRefreshing(false);
    }, 1000);
  };

  // ⏱️ (Commented Out) Automatic refresh every 5 seconds
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  */

  return (
    <motion.div
      className="bg-[#0f172a] text-white rounded-2xl p-6 shadow-md mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 8px 25px rgba(14,165,233,0.3)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Tourist Insights</h2>
          <p className="text-sm text-gray-400">Most visited destinations</p>
        </div>

        {/* 🔁 Refresh Button */}
        <button
          onClick={refreshData}
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

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <XAxis dataKey="name" stroke="#94a3b8" />
            <Tooltip />
            <Bar
              dataKey="visitors"
              fill="#0ea5e9"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
