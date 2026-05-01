import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { fetchCharacterById } from "../services/rickAndMortyApi.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";

export default function CharacterDetail() {
  const { id } = useParams();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(id);

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let active = true;

    async function run() {
      setLoading(true);
      setErrorMsg("");
      setCharacter(null);

      try {
        const data = await fetchCharacterById(id);
        if (!active) return;
        setCharacter(data);
      } catch (err) {
        if (!active) return;
        setErrorMsg(err?.message || "Error cargando el personaje");
        toast.error("Error cargando el personaje");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      active = false;
    };
  }, [id]);

  function toggleFavorite() {
    if (!character) return;

    if (fav) {
      removeFavorite(character.id);
      toast.success("Quitado de favoritos");
    } else {
      addFavorite({
        id: character.id,
        name: character.name,
        image: character.image,
        status: character.status,
        species: character.species,
      });
      toast.success("Agregado a favoritos");
    }
  }

  return (
    <section aria-labelledby="character-title">
      <div className="flex items-center justify-between gap-3">
        <Link to="/explore" className="text-violet-300 hover:underline">
          ← Volver a explorar
        </Link>

        <Link to="/favorites" className="text-slate-300 hover:underline">
          Ver favoritos
        </Link>
      </div>

      {loading && <LoadingState label="Cargando detalle..." />}
      {!loading && errorMsg && <ErrorState message={errorMsg} />}

      {!loading && !errorMsg && character && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
          <img
            src={character.image}
            alt={`Foto de ${character.name}`}
            className="w-full max-w-[320px] md:max-w-none rounded-xl border border-slate-800"
          />

          <div>
            <h1 id="character-title" className="text-3xl font-bold">
              {character.name}
            </h1>

            <p className="mt-2 text-slate-300">
              <span className="font-medium text-slate-200">Status:</span>{" "}
              {character.status} •{" "}
              <span className="font-medium text-slate-200">Especie:</span>{" "}
              {character.species}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={toggleFavorite}
                className={`px-4 py-2 rounded-md font-medium border transition ${
                  fav
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "bg-slate-950 border-slate-700 text-slate-100 hover:bg-slate-900"
                }`}
                aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                {fav ? "♥ En favoritos" : "♡ Agregar a favoritos"}
              </button>

              <a
                href={character.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700"
                aria-label="Abrir el recurso del personaje en la API (nueva pestaña)"
              >
                Ver en API
              </a>
            </div>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <dt className="text-sm text-slate-400">Género</dt>
                <dd className="mt-1 font-semibold">{character.gender}</dd>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <dt className="text-sm text-slate-400">Origen</dt>
                <dd className="mt-1 font-semibold">{character.origin?.name}</dd>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <dt className="text-sm text-slate-400">Ubicación</dt>
                <dd className="mt-1 font-semibold">{character.location?.name}</dd>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <dt className="text-sm text-slate-400">Episodios</dt>
                <dd className="mt-1 font-semibold">{character.episode?.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}