import { Outlet, Link } from "react-router-dom";
import {Sidebar} from "../../components/sidebar/sidebar";
import {
  FiHome,
  FiUser,
  FiDownloadCloud,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState, useEffect } from "react";

const Principal = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
        setIsMenuOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    if (windowWidth < 1024) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Botón de menú en móviles */}
      {windowWidth < 1024 && (
        <button
          className="fixed top-4 left-4 z-40 p-2 bg-blue-950 text-white rounded-md shadow-lg lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      <Sidebar
        isMenuOpen={windowWidth < 1024 ? isMobileOpen : isMenuOpen}
        toggleMenu={toggleMenu}
        footerContent={
          <div className="text-sm text-gray-300 text-center">
            &copy; 2025 CERVECERIA NEFER
          </div>
        }
      >
        <Link
          to="/app/home"
          className="flex items-center gap-4 px-4 py-2 hover:bg-blue-800 transition-colors"
        >
          <FiHome size={20} />
          {isMenuOpen && <span>Inicio</span>}
        </Link>
        <Link
          to="/app/documentos"
          className="flex items-center gap-4 px-4 py-2 hover:bg-blue-800 transition-colors"
        >
          <FiDownloadCloud size={20} />
          {isMenuOpen && <span>Inventario</span>}
        </Link>

        {/* Gestión de usuarios */}
        <div className="px-4">
          <div className="flex items-center gap-4 py-2 text-sm text-gray-400">
            <FiUser size={20} />
            {isMenuOpen && <span>Recetas</span>}
          </div>
        </div>
      </Sidebar>

      {/* Contenido principal */}
      <main className="flex-1 overflow-auto p-6 bg-gray-50 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default Principal;
