/* Card for school listing */
export default function SchoolCard({ school }) {
  return (
    <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={school.image || '/schoolImages/placeholder.jpg'}
          alt={school.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{school.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {school.address}
        </p>
        <div className="mt-2 text-sm">
          <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
            {school.city}, {school.state}
          </span>
        </div>
      </div>
    </div>
  );
}
