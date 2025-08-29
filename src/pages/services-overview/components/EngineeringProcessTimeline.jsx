import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

// 🎨 Tokens SIRECC
const ORANGE = "#F27E33";
const NAVY = "#1D2946";
const CYAN = "#00D4FF";
const BG = "#0B1620";

const EngineeringProcessTimeline = () => {
  const phases = [
    {
      id: 1,
      title: "Planificación",
      icon: "FileSearch",
      description:
        "Análisis detallado de requerimientos y evaluación técnica del proyecto.\nDefinición de alcance, cronograma y recursos necesarios.",
      features: ["Análisis de requerimientos", "Evaluación de factibilidad", "Definición de cronograma"],
      colorFrom: `${ORANGE}33`,
      colorTo: `${ORANGE}1A`,
    },
    {
      id: 2,
      title: "Diseño",
      icon: "PenTool",
      description:
        "Desarrollo de planos técnicos y especificaciones detalladas.\nModelado 3D y simulaciones para optimizar la solución.",
      features: ["Planos técnicos", "Modelado 3D", "Especificaciones detalladas"],
      colorFrom: `${CYAN}33`,
      colorTo: `${CYAN}1A`,
    },
    {
      id: 3,
      title: "Ejecución",
      icon: "Settings",
      description:
        "Implementación del proyecto con supervisión técnica especializada.\nControl de calidad y seguimiento continuo del avance.",
      features: ["Supervisión técnica", "Control de calidad", "Seguimiento continuo"],
      colorFrom: "#3CCB7F33", // verde éxito suave
      colorTo: "#3CCB7F1A",
    },
    {
      id: 4,
      title: "Entrega",
      icon: "CheckCircle",
      description:
        "Finalización del proyecto con pruebas de funcionamiento.\nCapacitación al cliente y documentación técnica completa.",
      features: ["Pruebas de funcionamiento", "Capacitación al cliente", "Documentación técnica"],
      colorFrom: "#F2B23333", // amarillo warning suave
      colorTo: "#F2B2331A",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };

  const phaseVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 26 },
    },
  };

  return (
    <section
      className="py-16 lg:py-20"
      style={{
        background: `linear-gradient(180deg, ${BG} 0%, rgba(11,22,32,0.85) 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-orbitron text-3xl lg:text-4xl text-white font-semibold">
            Metodología de Ingeniería SIRECC
          </h2>
          <p className="font-body text-white/80 max-w-3xl mx-auto mt-3">
            Nuestro proceso estructurado en 4 fases garantiza la excelencia en cada proyecto, desde la
            conceptualización hasta la entrega final
          </p>

          {/* Chip flujo */}
          <div className="flex justify-center mt-6">
            <div
              className="flex items-center gap-2 px-6 py-3 rounded-full border"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.18)",
                boxShadow: `inset 0 0 50px ${ORANGE}14`,
              }}
            >
              <Icon name="ArrowRight" size={16} className="opacity-80" style={{ color: CYAN }} />
              <span className="font-body text-sm text-white/85">Proceso continuo</span>
              <Icon name="ArrowRight" size={16} className="opacity-80" style={{ color: CYAN }} />
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative">
          {/* Línea conectora (desktop) */}
          <div
            className="hidden lg:block absolute left-0 right-0 h-0.5 top-24 opacity-30"
            style={{
              background: `linear-gradient(90deg, ${CYAN}, ${ORANGE})`,
            }}
          />

          {/* Grid de fases */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase, index) => (
              <motion.div key={phase.id} variants={phaseVariants} className="relative group">
                {/* Card */}
                <div
                  className="rounded-xl p-6 h-full relative"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(6px)",
                    boxShadow: `inset 0 0 60px ${ORANGE}22`,
                    transition: "transform .25s ease",
                  }}
                >
                  {/* Icono y número */}
                  <div className="relative mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${ORANGE} 0%, ${NAVY} 100%)`,
                        boxShadow: `0 6px 22px ${ORANGE}33`,
                      }}
                    >
                      <Icon name={phase.icon} size={24} className="text-white" />
                    </div>

                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: ORANGE }}
                    >
                      <span className="font-orbitron font-bold text-sm text-white">{phase.id}</span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="space-y-4">
                    <h3 className="font-orbitron text-white text-lg tracking-wide">
                      {phase.title}
                    </h3>

                    <p className="font-body text-sm text-white/80 leading-relaxed">
                      {phase.description.split("\n")[0]}
                    </p>

                    <div className="space-y-2">
                      {phase.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-body text-white/80">
                          <Icon name="CheckCircle" size={12} style={{ color: CYAN }} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overlay hover tenue */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${phase.colorFrom}, ${phase.colorTo})`,
                    }}
                  />
                </div>

                {/* Flechas conexión */}
                {index < phases.length - 1 && (
                  <>
                    <div
                      className="hidden lg:flex absolute top-24 -right-4 z-10 w-8 h-8 rounded-full items-center justify-center"
                      style={{ background: ORANGE, boxShadow: `0 6px 16px ${ORANGE}3a` }}
                    >
                      <Icon name="ArrowRight" size={16} className="text-white" />
                    </div>
                    <div className="lg:hidden flex justify-center my-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: ORANGE }}
                      >
                        <Icon name="ArrowDown" size={16} className="text-white" />
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringProcessTimeline;
