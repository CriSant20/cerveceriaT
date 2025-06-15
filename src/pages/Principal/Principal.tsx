import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome, FiUser, FiSettings, FiMail, FiCalendar, FiChevronRight } from 'react-icons/fi';

const Principal: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú lateral */}
      <div 
        className={`bg-blue-800 text-white transition-all duration-300 ease-in-out 
        ${isMenuOpen ? 'w-64' : 'w-20'} overflow-hidden shadow-lg`}
      >
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          {isMenuOpen && <h1 className="text-xl font-bold">Menú Principal</h1>}
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Toggle menu"
          >
            <FiMenu size={24} />
          </button>
        </div>

        <nav className="mt-4">
          {/* Enlace simple */}
          <MenuItem 
            to="/" 
            icon={<FiHome />} 
            text="Inicio" 
            isMenuOpen={isMenuOpen}
          />

          {/* Enlace simple */}
          <MenuItem 
            to="/perfil" 
            icon={<FiUser />} 
            text="Perfil" 
            isMenuOpen={isMenuOpen}
          />

          {/* Submenú ejemplo */}
          <div>
            <button
              onClick={() => toggleSubmenu('config')}
              className={`w-full flex items-center p-4 hover:bg-blue-700 transition-colors ${activeSubmenu === 'config' ? 'bg-blue-700' : ''}`}
            >
              <FiSettings className="mr-4" />
              {isMenuOpen && (
                <>
                  <span className="flex-1 text-left">Configuración</span>
                  <FiChevronRight className={`transition-transform ${activeSubmenu === 'config' ? 'transform rotate-90' : ''}`} />
                </>
              )}
            </button>
            
            {isMenuOpen && activeSubmenu === 'config' && (
              <div className="bg-blue-900 pl-8">
                <MenuItem 
                  to="/config/usuarios" 
                  icon={<FiUser />} 
                  text="Usuarios" 
                  isMenuOpen={isMenuOpen}
                  isSubitem
                />
                <MenuItem 
                  to="/config/permisos" 
                  icon={<FiSettings />} 
                  text="Permisos" 
                  isMenuOpen={isMenuOpen}
                  isSubitem
                />
              </div>
            )}
          </div>

          {/* Más enlaces */}
          <MenuItem 
            to="/mensajes" 
            icon={<FiMail />} 
            text="Mensajes" 
            isMenuOpen={isMenuOpen}
          />
          <MenuItem 
            to="/calendario" 
            icon={<FiCalendar />} 
            text="Calendario" 
            isMenuOpen={isMenuOpen}
          />
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Página Principal</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700">Bienvenido al panel de administración. Selecciona una opción del menú lateral.</p>
          
          {/* Ejemplo de contenido */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard 
              title="Usuarios registrados" 
              value="1,254" 
              icon={<FiUser className="text-blue-500" size={24} />}
            />
            <DashboardCard 
              title="Mensajes nuevos" 
              value="23" 
              icon={<FiMail className="text-green-500" size={24} />}
            />
            <DashboardCard 
              title="Eventos hoy" 
              value="5" 
              icon={<FiCalendar className="text-purple-500" size={24} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para items del menú
const MenuItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  text: string;
  isMenuOpen: boolean;
  isSubitem?: boolean;
}> = ({ to, icon, text, isMenuOpen, isSubitem = false }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-4 hover:bg-blue-700 transition-colors ${isSubitem ? 'pl-8' : ''}`}
    >
      <span className={isSubitem ? 'mr-3 ml-2' : 'mr-4'}>{icon}</span>
      {isMenuOpen && <span>{text}</span>}
    </Link>
  );
};

// Componente para tarjetas del dashboard
const DashboardCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-gray-100">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Principal;