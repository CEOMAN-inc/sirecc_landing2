import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Inicio', path: '/homepage-with-3d-construction-experience', icon: 'Home' },
    { label: 'Servicios', path: '/services-portfolio-showcase', icon: 'Wrench' },
    { label: 'Proyectos', path: '/project-gallery-case-studies', icon: 'Building' },
    { label: 'Contacto', path: '/contact-quote-request', icon: 'Phone' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location?.pathname === path;

  const headerClasses = `
    fixed top-0 left-0 right-0 z-100 transition-all duration-300 ease-construction
    ${transparent && !isScrolled 
      ? 'bg-transparent backdrop-blur-none' :'bg-background/95 backdrop-blur-sm construction-shadow'
    }
  `;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={headerClasses}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/homepage-with-3d-construction-experience" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={24} color="#ffffff" />
              </div>
              <div className="flex flex-col">
                <span className="font-orbitron font-bold text-lg text-foreground leading-tight">
                  SIRECC
                </span>
                <span className="font-inter text-xs text-muted-foreground leading-tight">
                  Construction
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`
                    relative px-4 py-2 rounded-lg font-inter font-medium text-sm
                    transition-all duration-200 ease-construction
                    hover:scale-105 hover:bg-muted/50
                    ${isActive(item?.path)
                      ? 'text-secondary bg-secondary/10 border border-secondary/20' :'text-foreground hover:text-secondary'
                    }
                  `}
                >
                  <span className="flex items-center space-x-2">
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </span>
                  {isActive(item?.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-secondary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Button
                variant="default"
                size="sm"
                iconName="MessageSquare"
                iconPosition="left"
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
                onClick={() => window.location.href = '/contact-quote-request'}
              >
                Cotizar Proyecto
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                color="currentColor" 
              />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Drawer */}
      <div
        className={`
          fixed inset-0 z-200 md:hidden transition-all duration-300 ease-construction
          ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        
        {/* Drawer */}
        <div
          className={`
            absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-card construction-shadow-lg
            transform transition-transform duration-300 ease-construction
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={20} color="#ffffff" />
                </div>
                <span className="font-orbitron font-bold text-lg text-foreground">
                  SIRECC
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                aria-label="Close menu"
              >
                <Icon name="X" size={20} color="currentColor" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-6 py-8">
              <div className="space-y-4">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`
                      flex items-center space-x-4 px-4 py-3 rounded-lg
                      font-inter font-medium text-base transition-all duration-200
                      hover:bg-muted/50 hover:scale-105
                      ${isActive(item?.path)
                        ? 'text-secondary bg-secondary/10 border border-secondary/20' :'text-foreground hover:text-secondary'
                      }
                    `}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                    {isActive(item?.path) && (
                      <div className="ml-auto w-2 h-2 bg-secondary rounded-full" />
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            {/* CTA Button - Mobile */}
            <div className="p-6 border-t border-border">
              <Button
                variant="default"
                size="default"
                iconName="MessageSquare"
                iconPosition="left"
                fullWidth
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
                onClick={() => {
                  closeMobileMenu();
                  window.location.href = '/contact-quote-request';
                }}
              >
                Cotizar Proyecto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;