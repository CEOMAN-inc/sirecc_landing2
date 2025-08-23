import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function SphereOfSpheres({
  count = 1600,
  radius = 5.2,
  pulseAmp = 0.35,      // amplitud del “palpito”
  pulseSpeed = 1.2,     // velocidad del “palpito”
  autoRotate = 0.15,    // giro base
  mouseIntensity = 0.7, // cuánto afecta el mouse al giro
  position = [6, 0, 0],

  // ★ NUEVOS CONTROLES DE EXPLOSIÓN
  explodeFactor = 2.6,   // multiplica el radio durante la explosión (antes era 4.0)
  explodeHardCap = 18.4, // tope absoluto (en world units) para que no se desborde
}) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const colliderRef = useRef();
  const { pointer, clock } = useThree();

  // ---- Colores ----
  const baseInner = useMemo(() => new THREE.Color('#1D2946'), []); // gris al contraer
  const baseOuter = useMemo(() => new THREE.Color('#F27E33'), []); // azul al expandir
  const explodePalette = useMemo(
    () => ['#f27e33', '#00d4ff', '#fb923c', '#3cc9c6', '#f472b6'].map(c => new THREE.Color(c)),
    []
  );
  const tempColor = useMemo(() => new THREE.Color(), []);

  // ---- Direcciones unitarias sobre esfera (Fibonacci sphere) ----
  const dirs = useMemo(() => {
    const arr = new Array(count);
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // [-1, 1]
      const r = Math.sqrt(1 - y * y);
      const theta = ga * i;
      arr[i] = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r);
    }
    return arr;
  }, [count]);

  // Colores de explosión preasignados por partícula (para variedad)
  const explodeColors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const c = explodePalette[i % explodePalette.length];
      arr[i * 3 + 0] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count, explodePalette]);

  // Buffers
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const colors    = useMemo(() => new Float32Array(count * 3), [count]);

  // Textura disco para puntos redondos
  const disk = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    ctx.beginPath(); ctx.arc(32, 32, 30, 0, Math.PI * 2); ctx.fillStyle = 'white'; ctx.fill();
    return new THREE.CanvasTexture(c);
  }, []);

  // Estado de hover (dispara la explosión de colores y radio)
  const [hovered, setHovered] = useState(false);
  const explode = useRef(0); // 0 → normal, 1 → explotar

  // Capturador “invisible” de puntero
  const colliderRadius = radius * 1.15;

  useFrame(() => {
    if (!groupRef.current || !pointsRef.current) return;

    const t = clock.getElapsedTime();

    // --- giro con mouse + autorrotación ---
    const targetX = pointer.y * mouseIntensity;
    const targetY = pointer.x * mouseIntensity + t * autoRotate;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;

    // --- factor de explosión (easing) ---
    const targetExplode = hovered ? 1 : 0;
    explode.current += (targetExplode - explode.current) * 0.08;

    // --- palpito global (color + radio) en modo normal ---
    const pf = (Math.sin(t * pulseSpeed) + 1) / 2; // 0..1
    const base = tempColor.lerpColors(baseInner, baseOuter, pf);
    const br = base.r, bg = base.g, bb = base.b;

    // radio “respirando”
    let rr = radius + (pf - 0.5) * 2 * pulseAmp;

    // ★ límite de explosión:
    //    - primero fijamos un objetivo multiplicado por factor
    //    - luego lo limitamos con un CAP absoluto para no invadir toda la pantalla
    const explodeTarget = radius * explodeFactor;          // p.ej. 5.2 * 1.9 ≈ 9.88
    const explodeRadius = Math.min(explodeTarget, explodeHardCap);
    rr = THREE.MathUtils.lerp(rr, explodeRadius, explode.current);

    const pos = positions;
    const col = colors;

    for (let i = 0; i < count; i++) {
      const v = dirs[i];
      const k = i * 3;

      // posición radial
      pos[k + 0] = v.x * rr;
      pos[k + 1] = v.y * rr;
      pos[k + 2] = v.z * rr;

      // color
      if (explode.current > 0) {
        const er = explodeColors[k + 0];
        const eg = explodeColors[k + 1];
        const eb = explodeColors[k + 2];
        col[k + 0] = br + (er - br) * explode.current;
        col[k + 1] = bg + (eg - bg) * explode.current;
        col[k + 2] = bb + (eb - bb) * explode.current;
      } else {
        col[k + 0] = br;
        col[k + 1] = bg;
        col[k + 2] = bb;
      }
    }

    const geo = pointsRef.current.geometry;
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Capturador invisible para hover */}
      <mesh
        ref={colliderRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[colliderRadius, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} depthTest={false} />
      </mesh>

      {/* Nube de puntos esférica */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
          <bufferAttribute attach="attributes-color"    array={colors}    count={count} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.24}
          vertexColors
          sizeAttenuation
          depthWrite={false}
          transparent
          opacity={0.78}
          blending={THREE.AdditiveBlending}
          map={disk}
        />
      </points>
    </group>
  );
}
