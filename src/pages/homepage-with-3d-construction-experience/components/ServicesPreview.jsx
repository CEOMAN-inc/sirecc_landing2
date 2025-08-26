import React from "react";
import Button from "../../../components/ui/Button";
import Cube3D from "./Cube3D";
import useCubeRotation from "./useCubeRotation";


const PORTFOLIO_PDF_URL = `${import.meta.env.BASE_URL}docs/Portafolio_SIRECC.pdf`;
const SERVICES_OVERLAY = "/assets/images/fondo2.png";

/* === Paleta igual al HeroSection === */
const ORANGE = "#F27E33";
const NAVY   = "#1D2946";
const BASE_BG = "#0B1620";
const YELLOW = "#FFD166";
const RED = "#ff0000ff";


/* === Imágenes demo (reemplaza por tus fotos) === */
const IMG = {
  obra1: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
  obra2: "/services/obra1.png",
  obra3: "/services/obra2.png",

  acab1: "/services/acabado1.png",
  acab2: "/services/acabado2.png",
  acab3: "/services/acabado3.png",

  mant1: "/services/ml1.png",
  mant2: "/services/ml2.png",
  mant3: "/services/ml3.png",

  com1: "/services/comunicacion1.png",
  com2: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
  com3: "/services/comunicacion2.png",

  hidro1: "/services/hidro1.png",
  hidro2: "/services/hidro2.png",
  hidro3: "/services/hidro3.png",

  mob1: "/services/mobiliario1.png",
  mob2: "/services/mobiliario2.png",
  mob3: "/services/mobiliario3.png",

  elec1: "/services/electrico1.png",
  elec2: "/services/electrico2.png",
  elec3: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1600&auto=format&fit=crop",

  pub1: "/services/publico1.png",
  pub2: "/services/publico2.png",
  pub3: "/services/publico3.png",

  gas1: "/services/gas1.png",
  gas2: "/services/gas2.png",
  gas3: "/services/gas3.png",

  vid1: "/services/vidrio1.png",
  vid2: "/services/vidrio2.png",
  vid3: "/services/vidrio3.png",
};

/* === Data de servicios === */
const SERVICES = [
  {
    title: "Obra civil",
    description:
      "Prefabricados, mampostería/drywall, alturas, gases medicinales, falsos techos, excavaciones/cimentaciones y canalizaciones eléctricas e hidrosanitarias.",
    images: [IMG.obra1, IMG.obra2, IMG.obra3],
  },
  {
    title: "Acabados",
    description:
      "Ventanería (aluminio, PVC, vidrio), puertas, enchapes y revestimientos, cielos rasos (drywall, superboard, PVC, madera) y recubrimientos especiales.",
    images: [IMG.acab1, IMG.acab2, IMG.acab3],
  },
  {
    title: "Mantenimiento locativo",
    description:
      "Resane y pintura, pisos (enchapes, baldosa, laminados), cubiertas, plomería (griferías, fugas, redes) e impermeabilización de techos, placas y muros.",
    images: [IMG.mant1, IMG.mant2, IMG.mant3],
  },
  {
    title: "Comunicaciones",
    description:
      "Cómputo, centrales telefónicas, radio, CCTV, control de acceso, mobiliario especializado y TI con soporte.",
    images: [IMG.com1, IMG.com2, IMG.com3],
  },
  {
    title: "Hidrosanitarios",
    description:
      "Aparatos de bajo consumo, optimización de agua (riego), redes hidráulicas/sanitarias (potable, residuales, lluvias) y cuartos de bombas. NTC 1500.",
    images: [IMG.hidro1, IMG.hidro2, IMG.hidro3],
  },
  {
    title: "Mobiliario",
    description:
      "Diseño/instalación para oficinas, instituciones y sector salud: recepciones, estaciones y especiales (melamina, fórmica, metálico, tapizado).",
    images: [IMG.mob1, IMG.mob2, IMG.mob3],
  },
  {
    title: "Sistemas eléctricos",
    description:
      "Redes BT/MT internas/externas, canalizaciones, tableros, puesta a tierra e iluminación técnica/emergencia eficiente.",
    images: [IMG.elec1, IMG.elec2, IMG.elec3],
  },
  {
    title: "Espacios públicos",
    description:
      "Canchas, cerramientos, señalización, andenes, senderos, zonas verdes y mobiliario urbano.",
    images: [IMG.pub1, IMG.pub2, IMG.pub3],
  },
  {
    title: "Gas natural",
    description:
      "Redes nuevas, redistribución de puntos, gasodomésticos, equipos industriales, mantenimiento y NTC 2505.",
    images: [IMG.gas1, IMG.gas2, IMG.gas3],
  },
  {
    title: "Vidrio y aluminio",
    description:
      "Divisiones aluminio/vidrio o acero/vidrio, puertas, accesorios y carpintería metálica para cerramientos y pasamanos.",
    images: [IMG.vid1, IMG.vid2, IMG.vid3],
  },
];

/* === Card con 3D + overlay estilo Hero === */
const ServiceCard = ({ title, description, images }) => {
  const { angle, depth, onMouseEnter, onMouseLeave } = useCubeRotation({
    faces: 3,
    hoverToRotate: true,
    interval: 2400,
    depth: 170,
  });

  return (
    <div
      className="group relative w-full h-full bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Cube3D
        images={images}
        angle={angle}
        depth={depth}
        className="bg-black/5"
overlay={
  <div className="w-full p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
    {/* CARD glass reforzada */}
    <div className="relative rounded-2xl overflow-hidden border border-white/12 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      {/* Capa 1: blur + blanco translúcido (sube/ajusta opacidad y blur a gusto) */}
      <div className="absolute inset-0 backdrop-blur-2xl backdrop-saturate-100 bg-white/10" />

      {/* Capa 2: scrim suave para contraste extra (puedes subir la opacidad si hace falta) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-white/20 to-white/10" />

      {/* Contenido */}
      <div className="relative p-5">
        <h3
          className="font-orbitron font-semibold text-[1.25rem] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
          style={{ color: ORANGE }}
        >
          {title}
        </h3>

        {/* Descripción en NAVY */}
        <p className="font-inter text-sm leading-6 mt-3" style={{ color: NAVY }}>
          {description}
        </p>

       <div className="mt-5 relative inline-block group"> {/* <- inline-block o w-fit */}
  <span
    className="pointer-events-none absolute -inset-2 rounded-xl opacity-70 group-hover:opacity-100 blur-md transition duration-500"
    style={{ background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})` }}
    aria-hidden
  />
  <Button
    variant="default"
    size="sm"
    className="relative rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/10
               hover:scale-[1.02] transition-all duration-300"
    onClick={() => (window.location.href = "/services-portfolio-showcase")}
  >
    Más detalle
  </Button>
</div>

      </div>
    </div>
  </div>
}
      />
      

{/* Pie de la card */}
<div className="p-5">
  <div className="flex items-center justify-between">
    <h4
      className="font-orbitron font-semibold text-base sm:text-lg"
      style={{ color: ORANGE }}   // ← naranja de la constante ORANGE
    >
      {title}
    </h4>
    <span className="text-xs text-muted-foreground hidden sm:block"></span>
  </div>
</div>
    </div>
  );
};

/* === Sección === */
const ServicesPreview = () => {
  return (
  <section
  className="relative overflow-hidden py-20 lg:py-28 bg-background"
  style={{ "--orange": ORANGE, "--navy": NAVY }}
>
  {/* Fondo extra SOLO para esta sección */}
  <div className="pointer-events-none absolute inset-0 z-0">
    {/* Imagen difuminada con mask en la parte superior */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${SERVICES_OVERLAY})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(14px) saturate(110%)",
        opacity: 0.38,                     // sube/baja para más/menos “leche”
        transform: "scale(1.06)",          // evita bordes al blurear
        // 🔑 desvanece el top de la imagen para que no corte duro
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.6) 18%, rgba(0,0,0,1) 36%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.6) 18%, rgba(0,0,0,1) 36%)",
      }}
    />

    {/* Scrim suave (más ligero para no matar la imagen) */}
    <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/25 to-background/50" />
  </div>

  {/* Feather que se mete sobre el Hero para fusionar la unión */}
  <div
    className="pointer-events-none absolute -top-24 left-0 right-0 h-24 z-20"
    style={{
      // empieza totalmente transparente y baja a tu color de fondo
      background:
        "linear-gradient(to bottom, rgba(11,22,32,0) 0%, rgba(11,22,32,.65) 100%)",
    }}
  />

  {/* Contenido por encima del fondo */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
     {/* Encabezado */}
<div className="text-center mb-14">
  {/* Barra decorativa con la paleta */}
  <div
    className="mx-auto mb-6 h-[3px] w-24 rounded-full"
    style={{ background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})` }}
  />

  {/* Título principal */}
  <h2 className="font-orbitron font-extrabold text-4xl lg:text-5xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,.25)]">
    Servicios
  </h2>

  {/* Marca SIRECC en naranja sólido */}
  <span
    className="mt-1 block font-orbitron font-black text-4xl lg:text-5xl"
    style={{ color: ORANGE }}
  >
    SIRECC
  </span>

  {/* Mensaje llamativo */}
  <p className="mt-6 font-inter text-lg lg:text-[1.15rem] leading-relaxed text-white/85 max-w-4xl mx-auto">
    Aquí encuentras <span style={{ color: ORANGE }} className="font-semibold">nuestros servicios</span> para tu proyecto:
    obra civil, acabados, mantenimiento, comunicaciones, hidrosanitarios, mobiliario, sistemas eléctricos,
    espacios públicos, gas natural, vidrio/aluminio y mucho más.
  </p>
</div>


        {/* Grilla: última card centrada en xl y mismo tamaño en todas */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-fr">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`w-full ${i === SERVICES.length - 1 ? "xl:col-start-2" : ""}`}
            >
              <ServiceCard {...s} />
            </div>
          ))}
        </div>

              {/* CTA inferior – estilo Hero */}
        <div className="relative mt-16">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10">
            {/* Halo de marca */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: `linear-gradient(90deg, rgba(29,41,70,.55) 0%, rgba(29,41,70,.35) 40%, rgba(242,126,51,.20) 100%)`,
              }}
            />
            {/* Glass suave */}
            <div className="relative p-10 md:p-14 bg-white/5 backdrop-blur-sm text-center">
              <h3 className="font-orbitron font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3">
                ¿Tienes un proyecto en mente?
              </h3>
              <p className="font-inter text-white/85 mb-7 max-w-2xl mx-auto">
                Te acompañamos desde la planificación hasta la entrega final.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                {/* Botón 1 – ORANGE → NAVY (glow) */}
                <div className="relative inline-block group">
                  <span
                    className="pointer-events-none absolute -inset-[10px] rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-500"
                    style={{ background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})` }}
                    aria-hidden
                  />
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Calendar"
                    iconPosition="left"
                    className="relative rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/10
                               hover:scale-[1.02] transition-all duration-300"
                    onClick={() => (window.location.href = "/contact-quote-request")}
                  >
                    Agendar consulta
                  </Button>
                </div>

                {/* Botón 2 – NAVY → ORANGE (glow) – DESCARGA PDF */}
                <div className="relative inline-block group">
                  <span
                    className="pointer-events-none absolute -inset-[10px] rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-500"
                    style={{ background: `linear-gradient(90deg, ${NAVY}, ${ORANGE})` }}
                    aria-hidden
                  />
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Eye"
                    iconPosition="left"
                    className="relative rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/10
                               hover:scale-[1.02] transition-all duration-300"
                    onClick={downloadPortfolio}
                  >
                    Ver portafolio (PDF)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{/* fin .max-w-7xl */}
    </section>
  );
  
  
  // === helper para descargar el PDF ===
function downloadPortfolio() {
  const a = document.createElement("a");
  a.href = PORTFOLIO_PDF_URL;
  a.download = "Portafolio_SIRECC.pdf";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
};

export default ServicesPreview;
