export default function Topbar() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Tourism Analytics Dashboard</h1>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Add Data
        </button>
        <button className="px-4 py-2 border rounded-md">Logout</button>
      </div>
    </header>
  );
}
