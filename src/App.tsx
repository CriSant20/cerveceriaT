import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import Principal from './pages/Principal/Principal';
import Landing from './pages/Landing/landing';
import Inventario from './pages/Inventario/inventario';
import Recetas from './pages/recetas/recetas';
const App = () => {
  // Ejemplo: Puedes reemplazar esto con tu lógica real de autenticación
  const isAuthenticated = true; // Cambiar según el estado de autenticación

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas (requieren autenticación) */}
            <Route 
              path="/app" 
              element={isAuthenticated ? <Principal /> : <Navigate to="/login" />}
            >
              {/* Ruta por defecto dentro del layout Principal */}
              <Route index element={<Navigate to="home" replace />} />
              <Route path="inventario" element={<Inventario />} />
              <Route path="home" element={<Home />} />
              <Route path="recetas" element={<Recetas/>} />
            </Route>

            {/* Redirección para rutas no existentes */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/app/home" : "/"} />} />
          </Routes>
        </Router>
      </main>
      <Footer />
    </div>
  );
};

export default App;