import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectFilter = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  searchTerm, 
  onSearchChange,
  isOpen,
  onToggle 
}) => {
  const projectTypes = [
    { value: 'all', label: 'Todos los Proyectos', icon: 'Building' },
    { value: 'residential', label: 'Residencial', icon: 'Home' },
    { value: 'commercial', label: 'Comercial', icon: 'Building2' },
    { value: 'industrial', label: 'Industrial', icon: 'Factory' },
    { value: 'infrastructure', label: 'Infraestructura', icon: 'Bridge' }
  ];

  const projectScales = [
    { value: 'all', label: 'Todas las Escalas' },
    { value: 'small', label: 'Pequeña (&lt; 1000m²)' },
    { value: 'medium', label: 'Mediana (1000-5000m²)' },
    { value: 'large', label: 'Grande (&gt; 5000m²)' }
  ];

  const completionYears = [
    { value: 'all', label: 'Todos los Años' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' }
  ];

  const locations = [
    { value: 'all', label: 'Todas las Ubicaciones' },
    { value: 'bogota', label: 'Bogotá' },
    { value: 'medellin', label: 'Medellín' },
    { value: 'cali', label: 'Cali' },
    { value: 'barranquilla', label: 'Barranquilla' },
    { value: 'cartagena', label: 'Cartagena' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          iconName="Filter"
          iconPosition="left"
          onClick={onToggle}
          className="w-full"
        >
          Filtros {Object.values(filters)?.filter(v => v !== 'all')?.length > 0 && `(${Object.values(filters)?.filter(v => v !== 'all')?.length})`}
        </Button>
      </div>
      {/* Filter Sidebar */}
      <div className={`
        lg:block lg:sticky lg:top-24 lg:h-fit
        ${isOpen ? 'block' : 'hidden'}
        bg-card rounded-xl p-6 construction-shadow mb-6 lg:mb-0
      `}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-orbitron font-bold text-lg text-foreground">Filtros</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-secondary"
          >
            Limpiar
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Project Type Filter */}
        <div className="mb-6">
          <h4 className="font-inter font-semibold text-sm text-foreground mb-3">Tipo de Proyecto</h4>
          <div className="space-y-2">
            {projectTypes?.map((type) => (
              <button
                key={type?.value}
                onClick={() => handleFilterChange('type', type?.value)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left
                  transition-all duration-200 hover:bg-muted/50
                  ${filters?.type === type?.value 
                    ? 'bg-secondary/10 text-secondary border border-secondary/20' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={type?.icon} size={16} />
                <span className="text-sm">{type?.label}</span>
                {filters?.type === type?.value && (
                  <Icon name="Check" size={14} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Project Scale Filter */}
        <div className="mb-6">
          <h4 className="font-inter font-semibold text-sm text-foreground mb-3">Escala del Proyecto</h4>
          <div className="space-y-2">
            {projectScales?.map((scale) => (
              <button
                key={scale?.value}
                onClick={() => handleFilterChange('scale', scale?.value)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg text-left
                  transition-all duration-200 hover:bg-muted/50
                  ${filters?.scale === scale?.value 
                    ? 'bg-secondary/10 text-secondary border border-secondary/20' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <span className="text-sm" dangerouslySetInnerHTML={{ __html: scale?.label }} />
                {filters?.scale === scale?.value && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Completion Year Filter */}
        <div className="mb-6">
          <h4 className="font-inter font-semibold text-sm text-foreground mb-3">Año de Finalización</h4>
          <div className="space-y-2">
            {completionYears?.map((year) => (
              <button
                key={year?.value}
                onClick={() => handleFilterChange('year', year?.value)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg text-left
                  transition-all duration-200 hover:bg-muted/50
                  ${filters?.year === year?.value 
                    ? 'bg-secondary/10 text-secondary border border-secondary/20' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <span className="text-sm">{year?.label}</span>
                {filters?.year === year?.value && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="mb-6">
          <h4 className="font-inter font-semibold text-sm text-foreground mb-3">Ubicación</h4>
          <div className="space-y-2">
            {locations?.map((location) => (
              <button
                key={location?.value}
                onClick={() => handleFilterChange('location', location?.value)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg text-left
                  transition-all duration-200 hover:bg-muted/50
                  ${filters?.location === location?.value 
                    ? 'bg-secondary/10 text-secondary border border-secondary/20' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <span className="text-sm">{location?.label}</span>
                {filters?.location === location?.value && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {Object.values(filters)?.filter(v => v !== 'all')?.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h4 className="font-inter font-semibold text-sm text-foreground mb-2">Filtros Activos</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters)?.map(([key, value]) => {
                if (value === 'all') return null;
                return (
                  <span
                    key={key}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                  >
                    <span>{value}</span>
                    <button
                      onClick={() => handleFilterChange(key, 'all')}
                      className="hover:text-secondary/80"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectFilter;