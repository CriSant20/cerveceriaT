import { FiMenu } from "react-icons/fi";
import { SidebarProps } from "../../interfaces/Sidebar/Sidebar.interface";

export function Sidebar({
  isMenuOpen,
  toggleMenu,
  children,
  footerContent,
}: SidebarProps) {
  return (
    <aside
      className={`bg-blue-950 text-white h-screen flex flex-col justify-between transition-all duration-300 ${
        isMenuOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Encabezado del sidebar */}
      <div>
        <div className="flex items-center justify-between p-4">
          <span
            className={`text-lg font-semibold transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0 overflow-hidden w-0"
            }`}
          >
            CERVECERIA NEFER
          </span>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Toggle menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
        <div className="px-4">
          <span
            className={`text-sm text-gray-400 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0 overflow-hidden w-0"
            }`}
          >
            Adinistración Cerveceria
          </span>
        </div>
        {/* Contenido (íconos de navegación) */}
        <nav className="mt-4 flex flex-col space-y-2">{children}</nav>
      </div>
    </aside>
  );
}
