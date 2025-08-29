import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MainNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Inicio',
      path: '/',
      icon: 'Home'
    },
    {
      label: 'Servicios',
      path: '/services-overview',
      icon: 'Settings'
    },
    {
      label: 'Cotización',
      path: '/quote-request',
      icon: 'FileText'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActiveRoute = (path) => {
    if (path === '/') {
      return location?.pathname === '/';
    }
    return location?.pathname?.startsWith(path);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-panel shadow-glass' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover-halo rounded-lg px-3 py-2 spring-bounce"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-xl text-foreground">
                SIRECC
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-all duration-200 hover-halo spring-bounce ${
                    isActiveRoute(item?.path)
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
              />
            </Button>
          </div>
        </nav>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-glass-mobile"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-16 left-0 right-0 bottom-0 glass-panel glass-panel-mobile animate-slide-down">
            <div className="flex flex-col p-6 space-y-4">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium transition-all duration-200 hover-halo spring-bounce ${
                    isActiveRoute(item?.path)
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="text-lg">{item?.label}</span>
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-6 border-t border-border">
                <Link to="/quote-request" onClick={closeMobileMenu}>
                  <Button 
                    variant="default" 
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Solicitar Cotización
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default MainNavigation;