import React from "react";
const Img = ({ src, alt, className = "" }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
);

/**
 * Renderiza un prisma/cubo 3D con N caras, usando CSS 3D.
 * props:
 * - images: array de URLs (usa sólo las primeras N caras)
 * - angle: rotación Y (grados)
 * - depth: distancia Z de cada cara (px)
 * - className: clases extra para el wrapper
 * - overlay: nodo React que se superpone (descripción/botón)
 */
export default function Cube3D({
  images = [],
  angle = 0,
  depth = 160,
  className = "",
  overlay = null,
  heightClass = "h-56 sm:h-64",
}) {
  const faces = images.slice(0, Math.max(3, images.length)); // mínimo 3

  return (
    <div className={`relative w-full ${heightClass} [perspective:1200px] ${className}`}>
      {/* Inner 3D */}
      <div
        className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-700 ease-out"
        style={{ transform: `translateZ(-${depth}px) rotateY(${angle}deg)` }}
      >
        {faces.map((src, idx) => {
          const deg = Math.floor(360 / faces.length) * idx;
          return (
            <div
              key={`face-${idx}`}
              className="absolute inset-0"
              style={{
                transform: `rotateY(${deg}deg) translateZ(${depth}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <Img src={src} alt={`face-${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* overlay opcional */}
      {overlay ? (
<div className="absolute inset-0 flex items-end justify-center">{overlay}</div>
      ) : null}
    </div>
  );
}
