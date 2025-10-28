export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <nav className="space-y-2">
        <a href="#" className="block text-gray-700 hover:text-blue-600">
          Overview
        </a>
        <a href="#" className="block text-gray-700 hover:text-blue-600">
          Analytics
        </a>
        <a href="#" className="block text-gray-700 hover:text-blue-600">
          Reports
        </a>
      </nav>
    </aside>
  );
}
