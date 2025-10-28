export default function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  );
}
