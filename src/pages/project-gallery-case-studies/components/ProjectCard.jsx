import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails }) => {
  return (
    <div className="group relative bg-card rounded-xl overflow-hidden construction-shadow hover:construction-shadow-lg transition-all duration-300 hover:scale-105">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Project Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-secondary/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            {project?.type}
          </span>
        </div>

        {/* Featured Badge */}
        {project?.featured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 px-2 py-1 bg-accent/90 text-background text-xs font-medium rounded-full backdrop-blur-sm">
              <Icon name="Star" size={12} />
              <span>Destacado</span>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
            onClick={() => onViewDetails(project)}
          >
            Ver Detalles
          </Button>
        </div>
      </div>
      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-orbitron font-bold text-lg text-foreground group-hover:text-secondary transition-colors duration-200">
            {project?.name}
          </h3>
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <Icon name="MapPin" size={14} />
            <span>{project?.location}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project?.description}
        </p>

        {/* Project Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Completado</p>
              <p className="text-sm font-medium text-foreground">{project?.completionDate}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Duración</p>
              <p className="text-sm font-medium text-foreground">{project?.duration}</p>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Ruler" size={14} className="text-secondary" />
              <span className="text-muted-foreground">{project?.size}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} className="text-secondary" />
              <span className="text-muted-foreground">{project?.budget}</span>
            </div>
          </div>
          
          {project?.rating && (
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < project?.rating ? "text-warning fill-current" : "text-muted-foreground"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;