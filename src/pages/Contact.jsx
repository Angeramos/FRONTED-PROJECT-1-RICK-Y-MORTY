import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import ContactConfirmDialog from "../components/ContactConfirmDialog.jsx";

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Contact() {
  const dialogRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const errors = useMemo(() => {
    const e = { name: "", email: "", message: "" };

    if (name.trim().length < 2) e.name = "El nombre debe tener al menos 2 caracteres.";
    if (!isEmail(email.trim())) e.email = "Email inválido.";
    if (message.trim().length < 10) e.message = "El mensaje debe tener al menos 10 caracteres.";

    return e;
  }, [name, email, message]);

  const isValid = !errors.name && !errors.email && !errors.message;

  function onSubmit(e) {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });

    if (!isValid) {
      toast.error("Revisa los campos del formulario");
      return;
    }

    // Simulación (no hay backend). Aquí iría un POST real.
    toast.success("Formulario válido. Enviando...");

    setTimeout(() => {
      toast.success("Mensaje enviado");
      dialogRef.current?.open();

      // reset
      setName("");
      setEmail("");
      setMessage("");
      setTouched({ name: false, email: false, message: false });
    }, 600);
  }

  return (
    <section className="max-w-2xl">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-2 text-slate-300">
        Formulario controlado con validación, toast y confirmación con &lt;dialog&gt;.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm text-slate-300">
            Nombre
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            className="mt-1 w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-violet-600"
            placeholder="Tu nombre"
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-300">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-slate-300">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            className="mt-1 w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-violet-600"
            placeholder="tu@email.com"
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-300">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-slate-300">
            Mensaje
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            rows={5}
            className="mt-1 w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-violet-600"
            placeholder="Escribe tu mensaje..."
          />
          {touched.message && errors.message && (
            <p className="mt-1 text-sm text-red-300">{errors.message}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!isValid}
            className="px-4 py-2 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>

          <button
            type="button"
            onClick={() => {
              setName("");
              setEmail("");
              setMessage("");
              setTouched({ name: false, email: false, message: false });
              toast("Formulario limpiado");
            }}
            className="px-4 py-2 rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700"
          >
            Limpiar
          </button>
        </div>
      </form>

      <ContactConfirmDialog
        ref={dialogRef}
        title="¡Gracias!"
        message="Tu mensaje fue recibido (simulado). Te responderemos pronto."
      />
    </section>
  );
}