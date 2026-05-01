import { useEffect, useMemo, useState } from "react";
import { fetchCharacters } from "../services/rickAndMortyApi.js";
import CharacterCard from "../components/CharacterCard.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import toast from "react-hot-toast";

export default function Explore() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function run() {
      setLoading(true);
      setErrorMsg("");

      try {
        const data = await fetchCharacters();
        if (!active) return;

        setCharacters(data.results || []);
        toast.success("Characters loaded");
      } catch (err) {
        if (!active) return;

        const offline = navigator.onLine === false;
        const msg = offline
          ? "No internet connection. Check your network and try again."
          : err?.message || "Error loading characters";

        setErrorMsg(msg);
        toast.error(offline ? "No connection" : "Error loading characters");
      } finally {
        if (!active) return;
        const MIN_LOADING_MS = 500;

const start = performance.now();
setLoading(true);

try {
  // ...tu fetch
} finally {
  const elapsed = performance.now() - start;
  const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
  setTimeout(() => setLoading(false), remaining);
};
      }
    }

    run();
    return () => {
      active = false;
    };
  }, [retryKey]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return characters.filter((c) => {
      const matchesQuery = q ? c.name.toLowerCase().includes(q) : true;
      const matchesStatus = status === "all" ? true : c.status.toLowerCase() === status;
      return matchesQuery && matchesStatus;
    });
  }, [characters, query, status]);

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="mt-2 text-slate-300">Real-time search and filtering.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div>
            <label htmlFor="search" className="block text-sm text-slate-300">
              Search by name
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Rick"
              className="mt-1 w-full sm:w-64 px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm text-slate-300">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full sm:w-44 px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="all">All</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <LoadingState label="Loading characters..." />}

      {!loading && errorMsg && (
        <div className="mt-6">
          <ErrorState message={errorMsg} />
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="px-4 py-2 rounded-md font-medium border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!loading && !errorMsg && filtered.length === 0 && (
        <EmptyState message="No results match those filters." />
      )}

      {!loading && !errorMsg && filtered.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((c) => (
            <CharacterCard key={c.id} character={c} />
          ))}
        </div>
      )}
    </section>
  );
}