// src/pages/homepage-with-3d-construction-experience/components/clients/ClientsBanner.jsx
import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import ClientCard from "./ClientCard";
import ClientModal from "./ClientModal";
import { CLIENTS } from "./clientsData";

const ORANGE  = "#F27E33";
const NAVY    = "#1D2946";
const BASE_BG = "#0B1620";
const DURATION = 42;              // menor = más rápido
const CLIENTS_OVERLAY = "/assets/images/fondo3.png";

export default function ClientsBanner() {
  const [selected, setSelected] = useState(null);
  const onOpen  = (item) => setSelected(item);
  const onClose = () => setSelected(null);

  // Duplicamos para loop visual continuo
  const track = useMemo(() => [...CLIENTS, ...CLIENTS], []);

  // Medidas del “viewport” del carrusel
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth || 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Motion value único para la pista
  const x = useMotionValue(0);
  const loopControlsRef = useRef(null); // guardamos el control del animate para reiniciarlo

  // Función que arranca el loop infinito desde una posición dada
  const startLoop = (fromX) => {
    if (!containerWidth) return;
    try { loopControlsRef.current?.stop?.(); } catch {}
    x.set(fromX);
    // animamos de fromX → fromX - containerWidth y repetimos en bucle
    loopControlsRef.current = animate(x, [fromX, fromX - containerWidth], {
      duration: DURATION,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  };

  // Arrancar/reiniciar cuando haya medida
  useEffect(() => {
    if (containerWidth) startLoop(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  // Util para mantener el desplazamiento dentro del rango visible
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  // Paso de las flechas (10% o mínimo 80px)
  const stepPx = Math.max(80, Math.round(containerWidth * 0.1));

  // Flecha izquierda: mover hacia la derecha (más cerca de 0)
  const moveLeft = () => {
    const curr = x.get();
    const next = clamp(curr + stepPx, -containerWidth, 0);
    startLoop(next); // reanuda el loop desde la nueva posición
  };

  // Flecha derecha: mover hacia la izquierda (más cerca de -containerWidth)
  const moveRight = () => {
    const curr = x.get();
    const next = clamp(curr - stepPx, -containerWidth, 0);
    startLoop(next); // reanuda el loop desde la nueva posición
  };

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden" style={{ background: BASE_BG }}>
      {/* Fondo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${CLIENTS_OVERLAY}?v=${Date.now()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(14px) saturate(110%)",
            opacity: 0.5,
            transform: "scale(1.06)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,22,32,0.15), rgba(11,22,32,0.35) 45%, rgba(11,22,32,0.6) 75%)",
          }}
        />
        <div
          className="absolute -top-10 left-0 right-0 h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(11,22,32,1))",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div
          className="mx-auto mb-6 h-[3px] w-24 rounded-full"
          style={{ background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})` }}
        />
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Aliados que confían en nosotros
        </h2>
        <p className="font-inter text-white/85 mt-3 max-w-3xl mx-auto">
          Casos destacados de mantenimiento, adecuaciones y obra en salud, banca, educación e industria.
        </p>
      </div>

      {/* Carrusel */}
      <div className="relative z-10 mt-10 select-none" role="region" aria-label="Clientes y casos">
        <div className="relative">
          <div ref={containerRef} className="h-[420px]">
            <motion.div
              className="flex gap-6 will-change-transform h-full items-stretch"
              style={{ width: "200%", x }} // x controlado por loop + clicks (reiniciando)
            >
              {track.map((item, idx) => (
                <ClientCard key={`${item.id}-${idx}`} item={item} onOpen={onOpen} />
              ))}
            </motion.div>
          </div>

          {/* Fades laterales */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24"
            style={{ background: `linear-gradient(90deg, ${BASE_BG}, transparent)` }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24"
            style={{ background: `linear-gradient(270deg, ${BASE_BG}, transparent)` }}
          />

          {/* Controles */}
          <button
            type="button"
            onClick={moveLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2
                       rounded-xl border border-white/15 bg-white/10
                       backdrop-blur-sm text-white px-3 py-2
                       hover:bg-white/15 transition"
            aria-label="Anterior"
            title="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={moveRight}
            className="absolute right-2 top-1/2 -translate-y-1/2
                       rounded-xl border border-white/15 bg-white/10
                       backdrop-blur-sm text-white px-3 py-2
                       hover:bg-white/15 transition"
            aria-label="Siguiente"
            title="Siguiente"
          >
            ›
          </button>
        </div>
      </div>

      {/* Modal */}
      <ClientModal item={selected} onClose={onClose} />
    </section>
  );
}
