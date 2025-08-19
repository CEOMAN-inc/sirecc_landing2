import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServiceCard from './components/ServiceCard';
import ServiceFilters from './components/ServiceFilters';
import FeaturedCaseStudies from './components/FeaturedCaseStudies';
import FloatingQuoteButton from './components/FloatingQuoteButton';
import AnimatedCraneIcon from './components/AnimatedCraneIcon';

const ServicesPortfolioShowcase = () => {
  const [filters, setFilters] = useState({});
  const [filteredServices, setFilteredServices] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Mock services data
  const services = [
    {
      id: 1,
      title: "Construcción Residencial Premium",
      category: "Residencial",
      description: "Desarrollamos proyectos residenciales de alta gama con tecnología de punta y diseños arquitectónicos innovadores que combinan funcionalidad, estética y sostenibilidad.",
      detailedDescription: "Especialistas en construcción residencial de lujo con más de 15 años de experiencia. Implementamos las últimas tecnologías en domótica, eficiencia energética y materiales sostenibles.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      icon: "Home",
      capabilities: ["Domótica Avanzada", "Eficiencia Energética", "Diseño Personalizado", "Materiales Premium"],
      projectsCompleted: 45,
      experienceYears: "15+",
      projectType: ["residential"],
      scale: ["medium", "large"],
      specialization: ["smart", "sustainable"]
    },
    {
      id: 2,
      title: "Edificios Comerciales Inteligentes",
      category: "Comercial",
      description: "Construcción de espacios comerciales modernos con sistemas inteligentes de gestión, optimización energética y diseños que maximizan la productividad empresarial.",
      detailedDescription: "Creamos espacios comerciales que impulsan el éxito empresarial mediante tecnología IoT, sistemas de automatización y diseños ergonómicos centrados en el usuario.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      icon: "Building",
      capabilities: ["Sistemas IoT", "Automatización", "Diseño Corporativo", "Certificación LEED"],
      projectsCompleted: 32,
      experienceYears: "12+",
      projectType: ["commercial"],
      scale: ["large"],
      specialization: ["smart", "sustainable"]
    },
    {
      id: 3,
      title: "Infraestructura Industrial",
      category: "Industrial",
      description: "Desarrollo de complejos industriales robustos con tecnología de automatización, cumpliendo los más altos estándares de seguridad y eficiencia operacional.",
      detailedDescription: "Construcción de instalaciones industriales de clase mundial con enfoque en seguridad, eficiencia y escalabilidad. Experiencia en sectores manufacturero, logístico y energético.",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
      icon: "Factory",
      capabilities: ["Automatización Industrial", "Seguridad Avanzada", "Logística Optimizada", "Normativas ISO"],
      projectsCompleted: 28,
      experienceYears: "18+",
      projectType: ["industrial"],
      scale: ["large"],
      specialization: ["consulting"]
    },
    {
      id: 4,
      title: "Renovación y Modernización",
      category: "Renovación",
      description: "Transformamos espacios existentes mediante renovaciones integrales que incorporan tecnologías modernas sin comprometer la funcionalidad operativa.",
      detailedDescription: "Especialistas en renovación de edificios históricos y modernización de infraestructuras existentes. Mantenemos la esencia arquitectónica mientras incorporamos tecnología de vanguardia.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      icon: "Wrench",
      capabilities: ["Restauración Histórica", "Modernización Tecnológica", "Eficiencia Energética", "Mínima Interrupción"],
      projectsCompleted: 67,
      experienceYears: "20+",
      projectType: ["residential", "commercial"],
      scale: ["small", "medium"],
      specialization: ["renovation", "sustainable"]
    },
    {
      id: 5,
      title: "Construcción Sostenible",
      category: "Sostenible",
      description: "Proyectos eco-friendly que minimizan el impacto ambiental mediante materiales sostenibles, energías renovables y sistemas de gestión de recursos.",
      detailedDescription: "Líderes en construcción verde con certificaciones internacionales. Implementamos tecnologías de energía solar, sistemas de recolección de agua lluvia y materiales reciclados.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      icon: "Leaf",
      capabilities: ["Energía Solar", "Gestión Hídrica", "Materiales Reciclados", "Certificación Verde"],
      projectsCompleted: 39,
      experienceYears: "10+",
      projectType: ["residential", "commercial"],
      scale: ["medium", "large"],
      specialization: ["sustainable"]
    },
    {
      id: 6,
      title: "Consultoría en Construcción",
      category: "Consultoría",
      description: "Servicios especializados de consultoría técnica, gestión de proyectos y supervisión de obras para garantizar la excelencia en cada fase constructiva.",
      detailedDescription: "Equipo multidisciplinario de ingenieros y arquitectos que brindan asesoría integral desde la conceptualización hasta la entrega final del proyecto.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      icon: "Users",
      capabilities: ["Gestión de Proyectos", "Supervisión Técnica", "Control de Calidad", "Optimización de Costos"],
      projectsCompleted: 156,
      experienceYears: "25+",
      projectType: ["residential", "commercial", "industrial"],
      scale: ["small", "medium", "large"],
      specialization: ["consulting"]
    }
  ];

  // Filter services based on active filters
  useEffect(() => {
    let filtered = services;

    Object.entries(filters)?.forEach(([category, values]) => {
      if (values && values?.length > 0) {
        filtered = filtered?.filter(service => 
          values?.some(value => service?.[category]?.includes(value))
        );
      }
    });

    setFilteredServices(filtered);
  }, [filters]);

  // Initialize filtered services
  useEffect(() => {
    setFilteredServices(services);
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Helmet>
        <title>Servicios y Portfolio - SIRECC Construction</title>
        <meta name="description" content="Descubre los servicios de construcción especializados de SIRECC: residencial, comercial, industrial y consultoría. Portfolio de proyectos exitosos en Colombia." />
        <meta name="keywords" content="servicios construcción, portfolio construcción, construcción residencial, construcción comercial, construcción industrial, consultoría construcción, SIRECC" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <AnimatedCraneIcon />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-background via-background to-muted/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                <Icon name="Wrench" size={16} className="mr-2 text-secondary" />
                <span className="text-sm font-medium text-secondary">Servicios Especializados</span>
              </div>
              
              <h1 className="font-orbitron font-bold text-4xl lg:text-6xl text-foreground mb-6">
                Construimos el
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                  Futuro de Colombia
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Descubre nuestro portfolio de servicios especializados en construcción. 
                Desde proyectos residenciales hasta complejos industriales, transformamos 
                visiones en realidades arquitectónicas excepcionales.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Eye"
                  iconPosition="left"
                  className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
                >
                  Explorar Servicios
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Phone"
                  iconPosition="left"
                  className="hover:border-secondary hover:text-secondary"
                >
                  Contactar Ahora
                </Button>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            >
              {[
                { label: "Proyectos Completados", value: "367+", icon: "Building" },
                { label: "Años de Experiencia", value: "25+", icon: "Calendar" },
                { label: "Clientes Satisfechos", value: "98%", icon: "Heart" },
                { label: "Certificaciones", value: "15+", icon: "Award" }
              ]?.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-card rounded-xl border border-border construction-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name={stat?.icon} size={24} color="#ffffff" />
                  </div>
                  <div className="font-orbitron font-bold text-2xl text-secondary mb-2">{stat?.value}</div>
                  <div className="text-sm text-muted-foreground">{stat?.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              {!isMobile && (
                <ServiceFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  isMobile={false}
                />
              )}

              {/* Services Grid */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-orbitron font-bold text-2xl text-foreground mb-2">
                      Nuestros Servicios
                    </h2>
                    <p className="text-muted-foreground">
                      {filteredServices?.length} servicio{filteredServices?.length !== 1 ? 's' : ''} disponible{filteredServices?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  {/* Sort Options */}
                  <div className="hidden md:flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">Ordenar por:</span>
                    <select className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground">
                      <option>Más Populares</option>
                      <option>Experiencia</option>
                      <option>Proyectos Completados</option>
                    </select>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredServices?.map((service, index) => (
                    <ServiceCard
                      key={service?.id}
                      service={service}
                      index={index}
                    />
                  ))}
                </div>

                {/* No Results */}
                {filteredServices?.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-orbitron font-bold text-xl text-foreground mb-2">
                      No se encontraron servicios
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Intenta ajustar los filtros para encontrar más opciones
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setFilters({})}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Limpiar Filtros
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Case Studies */}
        <FeaturedCaseStudies />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Icon name="Rocket" size={48} className="mx-auto mb-6 text-white" />
              <h2 className="font-orbitron font-bold text-3xl lg:text-4xl text-white mb-6">
                ¿Listo para Comenzar tu Proyecto?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Nuestro equipo de expertos está preparado para convertir tu visión en realidad. 
                Obtén una cotización personalizada y descubre por qué somos líderes en construcción.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="MessageSquare"
                  iconPosition="left"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => window.location.href = '/contact-quote-request'}
                >
                  Solicitar Cotización
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Phone"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Llamar Ahora
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mobile Filters */}
        {isMobile && (
          <ServiceFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            isMobile={true}
          />
        )}

        {/* Floating Quote Button */}
        <FloatingQuoteButton />
      </div>
    </>
  );
};

export default ServicesPortfolioShowcase;