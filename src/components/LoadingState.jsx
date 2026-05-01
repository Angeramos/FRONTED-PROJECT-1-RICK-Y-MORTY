export default function LoadingState({ label = "Loading..." }) {
  return (
    <div className="py-10 grid place-items-center text-center" role="status" aria-live="polite">
      <img
        src="/img/morty-running.gif"
        alt="Morty running"
        className="w-36 h-36 object-contain"
      />
      <p className="mt-3 text-slate-300">{label}</p>
    </div>
  );
}