export default function LoadingState({ label = "Cargando..." }) {
  return (
    <div className="py-10 text-center" role="status" aria-live="polite">
      <p className="text-slate-300">{label}</p>
    </div>
  );
}