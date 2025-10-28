import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { RefreshCw } from "lucide-react";

const initialData = [
  { name: "Beaches", value: 400 },
  { name: "Mountains", value: 300 },
  { name: "Historical Sites", value: 300 },
  { name: "Adventure Sports", value: 200 },
];

const COLORS = ["#06b6d4", "#0ea5e9", "#38bdf8", "#67e8f9"];

export default function MyPieChart() {
  const [data, setData] = useState(initialData);

  const refreshData = () => {
    const newData = initialData.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 500) + 100,
    }));
    setData(newData);
  };

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
