export default function Card({ title, value, subtitle, right }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {right && <div className="ml-4">{right}</div>}
    </div>
  );
}
