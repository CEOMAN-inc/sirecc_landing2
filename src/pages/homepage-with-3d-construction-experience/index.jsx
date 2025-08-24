import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
// ⛔️ quitamos la importación global de la esfera
// import GlobalSphereLayer from './components/GlobalSphereLayer';

import HeroSection from './components/HeroSection';
import ServicesPreview from './components/ServicesPreview';
import FooterSection from './components/FooterSection';
import ClientsBanner from './components/clients/ClientsBanner';


const HomepageWith3DConstructionExperience = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <Header transparent={true} />

      {/* Contenido */}
      <main className="relative z-10 overflow-x-hidden">
        {/* La esfera ahora vive SOLO dentro del Hero */}
        <HeroSection />
        <ServicesPreview />
      <ClientsBanner />
        <FooterSection />
      </main>
    </div>
  );
};

export default HomepageWith3DConstructionExperience;
