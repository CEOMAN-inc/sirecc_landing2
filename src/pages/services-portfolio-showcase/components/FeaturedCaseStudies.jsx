import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedCaseStudies = () => {
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = [
    {
      id: 1,
      title: "Torre Empresarial Futuro",
      category: "Comercial",
      location: "Bogotá, Colombia",
      duration: "18 meses",
      budget: "$2.8B COP",
      beforeImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      description: `Transformación completa de un edificio corporativo de 25 pisos en el centro de Bogotá, implementando tecnologías de construcción sostenible y sistemas inteligentes de gestión energética.`,
      challenges: [
        "Renovación sin interrumpir operaciones comerciales",
        "Integración de sistemas de automatización avanzados",
        "Cumplimiento de certificaciones ambientales LEED Gold"
      ],
      solutions: [
        "Construcción modular por fases",
        "Implementación de IoT y domótica",
        "Materiales eco-friendly y paneles solares"
      ],
      results: [
        "40% reducción en consumo energético",
        "Certificación LEED Gold obtenida",
        "100% satisfacción del cliente"
      ],
      client: {
        name: "Grupo Empresarial Andino",
        testimonial: `SIRECC superó nuestras expectativas. La renovación se completó a tiempo y el edificio ahora es un referente de sostenibilidad en la ciudad.`,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        position: "Director de Infraestructura"
      },
      technicalSpecs: [
        { label: "Área Total", value: "15,000 m²" },
        { label: "Pisos", value: "25 niveles" },
        { label: "Capacidad", value: "800 personas" },
        { label: "Eficiencia Energética", value: "Clase A+" }
      ]
    },
    {
      id: 2,
      title: "Complejo Residencial Verde",
      category: "Residencial",
      location: "Medellín, Colombia",
      duration: "24 meses",
      budget: "$4.2B COP",
      beforeImage: "https://images.unsplash.com/photo-1590725175499-8cb8e472b2e7?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      description: `Desarrollo de un complejo residencial de 180 apartamentos con enfoque en sostenibilidad ambiental y calidad de vida, incluyendo áreas verdes y espacios comunitarios innovadores.`,
      challenges: [
        "Terreno con pendiente pronunciada",
        "Integración con el ecosistema natural existente",
        "Optimización de espacios comunitarios"
      ],
      solutions: [
        "Diseño arquitectónico adaptado al terreno",
        "Conservación del 60% de vegetación nativa",
        "Espacios multifuncionales y flexibles"
      ],
      results: [
        "180 familias beneficiadas",
        "Certificación de construcción sostenible",
        "Premio Nacional de Arquitectura Verde 2024"
      ],
      client: {
        name: "Constructora Valle Verde",
        testimonial: `El proyecto superó todas nuestras expectativas. SIRECC demostró un compromiso excepcional con la sostenibilidad y la calidad.`,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        position: "Gerente de Proyectos"
      },
      technicalSpecs: [
        { label: "Apartamentos", value: "180 unidades" },
        { label: "Área Verde", value: "8,500 m²" },
        { label: "Torres", value: "4 edificios" },
        { label: "Ahorro Hídrico", value: "35%" }
      ]
    },
    {
      id: 3,
      title: "Centro Logístico Industrial",
      category: "Industrial",
      location: "Cali, Colombia",
      duration: "12 meses",
      budget: "$1.9B COP",
      beforeImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
      description: `Construcción de un moderno centro de distribución logística con tecnología automatizada, diseñado para optimizar la cadena de suministro y reducir tiempos de operación.`,
      challenges: [
        "Cronograma acelerado de construcción",
        "Integración de sistemas automatizados complejos",
        "Cumplimiento de normativas industriales estrictas"
      ],
      solutions: [
        "Construcción prefabricada y modular",
        "Coordinación especializada con proveedores tecnológicos",
        "Supervisión técnica continua"
      ],
      results: [
        "Entrega 2 semanas antes del plazo",
        "Sistema de automatización 100% funcional",
        "Certificación ISO 9001 de calidad"
      ],
      client: {
        name: "LogiCorp Colombia",
        testimonial: `SIRECC entregó un proyecto de clase mundial. La precisión técnica y el cumplimiento de plazos fueron excepcionales.`,
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        position: "Director de Operaciones"
      },
      technicalSpecs: [
        { label: "Área de Almacén", value: "25,000 m²" },
        { label: "Capacidad", value: "50,000 pallets" },
        { label: "Muelles de Carga", value: "32 posiciones" },
        { label: "Automatización", value: "95% procesos" }
      ]
    }
  ];

  const currentCase = caseStudies?.[activeCase];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Icon name="Award" size={16} className="mr-2 text-secondary" />
            <span className="text-sm font-medium text-secondary">Casos de Éxito</span>
          </div>
          <h2 className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground mb-6">
            Proyectos que Transforman
            <span className="block text-secondary">Ciudades y Vidas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubre cómo SIRECC ha revolucionado el panorama de la construcción en Colombia 
            con proyectos innovadores que combinan tecnología, sostenibilidad y excelencia.
          </p>
        </motion.div>

        {/* Case Study Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies?.map((caseStudy, index) => (
            <motion.button
              key={caseStudy?.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCase(index)}
              className={`px-6 py-3 rounded-lg font-inter font-medium text-sm transition-all duration-300 ${
                activeCase === index
                  ? 'bg-gradient-to-r from-secondary to-accent text-white construction-shadow-lg'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {caseStudy?.title}
            </motion.button>
          ))}
        </div>

        {/* Main Case Study Display */}
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Before/After Images */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-inter font-semibold text-sm text-muted-foreground">ANTES</h4>
                <div className="relative overflow-hidden rounded-xl construction-shadow">
                  <Image
                    src={currentCase?.beforeImage}
                    alt={`${currentCase?.title} - Antes`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-inter font-semibold text-sm text-secondary">DESPUÉS</h4>
                <div className="relative overflow-hidden rounded-xl construction-shadow border-2 border-secondary/20">
                  <Image
                    src={currentCase?.afterImage}
                    alt={`${currentCase?.title} - Después`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h4 className="font-orbitron font-bold text-lg text-foreground mb-4">
                Especificaciones Técnicas
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {currentCase?.technicalSpecs?.map((spec, index) => (
                  <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="font-orbitron font-bold text-lg text-secondary">{spec?.value}</div>
                    <div className="text-xs text-muted-foreground">{spec?.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent">
                  {currentCase?.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} className="inline mr-1" />
                  {currentCase?.location}
                </span>
              </div>
              <h3 className="font-orbitron font-bold text-3xl text-foreground mb-4">
                {currentCase?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentCase?.description}
              </p>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl border border-secondary/20">
              <div className="text-center">
                <div className="font-orbitron font-bold text-2xl text-secondary">{currentCase?.duration}</div>
                <div className="text-sm text-muted-foreground">Duración</div>
              </div>
              <div className="text-center">
                <div className="font-orbitron font-bold text-2xl text-accent">{currentCase?.budget}</div>
                <div className="text-sm text-muted-foreground">Presupuesto</div>
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-inter font-semibold text-foreground flex items-center">
                  <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
                  Desafíos
                </h4>
                <ul className="space-y-2">
                  {currentCase?.challenges?.map((challenge, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <Icon name="Minus" size={12} className="mr-2 mt-1 text-warning flex-shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-inter font-semibold text-foreground flex items-center">
                  <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
                  Soluciones
                </h4>
                <ul className="space-y-2">
                  {currentCase?.solutions?.map((solution, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <Icon name="Check" size={12} className="mr-2 mt-1 text-success flex-shrink-0" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-3">
              <h4 className="font-inter font-semibold text-foreground flex items-center">
                <Icon name="Trophy" size={16} className="mr-2 text-secondary" />
                Resultados Obtenidos
              </h4>
              <div className="grid gap-2">
                {currentCase?.results?.map((result, index) => (
                  <div key={index} className="flex items-center p-3 bg-success/10 border border-success/20 rounded-lg">
                    <Icon name="CheckCircle" size={16} className="mr-3 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Testimonial */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-start space-x-4">
                <Image
                  src={currentCase?.client?.avatar}
                  alt={currentCase?.client?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <blockquote className="text-muted-foreground italic mb-3">
                    "{currentCase?.client?.testimonial}"
                  </blockquote>
                  <div>
                    <div className="font-inter font-semibold text-foreground">{currentCase?.client?.name}</div>
                    <div className="text-sm text-muted-foreground">{currentCase?.client?.position}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              variant="default"
              size="lg"
              iconName="ExternalLink"
              iconPosition="right"
              fullWidth
              className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
            >
              Ver Proyecto Completo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;