import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="py-10">
      <h1 className="text-4xl font-extrabold">404</h1>
      <p className="mt-2 text-slate-300">Página no encontrada.</p>
      <Link className="inline-block mt-6 text-violet-400 hover:underline" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}