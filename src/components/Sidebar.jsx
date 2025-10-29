import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart2, MapPin, Settings } from "lucide-react";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-sky-100 text-sky-600 font-semibold shadow-sm"
        : "hover:bg-sky-50 hover:text-sky-600 text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand */}
        <h1 className="text-2xl font-bold text-sky-600 mb-1">TourismDash</h1>
        <p className="text-sm text-gray-500 mb-8">Analytics & insights</p>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink to="/" className={linkClasses}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/analytics" className={linkClasses}>
            <BarChart2 size={18} /> Analytics
          </NavLink>

          <NavLink to="/destinations" className={linkClasses}>
            <MapPin size={18} /> Destinations
          </NavLink>

          <NavLink to="/settings" className={linkClasses}>
            <Settings size={18} /> Settings
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-400 text-center">
        © 2025 TourismDash
      </div>
    </aside>
  );
}
