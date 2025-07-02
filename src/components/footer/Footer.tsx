import React from "react";

const Footer: React.FC = () => {
  // Generar IDs únicos para los elementos decorativos usando slice() en lugar de substr()
  const decorativeElements = Array.from({ length: 5 }, (_, i) => ({
    id: `decorative-${Math.random().toString(36).slice(2, 11)}-${i}`,
    style: {
      width: `${Math.random() * 200 + 50}px`,
      height: `${Math.random() * 200 + 50}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }
  }));

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-amber-100 py-8 border-t border-amber-800/30 shadow-2xl">
      {/* Elementos flotantes decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {decorativeElements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-amber-800 opacity-10"
            style={{
              ...element.style,
              filter: "blur(30px)",
            }}
          />
        ))}
      </div>

      {/* Resto del código del footer permanece igual */}
      {/* ... */}
    </footer>
  );
};

export default Footer;