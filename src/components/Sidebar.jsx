import { Home, BarChart3, Globe2, Settings } from "lucide-react";

export default function Sidebar() {
  const nav = [
    { label: "Dashboard", icon: <Home size={18} /> },
    { label: "Analytics", icon: <BarChart3 size={18} /> },
    { label: "Destinations", icon: <Globe2 size={18} /> },
    { label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm hidden md:flex flex-col p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-sky-600">TourismDash</h1>
        <p className="text-xs text-gray-400 mt-1">Analytics & insights</p>
      </div>

      <nav className="flex-1 space-y-2">
        {nav.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-sky-50 rounded-md transition"
            aria-label={item.label}
          >
            <span className="text-sky-500">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto text-xs text-gray-400">
        © {new Date().getFullYear()} Tourism Dashboard
      </div>
    </aside>
  );
}
