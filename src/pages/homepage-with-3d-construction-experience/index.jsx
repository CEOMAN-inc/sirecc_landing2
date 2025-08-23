import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import GlobalSphereLayer from './components/GlobalSphereLayer';

import HeroSection from './components/HeroSection';
import MetricsSection from './components/MetricsSection';
import ServicesPreview from './components/ServicesPreview';
import TestimonialsSection from './components/TestimonialsSection';
import FooterSection from './components/FooterSection';

const HomepageWith3DConstructionExperience = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <>
     

      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Header fijo arriba */}
        <Header transparent={true} />

        {/* Main: aislamos el stacking para la esfera */}
        <main className="relative overflow-x-hidden isolate">
          {/* Fondo 3D común en este mismo contexto */}
          <GlobalSphereLayer />

          {/* Contenido por encima de la esfera */}
          <HeroSection />
          <MetricsSection />
          <ServicesPreview />
          <TestimonialsSection />
          <FooterSection />
        </main>
      </div>
    </>
  );
};

export default HomepageWith3DConstructionExperience;
