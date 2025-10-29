// src/components/Charts/BarChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MyBarChart({ data }) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar
            dataKey="revenue"
            fill="#06b6d4"
            radius={[8, 8, 0, 0]}
            isAnimationActive={true}
            animationDuration={700}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
