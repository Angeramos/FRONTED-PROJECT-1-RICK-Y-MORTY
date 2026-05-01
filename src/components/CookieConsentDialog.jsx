import { useEffect, useRef, useState } from "react";

const LS_KEY = "cookie_consent_v1";

export default function CookieConsentDialog() {
  const dialogRef = useRef(null);
  const [rejectStep, setRejectStep] = useState(false);
  const [showAcceptedGift, setShowAcceptedGift] = useState(false);

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

    setShowAcceptedGift(true);
    window.setTimeout(() => setShowAcceptedGift(false), 2500);
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
    <>
      {showAcceptedGift && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 px-4">
          <div className="w-[min(300px,92vw)] rounded-xl border border-slate-700 bg-slate-950 p-3">
            <p className="text-slate-100 font-semibold mb-2 text-sm">
              Thanks for accepting!
            </p>

            <video
              src="/cookies-accepted.mp4"
              autoPlay
              muted
              playsInline
              className="w-full max-w-[220px] mx-auto rounded-md border border-slate-800"
            />
          </div>
        </div>
      )}

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
              <h2 className="text-lg font-semibold">Cookie preferences</h2>
              <p className="mt-2 text-slate-300">
                We use cookies to “improve your experience.” You can accept or reject them.
              </p>
            </div>

            <button
              type="button"
              onClick={closeDialog}
              className="text-slate-400 hover:text-slate-200 px-2"
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
          </div>

          <ul className="mt-4 text-sm text-slate-300 list-disc pl-5 space-y-1">
            <li>Required (always enabled)</li>
            <li>Analytics</li>
            <li>Marketing</li>
          </ul>

          {rejectStep && (
            <div className="mt-4 rounded-xl border border-red-800 bg-red-950/40 p-4">
              <p className="font-semibold text-red-200">Are you sure you want to reject?</p>

              <div className="mt-2 flex items-center gap-3">
                <img
                  src="/img/rick-enojado.png"
                  alt="Rick enojado"
                  className="w-12 h-12 rounded-full object-cover border border-red-800"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/img/no-image.png";
                  }}
                />
                <p className="text-sm text-red-200/90">
                  This could “make your experience worse”
                </p>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-col sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={reject}
              className="order-2 sm:order-1 px-3 py-2 text-slate-400 hover:text-slate-200"
            >
              {rejectStep ? "Reject anyway" : "Reject"}
            </button>

            <button
              type="button"
              onClick={acceptAll}
              className="order-1 sm:order-2 px-4 py-2 rounded-md font-medium border border-violet-500 bg-violet-600 text-white hover:bg-violet-500"
              autoFocus
            >
              Accept all
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}