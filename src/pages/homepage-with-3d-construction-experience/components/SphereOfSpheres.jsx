import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- VERSIÓN CON ESFERA MÁS PEQUEÑA ---

const createCircleTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  context.beginPath();
  context.arc(32, 32, 30, 0, 2 * Math.PI);
  context.fillStyle = 'white';
  context.fill();
  return new THREE.CanvasTexture(canvas);
};

export default function SphereOfSpheres() {
  const pointsRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  const particleCount = 1000;
  const sphereRadius = 4; // ✅ AQUÍ SE REDUJO EL TAMAÑO DE LA ESFERA

  // Paleta de colores
  const colorOrange = new THREE.Color('#f27e33');
  const colorCyan = new THREE.Color('#00d4ff');
  const brandColors = [
    new THREE.Color('#f27e33'), new THREE.Color('#00d4ff'),
    new THREE.Color('#ef4444'), new THREE.Color('#10b981'),
  ];
  
  const tempColor = new THREE.Color();

  // Atributos de cada partícula
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      const initialPosition = new THREE.Vector3().setFromSphericalCoords(sphereRadius, phi, theta);
      // La explosión ahora es proporcional al nuevo tamaño
      const explosionPosition = initialPosition.clone().normalize().multiplyScalar(sphereRadius * 4.0);
      
      temp.push({
        initialPosition,
        explosionPosition,
        currentPosition: initialPosition.clone(),
        randomFactor: Math.random(),
        explosionColor: brandColors[i % 4],
      });
    }
    return temp;
  }, [particleCount, sphereRadius]);

  const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const colors = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const circleTexture = useMemo(() => createCircleTexture(), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];

      // Pálpito de color en estado normal
      const palpitationFactor = (Math.sin(t + p.randomFactor * 10) + 1) / 2;
      const pulseColor = tempColor.clone().lerpColors(colorOrange, colorCyan, palpitationFactor);
      
      // Mezclamos el color del pálpito con el color de explosión según el hover
      const finalColor = pulseColor.lerp(p.explosionColor, isHovered ? 1 : 0);
      colors.set([finalColor.r, finalColor.g, finalColor.b], i * 3);

      // Pálpito de posición en estado normal
      const pulseRadius = sphereRadius + Math.sin(t * 2 + p.randomFactor * 10) * 0.5;
      const normalPosition = p.initialPosition.clone().normalize().multiplyScalar(pulseRadius);

      // Interpolamos suavemente a la posición de explosión solo si está en hover
      p.currentPosition.lerp(isHovered ? p.explosionPosition : normalPosition, 0.04);
      
      positions.set([p.currentPosition.x, p.currentPosition.y, p.currentPosition.z], i * 3);
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points 
      ref={pointsRef} 
      position={[6, 0, 0]}
      // Eventos para detectar cuándo el mouse está sobre la esfera
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.25} // ✅ AQUÍ SE AJUSTÓ EL TAMAÑO DE LAS PARTÍCULAS
        vertexColors
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={circleTexture}
        transparent={true}
      />
    </points>
  );
}