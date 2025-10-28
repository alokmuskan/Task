import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Card from "../components/Card";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Visitors" value="10,230" />
          <Card title="Bookings" value="523" />
          <Card title="Revenue" value="$12,400" />
        </main>
      </div>
    </div>
  );
}
