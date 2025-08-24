// src/components/clients/ClientModal.jsx
import React, { useEffect, useRef } from "react";

const ORANGE = "#F27E33";
const NAVY   = "#1D2946";
const BASE_BG = "#0B1620";

export default function ClientModal({ item, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!item) return;

    // bloquear scroll del body
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    // foco al abrir
    setTimeout(() => dialogRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="client-modal-title"
      aria-describedby="client-modal-desc"
    >
      {/* Backdrop */}
      <button
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative mx-4 w-full max-w-3xl outline-none"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white shadow-2xl">
          {/* Halo de marca */}
          <span
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-70 blur-md"
            style={{ background: `linear-gradient(90deg, ${NAVY}, ${ORANGE})` }}
            aria-hidden
          />

          {/* Marca de agua (silueta) */}
          {item.logo && (
            <img
              src={item.logo}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-10 w-[45%] opacity-10 grayscale mix-blend-overlay"
              style={{ filter: "grayscale(1) contrast(1.2)" }}
            />
          )}

          {/* Contenido */}
          <div className="relative z-10 p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/15 overflow-hidden shrink-0">
                {item.logo ? (
                  <img src={item.logo} alt={item.name} className="w-full h-full object-contain p-2" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-white/40 text-xs">LOGO</div>
                )}
              </div>
              <div className="min-w-0">
                <h3 id="client-modal-title" className="font-orbitron text-2xl font-semibold leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs uppercase tracking-wider" style={{ color: ORANGE }}>
                  {item.sector}
                </p>
              </div>

              <button
                onClick={onClose}
                className="ml-auto inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm hover:bg-white/15 transition"
                title="Cerrar"
              >
                ✕
              </button>
            </div>

            {/* Descripción */}
            {item.summary && (
              <p id="client-modal-desc" className="mt-4 text-white/85">
                {item.summary}
              </p>
            )}

            {/* Bullets completos */}
            {!!item.bullets?.length && (
              <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/90">
                {item.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className="mt-[7px] block h-[6px] w-[6px] rounded-full shrink-0"
                      style={{ background: ORANGE }}
                    />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Galería opcional */}
            {!!item.images?.length && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {item.images.map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <img
                      src={src}
                      alt={`Imagen ${i + 1} de ${item.name}`}
                      className="w-full h-28 object-cover"
                      onError={(e) => (e.currentTarget.style.opacity = 0.2)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
              >
                Cerrar
              </button>
              {item.cta && item.ctaHref && (
                <a
                  href={item.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm"
                  style={{ background: ORANGE }}
                >
                  {item.cta}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
