import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { label: 'Inicio', path: '/homepage-with-3d-construction-experience' },
    { label: 'Servicios', path: '/services-portfolio-showcase' },
    { label: 'Proyectos', path: '/project-gallery-case-studies' },
    { label: 'Contacto', path: '/contact-quote-request' }
  ];

  const services = [
    'Construcción Residencial',
    'Proyectos Comerciales',
    'Infraestructura Industrial',
    'Remodelaciones',
    'Consultoría Técnica',
    'Gestión de Proyectos'
  ];

  const contactInfo = [
    {
      icon: 'Phone',
      label: 'Teléfono',
      value: '+57 (1) 234-5678',
      href: 'tel:+5712345678'
    },
    {
      icon: 'Mail',
      label: 'Email',
      value: 'info@sirecc.com.co',
      href: 'mailto:info@sirecc.com.co'
    },
    {
      icon: 'MapPin',
      label: 'Dirección',
      value: 'Calle 100 #15-20, Bogotá, Colombia',
      href: 'https://maps.google.com/?q=Calle+100+15-20+Bogotá+Colombia'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-primary overflow-hidden">
      {/* Nocturnal Cityscape Background */}
      <div className="absolute inset-0 opacity-20">
        {/* City Silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/80 to-transparent" />
        
        {/* Building Silhouettes */}
        {[...Array(12)]?.map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 bg-primary/60"
            style={{
              left: `${i * 8 + Math.random() * 4}%`,
              width: `${3 + Math.random() * 4}%`,
              height: `${20 + Math.random() * 40}%`,
            }}
          />
        ))}

        {/* Crane Silhouettes */}
        <div className="absolute bottom-16 right-1/4 w-1 h-40 bg-secondary/40 transform rotate-0" />
        <div className="absolute bottom-32 right-1/4 w-32 h-1 bg-secondary/40" />
        <div className="absolute bottom-20 left-1/3 w-1 h-32 bg-accent/40" />
        <div className="absolute bottom-28 left-1/3 w-24 h-1 bg-accent/40" />

        {/* Neon Lights */}
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60 + 20}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      {/* Main Footer Content */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                    <Icon name="Building2" size={28} color="#ffffff" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-orbitron font-bold text-2xl text-foreground leading-tight">
                      SIRECC
                    </span>
                    <span className="font-inter text-sm text-muted-foreground leading-tight">
                      Construction
                    </span>
                  </div>
                </div>

                <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                  Construyendo el futuro de Colombia con innovación, calidad y compromiso desde 2008.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {['Facebook', 'Twitter', 'Instagram', 'Linkedin']?.map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-muted/20 hover:bg-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Icon name={social} size={20} className="text-muted-foreground hover:text-white" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-6">
                  Enlaces Rápidos
                </h3>
                <ul className="space-y-3">
                  {quickLinks?.map((link) => (
                    <li key={link?.path}>
                      <Link
                        to={link?.path}
                        className="font-inter text-muted-foreground hover:text-secondary transition-colors duration-300 flex items-center space-x-2 group"
                      >
                        <Icon 
                          name="ChevronRight" 
                          size={14} 
                          className="group-hover:translate-x-1 transition-transform duration-300" 
                        />
                        <span>{link?.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Services */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-6">
                  Nuestros Servicios
                </h3>
                <ul className="space-y-3">
                  {services?.map((service) => (
                    <li key={service}>
                      <span className="font-inter text-muted-foreground hover:text-accent transition-colors duration-300 cursor-pointer">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact & Newsletter */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-6">
                  Contacto
                </h3>
                
                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  {contactInfo?.map((info) => (
                    <a
                      key={info?.label}
                      href={info?.href}
                      className="flex items-start space-x-3 text-muted-foreground hover:text-secondary transition-colors duration-300 group"
                    >
                      <Icon 
                        name={info?.icon} 
                        size={18} 
                        className="mt-0.5 group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div>
                        <p className="font-inter text-sm font-medium">{info?.label}</p>
                        <p className="font-inter text-sm">{info?.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Newsletter */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h4 className="font-orbitron font-medium text-foreground mb-3">
                    Newsletter
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground mb-4">
                    Recibe noticias y actualizaciones de nuestros proyectos.
                  </p>
                  
                  {isSubscribed ? (
                    <div className="flex items-center space-x-2 text-success">
                      <Icon name="CheckCircle" size={20} />
                      <span className="font-inter text-sm">¡Suscrito exitosamente!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value)}
                        required
                        className="bg-background/50"
                      />
                      <Button
                        type="submit"
                        variant="default"
                        size="sm"
                        iconName="Send"
                        iconPosition="right"
                        fullWidth
                        className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
                      >
                        Suscribirse
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-t border-border pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <p className="font-inter text-sm text-muted-foreground">
                  © {new Date()?.getFullYear()} SIRECC Construction. Todos los derechos reservados.
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                <a href="#" className="font-inter text-sm text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Política de Privacidad
                </a>
                <a href="#" className="font-inter text-sm text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Términos de Servicio
                </a>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="font-inter text-sm text-muted-foreground">
                    SSL Seguro
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;