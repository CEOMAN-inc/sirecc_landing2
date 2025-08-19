import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'ISO 9001:2015',
      description: 'Sistema de Gestión de Calidad',
      icon: 'Award',
      verified: true,
      color: 'from-secondary to-accent'
    },
    {
      id: 2,
      name: 'OHSAS 18001',
      description: 'Seguridad y Salud Ocupacional',
      icon: 'Shield',
      verified: true,
      color: 'from-accent to-primary'
    },
    {
      id: 3,
      name: 'ISO 14001',
      description: 'Gestión Ambiental',
      icon: 'Leaf',
      verified: true,
      color: 'from-primary to-secondary'
    },
    {
      id: 4,
      name: 'CAMACOL',
      description: 'Cámara Colombiana de la Construcción',
      icon: 'Building',
      verified: true,
      color: 'from-secondary/80 to-accent/80'
    }
  ];

  const clientLogos = [
    {
      id: 1,
      name: 'Constructora ABC',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center',
      sector: 'Residencial'
    },
    {
      id: 2,
      name: 'Inmobiliaria XYZ',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=60&fit=crop&crop=center',
      sector: 'Comercial'
    },
    {
      id: 3,
      name: 'Grupo Industrial DEF',
      logo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=120&h=60&fit=crop&crop=center',
      sector: 'Industrial'
    },
    {
      id: 4,
      name: 'Desarrollos GHI',
      logo: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=120&h=60&fit=crop&crop=center',
      sector: 'Infraestructura'
    },
    {
      id: 5,
      name: 'Constructora JKL',
      logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=60&fit=crop&crop=center',
      sector: 'Residencial'
    },
    {
      id: 6,
      name: 'Proyectos MNO',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&h=60&fit=crop&crop=center',
      sector: 'Comercial'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Carlos Rodríguez',
      position: 'Director de Proyectos',
      company: 'Constructora ABC',
      content: `SIRECC superó nuestras expectativas en cada fase del proyecto. Su profesionalismo y atención al detalle son excepcionales.`,
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      name: 'María González',
      position: 'Gerente General',
      company: 'Inmobiliaria XYZ',
      content: `La calidad de construcción y el cumplimiento de tiempos nos permitió entregar nuestro proyecto antes de lo previsto.`,
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'Andrés Martínez',
      position: 'Arquitecto Principal',
      company: 'Grupo Industrial DEF',
      content: `Su equipo técnico es altamente calificado y siempre encontraron soluciones innovadoras a los desafíos del proyecto.`,
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
    }
  ];

  const guarantees = [
    {
      icon: 'CheckCircle',
      title: 'Garantía de Calidad',
      description: '5 años en estructura y acabados',
      color: 'text-success'
    },
    {
      icon: 'Clock',
      title: 'Entrega Puntual',
      description: '98% de proyectos a tiempo',
      color: 'text-accent'
    },
    {
      icon: 'DollarSign',
      title: 'Presupuesto Fijo',
      description: 'Sin costos ocultos',
      color: 'text-secondary'
    },
    {
      icon: 'Headphones',
      title: 'Soporte 24/7',
      description: 'Atención continua durante obra',
      color: 'text-primary'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-xl p-6 construction-shadow border border-border/50"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
            <Icon name="Award" size={20} color="#ffffff" />
          </div>
          <div>
            <h3 className="font-orbitron font-semibold text-foreground text-lg">
              Certificaciones y Acreditaciones
            </h3>
            <p className="text-muted-foreground text-sm font-inter">
              Respaldados por estándares internacionales
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications?.map((cert, index) => (
            <motion.div
              key={cert?.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert?.color} flex items-center justify-center flex-shrink-0`}>
                <Icon name={cert?.icon} size={20} color="#ffffff" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-orbitron font-semibold text-foreground text-sm">
                    {cert?.name}
                  </h4>
                  {cert?.verified && (
                    <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
                  )}
                </div>
                <p className="text-muted-foreground text-xs font-inter">
                  {cert?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Client Logos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-xl p-6 construction-shadow border border-border/50"
      >
        <div className="text-center mb-6">
          <h3 className="font-orbitron font-semibold text-foreground text-lg mb-2">
            Clientes que Confían en Nosotros
          </h3>
          <p className="text-muted-foreground text-sm font-inter">
            Más de 300 proyectos exitosos con empresas líderes
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {clientLogos?.map((client, index) => (
            <motion.div
              key={client?.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="group relative bg-muted/20 rounded-lg p-4 hover:bg-muted/40 transition-all duration-200 hover:scale-105"
            >
              <div className="aspect-[2/1] bg-white rounded-md overflow-hidden mb-2">
                <img
                  src={client?.logo}
                  alt={client?.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-200"
                />
              </div>
              <p className="text-xs text-center text-muted-foreground font-inter">
                {client?.sector}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card rounded-xl p-6 construction-shadow border border-border/50"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="MessageSquare" size={20} color="#ffffff" />
          </div>
          <div>
            <h3 className="font-orbitron font-semibold text-foreground text-lg">
              Lo que Dicen Nuestros Clientes
            </h3>
            <p className="text-muted-foreground text-sm font-inter">
              Testimonios reales de proyectos completados
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="bg-muted/20 rounded-lg p-4 border border-border/30"
            >
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-inter font-semibold text-foreground text-sm">
                    {testimonial?.name}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {testimonial?.position}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial?.company}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-1 mb-3">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={14} className="text-secondary fill-current" />
                ))}
              </div>
              
              <p className="text-foreground text-sm font-inter leading-relaxed">
                "{testimonial?.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Guarantees */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20 rounded-xl p-6"
      >
        <div className="text-center mb-6">
          <h3 className="font-orbitron font-semibold text-foreground text-lg mb-2">
            Nuestras Garantías
          </h3>
          <p className="text-muted-foreground text-sm font-inter">
            Comprometidos con la excelencia en cada proyecto
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {guarantees?.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm"
            >
              <Icon 
                name={guarantee?.icon} 
                size={32} 
                className={`${guarantee?.color} mx-auto mb-3`} 
              />
              <h4 className="font-orbitron font-semibold text-foreground text-sm mb-1">
                {guarantee?.title}
              </h4>
              <p className="text-muted-foreground text-xs font-inter">
                {guarantee?.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TrustSignals;