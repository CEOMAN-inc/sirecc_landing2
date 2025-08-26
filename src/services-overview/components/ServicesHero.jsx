import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesHero = () => {
  const complianceStandards = [
    { name: 'NTC 2050', description: 'Código Eléctrico Colombiano' },
    { name: 'NTC 1500', description: 'Código Colombiano de Fontanería' },
    { name: 'NTC 2505', description: 'Instalaciones de Gas' },
    { name: 'RETIE', description: 'Reglamento Técnico de Instalaciones Eléctricas' },
    { name: 'RETILAP', description: 'Reglamento Técnico de Iluminación y Alumbrado Público' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-secondary py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20">
              <Icon name="Building2" size={16} className="mr-2" />
              Servicios Técnicos Especializados
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance"
          >
            Soluciones Integrales de
            <span className="block text-accent">Construcción</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8 text-balance"
          >
            Ofrecemos nueve categorías de servicios técnicos especializados, 
            cumpliendo con las más altas normas de calidad y regulaciones colombianas 
            para proyectos institucionales y corporativos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              variant="default"
              size="lg"
              iconName="MessageSquare"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-white border-0 shadow-glow-accent"
              onClick={() => window.location.href = '/contact-page'}
            >
              Solicitar Cotización
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => window.location.href = 'tel:+573001234567'}
            >
              Contactar Ahora
            </Button>
          </motion.div>
        </div>

        {/* Compliance Standards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Cumplimiento Normativo Garantizado
            </h2>
            <p className="text-white/80">
              Todos nuestros servicios cumplen con las regulaciones técnicas colombianas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {complianceStandards?.map((standard, index) => (
              <motion.div
                key={standard?.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white/10 rounded-xl p-4 mb-3 group-hover:bg-white/20 animation-spring border border-white/10">
                  <Icon 
                    name="Shield" 
                    size={24} 
                    className="text-accent mx-auto mb-2" 
                  />
                  <div className="text-white font-semibold text-sm">
                    {standard?.name}
                  </div>
                </div>
                <p className="text-white/70 text-xs leading-tight">
                  {standard?.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    </section>
  );
};

export default ServicesHero;