import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    // dark:bg-gray-950 transition-colors duration-300
    <div className="min-h-screen flex bg-gray-50"> 
      {/* Sidebar */}
        <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Dashboard />
          </div>
        </main>
      </div>
    </div>
  );
}
