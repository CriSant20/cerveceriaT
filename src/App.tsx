import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Home from './pages/Home/home';
import Principal from './pages/Principal/Principal';
import Documentos from './pages/Gestion-Documentos/documentos';

const App = () => {
  // Ejemplo: Puedes reemplazar esto con tu lógica real de autenticación
  const isAuthenticated = true; // Cambiar según el estado de autenticación

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {/* Rutas protegidas (requieren autenticación) */}
            <Route 
              path="/app" 
              element={isAuthenticated ? <Principal /> : <Navigate to="/login" />}
            >
              {/* Ruta por defecto dentro del layout Principal */}
              <Route index element={<Navigate to="inicio" replace />} />
              
              <Route path="inicio" element={<h1>Página de Inicio</h1>} />
              <Route path="documentos" element={<Documentos />} />
              <Route path="home" element={<Home />} />
            </Route>

            {/* Redirección para rutas no existentes */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/app/inicio" : "/"} />} />
          </Routes>
        </Router>
      </main>
      <Footer />
    </div>
  );
};

export default App;