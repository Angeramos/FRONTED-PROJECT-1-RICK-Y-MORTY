import { forwardRef, useImperativeHandle, useRef, useState } from "react";

/**
 * ConfirmDialog basado en <dialog>.
 * Se controla con ref: dialogRef.current.open({ ... })
 */
const ConfirmDialog = forwardRef(function ConfirmDialog(_, ref) {
  const dialogRef = useRef(null);

  const [state, setState] = useState({
    title: "Confirm",
    message: "Are you sure?",
    confirmText: "Confirm",
    cancelText: "Cancel",
    danger: false,
    // Dark pattern (intencional): el botón "confirmar" será más llamativo que "cancelar"
    // y el texto de cancelar será menos visible. Esto NO es buena práctica, se hace
    // SOLO para cumplir el requisito del taller. En un producto real se debe evitar.
    onConfirm: null,
  });

  useImperativeHandle(ref, () => ({
    open(next) {
      setState((prev) => ({
        ...prev,
        ...next,
      }));
      dialogRef.current?.showModal();
    },
    close() {
      dialogRef.current?.close();
    },
  }));

  function handleCancel() {
    dialogRef.current?.close();
  }

  function handleConfirm() {
    const fn = state.onConfirm;
    dialogRef.current?.close();
    if (typeof fn === "function") fn();
  }

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/70 rounded-xl w-[min(520px,92vw)] p-0 bg-slate-950 text-slate-100 border border-slate-800"
      aria-label="Confirmation dialog"
    >
      <div className="p-5">
        <h2 className="text-lg font-semibold">{state.title}</h2>
        <p className="mt-2 text-slate-300">{state.message}</p>

        <div className="mt-5 flex items-center justify-end gap-3">
          {/* Dark pattern (intencional): cancelar se ve “apagado” */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-md text-slate-400 hover:text-slate-200"
          >
            {state.cancelText}
          </button>

          {/* Dark pattern (intencional): confirmar muy resaltado */}
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-md font-medium border transition ${
              state.danger
                ? "bg-red-600 border-red-500 text-white hover:bg-red-500"
                : "bg-violet-600 border-violet-500 text-white hover:bg-violet-500"
            }`}
            autoFocus
          >
            {state.confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ConfirmDialog;