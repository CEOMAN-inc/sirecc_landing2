import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const ServiceFilters = ({ filters, onFilterChange, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(!isMobile);

  const filterCategories = [
    {
      id: 'projectType',
      title: 'Tipo de Proyecto',
      options: [
        { value: 'residential', label: 'Residencial', count: 15 },
        { value: 'commercial', label: 'Comercial', count: 23 },
        { value: 'industrial', label: 'Industrial', count: 18 },
        { value: 'infrastructure', label: 'Infraestructura', count: 12 }
      ]
    },
    {
      id: 'scale',
      title: 'Escala del Proyecto',
      options: [
        { value: 'small', label: 'Pequeño (< $100M COP)', count: 28 },
        { value: 'medium', label: 'Mediano ($100M - $500M COP)', count: 19 },
        { value: 'large', label: 'Grande (> $500M COP)', count: 11 }
      ]
    },
    {
      id: 'specialization',
      title: 'Especialización',
      options: [
        { value: 'sustainable', label: 'Construcción Sostenible', count: 16 },
        { value: 'smart', label: 'Edificios Inteligentes', count: 9 },
        { value: 'renovation', label: 'Renovación', count: 22 },
        { value: 'consulting', label: 'Consultoría', count: 14 }
      ]
    }
  ];

  const handleFilterToggle = (category, value) => {
    const currentFilters = filters?.[category] || [];
    const newFilters = currentFilters?.includes(value)
      ? currentFilters?.filter(f => f !== value)
      : [...currentFilters, value];
    
    onFilterChange({
      ...filters,
      [category]: newFilters
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.reduce((count, filterArray) => count + (filterArray?.length || 0), 0);
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center construction-shadow-lg glow-effect"
        >
          <Icon name="Filter" size={24} color="#ffffff" />
          {getActiveFilterCount() > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{getActiveFilterCount()}</span>
            </div>
          )}
        </motion.button>
        {/* Mobile Filter Panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-100"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Panel */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-card construction-shadow-lg z-110 overflow-y-auto"
              >
                <FilterContent
                  filterCategories={filterCategories}
                  filters={filters}
                  onFilterToggle={handleFilterToggle}
                  onClearAll={clearAllFilters}
                  onClose={() => setIsOpen(false)}
                  isMobile={true}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="w-80 bg-card rounded-xl border border-border construction-shadow p-6 h-fit sticky top-24">
      <FilterContent
        filterCategories={filterCategories}
        filters={filters}
        onFilterToggle={handleFilterToggle}
        onClearAll={clearAllFilters}
        onClose={() => {}}
        isMobile={false}
      />
    </div>
  );
};

const FilterContent = ({ filterCategories, filters, onFilterToggle, onClearAll, onClose, isMobile }) => {
  const getActiveFilterCount = () => {
    return Object.values(filters)?.reduce((count, filterArray) => count + (filterArray?.length || 0), 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={16} color="#ffffff" />
          </div>
          <h3 className="font-orbitron font-bold text-lg text-foreground">Filtros</h3>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
          >
            <Icon name="X" size={20} color="currentColor" />
          </button>
        )}
      </div>
      {/* Active Filters Count & Clear */}
      {getActiveFilterCount() > 0 && (
        <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <span className="text-sm text-accent">
            {getActiveFilterCount()} filtro{getActiveFilterCount() > 1 ? 's' : ''} activo{getActiveFilterCount() > 1 ? 's' : ''}
          </span>
          <button
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors duration-200"
          >
            Limpiar Todo
          </button>
        </div>
      )}
      {/* Filter Categories */}
      <div className="space-y-6">
        {filterCategories?.map((category) => (
          <div key={category?.id} className="space-y-3">
            <h4 className="font-inter font-semibold text-sm text-foreground border-b border-border pb-2">
              {category?.title}
            </h4>
            <div className="space-y-2">
              {category?.options?.map((option) => (
                <motion.div
                  key={option?.value}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors duration-200"
                >
                  <Checkbox
                    label={option?.label}
                    checked={filters?.[category?.id]?.includes(option?.value) || false}
                    onChange={() => onFilterToggle(category?.id, option?.value)}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                    {option?.count}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Apply Button for Mobile */}
      {isMobile && (
        <div className="pt-6 border-t border-border">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-secondary to-accent rounded-lg font-inter font-medium text-white hover:from-secondary/90 hover:to-accent/90 transition-all duration-200"
          >
            Aplicar Filtros
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ServiceFilters;