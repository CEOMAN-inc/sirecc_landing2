import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-card border border-border construction-shadow-lg hover:construction-shadow-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Service Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={service?.image}
          alt={service?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Metallic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Neon Border Effect */}
        <div className={`absolute inset-0 border-2 transition-all duration-500 ${
          isHovered ? 'border-accent glow-effect' : 'border-transparent'
        }`} />
        
        {/* Service Icon */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-secondary/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Icon name={service?.icon} size={24} color="#ffffff" />
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <span className="text-xs font-medium text-accent">{service?.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-orbitron font-bold text-xl text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
          {service?.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {service?.description}
        </p>

        {/* Key Capabilities */}
        <div className="space-y-2 mb-6">
          <h4 className="font-inter font-semibold text-sm text-foreground">Capacidades Clave:</h4>
          <div className="flex flex-wrap gap-2">
            {service?.capabilities?.map((capability, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
              >
                <Icon name="Check" size={12} className="mr-1 text-success" />
                {capability}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="font-orbitron font-bold text-lg text-secondary">{service?.projectsCompleted}+</div>
            <div className="text-xs text-muted-foreground">Proyectos</div>
          </div>
          <div className="text-center">
            <div className="font-orbitron font-bold text-lg text-accent">{service?.experienceYears}</div>
            <div className="text-xs text-muted-foreground">Años Exp.</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            className="flex-1 hover:border-secondary hover:text-secondary"
          >
            Ver Detalles
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            className="flex-1 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
          >
            Consultar
          </Button>
        </div>
      </div>
      {/* Hover Details Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-background/95 backdrop-blur-sm p-6 flex flex-col justify-center"
        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        <div className="text-center">
          <Icon name={service?.icon} size={48} className="mx-auto mb-4 text-secondary" />
          <h3 className="font-orbitron font-bold text-xl text-foreground mb-3">{service?.title}</h3>
          <p className="text-muted-foreground text-sm mb-6">{service?.detailedDescription}</p>
          
          <div className="space-y-3">
            <Button
              variant="default"
              size="default"
              iconName="ArrowRight"
              iconPosition="right"
              fullWidth
              className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
            >
              Explorar Servicio
            </Button>
            <Button
              variant="outline"
              size="default"
              iconName="Phone"
              iconPosition="left"
              fullWidth
              className="hover:border-accent hover:text-accent"
            >
              Solicitar Cotización
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;