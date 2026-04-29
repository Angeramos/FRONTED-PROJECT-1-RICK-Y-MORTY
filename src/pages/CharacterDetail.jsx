import { useParams } from "react-router-dom";

export default function CharacterDetail() {
  const { id } = useParams();

  return (
    <section>
      <h1 className="text-3xl font-bold">Character Detail</h1>
      <p className="mt-2 text-slate-300">ID en la URL: {id}</p>
    </section>
  );
}