import { useState } from "react";
import SchoolCard from "@/components/SchoolCard";
import schoolsData from "@/data/schools";

export default function ShowSchools() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Filtered schools
  const filteredSchools = schoolsData.filter((s) => {
    return (
      (!q || s.name.toLowerCase().includes(q.toLowerCase()) || s.address.toLowerCase().includes(q.toLowerCase())) &&
      (!city || s.city === city) &&
      (!state || s.state === state)
    );
  });

  // Unique filter options
  const uniqueCities = Array.from(new Set(schoolsData.map((s) => s.city))).sort();
  const uniqueStates = Array.from(new Set(schoolsData.map((s) => s.state))).sort();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find Schools</h1>

      {/* Search + Filters */}
      <div className="grid md:grid-cols-4 gap-4 bg-white dark:bg-gray-950 p-4 rounded-2xl border shadow-sm">
        <input
          type="text"
          placeholder="Search by name, address..."
          className="rounded-xl border p-2 bg-transparent col-span-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="rounded-xl border p-2 bg-transparent"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {uniqueCities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="rounded-xl border p-2 bg-transparent"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">All States</option>
          {uniqueStates.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filteredSchools.length === 0 ? (
        <p className="text-gray-500">No schools found. Try adjusting filters.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSchools.map((s) => (
            <SchoolCard key={s.id} school={s} />
          ))}
        </div>
      )}
    </div>
  );
}
