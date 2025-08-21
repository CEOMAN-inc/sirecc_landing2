import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import SphereOfSpheres from './SphereOfSpheres';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

gsap.registerPlugin(ScrollTrigger);

// Paleta ÚNICA para esta sección
const ORANGE = '#F27E33';
const NAVY   = '#1D2946';
const BASE_BG = '#0B1620'; // tono de fog/ambiente

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
      {/* Fondo */}
      <img
        src="/assets/images/hero-background.png"
         alt="Hero Background"
  className="absolute inset-0 w-full h-full object-cover object-top z-0"
      />

      {/* Oscurecedor para contraste */}
      <div className="absolute inset-0 z-10 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.28), rgba(0,0,0,0.52) 60%, rgba(0,0,0,0.6))' }} />

      {/* Color grading bajo el canvas (ORANGE→NAVY) */}
      <div className="absolute inset-0 z-[15] pointer-events-none mix-blend-soft-light"
           style={{ background: `linear-gradient(90deg, ${ORANGE}33 0%, #00000000 45%, ${NAVY}33 100%)` }} />

     {/* Canvas 3D */}
<div className="absolute inset-0 z-20">
  <Suspense fallback={null}>
    <Canvas
      camera={{ position: [0, 0, 15], fov: 50 }}
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        // 🔑 Transparencia real del renderer
        gl.setClearColor(0x000000, 0);
      }}
    >
      {/* Fog: opcional para integrar mejor la esfera con el fondo */}
      <fog attach="fog" args={[BASE_BG, 8, 38]} />

      {/* Solo la esfera */}
      <SphereOfSpheres
        count={2000}
        radius={7}
        pulseAmp={0.32}
        autoRotate={0.14}
        mouseIntensity={0.68}
        position={[12, 0.5, 1]}
        baseInnerColor={NAVY}       // color al contraer (oscuro)
        baseOuterColor={ORANGE}     // color al expandir (vivo)
        explodePalette={[ORANGE, NAVY]}
        materialOpacity={0}
        pointSize={5}
        clickExplosion={clickExplosion}
      />
    </Canvas>
  </Suspense>
</div>


      {/* Color grading sobre el canvas para empastar TODO (imagen+brisa+esfera) */}
      <div className="absolute inset-0 z-[25] pointer-events-none mix-blend-soft-light"
           style={{ background: `linear-gradient(180deg, ${NAVY}24 0%, #00000000 40%, ${ORANGE}24 100%)` }} />

      {/* Contenido */}
      <div className="relative z-30 h-full flex pt-40 md:pt-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div ref={contentRef} className="max-w-4xl">
            <div className="hero-title">
              <h1 className="font-orbitron font-black text-5xl lg:text-6xl text-white leading-none tracking-tight">
                <span className="block">Construimos con propósito</span>
                <span className="block text-transparent bg-gradient-to-r from-[var(--orange)] via-[var(--orange)] to-[var(--navy)] bg-clip-text"
                      style={{ ['--orange']: ORANGE, ['--navy']: ORANGE }}>
                  Transformamos con <br /> Calidad
                </span>
                              </h1>
            </div>

            <motion.p
              className="hero-subtitle font-inter text-2xl lg:text-3xl text-white/85 max-w-3xl leading-relaxed mt-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Brindamos soluciones integrales en ingeniería civil,
              abarcando desde obra nueva y remodelaciones hasta mantenimiento técnico especializado.

            </motion.p>

            {/* CTA con efecto (halo, borde animado y click ripple implícito) */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-6 mt-10">
              <div className="relative group pointer-events-auto">
                <div className="absolute -inset-0.5 rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-500"
                     style={{ background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})` }} />
                <Button
                  variant="default"
                  size="lg"
                  iconName="MessageSquare"
                  iconPosition="left"
                  className="relative rounded-xl bg-[#0b0f18]/80 text-white border border-white/10 hover:scale-[1.015] transition-all duration-300"
                  onClick={() => handleButtonClick('/contact-quote-request')}
                >
                  Solicitar Cotización 3D
                </Button>
              </div>

              <div className="relative group pointer-events-auto">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="relative rounded-xl border-2 transition-all duration-300"
                  style={{
                    borderColor: ORANGE,
                    color: ORANGE,
                    background: 'rgba(255,255,255,0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = NAVY;
                    e.currentTarget.style.color = NAVY;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = ORANGE;
                    e.currentTarget.style.color = ORANGE;
                  }}
                  onClick={() => handleButtonClick('/services-portfolio-showcase')}
                >
                  Explorar Proyectos
                </Button>
                <span className="pointer-events-none absolute -inset-0.5 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                      style={{ background: `linear-gradient(90deg, ${NAVY}, ${ORANGE})` }} />
              </div>
            </div>

            <div className="hero-trust flex flex-wrap items-center gap-8 pt-8">
              <div className="flex items-center space-x-3 text-white/80 group">
                <Icon name="Shield" size={24} className="text-[color:var(--orange)] group-hover:animate-pulse" style={{ ['--orange']: ORANGE }} />
                <span className="font-inter text-sm font-medium">Certificación ISO 9001</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 group">
                <Icon name="Award" size={24} style={{ color: ORANGE }} />
                <span className="font-inter text-sm font-medium">15+ Años Experiencia</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 group">
                <Icon name="Users" size={24} style={{ color: NAVY }} />
                <span className="font-inter text-sm font-medium">250+ Proyectos Completados</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 group">
                <Icon name="Zap" size={24} style={{ color: ORANGE }} />
                <span className="font-inter text-sm font-medium">Tecnología 3D Avanzada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
