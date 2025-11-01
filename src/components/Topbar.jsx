import { useState } from "react";
import { Search, Bell, User, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Topbar() {
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // 🔍 Emit a custom event when user presses Enter
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      window.dispatchEvent(new CustomEvent("searchDestination", { detail: query }));
    }
  };

  return (
    <header
      className={`flex items-center justify-between border-b px-6 py-4 sticky top-0 z-50 shadow-sm transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
    >
      {/* Search Bar */}
      <div
        className={`flex items-center w-1/3 rounded-xl px-3 py-2 border focus-within:ring-2 transition-all duration-200
          ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200 focus-within:ring-sky-600"
              : "bg-gray-50 border-gray-300 text-gray-700 focus-within:ring-sky-400"
          }`}
      >
        <Search
          size={18}
          className={`mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        />
        <input
          type="text"
          placeholder="Search destinations..."
          value={query}
          onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          window.dispatchEvent(new CustomEvent("searchDestination", { detail: value }));    
          }}
          onKeyDown={handleSearchKeyDown}
          className={`bg-transparent w-full outline-none placeholder:text-gray-400 ${
            theme === "dark" ? "text-gray-100" : "text-gray-700"
          }`}
        />
      </div>

      {/* Buttons (unchanged) */}
      <div className="flex gap-3">
        <button
          className={`px-4 py-2 rounded-xl transition
            ${
              theme === "dark"
                ? "bg-sky-700 hover:bg-sky-600 text-white"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
        >
          Export
        </button>
        <button
          className={`px-4 py-2 rounded-xl transition
            ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Refresh
        </button>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className={`p-2 rounded-md transition ${
            theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Notifications + Profile (unchanged) */}
      <div className="flex items-center gap-4">
        <button
          className={`p-2 rounded-md transition ${
            theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
          aria-label="Notifications"
        >
          <Bell
            size={18}
            className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          />
        </button>

        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold 
              ${
                theme === "dark"
                  ? "bg-sky-700 text-white"
                  : "bg-sky-600 text-white"
              }`}
          >
            A
          </div>
          <span
            className={`hidden sm:inline text-sm font-medium ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Admin
          </span>
          <User
            size={18}
            className={`hidden sm:inline ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          />
        </div>
      </div>
    </header>
  );
}
