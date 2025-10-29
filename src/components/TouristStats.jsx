import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const initialData = [
  { name: "Bali", visitors: 4200 },
  { name: "Paris", visitors: 3600 },
  { name: "Tokyo", visitors: 3100 },
  { name: "Dubai", visitors: 2800 },
  { name: "New York", visitors: 2500 },
];

export default function TouristStats() {
  const [data, setData] = useState(initialData);

  // Generate random new data for animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = initialData.map((item) => ({
        ...item,
        visitors: Math.floor(Math.random() * 5000) + 1500,
      }));
      setData(newData);
    }, 5000); // update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0f172a] text-white rounded-2xl p-6 shadow-md mt-8">
      <h2 className="text-lg font-semibold mb-4">Tourist Insights</h2>
      <p className="text-sm text-gray-400 mb-6">Most visited destinations</p>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="visitors" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
