import { Search, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">
      {/* Search Bar */}
      <div className="flex items-center w-1/3 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-sky-400">
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search destinations, metrics..."
          className="bg-transparent w-full outline-none text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Export / Refresh Buttons */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition">
          Export
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition">
          Refresh
        </button>
      </div>

      {/* Notifications + Profile */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-gray-600" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-semibold">
            A
          </div>
          <span className="hidden sm:inline text-sm font-medium">Admin</span>
          <User size={18} className="text-gray-500 hidden sm:inline" />
        </div>
      </div>
    </header>
  );
}
