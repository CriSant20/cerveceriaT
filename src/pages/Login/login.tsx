import React, { useState, useEffect, FormEvent } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Instagram, Facebook, ChevronLeft } from 'lucide-react';
import "./login.css";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const correoEstatico = "jessica@gmail.com";
    const contraseniaEstatica = "administradora";

    if (!correo || !contrasenia) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    if (correo === correoEstatico && contrasenia === contraseniaEstatica) {
      toast.success("Inicio de sesión exitoso!");
      navigate("/app/home");
    } else {
      toast.error("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-[#FDF6E3] font-sans overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-[#0B132B]/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo con enlace a Landing */}
            <div 
              className="flex items-center space-x-3 transform transition-transform hover:scale-105 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#F8C13A] to-[#C08200] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wider text-[#F8C13A]">NEFER</h1>
                <p className="text-xs uppercase tracking-widest text-[#C08200]">Cervecería Artesanal</p>
              </div>
            </div>

            {/* Botón de regreso */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-[#FDF6E3] hover:text-[#F8C13A] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Volver al inicio</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido del Login */}
      <div className="pt-24 pb-12 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-[#1C1C1C] rounded-2xl overflow-hidden shadow-2xl border border-[#C08200]/30 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Portada izquierda */}
            <div className="hidden lg:block relative bg-gradient-to-br from-[#C08200] to-[#F8C13A]">
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#F8C13A] to-[#C08200] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-black font-bold text-3xl">N</span>
                  </div>
                  <h2 className="text-4xl font-bold text-[#0B132B] mb-4">CERVECERÍA NEFER</h2>
                  <p className="text-[#0B132B] text-lg">Pasión por la cerveza artesanal</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#F8C13A] mb-2">Iniciar Sesión</h1>
                <p className="text-[#C08200]">Accede a tu cuenta para continuar</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-[#FDF6E3] mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="w-full px-4 py-3 bg-[#0B132B] border border-[#C08200]/30 rounded-lg focus:border-[#F8C13A] focus:ring-2 focus:ring-[#F8C13A]/50 outline-none transition-all"
                    placeholder="tu@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contrasenia" className="block text-sm font-medium text-[#FDF6E3] mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="contrasenia"
                      name="contrasenia"
                      className="w-full px-4 py-3 bg-[#0B132B] border border-[#C08200]/30 rounded-lg focus:border-[#F8C13A] focus:ring-2 focus:ring-[#F8C13A]/50 outline-none transition-all pr-12"
                      placeholder="••••••••"
                      value={contrasenia}
                      onChange={(e) => setContrasenia(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#C08200] hover:text-[#F8C13A]"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#F8C13A] focus:ring-[#F8C13A] border-[#C08200] rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#FDF6E3]">
                      Recuérdame
                    </label>
                  </div>

                  <div className="text-sm">
                      ¿Olvidaste tu contraseña?
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#C08200] to-[#F8C13A] text-black font-bold rounded-lg hover:from-[#F8C13A] hover:to-[#C08200] transition-all duration-300 transform hover:scale-[1.02] shadow-md"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-[#FDF6E3]">
                  ¿No tienes una cuenta?{' '}
                </p>
              </div>

              <div className="mt-8 border-t border-[#C08200]/30 pt-6">
                <div className="flex justify-center space-x-6">
                  <button className="p-2 rounded-full bg-[#0B132B] text-[#FDF6E3] hover:text-[#F8C13A] transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-[#0B132B] text-[#FDF6E3] hover:text-[#F8C13A] transition-colors">
                    <Instagram className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;