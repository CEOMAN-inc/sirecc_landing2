import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

/**
 * TestimonialsSection
 *
 * Renders client testimonials drawn from the company's portfolio. Users can
 * navigate between testimonials using arrows or dots. A call‑to‑action at the
 * bottom encourages new visitors to join the list of satisfied clients.
 */
const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonials derived from real projects described in the portfolio
  const testimonials = [
    {
      id: 1,
      name: 'Equipo de Infraestructura',
      position: 'Hospital Universitario Clínica San Rafael',
      company: 'Bogotá, Colombia',
      avatar:
        'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=150',
      content:
        'En el Hospital Universitario Clínica San Rafael ampliamos y adecuamos áreas críticas como las unidades de cuidados intensivos y urgencias, instalando redes hidrosanitarias y eléctricas especiales y realizando acabados de asepsia. SIRECC demostró compromiso, calidad y cumplimiento excepcional en cada fase del proyecto.',
      rating: 5,
      project: 'UCI y áreas de urgencias',
      location: 'Bogotá, Colombia'
    },
    {
      id: 2,
      name: 'Equipo de Mantenimiento',
      position: 'Banco de Microfinanzas Bancamía',
      company: 'Colombia',
      avatar:
        'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=150',
      content:
        'SIRECC realizó el mantenimiento integral de nuestras oficinas a nivel nacional. Sus labores incluyeron la adecuación de accesos, mantenimiento de redes eléctricas, sanitarias, voz y datos, ajuste de mobiliario y mantenimiento de plantas eléctricas. Su eficiencia operativa y atención a los detalles superó nuestras expectativas.',
      rating: 5,
      project: 'Mantenimiento de oficinas Bancamía',
      location: 'Colombia'
    },
    {
      id: 3,
      name: 'Administrador',
      position: 'Comunidad Hermanos Maristas',
      company: 'Bogotá, Colombia',
      avatar:
        'https://images.pexels.com/photos/3775526/pexels-photo-3775526.jpeg?auto=compress&cs=tinysrgb&w=150',
      content:
        'El equipo de SIRECC ejecutó labores de mantenimiento integral en nuestras instalaciones: mantenimiento de infraestructuras, instalaciones eléctricas, resanes y pintura, cambio de enchapes, trabajo en alturas y ampliación de espacios. Su profesionalismo y capacidad de respuesta fueron notables.',
      rating: 5,
      project: 'Mantenimiento y adecuación de instalaciones',
      location: 'Bogotá, Colombia'
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/50 to-background">
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
            Lo que Dicen
            <span className="block text-transparent bg-gradient-to-r from-secondary to-accent bg-clip-text">
              Nuestros Clientes
            </span>
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            La satisfacción de nuestros clientes es nuestro mayor logro. Conoce las experiencias de quienes confiaron en nosotros.
          </p>
        </motion.div>

        {/* Testimonial Display */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 lg:p-12 construction-shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Client Info */}
                <div className="lg:col-span-1 text-center lg:text-left">
                  <div className="inline-block relative mb-6">
                    <Image
                      src={testimonials?.[activeTestimonial]?.avatar}
                      alt={testimonials?.[activeTestimonial]?.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-secondary/20"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="Quote" size={16} className="text-white" />
                    </div>
                  </div>
                  <h3 className="font-orbitron font-semibold text-xl text-foreground mb-2">
                    {testimonials?.[activeTestimonial]?.name}
                  </h3>
                  <p className="font-inter text-secondary font-medium mb-1">
                    {testimonials?.[activeTestimonial]?.position}
                  </p>
                  <p className="font-inter text-sm text-muted-foreground mb-4">
                    {testimonials?.[activeTestimonial]?.company}
                  </p>
                  {/* Rating */}
                  <div className="flex justify-center lg:justify-start space-x-1 mb-4">
                    {[...Array(testimonials?.[activeTestimonial]?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                    ))}
                  </div>
                  {/* Project Info */}
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="font-inter text-sm text-muted-foreground mb-1">Proyecto:</p>
                    <p className="font-inter font-medium text-foreground text-sm mb-2">
                      {testimonials?.[activeTestimonial]?.project}
                    </p>
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <Icon name="MapPin" size={14} className="text-accent" />
                      <span className="font-inter text-xs text-muted-foreground">
                        {testimonials?.[activeTestimonial]?.location}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Testimonial Content */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Icon
                      name="Quote"
                      size={48}
                      className="text-secondary/20 absolute -top-4 -left-4"
                    />
                    <blockquote className="font-inter text-lg lg:text-xl text-foreground leading-relaxed relative z-10">
                      {testimonials?.[activeTestimonial]?.content?.split('\n')?.map((paragraph, index) => (
                        <p key={index} className={index > 0 ? 'mt-4' : ''}>
                          {paragraph}
                        </p>
                      ))}
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              iconName="ChevronLeft"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-secondary/30 hover:border-secondary hover:bg-secondary hover:text-white"
            />
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-secondary scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              iconName="ChevronRight"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-secondary/30 hover:border-secondary hover:bg-secondary hover:text-white"
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="font-inter text-lg text-muted-foreground mb-6">
            ¿Quieres ser nuestro próximo cliente satisfecho?
          </p>
          <Button
            variant="default"
            size="lg"
            iconName="MessageSquare"
            iconPosition="left"
            className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
            onClick={() => {
              window.location.href = '/contact-quote-request';
            }}
          >
            Iniciar Mi Proyecto
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;