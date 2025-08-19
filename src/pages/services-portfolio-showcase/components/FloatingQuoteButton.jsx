import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingQuoteButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show button after scrolling 100vh
      setIsVisible(scrollY > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuoteRequest = () => {
    // Navigate to contact page
    window.location.href = '/contact-quote-request';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div
            className="relative"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-0 right-16 mb-2 mr-2"
                >
                  <div className="bg-card border border-border rounded-xl construction-shadow-lg p-4 w-64">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                        <Icon name="Calculator" size={16} color="#ffffff" />
                      </div>
                      <div>
                        <h4 className="font-orbitron font-bold text-sm text-foreground">Cotización Gratuita</h4>
                        <p className="text-xs text-muted-foreground">Respuesta en 24 horas</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-4">
                      Obtén una cotización personalizada para tu proyecto de construcción
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Icon name="Clock" size={12} className="mr-1 text-accent" />
                        <span>Rápido</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Shield" size={12} className="mr-1 text-success" />
                        <span>Seguro</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Award" size={12} className="mr-1 text-secondary" />
                        <span>Profesional</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="default"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      fullWidth
                      onClick={handleQuoteRequest}
                      className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-xs"
                    >
                      Solicitar Ahora
                    </Button>
                  </div>
                  
                  {/* Arrow pointing to button */}
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-card border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuoteRequest}
              className="relative w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center construction-shadow-lg glow-effect overflow-hidden group"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Pulse Animation */}
              <div className="absolute inset-0 rounded-full bg-secondary/30 animate-ping" />
              
              {/* Icon */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <Icon 
                  name={isExpanded ? "X" : "MessageSquare"} 
                  size={24} 
                  color="#ffffff" 
                />
              </motion.div>
              
              {/* Notification Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', damping: 15 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center"
              >
                <span className="text-xs font-bold text-white">!</span>
              </motion.div>
            </motion.button>

            {/* Tooltip for mobile */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none md:hidden">
              Cotización Gratuita
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-background/90"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingQuoteButton;