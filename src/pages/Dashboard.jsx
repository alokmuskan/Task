import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { Users, MapPin, BarChart2, Globe } from "lucide-react";

export default function Dashboard() {
   const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Main content */}
      <main className="flex-1 px-10 py-3 space-y-10 bg-gray-50">
        {/* Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-1">Overview</h2>
          <p className="text-gray-500 mb-10">Key metrics and recent trends</p>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              title="Total Visitors"
              value="24,320"
              icon={<Users className="text-sky-500" />}
            />
            <Card
              title="Top Destination"
              value="Bali"
              icon={<MapPin className="text-sky-500" />}
            />
            <Card
              title="Revenue"
              value="$52,430"
              icon={<BarChart2 className="text-sky-500" />}
            />
            <Card
              title="Active Regions"
              value="18"
              icon={<Globe className="text-sky-500" />}
            />
          </div>
        </section>

        {/* Charts section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-lg font-semibold mb-4">Visitor Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { name: "Jan", value: 120 },
                  { name: "Feb", value: 200 },
                  { name: "Mar", value: 180 },
                  { name: "Apr", value: 260 },
                  { name: "May", value: 310 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    { name: "Beach", value: 400 },
                    { name: "Mountain", value: 300 },
                    { name: "City", value: 200 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#0ea5e9"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tourism Categories
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Adventure", value: 30 },
                      { name: "Luxury", value: 20 },
                      { name: "Culture", value: 25 },
                      { name: "Nature", value: 25 },
                    ]}
                    dataKey="value"
                    outerRadius={70}
                  >
                    <Cell fill="#0ea5e9" />
                    <Cell fill="#38bdf8" />
                    <Cell fill="#7dd3fc" />
                    <Cell fill="#bae6fd" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Card component
function Card({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h4 className="text-2xl font-semibold">{value}</h4>
      </div>
      {icon}
    </div>
  );
}
