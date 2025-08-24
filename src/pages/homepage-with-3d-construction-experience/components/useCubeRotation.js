import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Controla la rotación de un "cubo" (o prisma) 3D.
 * - faces: número de caras (3 por defecto)
 * - step: grados que avanza por cara (360/faces, por defecto 120)
 * - depth: distancia en Z (para translateZ)
 * - hoverToRotate: si true, rota sólo con hover; si false, auto-rotate
 * - interval: ms entre giros en auto-rotate
 */
export default function useCubeRotation({
  faces = 3,
  step = null,
  depth = 160,
  hoverToRotate = true,
  interval = 2400,
} = {}) {
  const degreesPerStep = useMemo(() => step ?? Math.floor(360 / faces), [faces, step]);
  const [angle, setAngle] = useState(0);
  const [hover, setHover] = useState(false);
  const timerRef = useRef(null);

  // auto-rotate opcional (cuando hoverToRotate === false)
  useEffect(() => {
    if (hoverToRotate) return;
    timerRef.current = setInterval(() => {
      setAngle((prev) => prev + degreesPerStep);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [hoverToRotate, degreesPerStep, interval]);

  // al entrar/salir hover (si hoverToRotate === true)
  const onMouseEnter = () => {
    if (!hoverToRotate) return;
    setHover(true);
    setAngle((prev) => prev + degreesPerStep);
  };
  const onMouseLeave = () => {
    if (!hoverToRotate) return;
    setHover(false);
  };

  return {
    angle,
    depth,
    hover,
    onMouseEnter,
    onMouseLeave,
  };
}
