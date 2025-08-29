import React from "react";
import { Helmet } from "react-helmet";

// UI global
import Header from "../../components/ui/Header";
import BreadcrumbNavigation from "../../components/ui/BreadcrumbNavigation";

// Secciones
import ServicesHero from "./components/ServicesHero";
import ServicesShowcase from "./components/ServicesShowcase";
import EngineeringProcessTimeline from "./components/EngineeringProcessTimeline";
import MetricsDisplay from "./components/MetricsDisplay";
import StickyQuoteCTA from "./components/StickyQuoteCTA";

const ServicesOverview = () => {
  return (
    <>
      <Helmet>
        <title>Servicios - SIRECC | Construcción e Ingeniería Especializada</title>
        <meta
          name="description"
          content="Servicios especializados de SIRECC: obra civil, acabados, comunicaciones, mobiliario, mantenimiento locativo, hidrosanitarios, sistemas eléctricos, espacios públicos, gas natural y vidrio aluminio."
        />
        <link rel="canonical" href="/services-overview" />
      </Helmet>

      {/* Fondo con imagen + overlay de contraste */}
      <div
        className="min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          // Coloca tu imagen en: public/assets/images/bg-services.jpg
          backgroundImage: "url('/assets/images/fondo3.png')",
        }}
      >
        {/* Overlay: capa superior para contraste de textos */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,22,32,0.88) 0%, rgba(29,41,70,0.82) 35%, rgba(11,22,32,0.88) 100%)",
          }}
        />

        {/* Contenido */}
        <div className="relative z-10">
          <Header />

          <main className="relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
              <BreadcrumbNavigation />
            </div>

            <ServicesHero />

            {/* Showcase: padding inferior alto para no chocar con la CTA fija */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 pb-36">
              <ServicesShowcase />
            </div>

            <EngineeringProcessTimeline />

            <MetricsDisplay />

            <StickyQuoteCTA />
          </main>
        </div>
      </div>
    </>
  );
};

export default ServicesOverview;
