import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';
import Icon from '../../../components/AppIcon';


const ServicesGrid = ({ services, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(9)]?.map((_, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-elevation animate-pulse"
          >
            <div className="h-48 bg-muted" />
            <div className="p-6">
              <div className="h-6 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded mb-4" />
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-3/4" />
              </div>
              <div className="h-10 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (services?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-text-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            No se encontraron servicios
          </h3>
          <p className="text-text-secondary">
            Intenta ajustar los filtros para ver más opciones de servicios.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence mode="popLayout">
        {services?.map((service, index) => (
          <ServiceCard
            key={service?.id}
            service={service}
            index={index}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ServicesGrid;