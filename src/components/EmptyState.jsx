export default function EmptyState({ message = "No results found." }) {
  return (
    <div className="py-10 text-center">
      <p className="text-slate-300">{message}</p>
    </div>
  );
}