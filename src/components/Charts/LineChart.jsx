import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { date: "Jan", value: 120 },
  { date: "Feb", value: 200 },
  { date: "Mar", value: 180 },
  { date: "Apr", value: 260 },
  { date: "May", value: 300 },
  { date: "Jun", value: 350 },
  { date: "Jul", value: 420 },
  { date: "Aug", value: 460 },
  { date: "Sep", value: 500 },
  { date: "Oct", value: 550 },
  { date: "Nov", value: 600 },
  { date: "Dec", value: 650 },
];

export default function MyLineChart() {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="date" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" domain={[0, "dataMax + 50"]} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
