import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

// --- Paleta de colores ---
const brandColors = [
  '#ff6600ff', // Naranja
  '#00d4ff', // Cian
  '#ee0000ff', // Rojo
  '#34ff53', // Verde
].map((color) => new THREE.Color(color));

const colorOrange = new THREE.Color('#ffffffff');
const colorCyan = new THREE.Color('#00d4ff');

// Este es el componente principal y único que necesitas.
export default function SphereOfSpheres({ isButtonHovered = false }) {
  const groupRef = useRef();
  const instancesRef = useRef();
  const particleCount = 500;
  const compactRadius = 5;
  const expandedRadius = 16;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      
      const originalPosition = new THREE.Vector3(x, y, z).multiplyScalar(compactRadius);
      const expandedPosition = new THREE.Vector3().randomDirection().multiplyScalar(compactRadius + Math.random() * (expandedRadius - compactRadius));

      temp.push({
        originalPosition,
        expandedPosition,
        currentPosition: originalPosition.clone(),
        randomColor: brandColors[Math.floor(Math.random() * brandColors.length)],
        randomScale: 0.3 + Math.random() * 0.6,
        color: new THREE.Color(), 
      });
    }
    return temp;
  }, [particleCount, compactRadius, expandedRadius]);

  useFrame((state) => {
    if (!instancesRef.current) return;

    const { clock, mouse } = state;
    const t = clock.getElapsedTime();

    groupRef.current.rotation.y = t * 0.05;

    const mouseDistance = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
    const dispersionFromMouse = THREE.MathUtils.smoothstep(1.0 - mouseDistance, 0.5, 1.0);
    
    const dispersionFactor = THREE.MathUtils.lerp(
      dispersionFromMouse, 
      isButtonHovered ? 1.0 : dispersionFromMouse, 
      0.1
    );

    particles.forEach((particle, i) => {
      const { originalPosition, expandedPosition, currentPosition, randomColor, randomScale, color } = particle;

      let targetColor;
      let targetScale = 0.2;
      let targetPosition;

      if (dispersionFactor > 0.1) {
        // Estado de Explosión
        targetColor = randomColor;
        targetScale = randomScale;
        targetPosition = expandedPosition;
      } else {
        // Estado Compacto con Pálpito
        const palpitationFactor = (Math.sin(t * 2 + i * 0.2) + 1) / 2;
        targetColor = new THREE.Color().lerpColors(colorOrange, colorCyan, palpitationFactor);
        const pulse = Math.sin(t * 2) * 0.05 + 1;
        targetPosition = originalPosition.clone().multiplyScalar(pulse);
      }

      currentPosition.lerp(targetPosition, 0.05);
      color.lerp(targetColor, 0.07);
      dummy.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      
      dummy.position.copy(currentPosition);
      dummy.updateMatrix();
      
      instancesRef.current.setMatrixAt(i, dummy.matrix);
      instancesRef.current.setColorAt(i, color);
    });

    instancesRef.current.instanceMatrix.needsUpdate = true;
    if (instancesRef.current.instanceColor) {
      instancesRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[6, 0, 0]}>
      <Instances ref={instancesRef} limit={particles.length}>
        <sphereGeometry args={[1, 32, 32]} />
        {/* Material simplificado para mostrar los colores puros */}
        <meshStandardMaterial
          roughness={0.2}
          metalness={0.8}
          vertexColors={true} // ¡Importante para que cada esfera tenga su color!
        />
        {particles.map((data, i) => (
          <Instance key={i} />
        ))}
      </Instances>
    </group>
  );
}
