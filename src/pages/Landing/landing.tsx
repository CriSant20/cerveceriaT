import { useNavigate } from "react-router-dom";
import cervezaBackground from "../../assets/img/headerkikinsecurity.jpg"; // Ajusta la ruta según tu estructura
import cervezaimg from "../../assets/img/cerveza.jpeg"; // Ajusta la ruta según tu estructura

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gray-800 opacity-10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-amber-100 shadow-2xl backdrop-blur-sm border-b border-amber-800/30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
              CERVECERIA NEFER
            </span>
          </div>
          <button
            onClick={handleLoginRedirect}
            className="relative overflow-hidden group bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-50 font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-amber-800/50"
          >
            <span className="relative z-10">Iniciar Sesión</span>
            <span className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </nav>
      <header className="relative pt-32 pb-40">
        {/* Imagen de fondo local con overlay oscuro */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${cervezaBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay oscuro para mejorar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-gray-950/80"></div>
        </div>

        {/* Contenido */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
            Oscuridad con Carácter
          </h1>
          <p className="text-xl mb-10 text-amber-100 max-w-2xl mx-auto">
            Descubre la alquimia entre tradición e innovación en nuestras
            cervezas artesanales
          </p>
          <button className="relative overflow-hidden group bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-50 font-bold py-4 px-10 rounded-full text-lg transition-all duration-500 shadow-2xl hover:shadow-amber-900/50 border border-amber-800/50">
            <span className="relative z-10">Explorar Colección</span>
            <span className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
        </div>

        {/* Degradado inferior para transición */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-10"></div>
      </header>

      {/* About Section */}
      <section className="relative py-28 bg-gray-900/80 backdrop-blur-sm border-t border-b border-amber-800/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900 rounded-2xl blur-lg opacity-40"></div>
                <img
                  src={cervezaimg}
                  alt="Cerveza artesanal"
                  className="relative rounded-xl shadow-2xl border-2 border-amber-800/30 w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
                Nuestra Esencia
              </h2>
              <p className="text-amber-100/90 mb-6 text-lg leading-relaxed">
                Desde 1992, en{" "}
                <span className="font-semibold text-amber-300">NEFER</span>{" "}
                BLA BLA BLA poner algun contenido
              </p>
              <p className="text-amber-100/90 mb-6 text-lg leading-relaxed">
                Nuestro proceso de fermentación controlada y selección de maltas
                tostadas garantiza un perfil de sabor robusto en cada variedad.
              </p>
              <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/60 p-6 rounded-xl border border-amber-800/30 backdrop-blur-sm">
                <p className="text-amber-200/90 italic">
                  "En cada sorbo, la oscuridad revela su complejidad"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beers Section */}
      <section className="relative py-28 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-t border-b border-amber-800/20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #92400e 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
            Nuestra Carta Maestra
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "produccion que se realiza bla bla bla",
                desc: "Stout imperial con notas de café tostado y chocolate negro",
                abv: "9.2%",
                gradient: "from-gray-900 via-gray-800 to-gray-950",
                color: "text-amber-100",
              },
              {
                name: "Black IPA",
                desc: "IPA oscura con aromas a cítricos y lúpulos resinados",
                abv: "6.8%",
                gradient: "from-gray-800 via-gray-700 to-gray-900",
                color: "text-amber-50",
              },
            ].map((beer, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-amber-900/50 transition-all duration-500 border border-amber-800/30"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${beer.gradient} opacity-90`}
                ></div>
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <h3 className={`text-2xl font-bold mb-3 ${beer.color}`}>
                    {beer.name}
                  </h3>
                  <p
                    className={`mb-6 ${beer.color.replace(
                      "text-",
                      "text-"
                    )} opacity-90`}
                  >
                    {beer.desc}
                  </p>
                  <div className="mt-auto">
                    <span
                      className={`inline-block px-4 py-2 rounded-full ${beer.color.replace(
                        "text-",
                        "bg-"
                      )} bg-opacity-20 backdrop-blur-sm ${
                        beer.color
                      } font-semibold border border-amber-800/30`}
                    >
                      ABV: {beer.abv}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-28 bg-gray-950 border-t border-b border-amber-800/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
            Galería Visual (las fotos que se quieran poner)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="relative group overflow-hidden rounded-xl aspect-square border border-amber-800/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 opacity-70 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-amber-100 text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Imagen {item}
                  </span>
                </div>
                <div className="absolute inset-0 border-2 border-amber-800/30 rounded-xl pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-300">
            ¿Listo para el viaje?
          </h2>
          <p className="text-xl mb-12 text-amber-100 max-w-3xl mx-auto leading-relaxed">
            Descubre la diferencia que hace la auténtica artesanía cervecera.
            Visítanos o encuentra nuestros productos en establecimientos
            selectos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="relative overflow-hidden group bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-50 font-bold py-4 px-10 rounded-full text-lg transition-all duration-500 shadow-xl hover:shadow-amber-900/50 border border-amber-800/50">
              <span className="relative z-10">Ubicación</span>
              <span className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
            <button className="relative overflow-hidden group bg-transparent hover:bg-gray-900/30 text-amber-100 font-bold py-4 px-10 rounded-full text-lg transition-all duration-500 border-2 border-amber-700 hover:border-amber-600 shadow-xl hover:shadow-amber-900/30">
              <span className="relative z-10">Contacto</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-950/95 backdrop-blur-sm pt-20 pb-12 border-t border-amber-800/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
                CERVECERIA NEFER
              </h3>
              <p className="text-amber-300 mb-4">
                La excelencia en cervezas oscuras.
              </p>
              <div className="flex space-x-4">
                {["facebook", "instagram", "twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-amber-400 hover:text-amber-200 transition-colors duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-10 h-10 rounded-full bg-gray-900/50 flex items-center justify-center border border-amber-800/50">
                      <div className="text-lg">
                        {social.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-amber-100">
                Explorar
              </h4>
              <ul className="space-y-3">
                {["Cervezas", "Eventos", "Tour Cervecero", "Historia"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-amber-400 hover:text-amber-200 transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-amber-100">
                Legal
              </h4>
              <ul className="space-y-3">
                {["Términos", "Privacidad", "Cookies", "Responsabilidad"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-amber-400 hover:text-amber-200 transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-amber-100">
                Contacto
              </h4>
              <address className="not-italic text-amber-300 space-y-3">
                <p>direccion</p>
                <p>Ciudad, CP 12345</p>
                <p>Tel: +1 234 567 890 bla bla</p>
                <p>info@nefer.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-amber-800/30 pt-8 text-center text-amber-400">
            <p>
              © {new Date().getFullYear()} CERVECERIA NEFER. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
