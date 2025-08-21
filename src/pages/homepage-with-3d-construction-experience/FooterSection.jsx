import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

/**
 * FooterSection
 *
 * Builds the footer of the landing page using a futuristic cityscape backdrop.
 * The lists of services and contact information are drawn from the company
 * portfolio, and the copy has been adjusted to reflect the mission and vision.
 */
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

  // Services list updated to reflect the portfolio categories
  const services = [
    'Obra Civil',
    'Acabados',
    'Mantenimiento Locativo',
    'Sistemas Eléctricos',
    'Hidrosanitarios',
    'Comunicaciones y Tecnología'
  ];

  // Contact details sourced from the portfolio
  const contactInfo = [
    {
      icon: 'Phone',
      label: 'Teléfonos',
      value: '+57 322 510 7655 / +57 311 220 2274',
      href: 'tel:+573225107655'
    },
    {
      icon: 'Mail',
      label: 'Email',
      value: 'sirecc.sas@gmail.com',
      href: 'mailto:sirecc.sas@gmail.com'
    },
    {
      icon: 'MapPin',
      label: 'Dirección',
      value: 'Calle 106 # 51 - 02 Oficina 503, Bogotá, Colombia',
      href: 'https://maps.google.com/?q=Calle+106+51-02+Bogotá+Colombia'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-primary overflow-hidden">
      {/* Stylised cityscape background */}
      <div className="absolute inset-0 opacity-20">
        {/* City Silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/80 to-transparent" />
        {/* Random building silhouettes */}
        {[...Array(12)]?.map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 bg-primary/60"
            style={{
              left: `${i * 8 + Math.random() * 4}%`,
              width: `${3 + Math.random() * 4}%`,
              height: `${20 + Math.random() * 40}%`
            }}
          />
        ))}
        {/* Crane elements */}
        <div className="absolute bottom-16 right-1/4 w-1 h-40 bg-secondary/40 transform rotate-0" />
        <div className="absolute bottom-32 right-1/4 w-32 h-1 bg-secondary/40" />
        <div className="absolute bottom-20 left-1/3 w-1 h-32 bg-accent/40" />
        <div className="absolute bottom-28 left-1/3 w-24 h-1 bg-accent/40" />
        {/* Neon lights */}
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60 + 20}%`
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      {/* Main footer content */}
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
                    <span className="font-orbitron font-bold text-2xl text-foreground leading-tight">SIRECC</span>
                    <span className="font-inter text-sm text-muted-foreground leading-tight">SAS</span>
                  </div>
                </div>
                <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                  Construimos con propósito y transformamos con calidad. Más de 15 años brindando soluciones integrales en construcción, acabados y mantenimiento.
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
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-6">Enlaces Rápidos</h3>
                <ul className="space-y-3">
                  {quickLinks?.map((link) => (
                    <li key={link?.path}>
                      <Link
                        to={link?.path}
                        className="font-inter text-muted-foreground hover:text-secondary transition-colors duration-300"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            {/* Services List */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-6">Servicios</h3>
                <ul className="space-y-3">
                  {services?.map((service) => (
                    <li key={service} className="font-inter text-muted-foreground hover:text-secondary transition-colors duration-300">
                      {service}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-6">Contáctanos</h3>
                <ul className="space-y-4">
                  {contactInfo?.map((info) => (
                    <li key={info?.label} className="flex items-start space-x-3">
                      <Icon name={info?.icon} size={20} className="text-secondary" />
                      <div>
                        <p className="font-inter text-sm text-muted-foreground">{info?.label}</p>
                        <a
                          href={info?.href}
                          className="font-inter text-sm text-foreground hover:text-secondary transition-colors duration-300"
                        >
                          {info?.value}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 lg:p-10 mb-8"
          >
            <h4 className="font-orbitron font-bold text-lg lg:text-xl text-foreground mb-4">Suscríbete a nuestro boletín</h4>
            <p className="font-inter text-sm text-muted-foreground mb-6">Recibe noticias, casos de éxito y consejos de construcción directamente en tu correo.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" variant="default" size="lg" disabled={isSubscribed}>
                {isSubscribed ? '¡Gracias!' : 'Suscribirse'}
              </Button>
            </form>
          </motion.div>
          {/* Footer bottom */}
          <div className="border-t border-border pt-6 text-center">
            <p className="font-inter text-sm text-muted-foreground">© {new Date().getFullYear()} SIRECC SAS. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;