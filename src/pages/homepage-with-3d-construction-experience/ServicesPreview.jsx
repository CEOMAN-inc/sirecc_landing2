import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

/**
 * ServicesPreview
 *
 * Presents a concise overview of SIRECC's core service lines based on the
 * portfolio. Each card highlights a category with a supporting image, key
 * features and a representative icon. A call‑to‑action at the bottom invites
 * visitors to schedule a consultation or explore the full services catalogue.
 */
const ServicesPreview = () => {
  // Portfolio‑informed service categories
  const services = [
    {
      id: 1,
      title: 'Obra Civil',
      description:
        'Desarrollamos proyectos de obra civil con estructuras sólidas y soluciones constructivas integrales.',
      icon: 'Home',
      image:
        'https://images.pexels.com/photos/2902758/pexels-photo-2902758.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Excavaciones y cimentaciones',
        'Estructuras en concreto y prefabricados',
        'Cerramientos, drywalls y trabajos en altura'
      ],
      color: 'from-secondary to-secondary/80'
    },
    {
      id: 2,
      title: 'Acabados',
      description:
        'Soluciones completas en acabados arquitectónicos, cuidando cada detalle para garantizar estética y funcionalidad.',
      icon: 'Brush',
      image:
        'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Ventanería y puertas',
        'Revestimientos y enchapes',
        'Cielos rasos y recubrimientos'
      ],
      color: 'from-accent to-accent/80'
    },
    {
      id: 3,
      title: 'Mantenimiento Locativo',
      description:
        'Programas de mantenimiento integral para conservar y mejorar las instalaciones existentes.',
      icon: 'Tool',
      image:
        'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Resane y pintura general',
        'Restauración de pisos y cubiertas',
        'Impermeabilización y plomería'
      ],
      color: 'from-success to-success/80'
    },
    {
      id: 4,
      title: 'Sistemas Eléctricos',
      description:
        'Diseño, instalación y mantenimiento de redes eléctricas seguras y eficientes.',
      icon: 'Zap',
      image:
        'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Redes de baja y media tensión',
        'Tableros y puesta a tierra',
        'Iluminación técnica y de emergencia'
      ],
      color: 'from-warning to-warning/80'
    },
    {
      id: 5,
      title: 'Hidrosanitarios',
      description:
        'Soluciones hidrosanitarias sostenibles para instalaciones hidráulicas y sanitarias.',
      icon: 'Droplet',
      image:
        'https://images.pexels.com/photos/1371458/pexels-photo-1371458.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Aparatos sanitarios eficientes',
        'Instalación de redes de agua potable y residual',
        'Conexiones para cuartos de bombas'
      ],
      color: 'from-primary to-primary/80'
    },
    {
      id: 6,
      title: 'Comunicaciones y Tecnología',
      description:
        'Integración de comunicaciones, informática y mobiliario especializado para entornos modernos.',
      icon: 'Phone',
      image:
        'https://images.pexels.com/photos/255376/pexels-photo-255376.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Centrales telefónicas y CCTV',
        'Equipos de cómputo y redes',
        'Mobiliario y control de acceso'
      ],
      color: 'from-info to-info/80'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground mb-6">
            Nuestras
            <span className="block text-transparent bg-gradient-to-r from-secondary to-accent bg-clip-text">
              Especialidades
            </span>
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conoce las líneas de servicio que brindan contexto general a nuestra oferta: abarcamos construcción, acabados, mantenimiento y sistemas especializados para todo tipo de proyectos.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services?.map((service, index) => (
            <motion.div
              key={service?.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-secondary/50 transition-all duration-300 construction-shadow hover:construction-shadow-lg group-hover:scale-105">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service?.image}
                    alt={service?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service?.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  />
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon name={service?.icon} size={24} className="text-secondary" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-8">
                  <h3 className="font-orbitron font-semibold text-xl text-foreground mb-4 group-hover:text-secondary transition-colors duration-300">
                    {service?.title}
                  </h3>
                  <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                    {service?.description}
                  </p>
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service?.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span className="font-inter text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Learn More Link */}
                  <div className="flex items-center space-x-2 text-secondary group-hover:text-accent transition-colors duration-300">
                    <span className="font-inter text-sm font-medium">Conocer más</span>
                    <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 border border-secondary/20">
            <h3 className="font-orbitron font-bold text-3xl text-foreground mb-4">
              ¿Listo para transformar tu espacio?
            </h3>
            <p className="font-inter text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nuestro equipo está preparado para asesorarte y hacer realidad tu proyecto. Agenda una consulta sin costo o explora más detalles de nuestros servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
                onClick={() => {
                  window.location.href = '/contact-quote-request';
                }}
              >
                Agendar Consulta
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Layers"
                iconPosition="left"
                className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                onClick={() => {
                  window.location.href = '/services-portfolio-showcase';
                }}
              >
                Ver Servicios
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;