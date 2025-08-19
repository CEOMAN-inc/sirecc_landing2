import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: 'Info' },
    { id: 'gallery', label: 'Galería', icon: 'Images' },
    { id: 'timeline', label: 'Cronología', icon: 'Clock' },
    { id: 'testimonial', label: 'Testimonio', icon: 'MessageSquare' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project?.gallery?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project?.gallery?.length) % project?.gallery?.length);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-card rounded-2xl construction-shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Building" size={24} color="white" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-xl text-foreground">
                {project?.name}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{project?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{project?.completionDate}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 px-6 py-4 font-inter font-medium text-sm
                transition-all duration-200 border-b-2
                ${activeTab === tab?.id
                  ? 'text-secondary border-secondary bg-secondary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Image */}
              <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
                <Image
                  src={project?.image}
                  alt={project?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-secondary/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                    {project?.type}
                  </span>
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Description */}
                <div>
                  <h3 className="font-orbitron font-bold text-lg text-foreground mb-4">
                    Descripción del Proyecto
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project?.fullDescription}
                  </p>

                  {/* Key Features */}
                  <h4 className="font-inter font-semibold text-foreground mb-3">
                    Características Principales
                  </h4>
                  <ul className="space-y-2">
                    {project?.keyFeatures?.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Metrics */}
                <div>
                  <h3 className="font-orbitron font-bold text-lg text-foreground mb-4">
                    Especificaciones Técnicas
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Ruler" size={18} className="text-secondary" />
                        <span className="font-inter font-medium text-foreground">Área Total</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{project?.size}</p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Clock" size={18} className="text-secondary" />
                        <span className="font-inter font-medium text-foreground">Duración</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{project?.duration}</p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="DollarSign" size={18} className="text-secondary" />
                        <span className="font-inter font-medium text-foreground">Presupuesto</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{project?.budget}</p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Users" size={18} className="text-secondary" />
                        <span className="font-inter font-medium text-foreground">Equipo</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{project?.teamSize}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={project?.gallery?.[currentImageIndex]}
                  alt={`${project?.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation */}
                {project?.gallery?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                    >
                      <Icon name="ChevronLeft" size={20} color="white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                    >
                      <Icon name="ChevronRight" size={20} color="white" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-sm text-foreground">
                  {currentImageIndex + 1} / {project?.gallery?.length}
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
                {project?.gallery?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`
                      relative h-20 rounded-lg overflow-hidden transition-all duration-200
                      ${index === currentImageIndex 
                        ? 'ring-2 ring-secondary scale-105' :'hover:scale-105 opacity-70 hover:opacity-100'
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h3 className="font-orbitron font-bold text-lg text-foreground">
                Cronología del Proyecto
              </h3>
              <div className="space-y-6">
                {project?.timeline?.map((phase, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <Icon name={phase?.icon} size={20} color="white" />
                      </div>
                      {index < project?.timeline?.length - 1 && (
                        <div className="w-0.5 h-16 bg-border mt-4" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-inter font-semibold text-foreground">
                          {phase?.title}
                        </h4>
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          {phase?.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {phase?.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Icon name="Calendar" size={12} />
                        <span>{phase?.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonial Tab */}
          {activeTab === 'testimonial' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={project?.client?.avatar}
                    alt={project?.client?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-foreground mb-2">
                  {project?.client?.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {project?.client?.position} - {project?.client?.company}
                </p>
              </div>

              <div className="bg-muted/30 rounded-xl p-8 relative">
                <Icon 
                  name="Quote" 
                  size={40} 
                  className="text-secondary/30 absolute top-4 left-4" 
                />
                <blockquote className="text-lg text-foreground leading-relaxed italic pl-12">
                  {project?.testimonial}
                </blockquote>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className={i < project?.rating ? "text-warning fill-current" : "text-muted-foreground"}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm ml-2">
                  {project?.rating}/5 estrellas
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <div className="text-sm text-muted-foreground">
            ¿Interesado en un proyecto similar?
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Descargar PDF
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
              className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
              onClick={() => window.location.href = '/contact-quote-request'}
            >
              Solicitar Cotización
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;