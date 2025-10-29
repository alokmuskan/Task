// src/components/Charts/LineChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function MyLineChart({ data }) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" domain={[0, "dataMax + 50"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ r: 3 }}
            isAnimationActive={true}
            animationDuration={700}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
