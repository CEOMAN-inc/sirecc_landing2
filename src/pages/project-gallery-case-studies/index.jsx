import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ProjectFilter from './components/ProjectFilter';
import FeaturedCarousel from './components/FeaturedCarousel';
import ProjectModal from './components/ProjectModal';

const ProjectGallery = () => {
  const [filters, setFilters] = useState({
    type: 'all',
    scale: 'all',
    year: 'all',
    location: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  // Mock project data
  const allProjects = [
    {
      id: 1,
      name: "Torre Empresarial Bogotá",
      type: "commercial",
      location: "Bogotá",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      description: "Moderno complejo empresarial de 25 pisos con tecnología sostenible y espacios colaborativos innovadores.",
      fullDescription: `Torre Empresarial Bogotá representa la vanguardia en construcción comercial sostenible. Este impresionante edificio de 25 pisos combina diseño arquitectónico contemporáneo con tecnologías verdes avanzadas.\n\nEl proyecto incluye sistemas de energía renovable, recolección de agua lluvia, y espacios verdes integrados que mejoran la calidad del aire interior. Cada piso está diseñado para maximizar la luz natural y ofrecer vistas panorámicas de la ciudad.`,
      completionDate: "Marzo 2024",
      duration: "18 meses",
      size: "45.000 m²",
      budget: "$25.000 - $30.000 millones COP",
      teamSize: "120 profesionales",
      rating: 5,
      featured: true,
      keyFeatures: [
        "Certificación LEED Gold",
        "Sistema de automatización inteligente",
        "Helipuerto en la azotea",
        "Estacionamiento subterráneo para 500 vehículos",
        "Centro de conferencias de última generación",
        "Jardines verticales en fachada"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"
      ],
      timeline: [
        {
          title: "Planificación y Diseño",
          description: "Desarrollo de planos arquitectónicos y obtención de permisos",
          date: "Septiembre 2022",
          duration: "3 meses",
          icon: "FileText"
        },
        {
          title: "Preparación del Terreno",
          description: "Excavación y preparación de cimientos",
          date: "Diciembre 2022",
          duration: "2 meses",
          icon: "Truck"
        },
        {
          title: "Construcción Estructural",
          description: "Levantamiento de estructura principal y pisos",
          date: "Febrero 2023",
          duration: "10 meses",
          icon: "Building"
        },
        {
          title: "Acabados e Instalaciones",
          description: "Sistemas eléctricos, plomería y acabados interiores",
          date: "Diciembre 2023",
          duration: "3 meses",
          icon: "Wrench"
        }
      ],
      client: {
        name: "Carlos Mendoza",
        position: "Director General",
        company: "Grupo Empresarial Andino",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      testimonial: "SIRECC superó todas nuestras expectativas. La calidad de construcción es excepcional y el proyecto se completó dentro del tiempo y presupuesto acordado. Su equipo demostró profesionalismo y atención al detalle en cada fase del proyecto."
    },
    {
      id: 2,
      name: "Conjunto Residencial Los Arrayanes",
      type: "residential",
      location: "Medellín",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      description: "Exclusivo conjunto residencial de 150 apartamentos con amenidades de lujo y espacios verdes.",
      fullDescription: `Conjunto Residencial Los Arrayanes es un proyecto habitacional de alta gama que redefine el concepto de vida moderna en Medellín. Con 150 apartamentos distribuidos en 8 torres, ofrece espacios amplios y luminosos con acabados de primera calidad.\n\nEl conjunto cuenta con amplias zonas verdes, piscinas, gimnasio, salón social y parque infantil, creando un ambiente familiar seguro y confortable.`,
      completionDate: "Enero 2024",
      duration: "24 meses",
      size: "35.000 m²",
      budget: "$18.000 - $22.000 millones COP",
      teamSize: "85 profesionales",
      rating: 5,
      featured: true,
      keyFeatures: [
        "150 apartamentos de 2 y 3 habitaciones",
        "Piscina olímpica y piscina infantil",
        "Gimnasio completamente equipado",
        "Parque infantil y zonas verdes",
        "Portería 24/7 con sistema de seguridad",
        "Salón social y BBQ"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
      ],
      timeline: [
        {
          title: "Diseño Arquitectónico",
          description: "Desarrollo del concepto y planos del conjunto",
          date: "Enero 2022",
          duration: "4 meses",
          icon: "FileText"
        },
        {
          title: "Obras Civiles",
          description: "Construcción de infraestructura y torres",
          date: "Mayo 2022",
          duration: "16 meses",
          icon: "Building"
        },
        {
          title: "Acabados y Amenidades",
          description: "Instalación de acabados y construcción de amenidades",
          date: "Septiembre 2023",
          duration: "4 meses",
          icon: "Wrench"
        }
      ],
      client: {
        name: "María Elena Rodríguez",
        position: "Gerente de Proyectos",
        company: "Constructora Valle Verde",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      testimonial: "La experiencia con SIRECC fue extraordinaria. Lograron crear un espacio que combina perfectamente funcionalidad y estética. Los residentes están encantados con la calidad de construcción y las amenidades."
    },
    {
      id: 3,
      name: "Planta Industrial Textil",
      type: "industrial",
      location: "Cali",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      description: "Moderna planta industrial con tecnología automatizada y sistemas de eficiencia energética.",
      fullDescription: `Esta planta industrial textil representa la modernización del sector manufacturero en Colombia. Diseñada con los más altos estándares de eficiencia y sostenibilidad, incorpora tecnología de punta para optimizar los procesos productivos.\n\nLa instalación cuenta con sistemas automatizados de control de calidad, manejo de materiales y gestión energética que reducen significativamente los costos operativos.`,
      completionDate: "Noviembre 2023",
      duration: "15 meses",
      size: "28.000 m²",
      budget: "$15.000 - $18.000 millones COP",
      teamSize: "95 profesionales",
      rating: 4,
      featured: false,
      keyFeatures: [
        "Sistemas de automatización industrial",
        "Planta de tratamiento de aguas",
        "Paneles solares para autoconsumo",
        "Áreas de almacenamiento climatizadas",
        "Laboratorio de control de calidad",
        "Oficinas administrativas integradas"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
      ],
      timeline: [
        {
          title: "Ingeniería de Detalle",
          description: "Diseño técnico y especificaciones industriales",
          date: "Agosto 2022",
          duration: "3 meses",
          icon: "FileText"
        },
        {
          title: "Construcción Principal",
          description: "Levantamiento de naves industriales",
          date: "Noviembre 2022",
          duration: "9 meses",
          icon: "Building"
        },
        {
          title: "Instalaciones Especializadas",
          description: "Montaje de equipos y sistemas automatizados",
          date: "Agosto 2023",
          duration: "3 meses",
          icon: "Settings"
        }
      ],
      client: {
        name: "Roberto Jiménez",
        position: "Director de Operaciones",
        company: "Textiles del Pacífico S.A.",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg"
      },
      testimonial: "SIRECC demostró gran expertise en construcción industrial. La planta opera con máxima eficiencia y los sistemas implementados han superado nuestras expectativas de productividad."
    },
    {
      id: 4,
      name: "Centro Comercial Plaza Norte",
      type: "commercial",
      location: "Barranquilla",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      description: "Moderno centro comercial de 3 niveles con más de 200 locales comerciales y entretenimiento.",
      fullDescription: `Centro Comercial Plaza Norte es un proyecto de gran envergadura que revitaliza la zona norte de Barranquilla. Con más de 200 locales comerciales distribuidos en 3 niveles, ofrece una experiencia de compras completa.\n\nEl diseño arquitectónico privilegia la circulación natural, la iluminación LED y sistemas de climatización eficientes que garantizan el confort de los visitantes.`,
      completionDate: "Junio 2023",
      duration: "20 meses",
      size: "52.000 m²",
      budget: "$35.000 - $40.000 millones COP",
      teamSize: "150 profesionales",
      rating: 5,
      featured: true,
      keyFeatures: [
        "Más de 200 locales comerciales",
        "Patio de comidas con 25 restaurantes",
        "Cines multiplex de 8 salas",
        "Estacionamiento para 1.200 vehículos",
        "Área de entretenimiento familiar",
        "Sistemas de seguridad avanzados"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop"
      ],
      timeline: [
        {
          title: "Planificación Comercial",
          description: "Estudio de mercado y diseño comercial",
          date: "Octubre 2021",
          duration: "4 meses",
          icon: "FileText"
        },
        {
          title: "Construcción Estructural",
          description: "Levantamiento de estructura y niveles",
          date: "Febrero 2022",
          duration: "12 meses",
          icon: "Building"
        },
        {
          title: "Acabados Comerciales",
          description: "Instalación de locales y sistemas especializados",
          date: "Febrero 2023",
          duration: "4 meses",
          icon: "Store"
        }
      ],
      client: {
        name: "Ana Patricia Herrera",
        position: "Directora de Desarrollo",
        company: "Inversiones Caribe Plaza",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      testimonial: "El resultado final superó nuestras expectativas. SIRECC logró crear un espacio comercial moderno y funcional que se ha convertido en el centro de referencia de la ciudad."
    },
    {
      id: 5,
      name: "Puente Vehicular Río Magdalena",
      type: "infrastructure",
      location: "Cartagena",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      description: "Puente vehicular de 850 metros que conecta dos importantes sectores de la ciudad.",
      fullDescription: `El Puente Vehicular Río Magdalena es una obra de infraestructura vital que mejora significativamente la conectividad urbana de Cartagena. Con 850 metros de longitud, este puente atirantado soporta un flujo vehicular de más de 50.000 vehículos diarios.\n\nLa estructura incorpora tecnología antisísmica avanzada y materiales resistentes a la corrosión marina, garantizando una vida útil superior a 100 años.`,
      completionDate: "Agosto 2023",
      duration: "30 meses",
      size: "850 metros lineales",
      budget: "$45.000 - $50.000 millones COP",
      teamSize: "200 profesionales",
      rating: 5,
      featured: false,
      keyFeatures: [
        "Estructura atirantada de 850 metros",
        "Capacidad para 50.000 vehículos/día",
        "Tecnología antisísmica avanzada",
        "Materiales resistentes a corrosión marina",
        "Iluminación LED ornamental",
        "Ciclovía integrada"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
      ],
      timeline: [
        {
          title: "Estudios Técnicos",
          description: "Estudios de suelos, hidrológicos y ambientales",
          date: "Febrero 2021",
          duration: "6 meses",
          icon: "FileText"
        },
        {
          title: "Construcción de Pilares",
          description: "Cimentación y construcción de torres principales",
          date: "Agosto 2021",
          duration: "12 meses",
          icon: "Building"
        },
        {
          title: "Montaje de Estructura",
          description: "Instalación de cables y tablero del puente",
          date: "Agosto 2022",
          duration: "12 meses",
          icon: "Settings"
        }
      ],
      client: {
        name: "Ing. Fernando Castillo",
        position: "Director de Infraestructura",
        company: "Alcaldía de Cartagena",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg"
      },
      testimonial: "Una obra de ingeniería excepcional. SIRECC demostró capacidad técnica superior para ejecutar proyectos de infraestructura complejos con los más altos estándares de calidad y seguridad."
    },
    {
      id: 6,
      name: "Urbanización Villa Campestre",
      type: "residential",
      location: "Bogotá",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      description: "Exclusiva urbanización de 80 casas con diseño arquitectónico contemporáneo y amenidades premium.",
      fullDescription: `Villa Campestre representa el concepto más avanzado de vida residencial en Bogotá. Esta exclusiva urbanización de 80 casas combina diseño arquitectónico contemporáneo con amplios espacios verdes y amenidades de clase mundial.\n\nCada vivienda cuenta con jardín privado, garaje doble y acabados de lujo, mientras que las áreas comunes incluyen club house, piscina, canchas deportivas y senderos ecológicos.`,
      completionDate: "Diciembre 2023",
      duration: "22 meses",
      size: "25.000 m²",
      budget: "$28.000 - $32.000 millones COP",
      teamSize: "110 profesionales",
      rating: 5,
      featured: false,
      keyFeatures: [
        "80 casas de diseño contemporáneo",
        "Club house con salón social",
        "Piscina semi-olímpica",
        "Canchas de tenis y fútbol",
        "Senderos ecológicos",
        "Seguridad 24/7 con acceso controlado"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
      ],
      timeline: [
        {
          title: "Diseño Urbanístico",
          description: "Planificación y diseño del conjunto residencial",
          date: "Febrero 2022",
          duration: "4 meses",
          icon: "FileText"
        },
        {
          title: "Infraestructura",
          description: "Construcción de vías, redes y servicios",
          date: "Junio 2022",
          duration: "8 meses",
          icon: "Road"
        },
        {
          title: "Construcción de Viviendas",
          description: "Edificación de casas y amenidades",
          date: "Febrero 2023",
          duration: "10 meses",
          icon: "Home"
        }
      ],
      client: {
        name: "Patricia Morales",
        position: "Gerente General",
        company: "Desarrollos Residenciales Premium",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg"
      },
      testimonial: "SIRECC creó un proyecto residencial que redefine los estándares de calidad. La atención al detalle y el compromiso con la excelencia son evidentes en cada aspecto de la urbanización."
    }
  ];

  // Filter and search logic
  const filteredProjects = allProjects?.filter(project => {
    const matchesType = filters?.type === 'all' || project?.type === filters?.type;
    const matchesScale = filters?.scale === 'all' || 
      (filters?.scale === 'small' && parseInt(project?.size?.replace(/[^\d]/g, '')) < 1000) ||
      (filters?.scale === 'medium' && parseInt(project?.size?.replace(/[^\d]/g, '')) >= 1000 && parseInt(project?.size?.replace(/[^\d]/g, '')) <= 5000) ||
      (filters?.scale === 'large' && parseInt(project?.size?.replace(/[^\d]/g, '')) > 5000);
    const matchesYear = filters?.year === 'all' || project?.completionDate?.includes(filters?.year);
    const matchesLocation = filters?.location === 'all' || project?.location?.toLowerCase()?.includes(filters?.location);
    const matchesSearch = searchTerm === '' || 
      project?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      project?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      project?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    return matchesType && matchesScale && matchesYear && matchesLocation && matchesSearch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects]?.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.completionDate) - new Date(a.completionDate);
      case 'oldest':
        return new Date(a.completionDate) - new Date(b.completionDate);
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'rating':
        return b?.rating - a?.rating;
      default:
        return 0;
    }
  });

  const featuredProjects = allProjects?.filter(project => project?.featured);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      scale: 'all',
      year: 'all',
      location: 'all'
    });
    setSearchTerm('');
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Building" size={32} className="text-secondary" />
              <h1 className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground">
                Galería de Proyectos
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra experiencia a través de proyectos exitosos que demuestran 
              nuestra capacidad técnica y compromiso con la excelencia en construcción.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary mb-2">150+</div>
              <div className="text-muted-foreground">Proyectos Completados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary mb-2">25</div>
              <div className="text-muted-foreground">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfacción Cliente</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary mb-2">5M+</div>
              <div className="text-muted-foreground">m² Construidos</div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Projects Carousel */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-orbitron font-bold text-2xl lg:text-3xl text-foreground">
              Proyectos Destacados
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Star" size={16} className="text-accent" />
              <span>Nuestros mejores trabajos</span>
            </div>
          </div>
          
          <FeaturedCarousel 
            featuredProjects={featuredProjects}
            onViewDetails={handleViewDetails}
          />
        </div>
      </section>
      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80 flex-shrink-0">
              <ProjectFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Projects Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <h3 className="font-orbitron font-bold text-xl text-foreground">
                    Todos los Proyectos
                  </h3>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                    {sortedProjects?.length} proyecto{sortedProjects?.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground hidden sm:block">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="recent">Más Recientes</option>
                    <option value="oldest">Más Antiguos</option>
                    <option value="name">Nombre A-Z</option>
                    <option value="rating">Mejor Calificados</option>
                  </select>
                </div>
              </div>

              {/* Projects Grid */}
              {sortedProjects?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {sortedProjects?.map((project) => (
                    <ProjectCard
                      key={project?.id}
                      project={project}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-orbitron font-bold text-xl text-foreground mb-2">
                    No se encontraron proyectos
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Intenta ajustar los filtros o términos de búsqueda
                  </p>
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={handleClearFilters}
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              )}

              {/* Load More Button */}
              {sortedProjects?.length > 0 && sortedProjects?.length >= 6 && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Plus"
                    iconPosition="left"
                    className="hover:bg-secondary hover:text-white hover:border-secondary"
                  >
                    Cargar Más Proyectos
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-orbitron font-bold text-3xl lg:text-4xl text-white mb-6">
            ¿Listo para tu Próximo Proyecto?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Convierte tu visión en realidad con la experiencia y calidad que nos caracteriza. 
            Solicita una cotización personalizada para tu proyecto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="MessageSquare"
              iconPosition="left"
              className="bg-secondary hover:bg-secondary/90 text-white border-none glow-effect"
              onClick={() => window.location.href = '/contact-quote-request'}
            >
              Solicitar Cotización
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => window.location.href = '/contact-quote-request'}
            >
              Contactar Ahora
            </Button>
          </div>
        </div>
      </section>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectGallery;