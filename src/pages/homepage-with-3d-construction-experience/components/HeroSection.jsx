import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import ConstructionScene3D from './ConstructionScene3D';

// Register GSAP ScrollTrigger plugin
gsap?.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const scene3DRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas?.getContext('webgl2') || canvas?.getContext('webgl') || canvas?.getContext('experimental-webgl');
    
    if (!gl) {
      console.warn('WebGL not supported, falling back to 2D experience');
      setIsWebGLSupported(false);
    }
    
    // Simulate loading time for 3D scene
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    if (!heroRef?.current || !contentRef?.current || !scene3DRef?.current) return;

    const ctx = gsap?.context(() => {
      // Main hero animation timeline
      const heroTl = gsap?.timeline();
      
      heroTl?.from(".hero-title", {
          duration: 1.2,
          y: 100,
          opacity: 0,
          ease: "power3.out",
          stagger: 0.2
        })?.from(".hero-subtitle", {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power2.out",
          delay: 0.3
        })?.from(".hero-buttons", {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: "back.out(1.7)",
          delay: 0.5
        })?.from(".hero-trust", {
          duration: 0.6,
          y: 20,
          opacity: 0,
          ease: "power2.out",
          delay: 0.7
        });

      // Parallax effect for 3D scene
      ScrollTrigger?.create({
        trigger: heroRef?.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self?.progress;
          setScrollProgress(progress);
          
          // Parallax effect on content
          gsap?.to(contentRef?.current, {
            y: progress * -100,
            opacity: 1 - progress * 0.8,
            duration: 0.3
          });

          // 3D scene parallax
          if (scene3DRef?.current) {
            gsap?.to(scene3DRef?.current, {
              scale: 1 + progress * 0.2,
              rotationY: progress * 10,
              duration: 0.3
            });
          }
        }
      });

      // Floating animation for trust indicators
      gsap?.to(".trust-indicator", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.3,
        repeat: -1,
        yoyo: true
      });

    }, heroRef);

    return () => ctx?.revert();
  }, []);

  // WebGL Fallback Component
  const WebGLFallback = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-background">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f27e33%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      {/* Enhanced mock crane silhouette */}
      <div className="absolute right-1/4 top-1/4 transform-gpu">
        <motion.div
          animate={{ 
            rotate: [0, 2, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "sine.inOut" 
          }}
          className="w-1 h-96 bg-secondary/60 origin-bottom"
        />
        <motion.div
          animate={{ 
            scaleX: [1, 1.05, 1],
            y: [0, -2, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "sine.inOut",
            delay: 1
          }}
          className="absolute top-0 w-64 h-1 bg-secondary/60"
        />
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "sine.inOut",
            delay: 2
          }}
          className="absolute top-16 w-16 h-12 bg-accent/60 rounded-sm"
        />
      </div>
      
      {/* Enhanced floating particles */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-30, 30],
            x: [-10, 10],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "sine.inOut"
          }}
        />
      ))}

      {/* Construction grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }, (_, i) => (
            <div key={i} className="border border-secondary/20" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-background">
      {/* 3D Scene or Fallback */}
      {isLoading ? (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-background flex items-center justify-center">
          <div className="text-center space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full mx-auto"
            />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-inter text-foreground text-lg"
            >
              Inicializando experiencia 3D futurista...
            </motion.p>
          </div>
        </div>
      ) : isWebGLSupported ? (
        <div ref={scene3DRef} className="absolute inset-0">
          <ConstructionScene3D 
            scrollProgress={scrollProgress} 
            className="w-full h-full"
          />
        </div>
      ) : (
        <WebGLFallback />
      )}
      {/* Content Overlay with Enhanced Animations */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div ref={contentRef} className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="space-y-8"
            >
              {/* Main Headline with GSAP Animation Classes */}
              <div className="space-y-6">
                <div className="hero-title">
                  <h1 className="font-orbitron font-black text-6xl lg:text-8xl text-foreground leading-none tracking-tight">
                    <span className="block">Construimos el</span>
                    <span className="block text-transparent bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text animate-pulse">
                      Futuro
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

              {/* Enhanced CTA Buttons */}
              <motion.div
                className="hero-buttons flex flex-col sm:flex-row gap-6"
                whileHover={{ scale: 1.01 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  iconName="MessageSquare"
                  iconPosition="left"
                  className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect transform hover:scale-105 transition-all duration-500 text-xl py-6 px-8"
                  onClick={() => window.location.href = '/contact-quote-request'}
                >
                  Solicitar Cotización 3D
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-500 text-xl py-6 px-8 backdrop-blur-sm bg-white/5"
                  onClick={() => window.location.href = '/services-portfolio-showcase'}
                >
                  Explorar Proyectos
                </Button>
              </motion.div>

              {/* Enhanced Trust Indicators */}
              <motion.div
                className="hero-trust flex flex-wrap items-center gap-8 pt-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <motion.div
                  className="trust-indicator flex items-center space-x-3 text-muted-foreground group"
                  whileHover={{ scale: 1.1, color: "#10b981" }}
                >
                  <Icon name="Shield" size={24} className="text-success group-hover:animate-pulse" />
                  <span className="font-inter text-sm font-medium">Certificación ISO 9001</span>
                </motion.div>
                
                <motion.div
                  className="trust-indicator flex items-center space-x-3 text-muted-foreground group"
                  whileHover={{ scale: 1.1, color: "#00d4ff" }}
                >
                  <Icon name="Award" size={24} className="text-accent group-hover:animate-bounce" />
                  <span className="font-inter text-sm font-medium">15+ Años Experiencia</span>
                </motion.div>
                
                <motion.div
                  className="trust-indicator flex items-center space-x-3 text-muted-foreground group"
                  whileHover={{ scale: 1.1, color: "#f27e33" }}
                >
                  <Icon name="Users" size={24} className="text-secondary group-hover:animate-spin" />
                  <span className="font-inter text-sm font-medium">250+ Proyectos Completados</span>
                </motion.div>

                <motion.div
                  className="trust-indicator flex items-center space-x-3 text-muted-foreground group"
                  whileHover={{ scale: 1.1, color: "#f27e33" }}
                >
                  <Icon name="Zap" size={24} className="text-accent group-hover:animate-pulse" />
                  <span className="font-inter text-sm font-medium">Tecnología 3D Avanzada</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "sine.inOut" 
          }}
          className="flex flex-col items-center space-y-3 text-muted-foreground group cursor-pointer hover:text-accent transition-colors"
          onClick={() => {
            document.querySelector('.metrics-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        >
          <span className="font-inter text-sm font-medium group-hover:text-accent">
            Explora la Experiencia 3D
          </span>
          <motion.div
            animate={{ rotateX: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Icon name="ChevronDown" size={28} className="group-hover:text-accent" />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Immersive Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-100" />
      </div>
    </section>
  );
};

export default HeroSection;