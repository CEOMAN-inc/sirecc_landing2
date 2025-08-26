import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StickyQuoteCTA from '../../components/ui/StickyQuoteCTA';
import ServicesHero from './components/ServicesHero';
import ServiceFilter from './components/ServiceFilter';
import ServicesGrid from './components/ServicesGrid';
import Icon from '../../components/AppIcon';

const ServicesOverview = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock services data
  const servicesData = [
    {
      id: 1,
      slug: 'obra-civil-acabados',
      title: 'Obra Civil y Acabados',
      category: 'Construcción',
      type: 'construccion',
      description: `Servicios integrales de construcción y acabados arquitectónicos para proyectos institucionales y corporativos.\n\nIncluye mampostería, pañetes, pisos, enchapes, pintura y trabajos de carpintería especializada.`,
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Mampostería y estructuras',
        'Acabados arquitectónicos',
        'Carpintería especializada',
        'Control de calidad certificado'
      ],
      standards: ['NTC 2050', 'NSR-10'],
      hasCompliance: true
    },
    {
      id: 2,
      slug: 'mantenimiento-locativo',
      title: 'Mantenimiento Locativo',
      category: 'Mantenimiento',
      type: 'mantenimiento',
      description: `Mantenimiento preventivo y correctivo de instalaciones corporativas e institucionales.\n\nServicios de reparación, renovación y optimización de espacios existentes con garantía de calidad.`,
      image: 'https://images.pixabay.com/photo/2020/04/18/08/33/maintenance-5058247_960_720.jpg',
      features: [
        'Mantenimiento preventivo',
        'Reparaciones especializadas',
        'Renovación de espacios',
        'Respuesta rápida 24/7'
      ],
      standards: ['ISO 9001'],
      hasCompliance: true
    },
    {
      id: 3,
      slug: 'hidrosanitarios',
      title: 'Sistemas Hidrosanitarios',
      category: 'Instalaciones',
      type: 'instalaciones',
      description: `Diseño, instalación y mantenimiento de sistemas de agua potable, desagües y tratamiento de aguas.\n\nCumplimiento estricto de normativas sanitarias y ambientales colombianas.`,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      features: [
        'Redes de agua potable',
        'Sistemas de desagüe',
        'Tratamiento de aguas',
        'Certificación sanitaria'
      ],
      standards: ['NTC 1500', 'RAS 2000'],
      hasCompliance: true
    },
    {
      id: 4,
      slug: 'sistemas-electricos',
      title: 'Sistemas Eléctricos',
      category: 'Instalaciones',
      type: 'instalaciones',
      description: `Instalaciones eléctricas de baja, media y alta tensión para proyectos industriales e institucionales.\n\nDiseño, montaje y certificación bajo normativas RETIE y NTC 2050.`,
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Instalaciones de baja tensión',
        'Sistemas de media tensión',
        'Automatización industrial',
        'Certificación RETIE'
      ],
      standards: ['RETIE', 'NTC 2050'],
      hasCompliance: true
    },
    {
      id: 5,
      slug: 'comunicaciones',
      title: 'Sistemas de Comunicaciones',
      category: 'Instalaciones',
      type: 'instalaciones',
      description: `Infraestructura de telecomunicaciones, redes de datos, fibra óptica y sistemas de seguridad electrónica.\n\nSoluciones tecnológicas avanzadas para conectividad empresarial.`,
      image: 'https://images.pixabay.com/photo/2020/02/03/00/12/fiber-optic-4815871_960_720.jpg',
      features: [
        'Redes de fibra óptica',
        'Cableado estructurado',
        'Sistemas de seguridad',
        'Infraestructura IT'
      ],
      standards: ['TIA/EIA', 'ISO/IEC 11801'],
      hasCompliance: true
    },
    {
      id: 6,
      slug: 'mobiliario',
      title: 'Mobiliario Especializado',
      category: 'Construcción',
      type: 'construccion',
      description: `Diseño, fabricación e instalación de mobiliario corporativo y especializado para espacios institucionales.\n\nSoluciones ergonómicas y funcionales adaptadas a cada proyecto.`,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      features: [
        'Mobiliario corporativo',
        'Diseño ergonómico',
        'Fabricación especializada',
        'Instalación profesional'
      ],
      standards: ['NTC 4732'],
      hasCompliance: false
    },
    {
      id: 7,
      slug: 'gas-natural',
      title: 'Instalaciones de Gas Natural',
      category: 'Instalaciones',
      type: 'instalaciones',
      description: `Diseño, instalación y mantenimiento de redes de gas natural para uso industrial y comercial.\n\nCertificación bajo normativa NTC 2505 y cumplimiento de protocolos de seguridad.`,
      image: 'https://images.pexels.com/photos/4254166/pexels-photo-4254166.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Redes de distribución',
        'Instalaciones industriales',
        'Sistemas de seguridad',
        'Certificación NTC 2505'
      ],
      standards: ['NTC 2505', 'CREG'],
      hasCompliance: true
    },
    {
      id: 8,
      slug: 'espacios-publicos',
      title: 'Espacios Públicos',
      category: 'Construcción',
      type: 'construccion',
      description: `Desarrollo y adecuación de espacios públicos, parques, plazas y áreas recreativas.\n\nProyectos urbanos sostenibles con enfoque en accesibilidad y funcionalidad.`,
      image: 'https://images.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_960_720.jpg',
      features: [
        'Diseño urbano sostenible',
        'Áreas recreativas',
        'Accesibilidad universal',
        'Paisajismo especializado'
      ],
      standards: ['NSR-10', 'NTC 4595'],
      hasCompliance: true
    },
    {
      id: 9,
      slug: 'vidrio-aluminio',
      title: 'Vidrio y Aluminio',
      category: 'Construcción',
      type: 'construccion',
      description: `Sistemas de fachadas, ventanería y estructuras en vidrio y aluminio para proyectos arquitectónicos.\n\nSoluciones estéticas y funcionales con tecnología de vanguardia.`,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      features: [
        'Fachadas arquitectónicas',
        'Ventanería especializada',
        'Estructuras de aluminio',
        'Vidrios de seguridad'
      ],
      standards: ['NTC 1279', 'ASTM'],
      hasCompliance: true
    }
  ];

  // Filter services based on active filter
  const filteredServices = useMemo(() => {
    if (activeFilter === 'all') return servicesData;
    if (activeFilter === 'certificado') return servicesData?.filter(service => service?.hasCompliance);
    return servicesData?.filter(service => service?.type === activeFilter);
  }, [activeFilter]);

  // Calculate filter counts
  const filterCounts = useMemo(() => ({
    all: servicesData?.length,
    construccion: servicesData?.filter(s => s?.type === 'construccion')?.length,
    mantenimiento: servicesData?.filter(s => s?.type === 'mantenimiento')?.length,
    instalaciones: servicesData?.filter(s => s?.type === 'instalaciones')?.length,
    certificado: servicesData?.filter(s => s?.hasCompliance)?.length
  }), []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Custom breadcrumb items
  const breadcrumbItems = [
    { label: 'Inicio', path: '/homepage', icon: 'Home' },
    { label: 'Servicios', path: '/services-overview', icon: 'Wrench' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <ServicesHero />
      {/* Main Content */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <Breadcrumb customItems={breadcrumbItems} />

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Nuestros Servicios Especializados
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto text-balance">
              Explora nuestras nueve categorías de servicios técnicos, cada una diseñada 
              para cumplir con los más altos estándares de calidad y normativas colombianas.
            </p>
          </motion.div>

          {/* Service Filter */}
          <ServiceFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            filterCounts={filterCounts}
            isFilterOpen={isFilterOpen}
            onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
          />

          {/* Services Grid */}
          <ServicesGrid
            services={filteredServices}
            isLoading={isLoading}
          />

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 text-center bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 text-white"
          >
            <div className="max-w-3xl mx-auto">
              <Icon 
                name="MessageSquare" 
                size={48} 
                className="text-accent mx-auto mb-6" 
              />
              <h3 className="text-3xl font-bold mb-4">
                ¿Necesitas una Cotización Personalizada?
              </h3>
              <p className="text-xl text-white/90 mb-8 text-balance">
                Nuestro equipo de expertos está listo para evaluar tu proyecto 
                y ofrecerte la mejor solución técnica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/contact-page'}
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl animation-spring shadow-glow-accent"
                >
                  <Icon name="MessageSquare" size={20} className="mr-2" />
                  Solicitar Cotización
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = 'tel:+573001234567'}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl animation-spring border border-white/20 backdrop-blur-sm"
                >
                  <Icon name="Phone" size={20} className="mr-2" />
                  Llamar Ahora
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      {/* Sticky Quote CTA */}
      <StickyQuoteCTA 
        showOnPages={['/services-overview']}
        customText="Cotizar Servicios"
      />
    </div>
  );
};

export default ServicesOverview;