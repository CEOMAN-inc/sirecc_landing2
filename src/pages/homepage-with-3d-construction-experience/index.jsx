import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MetricsSection from './components/MetricsSection';
import ServicesPreview from './components/ServicesPreview';
import TestimonialsSection from './components/TestimonialsSection';
import FooterSection from './components/FooterSection';

const HomepageWith3DConstructionExperience = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>SIRECC Construction - Construyendo el Futuro de Colombia</title>
        <meta 
          name="description" 
          content="SIRECC Construction: Líderes en construcción residencial, comercial e industrial en Colombia. 15+ años de experiencia, 250+ proyectos completados, 98% satisfacción del cliente." 
        />
        <meta 
          name="keywords" 
          content="construcción Colombia, construcción residencial, proyectos comerciales, infraestructura industrial, SIRECC, constructora Bogotá" 
        />
        <meta name="author" content="SIRECC Construction" />
        <meta property="og:title" content="SIRECC Construction - Construyendo el Futuro de Colombia" />
        <meta 
          property="og:description" 
          content="Transformamos visiones arquitectónicas en realidades sólidas con tecnología de vanguardia y más de 15 años de experiencia." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sirecc.com.co" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SIRECC Construction - Construyendo el Futuro" />
        <meta 
          name="twitter:description" 
          content="Líderes en construcción con 15+ años de experiencia en Colombia." 
        />
        <link rel="canonical" href="https://sirecc.com.co" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header with transparent overlay */}
        <Header transparent={true} />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section with 3D Experience */}
          <HeroSection />

          {/* Metrics & Achievements */}
          <MetricsSection />

          {/* Services Preview */}
          <ServicesPreview />

          {/* Client Testimonials */}
          <TestimonialsSection />

          {/* Footer with Nocturnal Cityscape */}
          <FooterSection />
        </main>
      </div>
    </>
  );
};

export default HomepageWith3DConstructionExperience;