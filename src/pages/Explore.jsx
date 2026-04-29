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

  useEffect(() => {
    let active = true;

    async function run() {
      setLoading(true);
      setErrorMsg("");

      try {
        const data = await fetchCharacters(); // { info, results }
        if (!active) return;
        setCharacters(data.results || []);
        toast.success("Personajes cargados");
      } catch (err) {
        if (!active) return;
        setErrorMsg(err?.message || "Error cargando personajes");
        toast.error("Error cargando personajes");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      active = false;
    };
  }, []);

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
          <p className="mt-2 text-slate-300">
            Búsqueda y filtro en tiempo real.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div>
            <label htmlFor="search" className="block text-sm text-slate-300">
              Buscar por nombre
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Rick"
              className="mt-1 w-full sm:w-64 px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm text-slate-300">
              Estado
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full sm:w-44 px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="all">Todos</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <LoadingState label="Cargando personajes..." />}
      {!loading && errorMsg && <ErrorState message={errorMsg} />}
      {!loading && !errorMsg && filtered.length === 0 && (
        <EmptyState message="No hay resultados con esos filtros." />
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