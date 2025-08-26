// src/components/clients/ClientCard.jsx
import React from "react";

const ORANGE = "#F27E33";
const NAVY   = "#1D2946";

// Alto unificado para TODOS los cards
const CARD_HEIGHT = "380px";

export default function ClientCard({ item, onOpen }) {
  return (
    <article
      className="group relative w-[500px] sm:w-[560px] md:w-[600px] shrink-0"
      aria-label={item.name}
      style={{ height: CARD_HEIGHT }}
    >
      {/* Card base (glass) */}
      <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm text-white">
    
        {/* ====== Marca de agua (silueta del logo bien difuminada) ====== */}
        {item.logo && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Capa de blur y escala para evitar bordes al difuminar */}
            <img
              src={item.logo}
              alt=""
              aria-hidden="true"
              className="
                absolute
                right-[0%] bottom-[-10%]
                w-[100%] max-w-[5}820px]
                object-contain
                opacity-[0.10]
                mix-blend-overlay
              "
              style={{
                filter: "grayscale(1) brightness(1.1) contrast(1.15) blur(6px)",
                transform: "scale(1.08)",
                WebkitMaskImage:
                  "radial-gradient(60% 60% at 70% 70%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "radial-gradient(60% 60% at 70% 70%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>
        )}

        {/* Contenido */}
        <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col">
          {/* Header (logo principal + nombre + sector) */}
          <div className="flex items-center gap-4">
            {/* Logo más grande */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white/10 overflow-hidden border border-white/15">
              <img
                src={item.logo}
                alt={item.name}
                className="w-full h-full object-contain p-2"
                onError={(e) => (e.currentTarget.style.opacity = 0.25)}
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-orbitron font-semibold text-xl leading-tight">
                {item.name}
              </h3>
              <p className="text-xs uppercase tracking-wider" style={{ color: ORANGE }}>
                {item.sector}
              </p>
            </div>
          </div>

          {/* Resumen */}
          {item.summary && (
            <p className="mt-4 text-white/85 line-clamp-2">
              {item.summary}
            </p>
          )}

          {/* Bullets (tope para conservar altura) */}
          {!!item.bullets?.length && (
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-white/85 flex-1">
              {item.bullets.slice(0, 4).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span
                    className="mt-[6px] block h-[6px] w-[6px] rounded-full shrink-0"
                    style={{ background: ORANGE }}
                  />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA pegado al fondo */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => onOpen?.(item)}
              className="relative rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/10 px-4 py-2 text-sm font-medium hover:scale-[1.02] transition-all duration-300"
            >
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
