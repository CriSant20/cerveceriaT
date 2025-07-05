import { FiMenu, FiLogOut } from "react-icons/fi";
import { SidebarProps } from "../../interfaces/Sidebar/Sidebar.interface";
import logo from "../../assets/img/logonefer.jpeg";
import { useNavigate } from "react-router-dom";

export function Sidebar({
  isMenuOpen,
  toggleMenu,
  children,
}: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar lógica de cierre de sesión si es necesario
    navigate('/'); // Redirige a la página principal
  };

  return (
    <aside
      className={`h-screen flex flex-col justify-between transition-all duration-300 border-r border-amber-800/30 shadow-xl ${
        isMenuOpen ? "w-64" : "w-20"
      }`}
      style={{ 
        background: `
          linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.9))
        `
      }}
    >
      {/* Encabezado del sidebar */}
      <div>
        <div 
          className="flex items-center justify-between p-4 border-b border-amber-800/30"
          style={{
            background: `
              linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.7))
            `
          }}
        >
          {/* Logo/texto */}
          <div
            className={`transition-all duration-300 flex items-center ${
              isMenuOpen ? "opacity-100 w-auto" : "opacity-0 overflow-hidden w-0"
            }`}
          >
            <div className="relative mr-3">
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-700/30 to-amber-900/20 rounded-full blur-sm"></div>
              <img 
                src={logo} 
                alt="Logo Nefer" 
                className="relative h-10 w-10 rounded-full border-2 border-amber-800/30 shadow-lg object-cover"
              />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-bold tracking-wider text-amber-100">NEFER</h1>
              <p className="text-xs uppercase tracking-widest text-amber-300">CERVECERIA</p>
            </div>
          </div>
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-amber-800/20 transition-colors border border-amber-800/30 hover:border-amber-600/50"
            aria-label="Toggle menu"
          >
            <FiMenu size={20} className="text-amber-200" />
          </button>
        </div>

        {/* Subtítulo */}
        <div 
          className="px-4 py-3 border-b border-amber-800/30"
          style={{
            background: `
              linear-gradient(to right, rgba(17, 24, 39, 0.85), rgba(31, 41, 55, 0.75))
            `
          }}
        >
          <span
            className={`text-xs uppercase tracking-widest text-amber-300 transition-all duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
            }`}
          >
            Administración
          </span>
        </div>
        
        {/* Contenido (íconos de navegación) */}
        <nav 
          className="mt-2 flex flex-col space-y-1 p-2 border-amber-800/30"
          style={{
            background: `
              linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.9))
            `
          }}
        >
          {children}
        </nav>
      </div>

      {/* Pie del sidebar con botón de salir */}
      <div 
        className="p-4 border-t border-amber-800/30"
        style={{
          background: `
            linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.7))
          `
        }}
      >
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-2 rounded-lg hover:bg-amber-800/20 transition-colors ${
            isMenuOpen ? "justify-start space-x-3" : "justify-center"
          }`}
        >
          <FiLogOut size={20} className="text-amber-200" />
          {isMenuOpen && (
            <span className="text-amber-100 text-sm font-medium">Salir</span>
          )}
        </button>
      </div>

      {/* Versión mini del logo cuando el sidebar está colapsado */}
      {!isMenuOpen && (
        <div 
          className="flex justify-center p-2"
          style={{
            background: `
              linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.7))
            `
          }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-amber-700/30 to-amber-900/20 rounded-full blur-sm"></div>
            <img 
              src={logo} 
              alt="Logo Nefer" 
              className="relative h-8 w-8 rounded-full border border-amber-800/30 object-cover"
            />
          </div>
        </div>
      )}
    </aside>
  );
}