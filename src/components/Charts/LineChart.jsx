import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { date: "Jan", value: 120 },
  { date: "Feb", value: 200 },
  { date: "Mar", value: 180 },
  { date: "Apr", value: 240 },
  { date: "May", value: 300 },
];

export default function MyLineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
