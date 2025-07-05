import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Menu,
  X,
  Star,
  Award,
  Users,
  Heart,
} from "lucide-react";

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/login");
  };
  // Datos del carousel
  const slides = [
    {
      title: "SI MERECES DE UN PREMIO SEMANAL,",
      subtitle: "DEGUSTA DE UNA NEFER,",
      subtitle2: "CERVEZA ARTESANAL",
      bg: "linear-gradient(135deg, #0B132B 0%, #1C1C1C 50%, #0B132B 100%)",
      particles: true,
    },
    {
      title: "EXPLORA SABORES",
      subtitle: "ÚNICOS EN CADA SORBO",
      subtitle2: "TRADICIÓN Y PASIÓN",
      bg: "linear-gradient(135deg, #C08200 0%, #F8C13A 50%, #C08200 100%)",
      particles: false,
    },
    {
      title: "ARTESANÍA PURA",
      subtitle: "DESDE RIOBAMBA",
      subtitle2: "CON AMOR AL DETALLE",
      bg: "linear-gradient(135deg, #1C1C1C 0%, #0B132B 50%, #2D1810 100%)",
      particles: true,
    },
  ];

  // Datos de las cervezas
  const beers = [
    {
      name: "Nefer Stout Imperial",
      desc: "Cerveza negra con notas de café tostado, chocolate negro y un final ligeramente ahumado",
      abv: "9.2%",
      color: "bg-gradient-to-br from-gray-900 to-black",
      highlight: "Edición Especial",
    },
    {
      name: "Nefer Black IPA",
      desc: "IPA oscura con intensos aromas a cítricos y lúpulos resinados, con un amargor equilibrado",
      abv: "6.8%",
      color: "bg-gradient-to-br from-amber-900 to-black",
      highlight: "Más Popular",
    },
    {
      name: "Nefer Amber Ale",
      desc: "Cerveza ámbar con maltas caramelizadas que aportan un sabor rico y complejo",
      abv: "5.5%",
      color: "bg-gradient-to-br from-orange-800 to-amber-900",
      highlight: "Clásica",
    },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Intersection Observer para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Componente de partículas flotantes
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-[#F8C13A] rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B132B] text-[#FDF6E3] font-sans overflow-x-hidden">
      {/* Navigation Bar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-[#0B132B]/95 backdrop-blur-md shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3 transform transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F8C13A] to-[#C08200] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wider text-[#F8C13A]">
                  NEFER
                </h1>
                <p className="text-xs uppercase tracking-widest text-[#C08200]">
                  Cervecería Artesanal
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <Instagram className="w-5 h-5 text-[#FDF6E3] hover:text-[#F8C13A] transition-colors cursor-pointer" />
                <Facebook className="w-5 h-5 text-[#FDF6E3] hover:text-[#F8C13A] transition-colors cursor-pointer" />
                <button
                  onClick={handleLoginRedirect}
                  className="px-4 py-2 bg-[#C08200] hover:bg-[#F8C13A] text-white hover:text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#1C1C1C] transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-[#0B132B]/95 backdrop-blur-md`}
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            {[
              "Inicio",
              "Encuentranos",
              "Nosotros",
              "Tienda",
              "Estilos",
              "Contacto",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-[#FDF6E3] hover:text-[#F8C13A] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-[#C08200] hover:bg-[#F8C13A] text-white hover:text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{ background: slide.bg }}
          >
            {slide.particles && <FloatingParticles />}

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
              <div className="transform transition-all duration-1000 delay-300">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-[#F8C13A] to-[#C08200] bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#FDF6E3]">
                  {slide.subtitle}
                </h2>
                <h3 className="text-2xl md:text-4xl font-light mb-12 text-[#C08200]">
                  {slide.subtitle2}
                </h3>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={() =>
            setCurrentSlide(
              currentSlide === 0 ? slides.length - 1 : currentSlide - 1
            )
          }
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-[#F8C13A]" />
        </button>

        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-[#F8C13A]" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-[#F8C13A] scale-125"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Sidebar - QUE OFRECEMOS */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
          <div className="bg-black/80 backdrop-blur-sm p-6 rounded-r-2xl border-r-4 border-[#F8C13A]">
            <h3 className="text-[#F8C13A] font-bold mb-4 text-sm tracking-widest">
              QUE OFRECEMOS EN NEFER?
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-[#F8C13A]" />
                <span>Cervezas Artesanales</span>
              </li>
              <li className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#F8C13A]" />
                <span>Variedad de Insumos</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#F8C13A]" />
                <span>Excelentes Equipos</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-[#F8C13A]" />
                <span>Asesoría</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="nosotros"
        className="py-20 bg-[#0B132B] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B132B] via-[#1C1C1C] to-[#0B132B]" />
        <div className="container mx-auto px-6 relative z-10">
          <div
            id="about-title"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible["about-title"]
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8C13A] to-[#C08200] bg-clip-text text-transparent">
              NUESTRA HISTORIA
            </h2>
            <p className="text-[#C08200] uppercase tracking-widest text-lg">
              Pasión por la Cerveza Artesanal
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              id="about-image"
              data-animate
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible["about-image"]
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F8C13A] to-[#C08200] rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative bg-[#1C1C1C] rounded-2xl p-8 border border-[#C08200]/30 group-hover:border-[#F8C13A]/50 transition-colors">
                  <div className="w-full h-64 bg-gradient-to-br from-[#C08200] to-[#F8C13A] rounded-xl flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">NEFER</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="about-content"
              data-animate
              className={`transform transition-all duration-1000 delay-500 ${
                isVisible["about-content"]
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="space-y-6">
                <div className="bg-[#111827] p-6 rounded-xl border-l-4 border-[#F8C13A] hover:bg-[#1f1f1f] transition-colors">
                  <h3 className="text-[#F8C13A] font-bold mb-3">
                    2018 - Nuestros Inicios
                  </h3>
                  <p className="text-[#FDF6E3] leading-relaxed">
                    Nuestro origen nace alrededor del año 2018, debido a la
                    pasión por la cultura de la cerveza artesanal y su infinidad
                    de posibilidades...
                  </p>
                </div>

                <div className="bg-[#111827] p-6 rounded-xl border-l-4 border-[#C08200] hover:bg-[#1f1f1f] transition-colors">
                  <h3 className="text-[#C08200] font-bold mb-3">
                    Pequeños Lotes, Gran Calidad
                  </h3>
                  <p className="text-[#FDF6E3] leading-relaxed">
                    Comenzamos a elaborar pequeñas cantidades para nuestro
                    propio disfrute en base a maltas y lúpulos especiales...
                  </p>
                </div>

                <div className="bg-[#111827] p-6 rounded-xl border-l-4 border-[#F8C13A] hover:bg-[#1f1f1f] transition-colors">
                  <h3 className="text-[#F8C13A] font-bold mb-3">
                    Riobamba - Presente
                  </h3>
                  <p className="text-[#FDF6E3] leading-relaxed">
                    Actualmente nos encontramos en la ciudad de Riobamba con una
                    línea de cocción de 500L batch...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beers Section */}
      <section
        id="estilos"
        className="py-20 bg-gradient-to-br from-[#1C1C1C] to-[#0B132B]"
      >
        <div className="container mx-auto px-6">
          <div
            id="beers-title"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible["beers-title"]
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8C13A] to-[#C08200] bg-clip-text text-transparent">
              NUESTRAS CERVEZAS
            </h2>
            <p className="text-[#C08200] uppercase tracking-widest text-lg">
              Sabores Únicos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beers.map((beer, index) => (
              <div
                key={index}
                id={`beer-${index}`}
                data-animate
                className={`group relative overflow-hidden rounded-2xl border border-[#C08200]/30 hover:border-[#F8C13A]/50 transition-all duration-500 transform ${
                  isVisible[`beer-${index}`]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`${beer.color} h-64 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#F8C13A] text-black px-3 py-1 rounded-full text-sm font-bold">
                      {beer.highlight}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/50 backdrop-blur-sm text-[#F8C13A] px-3 py-1 rounded-full text-sm font-bold">
                      ABV: {beer.abv}
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-[#111827] group-hover:bg-[#1f1f1f] transition-colors">
                  <h3 className="text-xl font-bold mb-3 text-[#F8C13A] group-hover:text-[#F8C13A] transition-colors">
                    {beer.name}
                  </h3>
                  <p className="text-[#FDF6E3] mb-4 leading-relaxed">
                    {beer.desc}
                  </p>
                  <button className="w-full py-2 bg-gradient-to-r from-[#C08200] to-[#F8C13A] text-black font-bold rounded-full hover:from-[#F8C13A] hover:to-[#C08200] transition-all duration-300 transform hover:scale-105">
                    Conocer Más
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#C08200] to-[#F8C13A] text-black">
        <div className="container mx-auto px-6 text-center">
          <div
            id="cta-content"
            data-animate
            className={`transform transition-all duration-1000 ${
              isVisible["cta-content"]
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold mb-6">
              ¿LISTO PARA LA EXPERIENCIA NEFER?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Descubre la diferencia que hace la auténtica artesanía cervecera.
              Visítanos o encuentra nuestros productos en establecimientos
              selectos.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-8 py-4 bg-black text-[#F8C13A] font-bold rounded-full hover:bg-[#0B132B] transition-all duration-300 transform hover:scale-105 shadow-xl">
                Encontrar Ubicación
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-[#F8C13A] transition-all duration-300 transform hover:scale-105">
                Contactar Ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B132B] pt-16 pb-8 border-t border-[#C08200]/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F8C13A] to-[#C08200] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">N</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#F8C13A]">NEFER</h3>
                  <p className="text-[#C08200] text-sm">Cervecería Artesanal</p>
                </div>
              </div>
              <p className="text-[#FDF6E3] mb-4 leading-relaxed">
                Desde 2018 creando experiencias únicas a través de nuestras
                cervezas artesanales. Cada sorbo cuenta una historia de pasión y
                dedicación.
              </p>
              <div className="flex space-x-4">
                <Instagram className="w-6 h-6 text-[#FDF6E3] hover:text-[#F8C13A] transition-colors cursor-pointer" />
                <Facebook className="w-6 h-6 text-[#FDF6E3] hover:text-[#F8C13A] transition-colors cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-[#F8C13A] font-bold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                {["Inicio", "Nosotros", "Cervezas", "Tienda", "Contacto"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-[#FDF6E3] hover:text-[#F8C13A] transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-[#F8C13A] font-bold mb-4">Contacto</h4>
              <div className="space-y-2 text-[#FDF6E3]">
                <p>📍 Riobamba, Ecuador</p>
                <p>📞 +593 XXX XXX XXX</p>
                <p>✉️ info@nefercerveza.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#C08200]/30 pt-8 text-center">
            <p className="text-[#FDF6E3] text-sm">
              © {new Date().getFullYear()} CERVECERÍA NEFER. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
