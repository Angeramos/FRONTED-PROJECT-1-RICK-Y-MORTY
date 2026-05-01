import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import toast from "react-hot-toast";

export default function CharacterCard({ character }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(character.id);

  // 1) IMAGEN MANUAL POR ID (Antenna Rick suele ser id 20)
  const manualImagesById = {
    19: "/img/Antenna_Rick.webp.png",
  };

  // 2) FALLBACK SI NO HAY IMAGEN O FALLA
  const fallbackSrc = "/img/no-image.png";
  const imgSrc = manualImagesById[character.id] || character.image || fallbackSrc;

  function toggleFavorite() {
    if (fav) {
      removeFavorite(character.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite({
        id: character.id,
        name: character.name,
        // guarda la imagen que realmente se está usando (la manual si aplica)
        image: imgSrc,
        status: character.status,
        species: character.species,
      });
      toast.success("Added to favorites");
    }
  }

  return (
    <article className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden text-left">
      <Link to={`/character/${character.id}`} className="block">
        <img
          src={imgSrc}
          alt={`Foto de ${character.name}`}
          className="w-full aspect-square object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null; // evita loop si el fallback falla
            e.currentTarget.src = fallbackSrc;
          }}
        />
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight">{character.name}</h3>

          <button
            type="button"
            onClick={toggleFavorite}
            className={`shrink-0 px-3 py-1 rounded-md text-xs font-medium border transition ${
              fav
                ? "bg-violet-600 border-violet-500 text-white"
                : "bg-slate-950 border-slate-700 text-slate-100 hover:bg-slate-900"
            }`}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          >
            {fav ? "♥" : "♡"}
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-300">
          <span className="font-medium text-slate-200">Status:</span>{" "}
          {character.status} •{" "}
          <span className="font-medium text-slate-200">Species:</span>{" "}
          {character.species}
        </p>

        <Link
          to={`/character/${character.id}`}
          className="inline-block mt-3 text-sm text-violet-300 hover:underline"
          aria-label={`View details for ${character.name}`}
        >
          View details →
        </Link>
      </div>
    </article>
  );
}