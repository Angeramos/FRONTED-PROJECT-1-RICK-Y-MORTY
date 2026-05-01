export default function ErrorState({ message = "Something went wrong." }) {
  return (
    <div className="py-10 text-center" role="alert">
      <p className="text-red-300 font-medium">{message}</p>
    </div>
  );
}