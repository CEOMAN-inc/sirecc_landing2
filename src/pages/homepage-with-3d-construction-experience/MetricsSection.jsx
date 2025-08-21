import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

/**
 * MetricsSection
 *
 * Displays animated counters summarising the scale and track record of SIRECC.
 * Values and labels derive from the company's portfolio: projects executed,
 * years of trajectory, number of clients and compliance level. When the
 * section enters view, the counters animate up to their final values.
 */
const MetricsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });

  const [counters, setCounters] = useState({
    projects: 0,
    years: 0,
    clients: 0,
    compliance: 0
  });

  const metrics = [
    {
      key: 'projects',
      icon: 'Building2',
      value: 200,
      suffix: '+',
      label: 'Proyectos ejecutados',
      description: 'Obras y remodelaciones en toda Colombia',
      color: 'text-secondary'
    },
    {
      key: 'years',
      icon: 'Calendar',
      value: 15,
      suffix: '+',
      label: 'Años de trayectoria',
      description: 'Experiencia en construcción y mantenimiento',
      color: 'text-accent'
    },
    {
      key: 'clients',
      icon: 'Users',
      value: 30,
      suffix: '+',
      label: 'Clientes atendidos',
      description: 'Empresas e instituciones a nivel nacional',
      color: 'text-success'
    },
    {
      key: 'compliance',
      icon: 'ShieldCheck',
      value: 100,
      suffix: '%',
      label: 'Cumplimiento normativo',
      description: 'Seguridad y calidad en cada proyecto',
      color: 'text-warning'
    }
  ];

  useEffect(() => {
    if (!isInView) return;

    const animateCounters = () => {
      metrics?.forEach((metric) => {
        let start = 0;
        const end = metric?.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }

          setCounters((prev) => ({
            ...prev,
            [metric?.key]: Math.floor(start)
          }));
        }, 16);
      });
    };

    const timeout = setTimeout(animateCounters, 300);
    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground mb-6">
            Resultados que
            <span className="block text-transparent bg-gradient-to-r from-secondary to-accent bg-clip-text">
              Hablan por Sí Solos
            </span>
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Más de una década construyendo confianza, calidad y excelencia en cada proyecto que emprendemos.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics?.map((metric, index) => (
            <motion.div
              key={metric?.key}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              className="relative group"
            >
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 text-center hover:border-secondary/50 transition-all duration-300 construction-shadow hover:construction-shadow-lg group-hover:scale-105">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl mb-6 group-hover:from-secondary/30 group-hover:to-accent/30 transition-all duration-300">
                  <Icon name={metric?.icon} size={32} className={metric?.color} />
                </div>

                {/* Counter */}
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground">
                      {counters?.[metric?.key]}
                    </span>
                    <span className="font-orbitron font-bold text-2xl lg:text-3xl text-secondary">
                      {metric?.suffix}
                    </span>
                  </div>
                </div>

                {/* Label */}
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-2">
                  {metric?.label}
                </h3>

                {/* Description */}
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                  {metric?.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 bg-background/60 backdrop-blur-sm border border-border rounded-full px-8 py-4">
            <Icon name="TrendingUp" size={24} className="text-success" />
            <span className="font-inter text-lg text-foreground">
              Crecimiento constante desde 2008
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;