import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SphereOfSpheres from './SphereOfSpheres';

gsap.registerPlugin(ScrollTrigger);

const ORANGE = '#F27E33';
const NAVY   = '#1D2946';
const BASE_BG = '#0B1620';

export default function GlobalSphereLayer() {
  const groupRef = useRef(null);
  const [clickExplosion, setClickExplosion] = useState(0);

  // Recibe eventos globales para la "explosión"
  useEffect(() => {
    const boom = () => setClickExplosion((c) => c + 1);

    // Trigger desde CTAs del sitio
    window.addEventListener('hero-explode', boom);

    // Relay opcional: clic/touch en el lado derecho del viewport
    const relay = (ev) => {
      const t = ev.touches?.[0];
      const x = (t?.clientX ?? ev.clientX) ?? 0;
      if (x >= window.innerWidth * 0.60) boom();
    };
    window.addEventListener('click', relay, { passive: true });
    window.addEventListener('touchstart', relay, { passive: true });

    return () => {
      window.removeEventListener('hero-explode', boom);
      window.removeEventListener('click', relay);
      window.removeEventListener('touchstart', relay);
    };
  }, []);

  // Parallax vertical para que acompañe todo el scroll
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.body.scrollHeight - window.innerHeight,
      scrub: true,
      onUpdate: (self) => {
        if (!groupRef.current) return;
        const y = gsap.utils.mapRange(0, 1, 1.6, -1.6, self.progress);
        gsap.to(groupRef.current.position, { y, duration: 0.25, ease: 'power1.out', overwrite: true });
        gsap.to(groupRef.current.rotation, { y: self.progress * Math.PI * 2, duration: 0.6, ease: 'none', overwrite: true });
      },
    });
    return () => st.kill();
  }, []);

  // Zona visible de la esfera (radial, lado derecho)
  const MASK_CX = '84%';
  const MASK_CY = '45%';
  const MASK_INNER = '52%';
  const MASK_OUTER = '92%';

  return (
    // z-[5]: encima de fondos/overlays del Hero, debajo del texto (que irá en z-[20])
    <div className="fixed inset-0 z-[5] pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          style={{ background: 'transparent' }}
        >
          <fog attach="fog" args={[BASE_BG, 8, 38]} />
          <group ref={groupRef} position={[12, 0.5, 1]}>
            <SphereOfSpheres
              count={2000}
              radius={7}
              pulseAmp={0.32}
              autoRotate={0.14}
              mouseIntensity={0.65}
              baseInnerColor={NAVY}
              baseOuterColor={ORANGE}
              explodePalette={[ORANGE, NAVY]}
              materialOpacity={0}
              pointSize={5}
              clickExplosion={clickExplosion}
            />
          </group>
        </Canvas>
      </Suspense>

      {/* Color grading sutil */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{ background: `linear-gradient(180deg, ${NAVY}26 0%, transparent 40%, ${ORANGE}26 100%)` }}
      />

      {/* Máscara radial: visible en la derecha, se desvanece hacia afuera */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: `radial-gradient(circle at ${MASK_CX} ${MASK_CY},
            rgba(0,0,0,1) ${MASK_INNER},
            rgba(0,0,0,0) ${MASK_OUTER}
          )`,
          maskImage: `radial-gradient(circle at ${MASK_CX} ${MASK_CY},
            rgba(0,0,0,1) ${MASK_INNER},
            rgba(0,0,0,0) ${MASK_OUTER}
          )`,
        }}
      />
    </div>
  );
}
