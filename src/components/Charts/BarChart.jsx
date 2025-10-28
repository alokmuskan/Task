import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { RefreshCw } from "lucide-react";

const initialData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
];

export default function MyBarChart() {
  const [data, setData] = useState(initialData);

  const refreshData = () => {
    const newData = initialData.map(item => ({
      ...item,
      revenue: Math.floor(Math.random() * 7000) + 2000,
    }));
    setData(newData);
  };

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="revenue" fill="#06b6d4" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
