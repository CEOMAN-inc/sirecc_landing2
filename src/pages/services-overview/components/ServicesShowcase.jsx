// 👇 dentro del archivo ServicesShowcase.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "../servicesData";

const ORANGE = "#F27E33";
const NAVY   = "#1D2946";
const CYAN   = "#00D4FF";

// ⬅️ Ajusta este selector si tu header tiene otro id/clase
const getHeaderHeight = () => {
  const header =
    document.querySelector("header") || document.getElementById("site-header");
  return header ? header.getBoundingClientRect().height : 88; // fallback ~88px
};

export default function ServicesShowcase() {
  const location = useLocation();
  const hashSlug = location.hash?.replace("#", "");
  const defaultSlug = "obra-civil";

  const initial = useMemo(() => {
    const exists = servicesData.some((s) => s.slug === hashSlug);
    return exists ? hashSlug : defaultSlug;
  }, [hashSlug]);

  const [active, setActive] = useState(initial);
  const contentRef = useRef(null);

  // ✅ Scroll con offset para que no se corte bajo el header
  useEffect(() => {
    if (!contentRef.current) return;
    const headerH = getHeaderHeight();
    const extra = 16; // respirito extra
    const y =
      contentRef.current.getBoundingClientRect().top +
      window.scrollY -
      headerH -
      extra;

    window.scrollTo({ top: y, behavior: "smooth" });
  }, [active]);

  const activeItem =
    servicesData.find((s) => s.slug === active) || servicesData[0];

  const railItemClass = (slug) =>
    `w-full text-left rounded-xl border px-3 py-2 transition ${
      slug === active
        ? "border-white/30 bg-white/15 text-white"
        : "border-white/15 bg-white/10 text-white/85 hover:text-white hover:bg-white/12"
    }`;

  return (
    <div className="relative lg:grid lg:grid-cols-12 lg:gap-8">
      {/* Rail */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-28">
          <nav className="space-y-2" aria-label="Servicios">
            {servicesData.map((s) => (
              <button
                key={s.slug}
                onClick={() => setActive(s.slug)}
                aria-current={active === s.slug ? "true" : "false"}
                className={railItemClass(s.slug)}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: active === s.slug ? ORANGE : "transparent" }}
                  />
                  {s.name}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Contenido */}
      <div ref={contentRef} className="lg:col-span-9 min-w-0">
        <AnimatePresence mode="wait">
          <motion.section
            key={activeItem.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="scroll-mt-28 mt-10"
          >
            <div className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-6">
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: `0 0 0 1px #ffffff1A, inset 0 0 60px ${ORANGE}22`,
                }}
              />
              <div
                className="absolute -top-[1px] left-0 h-1 w-40 rounded-tr"
                style={{
                  background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})`,
                }}
              />

              <div className="relative z-10">
                <h3 className="font-orbitron text-white text-2xl md:text-3xl font-semibold">
                  {activeItem.name}
                </h3>

                {activeItem.description && (
                  <p className="text-white/85 mt-3">{activeItem.description}</p>
                )}

                {!!activeItem.bullets?.length && (
                  <ul className="mt-4 list-disc pl-5 space-y-1 text-white/85">
                    {activeItem.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}

                {/* CTA naranja animada */}
                <div className="mt-6 flex items-center gap-3">
                  <Link
                    to="/contact-quote-request"
                    className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 font-medium transition"
                    style={{
                      background: "#fff",
                      color: NAVY,
                      borderColor: "rgba(255,255,255,0.18)",
                    }}
                    aria-label={`Cotizar ahora ${activeItem.name}`}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${ORANGE}44`)}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    Cotizar ahora
                    <span style={{ color: ORANGE, transition: "transform .2s" }}>
                      ↗
                    </span>
                  </Link>

                  <span
                    className="inline-flex items-center gap-2 rounded-xl border bg-[rgba(0,212,255,0.12)] px-3 py-1 text-xs"
                    style={{ color: CYAN, borderColor: "rgba(255,255,255,0.18)" }}
                  >
                    • Calidad certificada
                  </span>
                  <span
                    className="inline-flex items-center gap-2 rounded-xl border bg-[rgba(0,212,255,0.12)] px-3 py-1 text-xs"
                    style={{ color: CYAN, borderColor: "rgba(255,255,255,0.18)" }}
                  >
                    • Atención 24/7
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        </AnimatePresence>

        {/* Navegación */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              const idx = servicesData.findIndex((s) => s.slug === active);
              const prev =
                servicesData[idx - 1] || servicesData[servicesData.length - 1];
              setActive(prev.slug);
            }}
            className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-white/85 hover:bg-white/12 transition"
          >
            ← Anterior
          </button>
          <button
            onClick={() => {
              const idx = servicesData.findIndex((s) => s.slug === active);
              const next = servicesData[idx + 1] || servicesData[0];
              setActive(next.slug);
            }}
            className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-white/85 hover:bg-white/12 transition"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
