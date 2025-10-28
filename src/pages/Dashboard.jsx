import Card from "../components/Card";
import LineChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import { Users, MapPin, BarChart3, Globe2 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="text-sm text-gray-500">Key metrics and recent trends</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 bg-sky-600 text-white rounded-md text-sm">Export</button>
          <button className="px-3 py-2 border rounded-md text-sm">Refresh</button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Visitors" value="24,320" right={<Users size={28} className="text-sky-500" />} />
        <Card title="Top Destination" value="Bali" right={<MapPin size={28} className="text-sky-500" />} />
        <Card title="Revenue" value="$52,430" right={<BarChart3 size={28} className="text-sky-500" />} />
        <Card title="Active Regions" value="18" right={<Globe2 size={28} className="text-sky-500" />} />
      </div>

      {/* Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-lg mb-4">Visitor Growth</h3>
          <div className="h-64">
            <LineChart />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3">Revenue Overview</h3>
            <div className="h-40">
              <BarChart />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3">Tourism Categories</h3>
            <div className="h-40">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
