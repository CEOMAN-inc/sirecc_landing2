// src/components/clients/ClientsBanner.jsx
import React, { useMemo, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import ClientCard from "./ClientCard";
import ClientModal from "./ClientModal";
import { CLIENTS } from "./clientsData";

const ORANGE  = "#F27E33";
const NAVY    = "#1D2946";
const BASE_BG = "#0B1620";
const DURATION = 42;

// 👉 imagen de fondo para esta sección (igual patrón que ServicesPreview)
const CLIENTS_OVERLAY = "/assets/images/fondo3.png";

export default function ClientsBanner() {
  const [selected, setSelected] = useState(null);
  const onOpen  = useCallback((item) => setSelected(item), []);
  const onClose = useCallback(() => setSelected(null), []);
  const track   = useMemo(() => [...CLIENTS, ...CLIENTS], []);
  const controls = useAnimation();

  const start = () =>
    controls.start({
      x: ["0%", "-50%"],
      transition: { duration: DURATION, ease: "linear", repeat: Infinity },
    });

  const stop = () => controls.stop();

  React.useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{ background: BASE_BG }}
    >
     {/* ===== Fondo extra SOLO para esta sección ===== */}
<div className="pointer-events-none absolute inset-0 z-0">
  {/* Imagen difuminada */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${CLIENTS_OVERLAY}?v=${Date.now()})`, // ← bust caché
      backgroundSize: "cover",          // ← controla el tamaño (pruébalo con contain si prefieres)
      backgroundPosition: "center",
      filter: "blur(14px) saturate(110%)",
      opacity: 0.5,                      // ↑ hazla más visible
      transform: "scale(1.06)",
      // quita la máscara para verificar que aparece; si ya la ves, vuelve a activarla más suave
      WebkitMaskImage: "none",
      maskImage: "none",
    }}
  />

  {/* Scrim para legibilidad (más suave) */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(to bottom, rgba(11,22,32,0.15), rgba(11,22,32,0.35) 45%, rgba(11,22,32,0.6) 75%)",
    }}
  />

  {/* Pluma superior para fundir con la sección previa */}
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
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,.25)]">
          Aliados que confían en nosotros
        </h2>
        <p className="font-inter text-white/85 mt-3 max-w-3xl mx-auto">
          Casos destacados de mantenimiento, adecuaciones y obra en salud, banca, educación e industria.
        </p>
      </div>

      {/* Carrusel con pausa al hover */}
      <div
        className="relative z-10 mt-10 select-none"
        onMouseEnter={stop}
        onMouseLeave={start}
        role="region"
        aria-label="Clientes y casos"
      >
        <div className="relative">
          {/* wrapper para forzar misma altura visual de la pista */}
          <div className="h-[420px]">
            <motion.div
              className="flex gap-6 will-change-transform h-full items-stretch"
              animate={controls}
              style={{ width: "200%" }}
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
        </div>
      </div>

      {/* Modal de detalle */}
      <ClientModal item={selected} onClose={onClose} />
    </section>
  );
}
