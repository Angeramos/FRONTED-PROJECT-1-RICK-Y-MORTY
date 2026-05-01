import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="py-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        Rick & Morty Explorer
      </h1>
      <p className="mt-3 text-slate-300 max-w-2xl">
        Project landing page. Use the menu to explore characters, view details,
        save favorites, and contact us.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          to="/explore"
          className="px-4 py-2 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-500"
        >
          Go explore
        </Link>
        <Link
          to="/favorites"
          className="px-4 py-2 rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700"
        >
          View favorites
        </Link>
      </div>
    </section>
  );
}