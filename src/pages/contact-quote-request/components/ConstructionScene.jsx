import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ConstructionScene = () => {
  const sceneRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState(0);

  const sceneViews = [
    {
      id: 0,
      title: 'Vista General',
      description: 'Panorámica completa del sitio de construcción',
      icon: 'Building2'
    },
    {
      id: 1,
      title: 'Grúa Torre',
      description: 'Equipos especializados en altura',
      icon: 'Crane'
    },
    {
      id: 2,
      title: 'Zona de Trabajo',
      description: 'Área activa de construcción',
      icon: 'HardHat'
    }
  ];

  const constructionStats = [
    {
      icon: 'Users',
      value: '50+',
      label: 'Ingenieros',
      color: 'from-secondary to-accent'
    },
    {
      icon: 'Truck',
      value: '25+',
      label: 'Equipos',
      color: 'from-accent to-primary'
    },
    {
      icon: 'Award',
      value: '15+',
      label: 'Años',
      color: 'from-primary to-secondary'
    },
    {
      icon: 'CheckCircle',
      value: '300+',
      label: 'Proyectos',
      color: 'from-secondary/80 to-accent/80'
    }
  ];

  useEffect(() => {
    // Simulate 3D scene loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-rotate views
    const interval = setInterval(() => {
      setCurrentView(prev => (prev + 1) % sceneViews?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full bg-gradient-to-br from-background via-primary/5 to-secondary/5 rounded-2xl overflow-hidden">
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-orbitron font-semibold text-foreground text-lg mb-2">
              Cargando Escena 3D
            </p>
            <p className="text-muted-foreground text-sm font-inter">
              Preparando visualización del sitio...
            </p>
          </div>
        </div>
      )}
      {/* 3D Scene Container */}
      <div 
        ref={sceneRef}
        className="relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      >
        {/* Simulated 3D Background */}
        <div className="absolute inset-0">
          {/* Sky Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-slate-800/40 to-slate-900" />
          
          {/* City Silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 via-slate-800/80 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
          </div>
          
          {/* Construction Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Main Crane */}
            <div className="relative">
              <motion.div
                animate={{ 
                  rotateY: currentView * 120,
                  scale: currentView === 1 ? 1.2 : 1
                }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="w-64 h-64 relative"
              >
                {/* Crane Base */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-32 bg-gradient-to-t from-secondary to-accent rounded-t-lg shadow-lg" />
                
                {/* Crane Arm */}
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 -translate-y-4 w-48 h-3 bg-gradient-to-r from-secondary to-accent rounded-full shadow-lg origin-left rotate-12" />
                
                {/* Hook */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-20 right-8 w-2 h-8 bg-accent rounded-full shadow-lg"
                />
                
                {/* SIRECC Logo on Hook */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotateZ: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: 'easeInOut',
                    rotateZ: { duration: 4, repeat: Infinity }
                  }}
                  className="absolute bottom-12 right-4 bg-gradient-to-br from-secondary to-accent rounded-lg p-2 shadow-lg"
                >
                  <Icon name="Building2" size={16} color="#ffffff" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Floating Particles */}
          {[...Array(12)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
            />
          ))}
          
          {/* Work Lights */}
          <div className="absolute top-8 left-8 w-4 h-4 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" />
          <div className="absolute top-16 right-12 w-3 h-3 bg-secondary rounded-full animate-pulse shadow-lg shadow-secondary/50" />
          <div className="absolute bottom-24 left-16 w-2 h-2 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" />
        </div>
      </div>
      {/* Scene Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute top-6 left-6 right-6"
      >
        <div className="flex items-center justify-between">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 construction-shadow">
            <h3 className="font-orbitron font-bold text-foreground text-sm mb-1">
              Visualización 3D
            </h3>
            <p className="text-muted-foreground text-xs font-inter">
              {sceneViews?.[currentView]?.description}
            </p>
          </div>
          
          <div className="flex space-x-2">
            {sceneViews?.map((view, index) => (
              <button
                key={view?.id}
                onClick={() => setCurrentView(index)}
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                  ${currentView === index
                    ? 'bg-gradient-to-br from-secondary to-accent text-white construction-shadow-lg'
                    : 'bg-card/90 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
                title={view?.title}
              >
                <Icon name={view?.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Construction Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-6 left-6 right-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {constructionStats?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              className="bg-card/90 backdrop-blur-sm rounded-lg p-3 construction-shadow text-center"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat?.color} flex items-center justify-center mx-auto mb-2`}>
                <Icon name={stat?.icon} size={16} color="#ffffff" />
              </div>
              <p className="font-orbitron font-bold text-foreground text-lg leading-none">
                {stat?.value}
              </p>
              <p className="text-muted-foreground text-xs font-inter">
                {stat?.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Brand Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 0.7 : 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
            <Icon name="Building2" size={32} className="text-accent/60" />
          </div>
          <p className="font-orbitron font-bold text-2xl text-foreground/30">
            SIRECC
          </p>
          <p className="font-inter text-sm text-muted-foreground/50">
            Construction Excellence
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ConstructionScene;