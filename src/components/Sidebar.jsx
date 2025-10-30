import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart2, MapPin, Settings } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const { theme } = useTheme();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all duration-200
     ${
       isActive
         ? "bg-sky-700 text-white font-semibold shadow-sm" // Active link color matches Topbar
         : "text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-800"
     }`;

  return (
    <aside
      className={`w-64 p-6 flex flex-col justify-between h-screen sticky top-0 shadow-md transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100 shadow-gray-800"
            : "bg-white text-gray-800"
        }`}
    >
      <div>
        {/* Brand */}
        <h1 className="text-2xl font-bold text-sky-600 mb-1">TourismDash</h1>
        <p
          className={`text-sm mb-8 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Analytics & insights
        </p>

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
      <div
        className={`text-sm text-center ${
          theme === "dark" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        © 2025 TourismDash
      </div>
    </aside>
  );
}
