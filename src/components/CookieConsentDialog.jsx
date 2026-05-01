import { useEffect, useRef, useState } from "react";

const LS_KEY = "cookie_consent_v1";

export default function CookieConsentDialog() {
  const dialogRef = useRef(null);
  const [rejectStep, setRejectStep] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) {
      dialogRef.current?.showModal();
      setRejectStep(false);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem(LS_KEY, "accepted_all");
    setRejectStep(false);
    dialogRef.current?.close();
  }

  function reject() {
    if (!rejectStep) {
      setRejectStep(true);
      return;
    }
    localStorage.setItem(LS_KEY, "rejected");
    setRejectStep(false);
    dialogRef.current?.close();
  }

  function closeDialog() {
    setRejectStep(true);
  }

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/70 rounded-xl w-[min(680px,92vw)] p-0 bg-slate-950 text-slate-100 border border-slate-800"
      aria-label="Cookie consent dialog"
      onCancel={(e) => {
        e.preventDefault();
        closeDialog();
      }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Preferencias de cookies</h2>
            <p className="mt-2 text-slate-300">
              Usamos cookies para “mejorar tu experiencia”. Puedes aceptar o rechazar.
            </p>
          </div>

          <button
            type="button"
            onClick={closeDialog}
            className="text-slate-400 hover:text-slate-200 px-2"
            aria-label="Cerrar"
            title="Cerrar"
          >
            ✕
          </button>
        </div>

        <ul className="mt-4 text-sm text-slate-300 list-disc pl-5 space-y-1">
          <li>Necesarias (siempre activas)</li>
          <li>Analítica</li>
          <li>Marketing</li>
        </ul>

        {rejectStep && (
          <div className="mt-4 rounded-xl border border-red-800 bg-red-950/40 p-4">
            <p className="font-semibold text-red-200">¿Seguro que quieres rechazar?</p>
            <p className="mt-1 text-sm text-red-200/90">
              Esto podría “empeorar tu experiencia” 😠😠😠
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-col sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={reject}
            className="order-2 sm:order-1 px-3 py-2 text-slate-400 hover:text-slate-200"
          >
            {rejectStep ? "Rechazar de todas formas" : "Rechazar"}
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className="order-1 sm:order-2 px-4 py-2 rounded-md font-medium border border-violet-500 bg-violet-600 text-white hover:bg-violet-500"
            autoFocus
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </dialog>
  );
}