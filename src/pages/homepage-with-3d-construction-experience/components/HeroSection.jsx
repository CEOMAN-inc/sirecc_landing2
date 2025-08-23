import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import SphereOfSpheres from './SphereOfSpheres';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

gsap.registerPlugin(ScrollTrigger);

// Paleta de marca
const ORANGE = '#F27E33';
const NAVY   = '#1D2946';
const BASE_BG = '#0B1620';
const YELLOW = '#FFD166'; 

const WHATSAPP_NUMBER = '573225107655'; // cámbialo si quieres otro
const getWhatsAppUrl = (txt = 'Hola SIRECC, me gustaría cotizar un proyecto.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(txt)}`;

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [clickExplosion, setClickExplosion] = useState(0);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-title',   { duration: 1.2, y: 100, opacity: 0, ease: 'power3.out', stagger: 0.2 })
        .from('.hero-subtitle',{ duration: 1.0, y:  50, opacity: 0, ease: 'power2.out' }, '-=0.8')
        .from('.hero-buttons', { duration: 0.8, y:  30, opacity: 0, ease: 'back.out(1.7)' }, '-=0.6')
        .from('.hero-trust',   { duration: 0.6, y:  20, opacity: 0, ease: 'power2.out' }, '-=0.5');

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.to(contentRef.current, {
            y: self.progress * -150,
            opacity: 1 - self.progress * 1.3,
            duration: 0.3
          });
        }
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleButtonClick = (url) => {
    setClickExplosion((c) => c + 1);
    setTimeout(() => (window.location.href = url), 500);
  };

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-[var(--base-bg)]" style={{ ['--base-bg']: BASE_BG }}>
      
      {/* --- CAPA 1: FONDO Y EFECTOS VISUALES --- */}
      {/* Este contenedor agrupa todos los elementos que van detrás del contenido principal. */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Imagen de fondo */}
        <img
          src="/assets/images/hero-background.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Oscurecedor suave global */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.28), rgba(0,0,0,0.52) 60%, rgba(0,0,0,0.6))' }}
        />

        {/* >>> SPOTLIGHT DERECHA */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: 0.6,
            background: 'radial-gradient(700px 700px at 80% 40%, rgba(255,255,255,0.22), rgba(255,255,255,0) 60%)'
          }}
        />

        {/* Fallback para navegadores sin backdrop-filter */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.35) 35%, rgba(0,0,0,0) 70%)' }}
        />
      </div>

      {/* --- CAPA 2: EFECTO BLUR (si es necesario) --- */}
      {/* Esta capa está separada para aplicar el blur sobre el fondo sin afectar el texto. */}
      <div
        className="absolute inset-y-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          background: 'rgba(0,0,0,0.28)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,.85) 30%, rgba(0,0,0,0) 65%)',
          maskImage:       'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,.85) 30%, rgba(0,0,0,0) 65%)'
        }}
      />

      {/* --- CAPA 3: CONTENIDO PRINCIPAL (UI) --- */}
      {/* Todo el texto y los botones están en la capa superior. */}
      <div className="relative z-20 h-full flex pt-40 md:pt-21 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div ref={contentRef} className="max-w-4xl">
            {/* Eslogan */}
            <div className="hero-title">
              <h1 className="font-orbitron font-black text-5xl lg:text-6xl text-white leading-none tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                <span className="block">Construimos con propósito</span>
                <span
                  className="block text-transparent bg-gradient-to-r from-[var(--orange)] via-[var(--orange)] to-[var(--navy)] bg-clip-text"
                  style={{ ['--orange']: ORANGE, ['--navy']: ORANGE }}
                >
                  Transformamos con <br /> calidad
                </span>
              </h1>
            </div>

            {/* Subtítulo */}
            <motion.p
              className="hero-subtitle font-inter text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed mt-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Soluciones integrales en ingeniería civil: obra nueva, remodelaciones y mantenimiento locativo con cumplimiento
              normativo y mano de obra calificada.
            </motion.p>

            {/* Botones CTA */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-6 mt-8 pointer-events-auto">
              {/* Contactar por WhatsApp */}
             <div className="relative group">
                <span
                  className="absolute -inset-[8px] rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-500"
                  style={{ background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})` }}
                  aria-hidden
                />
                <Button
                  variant="default"
                  size="lg"
                  className="relative rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/10
                            hover:scale-[1.02] transition-all duration-300"
                  onMouseEnter={() => setClickExplosion((c) => c + 1)}
                  onClick={() => {
                    setClickExplosion((c) => c + 1);
                    window.open(getWhatsAppUrl(), '_blank', 'noopener');
                  }}
                >
                  <span className="flex items-center gap-2">
                    <svg
                      viewBox="0 0 32 32"
                      className="w-[18px] h-[18px] shrink-0"
                      aria-hidden="true"
                      style={{ fill: '#25D366' }}
                    >
                      <path d="M16.004 3.2c-7.02 0-12.72 5.7-12.72 12.72 0 2.24.59 4.38 1.71 6.29L3.2 28.8l6.77-1.76a12.66 12.66 0 0 0 5.99 1.52h.01c7.02 0 12.72-5.7 12.72-12.72S23.024 3.2 16.004 3.2zm7.44 18.26c-.32.9-1.87 1.72-2.58 1.84-.66.12-1.5.17-2.42-.15-.56-.2-1.28-.42-2.22-.82-3.9-1.68-6.44-5.58-6.63-5.84-.19-.26-1.59-2.12-1.59-4.05 0-1.93 1.01-2.88 1.37-3.27.36-.39.79-.49 1.06-.49.27 0 .53.01.76.01.24 0 .57-.09.89.68.32.77 1.09 2.66 1.18 2.86.09.2.15.44.03.7-.12.26-.18.42-.36.65-.18.23-.38.52-.54.7-.18.2-.37.41-.16.77.21.36.92 1.52 1.96 2.46 1.35 1.2 2.49 1.57 2.86 1.74.37.17.59.15.82-.09.23-.24.94-1.1 1.19-1.48.25-.38.5-.32.82-.19.32.13 2.05.96 2.4 1.13.35.17.58.26.66.41.08.15.08.87-.24 1.77z"/>
                    </svg>
                    <span>Contactar por WhatsApp</span>
                  </span>
                </Button>
              </div>

              {/* Explorar proyectos */}
              <div className="relative group">
                <span
                  className="absolute -inset-[8px] rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-500"
                  style={{ background: `linear-gradient(90deg, ${NAVY}, ${ORANGE})` }}
                  aria-hidden
                />
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="relative rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/10
                                  hover:scale-[1.02] transition-all duration-300"
                  onMouseEnter={() => setClickExplosion((c) => c + 1)}
                  onClick={() => handleButtonClick('/services-portfolio-showcase')}
                >
                  Explorar proyectos
                </Button>
              </div>
            </div>

            {/* Trust metrics */}
            <div className="hero-trust flex flex-wrap items-center gap-10 pt-20">
             <div className="flex items-center space-x-3 text-white/90">
                <Icon name="Award" size={50} style={{ color: ORANGE }} />
                <span className="font-inter text-[17px] md:text-lg font-semibold tracking-[.01em]">
                  15+ Años de experiencia
                </span>
              </div>
              <div className="flex items-center space-x-3 text-white/85">
                <Icon name="Layers" size={50} style={{ color: NAVY }} />
                <span className="font-inter text-sm font-medium">200+ Proyectos ejecutados</span>
              </div>
              <div className="flex items-center space-x-3 text-white/85">
                <Icon name="Users" size={50} style={{ color: ORANGE }} />
                <span className="font-inter text-sm font-medium">30+ Clientes atendidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
