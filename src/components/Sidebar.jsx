import { Users, BarChart2, MapPin, Globe } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-sky-600 mb-1">TourismDash</h1>
        <p className="text-sm text-gray-500 mb-8">Analytics & insights</p>

        <nav className="space-y-2">
          <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition">
            <Users size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition">
            <BarChart2 size={18} /> Analytics
          </button>
          <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition">
            <MapPin size={18} /> Destinations
          </button>
          <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition">
            <Globe size={18} /> Settings
          </button>
        </nav>
      </div>

      <div className="text-sm text-gray-400 text-center">
        © 2025 TourismDash
      </div>
    </aside>
  );
}
