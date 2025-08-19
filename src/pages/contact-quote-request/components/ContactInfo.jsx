import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactMethods = [
    {
      id: 1,
      icon: 'Phone',
      title: 'Teléfono Principal',
      primary: '+57 (1) 234-5678',
      secondary: 'Lun - Vie: 8:00 AM - 6:00 PM',
      action: 'tel:+5712345678',
      gradient: 'from-secondary to-accent'
    },
    {
      id: 2,
      icon: 'MessageSquare',
      title: 'WhatsApp Business',
      primary: '+57 300 123 4567',
      secondary: 'Respuesta inmediata 24/7',
      action: 'https://wa.me/573001234567',
      gradient: 'from-accent to-primary'
    },
    {
      id: 3,
      icon: 'Mail',
      title: 'Correo Electrónico',
      primary: 'cotizaciones@sirecc.com',
      secondary: 'Respuesta en 24 horas',
      action: 'mailto:cotizaciones@sirecc.com',
      gradient: 'from-primary to-secondary'
    },
    {
      id: 4,
      icon: 'MapPin',
      title: 'Oficina Principal',
      primary: 'Calle 100 #15-20, Bogotá',
      secondary: 'Zona Rosa, Chapinero',
      action: 'https://maps.google.com/?q=4.678,-74.048',
      gradient: 'from-secondary/80 to-accent/80'
    }
  ];

  const officeHours = [
    { day: 'Lunes - Viernes', hours: '8:00 AM - 6:00 PM' },
    { day: 'Sábados', hours: '9:00 AM - 2:00 PM' },
    { day: 'Domingos', hours: 'Solo emergencias' },
    { day: 'Festivos', hours: 'Cerrado' }
  ];

  const emergencyContact = {
    title: 'Línea de Emergencias 24/7',
    phone: '+57 300 999 8888',
    description: 'Para situaciones críticas en obra'
  };

  return (
    <div className="space-y-8">
      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactMethods?.map((method, index) => (
          <motion.div
            key={method?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <a
              href={method?.action}
              target={method?.action?.startsWith('http') ? '_blank' : '_self'}
              rel={method?.action?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block bg-card rounded-xl p-6 construction-shadow hover:construction-shadow-lg transition-all duration-300 hover:scale-105 border border-border/50 hover:border-accent/30"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method?.gradient} flex items-center justify-center flex-shrink-0 group-hover:glow-effect transition-all duration-300`}>
                  <Icon name={method?.icon} size={24} color="#ffffff" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-orbitron font-semibold text-foreground text-sm mb-1">
                    {method?.title}
                  </h3>
                  <p className="font-inter font-medium text-foreground text-base mb-1">
                    {method?.primary}
                  </p>
                  <p className="font-inter text-muted-foreground text-sm">
                    {method?.secondary}
                  </p>
                </div>
                
                <Icon 
                  name="ExternalLink" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-accent transition-colors duration-200 flex-shrink-0" 
                />
              </div>
            </a>
          </motion.div>
        ))}
      </div>
      {/* Office Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card rounded-xl p-6 construction-shadow border border-border/50"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Clock" size={20} color="#ffffff" />
          </div>
          <h3 className="font-orbitron font-semibold text-foreground text-lg">
            Horarios de Atención
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {officeHours?.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-3 rounded-lg bg-muted/30">
              <span className="font-inter text-foreground text-sm font-medium">
                {schedule?.day}
              </span>
              <span className="font-inter text-muted-foreground text-sm">
                {schedule?.hours}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-destructive/10 to-warning/10 border border-destructive/20 rounded-xl p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-destructive to-warning flex items-center justify-center flex-shrink-0 animate-pulse">
            <Icon name="AlertTriangle" size={24} color="#ffffff" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-orbitron font-semibold text-foreground text-base mb-1">
              {emergencyContact?.title}
            </h3>
            <a 
              href={`tel:${emergencyContact?.phone?.replace(/\s/g, '')}`}
              className="font-inter font-bold text-destructive text-lg hover:text-destructive/80 transition-colors duration-200"
            >
              {emergencyContact?.phone}
            </a>
            <p className="font-inter text-muted-foreground text-sm mt-1">
              {emergencyContact?.description}
            </p>
          </div>
          
          <a
            href={`tel:${emergencyContact?.phone?.replace(/\s/g, '')}`}
            className="bg-destructive hover:bg-destructive/90 text-white px-4 py-2 rounded-lg font-inter font-medium text-sm transition-colors duration-200 flex items-center space-x-2"
          >
            <Icon name="Phone" size={16} />
            <span>Llamar</span>
          </a>
        </div>
      </motion.div>
      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-accent/10 border border-accent/20 rounded-xl p-6"
      >
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-2">
              Información Importante
            </p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Las cotizaciones son completamente gratuitas</li>
              <li>• Realizamos visitas técnicas sin costo en Bogotá y alrededores</li>
              <li>• Tiempo de respuesta promedio: 24 horas</li>
              <li>• Atendemos proyectos desde $50M COP</li>
              <li>• Todos nuestros trabajos incluyen garantía</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;