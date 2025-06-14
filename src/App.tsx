import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Home from './pages/Home/home';
import Principal from './pages/Principal/Principal';
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow space-y-4">
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Registro" element={<Register/>} />
        <Route path="/Principal" element={<Principal/>} />
      </Routes>
    </Router>
    </main>
      <Footer />
      </div>
  );
};

export default App;