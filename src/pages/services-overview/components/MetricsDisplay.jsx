import React from "react";

const Metric = ({ value, label }) => (
  <div className="text-center">
    <div className="font-orbitron text-4xl md:text-5xl text-white">{value}</div>
    <div className="text-white/75 mt-1">{label}</div>
  </div>
);

const MetricsDisplay = () => {
  return (
    <section className="relative bg-[#0B1620] pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6">
          <Metric value="4" label="Fases Definidas" />
          <Metric value="100%" label="Transparencia" />
          <Metric value="24/7" label="Seguimiento" />
          <Metric value="15+" label="Años Experiencia" />
        </div>
      </div>
    </section>
  );
};

export default MetricsDisplay;
