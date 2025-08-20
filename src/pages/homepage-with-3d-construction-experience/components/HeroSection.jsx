import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import SphereOfSpheres from './SphereOfSpheres';

// El resto de tus imports
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  // ✅ NUEVO: Estado para activar la explosión al hacer clic
  const [clickExplosion, setClickExplosion] = useState(0);
  
  // Código para las animaciones de texto (sin cambios)
  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline();
      heroTl.from(".hero-title", { duration: 1.2, y: 100, opacity: 0, ease: "power3.out", stagger: 0.2 })
            .from(".hero-subtitle", { duration: 1, y: 50, opacity: 0, ease: "power2.out" }, "-=0.8")
            .from(".hero-buttons", { duration: 0.8, y: 30, opacity: 0, ease: "back.out(1.7)" }, "-=0.6")
            .from(".hero-trust", { duration: 0.6, y: 20, opacity: 0, ease: "power2.out" }, "-=0.5");
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(contentRef.current, { y: self.progress * -150, opacity: 1 - self.progress * 1.5, duration: 0.3 });
        }
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);
  
  const handleButtonClick = (url) => {
    setClickExplosion(c => c + 1); // Activa la explosión
    setTimeout(() => {
        window.location.href = url;
    }, 800); // Espera a que la animación comience antes de navegar
  };

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
            {/* ✅ NUEVO: Pasamos el nuevo prop a la esfera */}
            <SphereOfSpheres isButtonHovered={isButtonHovered} clickExplosion={clickExplosion} />
          </Canvas>
        </Suspense>
      </div>
      <div className="relative z-10 h-full flex pt-40 md:pt-48 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div ref={contentRef} className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <div className="hero-title">
                  <h1 className="font-orbitron font-black text-6xl lg:text-6xl text-foreground leading-none tracking-tight">
                    <span className="block">Construimos con propósito</span>
                    <span className="block text-transparent bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text animate-pulse">
                        Transformamos con <br /> Calidad
                    </span>
                    <span className="block text-lg font-inter font-normal text-accent mt-2 tracking-wide">
                      CON TECNOLOGÍA 3D AVANZADA
                    </span>
                  </h1>
                </div>
                <motion.p
                  className="hero-subtitle font-inter text-2xl lg:text-3xl text-muted-foreground max-w-3xl leading-relaxed"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Transformamos visiones arquitectónicas en realidades sólidas con grúas torre futuristas, 
                  tecnología de vanguardia y más de 15 años de experiencia en construcción de alto impacto.
                </motion.p>
              </div>
              <motion.div
                className="hero-buttons flex flex-col sm:flex-row gap-6"
                whileHover={{ scale: 1.01 }}
              >
                <Button
                  style={{ pointerEvents: 'auto' }}
                  variant="default"
                  size="lg"
                  iconName="MessageSquare"
                  iconPosition="left"
                  className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect transform hover:scale-105 transition-all duration-500 text-xl py-6 px-8"
                  onClick={() => handleButtonClick('/contact-quote-request')}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  Solicitar Cotización 3D
                </Button>
                <Button
                  style={{ pointerEvents: 'auto' }}
                  variant="outline"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-500 text-xl py-6 px-8 backdrop-blur-sm bg-white/5"
                  onClick={() => handleButtonClick('/services-portfolio-showcase')}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  Explorar Proyectos
                </Button>
              </motion.div>
              <motion.div
                className="hero-trust flex flex-wrap items-center gap-8 pt-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <motion.div className="trust-indicator flex items-center space-x-3 text-muted-foreground group" whileHover={{ scale: 1.1, color: "#10b981" }}>
                  <Icon name="Shield" size={24} className="text-success group-hover:animate-pulse" />
                  <span className="font-inter text-sm font-medium">Certificación ISO 9001</span>
                </motion.div>
                <motion.div className="trust-indicator flex items-center space-x-3 text-muted-foreground group" whileHover={{ scale: 1.1, color: "#00d4ff" }}>
                  <Icon name="Award" size={24} className="text-accent group-hover:animate-bounce" />
                  <span className="font-inter text-sm font-medium">15+ Años Experiencia</span>
                </motion.div>
                <motion.div className="trust-indicator flex items-center space-x-3 text-muted-foreground group" whileHover={{ scale: 1.1, color: "#f27e33" }}>
                  <Icon name="Users" size={24} className="text-secondary group-hover:animate-spin" />
                  <span className="font-inter text-sm font-medium">250+ Proyectos Completados</span>
                </motion.div>
                <motion.div className="trust-indicator flex items-center space-x-3 text-muted-foreground group" whileHover={{ scale: 1.1, color: "#f27e33" }}>
                  <Icon name="Zap" size={24} className="text-accent group-hover:animate-pulse" />
                  <span className="font-inter text-sm font-medium">Tecnología 3D Avanzada</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;