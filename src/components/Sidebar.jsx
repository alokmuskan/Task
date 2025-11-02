import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart2, MapPin, Settings, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all duration-200
     ${
       isActive
         ? theme === "dark"
           ? "bg-sky-700 text-white font-semibold shadow-sm"
           : "bg-sky-500 text-white font-semibold shadow-sm"
         : theme === "dark"
         ? "text-gray-300 hover:text-sky-400 hover:bg-gray-800"
         : "text-gray-800 hover:text-sky-600 hover:bg-sky-50"
     }`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 md:hidden z-[100] p-2 rounded-lg text-white shadow-md focus:outline-none transition-colors
          ${
            theme === "dark"
              ? "bg-sky-700 hover:bg-sky-600"
              : "bg-sky-500 hover:bg-sky-600"
          }`}
        style={{ marginLeft: '0.5rem' }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 p-6 flex flex-col justify-between shadow-md transition-all duration-300 z-40
          ${
            theme === "dark"
              ? "bg-gray-900 text-gray-100 shadow-gray-800"
              : "bg-white text-gray-800"
          }
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div>
          {/* Brand */}
          <h1 className={`text-2xl font-bold mb-1 ${
            theme === "dark" ? "text-sky-400" : "text-sky-500"
          }`}>TourismDash</h1>
          <p
            className={`text-sm mb-8 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Analytics & insights
          </p>

          {/* Navigation */}
          <nav className="space-y-2">
            <NavLink to="/" className={linkClasses} onClick={() => setIsOpen(false)}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>

            <NavLink to="/analytics" className={linkClasses} onClick={() => setIsOpen(false)}>
              <BarChart2 size={18} /> Analytics
            </NavLink>

            <NavLink to="/destinations" className={linkClasses} onClick={() => setIsOpen(false)}>
              <MapPin size={18} /> Destinations
            </NavLink>

            <NavLink to="/settings" className={linkClasses} onClick={() => setIsOpen(false)}>
              <Settings size={18} /> Settings
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <div
          className={`text-sm text-center ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}
        >
          © 2025 TourismDash
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}