import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ServicesPreview = () => {
  const services = [
    {
      id: 1,
      title: 'Construcción Residencial',
      description: 'Viviendas unifamiliares y multifamiliares con los más altos estándares de calidad y diseño arquitectónico moderno.',
      icon: 'Home',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Diseño personalizado', 'Materiales premium', 'Entrega garantizada'],
      color: 'from-secondary to-secondary/80'
    },
    {
      id: 2,
      title: 'Proyectos Comerciales',
      description: 'Centros comerciales, oficinas y espacios corporativos que impulsan el crecimiento empresarial y comercial.',
      icon: 'Building',
      image: 'https://images.pixabay.com/photo/2017/07/09/03/19/home-2486092_1280.jpg',
      features: ['Espacios funcionales', 'Tecnología integrada', 'Eficiencia energética'],
      color: 'from-accent to-accent/80'
    },
    {
      id: 3,
      title: 'Infraestructura Industrial',
      description: 'Plantas industriales, bodegas y complejos logísticos diseñados para optimizar procesos productivos.',
      icon: 'Factory',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      features: ['Estructuras robustas', 'Sistemas especializados', 'Cumplimiento normativo'],
      color: 'from-success to-success/80'
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
            Servicios
            <span className="block text-transparent bg-gradient-to-r from-secondary to-accent bg-clip-text">
              Especializados
            </span>
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ofrecemos soluciones integrales de construcción adaptadas a las necesidades específicas de cada cliente y proyecto.
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
                  <div className={`absolute inset-0 bg-gradient-to-t ${service?.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  
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
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="font-inter text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está listo para convertir tu visión en realidad. Solicita una consulta gratuita.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
                onClick={() => window.location.href = '/contact-quote-request'}
              >
                Agendar Consulta
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Eye"
                iconPosition="left"
                className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                onClick={() => window.location.href = '/services-portfolio-showcase'}
              >
                Ver Portafolio
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;