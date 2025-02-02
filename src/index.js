import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Login } from './pages/Login';
import { Registro } from './pages/Registro';
import { Olvidaste } from './pages/Olvidaste';
import { Home } from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { LProfesores } from './pages/LProfesores';
import { LProyectores } from './pages/LProyectores';
import { Reparaciones } from './pages/Reparaciones';
import { Estadisticas } from './pages/Estadisticas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/olvidaste" element={<Olvidaste/>} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Home/>} />
        <Route path="/listap" element={<LProfesores/>} />
        <Route path="/listapr" element={<LProyectores/>} />
        <Route path="/reparaciones" element={<Reparaciones/>} />
        <Route path="/estadisticas" element={<Estadisticas/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
