import React from "react";

// 🎨 Tokens SIRECC
const ORANGE = "#F27E33";
const NAVY   = "#1D2946";

const ServicesHero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo local suave (por si el hero necesita un refuerzo superior) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(242,126,51,0.10) 0%, rgba(242,126,51,0.00) 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-12 relative">
        {/* Título: Orbitron, peso 700, tracking sutil */}
        <h1
          className="font-orbitron font-bold text-white text-5xl md:text-6xl lg:text-7xl text-center"
          style={{ letterSpacing: "0.02em" }}
        >
          Servicios
        </h1>

        {/* Subrayado con degradé SIRECC */}
        <div className="flex justify-center mt-5 mb-6">
          <span
            className="h-1 rounded-full"
            style={{
              width: "140px",
              background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})`,
              boxShadow: `0 0 18px ${ORANGE}33`,
            }}
          />
        </div>

        {/* Descripción: Inter, color blanco/85 y centrado */}
        <p className="font-body text-white/85 text-lg md:text-xl leading-relaxed text-center max-w-4xl mx-auto">
          Descubre nuestra amplia gama de servicios especializados en construcción e ingeniería.
          Desde obra civil hasta sistemas especializados, ofrecemos soluciones integrales para tu proyecto.
        </p>
      </div>
    </section>
  );
};

export default ServicesHero;
