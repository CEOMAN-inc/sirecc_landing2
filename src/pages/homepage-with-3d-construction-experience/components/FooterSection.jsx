import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

// Paleta
const ORANGE = '#F27E33';
const NAVY = '#1D2946';

const FooterSection = () => {
  const quickLinks = [
    { label: 'Inicio', path: '/homepage-with-3d-construction-experience' },
    { label: 'Servicios', path: '/services-portfolio-showcase' },
    { label: 'Proyectos', path: '/project-gallery-case-studies' },
    { label: 'Contacto', path: '/contact-quote-request' }
  ];

  const services = [
    'Obra civil','Acabados','Mantenimiento locativo','Comunicaciones','Hidrosanitarios',
    'Mobiliario','Sistemas eléctricos','Espacios públicos','Gas natural','Vidrio y aluminio',
  ];

  const contactInfo = [
    { icon: 'Phone', label: 'Teléfono (línea 1)', value: '+57 322 510 7655', href: 'tel:+573225107655' },
    { icon: 'Phone', label: 'Teléfono (línea 2)', value: '+57 311 220 2274', href: 'tel:+573112202274' },
    { icon: 'Mail', label: 'Email', value: 'Sirecc.sas@gmail.com', href: 'mailto:Sirecc.sas@gmail.com' },
    { icon: 'MapPin', label: 'Dirección', value: 'Calle 106 # 51 - 02, Oficina 503', href: 'https://maps.google.com/?q=Calle+106+%23+51-02,+Oficina+503' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-primary overflow-hidden">
      {/* Fondo ilustrado */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/80 to-transparent" />
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 bg-primary/60"
            style={{ left: `${i * 8 + Math.random() * 4}%`, width: `${3 + Math.random() * 4}%`, height: `${20 + Math.random() * 40}%` }}
          />
        ))}
        <div className="absolute bottom-16 right-1/4 w-1 h-40 bg-secondary/40" />
        <div className="absolute bottom-32 right-1/4 w-32 h-1 bg-secondary/40" />
        <div className="absolute bottom-20 left-1/3 w-1 h-32 bg-accent/40" />
        <div className="absolute bottom-28 left-1/3 w-24 h-1 bg-accent/40" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 60 + 20}%` }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Col 1: Solo logo */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="mb-6">
                  <img src="/assets/images/sirecc-logo.png" alt="SIRECC" className="h-14 w-auto" />
                </div>
                <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                  Construimos con propósito, transformamos con calidad.
                </p>
                <div className="flex space-x-4">
                  {['Facebook', 'Twitter', 'Instagram', 'Linkedin'].map((social) => (
                    <a key={social} href="#" className="w-10 h-10 bg-muted/20 hover:bg-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <Icon name={social} size={20} className="text-muted-foreground hover:text-white" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Col 2: Enlaces */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-6">Enlaces Rápidos</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="font-inter text-muted-foreground hover:text-secondary transition-colors duration-300 flex items-center space-x-2 group">
                        <Icon name="ChevronRight" size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Col 3: Servicios */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-6">Nuestros Servicios</h3>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service}>
                      <span className="font-inter text-muted-foreground hover:text-accent transition-colors duration-300 cursor-pointer">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Col 4: Contacto + botones */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-6">Contacto</h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a key={info.label + info.value} href={info.href} className="flex items-start space-x-3 text-muted-foreground hover:text-secondary transition-colors duration-300 group">
                      <Icon name={info.icon} size={18} className="mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <p className="font-inter text-sm font-medium">{info.label}</p>
                        <p className="font-inter text-sm">{info.value}</p>
                      </div>
                    </a>
                  ))}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {/* Llamar ahora: ORANGE → NAVY */}
                    <div className="relative inline-block group">
                      <span
                        className="pointer-events-none absolute -inset-[10px] rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-500"
                        style={{ background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})` }}
                        aria-hidden
                      />
                      <Button
                        variant="default"
                        size="sm"
                        iconName="PhoneCall"
                        className="relative rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/10 hover:scale-[1.02] transition-all duration-300"
                        onClick={() => (window.location.href = 'tel:+573225107655')}
                      >
                        Llamar ahora
                      </Button>
                    </div>

                    {/* WhatsApp: NAVY → ORANGE */}
                    <div className="relative inline-block group">
                      <span
                        className="pointer-events-none absolute -inset-[10px] rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-500"
                        style={{ background: `linear-gradient(90deg, ${NAVY}, ${ORANGE})` }}
                        aria-hidden
                      />
                      <Button
                        variant="default"
                        size="sm"
                        iconName="MessageCircle"
                        className="relative rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/10 hover:scale-[1.02] transition-all duration-300"
                        onClick={() => window.open('https://wa.me/573225107655', '_blank')}
                      >
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Barra inferior */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <p className="font-inter text-sm text-muted-foreground">© {new Date().getFullYear()} SIRECC. Todos los derechos reservados.</p>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#" className="font-inter text-sm text-muted-foreground hover:text-secondary transition-colors duration-300">Política de Privacidad</a>
                <a href="#" className="font-inter text-sm text-muted-foreground hover:text-secondary transition-colors duration-300">Términos de Servicio</a>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="font-inter text-sm text-muted-foreground">SSL Seguro</span>
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
