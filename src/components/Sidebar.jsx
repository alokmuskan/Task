import { Users, BarChart2, MapPin, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between h-screen sticky top-0">
      <div>
        <h1 className="text-2xl font-bold text-sky-600 mb-1">TourismDash</h1>
        <p className="text-sm text-gray-500 mb-8">Analytics & insights</p>

        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left p-3 rounded-xl transition ${
                isActive
                  ? "bg-sky-100 text-sky-600 font-semibold"
                  : "hover:bg-sky-50 hover:text-sky-600 text-gray-700"
              }`
            }
          >
            <Users size={18} /> Dashboard
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left p-3 rounded-xl transition ${
                isActive
                  ? "bg-sky-100 text-sky-600 font-semibold"
                  : "hover:bg-sky-50 hover:text-sky-600 text-gray-700"
              }`
            }
          >
            <BarChart2 size={18} /> Analytics
          </NavLink>

          <NavLink
            to="/destinations"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left p-3 rounded-xl transition ${
                isActive
                  ? "bg-sky-100 text-sky-600 font-semibold"
                  : "hover:bg-sky-50 hover:text-sky-600 text-gray-700"
              }`
            }
          >
            <MapPin size={18} /> Destinations
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left p-3 rounded-xl transition ${
                isActive
                  ? "bg-sky-100 text-sky-600 font-semibold"
                  : "hover:bg-sky-50 hover:text-sky-600 text-gray-700"
              }`
            }
          >
            <Globe size={18} /> Settings
          </NavLink>
        </nav>
      </div>

      <div className="text-sm text-gray-400 text-center">
        © 2025 TourismDash
      </div>
    </aside>
  );
}
