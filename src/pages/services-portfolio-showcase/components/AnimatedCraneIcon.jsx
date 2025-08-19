import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AnimatedCraneIcon = () => {
  const controls = useAnimation();
  const craneRef = useRef(null);

  useEffect(() => {
    const animateCrane = async () => {
      // Continuous subtle animation
      await controls?.start({
        rotate: [0, 2, -2, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    };

    animateCrane();
  }, [controls]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement?.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
      
      // Move crane tip based on scroll progress
      const tipMovement = scrollProgress * 20; // Max 20px movement
      
      if (craneRef?.current) {
        craneRef.current.style.transform = `translateY(${tipMovement}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40 pointer-events-none">
      <motion.div
        ref={craneRef}
        animate={controls}
        className="relative"
      >
        {/* Crane Base */}
        <div className="relative w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center construction-shadow glow-effect">
          <Icon name="Building2" size={20} color="#ffffff" />
          
          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {[...Array(3)]?.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full"
                animate={{
                  x: [0, 20, 0],
                  y: [0, -15, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`
                }}
              />
            ))}
          </div>
        </div>

        {/* Crane Arm */}
        <motion.div
          className="absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-secondary to-transparent origin-left"
          animate={{
            scaleX: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Hook */}
        <motion.div
          className="absolute top-1/2 left-full ml-6 w-2 h-2 bg-accent rounded-full"
          animate={{
            y: [0, 4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Status Indicator */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-4 h-4 bg-success rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedCraneIcon;