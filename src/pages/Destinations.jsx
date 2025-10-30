import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Users } from "lucide-react";
import api from "../lib/api";
import { useTheme } from "../context/ThemeContext";

export default function Destinations() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data } = await api.get("/api/destinations");
        console.log("Fetched data:", data);
        // backend returns { destinations: [...] } — fallback to [] if not present
        setDestinations(data.destinations || []);
      } catch (err) {
        console.error("Error loading destinations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className={`min-h-screen p-10 transition-colors duration-300 ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100" : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"}`}>
      <h2 className="text-2xl font-semibold mb-6">Top Tourist Destinations</h2>

      {loading ? (
        <p className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Loading destinations...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <motion.div
              key={d.id}
              className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={`${isDark ? "text-gray-100" : "text-gray-900"} text-lg font-semibold`}>{d.name}</h3>
                <MapPin className={`${isDark ? "text-sky-400" : "text-sky-500"}`} size={20} />
              </div>

              <p className={`${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>{d.country}</p>

              <div className="flex items-center justify-between">
                <div className={`${isDark ? "text-yellow-400" : "text-yellow-500"} flex items-center gap-1`}>
                  <Star size={18} />
                  <span>{d.rating}</span>
                </div>
                <div className={`${isDark ? "text-sky-400" : "text-sky-500"} flex items-center gap-1`}>
                  <Users size={18} />
                  <span>{d.visitors.toLocaleString()} visitors</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
