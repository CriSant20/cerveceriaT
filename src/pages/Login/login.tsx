import React, { useState, FormEvent } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./login.css";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const navigate = useNavigate(); // Usa useNavigate para redireccionar

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Correo y contraseña estáticos
    const correoEstatico = "kikin@gmail.com";
    const contraseniaEstatica = "admin123";

    if (!correo || !contrasenia) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    // Validación con los valores estáticos
    if (correo === correoEstatico && contrasenia === contraseniaEstatica) {
      toast.success("Inicio de sesión exitoso!");
      // Redirige a otra página después del login exitoso
      navigate("/Principal");
    } else {
      toast.error("Correo o contraseña incorrectos.");
    }

    console.log("Correo:", correo);
    console.log("Contraseña:", contrasenia);
  };

  return (
    <div>
      <div className="contenedorPrincipal">
        <div className="contenedorLoguin">
          <div className="portadasLoguin">
            <div className="porta"></div>
          </div>
          <div className="contenedorFormularioLoguin">
            <div className="encabezadoLoguin">
              <h1>Bienvenidos a CERVECERIA NEFER</h1>
            </div>
            <div className="formularioLoguin">
              <form onSubmit={handleSubmit}>
                <div className="contenedorIngreso">
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="ingreso"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    maxLength={50}
                    minLength={4}
                    required
                  />
                </div>

                <div className="contenedorIngreso">
                  <div className="campoContrasena">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="contrasenia"
                      name="contrasenia"
                      className="ingreso"
                      placeholder="Contraseña"
                      value={contrasenia}
                      onChange={(e) => setContrasenia(e.target.value)}
                      maxLength={25}
                      minLength={4}
                      required
                    />
                    {showPassword ? (
                      <BsEyeSlash
                        className="iconoIngreso"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <BsEye
                        className="iconoIngreso"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>

                <p className="linkRecuperar">¿Olvidaste tu contraseña?</p>
                <button type="submit" className="botonAzul">
                  Iniciar sesión
                </button>
              </form>
              <div className="registrate">
                <p>No tienes cuenta?</p>
                Regístrate!!
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
