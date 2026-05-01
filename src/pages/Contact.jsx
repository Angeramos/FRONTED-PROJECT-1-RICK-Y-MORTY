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

    if (name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!isEmail(email.trim())) e.email = "Invalid email.";
    if (message.trim().length < 10) e.message = "Message must be at least 10 characters.";

    return e;
  }, [name, email, message]);

  const isValid = !errors.name && !errors.email && !errors.message;

  function onSubmit(e) {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });

    if (!isValid) {
      toast.error("Check the form fields");
      return;
    }

    // Simulation (there is no backend). A real POST would go here.
    toast.success("Form is valid. Sending...");

    setTimeout(() => {
      toast.success("Message sent");
      dialogRef.current?.open();

      // reset
      setName("");
      setEmail("");
      setMessage("");
      setTouched({ name: false, email: false, message: false });
    }, 600);
  }

  return (
    <section className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: form */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold">Contact</h1>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm text-slate-300">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                className="mt-1 w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="Your name"
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
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                rows={5}
                className="mt-1 w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="Write your message..."
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
                Send
              </button>

              <button
                type="button"
                onClick={() => {
                  setName("");
                  setEmail("");
                  setMessage("");
                  setTouched({ name: false, email: false, message: false });
                  toast("Form cleared");
                }}
                className="px-4 py-2 rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700"
              >
                Clear
              </button>
            </div>
          </form>

          <ContactConfirmDialog
            ref={dialogRef}
            title="Thank you!"
            message="Your message was received (simulated). We will get back to you soon."
          />
        </div>

        {/* Right: smaller image */}
        <aside className="lg:sticky lg:top-6">
          <div className="max-w-sm mx-auto rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <img
              src="/img/rick-morty-pensando.png"
              alt="Rick y Morty pensando"
              className="w-full max-h-[320px] object-contain rounded-xl"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/img/no-image.png";
              }}
            />
            <p className="mt-3 text-sm text-slate-300">¿Tienes una idea? Escríbeme.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}