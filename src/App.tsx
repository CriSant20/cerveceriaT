import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import Principal from './pages/Principal/Principal';
import Landing from './pages/Landing/landing';
import Inventario from './pages/Inventario/inventario';
import Recetas from './pages/recetas/recetass';

const App = () => {
  const isAuthenticated = true; // Cambiar según el estado de autenticación

  return (
    <Router>
      <Routes>
        {/* Ruta de Landing sin Header y Footer */}
        <Route path="/" element={<Landing />} />
        
        {/* Ruta de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas (requieren autenticación) */}
        <Route 
          path="/app" 
          element={isAuthenticated ? (
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                <Principal />
              </main>
            </div>
          ) : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="home" element={<Home />} />
          <Route path="recetas" element={<Recetas />} />
        </Route>
        
        {/* Redirección para rutas no existentes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/app/home" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;