import { useEffect, useState } from "react";
import SchoolCard from "@/components/SchoolCard";

// Main component for displaying and filtering schools
export default function ShowSchools() {
  // State to hold all schools fetched from API (master list)
  const [allSchools, setAllSchools] = useState([]);
  // State to hold currently filtered schools
  const [schools, setSchools] = useState([]);
  // State for search query input
  const [q, setQ] = useState("");
  // State for selected city filter
  const [city, setCity] = useState("");
  // State for selected state filter
  const [state, setState] = useState("");
  // State to show loading indicator while fetching data
  const [loading, setLoading] = useState(true);

  // Fetch all schools from API once when component mounts
  useEffect(() => {
    const load = async () => {
      setLoading(true); // Show loading indicator
      const res = await fetch("/api/schools"); // Fetch schools from API
      const json = await res.json(); // Parse response as JSON
      setAllSchools(json.schools || []); // Store schools in state
      setLoading(false); // Hide loading indicator
    };
    load();
  }, []);

  // Filter schools whenever search query, city, state, or master list changes
  useEffect(() => {
    let filtered = allSchools;

    // Filter by search query (name or address)
    if (q) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q.toLowerCase()) ||
          s.address.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Filter by selected city (if not "All Cities")
    if (city) {
      filtered = filtered.filter((s) => s.city === city);
    }

    // Filter by selected state (if not "All States")
    if (state) {
      filtered = filtered.filter((s) => s.state === state);
    }

    setSchools(filtered); // Update filtered schools list
  }, [q, city, state, allSchools]);

  // Extract unique cities from master list for city filter dropdown
  const uniqueCities = Array.from(new Set(allSchools.map((s) => s.city))).sort();
  // Extract unique states from master list for state filter dropdown
  const uniqueStates = Array.from(new Set(allSchools.map((s) => s.state))).sort();

  return (
    <div className="space-y-6">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Find Schools
      </h1>

      {/* Search and filter controls */}
      <div className="grid md:grid-cols-4 gap-4 bg-white dark:bg-gray-950 p-4 rounded-2xl border shadow-sm">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name, address..."
          className="rounded-xl border p-2 bg-transparent col-span-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {/* City filter dropdown */}
        <select
          className="rounded-xl border p-2 bg-transparent"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {uniqueCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {/* State filter dropdown */}
        <select
          className="rounded-xl border p-2 bg-transparent"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">All States</option>
          {uniqueStates.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Results section */}
      {loading ? (
        // Show loading message while fetching schools
        <p>Loading schools...</p>
      ) : schools.length === 0 ? (
        // Show message if no schools match filters
        <p className="text-gray-500">No schools found. Try adjusting filters.</p>
      ) : (
        // Display filtered schools in a grid
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schools.map((s) => (
            <SchoolCard key={s.id} school={s} />
          ))}
        </div>
      )}
    </div>
  );
}
