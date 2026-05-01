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

  const [retryKey, setRetryKey] = useState(0);

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

        const offline = navigator.onLine === false;
        const msg = offline
          ? "No internet connection. Check your network and try again."
          : err?.message || "Error loading character";

        setErrorMsg(msg);
        toast.error(offline ? "No connection" : "Error loading character");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      active = false;
    };
  }, [id, retryKey]);

  // ✅ OVERRIDE DE IMAGEN + FALLBACK (Antenna Rick = 19)
  const manualImagesById = {
    19: "/img/Antenna_Rick.webp.png",
  };
  const fallbackSrc = "/img/no-image.png";
  const imgSrc = manualImagesById[Number(id)] || character?.image || fallbackSrc;

  function toggleFavorite() {
    if (!character) return;

    if (fav) {
      removeFavorite(character.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite({
        id: character.id,
        name: character.name,
        image: imgSrc,
        status: character.status,
        species: character.species,
      });
      toast.success("Added to favorites");
    }
  }

  return (
    <section aria-labelledby="character-title">
      <div className="flex items-center justify-between gap-3">
        <Link to="/explore" className="text-violet-300 hover:underline">
          ← Back to explore
        </Link>

        <Link to="/favorites" className="text-slate-300 hover:underline">
          View favorites
        </Link>
      </div>

      {loading && <LoadingState label="Loading character details..." />}

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

      {!loading && !errorMsg && character && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
          <img
            src={imgSrc}
            alt={`Photo of ${character.name}`}
            className="w-full max-w-[320px] md:max-w-none rounded-xl border border-slate-800"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackSrc;
            }}
          />

          <div>
            <h1 id="character-title" className="text-3xl font-bold">
              {character.name}
            </h1>

            <p className="mt-2 text-slate-300">
              <span className="font-medium text-slate-200">Status:</span>{" "}
              {character.status} •{" "}
              <span className="font-medium text-slate-200">Species:</span>{" "}
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
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
              >
                {fav ? "♥ In favorites" : "♡ Add to favorites"}
              </button>
            </div>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <dt className="text-sm text-slate-400">Gender</dt>
                <dd className="mt-1 font-semibold">{character.gender}</dd>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <dt className="text-sm text-slate-400">Origin</dt>
                <dd className="mt-1 font-semibold">{character.origin?.name}</dd>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <dt className="text-sm text-slate-400">Location</dt>
                <dd className="mt-1 font-semibold">{character.location?.name}</dd>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <dt className="text-sm text-slate-400">Episodes</dt>
                <dd className="mt-1 font-semibold">{character.episode?.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}