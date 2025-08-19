import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import InteractiveMap from './components/InteractiveMap';
import ConstructionScene from './components/ConstructionScene';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';

const ContactQuoteRequest = () => {
  useEffect(() => {
    document.title = 'Contacto y Cotización - SIRECC Construction';
    window.scrollTo(0, 0);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="pt-16"
      >
        {/* Hero Section */}
        <motion.section
          variants={staggerChildren}
          className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
            <div className="text-center">
              <motion.div
                variants={childVariants}
                className="flex items-center justify-center space-x-3 mb-6"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Icon name="MessageSquare" size={24} color="#ffffff" />
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Icon name="Calculator" size={24} color="#ffffff" />
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Icon name="Building2" size={24} color="#ffffff" />
                </div>
              </motion.div>

              <motion.h1
                variants={childVariants}
                className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
              >
                Solicita tu{' '}
                <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                  Cotización
                </span>
                <br />
                Gratuita
              </motion.h1>

              <motion.p
                variants={childVariants}
                className="font-inter text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Convierte tu visión en realidad. Nuestro equipo de expertos está listo para 
                evaluar tu proyecto y brindarte una propuesta detallada sin compromiso.
              </motion.p>

              <motion.div
                variants={childVariants}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <div className="flex items-center space-x-2 text-white/80">
                  <Icon name="CheckCircle" size={20} className="text-accent" />
                  <span className="font-inter text-sm">Evaluación gratuita</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Icon name="Clock" size={20} className="text-accent" />
                  <span className="font-inter text-sm">Respuesta en 24h</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Icon name="Shield" size={20} className="text-accent" />
                  <span className="font-inter text-sm">Sin compromiso</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl" />
        </motion.section>

        {/* Main Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left Column - 3D Scene */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="sticky top-24">
                  <div className="h-[600px] lg:h-[700px]">
                    <ConstructionScene />
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-3"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-foreground mb-4">
                Múltiples Formas de{' '}
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Contactarnos
                </span>
              </h2>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                Elige el método que más te convenga. Estamos disponibles para atenderte 
                cuando lo necesites.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactInfo />
            </motion.div>
          </div>
        </section>

        {/* Interactive Map */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-foreground mb-4">
                Cobertura{' '}
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Nacional
                </span>
              </h2>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                Presencia estratégica en las principales ciudades de Colombia para 
                atender tus proyectos donde los necesites.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <InteractiveMap />
            </motion.div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-foreground mb-4">
                Respaldados por{' '}
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  la Excelencia
                </span>
              </h2>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                Certificaciones internacionales, clientes satisfechos y garantías sólidas 
                que respaldan nuestro compromiso con la calidad.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TrustSignals />
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-6">
                ¿Listo para Comenzar tu Proyecto?
              </h2>
              <p className="font-inter text-xl text-white/90 mb-8 leading-relaxed">
                No esperes más. Cada día cuenta cuando se trata de hacer realidad tus sueños de construcción. 
                Nuestro equipo está esperando para convertir tu visión en una obra maestra.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                  href="tel:+5712345678"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-inter font-semibold text-lg transition-all duration-200 hover:scale-105 construction-shadow-lg flex items-center space-x-3"
                >
                  <Icon name="Phone" size={20} />
                  <span>Llamar Ahora</span>
                </a>
                
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 text-white hover:bg-white/30 border border-white/30 px-8 py-4 rounded-xl font-inter font-semibold text-lg transition-all duration-200 hover:scale-105 backdrop-blur-sm flex items-center space-x-3"
                >
                  <Icon name="MessageSquare" size={20} />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="mt-8 text-white/70 text-sm font-inter">
                <p>Atención inmediata • Sin compromiso • Evaluación gratuita</p>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={24} color="#ffffff" />
                </div>
                <div>
                  <span className="font-orbitron font-bold text-xl text-foreground">SIRECC</span>
                  <p className="text-muted-foreground text-sm">Construction Excellence</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Transformamos visiones en realidades constructivas con más de 15 años de experiencia 
                en el sector de la construcción en Colombia.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                  <Icon name="Linkedin" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                  <Icon name="Youtube" size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-orbitron font-semibold text-foreground text-sm mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="/homepage-with-3d-construction-experience" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200">Inicio</a></li>
                <li><a href="/services-portfolio-showcase" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200">Servicios</a></li>
                <li><a href="/project-gallery-case-studies" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200">Proyectos</a></li>
                <li><a href="/contact-quote-request" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200">Contacto</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-orbitron font-semibold text-foreground text-sm mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <Icon name="Phone" size={14} />
                  <span>+57 (1) 234-5678</span>
                </li>
                <li className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <Icon name="Mail" size={14} />
                  <span>info@sirecc.com</span>
                </li>
                <li className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <Icon name="MapPin" size={14} />
                  <span>Bogotá, Colombia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} SIRECC Construction. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactQuoteRequest;