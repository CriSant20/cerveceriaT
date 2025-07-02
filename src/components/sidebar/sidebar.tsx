import { FiMenu } from "react-icons/fi";
import { SidebarProps } from "../../interfaces/Sidebar/Sidebar.interface";

export function Sidebar({
  isMenuOpen,
  toggleMenu,
  children,
}: SidebarProps) {
  return (
    <aside
      className={`bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-amber-100 h-screen flex flex-col justify-between transition-all duration-300 border-r border-amber-800/30 shadow-2xl ${
        isMenuOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Encabezado del sidebar */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-amber-800/30">
          <span
            className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-100 transition-all duration-300 ${
              isMenuOpen ? "opacity-100 w-auto" : "opacity-0 overflow-hidden w-0"
            }`}
          >
            CERVECERIA NEFER
          </span>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-amber-800/20 transition-colors border border-amber-800/30 hover:border-amber-800/50"
            aria-label="Toggle menu"
          >
            <FiMenu size={24} className="text-amber-200" />
          </button>
        </div>
        <div className="px-4 py-2">
          <span
            className={`text-sm bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300 ${
              isMenuOpen ? "opacity-100 w-auto" : "opacity-0 overflow-hidden w-0"
            }`}
          >
            Administración Cervecería
          </span>
        </div>
        
        {/* Contenido (íconos de navegación) */}
        <nav className="mt-4 flex flex-col space-y-1 p-2">{children}</nav>
      </div>

      {/* Versión mini del logo cuando el sidebar está colapsado */}
      {!isMenuOpen && (
        <div className="flex justify-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-800/30"></div>
        </div>
      )}
    </aside>
  );
}