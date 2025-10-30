import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Destinations from "./pages/Destinations";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
