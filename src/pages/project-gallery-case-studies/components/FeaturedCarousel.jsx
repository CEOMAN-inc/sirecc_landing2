import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedCarousel = ({ featuredProjects, onViewDetails }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProjects?.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects?.length) % featuredProjects?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!featuredProjects?.length) return null;

  const currentProject = featuredProjects?.[currentSlide];

  return (
    <div className="relative bg-card rounded-2xl overflow-hidden construction-shadow-lg mb-12">
      {/* Main Carousel */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={currentProject?.image}
            alt={currentProject?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-10"
          aria-label="Previous slide"
        >
          <Icon name="ChevronLeft" size={24} color="white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-10"
          aria-label="Next slide"
        >
          <Icon name="ChevronRight" size={24} color="white" />
        </button>

        {/* Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {/* Featured Badge */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1 px-3 py-1 bg-accent/90 text-background text-sm font-medium rounded-full backdrop-blur-sm">
                  <Icon name="Star" size={16} />
                  <span>Proyecto Destacado</span>
                </div>
                <span className="px-3 py-1 bg-secondary/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                  {currentProject?.type}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-orbitron font-bold text-3xl lg:text-4xl text-white mb-4">
                {currentProject?.name}
              </h2>

              {/* Location & Date */}
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2 text-white/80">
                  <Icon name="MapPin" size={18} />
                  <span className="font-inter">{currentProject?.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Icon name="Calendar" size={18} />
                  <span className="font-inter">{currentProject?.completionDate}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                {currentProject?.description}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Ruler" size={18} className="text-accent" />
                    <span className="text-white/80 text-sm">Tamaño</span>
                  </div>
                  <p className="text-white font-semibold">{currentProject?.size}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Clock" size={18} className="text-accent" />
                    <span className="text-white/80 text-sm">Duración</span>
                  </div>
                  <p className="text-white font-semibold">{currentProject?.duration}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="DollarSign" size={18} className="text-accent" />
                    <span className="text-white/80 text-sm">Presupuesto</span>
                  </div>
                  <p className="text-white font-semibold">{currentProject?.budget}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Users" size={18} className="text-accent" />
                    <span className="text-white/80 text-sm">Equipo</span>
                  </div>
                  <p className="text-white font-semibold">{currentProject?.teamSize}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Eye"
                  iconPosition="left"
                  className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
                  onClick={() => onViewDetails(currentProject)}
                >
                  Ver Caso de Estudio
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MessageSquare"
                  iconPosition="left"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => window.location.href = '/contact-quote-request'}
                >
                  Solicitar Cotización
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {featuredProjects?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-200
              ${index === currentSlide 
                ? 'bg-accent scale-125' :'bg-white/40 hover:bg-white/60'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Auto-play Indicator */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
          aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
        >
          <Icon 
            name={isAutoPlaying ? "Pause" : "Play"} 
            size={16} 
            color="white" 
          />
        </button>
      </div>
    </div>
  );
};

export default FeaturedCarousel;