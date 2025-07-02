import React from "react";
import logo from "../../assets/img/cerveza.jpeg";
import headerBackground from "../../assets/img/headerkikinsecurity.jpg";

const Header: React.FC = () => {
  return (
    <header 
      className="relative w-full h-[5vh] min-h-[100px] max-h-[300px] text-white flex items-center overflow-hidden"
      style={{ 
        background: `
          linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
          url(${headerBackground}) center/cover no-repeat
        `
      }}
    >
      <div className="w-full mx-auto flex items-center px-4 md:px-8 lg:px-12 z-10">
        <img 
          src={logo}
          alt="Logo"
          className="h-16 md:h-20 lg:h-24 mr-4"
        />
        
        <div>
          <h1 className="text-xm md:text-2xl lg:text-3xl font-bold">CERVECERIA</h1>
          <p className="text-xm md:text-lg lg:text-xl">NEFER</p>
        </div>
      </div>
    </header>
  );
};

export default Header;