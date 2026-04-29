import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import toast from "react-hot-toast";

export default function CharacterCard({ character }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(character.id);

  function toggleFavorite() {
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
    <article className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden text-left">
      <Link to={`/character/${character.id}`} className="block">
        <img
          src={character.image}
          alt={`Foto de ${character.name}`}
          className="w-full aspect-square object-cover"
          loading="lazy"
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
            aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {fav ? "♥" : "♡"}
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-300">
          <span className="font-medium text-slate-200">Status:</span>{" "}
          {character.status} •{" "}
          <span className="font-medium text-slate-200">Especie:</span>{" "}
          {character.species}
        </p>

        <Link
          to={`/character/${character.id}`}
          className="inline-block mt-3 text-sm text-violet-300 hover:underline"
          aria-label={`Ver detalle de ${character.name}`}
        >
          Ver detalle →
        </Link>
      </div>
    </article>
  );
}