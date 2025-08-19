import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text3D, Center, Float } from '@react-three/drei';

import { gsap } from 'gsap';

// 3D Tower Crane Component
const TowerCrane = ({ position = [0, 0, 0], scale = 1 }) => {
  const craneRef = useRef();
  const hookRef = useRef();
  const armRef = useRef();

  useFrame((state) => {
    if (craneRef?.current) {
      // Subtle rotation animation
      craneRef.current.rotation.y = Math.sin(state?.clock?.elapsedTime * 0.1) * 0.1;
    }
    
    if (hookRef?.current) {
      // Hook swaying animation
      hookRef.current.position.y = Math.sin(state?.clock?.elapsedTime * 0.5) * 0.5 - 8;
      hookRef.current.rotation.z = Math.sin(state?.clock?.elapsedTime * 0.3) * 0.1;
    }

    if (armRef?.current) {
      // Subtle arm movement
      armRef.current.rotation.y = Math.sin(state?.clock?.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <group ref={craneRef} position={position} scale={scale}>
      {/* Main Mast */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 20, 8]} />
        <meshStandardMaterial color="#f27e33" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Horizontal Jib */}
      <group ref={armRef}>
        <mesh position={[8, 8, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[16, 0.4, 0.4]} />
          <meshStandardMaterial color="#f27e33" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Counter-jib */}
        <mesh position={[-6, 8, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[12, 0.4, 0.4]} />
          <meshStandardMaterial color="#f27e33" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Trolley */}
        <mesh position={[4, 7.5, 0]}>
          <boxGeometry args={[1, 1, 0.8]} />
          <meshStandardMaterial color="#00d4ff" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Hook Cable */}
        <mesh ref={hookRef} position={[4, -2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 12, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        {/* Hook with SIRECC Logo */}
        <mesh ref={hookRef} position={[4, -8, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.6]} />
          <meshStandardMaterial color="#00d4ff" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      {/* Support Cables */}
      {[0, 1, 2, 3]?.map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI * 0.5) * 2, 4, Math.sin(i * Math.PI * 0.5) * 2]} rotation={[0, 0, i * Math.PI * 0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 8, 8]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      ))}
      {/* Operator Cabin */}
      <mesh position={[0, 9, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#011f4b" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Counterweight */}
      <mesh position={[-10, 6, 0]}>
        <boxGeometry args={[3, 2, 2]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.8} />
      </mesh>
    </group>
  );
};

// Urban Construction Backdrop
const UrbanBackdrop = () => {
  const buildingsRef = useRef();

  useFrame((state) => {
    if (buildingsRef?.current) {
      buildingsRef.current.rotation.y = state?.clock?.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={buildingsRef}>
      {/* City Buildings */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 50;
        const height = 8 + Math.random() * 15;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, height / 2 - 5, z]}>
            <boxGeometry args={[3 + Math.random() * 2, height, 3 + Math.random() * 2]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#1a2332" : "#0a0f1c"} 
              metalness={0.3} 
              roughness={0.7}
              emissive={i % 4 === 0 ? "#f27e33" : "#000000"}
              emissiveIntensity={i % 4 === 0 ? 0.1 : 0}
            />
          </mesh>
        );
      })}

      {/* Construction Materials */}
      {Array.from({ length: 8 }, (_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[
            (Math.random() - 0.5) * 30,
            Math.random() * 5 - 10,
            (Math.random() - 0.5) * 30
          ]}>
            <boxGeometry args={[
              1 + Math.random(),
              0.5 + Math.random() * 0.5,
              2 + Math.random()
            ]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#f27e33" : "#00d4ff"} 
              metalness={0.8} 
              roughness={0.2} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef?.current) {
      particlesRef.current.rotation.y = state?.clock?.elapsedTime * 0.02;
    }
  });

  const particlePositions = Array.from({ length: 50 }, () => ({
    x: (Math.random() - 0.5) * 100,
    y: (Math.random() - 0.5) * 50,
    z: (Math.random() - 0.5) * 100,
  }));

  return (
    <group ref={particlesRef}>
      {particlePositions?.map((pos, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[pos?.x, pos?.y, pos?.z]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color="#00d4ff" 
              emissive="#00d4ff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Camera Controller for Scroll Effects
const CameraController = ({ scrollProgress }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    gsap?.to(camera?.position, {
      duration: 2,
      x: scrollProgress * 5,
      y: 10 - scrollProgress * 5,
      z: 20 - scrollProgress * 10,
      ease: "power2.out"
    });
    
    gsap?.to(camera?.rotation, {
      duration: 2,
      x: -scrollProgress * 0.2,
      y: scrollProgress * 0.1,
      ease: "power2.out"
    });
  }, [camera, scrollProgress]);

  return null;
};

// Loading Component
const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-background">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="font-inter text-foreground text-lg">Cargando experiencia 3D...</p>
    </div>
  </div>
);

// Main 3D Scene Component
const ConstructionScene3D = ({ scrollProgress = 0, className = "" }) => {
  const sceneRef = useRef();

  useEffect(() => {
    // GSAP scroll animations
    const tl = gsap?.timeline();
    
    if (sceneRef?.current) {
      tl?.from(sceneRef?.current, {
        duration: 2,
        opacity: 0,
        scale: 0.8,
        ease: "power3.out"
      });
    }
  }, []);

  return (
    <div ref={sceneRef} className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [15, 10, 20], fov: 60 }}
        shadows
        className="w-full h-full"
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance" 
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} />
          
          {/* Lighting Setup */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[20, 20, 10]} 
            intensity={1.5} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 15, 0]} intensity={0.8} color="#00d4ff" />
          <pointLight position={[-10, 5, -10]} intensity={0.6} color="#f27e33" />

          {/* Main 3D Elements */}
          <TowerCrane position={[0, -5, 0]} scale={1} />
          <UrbanBackdrop />
          <FloatingParticles />

          {/* 3D Text */}
          <Center position={[-5, 2, 5]}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={2}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.1}
                bevelSize={0.05}
              >
                SIRECC
                <meshStandardMaterial 
                  color="#00d4ff" 
                  metalness={0.8} 
                  roughness={0.2}
                  emissive="#00d4ff"
                  emissiveIntensity={0.2}
                />
              </Text3D>
            </Float>
          </Center>

          {/* Environment */}
          <Environment preset="night" />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ConstructionScene3D;