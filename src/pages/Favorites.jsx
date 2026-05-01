import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useFavorites } from "../context/FavoritesContext.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";

export default function Favorites() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const dialogRef = useRef(null);

  const hasFavorites = favorites.length > 0;

  const sorted = useMemo(() => {
    // orden simple por nombre
    return [...favorites].sort((a, b) => a.name.localeCompare(b.name));
  }, [favorites]);

  function confirmRemoveOne(character) {
    dialogRef.current?.open({
      title: "Quitar de favoritos",
      message: `¿Seguro que quieres quitar a "${character.name}" de favoritos?`,
      confirmText: "Sí, quitar",
      cancelText: "No, dejarlo",
      danger: true,
      onConfirm: () => {
        removeFavorite(character.id);
        toast.success("Quitado de favoritos");
      },
    });
  }

  function confirmClearAll() {
    dialogRef.current?.open({
      title: "Borrar todos los favoritos",
      message: "Esta acción no se puede deshacer. ¿Deseas continuar?",
      confirmText: "Sí, borrar todo",
      cancelText: "Cancelar",
      danger: true,
      onConfirm: () => {
        clearFavorites();
        toast.success("Favoritos borrados");
      },
    });
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Favorites</h1>
          <p className="mt-2 text-slate-300">
            Tus personajes guardados (persisten en localStorage).
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/explore"
            className="px-4 py-2 rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700"
          >
            Explorar
          </Link>

          <button
            type="button"
            onClick={confirmClearAll}
            disabled={!hasFavorites}
            className="px-4 py-2 rounded-md bg-red-600/80 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Borrar todos
          </button>
        </div>
      </div>

      {!hasFavorites && (
        <EmptyState message="Aún no tienes favoritos. Ve a Explore y agrega algunos ♥" />
      )}

      {hasFavorites && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorted.map((c) => (
            <article
              key={c.id}
              className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden"
            >
              <Link to={`/character/${c.id}`} className="block">
                <img
                  src={c.image}
                  alt={`Foto de ${c.name}`}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </Link>

              <div className="p-4">
                <h3 className="font-semibold leading-tight">{c.name}</h3>
                <p className="mt-1 text-sm text-slate-300">
                  {c.status} • {c.species}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <Link
                    to={`/character/${c.id}`}
                    className="text-sm text-violet-300 hover:underline"
                  >
                    Ver detalle →
                  </Link>

                  <button
                    type="button"
                    onClick={() => confirmRemoveOne(c)}
                    className="px-3 py-1 rounded-md text-xs font-medium border border-slate-700 text-slate-100 hover:bg-slate-900"
                    aria-label={`Quitar ${c.name} de favoritos`}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <ConfirmDialog ref={dialogRef} />
    </section>
  );
}