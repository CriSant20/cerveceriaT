import React from "react";
import logo from "../../assets/img/cerveza.jpeg";
import headerBackground from "../../assets/img/headerkikinsecurity.jpg";

const Header: React.FC = () => {
  return (
    <header 
      className="relative w-full h-[5vh] min-h-[100px] max-h-[300px] text-amber-100 flex items-center overflow-hidden border-b border-amber-800/30 shadow-2xl"
      style={{ 
        background: `
          linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.7)),
          url(${headerBackground}) center/cover no-repeat
        `
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-950/90 z-0"></div>
      
      <div className="w-full mx-auto flex items-center px-4 md:px-8 lg:px-12 z-10">
        <div className="relative mr-4">
          <div className="absolute -inset-2 bg-gradient-to-tr from-amber-700/30 to-amber-900/20 rounded-full blur-sm"></div>
          <img 
            src={logo}
            alt="Logo"
            className="relative h-16 md:h-20 lg:h-24 rounded-full border-2 border-amber-800/30 shadow-lg object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-100">
            CERVECERIA
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
            NEFER
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;