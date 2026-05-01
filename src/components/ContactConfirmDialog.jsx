import { forwardRef, useImperativeHandle, useRef } from "react";

const ContactConfirmDialog = forwardRef(function ContactConfirmDialog(
  { title = "Mensaje enviado", message = "Gracias por contactarnos." },
  ref
) {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current?.showModal();
    },
    close() {
      dialogRef.current?.close();
    },
  }));

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/70 rounded-xl w-[min(520px,92vw)] p-0 bg-slate-950 text-slate-100 border border-slate-800"
      aria-label="Contact confirmation dialog"
    >
      <div className="p-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-slate-300">{message}</p>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-500"
            autoFocus
          >
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ContactConfirmDialog;