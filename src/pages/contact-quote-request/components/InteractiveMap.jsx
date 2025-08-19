import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState('bogota');

  const serviceAreas = [
    {
      id: 'bogota',
      name: 'Bogotá D.C.',
      description: 'Oficina principal y área de cobertura completa',
      coordinates: { lat: 4.7110, lng: -74.0721 },
      projects: 150,
      responseTime: '24 horas',
      services: ['Construcción', 'Diseño', 'Consultoría', 'Mantenimiento'],
      isMain: true
    },
    {
      id: 'medellin',
      name: 'Medellín',
      description: 'Oficina regional con equipo especializado',
      coordinates: { lat: 6.2442, lng: -75.5812 },
      projects: 85,
      responseTime: '48 horas',
      services: ['Construcción', 'Consultoría'],
      isMain: false
    },
    {
      id: 'cali',
      name: 'Cali',
      description: 'Cobertura regional para el Valle del Cauca',
      coordinates: { lat: 3.4516, lng: -76.5320 },
      projects: 62,
      responseTime: '48 horas',
      services: ['Construcción', 'Mantenimiento'],
      isMain: false
    },
    {
      id: 'barranquilla',
      name: 'Barranquilla',
      description: 'Servicios especializados en la Costa Atlántica',
      coordinates: { lat: 10.9639, lng: -74.7964 },
      projects: 43,
      responseTime: '72 horas',
      services: ['Construcción'],
      isMain: false
    }
  ];

  const currentArea = serviceAreas?.find(area => area?.id === selectedLocation);

  return (
    <div className="bg-card rounded-2xl construction-shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Icon name="MapPin" size={24} color="#ffffff" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-xl text-white">
              Áreas de Cobertura
            </h2>
            <p className="text-white/80 text-sm font-inter">
              Selecciona tu ciudad para ver información específica
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Location Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {serviceAreas?.map((area) => (
            <button
              key={area?.id}
              onClick={() => setSelectedLocation(area?.id)}
              className={`
                relative p-3 rounded-lg text-left transition-all duration-200
                ${selectedLocation === area?.id
                  ? 'bg-gradient-to-br from-secondary to-accent text-white construction-shadow-lg'
                  : 'bg-muted/30 hover:bg-muted/50 text-foreground hover:scale-105'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <Icon 
                  name={area?.isMain ? "Building2" : "MapPin"} 
                  size={16} 
                  className={selectedLocation === area?.id ? "text-white" : "text-accent"}
                />
                <span className="font-inter font-medium text-sm">
                  {area?.name}
                </span>
              </div>
              {area?.isMain && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Map Container */}
        <div className="relative bg-muted/20 rounded-xl overflow-hidden mb-6" style={{ height: '300px' }}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={`Mapa de ${currentArea?.name}`}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${currentArea?.coordinates?.lat},${currentArea?.coordinates?.lng}&z=12&output=embed`}
            className="border-0"
          />
          
          {/* Overlay Info */}
          <motion.div
            key={selectedLocation}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 construction-shadow max-w-xs"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                currentArea?.isMain 
                  ? 'bg-gradient-to-br from-secondary to-accent' :'bg-gradient-to-br from-primary to-secondary'
              }`}>
                <Icon 
                  name={currentArea?.isMain ? "Building2" : "MapPin"} 
                  size={16} 
                  color="#ffffff" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-orbitron font-semibold text-foreground text-sm mb-1">
                  {currentArea?.name}
                  {currentArea?.isMain && (
                    <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded-full">
                      Principal
                    </span>
                  )}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {currentArea?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Location Details */}
        <motion.div
          key={selectedLocation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Projects Count */}
          <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Icon name="Building" size={20} color="#ffffff" />
              </div>
              <div>
                <p className="font-orbitron font-bold text-2xl text-foreground">
                  {currentArea?.projects}
                </p>
                <p className="text-muted-foreground text-sm font-inter">
                  Proyectos Completados
                </p>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Clock" size={20} color="#ffffff" />
              </div>
              <div>
                <p className="font-orbitron font-bold text-lg text-foreground">
                  {currentArea?.responseTime}
                </p>
                <p className="text-muted-foreground text-sm font-inter">
                  Tiempo de Respuesta
                </p>
              </div>
            </div>
          </div>

          {/* Services Available */}
          <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                <Icon name="Wrench" size={20} color="#ffffff" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-orbitron font-semibold text-foreground text-sm mb-2">
                  Servicios Disponibles
                </p>
                <div className="flex flex-wrap gap-1">
                  {currentArea?.services?.map((service, index) => (
                    <span
                      key={index}
                      className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded-full font-inter"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <div className="mt-6 bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-orbitron font-semibold text-foreground text-sm mb-1">
                ¿Tu proyecto está en {currentArea?.name}?
              </p>
              <p className="text-muted-foreground text-sm font-inter">
                Contáctanos para una evaluación gratuita del sitio
              </p>
            </div>
            <a
              href="tel:+5712345678"
              className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white px-4 py-2 rounded-lg font-inter font-medium text-sm transition-all duration-200 hover:scale-105 glow-effect flex items-center space-x-2"
            >
              <Icon name="Phone" size={16} />
              <span>Llamar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;