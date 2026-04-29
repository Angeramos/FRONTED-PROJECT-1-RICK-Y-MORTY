import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="py-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        Rick & Morty Explorer
      </h1>
      <p className="mt-3 text-slate-300 max-w-2xl">
        Landing page del proyecto. Usa el menú para explorar personajes, ver detalles,
        guardar favoritos y contactar.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          to="/explore"
          className="px-4 py-2 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-500"
        >
          Ir a explorar
        </Link>
        <Link
          to="/favorites"
          className="px-4 py-2 rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700"
        >
          Ver favoritos
        </Link>
      </div>
    </section>
  );
}