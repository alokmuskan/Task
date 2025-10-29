import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Users } from "lucide-react";
import api from "../lib/api";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchDestinations = async () => {
        try {
            const { data } = await api.get("/api/destinations");
            console.log("Fetched data:", data); // ✅ Add this to verify structure
            setDestinations(data.destinations || []); // ✅ Fixed
        } catch (err) {
            console.error("Error loading destinations:", err);
        } finally {
            setLoading(false);
        }
    };
        fetchDestinations();
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 p-10">
      <h2 className="text-2xl font-semibold mb-6">Top Tourist Destinations</h2>

      {loading ? (
        <p className="text-gray-500">Loading destinations...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <motion.div
              key={d.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{d.name}</h3>
                <MapPin className="text-sky-500" size={20} />
              </div>
              <p className="text-gray-500 mb-2">{d.country}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={18} />
                  <span>{d.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sky-500">
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
