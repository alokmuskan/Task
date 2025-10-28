import { Search, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white border-b px-4 py-3">
      <div className="flex items-center gap-4">
        {/* small search */}
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1">
          <Search size={16} className="text-gray-500" />
          <input
            className="bg-transparent outline-none text-sm text-gray-700 w-56"
            placeholder="Search destinations, metrics..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Notifications">
          <Bell size={18} className="text-gray-600" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-semibold">
            A
          </div>
          <span className="hidden sm:inline text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
