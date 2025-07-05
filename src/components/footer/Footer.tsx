import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-amber-100 py-8 border-t border-amber-800/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
            CERVECERÍA NEFER
          </h3>
          <p className="text-amber-400/80 text-sm">
            © {new Date().getFullYear()} Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;