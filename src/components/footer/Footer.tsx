import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-amber-100 py-8 border-t border-amber-800/30 shadow-2xl">
      {/* Elementos flotantes decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-800 opacity-10"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(30px)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10">
        {/* Logo y nombre - completamente centrado */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-amber-100/10 rounded-full p-2 border border-amber-800/30 mb-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800"></div>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-100">
              CERVECERIA NEFER
            </h2>
          </div>
        </div>

        {/* Derechos reservados - centrado */}
        <p className="text-sm md:text-base text-amber-100/90 mb-6">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
