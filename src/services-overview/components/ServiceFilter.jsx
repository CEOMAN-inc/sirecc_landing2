import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceFilter = ({ 
  activeFilter, 
  onFilterChange, 
  filterCounts,
  isFilterOpen,
  onToggleFilter 
}) => {
  const filterOptions = [
    { 
      key: 'all', 
      label: 'Todos los Servicios', 
      icon: 'Grid3X3',
      count: filterCounts?.all 
    },
    { 
      key: 'construccion', 
      label: 'Construcción', 
      icon: 'Building2',
      count: filterCounts?.construccion 
    },
    { 
      key: 'mantenimiento', 
      label: 'Mantenimiento', 
      icon: 'Wrench',
      count: filterCounts?.mantenimiento 
    },
    { 
      key: 'instalaciones', 
      label: 'Instalaciones', 
      icon: 'Zap',
      count: filterCounts?.instalaciones 
    },
    { 
      key: 'certificado', 
      label: 'Certificados', 
      icon: 'Shield',
      count: filterCounts?.certificado 
    }
  ];

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggleFilter}
          iconName={isFilterOpen ? "X" : "Filter"}
          iconPosition="left"
          className="w-full justify-center"
        >
          {isFilterOpen ? 'Cerrar Filtros' : 'Filtrar Servicios'}
        </Button>
      </div>
      {/* Filter Options */}
      <motion.div
        initial={false}
        animate={{
          height: isFilterOpen ? 'auto' : 'auto',
          opacity: 1
        }}
        className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}
      >
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {filterOptions?.map((option) => (
            <motion.button
              key={option?.key}
              onClick={() => onFilterChange(option?.key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium
                animation-spring border
                ${activeFilter === option?.key
                  ? 'bg-accent text-white border-accent shadow-glow-accent'
                  : 'bg-white text-text-secondary border-border hover:border-accent hover:text-accent hover:bg-accent/5'
                }
              `}
            >
              <Icon 
                name={option?.icon} 
                size={16} 
                className={activeFilter === option?.key ? 'text-white' : 'text-current'} 
              />
              <span>{option?.label}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-semibold
                ${activeFilter === option?.key
                  ? 'bg-white/20 text-white' :'bg-muted text-text-secondary'
                }
              `}>
                {option?.count}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceFilter;