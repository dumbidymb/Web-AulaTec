import React, { useState } from 'react';
import '../sources/Home.css';
import Sidebar from '../components/Sidebar';

import Male from "../assets/Perfil.png";
import Fondo from "../assets/fondo.jpg";
import { useNavigate } from 'react-router-dom';
import { Reparaciones } from './Reparaciones';

export const Home = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  const handleTargetClick = () => {
    setShowButtons(true);
  };

  const handleNavigate = () => {
    navigate('/listap');
  };

  const handllISTA = () => {
    navigate('/listapr');
  };

  const handReparar = () => {
    navigate('/reparaciones');
  };

  const handEstadisticas = () => {
    navigate('/estadisticas');
  };

  return (
    <>
      <nav className='navbar'>
        <div className='nav-links'>
        <a onClick={handEstadisticas} href="#profesores" className='nav-link'>Estadisticas generales</a>
          <a onClick={handleNavigate} href="#profesores" className='nav-link'>Lista de Profesores</a>
          <a onClick={handllISTA} href="#canones" className='nav-link'>Lista de Cañones</a>
          <a href="#reparaciones" onClick={handReparar} className='nav-link'>Reparaciones</a>
        </div>
      </nav>

      <div className='header-container'>
        <div className='header-background'>
          <img src={Fondo} alt="Background" className='header-image' />
          <div className='header-text'>
            <h1>AulaTec</h1>
            <p>El control esta en tus manos.</p>
          </div>
        </div>
      </div>

      <div className='bodi-home'>
        <div className='part1-home'>
          <header>Cañones en uso:</header>
          <div className='cont-part1-home'>
            {[...Array(12)].map((_, i) => (
              <div key={i} className='target-home' onClick={handleTargetClick}>
                <img style={{ width: 100 }} src={Male} alt="Descripción de la imagen" />
                <a>M. Felipe Arrazola</a>
              </div>
            ))}
          </div>
        </div>
        <div className='part2-home'>
          <Sidebar showButtons={showButtons} />
        </div>
      </div>
    </>
  );
};
